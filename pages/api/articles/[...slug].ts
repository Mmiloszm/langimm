import { NextApiRequest, NextApiResponse } from "next";

export default async function articleDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "GET") {
    try {
      const { slug } = req.query;
      const articleDetails = await fetch(`${url}/articles/${slug}`, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
      });
      const articleDetailsData = await articleDetails.json();
      res.status(201).json(articleDetailsData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch article's details" });
    }
  } else {
    res.status(402);
  }
}
