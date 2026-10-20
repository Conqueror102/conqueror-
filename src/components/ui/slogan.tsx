import { homeContent } from "@/content"
import type { PortfolioContent } from "@/lib/portfolio-content"

/** The brand line "Born to ~~live~~ create." Falls back to the file copy if an older admin copy has no brand yet. */
export function brandOf(content: PortfolioContent) {
  return ("brand" in content.home && content.home.brand) || homeContent.brand
}

export function Slogan({ slogan, className = "" }: { slogan: readonly string[]; className?: string }) {
  const [lead, struck, word] = slogan
  return <span className={`brand-slogan ${className}`}>
    {lead} <s>{struck}</s><span className="sr-only">,</span> <em>{word}</em>
  </span>
}
