import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有域名
      },
    ],
  },
  // output: "standalone",
  distDir: process.env.NODE_ENV === 'production' ? 'dist/build' : 'dist/dev',
};

export default withNextIntl(nextConfig);
