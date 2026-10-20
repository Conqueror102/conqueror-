import { ChevronDown } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { FooterQuotes, LagosClock } from "./footer-back-page-client"

/** The reading layer, collapsed by default (native <details>, no JS needed) of the footer: quotes, a short letter, a quick profile and what Victor is up to now. */
export function FooterBackPage({ content }: { content: PortfolioContent }) {
  const notes = content.footerNotes
  return <details className="footer-back-page">
    <summary className="footer-notes-heading">
      <p>{notes.kicker}</p>
      <h2>{notes.title[0]} <span>{notes.title[1]}</span></h2>
      <div className="footer-notes-side">
        <p className="footer-notes-intro">{notes.intro}</p>
        <span className="footer-notes-toggle"><span className="footer-notes-open">{notes.open}</span><span className="footer-notes-close">{notes.close}</span><ChevronDown size={16} aria-hidden="true" /></span>
      </div>
    </summary>
    <div className="footer-notes-grid">
      <FooterQuotes copy={notes.quotes} />
      <article className="footer-letter">
        <span className="footer-note-label">{notes.letter.label}</span>
        <h3>{notes.letter.greeting}</h3>
        {notes.letter.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <p className="footer-letter-signoff">{notes.letter.signoff}<strong>{notes.letter.name}</strong></p>
      </article>
      <aside className="footer-profile-card" aria-label={notes.card.label}>
        <div className="footer-profile-head"><span className="footer-note-label">{notes.card.label}</span><span>{notes.card.serial}</span></div>
        <dl>{notes.card.rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
        <span className={`footer-profile-stamp${content.profile.availableForWork ? "" : " is-busy"}`}>{content.profile.availableForWork ? notes.card.stamp : notes.card.stampBusy}</span>
        <LagosClock copy={notes.clock} />
      </aside>
    </div>
    <div className="footer-now">
      <span className="footer-note-label">{notes.now.label}</span>
      <ul>{notes.now.items.map(item => <li className={`footer-now-note footer-now-${item.tone}`} key={item.label}><strong>{item.label}</strong><p>{item.text}</p></li>)}</ul>
    </div>
  </details>
}
