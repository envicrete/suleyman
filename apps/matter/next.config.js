import { fileURLToPath } from 'url';

import _jiti from 'jiti';

const jiti = _jiti(fileURLToPath(import.meta.url));

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
jiti('./src/env');
jiti('@envi/auth/env');

/** @type {import("next").NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'upcdn.io',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: [
    '@envi/api',
    '@envi/auth',
    '@envi/db',
    '@envi/ui',
    '@envi/validators',
  ],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default config;
