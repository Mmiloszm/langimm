import BasicLoader from "@/components/shared/loaders/BasicLoader";
import PageNavigation from "@/components/shared/page-navigation/PageNavigation";
import { getTextsFromKnowledgeBase } from "@/lib/api";
import styles from "@/styles/knowledge-base/saved-words/saved-words.module.scss";
import { useState, useEffect, useCallback } from "react";
import WordCard from "./WordCard";
import { Button } from "@mui/material";
import DownloadDialog from "./DownloadDialog";

type savedWordsApiResponseType = {
  success: boolean;
  texts: textType[];
  total_texts: number;
};

type textType = {
  id: number;
  text: string;
  translation: string;
  language_id: number;
};

const SavedWords = () => {
  const [areWordsLoading, setAreWordsLoading] = useState(true);
  const [offset, setOffset] = useState(12);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<textType[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteTextFromCurrent = useCallback(
    (id: number) => {
      const newWords = words.filter((word) => word.id !== id);
      setWords(newWords);
    },
    [words]
  );

  useEffect(() => {
    const fetchWords = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const initialWords: savedWordsApiResponseType =
          await getTextsFromKnowledgeBase(token, 0, 12);

        if (initialWords.success) {
          const tempWords: textType[] = [];
          initialWords.texts.forEach((item) => tempWords.push(item));
          setWords(tempWords);
          setOffset(0);
          setAreWordsLoading(false);
          initialWords.texts.length < 12
            ? setIsPossibleToFetchMore(false)
            : setIsPossibleToFetchMore(true);
          if (initialWords.texts.length === 0) {
            setIsEmpty(true);
          }
        }
      }
    };
    fetchWords();
  }, []);

  const fetchMoreWords = async () => {
    setAreWordsLoading(true);
    const newOffset = offset + 12;
    const token = localStorage.getItem("access");
    if (token) {
      setOffset(newOffset);

      const newWords: savedWordsApiResponseType =
        await getTextsFromKnowledgeBase(token, newOffset, 12);
      setOffset(newOffset);

      if (newWords.texts.length < 12) {
        setIsPossibleToFetchMore(false);
      }
      if (newWords.texts) {
        const tempWords: textType[] = [];
        newWords.texts.forEach((item) => tempWords.push(item));
        setWords((words) => words.concat(tempWords));
        setAreWordsLoading(false);
      }
    }
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <section>
      {" "}
      {!isEmpty && !areWordsLoading ? (
        <>
          <div className={styles.container}>
            <DownloadDialog open={dialogOpen} handleClose={handleClose} />
            <div className={styles.exportWrapper}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#0583f2" }}
                className={styles.export}
                onClick={() => handleClickOpen()}
              >
                Eksport
              </Button>
            </div>
            <section className={styles.wrapper}>
              {words.slice((page - 1) * 12, page * 12).map((item) => (
                <WordCard
                  deleteWord={deleteTextFromCurrent}
                  id={item.id}
                  key={item.id}
                  text={item.text}
                  translation={item.translation}
                  languageId={item.language_id}
                />
              ))}{" "}
            </section>
          </div>
          <div className={styles.navigationWrapper}>
            <PageNavigation
              items={words}
              page={page}
              fetchMore={fetchMoreWords}
              isPossibleToFetchMore={isPossibleToFetchMore}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <div className={styles.emptyWrapper}>
          {isEmpty ? (
            <div className={styles.instructionWrapper}>
              <span>Dodaj słowa do bazy wiedzy, by się tu pojawiły.</span>
              <h3 className={styles.headliner}>Instrukcja:</h3>
              <span>
                1. Wybierz słowo początkowe i końcowe, fraza pomiędzy nimi
                będzie przetłumaczona.
              </span>
              <span>2. Maksymalna długość frazy to 5 słów.</span>
              <span>
                3. Frazy mogą być tylko w obrębie tego samego paragrafu.
              </span>
            </div>
          ) : (
            <div className={styles.loaderWrapper}>
              <BasicLoader />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default SavedWords;
