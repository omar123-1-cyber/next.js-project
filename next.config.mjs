/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
    unoptimized: true,   // ← এটা যোগ করলে 403 সমস্যা বেশিরভাগ ক্ষেত্রে চলে যায়
  },
};



export default nextConfig;
