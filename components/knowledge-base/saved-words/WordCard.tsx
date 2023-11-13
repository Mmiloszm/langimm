import styles from "@/styles/knowledge-base/saved-words/word-card.module.scss";
import { Button, IconButton } from "@mui/material";
import { Trash } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type WordCardPropsType = {
  text: string;
};
const WordCard = ({ text }: WordCardPropsType) => {
  const handleClick = () => {
    withReactContent(Swal).fire({
      confirmButtonColor: "#0359a4",
      title: text,
      text: "<tu będzie tłumaczenie>",

      confirmButtonText: "Ok",
    });
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
        <IconButton>
          <Trash size={32} />
        </IconButton>
      </div>
    </div>
  );
};

export default WordCard;
