"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type SlideshowCopy = {
  label: string
  slideLabel: string
  interval: number
  openLabel: string
  close: string
  previous: string
  next: string
  hint: string
  slides: readonly { src: string; alt: string; caption: string; position: string }[]
}

/** Auto-playing photo carousel. On hover (or tap) every photo fans out along an arc; clicking one opens a preview. */
export function HeroSlideshow({ copy }: { copy: SlideshowCopy }) {
  const slides = copy.slides
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => setReducedMotion(preference.matches)
    syncPreference()
    preference.addEventListener("change", syncPreference)
    let inView = false
    const syncVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncVisibility()
    })
    if (root.current) observer.observe(root.current)
    document.addEventListener("visibilitychange", syncVisibility)
    return () => {
      observer.disconnect()
      preference.removeEventListener("change", syncPreference)
      document.removeEventListener("visibilitychange", syncVisibility)
    }
  }, [])

  useEffect(() => {
    if (open || preview !== null || !visible || reducedMotion || slides.length < 2) return
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), copy.interval)
    return () => window.clearInterval(timer)
  }, [open, preview, visible, reducedMotion, copy.interval, slides.length])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [open])

  function show(index: number) {
    setPreview(index)
    setActive(index)
    dialog.current?.showModal()
  }
  function move(step: number) {
    setPreview(index => index === null ? index : (index + step + slides.length) % slides.length)
  }
  const selected = preview === null ? null : slides[preview]

  return (
    <div ref={root} className="hero-slideshow" role="region" aria-label={copy.label} data-open={open}
      onPointerEnter={event => { if (event.pointerType !== "touch") setOpen(true) }}
      onPointerLeave={event => { if (event.pointerType !== "touch") setOpen(false) }}
      onClick={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
      {slides.map((slide, index) => (
        <div className="hero-slide" key={slide.src} data-active={index === active} aria-hidden={index !== active}>
          <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 24vw" style={{ objectPosition: slide.position }} />
          <p>{slide.caption}</p>
        </div>
      ))}
      <span className="hero-fan-hint" aria-hidden="true">{copy.hint}</span>
      <ul className="hero-photo-fan">
        {slides.map((slide, index) => (
          <li key={slide.src} style={{ "--i": index, "--n": slides.length, "--delay": `${index * 45}ms` } as React.CSSProperties}>
            <button type="button" aria-label={`${copy.openLabel}: ${slide.caption}`} tabIndex={open ? 0 : -1}
              onClick={event => { event.stopPropagation(); show(index) }}>
              <Image src={slide.src} alt="" fill sizes="90px" style={{ objectPosition: slide.position }} />
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} className="hero-lightbox" aria-label={copy.label} onClose={() => setPreview(null)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
        onKeyDown={event => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
          else if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
        }}>
        {selected && <div className="hero-lightbox-content">
          <div className="hero-lightbox-image"><Image key={selected.src} src={selected.src} alt={selected.alt} fill sizes="(max-width: 1000px) 92vw, 940px" loading="eager" /></div>
          <footer>
            <p>{selected.caption}</p>
            <nav>
              <button type="button" aria-label={copy.previous} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
              <span>{String((preview ?? 0) + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <button type="button" aria-label={copy.next} onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
            </nav>
          </footer>
          <button type="button" className="hero-lightbox-close" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </div>}
      </dialog>
    </div>
  )
}
