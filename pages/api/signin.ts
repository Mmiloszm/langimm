import { NextApiRequest, NextApiResponse } from "next";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = await fetch("http://localhost:8000/user/token/", {
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
