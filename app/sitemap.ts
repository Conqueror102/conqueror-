import type { MetadataRoute } from "next"

// Portfolio sections for sitemap
const sections = [
  { path: "/", lastModified: new Date('2025-08-23') },
  { path: "/about", lastModified: new Date('2025-08-23') },
  { path: "/skills", lastModified: new Date('2025-08-23') },
  { path: "/projects", lastModified: new Date('2025-08-23') },
  { path: "/services", lastModified: new Date('2025-08-23') },
  { path: "/education", lastModified: new Date('2025-08-23') },
  { path: "/contact", lastModified: new Date('2025-08-23') },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://victor-onyemaechi.vercel.app"

  return sections.map((section) => ({
    url: `${baseUrl}${section.path}`,
    lastModified: section.lastModified.toISOString(),
    changeFrequency: "monthly",
    priority: section.path === "/" ? 1 : 0.8,
  }))
}
