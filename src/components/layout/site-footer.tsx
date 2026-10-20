import Image from "next/image"
import { ArrowUpRight, ArrowUp, MousePointer2, MoveUpRight } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { FooterCanvas } from "./footer-canvas"
import { FooterLogoPile } from "./footer-logo-pile"
import { FooterBackPage } from "./footer-back-page"
import { Slogan, brandOf } from "@/components/ui/slogan"
import { profile as defaultProfile } from "@/content/profile"

export function SiteFooter({ content }: { content: PortfolioContent }) {
  const { profile, home: { footer: copy, header } } = content
  const brand = brandOf(content)
  return <footer className="site-footer" id="footer" aria-labelledby="footer-title">
    <FooterCanvas visitor={copy.visitor}>
      <header className="footer-workspace-bar"><a href="#home" className="footer-signature" aria-label={header.homeLabel}>{header.wordmark}<span>{header.signature}</span></a><span>{copy.workspace}</span><a href="#home" className="footer-back">{copy.top}<ArrowUp size={15} aria-hidden="true" /></a></header>
      <FooterBackPage content={content} />
      <div className="footer-playground">
        <nav className="footer-toolrail" aria-label={copy.navigationLabel}>{copy.navigation.map((item,index) => <a href={item.href} key={item.href}><span>{String(index+1).padStart(2,"0")}</span>{item.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</nav>
        <div className="footer-photo footer-photo-main"><Image src={copy.photos[0].src} alt={copy.photos[0].alt} fill sizes="(max-width: 700px) 120px, 190px" style={{objectPosition:copy.photos[0].position}} /><span>{copy.photos[0].caption}</span></div>
        <div className="footer-invitation"><p>{copy.invitation}</p><h2 id="footer-title" className="footer-brand">{brand.name}<Slogan slogan={brand.slogan} className="footer-slogan" /></h2><p className="footer-pitch">{copy.title[0]} <span>{copy.title[1]}</span></p><p className="footer-description">{copy.description}</p><a className="footer-conversation" href={copy.href}>{copy.cta}<MoveUpRight size={22} aria-hidden="true" /></a></div>
        <div className="footer-channels">{copy.channels.map((channel,index) => <a className={`footer-channel footer-channel-${index} footer-channel-${channel.tone}`} key={channel.icon} href={channel.href} target="_blank" rel="noopener noreferrer"><MousePointer2 className="footer-channel-cursor" size={28} fill="currentColor" aria-hidden="true" /><span className="footer-channel-label"><Image src={`/icons/socials/${channel.icon}.png`} alt="" width={20} height={20} />{channel.label}<ArrowUpRight size={16} aria-hidden="true" /></span><small>{channel.note}</small></a>)}</div>
        <div className="footer-moments"><p>{copy.photoLabel}</p>{copy.photos.slice(1).map(photo => <figure key={photo.src}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 110px, 125px" style={{objectPosition:photo.position}} /></div><figcaption>{photo.caption}</figcaption></figure>)}</div>
        <div className="footer-wave" aria-hidden="true"><Image src={copy.wave} alt="" fill sizes="(max-width: 700px) 100px, 145px" /></div>
        <a href="#home" className="footer-sticker" aria-label={header.homeLabel}><Image src={profile.stickerLogo ?? defaultProfile.stickerLogo} alt="" fill sizes="(max-width: 700px) 100px, 150px" /></a>
        <div className="footer-email"><span>{copy.message}</span><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </div>
      <FooterLogoPile copy={content.footerPile} />
      <div className="footer-colophon"><span>© {new Date().getFullYear()} {brand.name}. {copy.copyright}</span><Slogan slogan={brand.slogan} className="footer-colophon-slogan" /><a href="/vscode">{copy.developer}</a><a href="https://icons8.com" target="_blank" rel="noopener noreferrer">{copy.credit}</a></div>
    </FooterCanvas>
  </footer>
}
