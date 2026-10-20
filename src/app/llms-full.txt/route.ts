import { buildLlmsFullTxt } from "@/lib/llms"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPosts } from "@/lib/server/blog-repo"

// Rebuilt when content changes in admin, and at least hourly for scheduled posts.
export const revalidate = 3600

export async function GET() {
  const [content, posts] = await Promise.all([getPortfolioContent(), getPublishedPosts()])
  return new Response(buildLlmsFullTxt(content, posts), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
