import type { MetadataRoute } from "next"
import { absoluteUrl, profile, projects, site } from "@/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastUpdated)
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(profile.photo), ...projects.map((project) => absoluteUrl(project.image))],
    },
    { url: absoluteUrl(profile.cv), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ]
}
