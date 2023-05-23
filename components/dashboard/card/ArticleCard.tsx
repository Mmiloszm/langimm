import { ArticleType } from "@/types/Article";
import Image from "next/image";
import styles from "@styles/dashboard/article-card/article-card.module.scss";
import CategoryBadge from "./CategoryBadge";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { colors } from "@/lib/badge-colors";

const ArticleCard = ({
  id,
  title,
  excerpt,
  thumbnail,
  category,
  difficulty,
}: ArticleType) => {
  const truncateExcerpt = (toTruncate: string) => {
    if (toTruncate.length > 192) {
      const truncatedString = toTruncate.slice(0, 192).trim();
      const lastWordIndex = truncatedString.lastIndexOf(" ");
      const finalString = truncatedString.slice(0, lastWordIndex) + "...";
      return finalString;
    }
    return toTruncate;
  };

  const getIconName = () => {
    if (category) {
      const icon = colors.find((entry) => {
        if (entry.name === category.name) {
          return entry;
        }
      });

      return icon ? icon.iconName : "unknown";
    }

    return "unknown";
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <CategoryBadge name={category.name} difficulty={difficulty} />
        {thumbnail ? (
          <Image
            alt="article thumbnail"
            src={`http://127.0.0.1:8000${thumbnail}`}
            fill={true}
          />
        ) : (
          <div className={styles.iconWrapper}>
            <CustomIcon
              name={getIconName()}
              size={220}
              color="#194E7C"
              weight="bold"
              alt={category.name}
            />
          </div>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{truncateExcerpt(excerpt)}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
