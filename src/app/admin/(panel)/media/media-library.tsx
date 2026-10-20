"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { uploadFile } from "@/components/admin/upload"
import { deleteMediaAction, setCvAction } from "../actions"

type Asset = { id: string; url: string; name: string; resourceType: string; format: string; bytes: number; width?: number; height?: number; createdAt: string }

const size = (bytes: number) => (bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} KB`)

export function MediaLibrary({ assets, cv }: { assets: Asset[]; cv: string }) {
  const router = useRouter()
  const files = useRef<HTMLInputElement>(null)
  const cvInput = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [pending, start] = useTransition()

  async function uploadMany(list: FileList | null) {
    if (!list?.length) return
    setBusy(true)
    setStatus(null)
    try {
      for (const file of Array.from(list)) await uploadFile(file, "library")
      setStatus({ ok: true, text: `Uploaded ${list.length} file${list.length > 1 ? "s" : ""}.` })
      router.refresh()
    } catch (error) {
      setStatus({ ok: false, text: error instanceof Error ? error.message : "Upload failed" })
    } finally {
      setBusy(false)
      if (files.current) files.current.value = ""
    }
  }

  async function uploadCv(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setStatus(null)
    try {
      const url = await uploadFile(file, "cv")
      const result = await setCvAction(url)
      setStatus(result.ok ? { ok: true, text: "New CV is live at /cv." } : { ok: false, text: result.error })
      router.refresh()
    } catch (error) {
      setStatus({ ok: false, text: error instanceof Error ? error.message : "Upload failed" })
    } finally {
      setBusy(false)
      if (cvInput.current) cvInput.current.value = ""
    }
  }

  const remove = (asset: Asset) => {
    if (!confirm(`Delete ${asset.name}? Anything on the site still using it will show a broken image.`)) return
    start(async () => {
      const result = await deleteMediaAction(asset.id)
      if (!result.ok) setStatus({ ok: false, text: result.error })
      router.refresh()
    })
  }

  return (
    <div className="admin-stack">
      <section className="admin-card admin-stack">
        <div><h2>CV</h2><p className="admin-muted">Visitors get the current CV at <a className="admin-link" href="/cv" target="_blank">/cv</a>. Now serving: <code>{cv}</code></p></div>
        <div><button className="admin-button admin-button-primary" disabled={busy} onClick={() => cvInput.current?.click()}>{busy ? "Uploading…" : "Upload new CV (PDF)"}</button></div>
        <input ref={cvInput} type="file" accept="application/pdf" hidden onChange={(event) => uploadCv(event.target.files?.[0])} />
      </section>

      <section className="admin-card admin-stack">
        <div className="admin-row" style={{ justifyContent: "space-between" }}>
          <div><h2>Library</h2><p className="admin-muted">Upload images here, then paste their link into any image field. Image fields can also upload directly.</p></div>
          <button className="admin-button" disabled={busy} onClick={() => files.current?.click()}>{busy ? "Uploading…" : "Upload files"}</button>
          <input ref={files} type="file" multiple accept="image/*,application/pdf,video/*" hidden onChange={(event) => uploadMany(event.target.files)} />
        </div>
        {status ? <p className={status.ok ? "admin-success" : "admin-error"}>{status.text}</p> : null}
        {assets.length === 0 ? <p className="admin-muted">Nothing uploaded yet.</p> : (
          <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {assets.map((asset) => (
              <figure key={asset.id} className="admin-card" style={{ margin: 0, padding: 10 }}>
                {asset.resourceType === "image"
                  // eslint-disable-next-line @next/next/no-img-element -- admin preview
                  ? <img src={asset.url} alt={asset.name} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 8, background: "var(--a-surface-2)" }} />
                  : <div style={{ aspectRatio: "4 / 3", display: "grid", placeItems: "center", borderRadius: 8, background: "var(--a-surface-2)" }}>{asset.format.toUpperCase() || asset.resourceType}</div>}
                <figcaption className="admin-stack" style={{ gap: 6, marginTop: 8 }}>
                  <strong style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{asset.name}</strong>
                  <span className="admin-muted" style={{ fontSize: 12 }}>{[asset.width && `${asset.width}×${asset.height}`, size(asset.bytes)].filter(Boolean).join(" · ")}</span>
                  <div className="admin-row" style={{ gap: 6 }}>
                    <button className="admin-button admin-button-small" onClick={() => { navigator.clipboard.writeText(asset.url); setStatus({ ok: true, text: "Link copied." }) }}>Copy link</button>
                    <button className="admin-button admin-button-small admin-button-danger" disabled={pending} onClick={() => remove(asset)}>Delete</button>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
