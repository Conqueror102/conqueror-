import { absoluteUrl } from "@/content"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPosts } from "@/lib/server/blog-repo"

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export const revalidate = 3600

export async function GET() {
  const [{ profile }, posts] = await Promise.all([getPortfolioContent(), getPublishedPosts()])
  const items = posts.slice(0, 50).map((post) => {
    const url = absoluteUrl(`/blog/${post.slug}`)
    return `<item><title>${escape(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escape(post.excerpt)}</description>${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}${post.tags.map((tag) => `<category>${escape(tag)}</category>`).join("")}</item>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(profile.name)} – Blog</title><link>${absoluteUrl("/blog")}</link><description>${escape(`Writing by ${profile.name}`)}</description><language>en</language><atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />${items.join("")}</channel></rss>`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
