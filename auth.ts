import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import axios from "axios";

// Define the shape of the response expected from the Bifrost Auth Service
interface BifrostLoginResponse {
  jwt: string;
  error?: string;
  account_id?: string;
  display_name?: string;
  email?: string;
  role?: string; // 'user', 'premium_user', 'admin'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "bifrost-credentials",
      name: "Savvify Login",
      credentials: {
        // We define all possible credential inputs here.
        // Depending on the UI flow, only some will be populated.
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otpCode: { label: "OTP Code", type: "text" },
        telegramUser: { label: "Telegram Data", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          // Ensure URL does not have a trailing slash
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, "");
          const clientId = process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID;

          if (!bifrostUrl || !clientId) {
            console.error("Missing BIFROST_URL or NEXT_PUBLIC_BIFROST_CLIENT_ID");
            return null;
          }

          let response;

          // --- SCENARIO 1: Telegram OTP Login (from /login command) ---
          if (credentials?.otpCode) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/verify-otp`,
              {
                client_id: clientId,
                code: credentials.otpCode,
              },
              {
                headers: { "Content-Type": "application/json" },
                // Allow 401/403 to be handled gracefully below
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          }
          // --- SCENARIO 2: Email & Password Login ---
          else if (credentials?.email && credentials?.password) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/login`,
              {
                client_id: clientId,
                email: credentials.email,
                password: credentials.password,
              },
              {
                headers: { "Content-Type": "application/json" },
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          }
          // --- SCENARIO 3: Telegram Widget / Mini App (Legacy/Webapp) ---
          else if (credentials?.telegramUser) {
            const tgUser = JSON.parse(credentials.telegramUser as string);
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/telegram-login`,
              {
                client_id: clientId,
                telegram_id: tgUser.id,
                username: tgUser.username,
                first_name: tgUser.first_name,
                last_name: tgUser.last_name,
                photo_url: tgUser.photo_url,
                hash: tgUser.hash,
                auth_date: tgUser.auth_date,
              },
              {
                headers: { "Content-Type": "application/json" },
                validateStatus: (status) => status === 200 || status === 401 || status === 403,
              }
            );
          } else {
            // No valid credentials provided
            return null;
          }

          // --- Response Handling ---

          // 1. Check for API-level errors
          if (response.status !== 200 || !response.data.jwt) {
            console.error("Bifrost Auth Failed:", response.data);
            return null; // Triggers "Invalid credentials" error in NextAuth
          }

          const data = response.data;

          // 2. Map Backend User to NextAuth User
          // We map the JWT to 'accessToken' so it can be passed to the session
          return {
            id: data.account_id || "unknown-id",
            name: data.display_name || (credentials?.email as string) || "Savvify User",
            email: data.email || (credentials?.email as string) || "",
            role: data.role || "user",
            accessToken: data.jwt, // Crucial: This is the token used for API calls
            telegramId: "", // Optional, usually inside the JWT claim
          };

        } catch (error) {
          console.error("NextAuth Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Called whenever a token is created or updated.
    // We persist the data returned from `authorize` into the token.
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.userId = user.id;
        token.telegramId = user.telegramId;
      }
      return token;
    },
    // 2. Session Callback: Called whenever `useSession` or `auth()` is checked.
    // We pass data from the token to the session object available in React components.
    async session({ session, token }) {
      if (token && session.user) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.telegramId = token.telegramId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days (Adjust based on Bifrost JWT expiry)
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this ENV var is set
});