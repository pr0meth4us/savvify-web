import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the Auth Token
api.interceptors.request.use(async (config) => {
    // Note: This works for Client Components.
    // For Server Components, we'll pass the token explicitly or use a helper.
    if (typeof window !== "undefined") {
        const session = await getSession();
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
    }
    return config;
});

export default api;