"use client";
import Link from "next/link";
import styles from "@styles/shared/navbar/navitems.module.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import { useState } from "react";
import CustomIcon from "../custom-icon/CustomIcon";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

type NavitemsType = {
  version?: "default" | "dashboard";
};

const Navitems = ({ version }: NavitemsType) => {
  const [display, setDisplay] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
                  <Link href={"/signin"} onClick={() => resetDisplay}>
                    <PrimaryButton variants={["navButton", "transparent"]}>
                      zaloguj się
                    </PrimaryButton>
                  </Link>
                </li>
                <li className={styles.item}>
                  <PrimaryButton variants={["navButton", "navRegister"]}>
                    zarejestruj się
                  </PrimaryButton>
                </li>
              </div>
            )}
            {version === "dashboard" && (
              <div className={styles.itemsWrapper}>
                <li className={styles.item}>
                  <Button
                    size="large"
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="quiz"
                        weight="regular"
                        color="white"
                        size={32}
                        alt="quiz"
                      />
                    }
                  >
                    podejmij quiz
                  </Button>
                </li>
                <li className={styles.item}>
                  <Link href="/preferences" passHref>
                    <Button
                      size="large"
                      sx={{ color: "white" }}
                      variant="text"
                      onClick={() => resetDisplay()}
                      startIcon={
                        <CustomIcon
                          name="topic"
                          weight="regular"
                          color="white"
                          size={32}
                          alt="change topics"
                        />
                      }
                    >
                      wybór tematów
                    </Button>
                  </Link>
                </li>
                <li className={`${styles.item} ${styles.desktopMenu}`}>
                  <Button
                    size="large"
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="settings"
                        weight="regular"
                        color="white"
                        size={32}
                        alt="settings"
                      />
                    }
                  >
                    ustawienia
                  </Button>
                </li>
                <li className={`${styles.item} ${styles.desktopMenu}`}>
                  <Button
                    size="large"
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={() => resetDisplay()}
                    startIcon={
                      <CustomIcon
                        name="signout"
                        weight="regular"
                        color="white"
                        size={32}
                        alt="sign out"
                      />
                    }
                  >
                    wyloguj się
                  </Button>
                </li>
                <li className={`${styles.item} ${styles.desktopMenuItems}`}>
                  <div>
                    <IconButton
                      id="positioned-button"
                      aria-controls={open ? "positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleMenuClick}
                    >
                      <CustomIcon
                        name="user"
                        size={48}
                        color="white"
                        alt="Open user settings"
                        weight="regular"
                      />
                    </IconButton>
                    <Menu
                      id="positioned-menu"
                      aria-labelledby="positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          <CustomIcon
                            name="settings"
                            weight="regular"
                            color="#0359a4"
                            size={32}
                            alt="settings"
                          />
                        </ListItemIcon>
                        Ustawienia
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          {" "}
                          <CustomIcon
                            name="signout"
                            weight="regular"
                            color="#0359a4"
                            size={32}
                            alt="sign out"
                          />
                        </ListItemIcon>
                        Wyloguj się
                      </MenuItem>
                    </Menu>
                  </div>
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
