import styles from "@styles/landing-page/hero/hero-card.module.scss";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";

const HeroCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.heroTitle}>LangImmersion</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.headlineWrapper}>
            <span className={`${styles.square} ${styles.dark}`}> </span>
            <span className={styles.paragraphWrapper}>
              <p className={styles.cardParagraph}>
                Czytaj newsy ze świata, artykuły oraz wydarzenia ze sportu w
                wybranym języku.
              </p>
            </span>
          </div>
          <div className={styles.headlineWrapper}>
            <span className={`${styles.square} ${styles.light}`}> </span>
            <span className={styles.paragraphWrapper}>
              <p className={styles.cardParagraph}>
                Wyświetlaj tłumaczenia nieznanych słów i dodawaj je do bazy
                wiedzy.
              </p>
            </span>
          </div>
          <div className={styles.headlineWrapper}>
            <span className={`${styles.square} ${styles.dark}`}> </span>
            <span className={styles.paragraphWrapper}>
              <p className={styles.cardParagraph}>
                Rozwiązuj fiszki i ucz się nieznanych słow!
              </p>
            </span>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          {/* <PrimaryButton variants={["transparent", "cardLoginButton"]}>
            Zaloguj się
          </PrimaryButton> */}
          <PrimaryButton variants={["cardRegisterButton"]}>
            Rozpocznij
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
