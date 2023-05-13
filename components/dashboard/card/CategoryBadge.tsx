"use client";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { CategoryType } from "@/types/Article";
import styles from "@styles/dashboard/article-card/category-badge.module.scss";
import { useState } from "react";

const colors = [
  { color: "#FFA704", name: "LIFESTYLE", iconName: "lifestyle" },
  { color: "#D22B2B", name: "POLITICS", iconName: "politics" },
  { color: "#CF9FFF", name: "ENTERTAINMENT", iconName: "entertainment" },
  { color: "#5D3FD3", name: "WORLD NEWS", iconName: "worldnews" },
  { color: "#009E60", name: "TRAVEL & CULTURE", iconName: "travelculture" },
  { color: "#CC7722", name: "PARENTING", iconName: "parenting" },
  { color: "#40B5AD", name: "MINORITIES VOICES", iconName: "minoritiesvoices" },
  { color: "#191970", name: "GENERAL", iconName: "general" },
  { color: "#B87333", name: "RELIGION", iconName: "religion" },
  { color: "#E4D00A", name: "FOOD & DRINK", iconName: "fooddrink" },
  { color: "#C9CC3F", name: "BUSINESS", iconName: "business" },
  { color: "#00FF7F", name: "SPORTS", iconName: "sports" },
  {
    color: "#6082B6",
    name: "SCIENCE & TECHNOLOGY",
    iconName: "sciencetechnology",
  },
  { color: "#04D13A", name: "ENVIRONMENT", iconName: "environment" },
  { color: "#FF7F50", name: "WOMEN", iconName: "women" },
  { color: "#8E44AD", name: "EDUCATION", iconName: "education" },
];

const CategoryBadge = ({ name, id }: CategoryType) => {
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
  return (
    <div className={styles.badge} style={{ backgroundColor: category.color }}>
      <span className={styles.iconWrapper}>
        <CustomIcon
          name={category.iconName}
          alt={`category ${name} badge`}
          weight="bold"
          size={38}
          color="white"
        />
      </span>
    </div>
  );
};

export default CategoryBadge;
