import styles from "@styles/preferences/difficulties-form/difficulties-form.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { initialDifficulties } from "@/lib/constants/initialDifficulties";
import { PreferencesType } from "@/types/Preferences";
import { LanguagesAndCategoriesType } from "@/types/LanguageAndCategory";

type DifficultyFormPropsType = {
  selectedDifficulty: number | null;
  setDifficulty: Dispatch<SetStateAction<number | null>>;
  preferencesDifficulty?: number | null;
};

const DifficultyForm = ({
  setDifficulty,
  selectedDifficulty,
  preferencesDifficulty,
}: DifficultyFormPropsType) => {
  const [difficulties, setDifficulties] = useState(
    initialDifficulties.map((difficulty) => {
      if (selectedDifficulty) {
        if (difficulty.value === selectedDifficulty) {
          return { ...difficulty, active: true };
        }
      } else if (preferencesDifficulty) {
        if (difficulty.value === preferencesDifficulty) {
          setDifficulty(preferencesDifficulty);
          return { ...difficulty, active: true };
        }
      }

      return difficulty;
    })
  );

  const handleSelect = (value: number) => {
    const newDifficulties = difficulties.map((difficulty) => {
      if (difficulty.value === value) {
        setDifficulty(difficulty.value);
        return { ...difficulty, active: true };
      }
      return { ...difficulty, active: false };
    });
    setDifficulties(newDifficulties);
  };

  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.formHeader}>Wybierz trudność.</h2>
      <div className={styles.itemsWrapper}>
        {difficulties &&
          difficulties.map((difficulty, index) => {
            let iconClassName = "";

            let className = styles.item;
            if (difficulty.active) {
              className = `${className} ${styles.active}`;
              iconClassName = styles.activeIcon;
            }
            if (index === 0) {
              className = `${className} ${styles.firstItem}`;
            }
            if (index === difficulties.length - 1) {
              className = `${className} ${styles.lastItem}`;
            }
            return (
              <button
                key={difficulty.value}
                className={className}
                onClick={() => {
                  handleSelect(difficulty.value);
                }}
              >
                <div className={`${styles.iconWrapper} ${iconClassName}`}>
                  <span className={styles.icon}>{difficulty.shortcut}</span>
                </div>
                <span className={styles.itemName}>{difficulty.name}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default DifficultyForm;
