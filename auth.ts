import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import axios from "axios";

interface BifrostLoginResponse {
  jwt: string;
  error?: string;
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
        telegramUser: { label: "Telegram Data", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, "");
          let response;

          if (credentials?.telegramUser) {
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
          } else {
            return null;
          }

          if (response.status !== 200 || !response.data.jwt) {
            console.error("Bifrost Login Failed:", response.data);
            return null;
          }

          // FIX: Map 'jwt' to both 'token' and 'accessToken' to satisfy strict typing
          const jwt = response.data.jwt;

          return {
            id: "user-id-placeholder",
            telegramId: "placeholder",
            role: "user",
            token: jwt,       // Kept for legacy
            accessToken: jwt, // REQUIRED by User type definition
            name: (credentials?.email as string) || "Telegram User",
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
        token.accessToken = user.accessToken; // Use the correctly mapped field
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