import { Box, Skeleton } from "@mui/material";
import { translationApiResponseType } from "./showTranslationModal";
import { useEffect, useState } from "react";
import { translateText } from "@/lib/api";
import styles from "@/styles/article/translated-text.module.scss";
import Image from "next/image";
import Link from "next/link";

type translatedTextPropsType = {
  token: string | null;
  languageName: string;
  phrase: string;
};

type translationType = {
  text: string;
  source: string;
};

const TranslatedText = ({
  token,
  languageName,
  phrase,
}: translatedTextPropsType) => {
  const [translation, setTranslation] = useState<translationType | null>(null);
  useEffect(() => {
    const getTranslation = async () => {
      const translation: translationApiResponseType = await translateText(
        token,
        languageName,
        phrase
      );
      if (typeof translation.success === "string") {
        setTranslation({
          text: translation.success,
          source: translation.translation_source,
        });
      } else {
        setTranslation(null);
      }
    };
    getTranslation();
  }, [languageName, phrase, token]);
  return (
    <div className={styles.container}>
      {translation ? (
        <div className={styles.wrapper}>
          <span>{translation.text}</span>
          <div className={styles.sourceWrapper}>
            <span className={styles.source}>
              Powered by
              {translation.source === "deepl" ? (
                <Link href="https://www.deepl.com/">
                  <Image
                    width={64}
                    height={32}
                    src={`/icons/translators/deepl.svg`}
                    alt={`logo deepl`}
                  />
                </Link>
              ) : (
                <Link href="https://translate.google.com">
                  <Image
                    width={64}
                    height={32}
                    src={`/icons/translators/google.svg`}
                    alt={`logo Google Translate`}
                  />
                </Link>
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Skeleton variant="text" width={100} height={35} />
          <Skeleton variant="text" width={130} height={35} />
        </div>
      )}
    </div>
  );
};
export default TranslatedText;
