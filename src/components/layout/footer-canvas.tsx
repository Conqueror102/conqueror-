"use client"

import { useRef, type ReactNode } from "react"
import { MousePointer2 } from "lucide-react"

/** Only the visitor cursor needs hydration; footer content is passed from the server. */
export function FooterCanvas({ children, visitor }: { children: ReactNode; visitor: string }) {
  const cursor = useRef<HTMLDivElement>(null)
  return <div className="footer-canvas" onPointerMove={event => {
    if ((event.target as Element).closest(".footer-pile-section")) { if (cursor.current) cursor.current.dataset.active = "false"; return }
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const element = cursor.current
    if (!element) return
    element.style.transform = `translate3d(${Math.min(event.clientX - bounds.left + 16, bounds.width - 175)}px, ${event.clientY - bounds.top + 18}px, 0)`
    element.dataset.active = "true"
  }} onPointerLeave={() => { if (cursor.current) cursor.current.dataset.active = "false" }}>
    {children}
    <div ref={cursor} className="footer-visitor" aria-hidden="true"><MousePointer2 size={23} fill="currentColor" /><span>{visitor}</span></div>
  </div>
}
