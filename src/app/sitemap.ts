import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/content"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPosts } from "@/lib/server/blog-repo"
import { realProjects } from "@/lib/structured-data"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ profile, projects: allProjects, site }, posts] = await Promise.all([getPortfolioContent(), getPublishedPosts()])
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
    { url: absoluteUrl("/cv"), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ]
}
