export type ArticleType = {
  id: number;
  title: string;
  excerpt: string;
  difficulty: number;
  thumbnail: string | null;
  category: CategoryType;
};

export type CategoryType = {
  id: number;
  name: string;
};
