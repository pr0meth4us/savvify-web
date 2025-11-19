import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "bifrost-sso",
            name: "Bifrost SSO",
            credentials: {
                token: { label: "Token", type: "text" },
            },
            authorize: async (credentials) => {
                try {
                    const token = credentials.token as string;
                    if (!token) return null;

                    // 1. Validate the token with Bifrost (Server-to-Server)
                    // We use the Client Secret here to ensure the token is legitimate
                    const validateRes = await axios.post(
                        `${process.env.BIFROST_URL}/internal/validate-token`,
                        { jwt: token },
                        {
                            auth: {
                                username: process.env.NEXT_PUBLIC_BIFROST_CLIENT_ID!,
                                password: process.env.BIFROST_CLIENT_SECRET!,
                            },
                        }
                    );

                    if (!validateRes.data.is_valid) {
                        throw new Error("Invalid Token");
                    }

                    // 2. Get User Details
                    const accountId = validateRes.data.account_id;
                    const role = validateRes.data.app_specific_role || "user";

                    return {
                        id: accountId,
                        token: token,
                        role: role,
                    };
                } catch (error) {
                    console.error("SSO Validation Failed:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.userId = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.user.id = token.userId as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});