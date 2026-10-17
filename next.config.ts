import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.aparat.com", pathname: "/**" },
      { protocol: "https", hostname: "aparat.com", pathname: "/**" },
      { protocol: "https", hostname: "static.cdn.asset.aparat.com", pathname: "/**" },
      { protocol: "https", hostname: "static.aparat.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
