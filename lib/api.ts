// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // REMOVED: The window.location.href redirect.
    // We let the UI components handle 401s so they can call signOut()
    return Promise.reject(error);
  }
);

export default api;