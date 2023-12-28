"use client";
import Image from "next/image";
import styles from "@/styles/shared/navbar/navbar.module.scss";
import Navitems from "./Navitems";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

type NavbarType = {
  version?: "default" | "dashboard";
};

const Navbar = ({ version }: NavbarType) => {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <header className={styles.topNavigation}>
      <div className={styles.imageWrapper}>
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <Image src={"/logo-light.svg"} alt="Logo" width={110} height={110} />
        </Link>
      </div>
      <Navitems version={version} />
    </header>
  );
};

export default Navbar;
