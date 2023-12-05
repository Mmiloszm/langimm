import { deleteText } from "@/lib/api";
import styles from "@/styles/knowledge-base/saved-words/word-card.module.scss";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type WordCardPropsType = {
  id: number;
  text: string;
  translation: string;
  languageId: number;
  deleteWord: (id: number) => void;
};

type languagesType = { [key: number]: string };
const languages: languagesType = {
  1: "ENGLISH",
  2: "GERMAN",
  3: "ITALIAN",
  4: "SPANISH",
};
const WordCard = ({
  id,
  deleteWord,
  text,
  translation,
  languageId,
}: WordCardPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const flag = languages[languageId];
  const handleClick = () => {
    withReactContent(Swal).fire({
      confirmButtonColor: "#0359a4",
      title: text,
      text: translation,

      confirmButtonText: "Ok",
    });
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("access");
    if (token) {
      const res = await deleteText(token, id);
      if (res.success === "Text deleted successfully") {
        deleteWord(id);
        setIsLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups, coś poszło nietak.",
          confirmButtonText: "Ok.",
          confirmButtonColor: "#0359a4",
        });
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wordWrapper}>
        <h3>{text}</h3>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          style={{ backgroundColor: "#0359a4" }}
          variant="contained"
          onClick={() => handleClick()}
        >
          Przetłumacz
        </Button>
      </div>
      <div className={styles.actionsWrapper}>
        <Image
          width={64}
          height={32}
          src={`/icons/flags/${flag}.svg`}
          alt={`flag of ${flag}`}
        />
        <IconButton onClick={() => handleDelete()}>
          {isLoading ? (
            <CircularProgress color="inherit" size={32} />
          ) : (
            <Trash size={32} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default WordCard;
