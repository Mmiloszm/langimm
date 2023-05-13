"use client";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { Button } from "@mui/material";
import styles from "@styles/dashboard/filters/filter.module.scss";
import { LanguagesAndCategoriesType } from "@/types/LanguageAndCategory";
import {
  categoryTranslations,
  languagesTranslations,
} from "@/public/locales/pl/translations";
import FilterSkeleton from "./FilterSkeleton";

type FilterPropsType = {
  categories: LanguagesAndCategoriesType[] | undefined;
  languages: LanguagesAndCategoriesType[] | undefined;
  setCategories: Dispatch<
    SetStateAction<LanguagesAndCategoriesType[] | undefined>
  >;
  setLanguages: Dispatch<
    SetStateAction<LanguagesAndCategoriesType[] | undefined>
  >;
};

const Filter = ({
  categories,
  languages,
  setCategories,
  setLanguages,
}: FilterPropsType) => {
  const [toggle, setToggle] = useState(false);

  const handleCategoryUpdate = (current: LanguagesAndCategoriesType) => {
    if (categories) {
      const updated = categories.map((category) => {
        if (category.id === current.id) {
          return { ...category, active: !category.active };
        }
        return category;
      });
      return updated;
    }
  };

  const handleLanguageUpdate = (current: LanguagesAndCategoriesType) => {
    if (languages) {
      const updated = languages.map((language) => {
        if (language.id === current.id) {
          return { ...language, active: !language.active };
        }
        return { ...language, active: false };
      });
      return updated;
    }
  };

  const renderSkeletons = (len: number) => {
    return Array.from({ length: len }, (_, index) => (
      <li className={styles.listItem} key={index}>
        <FilterSkeleton />
      </li>
    ));
  };

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <div className={styles.wrapper}>
        <Button
          variant="outlined"
          onClick={() => setToggle(true)}
          className={styles.button}
          startIcon={
            <CustomIcon
              name="filter"
              alt="filter"
              color="#0359A4"
              weight="bold"
            />
          }
          sx={{
            borderColor: "primary.dark",
            color: "primary.dark",
            textTransform: "capitalize",
            fontWeight: "medium",
            fontSize: "inherit",
          }}
        >
          Filtry
        </Button>

        <div
          className={styles.filterOverlay}
          style={{ display: toggle ? "block" : "none" }}
        >
          <button
            title="Close filter menu"
            type="button"
            className={styles.closeIcon}
            onClick={() => {
              setToggle(false);
            }}
          >
            <CustomIcon name="close" size={32} weight="bold" color="white" />
          </button>
          <div className={styles.overlayWrapper}>
            <div className={styles.filtersWrapper}>
              <h2 className={styles.header}>Języki</h2>
              <hr className={styles.divider} />
              <ul className={styles.list}>
                {languages ? (
                  languages.map((language) => {
                    return (
                      <li key={language.id} className={styles.listItem}>
                        <button
                          type="button"
                          className={styles.filterButton}
                          style={{
                            backgroundColor: language.active
                              ? "#0597f2"
                              : "transparent",
                          }}
                          onClick={() => {
                            const updated = handleLanguageUpdate(language);
                            setLanguages(updated);
                          }}
                        >
                          {language.active && (
                            <CustomIcon
                              name="close"
                              color="white"
                              weight="bold"
                              alt="close"
                              size={20}
                            />
                          )}

                          <span
                            className={`${
                              language.active ? styles.buttonText : ""
                            }`}
                          >
                            {languagesTranslations[language.id]
                              ? languagesTranslations[language.id]
                              : language.name}
                          </span>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <>{renderSkeletons(4)}</>
                )}
              </ul>
            </div>
            <div className={styles.filtersWrapper}>
              <h2 className={styles.header}>Kategorie</h2>
              <hr className={styles.divider} />
              <ul className={styles.list}>
                {categories ? (
                  categories.map((category) => {
                    return (
                      <li key={category.id} className={styles.listItem}>
                        <button
                          type="button"
                          className={styles.filterButton}
                          style={{
                            backgroundColor: category.active
                              ? "#0597f2"
                              : "transparent",
                          }}
                          onClick={() => {
                            const updated = handleCategoryUpdate(category);
                            setCategories(updated);
                          }}
                        >
                          {category.active && (
                            <CustomIcon
                              name="close"
                              color="white"
                              weight="bold"
                              alt="close"
                              size={20}
                            />
                          )}

                          <span
                            className={`${
                              category.active ? styles.buttonText : ""
                            }`}
                          >
                            {categoryTranslations[category.id]
                              ? categoryTranslations[category.id]
                              : category.name}
                          </span>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <>{renderSkeletons(16)}</>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Filter;
