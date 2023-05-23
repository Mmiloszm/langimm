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
import ArticleCard from "./card/ArticleCard";
import BasicLoader from "../shared/loaders/BasicLoader";
import Filter from "./filters/Filter";
import Sort from "./filters/Sort";
import Fab from "@mui/material/Fab";
import CustomIcon from "../shared/custom-icon/CustomIcon";
import PageNavigation from "./page-navigation/PageNavigation";
import { ArticlesQueryParamsType } from "@/types/ArticlesQueryParams";

const Dashboard = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [sort, setSort] = useState<"nearest_difficulty" | "newest">(
    "nearest_difficulty"
  );

  const [articlesQueryParams, setArticlesQueryParams] =
    useState<ArticlesQueryParamsType>({
      languageId: 1,
      categoriesId: undefined,
      limit: 12,
      offset: 0,
      sort: "nearest_difficulty",
    });
  const [areArticlesLoading, setAreArticlesLoading] = useState(true);
  const [offset, setOffset] = useState(12);
  const [isPossibleToFetchMore, setIsPossibleToFetchMore] = useState(true);
  const [categories, setCategories] = useState<LanguagesAndCategoriesType[]>();

  const [languages, setLanguages] = useState<LanguagesAndCategoriesType[]>();

  const [articles, setArticles] = useState<ArticleType[]>();
  const [page, setPage] = useState(1);

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

    fetchCategories();
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      if (languages && categories) {
        const selectedLanguage = languages.find(
          (language) => language.active === true
        );
        const selectedCategories = categories
          .filter((category) => {
            if (category.active === true) {
              return category;
            }
          })
          .map((category) => category.id);
        if (selectedLanguage) {
          const languageQuery = selectedLanguage.id;
          const categoriesQuery = selectedCategories.join(",");

          const newParams: ArticlesQueryParamsType = {
            languageId: languageQuery,
            limit: 12,
            offset: 0,
            categoriesId: categoriesQuery ? categoriesQuery : "",
            sort: sort,
          };
          setPage(1);
          setArticlesQueryParams(newParams);

          const initialArticles: ArticleType[] = await getArticles(newParams);
          if (initialArticles) {
            setArticles(initialArticles);
            setOffset(0);
            setAreArticlesLoading(false);
            initialArticles.length < 12
              ? setIsPossibleToFetchMore(false)
              : setIsPossibleToFetchMore(true);
          }
        }
      }
    };

    fetchArticles();
  }, [categories, languages, sort]);

  const fetchMoreArticles = async () => {
    setAreArticlesLoading(true);
    const newOffset = offset + 12;
    const newArticles: ArticleType[] = await getArticles({
      ...articlesQueryParams,
      offset: newOffset,
    });
    setOffset(newOffset);
    if (newArticles.length < 12) {
      setIsPossibleToFetchMore(false);
    }
    if (newArticles) {
      setArticles((articles) => articles?.concat(newArticles));
      setAreArticlesLoading(false);
    }
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as "nearest_difficulty" | "newest");
  };
  return (
    <div>
      {isAuthenticated === null ? (
        <div className={styles.contentWrapper}>
          <BasicLoader />
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          {isAuthenticated === false ? (
            redirect("/")
          ) : (
            <>
              <section className={styles.filtersWrapper}>
                <Filter
                  categories={categories}
                  setCategories={setCategories}
                  languages={languages}
                  setLanguages={setLanguages}
                />
                <Sort sort={sort} handleSortChange={handleSortChange} />
              </section>

              {articles && !areArticlesLoading ? (
                <>
                  <div style={{ overflow: "hidden" }}>
                    <section className={styles.articlesWrapper}>
                      {articles
                        .slice((page - 1) * 12, page * 12)
                        .map((article) => (
                          <ArticleCard
                            id={article.id}
                            title={article.title}
                            thumbnail={article.thumbnail}
                            key={article.id}
                            excerpt={article.excerpt}
                            difficulty={article.difficulty}
                            category={article.category}
                          ></ArticleCard>
                        ))}{" "}
                    </section>
                  </div>
                  <PageNavigation
                    articles={articles}
                    page={page}
                    fetchMoreArticles={fetchMoreArticles}
                    isPossibleToFetchMore={isPossibleToFetchMore}
                    setPage={setPage}
                  />
                </>
              ) : (
                <BasicLoader />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
