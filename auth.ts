import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import axios from "axios";

interface BifrostLoginResponse {
  jwt: string;
  error?: string;
  account_id?: string;
  display_name?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "bifrost-credentials",
      name: "Helm Bifrost",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // New credential field for OTP
        otpCode: { label: "OTP Code", type: "text" },
        // Legacy (optional, if you still have logic to support it)
        telegramUser: { label: "Telegram Data", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, "");
          let response;

          // --- 1. OTP Login Flow (Telegram) ---
          if (credentials?.otpCode) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/verify-otp`,
              {
                client_id: process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID,
                code: credentials.otpCode
              },
              {
                headers: { "Content-Type": "application/json" },
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          }
          // --- 2. Email Login Flow ---
          else if (credentials?.email && credentials?.password) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/login`,
              {
                client_id: process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID,
                email: credentials.email,
                password: credentials.password,
              },
              {
                headers: { "Content-Type": "application/json" },
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          }
          // --- 3. Legacy Widget Flow (Optional fallback) ---
          else if (credentials?.telegramUser) {
            const tgUser = JSON.parse(credentials.telegramUser as string);
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/telegram-login`,
              {
                client_id: process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID,
                telegram_id: tgUser.id,
                username: tgUser.username,
                first_name: tgUser.first_name,
                last_name: tgUser.last_name,
                photo_url: tgUser.photo_url,
                hash: tgUser.hash,
                auth_date: tgUser.auth_date
              },
              {
                headers: { "Content-Type": "application/json" },
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          }
          else {
            return null;
          }

          // Check API Response
          if (response.status !== 200 || !response.data.jwt) {
            console.error("Bifrost Login Failed:", response.data);
            return null;
          }

          // Map response to User object
          const jwt = response.data.jwt;
          return {
            id: response.data.account_id || "user-id-placeholder",
            telegramId: "placeholder", // Not strictly needed here, handled by backend decoding
            role: "user",
            token: jwt,       // Legacy
            accessToken: jwt, // Required by User type definition
            name: response.data.display_name || (credentials?.email as string) || "Telegram User",
            email: (credentials?.email as string) || "",
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.telegramId = user.telegramId;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.telegramId = token.telegramId as string;
      }
      return session;
    },
  },
});