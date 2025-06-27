import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";

dotenv.config();

const imageHost = process.env.NEXT_IMAGE_HOST || 'localhost';
const imagePort = process.env.NEXT_IMAGE_PORT || '5154';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: imageHost,
        pathname: "/images/**",
        port: imagePort
      },
      {
        protocol: "https",
        hostname: imageHost,
        pathname: "/images/**",
        port: imagePort
      }
    ],
  },
  env: {
    NEXT_PUBLIC_ADMIN_EMAILS: process.env.NEXT_PUBLIC_ADMIN_EMAILS,
  },
  async rewrites() {
    return [
      {
        source: '/:locale/dotnetapi/:path*',
        destination: process.env.URL_TO_PROXY_REQUESTS + 'api/:path*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
