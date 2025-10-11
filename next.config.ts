import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/Ficha_cosaps' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Ficha_cosaps/' : '',
  output: "export",
};

export default nextConfig;