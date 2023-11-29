import { NextApiRequest, NextApiResponse } from "next";

export default async function articles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "GET") {
    const { language_id, categories_id, sort, offset, limit, token } =
      req.query;
    try {
      const articles = await fetch(
        `${url}/articles?language_id=${language_id}&${
          categories_id ? `categories_id=${categories_id}&` : ""
        }&sort=${sort}&offset=${offset}&limit=${limit}`,
        {
          method: req.method,
          headers: {
            // prettier-ignore
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (articles.status === 403) {
        res.status(403).json({ error: "too many requests" });
        return;
      }
      const articlesData = await articles.json();
      res.status(201).json(articlesData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch categories" });
    }
  } else {
    res.status(402);
  }
}
