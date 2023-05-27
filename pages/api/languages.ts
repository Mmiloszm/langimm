import { NextApiRequest, NextApiResponse } from "next";

export default async function languages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "GET") {
    try {
      const languages = await fetch(`${url}/languages`, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
      });
      const languagesData = await languages.json();
      res.status(201).json(languagesData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch languages" });
    }
  } else {
    res.status(402);
  }
}
