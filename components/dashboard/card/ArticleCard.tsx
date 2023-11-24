import { ArticleType, CategoryType } from "@/types/Article";
import Image from "next/image";
import styles from "@styles/dashboard/article-card/article-card.module.scss";
import CategoryBadge from "./CategoryBadge";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { colors } from "@/lib/badge-colors";
import Link from "next/link";

type ArticleCardPropsType = {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  category?: CategoryType;
  difficulty?: number;
};

const ArticleCard = ({
  id,
  title,
  excerpt,
  thumbnail,
  category,
  difficulty,
}: ArticleCardPropsType) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
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
    <Link href={`/article/${id}`} passHref className={styles.link}>
      <div className={styles.cardWrapper}>
        <div className={styles.imageWrapper}>
          {difficulty && category && (
            <CategoryBadge name={category.name} difficulty={difficulty} />
          )}
          {thumbnail ? (
            <Image
              alt="article thumbnail"
              src={`${url}${thumbnail}`}
              fill={true}
            />
          ) : (
            <div className={styles.iconWrapper}>
              <CustomIcon
                name={getIconName()}
                size={220}
                color="#194E7C"
                weight="bold"
                alt="default thumbnail"
              />
            </div>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{truncateExcerpt(excerpt)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
