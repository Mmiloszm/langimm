import BasicLoader from "@/components/shared/loaders/BasicLoader";
import { getArticlesFromKnowledgeBase } from "@/lib/api";

import { useEffect, useState } from "react";
import styles from "@/styles/knowledge-base/saved-articles/saved-articles.module.scss";
import ArticleCard from "@/components/dashboard/card/ArticleCard";
import PageNavigation from "@/components/shared/page-navigation/PageNavigation";

type savedArticleType = {
  excerpt: string;
  id: number;
  thumbnail: string | null;
  title: string;
};

type savedArticlesApiResponseType = {
  success: boolean;
  articles: savedArticleType[];
  total_articles: number;
};

const SavedArticles = () => {
  const [areArticlesLoading, setAreArticlesLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<savedArticleType[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const initialArticles: savedArticlesApiResponseType =
          await getArticlesFromKnowledgeBase(token, 0, 12);

        if (initialArticles.success === true) {
          const tempArticles: savedArticleType[] = [];
          initialArticles.articles.forEach((item) => tempArticles.push(item));
          setArticles(tempArticles);
          setOffset(0);
          setAreArticlesLoading(false);
          initialArticles.articles.length < 12
            ? setIsPossibleToFetchMore(false)
            : setIsPossibleToFetchMore(true);
          if (initialArticles.articles.length === 0) {
            setIsEmpty(true);
          }
        }
      }
    };
    fetchArticles();
  }, []);

  const fetchMoreArticles = async () => {
    setAreArticlesLoading(true);
    const newOffset = offset + 12;
    const token = localStorage.getItem("access");
    if (token) {
      setOffset(newOffset);

      const newArticles: savedArticlesApiResponseType =
        await getArticlesFromKnowledgeBase(token, newOffset, 12);
      setOffset(newOffset);

      if (newArticles.articles.length < 12) {
        setIsPossibleToFetchMore(false);
      }
      if (newArticles.articles) {
        const tempArticles: savedArticleType[] = [];
        newArticles.articles.forEach((item) => tempArticles.push(item));
        setArticles((articles) => articles.concat(tempArticles));
        setAreArticlesLoading(false);
      }
    }
  };
  return (
    <section>
      {" "}
      {!isEmpty && !areArticlesLoading ? (
        <>
          <div style={{ overflow: "hidden" }}>
            <section className={styles.wrapper}>
              {articles.slice((page - 1) * 12, page * 12).map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  excerpt={article.excerpt}
                  title={article.title}
                  thumbnail={article.thumbnail}
                />
              ))}{" "}
            </section>
          </div>
          <div className={styles.navigationWrapper}>
            <PageNavigation
              items={articles}
              page={page}
              fetchMore={fetchMoreArticles}
              isPossibleToFetchMore={isPossibleToFetchMore}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <div className={styles.emptyWrapper}>
          {isEmpty ? (
            <div className={styles.instructionWrapper}>
              <span>Tu pojawią się artykuły dodane do twojej bazy wiedzy.</span>

              <span>
                Artykuły dodają się automatycznie w trakcie ich czytania.
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
export default SavedArticles;
