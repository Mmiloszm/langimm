import Image from "next/image";
import styles from "@/styles/shared/navbar/navbar.module.scss";
import Navitems from "./Navitems";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className={styles.topNavigation}>
      <div className={styles.imageWrapper}>
        <Link href={"/"}>
          <Image src={"/logo-light.svg"} alt="Logo" width={110} height={110} />
        </Link>
      </div>
      <Navitems />
    </header>
  );
};

export default Navbar;
