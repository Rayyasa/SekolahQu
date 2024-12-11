/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "5002",
    //     pathname: "/**",
    //   },
    // ],
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login', // ganti dengan rute tujuan Anda
        permanent: true, // true untuk pengalihan permanen (status 308)
      },
    ]
  },
};

module.exports = nextConfig;
