import HeroCard from "@/components/landing-page/herocard/HeroCard";
import styles from "@/styles/landing-page/landing-page.module.scss";
import ContentPreview from "@/components/landing-page/herocard/ContentPreview";

export default function Home() {
  return (
    <main>
      <title>LangImmersion | Strona Główna</title>
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
            url: "/ilustracje-01.png",
            alt: "Zdjęcia procesu translacji",
          }}
        />
      </section>
      <section className={`${styles.container} ${styles.blue}`}>
        <ContentPreview
          title="Ucz się i zapamiętuj."
          subtitle="Utrwalaj wcześniej dodane słowa i zapisuj je na swoim urządzeniu."
          image={{
            url: "/ilustracje-02.png",
            alt: "Zdjęcia procesu nauki",
          }}
        />
      </section>
    </main>
  );
}
