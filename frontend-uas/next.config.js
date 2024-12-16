/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landingpage", // Ganti dengan path tujuan
        permanent: true, // Atur ke true jika redirect bersifat permanen
      },
    ];
  },
};

module.exports = nextConfig;
