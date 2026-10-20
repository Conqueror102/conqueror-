"use client"

import { useState, type ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

type Entry = { slug: string; category: string; card: ReactNode }
export function ProjectCollection({ entries, copy }: { entries: Entry[]; copy: PortfolioContent["home"]["projects"] }) {
  const [category, setCategory] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const categories = [...new Set(entries.map(entry => entry.category))]
  const matching = category ? entries.filter(entry => entry.category === category) : entries
  const visible = category || expanded ? matching : matching.slice(0, copy.featuredCount)
  const visibleIds = new Set(visible.map(entry => entry.slug))
  return <div className="project-collection">
    <div className="project-collection-bar"><div className="project-filters" role="group" aria-label={copy.filterLabel}><button type="button" aria-pressed={category === null} onClick={() => setCategory(null)}>{copy.allFilter}<span>{entries.length}</span></button>{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{entries.filter(entry => entry.category === item).length}</span></button>)}</div><span className="project-result-count" role="status">{String(visible.length).padStart(2,"0")} {copy.resultLabel}</span></div>
    <div className="project-gallery">{entries.map(entry => {
      const position = visible.findIndex(item => item.slug === entry.slug)
      return <div className="project-gallery-item" key={entry.slug} hidden={!visibleIds.has(entry.slug)} data-wide={position % 3 === 0}>{entry.card}</div>
    })}</div>
    {category === null && entries.length > copy.featuredCount && <button className="project-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}><span>{expanded ? copy.archiveClose : copy.archive}<small>{entries.length} {copy.allLabel}</small></span>{expanded ? <ArrowUpRight size={24} aria-hidden="true" /> : <ArrowDownRight size={24} aria-hidden="true" />}</button>}
  </div>
}
