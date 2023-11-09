import { Paragraph } from "@/types/ArticleDetails";

export const createStringToTranslate = (
  articleTitle: string,
  articleParagraphs: Paragraph[],
  startWord: {
    paragraphId: number | "title";
    wordId: number;
  },
  endWord: {
    paragraphId: number | "title";
    wordId: number;
  }
) => {
  const firstIndex =
    startWord.wordId < endWord.wordId ? startWord.wordId : endWord.wordId;
  const secondIndex =
    startWord.wordId < endWord.wordId
      ? endWord.wordId + 1
      : startWord.wordId + 1;
  if (startWord.paragraphId !== "title") {
    const words = articleParagraphs[startWord.paragraphId].text.split(" ");
    if (startWord.wordId === endWord.wordId) {
      return words[startWord.wordId];
    }
    return words.slice(firstIndex, secondIndex).join(" ");
  } else {
    const words = articleTitle.split(" ");
    if (startWord.wordId === endWord.wordId) {
      return words[startWord.wordId];
    }
    return words.slice(firstIndex, secondIndex).join(" ");
  }
};
