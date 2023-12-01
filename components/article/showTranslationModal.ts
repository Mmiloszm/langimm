import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { addTextToKnowledgeBase } from "@/lib/api";

const showTranslationModal = (
  phrase: string,
  isAuthenticated: boolean | null,
  router: AppRouterInstance,
  articleId: number,
  token: string | null
) => {
  const formattedPhrase = phrase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (isAuthenticated) {
    withReactContent(Swal)
      .fire({
        confirmButtonColor: "#0359a4",
        title: formattedPhrase,
        text: "<tu będzie tłumaczenie>",
        showCancelButton: true,
        confirmButtonText: "Dodaj",
        cancelButtonText: "Anuluj",
      })
      .then(async (result) => {
        if (result.isConfirmed && token) {
          const res = await addTextToKnowledgeBase(
            token,
            articleId,
            formattedPhrase
          );

          if (
            res.success === "Text added to knowledge base, datetime updated" ||
            res.success ===
              "Text added to knowledge base, article added to visited_articles"
          ) {
            withReactContent(Swal).fire({
              icon: "success",
              confirmButtonColor: "#0359a4",
              title: "Sukces",
              position: "center",
              timer: 2000,
            });
          } else {
            withReactContent(Swal).fire({
              icon: "error",
              confirmButtonColor: "#0359a4",
              title: "Ups.. coś poszło nie tak",
              position: "center",
              timer: 2000,
            });
          }
        }
      });
  } else {
    withReactContent(Swal)
      .fire({
        confirmButtonColor: "#0359a4",
        title: "Zaloguj się, aby zobaczyć tłumaczenie",
        showCancelButton: true,
        confirmButtonText: "Zaloguj się",
        cancelButtonText: "Anuluj",
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push("/signin");
        }
      });
  }
};
export default showTranslationModal;
