import Image from "next/image"
import { ArrowUpRight, Quote, UserRound } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function TestimonialsSection({ content }: { content: PortfolioContent }) {
  const copy = content.testimonials
  return <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-title" style={{ backgroundImage: `url(${copy.background})` }}>
    <div className="home-section testimonials-inner">
      <header className="testimonials-heading">
        <p className="section-kicker">{copy.kicker}</p>
        <h2 className="section-title" id="testimonials-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2>
        <p>{copy.description}</p>
        <a className="testimonial-contact" href={copy.contact.href}>{copy.contact.label}<ArrowUpRight size={15} aria-hidden="true" /></a>
        {copy.items.some(item => !item.quote) && <p className="testimonial-preview-note">{copy.previewNote}</p>}
      </header>
      <div className="testimonial-wall">{copy.items.map(item => <figure className={`testimonial-note testimonial-${item.tone}`} key={item.id}>
        <Image className="testimonial-paper" src={item.paper} alt="" fill sizes="(max-width: 850px) 85vw, 25vw" />
        <div className="testimonial-note-content">
        <div className="testimonial-note-top"><span className="testimonial-company">{item.companyLogo && <Image src={item.companyLogo} alt={item.company} width={64} height={22} />}<span>{item.perspective}</span></span><Quote size={29} strokeWidth={1.4} aria-hidden="true" /></div>
        {item.quote ? <blockquote><p>{item.quote}</p></blockquote> : <div className="testimonial-empty"><span className="journey-preview">{copy.previewLabel}</span><p>{copy.quotePlaceholder}</p></div>}
        <figcaption>
          {item.image ? <Image src={item.image} alt="" width={42} height={42} /> : <span className="testimonial-avatar"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>}
          <span><strong>{item.name || copy.namePlaceholder}</strong><small>{item.role || copy.rolePlaceholder} · {item.company}</small></span>
        </figcaption>
        </div>
      </figure>)}</div>
      <footer className="testimonial-values"><p>{copy.valuesLabel}</p><ul>{copy.values.map(value => <li key={value}>{value}</li>)}</ul></footer>
    </div>
  </section>
}
