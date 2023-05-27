import { NextApiRequest, NextApiResponse } from "next";

export default async function categories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "GET") {
    try {
      const categories = await fetch(`${url}/categories`, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
      });
      const categoriesData = await categories.json();
      res.status(201).json(categoriesData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch categories" });
    }
  } else {
    res.status(402);
  }
}
