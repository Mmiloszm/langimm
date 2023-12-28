import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { Button } from "@mui/material";
import styles from "@styles/shared/page-navigation/page-navigation.module.scss";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

type PageNavigationPropsType = {
  items: any[];
  page: number;
  fetchMore: () => Promise<void>;
  isPossibleToFetchMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

const PageNavigation = ({
  items,
  page,
  setPage,
  fetchMore,
  isPossibleToFetchMore,
}: PageNavigationPropsType) => {
  const { width } = useWindowDimensions();
  const handleClick = ({ action }: { action: "back" | "forward" }) => {
    if (action === "forward") {
      if (items.length >= page * 12) {
        fetchMore();
      }
      setPage((page) => page + 1);
    } else {
      setPage((page) => page - 1);
    }
  };

  const checkIfCanGoForward = () => {
    if (!isPossibleToFetchMore) {
      if (page < Math.ceil(items.length / 12)) {
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <div className={styles.navigateButtons}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick({ action: "back" })}
        size={width < 600 ? "small" : "large"}
        disabled={page < 2}
        startIcon={
          <CustomIcon
            name="arrowback"
            size={16}
            weight="bold"
            color="white"
            alt="ostatnia stroona"
          />
        }
      >
        Poprzednia
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick({ action: "forward" })}
        size={width < 600 ? "small" : "large"}
        disabled={checkIfCanGoForward()}
        endIcon={
          <CustomIcon
            name="arrowforward"
            size={16}
            weight="bold"
            color="white"
            alt="następna strona"
          />
        }
      >
        Następna
      </Button>
    </div>
  );
};

export default PageNavigation;
