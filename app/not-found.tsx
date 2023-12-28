import Link from "next/link";
import styles from "@/styles/shared/not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorWrapper}>
        <h2>Nie znaleziono strony!</h2>
        <p>Upewnij się, że link jest prawidłowy</p>
        <Link href="/">Powrót na stronę główną</Link>
      </div>
    </div>
  );
}
