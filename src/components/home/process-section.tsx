import { ArrowUpRight } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { ProcessExplorer } from "./process-explorer"

export function ProcessSection({ content }: { content: PortfolioContent }) {
  const copy = content.processPresentation
  return <section className="process-section" id="process" aria-labelledby="process-title">
    <div className="home-section process-inner">
      <header className="process-heading">
        <div><p className="section-kicker">{copy.kicker}</p><h2 id="process-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2></div>
        <p>{copy.description}</p>
      </header>
      <ProcessExplorer steps={content.process} copy={copy} />
      <footer className="process-footer"><p>{copy.note}</p><a className="text-link" href={copy.contact.href}>{copy.contact.label}<ArrowUpRight size={18} aria-hidden="true" /></a></footer>
    </div>
  </section>
}
