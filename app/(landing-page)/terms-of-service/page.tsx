import Link from "next/link";
import styles from "@/styles/landing-page/terms-of-service/terms-of-service.module.scss";
const TermsOfServicePage = () => {
  return (
    <main className={styles.container}>
      <title>LangImmersion | Warunki korzystania</title>
      <section className={styles.rules}>
        <h3>
          LangImmersion to projekt edukacyjny. Każda zawartość pisemna
          pochodząca spoza domeny Langimmersion jest wykorzystywana na podstawie
          licencji{" "}
          <Link
            href={"https://en.wikipedia.org/wiki/Creative_Commons"}
            target="_blank"
          >
            Creative Commons
          </Link>
          <p className={styles.paragraph}>
            Pełna lista serwisów z których pochodzą artykuły:
          </p>
          <ul className={styles.list}>
            <li>
              <Link
                href={"https://www.openaccessgovernment.org/"}
                target="_blank"
              >
                openaccessgovernment.org
              </Link>
            </li>
            <li>
              <Link href={"https://www.scidev.net/global/"} target="_blank">
                scidev.net
              </Link>
            </li>
            <li>
              <Link href={"https://en.wikinews.org/"} target="_blank">
                en.wikinews.org
              </Link>
            </li>
            <li>
              <Link href={"https://de.wikinews.org/"} target="_blank">
                de.wikinews.org
              </Link>
            </li>
            <li>
              <Link href={"https://www.20minutos.es/"} target="_blank">
                20minutos.es
              </Link>
            </li>
            <li>
              <Link href={"https://it.wikinews.org/"} target="_blank">
                it.wikinews.org
              </Link>
            </li>
          </ul>
        </h3>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
