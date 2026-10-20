import { unstable_cache } from "next/cache"
import { site } from "@/content/site"
import { contentSections } from "@/lib/content-sections"
import { loadProjects, loadSections } from "@/lib/server/content-repo"

/** Cache tag for everything the admin edits. Admin saves revalidate it. */
export const CONTENT_TAG = "portfolio-content"

async function readContent() {
  const [sections, projects] = await Promise.all([loadSections(), loadProjects()])
  // The site URL always comes from env (NEXT_PUBLIC_SITE_URL), never from the database.
  return { ...sections, site: { ...sections.site, url: site.url }, projects }
}

// The cache key doesn't change when src/content files are edited, so in development read fresh every time.
const loadContent = process.env.NODE_ENV === "development"
  ? readContent
  // The section list is part of the key, so adding a section never serves an older cached copy without it.
  : unstable_cache(readContent, ["portfolio-content", Object.keys(contentSections).join(",")], { tags: [CONTENT_TAG] })

/** Site content: MongoDB copies edited in admin, falling back to the files in src/content. */
export async function getPortfolioContent() {
  return loadContent()
}

export type PortfolioContent = Awaited<ReturnType<typeof getPortfolioContent>>
