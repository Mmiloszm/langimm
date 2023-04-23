import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/shared/footer/footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.headline}>
          <Image
            alt="logo"
            src={"/logo-dark.svg"}
            width={100}
            height={100}
            className={styles.logo}
          />
          <h4 className={styles.slogan}>
            Bądź na bieżąco z newsami i językiem
          </h4>
        </div>

        <div className={styles.email}>
          <Image
            alt="email icon"
            src={"/icons/email.svg"}
            width={24}
            height={24}
          />
          <a href="mailto:jakismail@mail.com" className={styles.emailName}>
            jakismail@mail.com
          </a>
        </div>

        <div className={styles.menu}>
          <Link href={"/"} className={styles.menuItem}>
            Skąd czerpiemy artykuły
          </Link>
          <Link href={"/"} className={styles.menuItem}>
            Dostępne języki
          </Link>
          <Link href={"/"} className={styles.menuItem}>
            Polityka prywatności
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
