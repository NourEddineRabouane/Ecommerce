import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // Specific port for your backend
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Example for Cloudinary
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Wildcard for subdomains
      },
    ],
  },
};

export default nextConfig;
