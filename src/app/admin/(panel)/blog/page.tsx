import Link from "next/link"
import { listPosts } from "@/lib/server/blog-repo"
import { DeletePostButton } from "./delete-post-button"

export const metadata = { title: "Blog" }

export default async function BlogAdminPage() {
  const posts = await listPosts({ includeDrafts: true })
  const now = new Date().toISOString()
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div><p className="admin-eyebrow">{posts.length} posts</p><h1 className="admin-title">Blog</h1></div>
        <div className="admin-row"><Link href="/blog" target="_blank" className="admin-button">View blog ↗</Link><Link href="/admin/blog/new" className="admin-button admin-button-primary">+ New post</Link></div>
      </header>
      {posts.length === 0 ? <div className="admin-card"><p className="admin-muted">No posts yet. Your first one will appear at /blog.</p></div> : (
        <div className="admin-card admin-table-wrap" style={{ padding: 0 }}>
          <table className="admin-table admin-cards-blog">
            <thead><tr><th /><th>Post</th><th>Status</th><th>Published</th><th /></tr></thead>
            <tbody>
              {posts.map((post) => {
                const scheduled = post.status === "published" && post.publishedAt && post.publishedAt > now
                return (
                  <tr key={post.slug}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail */}
                    <td>{post.coverImage ? <img src={post.coverImage} alt="" className="admin-thumb" /> : <div className="admin-thumb" />}</td>
                    <td><Link href={`/admin/blog/${post.slug}`} className="admin-link">{post.title}</Link><p className="admin-muted">/blog/{post.slug} · {post.readingMinutes} min read{post.tags.length ? ` · ${post.tags.join(", ")}` : ""}</p></td>
                    <td><span className={`admin-badge ${post.status === "published" && !scheduled ? "admin-badge-success" : ""}`}>{scheduled ? "Scheduled" : post.status === "published" ? "Published" : "Draft"}</span>{post.featured ? <> <span className="admin-badge admin-badge-accent">Featured</span></> : null}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "—"}</td>
                    <td style={{ whiteSpace: "nowrap", textAlign: "right" }}><Link href={`/admin/blog/${post.slug}`} className="admin-button admin-button-small">Edit</Link> <DeletePostButton slug={post.slug} title={post.title} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
