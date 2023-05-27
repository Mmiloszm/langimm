export type PreferencesType = {
  languages: LanguageType[];
  categories: CategoryType[];
};

export type LanguageType = {
  id: number | null;
  experience: number | null;
};

type CategoryType = {
  id: number;
  name: string;
};
