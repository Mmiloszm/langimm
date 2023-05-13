import Image from "next/image";
import styles from "@/styles/shared/navbar/navbar.module.scss";
import Navitems from "./Navitems";
import Link from "next/link";

type NavbarType = {
  version?: "default" | "dashboard";
};

const Navbar = ({ version }: NavbarType) => {
  return (
    <header className={styles.topNavigation}>
      <div className={styles.imageWrapper}>
        <Link href={"/"}>
          <Image src={"/logo-light.svg"} alt="Logo" width={110} height={110} />
        </Link>
      </div>
      <Navitems version={version} />
    </header>
  );
};

export default Navbar;
