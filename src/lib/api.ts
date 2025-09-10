import axios from "axios";
import Cookies from "js-cookie";


// User type
export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
};

// Login via Next.js API proxy
export async function login(username: string, password: string) {
  try {

    const res = await axios.post("/api/login", { username, password });

    // Save tokens and user info in cookies
    Cookies.set("access_token", res.data.access, { secure: true, sameSite: "Strict" });
    Cookies.set("refresh_token", res.data.refresh, { secure: true, sameSite: "Strict" });
    Cookies.set("user", JSON.stringify(res.data.user), { secure: true, sameSite: "Strict" });

    return res.data;
  } catch (err: any) {
    console.error("❌ Login error:", err);

    if (axios.isAxiosError(err)) {
      const detail = err.response?.data?.detail || "Login failed";
      throw new Error(detail);
    }
    throw new Error("Unexpected error during login");
  }
}

// Get access token
export function getAccessToken(): string | null {
  return Cookies.get("access_token") || null;
}

// Logout
export function logout() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("user");
}

// Get user info from cookies (typed)
export function getUserInfo(): UserType | null {
  const user = Cookies.get("user");
  if (!user) return null;
  try {
    return JSON.parse(user) as UserType;
  } catch (err) {
    console.error("❌ Failed to parse user from cookies:", err);
    return null;
  }
}

// Fetch user info from Django via proxy (optional)
export async function fetchUserInfo(): Promise<UserType> {
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  try {
    console.log("➡️ Request to /api/me");

    const res = await axios.get("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("⬅️ Response from /api/me:", res.data);

    return res.data as UserType;
  } catch (err: any) {
    console.error("❌ Error fetching user info:", err.response?.data || err.message);
    throw err;
  }
}
