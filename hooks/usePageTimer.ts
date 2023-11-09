import { addArticleToKnowledgeBase } from "@/lib/api";
import { useEffect, useState } from "react";

const usePageTimer = (articleId: number, token: string | null) => {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeOnPage((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (timeOnPage >= 10 && !isAdded && token) {
      addArticleToKnowledgeBase(token, articleId);
      setIsAdded(true);
    }
    if (isAdded) {
      return () => {};
    }
  }, [timeOnPage, articleId, isAdded, token]);
};

export default usePageTimer;
