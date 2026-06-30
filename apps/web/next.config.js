const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@connect/shared'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = nextConfig;
