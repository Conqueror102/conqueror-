"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, X, Maximize2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  title?: string
  images: {
    src: string
    alt: string
    caption?: string
  }[]
}




export function ImageGallery({ title = "Project Gallery", images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowLeft") {
          goToPrevious()
        } else if (e.key === "ArrowRight") {
          goToNext()
        } else if (e.key === "Escape") {
          toggleFullscreen()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, goToPrevious, goToNext, toggleFullscreen, isMounted])

  // Server-side rendering fallback
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="text-[#6A9955] text-xl mb-2">// Gallery</div>
          <div className="text-[#569CD6] text-3xl font-bold mb-4">{title}</div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md overflow-hidden">
          <div className="bg-[#252526] px-4 py-2 border-b border-[#3C3C3C] text-[#D4D4D4] font-semibold">
            <span>Image Gallery</span>
          </div>

          <div className="p-4">
            <div className="w-full h-[500px] bg-[#252526] rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Gallery</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">{title}</div>
      </div>

      <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3C3C3C] text-[#D4D4D4] font-semibold flex items-center justify-between">
          <span>{images[currentIndex]?.alt || `Image ${currentIndex + 1} of ${images.length}`}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded-sm hover:bg-[#3C3C3C] text-[#D4D4D4]"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <a
              href={images[currentIndex]?.src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-sm hover:bg-[#3C3C3C] text-[#D4D4D4]"
              title="Open Original"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          className={cn(
            "relative",
            isFullscreen ? "fixed inset-0 z-50 bg-black flex items-center justify-center" : "p-4",
          )}
        >
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="relative w-full">
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt || "Gallery image"}
              className={cn(
                "mx-auto rounded-md",
                isFullscreen ? "max-h-screen max-w-full object-contain" : "max-h-[500px] w-full object-contain",
              )}
            />

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {images[currentIndex]?.caption && (
          <div className="px-4 py-3 border-t border-[#3C3C3C] bg-[#252526] text-[#D4D4D4]">
            {images[currentIndex].caption}
          </div>
        )}

        <div className="p-4 border-t border-[#3C3C3C] bg-[#252526]">
          <div className="flex justify-center space-x-2 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-16 h-16 rounded-md overflow-hidden border-2",
                  currentIndex === index ? "border-[#569CD6]" : "border-transparent",
                )}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
