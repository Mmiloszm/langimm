import { NextApiRequest, NextApiResponse } from "next";

export default async function preferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "GET") {
    const { token, offset, limit } = req.query;
    try {
      const preferences = await fetch(
        `${url}/user/knowledge_base/article?limit=${limit}&offset=${offset}`,
        {
          method: req.method,
          headers: {
            // prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const preferencesData = await preferences.json();
      res.status(201).json(preferencesData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch preferences" });
    }
  } else {
    res.status(402);
  }
}
