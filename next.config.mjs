/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'turn-n-burn-backend.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/*.png',
      },
    ],
  },
};

export default nextConfig;
