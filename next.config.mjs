/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "plaid-merchant-logos.plaid.com",
      "plaid-category-icons.plaid.com",
    ],
  },
};

export default nextConfig;
