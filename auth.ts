import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthUser, SessionUser } from '@/lib/types';

// 1. Get the Flask backend URL from environment variables
const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL;

if (!FLASK_BACKEND_URL) {
    throw new Error('FLASK_BACKEND_URL environment variable is not set');
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                try {
                    // 2. Call the Flask backend to authenticate
                    const res = await fetch(`${FLASK_BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) {
                        console.error('Failed to authenticate with Flask backend');
                        return null; // Authentication failed
                    }

                    const user: AuthUser = await res.json();

                    // 3. If authentication is successful, return the user object
                    // This object will be passed to the 'jwt' callback
                    if (user && user.access_token) {
                        return {
                            id: user.user_id,
                            email: credentials.email, // Or from user object if available
                            name: user.name, // Or from user object
                            role: user.role,
                            accessToken: user.access_token,
                        };
                    }

                    return null;
                } catch (e) {
                    console.error('Error in authorize callback', e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // 4. This callback is called whenever a JWT is created or updated
        async jwt({ token, user }) {
            // The 'user' object is only available on the first sign-in
            if (user) {
                token.accessToken = (user as { accessToken: string }).accessToken;
                token.role = (user as { role: string }).role;
                token.id = user.id;
            }
            return token;
        },

        // 5. This callback is called whenever a session is checked
        async session({ session, token }) {
            // Expose the access token and user role to the session object
            // This is primarily for our server-side API client
            if (token) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                (session as any).accessToken = token.accessToken as string;
            }
            return session as any;
        },
    },
    pages: {
        signIn: '/login', // Our custom login page
    },
    session: {
        strategy: 'jwt', // We are using JWTs for our session strategy
    },
});