import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 允许所有域名
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // distDir: process.env.NODE_ENV === "production" ? "dist/build" : "dist/dev",
  experimental: {
    webpackMemoryOptimizations: true,
  },
  serverExternalPackages: ["typeorm", "reflect-metadata"],
  output: "standalone"
  // async rewrites() {
  //   return [
  //     {
  //       source: '/admin/:path*', // 匹配 /api 开头的请求
  //       destination: 'http://localhost:5173/admin/:path*', // 代理到后端
  //     },
  //   ];
  // },
};

export default nextConfig;
