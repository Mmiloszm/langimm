"use client";

import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/knowledge-base/knowledge-base.module.scss";
import BasicLoader from "../shared/loaders/BasicLoader";
import { redirect } from "next/navigation";
import SavedArticles from "./saved-articles/SavedArticles";
import SavedWords from "./saved-words/SavedWords";

const KnowledgeBase = () => {
  const [selectedTab, setSelectedTab] = useState<"words" | "articles">(
    "articles"
  );
  const { isAuthenticated, logout } = useContext(UserContext);

  const handleTabSwitch = (option: "words" | "articles") => {
    if (selectedTab === "articles" && option === "words") {
      setSelectedTab("words");
    }
    if (selectedTab === "words" && option === "articles") {
      setSelectedTab("articles");
    }
  };

  return (
    <div>
      {isAuthenticated === null ? (
        <div className={styles.contentWrapper}>
          <BasicLoader />
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          {isAuthenticated === false ? (
            redirect("/")
          ) : (
            <>
              <div className={styles.content}>
                <div className={styles.tabs}>
                  <button
                    className={`${styles.button} ${
                      selectedTab === "articles" ? styles.selected : ""
                    }`}
                    onClick={() => handleTabSwitch("articles")}
                  >
                    Artykuły
                  </button>
                  <button
                    className={`${styles.button} ${
                      selectedTab === "words" ? styles.selected : ""
                    }`}
                    onClick={() => handleTabSwitch("words")}
                  >
                    Słówka
                  </button>
                </div>
                <div className={styles.container}>
                  {selectedTab === "articles" ? (
                    <div className={styles.savedArticles}>
                      <SavedArticles />
                    </div>
                  ) : (
                    <div className={styles.savedWords}>
                      <SavedWords />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default KnowledgeBase;
