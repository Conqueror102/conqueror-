"use client"

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react"

/** Shared open state for the hero fan cards: hover on pointer devices, focus for keyboards, tap on touch screens. */
export function useFan<T extends HTMLElement>() {
  const root = useRef<T>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tapped, setTapped] = useState(false)

  useEffect(() => {
    if (!tapped) return
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setTapped(false)
    }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [tapped])

  return {
    root,
    fanned: hovered || focused || tapped,
    tapped,
    setTapped,
    handlers: {
      onPointerEnter: (event: PointerEvent) => { if (event.pointerType !== "touch") setHovered(true) },
      onPointerLeave: (event: PointerEvent) => { if (event.pointerType !== "touch") setHovered(false) },
      // Only keyboard focus should fan the card; a mouse click also focuses the button it lands on.
      onFocus: (event: FocusEvent) => { if ((event.target as HTMLElement).matches(":focus-visible")) setFocused(true) },
      onBlur: (event: FocusEvent) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) },
    },
  }
}
