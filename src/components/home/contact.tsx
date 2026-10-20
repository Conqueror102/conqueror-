import { ArrowUpRight } from "lucide-react"
import { ContactForm } from "./contact-form"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function ContactSection({ content }: { content: PortfolioContent }) {
  const { profile, home: { contact: copy } } = content
  return <section className="home-section contact-section" id="contact" aria-labelledby="contact-title">
    <div className="section-kicker">{copy.index}</div>
    <div className="contact-layout"><div className="contact-copy"><h2 className="section-title" id="contact-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2><p className="section-body">{copy.description}</p><div className="contact-address"><span>{copy.emailLabel}</span><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={21} aria-hidden="true" /></a></div><div className="contact-location"><span>{copy.locationLabel}</span><p>{profile.location.city}, {profile.location.country}</p></div><div className="contact-secondary-links"><a href={profile.links.whatsapp} target="_blank" rel="noopener noreferrer">{copy.whatsapp}<ArrowUpRight size={16} aria-hidden="true" /></a><a href={profile.cv} target="_blank" rel="noopener noreferrer">{copy.cv}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div><div className="contact-form-panel"><h3>{copy.formTitle}</h3><ContactForm copy={copy.form} /></div></div>
  </section>
}
