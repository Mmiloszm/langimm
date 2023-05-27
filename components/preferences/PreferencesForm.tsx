"use client";
import styles from "@styles/preferences/preferences-form.module.scss";
import { useContext, useEffect, useState } from "react";
import LanguagesForm from "./languages-form/LanguagesForm";
import {
  LanguagesAndCategoriesRawType,
  LanguagesAndCategoriesType,
} from "@/types/LanguageAndCategory";
import { redirect } from "next/navigation";
import FormNavigation from "./form-navigation/FormNavigation";
import { PreferencesType } from "@/types/Preferences";
import DifficultyForm from "./difficulty-form/DifficultyForm";
import BasicLoader from "../shared/loaders/BasicLoader";
import TopicsForm from "./topics-form/TopicsForm";
import { getCategories, getLanguages, getPreferences } from "@/lib/api";
import { UserContext } from "@/contexts/UserContext";

export type FormType = "languages" | "difficulty" | "topics";

const PreferencesForm = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [form, setForm] = useState<FormType>("languages");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [languages, setLanguages] = useState<
    LanguagesAndCategoriesType[] | undefined
  >();
  const [categories, setCategories] = useState<
    LanguagesAndCategoriesType[] | undefined
  >();
  const [preferences, setPreferences] = useState<PreferencesType>({
    languages: [],
    categories: [],
  });
  const [currentlyPreferences, setCurrentlyPreferences] = useState<
    PreferencesType | undefined
  >();

  useEffect(() => {
    const fetchLanguages = async () => {
      const languagesRaw: LanguagesAndCategoriesRawType[] =
        await getLanguages();
      if (languagesRaw) {
        const newLanguages = languagesRaw.map((language) => {
          return { ...language, active: false };
        });
        setLanguages(newLanguages);
      }
    };

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

    const fetchCurrentlyPreferences = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const currentlyPreferencesRaw: PreferencesType = await getPreferences(
          token
        );
        if (currentlyPreferencesRaw) {
          console.log(currentlyPreferencesRaw);
          setCurrentlyPreferences(currentlyPreferencesRaw);
        }
      }
    };

    fetchLanguages();
    fetchCategories();
    fetchCurrentlyPreferences();
  }, []);

  useEffect(() => {
    const newLanguage = languages?.find((language) => language.active === true);
    const newCategories = categories
      ?.filter((category) => {
        return category.active === true;
      })
      .map((entry) => {
        return { id: entry.id, name: entry.name };
      });
    if (newLanguage && newCategories) {
      const newPreferences: PreferencesType = {
        languages: [{ id: newLanguage.id, experience: difficulty }],
        categories: newCategories,
      };
      setPreferences(newPreferences);
    }
  }, [languages, difficulty, categories]);

  return (
    <div className={styles.contentWrapper}>
      {isAuthenticated === null ? (
        <div className={styles.loaderWrapper}>
          <BasicLoader />
        </div>
      ) : (
        <div>
          {isAuthenticated === false ? (
            redirect("/")
          ) : (
            <>
              {form === "languages" && (
                <>
                  {languages ? (
                    <>
                      <LanguagesForm
                        languages={languages}
                        updateLanguages={setLanguages}
                      />
                      <FormNavigation
                        canGoFurther={
                          preferences.languages.length > 0 ? false : true
                        }
                        form={form}
                        setForm={setForm}
                      />
                    </>
                  ) : (
                    <div className={styles.loaderWrapper}>
                      <BasicLoader />
                    </div>
                  )}
                </>
              )}
              {form === "difficulty" && (
                <>
                  <DifficultyForm
                    setDifficulty={setDifficulty}
                    selectedDifficulty={difficulty}
                  />
                  <FormNavigation
                    canGoFurther={
                      preferences.languages[0].experience !== null
                        ? false
                        : true
                    }
                    form={form}
                    setForm={setForm}
                  />
                </>
              )}
              {form === "topics" && (
                <div>
                  <TopicsForm
                    categories={categories}
                    updateCategories={setCategories}
                  />
                  <FormNavigation
                    canGoFurther={
                      preferences.categories.length > 0 ? false : true
                    }
                    form={form}
                    setForm={setForm}
                    preferences={preferences}
                    currentlyPreferences={currentlyPreferences}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PreferencesForm;
