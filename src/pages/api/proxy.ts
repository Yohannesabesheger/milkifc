// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body, query } = req;
  const endpoint = (query.endpoint as string) || body?.endpoint;

  if (!endpoint) {
    return res.status(400).json({ detail: "Endpoint is required" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ detail: "No access token provided" });
  }

  try {
    console.log(`➡️ Proxy ${method} request to: ${endpoint}`);

    let axiosResponse;

    switch (method) {
      case "GET":
        axiosResponse = await axios.get(endpoint, {
          headers: { Authorization: `JWT ${token}` },
        });
        break;

      case "POST":
        axiosResponse = await axios.post(endpoint, body?.payload || {}, {
          headers: { Authorization: `JWT ${token}` },
        });
        break;

      case "PUT":
        axiosResponse = await axios.put(endpoint, body?.payload || {}, {
          headers: { Authorization: `JWT ${token}` },
        });
        break;

      case "DELETE":
        axiosResponse = await axios.delete(endpoint, {
          headers: { Authorization: `JWT ${token}` },
          data: body?.payload || {},
        });
        break;

      case "PATCH":
        axiosResponse = await axios.patch(endpoint, body?.payload || {}, {
          headers: { Authorization: `JWT ${token}` },
        });
        break;

      default:
        return res.status(405).json({ detail: "Method not allowed" });
    }

    console.log("⬅️ Response from Django:", axiosResponse.data);
    res.status(200).json(axiosResponse.data);
  } catch (error) {
    const err = error as AxiosError<any>;
    console.error("❌ Proxy error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { detail: err.message });
  }
}
