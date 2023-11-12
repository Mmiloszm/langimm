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
  if (isAuthenticated) {
    withReactContent(Swal)
      .fire({
        confirmButtonColor: "#0359a4",
        title: phrase,
        text: "<tu będzie tłumaczenie>",
        showCancelButton: true,
        confirmButtonText: "Dodaj",
        cancelButtonText: "Anuluj",
      })
      .then(async (result) => {
        if (result.isConfirmed && token) {
          const res = await addTextToKnowledgeBase(token, articleId, phrase);
          console.log(res);
          if (res.success === "Text added to knowledge base") {
            withReactContent(Swal).fire({
              icon: "success",
              confirmButtonColor: "#0359a4",
              title: "Sukces",
              position: "bottom-end",
              timer: 2000,
            });
          } else {
            withReactContent(Swal).fire({
              icon: "error",
              confirmButtonColor: "#0359a4",
              title: "Ups.. coś poszło nie tak",
              position: "bottom-end",
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
