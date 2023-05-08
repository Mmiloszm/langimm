import { NextApiRequest, NextApiResponse } from "next";

export default async function refreshToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "http://localhost:8000/user/token/refresh/",
        {
          method: req.method,
          headers: { "Content-Type": "application/json" },
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
