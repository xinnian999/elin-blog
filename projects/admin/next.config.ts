import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: process.env.NODE_ENV === 'production' ? 'dist/build' : 'dist/dev'
};

export default nextConfig;
