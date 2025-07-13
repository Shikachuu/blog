/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    }
    return config
  },
}

export default nextConfig
