import { ArticlesQueryParamsType } from "@/types/ArticlesQueryParams";
import { RegistrationUserProps } from "@/types/Auth";
import { UserProps } from "@/types/Auth";
import { PreferencesType } from "@/types/Preferences";
import Swal from "sweetalert2";

type FetcherProps = {
  url: string;
  method: "POST" | "GET" | "DELETE";
  body: object;
  json: boolean;
  token?: string | null;
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "http://localhost:8000";

const fetcher = async ({
  url,
  method,
  json = true,
  body,
  token,
}: FetcherProps) => {
  const config = {
    method,
    ...(method === "POST" && { body: body && JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const res = await fetch(`${baseUrl}/${url}`, config);

  if (res.status === 401) {
    Swal.fire({
      icon: "error",
      title: "Nieprawidłowy login lub hasło",
    });
    return;
  }

  if (res.status === 403) {
    Swal.fire({
      icon: "warning",
      title: "Przekroczono limit żądań!",
      text: "Poczekaj minutę przed kolejnym żądaniem.",
    });
    return;
  }
  if (!res.ok) {
    Swal.fire({
      icon: "error",
      title: "Strona jest obecnie niedostępna!",
    });
    return;
  }
  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: RegistrationUserProps) => {
  return fetcher({
    url: "user/registration/",
    method: "POST",
    body: user,
    json: true,
  });
};

export const signin = async (user: UserProps) => {
  return fetcher({
    url: `user/token/`,
    method: "POST",
    body: user,
    json: true,
  });
};

export const refreshToken = async (refresh: string) => {
  return fetcher({
    url: "user/token/refresh/",
    method: "POST",
    body: { refresh },
    json: true,
  });
};

export const getCategories = async () => {
  return fetcher({
    url: "categories/",
    method: "GET",
    body: {},
    json: true,
  });
};

export const getLanguages = async () => {
  return fetcher({
    url: "languages/",
    method: "GET",
    body: {},
    json: true,
  });
};

export const getArticleDetails = async (articleId: number) => {
  return fetcher({
    url: `articles/${articleId}`,
    method: "GET",
    body: {},
    json: true,
  });
};

export const getArticles = async ({
  languageId,
  categoriesId,
  sort = "nearest_difficulty",
  limit,
  offset,
  token,
}: ArticlesQueryParamsType & { token: string | null }) => {
  return fetcher({
    url: `articles?language_id=${languageId}&${
      categoriesId ? `categories_id=${categoriesId}&` : ""
    }sort=${sort}&limit=${limit}&offset=${offset}`,
    method: "GET",
    body: {},
    json: true,
    token: token,
  });
};

export const getPreferences = async (token: string) => {
  return fetcher({
    url: `user/preferences/`,
    method: "GET",
    body: {},
    json: true,
    token: token,
  });
};

export const updatePreferences = async (
  token: string,
  preferencesBody: PreferencesType
) => {
  return fetcher({
    url: `user/preferences/`,
    method: "POST",
    body: preferencesBody,
    json: true,
    token: token,
  });
};

export const addArticleToKnowledgeBase = async (
  token: string,
  articleId: number
) => {
  return fetcher({
    url: `/user/knowledge_base/article?article_id=${articleId}`,
    method: "POST",
    body: {},
    json: false,
    token: token,
  });
};

export const addTextToKnowledgeBase = async (
  token: string,
  articleId: number,
  text: string
) => {
  return fetcher({
    url: `/user/knowledge_base/text?article_id=${articleId}&text=${text}`,
    method: "POST",
    body: {},
    json: true,
    token: token,
  });
};

export const getArticlesFromKnowledgeBase = async (
  token: string,
  offset: number,
  limit: number
) => {
  return fetcher({
    url: `/user/knowledge_base/article?limit=${limit}&offset=${offset}`,
    method: "GET",
    body: {},
    json: true,
    token: token,
  });
};

export const getTextsFromKnowledgeBase = async (
  token: string,
  offset: number,
  limit: number
) => {
  return fetcher({
    url: `/user/knowledge_base/texts?limit=${limit}&offset=${offset}`,
    method: "GET",
    body: {},
    json: true,
    token: token,
  });
};

export const translateText = async (
  token: string | null,
  language: string,
  text: string
) => {
  const formattedLanguage = language.toLowerCase();
  return fetcher({
    url: `/user/knowledge_base/translate_text?text=${text}&lang=${formattedLanguage}`,
    method: "POST",
    body: {},
    json: true,
    token: token,
  });
};

export const deleteText = async (token: string, id: number) => {
  return fetcher({
    url: `/user/knowledge_base/delete_text/${id}`,
    method: "DELETE",
    body: {},
    json: true,
    token: token,
  });
};
