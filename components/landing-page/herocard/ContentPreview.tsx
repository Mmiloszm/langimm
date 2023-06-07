import Image from "next/image";
import styles from "@/styles/landing-page/content-preview/content-preview.module.scss";
import CustomIcon from "@/components/shared/custom-icon/CustomIcon";

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
            fill={true}
          ></Image>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="basketball"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Sport</span>
          </div>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="travelculture"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Podróże</span>
          </div>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="fooddrink"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Jedzenie</span>
          </div>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="business"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Biznes</span>
          </div>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="sciencetechnology"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Technologie</span>
          </div>
          <div className={styles.topicContainer}>
            <CustomIcon
              name="environment"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Środowisko</span>
          </div>
          <div
            className={`${styles.topicContainer} ${styles.desktopContainer}`}
          >
            <CustomIcon
              name="education"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Edukacja</span>
          </div>
          <div
            className={`${styles.topicContainer} ${styles.desktopContainer}`}
          >
            <CustomIcon
              name="worldnews"
              size={24}
              color="white"
              weight="bold"
            />
            <span className={styles.topicName}>Newsy</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
