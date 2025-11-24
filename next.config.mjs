/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    // Disable optimizations that can cause manifest issues
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure proper handling of server components
  serverComponentsExternalPackages: ['next-auth'],
};

export default nextConfig;