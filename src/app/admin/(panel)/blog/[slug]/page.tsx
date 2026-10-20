import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, type Post } from "@/lib/server/blog-repo"
import { site } from "@/content"
import { PostEditor } from "./post-editor"

type Props = { params: Promise<{ slug: string }> }

export const metadata = { title: "Edit post" }

const emptyPost: Post = {
  slug: "", title: "", excerpt: "", content: "", coverImage: "", coverAlt: "", tags: [], status: "draft", featured: false,
  seoTitle: "", seoDescription: "", canonicalUrl: "", publishedAt: null, updatedAt: "", readingMinutes: 1,
}

export default async function PostEditPage({ params }: Props) {
  const { slug } = await params
  const isNew = slug === "new"
  const post = isNew ? emptyPost : await getPost(slug, { includeDrafts: true })
  if (!post) notFound()
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div><Link href="/admin/blog" className="admin-link">← Blog</Link><h1 className="admin-title">{isNew ? "New post" : post.title}</h1></div>
        {!isNew && post.status === "published" ? <Link href={`/blog/${post.slug}`} target="_blank" className="admin-button">View post ↗</Link> : null}
      </header>
      <PostEditor previousSlug={isNew ? null : slug} initial={{ ...emptyPost, ...post }} siteUrl={site.url} />
    </div>
  )
}
