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
    dangerouslyAllowSVG: true,
  },
  distDir: process.env.NODE_ENV === 'production' ? 'dist/build' : 'dist/dev',
  experimental:{
    webpackMemoryOptimizations:true
  }
};

export default withNextIntl(nextConfig);
