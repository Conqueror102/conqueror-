"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MediaInput } from "@/components/admin/media-input"
import { uploadFile } from "@/components/admin/upload"
import type { Post } from "@/lib/server/blog-repo"
import { previewMarkdownAction, savePostAction, type ActionResult } from "../../actions"

const slugify = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 80)
const toLocalInput = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16) : "")

function Counter({ value, ideal }: { value: string; ideal: [number, number] }) {
  const ok = value.length >= ideal[0] && value.length <= ideal[1]
  return <span className={ok ? "admin-success" : "admin-muted"} style={{ fontSize: 11 }}>{value.length} / {ideal[1]}</span>
}

export function PostEditor({ previousSlug, initial, siteUrl }: { previousSlug: string | null; initial: Post; siteUrl: string }) {
  const router = useRouter()
  const [post, setPost] = useState(initial)
  const [tagText, setTagText] = useState(initial.tags.join(", "))
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [uploading, setUploading] = useState(false)
  const [pending, start] = useTransition()
  const editor = useRef<HTMLTextAreaElement>(null)
  const imageInput = useRef<HTMLInputElement>(null)
  const set = <K extends keyof Post>(key: K, value: Post[K]) => setPost((current) => ({ ...current, [key]: value }))
  const dirty = JSON.stringify(post) !== JSON.stringify(initial) || tagText !== initial.tags.join(", ")
  const autoSlug = !previousSlug && post.slug === slugify(post.title)

  const insert = (before: string, after = "", placeholder = "") => {
    const area = editor.current
    if (!area) return
    const { selectionStart: from, selectionEnd: to, value } = area
    const selected = value.slice(from, to) || placeholder
    const next = value.slice(0, from) + before + selected + after + value.slice(to)
    set("content", next)
    requestAnimationFrame(() => { area.focus(); area.setSelectionRange(from + before.length, from + before.length + selected.length) })
  }

  async function uploadImage(file: File | undefined) {
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file, `blog/${post.slug || "drafts"}`)
      insert(`![`, `](${url})`, file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "))
    } catch (error) {
      setResult({ ok: false, error: error instanceof Error ? error.message : "Upload failed" })
    } finally {
      setUploading(false)
      if (imageInput.current) imageInput.current.value = ""
    }
  }

  const save = (status: Post["status"]) => start(async () => {
    const next = { ...post, status, tags: tagText.split(",").map((tag) => tag.trim()).filter(Boolean) }
    const response = await savePostAction(previousSlug, next)
    setResult(response)
    if (response.ok && response.slug !== previousSlug) router.replace(`/admin/blog/${response.slug}`)
    else if (response.ok) { setPost({ ...next, publishedAt: next.publishedAt ?? (status === "published" ? new Date().toISOString() : null) }); router.refresh() }
  })

  const togglePreview = () => {
    if (preview !== null) return setPreview(null)
    start(async () => setPreview(await previewMarkdownAction(post.content)))
  }

  const seoTitle = post.seoTitle || post.title
  const seoDescription = post.seoDescription || post.excerpt

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 18, alignItems: "start" }} className="admin-post-layout">
      <style>{"@media (max-width: 980px) { .admin-post-layout { grid-template-columns: 1fr !important; } }"}</style>
      <div className="admin-stack">
        <label className="admin-field"><span>Title</span><input type="text" value={post.title} style={{ fontSize: 20, fontWeight: 600 }} onChange={(event) => setPost((current) => ({ ...current, title: event.target.value, slug: autoSlug ? slugify(event.target.value) : current.slug }))} /></label>
        <label className="admin-field"><span>URL</span><div className="admin-row" style={{ flexWrap: "nowrap", gap: 4 }}><span className="admin-muted">/blog/</span><input type="text" value={post.slug} onChange={(event) => set("slug", slugify(event.target.value))} /></div></label>
        <label className="admin-field"><span>Excerpt <Counter value={post.excerpt} ideal={[80, 200]} /></span><textarea rows={2} value={post.excerpt} onChange={(event) => set("excerpt", event.target.value)} placeholder="One or two sentences shown on the blog list and in search results." /></label>

        <div className="admin-field">
          <span>Content (Markdown)</span>
          <div className="admin-row" style={{ gap: 4 }}>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("\n## ", "\n", "Heading")}>H2</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("\n### ", "\n", "Subheading")}>H3</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("**", "**", "bold")}>Bold</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("_", "_", "italic")}>Italic</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("[", "](https://)", "link text")}>Link</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("\n- ", "", "List item")}>List</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("\n> ", "\n", "Quote")}>Quote</button>
            <button type="button" className="admin-button admin-button-small" onClick={() => insert("\n```ts\n", "\n```\n", "code")}>Code</button>
            <button type="button" className="admin-button admin-button-small" disabled={uploading} onClick={() => imageInput.current?.click()}>{uploading ? "Uploading…" : "Image"}</button>
            <span style={{ flex: 1 }} />
            <button type="button" className="admin-button admin-button-small" onClick={togglePreview}>{preview !== null ? "Edit" : "Preview"}</button>
          </div>
          <input ref={imageInput} type="file" accept="image/*" hidden onChange={(event) => uploadImage(event.target.files?.[0])} />
          {preview !== null
            ? <div className="admin-card blog-prose" style={{ minHeight: 480 }} dangerouslySetInnerHTML={{ __html: preview }} />
            : <textarea ref={editor} className="admin-code" style={{ minHeight: 520 }} value={post.content} onChange={(event) => set("content", event.target.value)} placeholder={"Write your post in Markdown.\n\n## Use H2 headings for sections\nThey build the table of contents and help search engines."} />}
          <span className="admin-muted" style={{ fontSize: 12 }}>{post.content.split(/\s+/).filter(Boolean).length} words · about {Math.max(1, Math.round(post.content.split(/\s+/).filter(Boolean).length / 220))} min read</span>
        </div>
      </div>

      <aside className="admin-stack" style={{ position: "sticky", top: 16 }}>
        <section className="admin-card admin-stack">
          <div className="admin-row" style={{ justifyContent: "space-between" }}><h2>Publish</h2><span className={`admin-badge ${post.status === "published" ? "admin-badge-success" : ""}`}>{post.status === "published" ? "Published" : "Draft"}</span></div>
          <label className="admin-field"><span>Publish date</span><input type="datetime-local" value={toLocalInput(post.publishedAt)} onChange={(event) => set("publishedAt", event.target.value ? new Date(event.target.value).toISOString() : null)} /></label>
          <p className="admin-muted" style={{ fontSize: 12 }}>Leave empty to publish now. A future date schedules the post.</p>
          <label className="admin-check"><input type="checkbox" checked={post.featured} onChange={(event) => set("featured", event.target.checked)} /> Feature at the top of the blog</label>
          <div className="admin-row">
            <button className="admin-button admin-button-primary" disabled={pending} onClick={() => save("published")}>{post.status === "published" ? "Update" : "Publish"}</button>
            <button className="admin-button" disabled={pending} onClick={() => save("draft")}>{post.status === "published" ? "Unpublish" : "Save draft"}</button>
          </div>
          {result ? <p className={result.ok ? "admin-success" : "admin-error"}>{result.ok ? result.message : result.error}</p> : dirty ? <p className="admin-muted">Unsaved changes</p> : null}
        </section>

        <section className="admin-card admin-stack">
          <h2>Cover image</h2>
          <MediaInput label="Image" value={post.coverImage} onChange={(value) => set("coverImage", value)} folder={`blog/${post.slug || "drafts"}`} />
          <label className="admin-field"><span>Alt text</span><input type="text" value={post.coverAlt} onChange={(event) => set("coverAlt", event.target.value)} placeholder="Describe the image for screen readers and search" /></label>
          <label className="admin-field"><span>Tags (comma separated)</span><input type="text" value={tagText} onChange={(event) => setTagText(event.target.value)} placeholder="Next.js, AI agents, Payments" /></label>
        </section>

        <section className="admin-card admin-stack">
          <h2>Search & social</h2>
          <div style={{ fontFamily: "arial, sans-serif", padding: 10, borderRadius: 8, background: "var(--a-bg)" }}>
            <div style={{ fontSize: 12, color: "var(--a-muted)" }}>{siteUrl.replace(/^https?:\/\//, "")} › blog › {post.slug || "…"}</div>
            <div style={{ fontSize: 17, color: "#1a0dab", lineHeight: 1.3, margin: "2px 0" }}>{(seoTitle || "Post title").slice(0, 60)}</div>
            <div style={{ fontSize: 13, color: "var(--a-muted)" }}>{(seoDescription || "The excerpt appears here.").slice(0, 160)}</div>
          </div>
          <label className="admin-field"><span>SEO title <Counter value={seoTitle} ideal={[30, 60]} /></span><input type="text" value={post.seoTitle} placeholder={post.title} onChange={(event) => set("seoTitle", event.target.value)} /></label>
          <label className="admin-field"><span>Meta description <Counter value={seoDescription} ideal={[110, 160]} /></span><textarea rows={3} value={post.seoDescription} placeholder={post.excerpt} onChange={(event) => set("seoDescription", event.target.value)} /></label>
          <label className="admin-field"><span>Canonical URL (if first published elsewhere)</span><input type="url" value={post.canonicalUrl} placeholder="https://dev.to/…" onChange={(event) => set("canonicalUrl", event.target.value)} /></label>
        </section>
      </aside>
    </div>
  )
}
