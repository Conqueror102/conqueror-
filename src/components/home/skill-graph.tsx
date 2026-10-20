"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowLeftRight, RotateCcw } from "lucide-react"
import type { SkillEcosystem, SkillGraphContent, SkillGraphNode } from "@/content/skill-graph"

const WIDTH = 1280
const HEIGHT = 1090

export function SkillGraph({ content }: { content: SkillGraphContent }) {
  const nodes: SkillGraphNode[] = content.nodes
  const stage = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const nodeElements = useRef(new Map<string, HTMLButtonElement>())
  const edgeElements = useRef(new Map<number, SVGLineElement>())
  const [focusGroup, setFocusGroup] = useState<SkillEcosystem | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const active = hovered ?? pinned
  const selected = nodes.find(node => node.id === active)
  const neighbors = new Set(content.edges.flatMap(([a, b]) => a === active ? [b] : b === active ? [a] : []))
  const byId = new Map(nodes.map(node => [node.id, node]))

  useEffect(() => {
    const element = stage.current
    if (!element) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    let frame = 0
    let last = 0
    let scale = element.clientWidth / WIDTH
    const points = new Map<string, { x: number; y: number }>()
    const draw = (time: number) => {
      frame = 0
      if (!visible || document.hidden || motion.matches) return
      if (time - last > 32) {
        last = time
        nodes.forEach((node, index) => {
          const amplitude = node.kind === "hub" ? 2 : 5
          const dx = Math.sin(time * .00024 + index * 2.4) * amplitude
          const dy = Math.cos(time * .00018 + index * 1.8) * amplitude
          points.set(node.id, { x: node.x + dx, y: node.y + dy })
          const button = nodeElements.current.get(node.id)
          if (button) button.style.translate = `${dx * scale}px ${dy * scale}px`
        })
        content.edges.forEach(([a, b], index) => {
          const start = points.get(a)
          const end = points.get(b)
          const line = edgeElements.current.get(index)
          if (!line || !start || !end) return
          line.setAttribute("x1", String(start.x))
          line.setAttribute("y1", String(start.y))
          line.setAttribute("x2", String(end.x))
          line.setAttribute("y2", String(end.y))
        })
      }
      frame = requestAnimationFrame(draw)
    }
    const resume = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (motion.matches) {
        nodeElements.current.forEach(button => { button.style.translate = "0px 0px" })
        content.edges.forEach(([a, b], index) => {
          const start = nodes.find(node => node.id === a)!
          const end = nodes.find(node => node.id === b)!
          const line = edgeElements.current.get(index)
          if (line) for (const [key, value] of Object.entries({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })) line.setAttribute(key, String(value))
        })
      } else if (visible && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() })
    const resize = new ResizeObserver(() => { scale = element.clientWidth / WIDTH })
    observer.observe(element)
    resize.observe(element)
    motion.addEventListener("change", resume)
    document.addEventListener("visibilitychange", resume)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resize.disconnect()
      motion.removeEventListener("change", resume)
      document.removeEventListener("visibilitychange", resume)
    }
  }, [nodes, content.edges])

  function focusEcosystem(group: SkillEcosystem | null) {
    setFocusGroup(group)
    setPinned(null)
    setHovered(null)
    const hub = nodes.find(node => node.id === group)
    const container = viewport.current
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    if (container && stage.current) container.scrollTo({
      left: hub ? hub.x / WIDTH * stage.current.clientWidth - container.clientWidth / 2 : 0,
      behavior,
    })
    if (hub) nodeElements.current.get(hub.id)?.scrollIntoView({ behavior, block: "nearest", inline: "center" })
  }

  return <div className="skill-graph">
    <div className="graph-topline"><p>{content.description}</p></div>
    <div className="graph-toolbar" role="group" aria-label={content.filtersLabel}>
      <button className="graph-all" aria-pressed={!focusGroup} onClick={() => focusEcosystem(null)}>{content.allLabel}</button>
      {content.groups.map(group => <button key={group.id} className={`graph-filter graph-${group.id}`} aria-pressed={focusGroup === group.id} onClick={() => focusEcosystem(group.id)}><span>{group.number}</span>{group.label}</button>)}
    </div>
    <p className="graph-instructions">{content.instructions}</p>
    <div className="graph-pan-hint"><ArrowLeftRight size={14} aria-hidden="true" />{content.panHint}</div>
    <div className="graph-viewport" ref={viewport}>
      <div className="graph-stage" ref={stage} role="group" aria-label={content.label} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); setHovered(null) } }}>
        <svg className="graph-edges" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
          {content.edges.map(([a, b], index) => {
            const start = byId.get(a)!
            const end = byId.get(b)!
            const connected = a === active || b === active
            const cross = start.group !== end.group
            const dim = active ? !connected : focusGroup && start.group !== focusGroup && end.group !== focusGroup
            return <line key={`${a}-${b}`} ref={element => { if (element) edgeElements.current.set(index, element); else edgeElements.current.delete(index) }} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={`graph-edge graph-${start.group}${cross ? " is-cross" : ""}${connected ? " is-connected" : ""}${dim ? " is-dimmed" : ""}`} />
          })}
        </svg>
        {nodes.map(node => {
          const connected = node.id === active || neighbors.has(node.id)
          const dim = active ? !connected : focusGroup && node.group !== focusGroup
          const group = content.groups.find(group => group.id === node.group)!
          return <button key={node.id} ref={element => { if (element) nodeElements.current.set(node.id, element); else nodeElements.current.delete(node.id) }}
            className={`graph-node graph-${node.group} ${node.kind ? `graph-${node.kind}` : "graph-tool"}${dim ? " is-dimmed" : ""}${node.id === active ? " is-active" : ""}${connected ? " is-connected" : ""}`}
            style={{ left: `${node.x / WIDTH * 100}%`, top: `${node.y / HEIGHT * 100}%` }}
            aria-pressed={pinned === node.id} aria-label={`${node.label} — ${group.label}`}
            onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(node.id) }} onPointerLeave={() => setHovered(null)}
            onFocus={() => setHovered(node.id)} onBlur={() => setHovered(null)}
            onClick={() => setPinned(current => current === node.id ? null : node.id)}>
            {node.icon ? <span className="graph-logo"><Image src={node.icon} alt="" width={24} height={24} /></span> : <span className="graph-hub-dot" aria-hidden="true" />}
            <span>{node.label}</span>
            {node.kind === "hub" && <span className="graph-hub-number" aria-hidden="true">{group.number}</span>}
          </button>
        })}
      </div>
    </div>
    <div className="graph-caption">
      <p aria-live="polite" aria-atomic="true">{selected ? <><strong>{selected.label}</strong><span>{content.connectionsLabel} {nodes.filter(node => neighbors.has(node.id)).map(node => node.label).join(" · ")}</span></> : content.defaultDetail}</p>
      <button onClick={() => { setPinned(null); setHovered(null); setFocusGroup(null) }} disabled={!pinned && !hovered && !focusGroup}><RotateCcw size={14} aria-hidden="true" />{content.resetLabel}</button>
    </div>
  </div>
}
