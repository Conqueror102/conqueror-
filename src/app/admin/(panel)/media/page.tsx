import { getPortfolioContent } from "@/lib/portfolio-content"
import { cloudinaryConfigured } from "@/lib/server/cloudinary"
import { listMedia } from "@/lib/server/media-repo"
import { MediaLibrary } from "./media-library"

export const metadata = { title: "Media & CV" }

export default async function MediaPage() {
  const [assets, content] = await Promise.all([listMedia(), getPortfolioContent()])
  return (
    <div className="admin-stack">
      <header className="admin-header"><div><p className="admin-eyebrow">Cloudinary</p><h1 className="admin-title">Media & CV</h1></div></header>
      {cloudinaryConfigured() ? null : <p className="admin-card admin-error">Cloudinary isn’t set up yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local and restart the dev server.</p>}
      <MediaLibrary cv={content.profile.cv} assets={assets.map((asset) => ({ id: asset._id, url: asset.url, name: asset.name, resourceType: asset.resourceType, format: asset.format ?? "", bytes: asset.bytes ?? 0, width: asset.width, height: asset.height, createdAt: asset.createdAt.toISOString() }))} />
    </div>
  )
}
