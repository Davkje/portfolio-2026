import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "davidkjellstrand-portfolio.vercel.app",
          },
        ],
        destination: "https://www.davidkjellstrand.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
