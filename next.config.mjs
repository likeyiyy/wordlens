/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不使用静态导出，改用 Vercel 正常构建
  // output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
