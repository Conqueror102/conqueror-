import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PortfolioHeader } from "@/components/layout/site-header"
import { GalleryGrid } from "@/components/home/gallery-grid"
import { getPortfolioContent } from "@/lib/portfolio-content"
import "../gallery.css"

export async function generateMetadata(): Promise<Metadata> {
  const { gallery, profile } = await getPortfolioContent()
  return {
    title: "Photo gallery",
    description: `${gallery.title} ${gallery.description}`,
    alternates: { canonical: "/gallery" },
    openGraph: { type: "website", url: "/gallery", title: `Photo gallery | ${profile.name}`, description: gallery.description, images: gallery.photos[0] ? [gallery.photos[0].src] : undefined },
  }
}

export default async function GalleryPage() {
  const content = await getPortfolioContent()
  const { gallery, home: { hero: { slideshow } } } = content
  return (
    <div className="gallery-page">
      <PortfolioHeader content={content} homePath="/" />
      <main className="gallery-width">
        <header className="gallery-hero">
          <Link href="/" className="gallery-back"><ArrowLeft size={15} aria-hidden="true" />{gallery.backLabel}</Link>
          <p className="gallery-kicker">{gallery.kicker} <span>{String(gallery.photos.length).padStart(2, "0")}</span></p>
          <h1>{gallery.title}</h1>
          <p>{gallery.description}</p>
        </header>
        {gallery.photos.length
          ? <GalleryGrid photos={gallery.photos} openLabel={slideshow.openLabel} labels={{ label: gallery.title, close: slideshow.close, previous: slideshow.previous, next: slideshow.next }} />
          : <p className="gallery-empty">{gallery.emptyLabel}</p>}
      </main>
    </div>
  )
}
