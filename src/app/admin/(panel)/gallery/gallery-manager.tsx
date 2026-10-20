"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { uploadFile } from "@/components/admin/upload"
import type { GalleryPhoto, galleryContent } from "@/content/gallery"
import { saveSectionAction, type ActionResult } from "../actions"

type Gallery = typeof galleryContent

const blankPhoto = (src: string): GalleryPhoto => ({ src, alt: "", caption: "", position: "50% 30%", showInHero: false })

/** Upload, caption, reorder and pick hero photos for the gallery section. */
export function GalleryManager({ initial, library }: { initial: Gallery; library: { url: string; name: string }[] }) {
  const router = useRouter()
  const files = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initial.photos)
  const [busy, setBusy] = useState<string | null>(null)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [pending, start] = useTransition()
  const dirty = JSON.stringify(photos) !== JSON.stringify(initial.photos)
  const inGallery = new Set(photos.map((photo) => photo.src))
  const unused = library.filter((asset) => !inGallery.has(asset.url))

  const update = (index: number, patch: Partial<GalleryPhoto>) => setPhotos((list) => list.map((photo, i) => (i === index ? { ...photo, ...patch } : photo)))
  const move = (index: number, step: number) => setPhotos((list) => {
    const target = index + step
    if (target < 0 || target >= list.length) return list
    const next = [...list]
    next[index] = list[target]
    next[target] = list[index]
    return next
  })

  async function uploadMany(list: FileList | null) {
    if (!list?.length) return
    setResult(null)
    const added: GalleryPhoto[] = []
    try {
      for (const [index, file] of Array.from(list).entries()) {
        setBusy(`Uploading ${index + 1} of ${list.length}…`)
        added.push(blankPhoto(await uploadFile(file, "gallery")))
      }
      setResult({ ok: true, message: `Added ${added.length} photo${added.length > 1 ? "s" : ""}. Add captions, then save.` })
    } catch (error) {
      setResult({ ok: false, error: error instanceof Error ? error.message : "Upload failed" })
    } finally {
      // Keep whatever made it up, even if a later file failed.
      if (added.length) setPhotos((current) => [...added, ...current])
      setBusy(null)
      if (files.current) files.current.value = ""
    }
  }

  const save = () => start(async () => {
    const cleaned = photos.map((photo) => ({ ...photo, alt: photo.alt.trim() || photo.caption.trim() || "Photo of Victor" }))
    const response = await saveSectionAction("gallery", { ...initial, photos: cleaned })
    setResult(response)
    if (response.ok) router.refresh()
  })

  const remove = (index: number) => {
    if (!confirm("Remove this photo from the gallery? The file stays in Media & CV.")) return
    setPhotos((list) => list.filter((_, i) => i !== index))
  }

  return (
    <>
      <section className="admin-card admin-stack">
        <div className="admin-row" style={{ justifyContent: "space-between" }}>
          <div><h2>{photos.length} photo{photos.length === 1 ? "" : "s"}</h2><p className="admin-muted">New photos go to the top. Use the arrows to reorder.</p></div>
          <button className="admin-button admin-button-primary" disabled={Boolean(busy)} onClick={() => files.current?.click()}>{busy ?? "Upload photos"}</button>
          <input ref={files} type="file" multiple accept="image/*" hidden onChange={(event) => uploadMany(event.target.files)} />
        </div>
        {unused.length ? (
          <details>
            <summary className="admin-link" style={{ cursor: "pointer" }}>Add from Media library ({unused.length})</summary>
            <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", marginTop: 12 }}>
              {unused.map((asset) => (
                <button key={asset.url} type="button" title={`Add ${asset.name}`} aria-label={`Add ${asset.name}`} onClick={() => setPhotos((list) => [blankPhoto(asset.url), ...list])}
                  style={{ aspectRatio: "1", borderRadius: 8, background: `var(--a-surface-2) url("${asset.url}") center / cover no-repeat` }} />
              ))}
            </div>
          </details>
        ) : null}
      </section>

      {photos.length === 0 ? <p className="admin-card admin-muted">No photos yet. Upload some to start the gallery.</p> : (
        <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))" }}>
          {photos.map((photo, index) => (
            <figure key={`${photo.src}-${index}`} className="admin-card admin-stack" style={{ margin: 0, padding: 10, gap: 8 }}>
              <div style={{ aspectRatio: "4 / 5", borderRadius: 8, background: `var(--a-surface-2) url("${photo.src}") ${photo.position} / cover no-repeat` }} aria-hidden />
              <label className="admin-field"><span>Caption</span><input type="text" value={photo.caption} onChange={(event) => update(index, { caption: event.target.value })} placeholder="A short line under the photo" /></label>
              <label className="admin-field"><span>Description for screen readers</span><input type="text" value={photo.alt} onChange={(event) => update(index, { alt: event.target.value })} placeholder="What’s in the photo" /></label>
              <label className="admin-field"><span>Crop focus (x% y%)</span><input type="text" value={photo.position} onChange={(event) => update(index, { position: event.target.value })} placeholder="50% 30%" /></label>
              <label className="admin-check"><input type="checkbox" checked={photo.showInHero} onChange={(event) => update(index, { showInHero: event.target.checked })} /> In hero</label>
              <div className="admin-row" style={{ gap: 6 }}>
                <button className="admin-button admin-button-small" disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move earlier">↑</button>
                <button className="admin-button admin-button-small" disabled={index === photos.length - 1} onClick={() => move(index, 1)} aria-label="Move later">↓</button>
                <span className="admin-spacer" />
                <button className="admin-button admin-button-small admin-button-danger" onClick={() => remove(index)}>Remove</button>
              </div>
            </figure>
          ))}
        </div>
      )}

      <div className="admin-savebar">
        <button className="admin-button admin-button-primary" disabled={pending || !dirty || Boolean(busy)} onClick={save}>{pending ? "Saving…" : "Save & publish"}</button>
        <span className="admin-spacer" />
        {result ? <p className={result.ok ? "admin-success" : "admin-error"}>{result.ok ? result.message : result.error}</p> : dirty ? <p className="admin-muted">Unsaved changes</p> : null}
      </div>
    </>
  )
}
