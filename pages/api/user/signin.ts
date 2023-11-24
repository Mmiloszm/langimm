import { NextApiRequest, NextApiResponse } from "next";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "POST") {
    try {
      const user = await fetch(`${url}/user/token/`, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const userData = await user.json();
      res.status(201).json(userData);
    } catch (err) {
      res.status(501).json({ error: "failed to login" });
    }
  } else {
    res.status(402);
  }
}
