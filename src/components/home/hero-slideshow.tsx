"use client"

import Image from "next/image"
import Link from "next/link"
import { Images } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { PhotoLightbox } from "@/components/ui/photo-lightbox"

type SlideshowCopy = {
  label: string
  slideLabel: string
  interval: number
  openLabel: string
  close: string
  previous: string
  next: string
  hint: string
}

type Slide = { src: string; alt: string; caption: string; position: string }

/** The fan has room for this many photos; the rest live on the gallery page. */
const FAN_LIMIT = 7

/** Auto-playing photo carousel. On hover (or tap) every photo fans out along an arc; clicking one opens a preview. */
export function HeroSlideshow({ copy, slides: allSlides, gallery }: { copy: SlideshowCopy; slides: readonly Slide[]; gallery: { label: string; href: string; total: number } }) {
  const slides = allSlides.slice(0, FAN_LIMIT)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const root = useRef<HTMLDivElement>(null)

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
  }
  const fanCount = slides.length + 1

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
      <Link className="hero-gallery-link" href={gallery.href} aria-label={`${gallery.label} (${gallery.total})`} onClick={event => event.stopPropagation()}>
        <Images size={14} aria-hidden="true" /><em>{gallery.label}</em><span>{gallery.total}</span>
      </Link>
      <ul className="hero-photo-fan">
        {slides.map((slide, index) => (
          <li key={slide.src} style={{ "--i": index, "--n": fanCount, "--delay": `${index * 45}ms` } as React.CSSProperties}>
            <button type="button" aria-label={`${copy.openLabel}: ${slide.caption}`} tabIndex={open ? 0 : -1}
              onClick={event => { event.stopPropagation(); show(index) }}>
              <Image src={slide.src} alt="" fill sizes="90px" style={{ objectPosition: slide.position }} />
            </button>
          </li>
        ))}
        <li className="hero-photo-fan-all" style={{ "--i": slides.length, "--n": fanCount, "--delay": `${slides.length * 45}ms` } as React.CSSProperties}>
          <Link href={gallery.href} tabIndex={open ? 0 : -1} onClick={event => event.stopPropagation()}>
            <Images size={20} aria-hidden="true" /><strong>{gallery.total}</strong><span>{gallery.label}</span>
          </Link>
        </li>
      </ul>
      <PhotoLightbox photos={slides} index={preview} onChange={index => { setPreview(index); if (index !== null) setActive(index) }}
        labels={{ label: copy.label, close: copy.close, previous: copy.previous, next: copy.next }} link={{ label: gallery.label, href: gallery.href }} />
    </div>
  )
}
