import { ogAlt, ogSize, renderOgImage } from "@/lib/og-image"

export const alt = ogAlt
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOgImage()
}
