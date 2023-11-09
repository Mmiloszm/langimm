import { NextApiRequest, NextApiResponse } from "next";

export default async function updatePreferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "POST") {
    const { token, articleId } = req.query;
    try {
      const response = await fetch(
        `${url}/user/knowledge_base/article?article_id=${articleId}`,
        {
          method: req.method,
          headers: {
            "Content-Type": "application/json",
            // prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(req.body),
        }
      );
      const userData = await response.json();
      res.status(201).json(userData);
    } catch (err) {
      res.status(501).json({ error: "failed to refresh token" });
    }
  } else {
    res.status(402);
  }
}