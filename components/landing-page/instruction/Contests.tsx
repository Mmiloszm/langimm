"use client";
import styles from "@/styles/landing-page/instruction/contests.module.scss";
import Link from "next/link";
const Contests = () => {
  const scrollToElement = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    elementId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <section className={styles.contests}>
      <h2>Spis treści</h2>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link
            onClick={(e) => scrollToElement(e, "loginInstructions")}
            className={styles.link}
            href="#loginInstructions"
          >
            Tworzenie konta i logowanie.
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            onClick={(e) => scrollToElement(e, "firstTimeInstructions")}
            className={styles.link}
            href="#firstTimeInstructions"
          >
            Pierwsze kroki.
          </Link>
          <ol className={styles.nested}>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "4")}
                className={styles.link}
                href="#4"
              >
                Wybór języka.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "5")}
                className={styles.link}
                href="#5"
              >
                Wybór poziomu trudności.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "6")}
                className={styles.link}
                href="#6"
              >
                Wybór kategorii.
              </Link>
            </li>
          </ol>
        </li>
        <li className={styles.item}>
          <Link
            onClick={(e) => scrollToElement(e, "dashboardInstructions")}
            className={styles.link}
            href="#dashboardInstructions"
          >
            Panel główny.
          </Link>
          <ol className={styles.nested}>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "8")}
                className={styles.link}
                href="#8"
              >
                Panel filtrowania.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "9")}
                className={styles.link}
                href="#9"
              >
                Artykuły.
              </Link>
            </li>
          </ol>
        </li>
        <li className={styles.item}>
          <Link
            onClick={(e) => scrollToElement(e, "articleInstructions")}
            className={styles.link}
            href="#articleInstructions"
          >
            Widok artykułu.
          </Link>
          <ol className={styles.nested}>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "11")}
                className={styles.link}
                href="#11"
              >
                Tłumaczenie słówek.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "12")}
                className={styles.link}
                href="#12"
              >
                Dodawanie słówek do bazy wiedzy.
              </Link>
            </li>
          </ol>
        </li>
        <li className={styles.item}>
          <Link
            onClick={(e) => scrollToElement(e, "knowledgeBaseInstructions")}
            className={styles.link}
            href="#knowledgeBaseInstructions"
          >
            Baza wiedzy.
          </Link>
          <ol className={styles.nested}>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "14")}
                className={styles.link}
                href="#14"
              >
                Zapisane artykuły.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "15")}
                className={styles.link}
                href="#15"
              >
                Zapisane słówka.
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => scrollToElement(e, "16")}
                className={styles.link}
                href="#16"
              >
                Eksport słówek.
              </Link>
            </li>
          </ol>
        </li>
      </ol>
    </section>
  );
};
export default Contests;
