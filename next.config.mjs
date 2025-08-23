/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "**", protocol: "http" },
      { hostname: "**", protocol: "https" },
    ],
  },

};

export default nextConfig;
