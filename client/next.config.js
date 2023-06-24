/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 722908137,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "239578ae879260a25e3638dde8b502d2"
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
