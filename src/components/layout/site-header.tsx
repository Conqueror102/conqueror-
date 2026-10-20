import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { MobileNavigation } from "./mobile-navigation"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function PortfolioHeader({ content, homePath = "" }: { content: PortfolioContent; homePath?: string }) {
  const { home: { header: copy, navigation } } = content
  const links = navigation.map(item => ({ ...item, href: item.href.startsWith("#") ? `${homePath}${item.href}` : item.href }))
  return <header className="portfolio-header">
    <a className="portfolio-wordmark" href={`${homePath}#home`} aria-label={copy.homeLabel}><Image className="portfolio-logo" src={content.profile.logo} alt="" width={40} height={40} priority />{copy.wordmark}<span>.</span></a>
    <nav className="portfolio-desktop-nav" aria-label={copy.mainNav}>{links.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <div className="portfolio-header-actions">
      <Link className="portfolio-dev-link" href="/vscode">{copy.developer}<ArrowUpRight size={15} aria-hidden="true" /></Link>
      <a className="portfolio-contact-link" href={`${homePath}#contact`}>{copy.contact}<ArrowUpRight size={17} aria-hidden="true" /></a>
      <MobileNavigation navigation={links} copy={copy} />
    </div>
  </header>
}
