import { ArrowUpRight, Plus } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function FaqSection({ content }: { content: PortfolioContent }) {
  const { faqs, home: { faq: copy } } = content
  return <section className="faq-section" id="faq" aria-labelledby="faq-title"><div className="home-section faq-layout"><div><div className="section-kicker">{copy.index}</div><h2 className="section-title" id="faq-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2><a className="text-link" href="#contact">{copy.contact}<ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="faq-list">{faqs.map((faq, index) => <details name="portfolio-faq" key={faq.question}><summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><h3>{faq.question}</h3><Plus size={22} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
}
