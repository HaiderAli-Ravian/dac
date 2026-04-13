import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['cdn.imagin.studio'],
  },
};

export default nextConfig;
