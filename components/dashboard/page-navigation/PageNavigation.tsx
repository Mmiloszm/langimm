import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import { ArticleType } from "@/types/Article";
import { Button } from "@mui/material";
import styles from "@styles/dashboard/page-navigation/page-navigation.module.scss";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

type PageNavigationPropsType = {
  articles: ArticleType[];
  page: number;
  fetchMoreArticles: () => Promise<void>;
  isPossibleToFetchMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

const PageNavigation = ({
  articles,
  page,
  setPage,
  fetchMoreArticles,
  isPossibleToFetchMore,
}: PageNavigationPropsType) => {
  const handleClick = ({ action }: { action: "back" | "forward" }) => {
    if (action === "forward") {
      if (articles.length >= page * 12) {
        fetchMoreArticles();
      }
      setPage((page) => page + 1);
    } else {
      setPage((page) => page - 1);
    }
  };

  const checkIfCanGoForward = () => {
    if (!isPossibleToFetchMore) {
      if (page < Math.ceil(articles.length / 12)) {
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
        size="large"
        disabled={page < 2}
        startIcon={
          <CustomIcon
            name="arrowback"
            size={16}
            weight="bold"
            color="white"
            alt="last page"
          />
        }
      >
        Poprzednia
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick({ action: "forward" })}
        size="large"
        disabled={checkIfCanGoForward()}
        endIcon={
          <CustomIcon
            name="arrowforward"
            size={16}
            weight="bold"
            color="white"
            alt="next page"
          />
        }
      >
        Następna
      </Button>
    </div>
  );
};

export default PageNavigation;
