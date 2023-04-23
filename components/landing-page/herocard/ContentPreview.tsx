import Image from "next/image";
import styles from "@/styles/landing-page/content-preview/content-preview.module.scss";

type ContentPreviewProps = {
  title: string;
  subtitle: string;
  image?: {
    url: string;
    alt: string;
  };
};

const ContentPreview = ({ title, subtitle, image }: ContentPreviewProps) => {
  return (
    <div className={styles.contentWrapper}>
      <span className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>
      </span>
      <span className={styles.subtitleWrapper}>
        <p className={styles.subtitle}>{subtitle}</p>
      </span>
      {image ? (
        <div className={styles.imageWrapper}>
          <Image
            alt={image.alt}
            src={image.url}
            height={245}
            width={300}
          ></Image>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div
            className={`${styles.topicContainer} ${styles.desktopContainer}`}
          >
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div
            className={`${styles.topicContainer} ${styles.desktopContainer}`}
          >
            <Image
              alt="ball"
              src={"/icons/sports_ball.svg"}
              width={24}
              height={24}
            />
            <span className={styles.topicName}>Sport</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
