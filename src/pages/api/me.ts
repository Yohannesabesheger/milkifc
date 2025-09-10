import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { UserType } from "@/lib/api";
import { API } from "@/lib/apiEndpoints";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | { detail: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ detail: "No access token provided" });
  }

  try {
    console.log("➡️ Proxy request to Django /auth/users/me/");

    const response = await axios.get<UserType>(API.ME, {
      headers: { Authorization: `JWT ${token}` },
    });

    console.log("⬅️ Response from Django:", response.data);

    // Only return first_name, last_name, email
    const user: UserType = {
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
    };

    res.status(200).json(user);
  } catch (err: any) {
    console.error("❌ Proxy error:", err.response?.data || err.message);
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { detail: err.message });
  }
}
