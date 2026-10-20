"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useEffect, useRef } from "react"

export type LightboxPhoto = { src: string; alt: string; caption: string }
export type LightboxLabels = { label: string; close: string; previous: string; next: string }

/** Full-size photo preview with previous/next. Open it by passing an index; null closes it. */
export function PhotoLightbox({ photos, index, onChange, labels, link }: {
  photos: readonly LightboxPhoto[]
  index: number | null
  onChange: (index: number | null) => void
  labels: LightboxLabels
  link?: { label: string; href: string }
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (index !== null && !element.open) element.showModal()
    if (index === null && element.open) element.close()
  }, [index])

  const move = (step: number) => { if (index !== null) onChange((index + step + photos.length) % photos.length) }
  const selected = index === null ? null : photos[index]

  return (
    <dialog ref={dialog} className="hero-lightbox" aria-label={labels.label} onClose={() => onChange(null)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
        else if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
      }}>
      {selected && <div className="hero-lightbox-content">
        <div className="hero-lightbox-image"><Image key={selected.src} src={selected.src} alt={selected.alt} fill sizes="(max-width: 1000px) 92vw, 940px" loading="eager" /></div>
        <footer>
          <p>{selected.caption}</p>
          {link && <Link className="hero-lightbox-all" href={link.href}>{link.label}<ArrowRight size={15} aria-hidden="true" /></Link>}
          {photos.length > 1 && <nav>
            <button type="button" aria-label={labels.previous} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <span>{String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
            <button type="button" aria-label={labels.next} onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </nav>}
        </footer>
        <button type="button" className="hero-lightbox-close" aria-label={labels.close} onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
      </div>}
    </dialog>
  )
}
