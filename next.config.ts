const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seu-cdn.com",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },
};

module.exports = nextConfig;
