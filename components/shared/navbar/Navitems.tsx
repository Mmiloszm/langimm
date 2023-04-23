"use client";
import Image from "next/image";
import styles from "@styles/shared/navbar/navitems.module.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import { useState } from "react";

const Navitems = () => {
  const [display, setDisplay] = useState(false);
  const handleDisplay = () => {
    const previous = display;
    previous
      ? (document.body.style.overflowY = "visible")
      : (document.body.style.overflowY = "hidden");
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
        <Image
          src="/icons/menu.svg"
          alt="open menu"
          width={35}
          height={35}
          className={styles.menuIcon}
        />
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
          <Image
            src="/icons/close.svg"
            alt="close menu"
            width={21}
            height={21}
          />
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
              <PrimaryButton variants={["navButton", "transparent"]}>
                zaloguj się
              </PrimaryButton>
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
