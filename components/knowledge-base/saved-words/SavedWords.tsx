import BasicLoader from "@/components/shared/loaders/BasicLoader";
import PageNavigation from "@/components/shared/page-navigation/PageNavigation";
import { getTextsFromKnowledgeBase } from "@/lib/api";
import styles from "@/styles/knowledge-base/saved-words/saved-words.module.scss";
import { useState, useEffect } from "react";
import WordCard from "./WordCard";

type savedWordsApiResponseType = {
  success: boolean;
  texts: { text: string }[];
  total_texts: number;
};

const SavedWords = () => {
  const [areWordsLoading, setAreWordsLoading] = useState(true);
  const [offset, setOffset] = useState(12);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const initialWords: savedWordsApiResponseType =
          await getTextsFromKnowledgeBase(token, 0, 12);

        if (initialWords.success === true) {
          const tempWords: string[] = [];
          initialWords.texts.forEach((item) => tempWords.push(item.text));
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
        const tempWords: string[] = [];
        newWords.texts.forEach((item) => tempWords.push(item.text));
        setWords((words) => words.concat(tempWords));
        setAreWordsLoading(false);
      }
    }
  };
  return (
    <section>
      {" "}
      {!isEmpty && !areWordsLoading ? (
        <>
          <div style={{ overflow: "hidden" }}>
            <section className={styles.wrapper}>
              {words.slice((page - 1) * 12, page * 12).map((word, index) => (
                <WordCard key={index} text={word} />
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
