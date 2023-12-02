import { NextApiRequest, NextApiResponse } from "next";

export default async function preferences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:8000";
  if (req.method === "POST") {
    const { token, text, language } = req.query;
    try {
      const translation = await fetch(
        `${url}/user/knowledge_base/translate_text?text=${text}&lang=${language}`,
        {
          method: req.method,
          headers: {
            // prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (translation.status === 403) {
        res.status(403).json({ error: "too many requests" });
        return;
      }
      const translationData = await translation.json();
      res.status(201).json(translationData);
    } catch (err) {
      res.status(501).json({ error: "failed to fetch preferences" });
    }
  } else {
    res.status(402);
  }
}
