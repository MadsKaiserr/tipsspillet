/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sportmonks.com', 'graph.facebook.com'],
  },
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  i18n: {
    locales: ["da"],
    defaultLocale: "da",
  },
}

module.exports = nextConfig
