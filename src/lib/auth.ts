import axios from "axios";
import Cookies from "js-cookie";

export interface Tokens {
  access: string;
  refresh: string;
}

// Save tokens in cookies
export function saveTokens(tokens: Tokens) {
  const { access, refresh } = tokens;
  if (!access || !refresh) throw new Error("Both access and refresh tokens are required");

  Cookies.set("access_token", access, { secure: true, sameSite: "Strict" });
  Cookies.set("refresh_token", refresh, { secure: true, sameSite: "Strict" });
}

// Get saved access token
export function getAccessToken(): string | null {
  return Cookies.get("access_token") || null;
}

// Get saved refresh token
export function getRefreshToken(): string | null {
  return Cookies.get("refresh_token") || null;
}

// Logout user
export function logout() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}

// Check if access token is valid
export function isAccessTokenValid(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

// Login request to Django
export async function login(username: string, password: string): Promise<void> {
  const res = await axios.post("https://m.besheger.com/auth/jwt/create", {
    username,
    password,
  });
  saveTokens({ access: res.data.access, refresh: res.data.refresh });
}
