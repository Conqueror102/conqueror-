import Image from "next/image"

/**
 * Renders an Icons8 icon. `icon` is "style/name", e.g. "color/typescript".
 * The free Icons8 plan requires a visible "Icons by Icons8" link on the site (see Icons8Credit).
 */
export function Icons8({ icon, alt, size = 24, className }: { icon: string; alt: string; size?: number; className?: string }) {
  const [style, name] = icon.split("/")
  // Request 2x the display size so icons stay sharp on high-density screens.
  const src = `https://img.icons8.com/${style}/${size * 2}/${name}.png`
  return <Image src={src} alt={alt} width={size} height={size} className={className} unoptimized />
}

export function Icons8Credit({ className, label = "Icons by Icons8" }: { className?: string; label?: string }) {
  return (
    <a href="https://icons8.com" target="_blank" rel="noopener" className={className}>
      {label}
    </a>
  )
}
