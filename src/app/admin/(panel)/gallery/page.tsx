import { cloudinaryConfigured } from "@/lib/server/cloudinary"
import { getSection } from "@/lib/server/content-repo"
import { listMedia } from "@/lib/server/media-repo"
import { GalleryManager } from "./gallery-manager"

export const metadata = { title: "Photo gallery" }

export default async function GalleryAdminPage() {
  const [{ value, edited, updatedAt }, assets] = await Promise.all([getSection("gallery"), listMedia()])
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Cloudinary</p>
          <h1 className="admin-title">Photo gallery</h1>
          <p className="admin-muted">Every photo here shows on <a className="admin-link" href="/gallery" target="_blank">/gallery</a>. Tick “In hero” to also show it in the homepage photo card (the first 7 ticked appear there).</p>
        </div>
        <span className={`admin-badge ${edited ? "admin-badge-accent" : ""}`}>{edited ? "Edited in admin" : "Original content"}</span>
      </header>
      {cloudinaryConfigured() ? null : <p className="admin-card admin-error">Cloudinary isn’t set up yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local and restart the dev server.</p>}
      <GalleryManager key={updatedAt?.toISOString() ?? "original"} initial={JSON.parse(JSON.stringify(value))}
        library={assets.filter((asset) => asset.resourceType === "image").map((asset) => ({ url: asset.url, name: asset.name }))} />
    </div>
  )
}
