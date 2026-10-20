"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { requireAdmin } from "@/lib/auth/admin"
import { contentSections, isContentSectionKey, type StoredProject } from "@/lib/content-sections"
import { CONTENT_TAG } from "@/lib/portfolio-content"
import { deleteProject, getSection, reorderProjects, resetSection, saveProject, saveSection } from "@/lib/server/content-repo"
import { cloudinaryConfigured, destroyAsset, optimizedImageUrl, signUpload } from "@/lib/server/cloudinary"
import { recordMedia, removeMedia } from "@/lib/server/media-repo"
import { BLOG_TAG, deletePost, savePost, type Post } from "@/lib/server/blog-repo"
import { renderMarkdown } from "@/lib/markdown"

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string }

/** Push admin edits to the live site straight away. */
async function publish() {
  revalidateTag(CONTENT_TAG, { expire: 0 })
  revalidatePath("/", "layout")
}

const fail = (error: unknown): ActionResult => ({ ok: false, error: error instanceof Error ? error.message : String(error) })

const sameKind = (a: unknown, b: unknown) => Array.isArray(a) === Array.isArray(b) && typeof a === typeof b

// ---- Site content sections ----

export async function saveSectionAction(key: string, value: unknown): Promise<ActionResult> {
  await requireAdmin()
  try {
    if (!isContentSectionKey(key)) throw new Error("Unknown section")
    if (!sameKind(value, contentSections[key].defaults)) throw new Error("This section must keep the same overall shape (list or group of fields).")
    await saveSection(key, value)
    await publish()
    return { ok: true, message: "Saved and published." }
  } catch (error) {
    return fail(error)
  }
}

export async function resetSectionAction(key: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    if (!isContentSectionKey(key)) throw new Error("Unknown section")
    await resetSection(key)
    await publish()
    return { ok: true, message: "Restored the original content." }
  } catch (error) {
    return fail(error)
  }
}

// ---- Projects ----

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function cleanProject(project: StoredProject): StoredProject {
  const copy: Record<string, unknown> = { ...project }
  // Optional text fields left blank are removed so the site treats them as absent.
  for (const key of ["liveUrl", "repoUrl", "note"]) if (copy[key] === "") delete copy[key]
  for (const key of ["story", "highlights", "gallery", "facts"]) if (Array.isArray(copy[key]) && (copy[key] as unknown[]).length === 0) delete copy[key]
  if (copy.caseStudy === null) delete copy.caseStudy
  return copy as StoredProject
}

export async function saveProjectAction(previousSlug: string | null, project: StoredProject): Promise<ActionResult & { slug?: string }> {
  await requireAdmin()
  try {
    const cleaned = cleanProject(project)
    cleaned.slug = cleaned.slug.trim().toLowerCase()
    if (!slugPattern.test(cleaned.slug)) throw new Error("The slug can only use lowercase letters, numbers and dashes, like my-project.")
    if (!cleaned.title?.trim()) throw new Error("Add a title.")
    if (!cleaned.image?.trim()) throw new Error("Add a cover image.")
    await saveProject(previousSlug, cleaned)
    await publish()
    return { ok: true, message: "Project saved and published.", slug: cleaned.slug }
  } catch (error) {
    return fail(error)
  }
}

export async function deleteProjectAction(slug: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await deleteProject(slug)
    await publish()
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

export async function reorderProjectsAction(slugs: string[]): Promise<ActionResult> {
  await requireAdmin()
  try {
    await reorderProjects(slugs)
    await publish()
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

/** Point the profile's CV at a newly uploaded file. */
export async function setCvAction(url: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    const { value } = await getSection("profile")
    await saveSection("profile", { ...value, cv: url })
    await publish()
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

// ---- Blog ----

export async function savePostAction(previousSlug: string | null, post: Post): Promise<ActionResult & { slug?: string }> {
  await requireAdmin()
  try {
    const slug = post.slug.trim().toLowerCase()
    if (!slugPattern.test(slug)) throw new Error("The slug can only use lowercase letters, numbers and dashes, like my-first-post.")
    if (!post.title.trim()) throw new Error("Add a title.")
    const tags = post.tags.map((tag) => tag.trim()).filter(Boolean)
    const saved = await savePost(previousSlug, { ...post, slug, tags })
    revalidateTag(BLOG_TAG, { expire: 0 })
    revalidatePath("/blog", "layout")
    revalidatePath("/sitemap.xml")
    return { ok: true, message: saved.status === "published" ? "Published." : "Draft saved.", slug }
  } catch (error) {
    return fail(error)
  }
}

export async function deletePostAction(slug: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await deletePost(slug)
    revalidateTag(BLOG_TAG, { expire: 0 })
    revalidatePath("/blog", "layout")
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

/** Markdown preview, rendered exactly as the public post will be. */
export async function previewMarkdownAction(markdown: string) {
  await requireAdmin()
  return renderMarkdown(markdown).html
}

// ---- Media (Cloudinary) ----

export async function signUploadAction(folder: string) {
  await requireAdmin()
  if (!cloudinaryConfigured()) return { ok: false as const, error: "Cloudinary isn’t set up yet. Add the CLOUDINARY_* keys to .env.local and restart the dev server." }
  const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, "").slice(0, 60) || "uploads"
  return { ok: true as const, params: signUpload(safeFolder) }
}

export type UploadedAsset = { public_id: string; secure_url: string; resource_type: string; format?: string; bytes?: number; width?: number; height?: number; folder?: string; original_filename?: string }

export async function recordUploadAction(asset: UploadedAsset) {
  await requireAdmin()
  const url = optimizedImageUrl(asset.secure_url)
  await recordMedia({
    _id: asset.public_id,
    url,
    originalUrl: asset.secure_url,
    resourceType: asset.resource_type,
    format: asset.format,
    bytes: asset.bytes,
    width: asset.width,
    height: asset.height,
    folder: asset.folder ?? "",
    name: asset.original_filename ?? asset.public_id,
    createdAt: new Date(),
  })
  return { url }
}

export async function deleteMediaAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    const removed = await removeMedia(id)
    if (removed) await destroyAsset(id, removed.resourceType)
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}
