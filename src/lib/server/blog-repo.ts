import "server-only"
import { unstable_cache } from "next/cache"
import { getDb, hasDatabase } from "./db"

export type PostStatus = "draft" | "published"

export type Post = {
  slug: string
  title: string
  excerpt: string
  /** Markdown. */
  content: string
  coverImage: string
  coverAlt: string
  tags: string[]
  status: PostStatus
  featured: boolean
  /** Overrides for search results and social cards; fall back to title/excerpt. */
  seoTitle: string
  seoDescription: string
  /** Set when the post was first published somewhere else (e.g. Dev.to). */
  canonicalUrl: string
  publishedAt: string | null
  updatedAt: string
  readingMinutes: number
}

type PostDoc = Post & { _id: string }

export const BLOG_TAG = "blog-posts"

const posts = async () => (await getDb()).collection<PostDoc>("posts")
const strip = ({ _id, ...post }: PostDoc): Post => {
  void _id
  return post
}

export const readingMinutes = (markdown: string) => Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 220))

export async function listPosts({ includeDrafts = false } = {}): Promise<Post[]> {
  if (!hasDatabase()) return []
  try {
    const filter = includeDrafts ? {} : { status: "published" as const, publishedAt: { $lte: new Date().toISOString() } }
    return (await (await posts()).find(filter).sort({ publishedAt: -1, updatedAt: -1 }).toArray()).map(strip)
  } catch (error) {
    console.error("[blog] Could not load posts:", error)
    return []
  }
}

export async function getPost(slug: string, { includeDrafts = false } = {}) {
  if (!hasDatabase()) return null
  const doc = await (await posts()).findOne({ _id: slug })
  if (!doc) return null
  if (!includeDrafts && (doc.status !== "published" || !doc.publishedAt || doc.publishedAt > new Date().toISOString())) return null
  return strip(doc)
}

// Posts written outside the admin (scripts/seed-blog-posts.ts) don't revalidate the tag, so in development read fresh every time.
const isDev = process.env.NODE_ENV === "development"

/** Published posts, cached for the public site and refreshed when the admin saves. */
export const getPublishedPosts = isDev ? () => listPosts() : unstable_cache(() => listPosts(), ["blog-posts"], { tags: [BLOG_TAG], revalidate: 3600 })
export const getPublishedPost = isDev ? (slug: string) => getPost(slug) : unstable_cache((slug: string) => getPost(slug), ["blog-post"], { tags: [BLOG_TAG], revalidate: 3600 })

export async function savePost(previousSlug: string | null, post: Post) {
  const collection = await posts()
  const now = new Date().toISOString()
  const doc: Post = {
    ...post,
    updatedAt: now,
    readingMinutes: readingMinutes(post.content),
    publishedAt: post.status === "published" ? post.publishedAt || now : post.publishedAt,
  }
  if (previousSlug !== post.slug && (await collection.findOne({ _id: post.slug }))) throw new Error(`A post with the slug "${post.slug}" already exists`)
  if (previousSlug && previousSlug !== post.slug) await collection.deleteOne({ _id: previousSlug })
  await collection.replaceOne({ _id: post.slug }, doc, { upsert: true })
  return doc
}

export async function deletePost(slug: string) {
  await (await posts()).deleteOne({ _id: slug })
}
