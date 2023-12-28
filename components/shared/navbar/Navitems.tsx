"use client";
import Link from "next/link";
import styles from "@styles/shared/navbar/navitems.module.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
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
  const { logout } = useContext(UserContext);
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
                  <Link
                    href={"/signin"}
                    onClick={() => {
                      resetDisplay();
                    }}
                  >
                    <PrimaryButton variants={["navButton", "transparent"]}>
                      zaloguj się
                    </PrimaryButton>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href={"/register"} onClick={() => resetDisplay()}>
                    <PrimaryButton variants={["navButton", "navRegister"]}>
                      zarejestruj się
                    </PrimaryButton>
                  </Link>
                </li>
              </div>
            )}
            {version === "dashboard" && (
              <div className={styles.itemsWrapper}>
                <li className={styles.item}>
                  <Link href="/dashboard" passHref>
                    <Button
                      size="large"
                      sx={{ color: "white" }}
                      variant="text"
                      onClick={() => {
                        handleDisplay();
                        resetDisplay();
                      }}
                      startIcon={
                        <CustomIcon
                          name="appwindow"
                          weight="regular"
                          color="white"
                          size={32}
                          alt="dashboard"
                        />
                      }
                    >
                      Artykuły
                    </Button>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/knowledge-base" passHref>
                    <Button
                      size="large"
                      sx={{ color: "white" }}
                      variant="text"
                      onClick={() => {
                        handleDisplay();
                        resetDisplay();
                      }}
                      startIcon={
                        <CustomIcon
                          name="database"
                          weight="regular"
                          color="white"
                          size={32}
                          alt="baza wiedzy"
                        />
                      }
                    >
                      baza wiedzy
                    </Button>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/preferences" passHref>
                    <Button
                      size="large"
                      sx={{ color: "white" }}
                      variant="text"
                      onClick={() => {
                        handleDisplay();
                        resetDisplay();
                      }}
                      startIcon={
                        <CustomIcon
                          name="topic"
                          weight="regular"
                          color="white"
                          size={32}
                          alt="zmiana tematów"
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
                    onClick={() => {
                      logout();
                      resetDisplay();
                    }}
                    startIcon={
                      <CustomIcon
                        name="signout"
                        weight="regular"
                        color="white"
                        size={32}
                        alt="wyloguj się"
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
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          logout();
                        }}
                      >
                        <ListItemIcon>
                          {" "}
                          <CustomIcon
                            name="signout"
                            weight="regular"
                            color="#0359a4"
                            size={32}
                            alt="wyloguj się"
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
