import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/content"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPosts } from "@/lib/server/blog-repo"
import { realProjects } from "@/lib/structured-data"

export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

// Served by hand rather than from sitemap.ts because Next writes <image:image> before <lastmod>, and the
// sitemaps.org schema only allows extension elements after <priority>. Bing's validator rejects that order.
function toXml(entries: Entry[]) {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastModified ? new Date(entry.lastModified).toISOString() : null
    return [
      "<url>",
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastmod && `<lastmod>${lastmod}</lastmod>`,
      entry.changeFrequency && `<changefreq>${entry.changeFrequency}</changefreq>`,
      entry.priority !== undefined && `<priority>${entry.priority}</priority>`,
      ...(entry.images ?? []).map((image) => `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`),
      "</url>",
    ].filter(Boolean).join("\n")
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`
}

export async function GET() {
  return new Response(toXml(await sitemapEntries()), { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}

async function sitemapEntries(): Promise<Entry[]> {
  const [{ profile, projects: allProjects, site, gallery }, posts] = await Promise.all([getPortfolioContent(), getPublishedPosts()])
  // The layout demo is noindex, so it stays out of the sitemap.
  const projects = realProjects(allProjects)
  const lastModified = new Date(site.lastUpdated)
  const projectModified = (updatedAt?: string) => (updatedAt ? new Date(updatedAt) : lastModified)
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(profile.photo), ...projects.map((project) => absoluteUrl(project.image))],
    },
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`), lastModified: projectModified(project.updatedAt), changeFrequency: "monthly" as const, priority: 0.7, images: [absoluteUrl(project.image)] })),
    { url: absoluteUrl("/blog"), lastModified: posts[0] ? new Date(posts[0].updatedAt) : lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: 0.7, ...(post.coverImage ? { images: [absoluteUrl(post.coverImage)] } : {}) })),
    { url: absoluteUrl("/gallery"), lastModified, changeFrequency: "monthly", priority: 0.5, images: gallery.photos.map((photo) => absoluteUrl(photo.src)) },
    { url: absoluteUrl("/cv"), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ]
}
