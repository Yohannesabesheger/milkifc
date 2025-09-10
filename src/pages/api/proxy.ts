import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  try {
    console.log("➡️ Proxy request to Django:", req.body);

    const response = await axios.post("https://m.besheger.com/auth/jwt/create", req.body);

    console.log("⬅️ Response from Django:", response.data);

    // return tokens to client
    res.status(200).json(response.data);
  } catch (error) {
    const err = error as AxiosError<any>; // 👈 cast error properly
    console.error("❌ Proxy error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json(err.response?.data || { detail: err.message });
  }
}
