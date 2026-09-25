import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/Axelle_Test" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/Axelle_Test/" : "",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
