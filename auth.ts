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

interface BifrostValidationResponse {
  is_valid: boolean;
  app_specific_role: string; // This holds "premium_user" or "user"
  account_id: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "bifrost-credentials",
      name: "Helm Bifrost",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otpCode: { label: "OTP Code", type: "text" },
        telegramUser: { label: "Telegram Data", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          // 1. Setup Configuration
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, "");
          const clientId = process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID;
          const clientSecret = process.env.BIFROST_CLIENT_SECRET;

          let loginResponse;

          // 2. Initial Login Call (Get JWT)
          if (credentials?.otpCode) {
            loginResponse = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/verify-otp`,
              { client_id: clientId, code: credentials.otpCode },
              { validateStatus: () => true }
            );
          } else if (credentials?.email && credentials?.password) {
            loginResponse = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/login`,
              { client_id: clientId, email: credentials.email, password: credentials.password },
              { validateStatus: () => true }
            );
          } else if (credentials?.telegramUser) {
            const tgUser = JSON.parse(credentials.telegramUser as string);
            loginResponse = await axios.post<BifrostLoginResponse>(
              `${bifrostUrl}/auth/api/telegram-login`,
              {
                client_id: clientId,
                telegram_data: tgUser // Ensure utils/bifrost.py logic matches
              },
              { validateStatus: () => true }
            );
          } else {
            return null;
          }

          if (loginResponse.status !== 200 || !loginResponse.data.jwt) {
            console.error("Login Failed:", loginResponse.data);
            return null;
          }

          const jwt = loginResponse.data.jwt;

          // 3. VALIDATE ROLE WITH BACKEND (The Fix)
          // We call the internal validation endpoint to get the real DB role
          let userRole = "user";

          if (clientId && clientSecret) {
            try {
              const validationRes = await axios.post<BifrostValidationResponse>(
                `${bifrostUrl}/internal/validate-token`,
                { jwt },
                {
                  auth: { username: clientId, password: clientSecret },
                  validateStatus: () => true
                }
              );

              if (validationRes.status === 200 && validationRes.data.is_valid) {
                userRole = validationRes.data.app_specific_role || "user";
              }
            } catch (valError) {
              console.error("Role validation failed, defaulting to 'user'", valError);
            }
          }

          // 4. Return User Object with Correct Role
          return {
            id: loginResponse.data.account_id || "unknown",
            role: userRole,
            accessToken: jwt,
            name: loginResponse.data.display_name || "User",
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
        token.role = user.role; // Pass role to token
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.userId as string;
        session.user.role = token.role as string; // Pass role to client session
      }
      return session;
    },
  },
});