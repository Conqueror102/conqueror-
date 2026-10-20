"use client"

import { useRef, useState } from "react"
import { uploadFile } from "./upload"

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  folder?: string
  accept?: string
}

/** A URL field with an upload button and a preview. Accepts a site path (/images/x.png) or a full URL. */
export function MediaInput({ label, value, onChange, folder = "images", accept = "image/*" }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isImage = accept.startsWith("image")

  async function handle(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      onChange(await uploadFile(file, folder))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed")
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ""
    }
  }

  return (
    <div className="admin-media">
      {isImage ? <div className="admin-media-preview" style={value ? { backgroundImage: `url("${value}")` } : undefined} aria-hidden /> : null}
      {accept.startsWith("video") && value ? <video className="admin-media-preview" src={value} muted playsInline style={{ objectFit: "cover" }} /> : null}
      <label className="admin-field">
        <span>{label}</span>
        <div className="admin-row" style={{ flexWrap: "nowrap" }}>
          <input type="text" value={value} onChange={(event) => onChange(event.target.value)} placeholder={isImage ? "/images/photo.jpg or https://…" : "https://…"} />
          <button type="button" className="admin-button admin-button-small" disabled={busy} onClick={() => input.current?.click()}>{busy ? "Uploading…" : "Upload"}</button>
        </div>
        {error ? <span className="admin-error">{error}</span> : null}
      </label>
      <input ref={input} type="file" accept={accept} hidden onChange={(event) => handle(event.target.files?.[0])} />
    </div>
  )
}
