"use client"

import Image from "next/image"
import { useState } from "react"
import { PhotoLightbox, type LightboxLabels } from "@/components/ui/photo-lightbox"
import type { GalleryPhoto } from "@/content/gallery"

/** Every gallery photo in a masonry grid; clicking one opens it full size. */
export function GalleryGrid({ photos, labels, openLabel }: { photos: readonly GalleryPhoto[]; labels: LightboxLabels; openLabel: string }) {
  const [preview, setPreview] = useState<number | null>(null)
  return <>
    <ul className="gallery-grid">
      {photos.map((photo, index) => (
        <li key={`${photo.src}-${index}`}>
          <button type="button" aria-label={`${openLabel}: ${photo.caption || photo.alt}`} onClick={() => setPreview(index)}>
            <Image src={photo.src} alt={photo.alt} width={640} height={800} sizes="(max-width: 560px) 46vw, (max-width: 1000px) 31vw, 300px" style={{ objectPosition: photo.position }} />
            {photo.caption && <span>{photo.caption}</span>}
          </button>
        </li>
      ))}
    </ul>
    <PhotoLightbox photos={photos} index={preview} onChange={setPreview} labels={labels} />
  </>
}
