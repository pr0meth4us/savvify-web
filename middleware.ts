import { auth } from '@/auth';

export default auth;

export const config = {
    // The matcher defines the routes to be protected by the middleware
    // We will steer all unauthenticated users from these routes to /login
    matcher: ['/dashboard/:path*', '/settings/:path*', '/billing/:path*'],
};