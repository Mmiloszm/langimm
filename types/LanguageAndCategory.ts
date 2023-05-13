export type LanguagesAndCategoriesRawType = {
  name: string;
  id: number;
};

export type LanguagesAndCategoriesType = LanguagesAndCategoriesRawType & {
  active: boolean;
};
