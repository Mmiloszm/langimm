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
};

const fetcher = async ({ url, method, body, json = true }: FetcherProps) => {
  if (method === "POST") {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      Swal.fire({
        icon: "warning",
        title: "Przekroczono limit żądań!",
        text: "Poczekaj minutę przed kolejnym żądaniem.",
      });
    }
    if (!res.ok) {
      console.error("API not responding");
    }

    if (json) {
      const data = await res.json();
      return data;
    }
  } else if (method === "GET") {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      Swal.fire({
        icon: "warning",
        title: "Przekroczono limit żądań!",
        text: "Poczekaj minutę przed kolejnym żądaniem.",
      });
    }
    if (!res.ok) {
      console.error("API not responding");
    }

    if (json) {
      const data = await res.json();
      return data;
    }
  } else if (method === "DELETE") {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403) {
      Swal.fire({
        icon: "warning",
        title: "Przekroczono limit żądań!",
        text: "Poczekaj minutę przed kolejnym żądaniem.",
      });
    }
    if (!res.ok) {
      console.error("API not responding");
    }

    if (json) {
      const data = await res.json();
      return data;
    }
  }
};

export const register = async (user: RegistrationUserProps) => {
  return fetcher({
    url: "/api/user/register",
    method: "POST",
    body: user,
    json: true,
  });
};

export const signin = async (user: UserProps) => {
  return fetcher({
    url: "/api/user/signin",
    method: "POST",
    body: user,
    json: true,
  });
};

export const refreshToken = async (refresh: string) => {
  return fetcher({
    url: "/api/user/refreshToken",
    method: "POST",
    body: { refresh },
    json: true,
  });
};

export const getCategories = async () => {
  return fetcher({
    url: "/api/categories",
    method: "GET",
    body: {},
    json: true,
  });
};

export const getLanguages = async () => {
  return fetcher({
    url: "/api/languages",
    method: "GET",
    body: {},
    json: true,
  });
};

export const getArticleDetails = async (articleId: number) => {
  return fetcher({
    url: `/api/articles/${articleId}`,
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
    url: `/api/articles?language_id=${languageId}&${
      categoriesId ? `categories_id=${categoriesId}&` : ""
    }sort=${sort}&limit=${limit}&offset=${offset}&token=${token}`,
    method: "GET",
    body: {},
    json: true,
  });
};

export const getPreferences = async (token: string) => {
  return fetcher({
    url: `/api/preferences?token=${token}`,
    method: "GET",
    body: {},
    json: true,
  });
};

export const updatePreferences = async (
  token: string,
  preferencesBody: PreferencesType
) => {
  return fetcher({
    url: `/api/updatePreferences?token=${token}`,
    method: "POST",
    body: preferencesBody,
    json: true,
  });
};

export const addArticleToKnowledgeBase = async (
  token: string,
  articleId: number
) => {
  return fetcher({
    url: `/api/knowledgeBase/article?articleId=${articleId}&token=${token}`,
    method: "POST",
    body: {},
    json: false,
  });
};

export const addTextToKnowledgeBase = async (
  token: string,
  articleId: number,
  text: string
) => {
  return fetcher({
    url: `/api/knowledgeBase/text?articleId=${articleId}&text=${text}&token=${token}`,
    method: "POST",
    body: {},
    json: true,
  });
};

export const getArticlesFromKnowledgeBase = async (
  token: string,
  offset: number,
  limit: number
) => {
  return fetcher({
    url: `/api/knowledgeBase/articles?offset=${offset}&limit=${limit}&token=${token}`,
    method: "GET",
    body: {},
    json: true,
  });
};

export const getTextsFromKnowledgeBase = async (
  token: string,
  offset: number,
  limit: number
) => {
  return fetcher({
    url: `/api/knowledgeBase/texts?offset=${offset}&limit=${limit}&token=${token}`,
    method: "GET",
    body: {},
    json: true,
  });
};

export const translateText = async (
  token: string | null,
  language: string,
  text: string
) => {
  const formattedLanguage = language.toLowerCase();
  return fetcher({
    url: `/api/knowledgeBase/translateText?text=${text}&language=${formattedLanguage}&token=${token}`,
    method: "POST",
    body: {},
    json: true,
  });
};

export const deleteText = async (token: string, id: number) => {
  return fetcher({
    url: `/api/knowledgeBase/deleteText?id=${id}&token=${token}`,
    method: "DELETE",
    body: {},
    json: true,
  });
};
