export type ArticleType = {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  category: CategoryType;
};

export type CategoryType = {
  id: number;
  name: string;
};
