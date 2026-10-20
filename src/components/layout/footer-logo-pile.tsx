"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { createPileBodies, createPileSlots, stepPile, type PileBody } from "@/lib/logo-pile-physics"

export function FooterLogoPile({ copy }: { copy: PortfolioContent["footerPile"] }) {
  const scene = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const pointer = useRef({ x: 0, y: 0, active: false })
  const controls = useRef({ wake: () => {}, sync: () => {} })
  const layouts = useMemo(() => [copy.desktop, copy.mobile].map(config => ({ ...config, slots: createPileSlots(config.columns, config.rows, copy.logos.length) })), [copy])

  useEffect(() => {
    const root = scene.current
    if (!root) return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    let bodies: PileBody[] = [], elements: HTMLElement[] = []
    let width = 0, height = 0, frame = 0, last = 0, visible = false, quiet = 0, elapsed = 0
    function paint() {
      bodies.forEach((body, index) => {
        elements[index].style.transform = `translate3d(${(body.x - body.homeX).toFixed(2)}px,${(body.y - body.homeY).toFixed(2)}px,0) translate(-50%,-50%) rotate(${body.angle.toFixed(3)}rad)`
      })
    }
    function canRun() { return visible && !document.hidden && !reduced.matches && !pausedRef.current }
    function animate(time: number) {
      frame = 0
      if (!canRun()) return
      const dt = Math.min((time - (last || time - 16.67)) / 1000, 1 / 30)
      last = time; elapsed += dt
      const energy = stepPile(bodies, dt, width, height, pointer.current)
      paint()
      quiet = !pointer.current.active && energy < 2 ? quiet + 1 : 0
      if (quiet > 45 || (!pointer.current.active && elapsed > 14)) { root!.dataset.motion = "idle"; return }
      frame = requestAnimationFrame(animate)
    }
    function wake() {
      quiet = 0; elapsed = 0
      if (!frame && canRun()) { last = 0; root!.dataset.motion = "running"; frame = requestAnimationFrame(animate) }
    }
    function sync() {
      cancelAnimationFrame(frame); frame = 0; last = 0
      root!.dataset.motion = reduced.matches ? "reduced" : pausedRef.current ? "paused" : "idle"
      if (reduced.matches) resize()
      else wake()
    }
    function resize() {
      width = root!.clientWidth; height = root!.clientHeight
      const compact = width <= 700
      const layout = layouts[compact ? 1 : 0]
      elements = [...root!.querySelectorAll<HTMLElement>(compact ? ".footer-pile-compact > span" : ".footer-pile-wide > span")]
      bodies = createPileBodies(layout.slots, width, height, layout.columns)
      const unit = Math.min(width / layout.columns, height / 12 * 1.2)
      elements.forEach((element, index) => { element.style.width = `${unit * layout.slots[index].scale}px`; element.style.height = `${unit * layout.slots[index].scale}px` })
      paint(); wake()
    }
    controls.current = { wake, sync }
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { rootMargin: "30px" })
    const observer = new ResizeObserver(resize)
    intersection.observe(root); observer.observe(root)
    reduced.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    resize()
    return () => { cancelAnimationFrame(frame); intersection.disconnect(); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); controls.current = { wake: () => {}, sync: () => {} } }
  }, [layouts])

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true }
    controls.current.wake()
  }

  return <div className="footer-pile-section">
    <div ref={scene} className="footer-logo-pile" id="footer-tools" aria-hidden="true" onPointerMove={move} onPointerLeave={() => { pointer.current.active = false; controls.current.wake() }}>
      {layouts.map((layout, layoutIndex) => <div className={layoutIndex ? "footer-pile-compact" : "footer-pile-wide"} key={layout.columns}>
        {layout.slots.map((slot,index) => <span key={index} style={{ left: `${(slot.x * 100).toFixed(3)}%`, top: `${(slot.y * 100).toFixed(3)}%`, width: `${(100 / layout.columns * slot.scale).toFixed(3)}cqw`, height: `${(100 / layout.columns * slot.scale).toFixed(3)}cqw`, maskImage: `url("${copy.logos[slot.logo].icon}")`, transform: `translate(-50%,-50%) rotate(${slot.angle.toFixed(3)}rad)` } as CSSProperties} />)}
      </div>)}
    </div>
    <button className="footer-pile-toggle" type="button" aria-controls="footer-tools" aria-pressed={paused} onClick={() => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); pointer.current.active = false; controls.current.sync() }}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{paused ? copy.resume : copy.pause}</button>
  </div>
}
