import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "akabab.github.io",
        pathname: "/superhero-api/api/images/lg/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/akabab/superhero-api@0.3.0/api/images/lg/**",
      },
    ],
  },
};

export default nextConfig;
