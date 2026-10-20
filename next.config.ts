import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Icons8 icons (see src/components/icons/icons8.tsx).
    // Cloudinary holds images uploaded from the admin.
    remotePatterns: [{ protocol: "https", hostname: "img.icons8.com" }, { protocol: "https", hostname: "res.cloudinary.com" }],
  },
  async redirects() {
    return [
      // Old routes that were listed in the previous sitemap.
      { source: "/sections/:section", destination: "/", permanent: true },
      { source: "/og-image", destination: "/opengraph-image", permanent: true },
      { source: "/victors%20CV.pdf", destination: "/victor-onyemaechi-cv.pdf", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
