"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { HeroLogo } from "@/content/home"

export function PortraitScene({ src, alt, logos }: { src: string; alt: string; logos: readonly HeroLogo[] }) {
  const scene = useRef<HTMLDivElement>(null)
  const elements = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const root = scene.current
    if (!root) return
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let visible = false
    let width = root.clientWidth
    let height = root.clientHeight
    let lastTime = 0
    let clock = 0
    let strength = 0
    const positions = logos.map(() => ({ x: 0, y: 0, scale: 1 }))

    function animate(time: number) {
      if (!visible || reducedMotion.matches) return
      const delta = Math.min(time - (lastTime || time), 40)
      lastTime = time
      clock += delta
      const smoothing = 1 - Math.exp(-delta / 130)
      strength += ((pointer.current.active ? 1 : 0) - strength) * smoothing
      logos.forEach((logo, index) => {
        const element = elements.current[index]
        if (!element) return
        const phase = index * 2.39996
        const driftX = Math.sin(clock * .00018 * logo.depth + phase) * 9
        const driftY = Math.cos(clock * .00014 * logo.depth + phase) * 11
        const x = width * logo.x / 100 + driftX
        const y = height * logo.y / 100 + driftY
        const dx = x - pointer.current.x
        const dy = y - pointer.current.y
        const distance = Math.hypot(dx, dy)
        const radius = Math.min(width * .42, 155)
        const influence = Math.exp(-(distance * distance) / (radius * radius)) * strength
        const bulge = Math.sin(influence * Math.PI / 2)
        const position = positions[index]
        const targetX = driftX + dx / Math.max(distance, 1) * 27 * bulge
        const targetY = driftY + dy / Math.max(distance, 1) * 27 * bulge
        position.x += (targetX - position.x) * smoothing
        position.y += (targetY - position.y) * smoothing
        position.scale += (1 + bulge * .28 - position.scale) * smoothing
        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${Math.sin(clock * .0001 + phase) * 7}deg) scale(${position.scale})`
      })
      frame = requestAnimationFrame(animate)
    }

    function syncAnimation() {
      cancelAnimationFrame(frame)
      lastTime = 0
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(animate)
      else if (reducedMotion.matches) elements.current.forEach(element => element?.style.removeProperty("transform"))
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation() })
    const resize = new ResizeObserver(() => { width = root.clientWidth; height = root.clientHeight })
    observer.observe(root)
    resize.observe(root)
    reducedMotion.addEventListener("change", syncAnimation)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); reducedMotion.removeEventListener("change", syncAnimation) }
  }, [logos])

  return (
    <div ref={scene} className="hero-portrait-scene" onPointerMove={event => {
      if (event.pointerType === "touch") return
      const bounds = event.currentTarget.getBoundingClientRect()
      pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true }
    }} onPointerLeave={() => { pointer.current.active = false }}>
      <Image className="hero-portrait" src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 470px, 38vw" preload />
      <div className="hero-logo-field" aria-hidden="true">
        {logos.map((logo, index) => <span className="hero-asteroid" key={logo.slug} ref={element => { elements.current[index] = element }} style={{ left: `${logo.x}%`, top: `${logo.y}%`, width: logo.size, height: logo.size }}>
          <Image src={`/icons/brands/${logo.slug}.svg`} alt="" width={logo.size} height={logo.size} />
        </span>)}
      </div>
    </div>
  )
}
