const path = require('path');

const apiBackend = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@connect/shared'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    if (!apiBackend) return [];
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBackend.replace(/\/$/, '')}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
