"use client"

import { useEffect, useRef } from "react"

/**
 * A muted, looping background clip that downloads nothing until it scrolls near the screen,
 * pauses when it leaves, and stays on its poster for people who prefer reduced motion.
 */
export function LazyVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const element = video.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!element.src) element.src = src
        element.play().catch(() => {})
      } else element.pause()
    }, { rootMargin: "200px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [src])
  return <video ref={video} className={className} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}
