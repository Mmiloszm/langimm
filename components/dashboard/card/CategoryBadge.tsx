"use client";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { CategoryType } from "@/types/Article";
import styles from "@styles/dashboard/article-card/category-badge.module.scss";
import { useState } from "react";
import { colors } from "@/lib/badge-colors";
import Image from "next/image";

type CategoryBadgePropsType = {
  name: string;
  difficulty: number | null;
  languageName?: string;
};

const CategoryBadge = ({
  name,
  difficulty,
  languageName,
}: CategoryBadgePropsType) => {
  const [category, _] = useState(() => {
    const category = colors.find((entry) => {
      if (entry.name === name) {
        return entry;
      }
    });
    if (category) {
      return category;
    } else {
      return {
        color: "#A9A9A9",
        name: "UNKNOWN",
        iconName: "unknown",
      };
    }
  });

  const getBadgeColor = (level: number | null) => {
    if (level) {
      if (level >= 0.8) {
        return "#EF1346";
      }
      if (level >= 0.4) {
        return "#FF7C14";
      }
      return "#10D132";
    }
    return "#0359A4";
  };
  return (
    <div
      className={styles.badge}
      style={{ backgroundColor: getBadgeColor(difficulty) }}
    >
      <span className={styles.iconWrapper}>
        {!languageName ? (
          <CustomIcon
            name={category.iconName}
            alt={`category ${name} badge`}
            weight="bold"
            size={38}
            color="white"
          />
        ) : (
          <Image
            width={64}
            height={32}
            src={`/icons/flags/${languageName}.svg`}
            alt={`flag of ${languageName}`}
          />
        )}
      </span>
    </div>
  );
};

export default CategoryBadge;
