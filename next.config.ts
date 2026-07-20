import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seu-cdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
