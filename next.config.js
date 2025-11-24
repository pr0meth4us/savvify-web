/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" creates a self-contained folder that fixes most
  // Vercel file tracing/ENOENT errors
  output: "standalone",

  // Keep strict mode
  reactStrictMode: true,

  // Ensure we don't have lingering cache issues with headers/images
  images: {
    unoptimized: true, // Optional: try this if images cause issues later, but start without it if you want
  },

  // Disable eslint during build since we handle it manually/locally
  // and it causes noise in the Vercel logs
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Same for TS types, if you want to rely on your local IDE
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;