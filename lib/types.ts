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

// --- REMOVED CONFLICTING AUGMENTATIONS ---
// The Session and JWT augmentations are now handled in types/next-auth.d.ts