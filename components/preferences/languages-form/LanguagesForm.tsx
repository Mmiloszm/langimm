import { languagesTranslations } from "@/public/locales/pl/translations";
import Image from "next/image";
import { LanguagesAndCategoriesType } from "@/types/LanguageAndCategory";
import styles from "@styles/preferences/language-form/language-form.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

type LanguagesFormPropsType = {
  languages: LanguagesAndCategoriesType[] | undefined;
  updateLanguages: Dispatch<
    SetStateAction<LanguagesAndCategoriesType[] | undefined>
  >;
};

const LanguagesForm = ({
  languages,
  updateLanguages,
}: LanguagesFormPropsType) => {
  const handleSelect = (id: number) => {
    const newLanguages = languages?.map((language) => {
      if (language.id === id) {
        return { ...language, active: true };
      }
      return { ...language, active: false };
    });
    updateLanguages(newLanguages);
  };
  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.formHeader}>Wybierz język.</h2>
      <div className={styles.itemsWrapper}>
        {languages &&
          languages.map((language, index) => {
            let className = styles.item;
            if (language.active) {
              className = `${className} ${styles.active}`;
            }
            if (index === 0) {
              className = `${className} ${styles.firstItem}`;
            }
            if (index === languages.length - 1) {
              className = `${className} ${styles.lastItem}`;
            }
            return (
              <button
                key={language.id}
                className={className}
                onClick={() => {
                  handleSelect(language.id);
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/icons/flags/${language.name}.svg`}
                    fill={true}
                    alt={`flaga ${language.name}`}
                  />
                </div>

                <span className={styles.itemName}>
                  {languagesTranslations[language.id]
                    ? languagesTranslations[language.id]
                    : language.name}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default LanguagesForm;
