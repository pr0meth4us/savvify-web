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
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Server-to-Server call to Bifrost IdP
          // We act as the "client application" here
          const bifrostUrl = process.env.BIFROST_URL?.replace(/\/$/, ""); // Remove trailing slash

          const response = await axios.post<BifrostLoginResponse>(
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

          if (response.status !== 200 || !response.data.jwt) {
            console.error("Bifrost Login Failed:", response.data);
            return null;
          }

          // Decode token to get basic user info (optional, or just store the token)
          // For now, we return an object that fits the NextAuth User type
          // In a real scenario, you might decode the JWT here to get the ID.
          return {
            id: "user-id-placeholder", // We will extract the real ID from the token in the JWT callback if needed
            email: credentials.email as string,
            accessToken: response.data.jwt,
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
      // Initial sign in
      if (user) {
        token.accessToken = (user as any).accessToken;
        // We should ideally decode the JWT here to get the real user ID
        // For Phase 1, we persist the token.
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});