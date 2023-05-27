"use client";
import { UserContext } from "@/contexts/UserContext";
import {
  getArticles,
  getCategories,
  getLanguages,
  getPreferences,
  updatePreferences,
} from "@/lib/api";
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
import PageNavigation from "./page-navigation/PageNavigation";
import { ArticlesQueryParamsType } from "@/types/ArticlesQueryParams";
import Link from "next/link";

type PreferencesRawType = {
  languages: LanguagesAndCategoriesRawType[] & { experience: number };
  categories: LanguagesAndCategoriesRawType[];
};

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
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const preferencesRaw: PreferencesRawType = await getPreferences(token);
        if (preferencesRaw) {
          const newCategories = preferencesRaw.categories.map((category) => {
            return { ...category, active: false };
          });
          const newLanguages = preferencesRaw.languages.map(
            (language, index) => {
              if (index === 0) {
                return { ...language, active: true };
              }
              return { ...language, active: false };
            }
          );

          if (newLanguages.length < 1) {
            setIsEmpty(true);
          }
          setCategories(newCategories);
          setLanguages(newLanguages);
        }
      }
    };

    if (isAuthenticated) {
      fetchPreferences();
    }
  }, [isAuthenticated]);

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
              {!isEmpty ? (
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
                </>
              ) : (
                <div className={styles.emptyPreferences}>
                  <p className={styles.emptyText}>
                    Narazie nic tu nie ma... Kliknij{" "}
                    <Link href={"/preferences"} className={styles.link}>
                      tutaj
                    </Link>{" "}
                    aby ustawić preferencje.{" "}
                  </p>
                </div>
              )}

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
                <>{isEmpty && <BasicLoader />}</>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;