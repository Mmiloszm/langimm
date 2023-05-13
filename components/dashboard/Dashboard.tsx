"use client";
import { UserContext } from "@/contexts/UserContext";
import { getArticles, getCategories, getLanguages } from "@/lib/api";
import { ArticleType } from "@/types/Article";
import {
  LanguagesAndCategoriesRawType,
  LanguagesAndCategoriesType,
} from "@/types/LanguageAndCategory";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "@styles/dashboard/dashboard.module.scss";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./card/ArticleCard";
import ArticleLoader from "./card/ArticleLoader";
import Filter from "./filters/Filter";
import Sort from "./filters/Sort";

const Dashboard = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [sort, setSort] = useState("nearest_difficulty");
  const [offset, setOffset] = useState(12);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [categories, setCategories] = useState<LanguagesAndCategoriesType[]>();

  const [languages, setLanguages] = useState<LanguagesAndCategoriesType[]>();

  const [articles, setArticles] = useState<ArticleType[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRaw: LanguagesAndCategoriesRawType[] =
        await getCategories();
      if (categoriesRaw) {
        const newCategories = categoriesRaw.map((category) => {
          return { ...category, active: false };
        });
        setCategories(newCategories);
      }
    };

    const fetchLanguages = async () => {
      const languagesRaw: LanguagesAndCategoriesRawType[] =
        await getLanguages();
      if (languagesRaw) {
        const newLanguages = languagesRaw.map((language) => {
          if (language.name === "ENGLISH") {
            return { ...language, active: true };
          }
          return { ...language, active: false };
        });
        setLanguages(newLanguages);
      }
    };

    const fetchArticles = async () => {
      const initialArticles: ArticleType[] = await getArticles({
        languageId: 1,
        categoriesId: "",
        limit: 12,
        offset: 0,
      });
      if (initialArticles) {
        setArticles(initialArticles);
      }
    };
    fetchCategories();
    fetchLanguages();
    fetchArticles();
  }, []);

  const fetchMoreArticles = async () => {
    const newArticles: ArticleType[] = await getArticles({
      languageId: 1,
      categoriesId: "",
      limit: 12,
      offset: offset,
    });
    setOffset((offset) => offset + 12);
    if (newArticles.length < 12) {
      setIsPossibleToFetchMore(false);
    }
    if (newArticles) {
      setArticles((articles) => articles?.concat(newArticles));
    }
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  return !isAuthenticated ? (
    redirect("/")
  ) : (
    <div className={styles.contentWrapper}>
      <section className={styles.filtersWrapper}>
        <Filter
          categories={categories}
          setCategories={setCategories}
          languages={languages}
          setLanguages={setLanguages}
        />
        <Sort sort={sort} handleSortChange={handleSortChange} />
      </section>

      {articles ? (
        <div style={{ overflow: "hidden" }}>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreArticles}
            hasMore={isPossibleToFetchMore}
            loader={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <ArticleLoader />
              </div>
            }
            endMessage={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <h2>To wszystko!</h2>
              </div>
            }
          >
            <section className={styles.articlesWrapper}>
              {articles.map((article) => (
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  thumbnail={article.thumbnail}
                  key={article.id}
                  excerpt={article.excerpt}
                  category={article.category}
                ></ArticleCard>
              ))}{" "}
            </section>
          </InfiniteScroll>
        </div>
      ) : (
        <ArticleLoader />
      )}
    </div>
  );
};

export default Dashboard;
