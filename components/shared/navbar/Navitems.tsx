"use client";
import Link from "next/link";
import styles from "@styles/shared/navbar/navitems.module.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import { useState } from "react";
import CustomIcon from "../custom-icon/CustomIcon";

const Navitems = () => {
  const [display, setDisplay] = useState(false);
  const handleDisplay = () => {
    const previous = display;
    previous
      ? (document.body.style.overflow = "visible")
      : (document.body.style.overflow = "hidden");
    setDisplay(!previous);
  };
  return (
    <div className={styles.wrapper}>
      <button
        title="Open main menu"
        type="button"
        className={styles.buttonMenu}
        onClick={() => handleDisplay()}
      >
        <CustomIcon name="menu" size={32} weight="bold" color="white" />
      </button>
      <div
        className={styles.container}
        style={{ display: display ? "block" : "none" }}
      >
        <button
          title="Close main menu"
          type="button"
          className={styles.closeIcon}
          onClick={() => handleDisplay()}
        >
          <CustomIcon name="close" size={32} weight="bold" color="white" />
        </button>
        <nav className={styles.mainNav}>
          <ul className={styles.navItems}>
            {/* <li>
              <PrimaryButton variants={["navButton", "transparent"]}>
                placeholder
              </PrimaryButton>
            </li>
            <li>
              <PrimaryButton variants={["navButton", "transparent"]}>
                placeholder
              </PrimaryButton>
            </li>
            <li>
              <PrimaryButton variants={["navButton", "transparent"]}>
                placeholder
              </PrimaryButton>
            </li>
            <span className={styles.divider}></span> */}
            <li>
              <Link href={"/signin"}>
                <PrimaryButton variants={["navButton", "transparent"]}>
                  zaloguj się
                </PrimaryButton>
              </Link>
            </li>
            <li>
              <PrimaryButton variants={["navButton", "navRegister"]}>
                zarejestruj się
              </PrimaryButton>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navitems;
