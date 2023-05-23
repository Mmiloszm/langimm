export type ArticlesQueryParamsType = {
  languageId: number;
  categoriesId?: string;
  sort: "nearest_difficulty" | "newest";
  limit: number;
  offset: number;
};
