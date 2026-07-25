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
  async redirects() {
    return [
      {
        source: "/presente",
        destination: "/presentes",
        permanent: true,
      },
      {
        source: "/presente/:path*",
        destination: "/presentes/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
