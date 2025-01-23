import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {},
  // output: "standalone",
  // distDir: process.env.NODE_ENV === 'production' ? 'build' : '.next'
};

export default withNextIntl(nextConfig);
