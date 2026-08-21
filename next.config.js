/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "avatars.githubusercontent.com" }
    ]
  }
};
module.exports = nextConfig;
