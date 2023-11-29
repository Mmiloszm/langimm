import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useRef,
} from "react";

import styles from "@/styles/article/word.module.scss";
import { currentTextType } from "./Article";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type WordPropsType = {
  text: string;
  paragraphId: number | "title";
  id: number;
  setParams: Dispatch<
    SetStateAction<{
      paragraphIndex: number | null | "title";
      wordIndex: number | null;
      ref: RefObject<HTMLSpanElement>;
    }>
  >;
  currentText: currentTextType;
  reset: () => void;
};

const Word = ({
  text,
  paragraphId,
  id,
  setParams,
  currentText,
  reset,
}: WordPropsType) => {
  const ref = useRef<HTMLSpanElement>(null);

  const assignClassName = () => {
    if (ref.current) {
      ref.current.className = `${styles.default} ${styles.selected}`;
    }
  };

  const showSwal = (message: string) => {
    withReactContent(Swal).fire({
      confirmButtonColor: "#0359a4",
      title: message,
      position: "center",
      timer: 3000,
      icon: "error",
    });
  };

  const selectIfPossible = () => {
    if (
      currentText.endWord.paragraphIndex === null &&
      currentText.startWord.paragraphIndex !== null &&
      currentText.startWord.wordIndex !== null
    ) {
      if (currentText.startWord.paragraphIndex !== paragraphId) {
        showSwal("Frazy mogą znajdować się tylko w obrębie jednego paragrafu.");
        reset();
        return;
      }
      if (Math.abs(currentText.startWord.wordIndex - id) > 4) {
        showSwal("Maksymalna długość frazy to 5!");
        reset();
        return;
      }
    }
    assignClassName();
    setParams({ paragraphIndex: paragraphId, wordIndex: id, ref: ref });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      selectIfPossible();
    }
  };

  return (
    <span
      aria-label="Wybieralne słowo"
      tabIndex={0}
      ref={ref}
      key={id}
      role="button"
      onKeyDown={handleKeyDown}
      className={styles.default}
      onClick={() => {
        selectIfPossible();
      }}
    >
      {text}
    </span>
  );
};
export default Word;
