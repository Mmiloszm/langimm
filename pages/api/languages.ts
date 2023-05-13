import { NextApiRequest, NextApiResponse } from "next";

export default async function languages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const languages = await fetch("http://localhost:8000/languages", {
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
