import Image from "next/image"
import { ArrowUpRight, Braces, Database, Network, Check } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

const icons = { frontend: Braces, backend: Database, ai: Network }

export function ServicesSection({ content }: { content: PortfolioContent }) {
  const { services, capabilities } = content
  return <section className="home-section services-section" id="services" aria-labelledby="services-title">
    <div className="section-kicker">{capabilities.kicker}</div>
    <div className="section-heading-row"><h2 className="section-title" id="services-title">{capabilities.title[0]}<br /><span>{capabilities.title[1]}</span></h2><p className="section-body">{capabilities.description}</p></div>
    <div className="capabilities-list">{capabilities.items.map(item => {
      const Icon = icons[item.icon as keyof typeof icons]
      return <article className={`capability capability-${item.tone}`} key={item.id}>
        <div className="capability-marker"><span>{item.number}</span><Icon size={32} strokeWidth={1.3} aria-hidden="true" /></div>
        <div className="capability-copy"><span className="outside-category">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.details.map(detail => <li key={detail}><Check size={15} aria-hidden="true" />{detail}</li>)}</ul><a className="text-link" href="#contact">{capabilities.linkLabel}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <div className="capability-tools"><p>{item.note}</p><ul>{item.tools.map(tool => <li key={tool.name}><Image src={`/icons/brands/${tool.icon}.svg`} width={30} height={30} alt="" /><span>{tool.name}</span></li>)}</ul></div>
      </article>
    })}</div>
    <div className="supporting-services"><span className="section-kicker">{capabilities.supportingLabel}</span><div>{services.map(service => <a key={service.title} href="#contact">{service.title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div></div>
  </section>
}
