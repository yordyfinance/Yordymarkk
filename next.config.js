/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // adjust/expand once real image hosting (CDN/S3) is defined
    remotePatterns: [],
  },
};

module.exports = nextConfig;
