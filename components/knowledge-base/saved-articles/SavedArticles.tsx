import { getArticlesFromKnowledgeBase } from "@/lib/api";
import { ArticleType } from "@/types/Article";
import { useEffect, useState } from "react";

const SavedArticles = () => {
  const [areArticlesLoading, setAreArticlesLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<ArticleType[]>();

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const initialArticles: ArticleType[] =
          await getArticlesFromKnowledgeBase(token, offset, 12);

        if (initialArticles) {
          setArticles(initialArticles);

          setAreArticlesLoading(false);
          initialArticles.length < 12
            ? setIsPossibleToFetchMore(false)
            : setIsPossibleToFetchMore(true);
        }
      }
    };
    fetchArticles();
  }, []);
  return <section>artykuly</section>;
};
export default SavedArticles;
