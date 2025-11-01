import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Redirect www to apex domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.orderaconsulting.com",
          },
        ],
        destination: "https://orderaconsulting.com/:path*",
        permanent: true,
      },
      // Redirect http to https (based on proxy header)
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://orderaconsulting.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
