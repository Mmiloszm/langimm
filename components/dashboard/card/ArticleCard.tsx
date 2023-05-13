import { ArticleType } from "@/types/Article";
import Image from "next/image";
import styles from "@styles/dashboard/article-card/article-card.module.scss";
import CategoryBadge from "./CategoryBadge";

const ArticleCard = ({
  id,
  title,
  excerpt,
  thumbnail,
  category,
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
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <CategoryBadge name={category.name} id={category.id} />
        <Image
          alt="article thumbnail"
          src={
            thumbnail
              ? `http://127.0.0.1:8000${thumbnail}`
              : "https://placehold.co/1300x600"
          }
          fill={true}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{truncateExcerpt(excerpt)}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
