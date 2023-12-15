"use client";
import { getArticleDetails } from "@/lib/api";
import { ArticleDetails } from "@/types/ArticleDetails";
import styles from "@styles/article/article.module.scss";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import BasicLoader from "../shared/loaders/BasicLoader";
import Image from "next/image";
import Link from "next/link";
import usePageTimer from "@/hooks/usePageTimer";
import Word from "./Word";
import wordStyles from "@/styles/article/word.module.scss";
import { createStringToTranslate } from "@/helpers/createStringToTranslate";
import TutorialPopup from "./TutorialPopup";
import { useRouter } from "next/navigation";
import showTranslationModal from "./showTranslationModal";
import { UserContext } from "@/contexts/UserContext";

const url = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "http://localhost:8000";

export type currentTextType = {
  startWord: {
    paragraphIndex: number | null | "title";
    wordIndex: number | null;
    ref: RefObject<HTMLSpanElement>;
  };
  endWord: {
    paragraphIndex: number | null | "title";
    wordIndex: number | null;
    ref: RefObject<HTMLSpanElement>;
  };
};

const Article = ({ articleId }: { articleId: number }) => {
  const [article, setArticle] = useState<ArticleDetails | undefined>();
  const [selectedTextParams, setSelectedTextParams] = useState<{
    paragraphIndex: number | null | "title";
    wordIndex: number | null;
    ref: RefObject<HTMLSpanElement>;
  }>({
    paragraphIndex: null,
    wordIndex: null,
    ref: useRef(null),
  });
  const [currentText, setCurrentText] = useState<currentTextType>({
    startWord: {
      paragraphIndex: null,
      wordIndex: null,
      ref: useRef(null),
    },
    endWord: {
      paragraphIndex: null,
      wordIndex: null,
      ref: useRef(null),
    },
  });

  const blankRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const { isAuthenticated } = useContext(UserContext);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const newToken = localStorage.getItem("access");
      setToken(newToken);
    } catch (e) {
      setToken(null);
    }
  }, []);

  usePageTimer(articleId, token);

  useEffect(() => {
    if (currentText.startWord.wordIndex === null) {
      setCurrentText({
        ...currentText,
        startWord: {
          paragraphIndex: selectedTextParams.paragraphIndex,
          wordIndex: selectedTextParams.wordIndex,
          ref: selectedTextParams.ref,
        },
      });

      return;
    }
    if (
      currentText.startWord.ref.current !== null &&
      currentText.endWord.ref.current === null
    ) {
      setCurrentText({
        ...currentText,
        endWord: {
          paragraphIndex: selectedTextParams.paragraphIndex,
          wordIndex: selectedTextParams.wordIndex,
          ref: selectedTextParams.ref,
        },
      });

      if (article) {
        if (
          currentText.startWord.paragraphIndex !== null &&
          selectedTextParams.paragraphIndex !== null &&
          selectedTextParams.wordIndex !== null
        ) {
          const selectedText = createStringToTranslate(
            article.title,
            article.paragraphs,
            {
              paragraphId: currentText.startWord.paragraphIndex,
              wordId: currentText.startWord.wordIndex,
            },
            {
              paragraphId: selectedTextParams.paragraphIndex,
              wordId: selectedTextParams.wordIndex,
            }
          );

          showTranslationModal(
            selectedText,
            isAuthenticated,
            router,
            article.id,
            token,
            article.language.name
          );
          resetText();
        }
      }

      return;
    }
  }, [selectedTextParams]);

  useEffect(() => {
    const fetchArticle = async () => {
      const newArticle: ArticleDetails[] = await getArticleDetails(articleId);
      if (newArticle) {
        setArticle(newArticle[0]);
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

  const mapWords = (paragraph: string, paragraphId: number | "title") => {
    const words = paragraph.split(" ");
    const spans = words.map((word, index) => {
      return (
        <Word
          text={word}
          paragraphId={paragraphId}
          key={index}
          id={index}
          setParams={setSelectedTextParams}
          currentText={currentText}
          reset={resetText}
        />
      );
    });
    return spans;
  };

  const resetText = () => {
    if (selectedTextParams.ref.current && currentText.startWord.ref.current) {
      selectedTextParams.ref.current.className = wordStyles.default;
      currentText.startWord.ref.current.className = wordStyles.default;
    }
    setCurrentText({
      startWord: {
        paragraphIndex: null,
        wordIndex: null,
        ref: blankRef,
      },
      endWord: {
        paragraphIndex: null,
        wordIndex: null,
        ref: blankRef,
      },
    });
  };

  return (
    <div className={styles.contentWrapper}>
      {article ? (
        <article className={styles.article}>
          <div className={styles.tooltip}>
            {" "}
            <TutorialPopup />
          </div>

          <h1 className={styles.header}>{mapWords(article.title, "title")}</h1>
          {article.paragraphs.map((paragraph, index) => {
            if (index === 0) {
              if (article.thumbnail !== null) {
                return (
                  <div key={paragraph.id} className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>
                      {mapWords(paragraph.text, index)}
                    </p>
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
                  <p className={styles.paragraph}>
                    {mapWords(paragraph.text, index)}
                  </p>
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
                <p className={styles.paragraph}>
                  {mapWords(paragraph.text, index)}
                </p>
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
          <div className={styles.sourceWrapper}>
            <span className={styles.source}>
              źródło:{" "}
              <Link className={styles.link} href={article.url}>
                {article.url}
              </Link>
            </span>
          </div>
        </article>
      ) : (
        <BasicLoader />
      )}
    </div>
  );
};
export default Article;
