import NextAuth, { AuthError } from "next-auth";
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
  role?: string;
  // 'user', 'premium_user', 'admin'
}

class CustomAuthError extends AuthError {
  constructor(message: string) {
    super(message);
    this.type = "CredentialsSignin";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "bifrost-credentials",
      name: "Savvify Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otpCode: { label: "OTP Code", type: "text" },
        telegramUser: { label: "Telegram Data", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, "");
          const clientId = process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID;

          if (!bifrostUrl || !clientId) {
            throw new CustomAuthError("Configuration Error: Missing Auth Server URL");
          }

          let response;

          // --- SCENARIO 1: Telegram OTP ---
          if (credentials?.otpCode) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/verify-otp`,
              { client_id: clientId, code: credentials.otpCode },
              { headers: { "Content-Type": "application/json" }, validateStatus: (s) => s < 500 }
            );
          }
          // --- SCENARIO 2: Email/Password ---
          else if (credentials?.email && credentials?.password) {
            response = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/login`,
              { client_id: clientId, email: credentials.email, password: credentials.password },
              { headers: { "Content-Type": "application/json" }, validateStatus: (s) => s < 500 }
            );
          }
          // --- SCENARIO 3: Telegram Widget ---
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
              { headers: { "Content-Type": "application/json" }, validateStatus: (s) => s < 500 }
            );
          } else {
            return null;
          }

          if (response.status !== 200 || !response.data.jwt) {
            throw new CustomAuthError(response.data.error || "Authentication failed");
          }

          const data = response.data;

          return {
            id: data.account_id || "unknown-id",
            name: data.display_name || (credentials?.email as string) || "User",
            email: data.email || (credentials?.email as string) || "",
            role: data.role || "user",
            accessToken: data.jwt,
            telegramId: "",
          };
        } catch (error: any) {
          if (error instanceof CustomAuthError) throw error;
          console.error("NextAuth Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Handles Token Updates
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.userId = user.id;
        token.telegramId = user.telegramId;
      }

      // Handle session updates (e.g. triggered by AuthGuard)
      if (trigger === "update" && session) {
        // Support both { role: '...' } and { user: { role: '...' } } structures
        if (session.role) {
          token.role = session.role;
        } else if (session.user?.role) {
          token.role = session.user.role;
        }
      }
      return token;
    },
    // 2. Session Callback: Exposes Token Data to Client
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
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
});