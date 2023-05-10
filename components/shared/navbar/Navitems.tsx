"use client";
import Link from "next/link";
import styles from "@styles/shared/navbar/navitems.module.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import { useState } from "react";
import CustomIcon from "../custom-icon/CustomIcon";
import { Button } from "@mui/material";

type NavitemsType = {
  version?: "default" | "dashboard";
};

const Navitems = ({ version }: NavitemsType) => {
  const [display, setDisplay] = useState(false);
  const handleDisplay = () => {
    const previous = display;
    previous
      ? (document.body.style.overflow = "visible")
      : (document.body.style.overflow = "hidden");
    setDisplay(!previous);
  };

  const resetDisplay = () => {
    document.body.style.overflow = "visible";
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
            {version === "default" && (
              <div className={styles.itemsWrapper}>
                <li className={styles.item}>
                  <Link href={"/signin"}>
                    <Button
                      sx={{ color: "white" }}
                      variant="text"
                      onClick={() => resetDisplay()}
                    >
                      zaloguj się
                    </Button>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Button variant="contained" onClick={() => resetDisplay()}>
                    zarejestruj się
                  </Button>
                </li>
              </div>
            )}
            {version === "dashboard" && (
              <div className={styles.itemsWrapper}>
                <li className={styles.item}>
                  <Button
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="quiz"
                        weight="regular"
                        color="white"
                        size={24}
                        alt="quiz"
                      />
                    }
                  >
                    podejmij quiz
                  </Button>
                </li>
                <li className={styles.item}>
                  <Button
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="topic"
                        weight="regular"
                        color="white"
                        size={24}
                        alt="change topics"
                      />
                    }
                  >
                    wybór tematów
                  </Button>
                </li>
                <li className={styles.item}>
                  <Button
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="settings"
                        weight="regular"
                        color="white"
                        size={24}
                        alt="settings"
                      />
                    }
                  >
                    ustawienia
                  </Button>
                </li>
                <li className={styles.item}>
                  <Button
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="signout"
                        weight="regular"
                        color="white"
                        size={24}
                        alt="sign out"
                      />
                    }
                  >
                    wyloguj się
                  </Button>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navitems;
