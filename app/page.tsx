import HeroCard from "@/components/landing-page/herocard/HeroCard";
import styles from "../styles/landing-page/landing-page.module.scss";
import ContentPreview from "@/components/landing-page/herocard/ContentPreview";

export default function Home() {
  return (
    <main>
      <section className={`${styles.container} ${styles.light}`}>
        <HeroCard />
      </section>
      <section className={`${styles.container} ${styles.blue}`}>
        <ContentPreview
          title="Czytaj to, co Cię interesuje."
          subtitle="Wybieraj spośród wielu tematów i personalizuj swoje treści."
        />
      </section>
      <section className={`${styles.container} ${styles.light}`}>
        <ContentPreview
          title="Poznawaj nowe słowa."
          subtitle="W trakcie czytania na bieżąco tłumacz nieznane słowa i dodawaj je do bazy testowej."
          image={{
            url: "https://placehold.co/300x245",
            alt: "Zdjęcia procesu translacji",
          }}
        />
      </section>
      <section className={`${styles.container} ${styles.blue}`}>
        <ContentPreview
          title="Ucz się i zapamiętuj."
          subtitle="Rozwiązuj fiszki zawierające dodane wcześniej przez Ciebie słowa."
          image={{
            url: "https://placehold.co/300x245",
            alt: "Zdjęcia procesu nauki",
          }}
        />
      </section>
    </main>
  );
}
