import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import axios from "axios";

// Define the expected response from Bifrost
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

          // STRATEGY 1: Telegram Login
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
          // STRATEGY 2: Email/Password Login
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

          // Return object matching User type in types/next-auth.d.ts
          return {
            id: "user-id-placeholder", // Real ID is in the JWT
            telegramId: "placeholder", // Required by your type def
            role: "user",              // Required by your type def
            token: response.data.jwt,  // Required by your type def
            // NextAuth default fields
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
        // Map the properties from the user object returned above to the token
        token.accessToken = user.token;
        token.role = user.role;
        token.telegramId = user.telegramId;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        // Ensure user object in session has required fields
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.telegramId = token.telegramId as string;
      }
      return session;
    },
  },
});