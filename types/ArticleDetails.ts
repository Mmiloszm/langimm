type Paragraph = {
  id: number;
  text: string;
};

type Image = {
  image: string;
  paragraph_id: number | null;
  caption: string | null;
};

type Category = {
  id: number;
  name: string;
  probability: number;
};

type Language = {
  id: number;
  name: string;
};

export type ArticleDetails = {
  id: number;
  url: string;
  title: string;
  thumbnail: string | null;
  paragraphs: Paragraph[];
  images: Image[];
  categories: Category[];
  language: Language;
};
