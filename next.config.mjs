/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT add output: 'standalone' here for Vercel deployments
  eslint: {
    // You can keep this if you want to ignore linting during build,
    // though fixing lints is better long term.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Only keep this if you want to ignore TS errors during build
    ignoreBuildErrors: true,
  }
};

export default nextConfig;