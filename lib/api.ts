import { ArticlesQueryParamsType } from "@/types/ArticlesQueryParams";

type FetcherProps = {
  url: string;
  method: "POST" | "GET";
  body: object;
  json: boolean;
};

type UserProps = {
  username: string;
  password: string;
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
    if (!res.ok) {
      console.error("API not responding");
    }

    if (json) {
      const data = await res.json();
      return data;
    }
  }
};

export const register = async (user: UserProps) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: UserProps) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: true,
  });
};

export const refreshToken = async (refresh: string) => {
  return fetcher({
    url: "/api/refreshToken",
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

export const getArticles = async ({
  languageId,
  categoriesId,
  sort = "nearest_difficulty",
  limit,
  offset,
}: ArticlesQueryParamsType) => {
  return fetcher({
    url: `/api/articles?language_id=${languageId}&${
      categoriesId ? `categories_id=${categoriesId}&` : ""
    }sort=${sort}&limit=${limit}&offset=${offset}`,
    method: "GET",
    body: {},
    json: true,
  });
};
