import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            telegramId: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        telegramId: string;
        token: string;
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