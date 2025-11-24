import axios from "axios";
import { getSession } from "next-auth/react";

// We use the environment variable for the backend URL
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Automatically attaches the JWT from the NextAuth session to every request.
 */
api.interceptors.request.use(
  async (config) => {
    // 1. Client-side usage
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    // 2. Server-side usage
    // Note: When using this api instance in Server Components, you must generally
    // pass the token manually or use a wrapper that calls auth().
    // This interceptor primarily serves Client Components.

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Handles 401 errors globally to steer users back to login if session expires.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid coordinates
      // We could trigger a sign-out here if we were on the client
      if (typeof window !== "undefined") {
        // Ideally, use signOut() from next-auth/react, but we avoid circular deps here.
        // Redirecting manually is a safe fallback.
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;