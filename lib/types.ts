import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/**
 * The response from our Flask /auth/login endpoint
 */
export interface AuthUser {
    access_token: string;
    user_id: string;
    name: string;
    role: string;
}

/**
 * The user object stored in the NextAuth.js session
 */
export interface SessionUser extends User {
    id: string;
    role: string;
}

/**
 * Extend the default NextAuth.js Session type
 */
declare module 'next-auth' {
    interface Session {
        user: SessionUser;
        accessToken: string;
    }

    interface User {
        role: string;
        accessToken: string;
    }
}

/**
 * Extend the default NextAuth.js JWT type
 */
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        role: string;
        id: string;
    }
}