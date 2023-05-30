"use client";
import { getArticleDetails } from "@/lib/api";
import { ArticleDetails } from "@/types/ArticleDetails";
import styles from "@styles/article/article.module.scss";
import { useEffect, useState } from "react";
import BasicLoader from "../shared/loaders/BasicLoader";
import Image from "next/image";
import Link from "next/link";

const url = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "http://localhost:8000";

const Article = ({ articleId }: { articleId: number }) => {
  const [article, setArticle] = useState<ArticleDetails | undefined>();

  useEffect(() => {
    const fetchArticle = async () => {
      const newArticle: ArticleDetails[] = await getArticleDetails(articleId);
      if (newArticle) {
        setArticle(newArticle[0]);
        console.log(newArticle);
      }
    };
    fetchArticle();
  }, [articleId]);

  const findImage = (paragraphId: number) => {
    if (article) {
      const image = article.images.find((image) => {
        return image.paragraph_id === paragraphId;
      });
      if (image) {
        return image;
      }
      return null;
    }
  };
  return (
    <div className={styles.contentWrapper}>
      {article ? (
        <div className={styles.article}>
          <h1 className={styles.header}>{article.title}</h1>
          {article.paragraphs.map((paragraph, index) => {
            if (index === 0) {
              if (article.thumbnail !== null) {
                return (
                  <div key={paragraph.id} className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>{paragraph.text}</p>
                    <div className={styles.thumbnail}>
                      <Image
                        alt="article thumbnail"
                        src={`${url}${article.thumbnail}`}
                        fill={true}
                      />
                    </div>
                  </div>
                );
              }
            }
            const paragraphImage = findImage(paragraph.id);
            if (paragraphImage && paragraphImage.image !== article.thumbnail) {
              return (
                <div key={paragraph.id} className={styles.paragraphWrapper}>
                  <p className={styles.paragraph}>{paragraph.text}</p>
                  <div className={styles.imageWrapper}>
                    <div className={styles.thumbnailWrapper}>
                      <Image
                        alt="article thumbnail"
                        src={`${url}${paragraphImage.image}`}
                        fill={true}
                      />
                    </div>
                    {paragraphImage.caption && (
                      <span className={styles.caption}>
                        {paragraphImage.caption}
                      </span>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div key={paragraph.id} className={styles.paragraphWrapper}>
                <p className={styles.paragraph}>{paragraph.text}</p>
              </div>
            );
          })}
          {article.images &&
            article.images.map((image) => {
              if (
                image.paragraph_id === null &&
                image.image !== article.thumbnail
              ) {
                return (
                  <div
                    key={image.paragraph_id}
                    className={styles.paragraphWrapper}
                  >
                    <div className={styles.imageWrapper}>
                      <div
                        className={styles.thumbnailWrapper}
                        key={image.paragraph_id}
                      >
                        <Image
                          alt="article thumbnail"
                          src={`${url}${article.thumbnail}`}
                          fill={true}
                        />
                        {image.caption && (
                          <span className={styles.caption}>
                            {image.caption}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <span className={styles.source}>
            źródło:{" "}
            <Link className={styles.link} href={article.url}>
              {article.url}
            </Link>
          </span>
        </div>
      ) : (
        <BasicLoader />
      )}
    </div>
  );
};
export default Article;
