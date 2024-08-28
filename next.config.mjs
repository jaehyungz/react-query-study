/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 60,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        // port: "",
        // pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "inflearn-nextjs.vercel.app",
        // port: "",
        // pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
