import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      telegramId?: string; // Made optional to support email users
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    telegramId?: string; // Made optional
    token?: string;      // Made optional (legacy)
    accessToken?: string; // Added for consistency
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    telegramId?: string;
    role?: string;
    userId?: string;
  }
}