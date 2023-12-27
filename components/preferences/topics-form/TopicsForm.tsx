import { categoryTranslations } from "@/public/locales/pl/translations";
import { LanguagesAndCategoriesType } from "@/types/LanguageAndCategory";
import styles from "@styles/preferences/topics-form.module.scss/topics-form.module.scss";
import { Dispatch, SetStateAction } from "react";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { colors } from "@/lib/badge-colors";
import { useMediaQuery } from "@mui/material";

type LanguagesFormPropsType = {
  categories: LanguagesAndCategoriesType[] | undefined;
  updateCategories: Dispatch<
    SetStateAction<LanguagesAndCategoriesType[] | undefined>
  >;
};

const TopicsForm = ({
  categories,
  updateCategories,
}: LanguagesFormPropsType) => {
  const matches = useMediaQuery("(min-width: 992px)");

  const handleSelect = (id: number) => {
    const newCategories = categories?.map((category) => {
      if (category.id === id) {
        return { ...category, active: !category.active };
      }
      return { ...category };
    });
    updateCategories(newCategories);
  };

  const findIcon = (categoryName: string) => {
    const icon = colors.find((entry) => entry.name === categoryName);
    if (icon) {
      return icon.iconName;
    }
    return "unknown";
  };
  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.formHeader}>Wybierz tematy.</h2>
      <div className={styles.itemsWrapper}>
        {categories &&
          categories.map((category, index) => {
            let className = styles.item;
            if (category.active) {
              className = `${className} ${styles.active}`;
            }
            if (index === 0) {
              className = `${className} ${styles.firstItem}`;
            }
            if (index === categories.length - 1) {
              className = `${className} ${styles.lastItem}`;
            }
            return (
              <button
                key={category.id}
                className={className}
                onClick={() => {
                  handleSelect(category.id);
                }}
              >
                <CustomIcon
                  name={findIcon(category.name)}
                  color="#00206a"
                  size={matches ? 128 : 32}
                  weight="bold"
                  alt={`kategoria ${category.name}`}
                />
                <span className={styles.itemName}>
                  {categoryTranslations[category.id]
                    ? categoryTranslations[category.id]
                    : category.name}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default TopicsForm;
