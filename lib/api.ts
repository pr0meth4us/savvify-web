import axios from 'axios';
import { auth } from '@/auth';

const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL;

const api = axios.create({
    baseURL: FLASK_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
    async (config) => {
        // 1. Get the session from Auth.js
        const session = await auth();

        if (session && (session as any).accessToken) {
            // 2. Extract the JWT we stored from the Flask backend
            const token = (session as any).accessToken;

            // 3. Attach it as a Bearer token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;