"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react"
import { useRef, useState } from "react"
import type { ProjectVisual } from "@/content/projects"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function ProjectGallery({ images, copy }: { images: ProjectVisual[]; copy: PortfolioContent["projectDetailCopy"] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const selected = images[active ?? 0]
  function move(direction: number) { setActive(index => ((index ?? 0) + direction + images.length) % images.length) }
  return <>
    <div className="pd-gallery-grid">{images.map((image,index) => <figure key={`${image.src}-${index}`} data-detail={image.detail}>
      <button className="pd-gallery-image" type="button" aria-label={`${copy.enlarge}: ${image.caption}`} onClick={() => { setActive(index); dialog.current?.showModal() }}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 90vw, 65vw" style={{objectFit:image.detail ? "cover" : "contain",objectPosition:image.position ?? "center"}} /><span><Expand size={19} aria-hidden="true" /></span></button>
      <figcaption><span>{String(index+1).padStart(2,"0")}</span>{image.caption}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} className="project-lightbox" aria-labelledby="project-image-caption" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => { if (event.key === "ArrowRight") {event.preventDefault();move(1)} else if (event.key === "ArrowLeft") {event.preventDefault();move(-1)} }}>
      {selected && <div className="pd-lightbox-content"><header><p id="project-image-caption">{selected.caption}</p><button type="button" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={23} aria-hidden="true" /></button></header><div className="pd-lightbox-image"><Image src={selected.src} alt={selected.alt} fill sizes="95vw" style={{objectFit:"contain"}} /></div>{images.length > 1 && <nav><button type="button" aria-label={copy.previousImage} onClick={() => move(-1)}><ArrowLeft size={20} aria-hidden="true" /></button><span>{String((active ?? 0)+1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span><button type="button" aria-label={copy.nextImage} onClick={() => move(1)}><ArrowRight size={20} aria-hidden="true" /></button></nav>}</div>}
    </dialog>
  </>
}
