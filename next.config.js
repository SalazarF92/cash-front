/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //add image domain
  images: {
    unoptimized: true,
    path: "/src",
  },

};

module.exports = nextConfig;
