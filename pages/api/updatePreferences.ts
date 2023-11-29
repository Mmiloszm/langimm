import { NextApiRequest, NextApiResponse } from "next";

export default async function updatePreferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "POST") {
    const { token } = req.query;
    try {
      const response = await fetch(`${url}/user/preferences/`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });
      if (response.status === 403) {
        res.status(403).json({ error: "too many requests" });
        return;
      }
      const userData = await response.json();
      res.status(201).json(userData);
    } catch (err) {
      res.status(501).json({ error: "failed to refresh token" });
    }
  } else {
    res.status(402);
  }
}
