"use client"

import { X } from "lucide-react"
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react"

type ModalProps = {
  open: boolean
  onClose: () => void
  label: string
  closeLabel: string
  className?: string
  onPrevious?: () => void
  onNext?: () => void
  children: ReactNode
}

/** Native dialog: focus trapping, Escape and the top layer come from the browser. Arrow keys step through a set. */
export function Modal({ open, onClose, label, closeLabel, className, onPrevious, onNext, children }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) element.showModal()
    if (!open && element.open) element.close()
  }, [open])

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft" && onPrevious) { event.preventDefault(); onPrevious() }
    if (event.key === "ArrowRight" && onNext) { event.preventDefault(); onNext() }
  }

  return (
    <dialog ref={dialog} className={`hero-modal ${className ?? ""}`} aria-label={label} onClose={onClose} onKeyDown={onKeyDown}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      {open && <div className="hero-modal-body">
        <button type="button" className="hero-modal-close" aria-label={closeLabel} onClick={onClose} autoFocus><X size={18} aria-hidden="true" /></button>
        {children}
      </div>}
    </dialog>
  )
}
