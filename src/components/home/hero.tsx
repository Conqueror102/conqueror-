import Image from "next/image"
import { ArrowDownRight, ArrowDownToLine, ArrowUpRight, Check } from "lucide-react"
import { Icons8Credit } from "@/components/icons/icons8"
import { CopyEmail } from "@/components/ui/copy-email"
import { PortraitScene } from "./portrait-scene"
import { HeroSlideshow } from "./hero-slideshow"
import { HeroSoftSkills } from "./hero-soft-skills"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function PortfolioHero({ content }: { content: PortfolioContent }) {
  const { profile, home: { hero: copy }, projects, heroLogos, gallery } = content
  const heroPhotos = gallery.photos.filter(photo => photo.showInHero)
  const featured = projects.find(project => project.slug === copy.featuredSlug) ?? projects.find(project => project.featured)
  return (
    <section className="portfolio-hero" id="home" aria-labelledby="hero-title">
      <div className="hero-bento">
        <div className="hero-portrait-panel">
          <span className="hero-portrait-kicker">{copy.kicker}</span>
          <PortraitScene src={copy.portrait} alt={copy.portraitAlt} logos={heroLogos} />
        </div>
        <div className="hero-content-grid">
          <div className="hero-intro-panel">
            <div className="hero-eyebrow"><span>{profile.jobTitle}</span><span>{copy.location}</span></div>
            <h1 id="hero-title">{copy.headline[0]}<br />{copy.headline[1]}{" "}<em>{copy.headline[2]}</em></h1>
            <p>{copy.description}</p>
            <a href="#projects" className="hero-inline-link">{copy.workLink}<ArrowDownRight size={21} aria-hidden="true" /></a>
          </div>
          <HeroSlideshow copy={copy.slideshow} slides={heroPhotos.length ? heroPhotos : gallery.photos} gallery={{ label: gallery.viewAllLabel, href: "/gallery", total: gallery.photos.length }} />
          <div className="hero-code-panel" aria-label={copy.codeLabel}>
            <div className="hero-code-header"><span>{copy.codeFile}</span><span>01</span></div>
            <pre><code><span className="code-pink">const</span> {copy.codeVariable} = {"{"}{"\n"}
              {"  "}role: <span className="code-yellow">{JSON.stringify(profile.jobTitle.toLowerCase())}</span>,{"\n"}
              {"  "}loves: <span className="code-yellow">{JSON.stringify(copy.codeLoves[0])}</span>,{"\n"}
              {"  "}curious: <span className="code-green">true</span>,{"\n"}
              {"  "}available: <span className="code-green">{String(profile.availableForWork)}</span>{"\n"}
              {"}"};</code></pre>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">{copy.github}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="hero-social-panel">
            <div className="hero-card-heading"><h2>{copy.socials.title}</h2><span>{copy.socials.label}</span></div>
            <ul className="hero-social-icons" aria-label={copy.socials.aria}>
              {copy.socials.items.map(social => <li key={social.icon}>
                {social.href ? <a className="hero-social-icon" href={social.href} aria-label={social.label} title={social.label} target={social.href.startsWith("https://") ? "_blank" : undefined} rel={social.href.startsWith("https://") ? "noopener noreferrer" : undefined}>
                  <Image src={`/icons/socials/${social.icon}.png`} alt="" width={32} height={32} />
                </a> : <span className="hero-social-icon" role="img" aria-label={social.label} title={social.label}>
                  <Image src={`/icons/socials/${social.icon}.png`} alt="" width={32} height={32} />
                </span>}
              </li>)}
            </ul>
            <Icons8Credit className="hero-icon-credit" label={content.home.footer.credit} />
          </div>
          <a className="hero-books-panel" href={copy.bookshelf.href} aria-label={`${copy.bookshelf.title} ${copy.bookshelf.link}`}>
            <span className="hero-photo-label">{copy.bookshelf.label}<ArrowUpRight size={17} aria-hidden="true" /></span>
            <ul className="hero-book-stack" style={{ "--n": copy.bookshelf.books.length + 1 } as React.CSSProperties}>
              {copy.bookshelf.books.map((book, index) => <li key={book.title} style={{ "--i": index } as React.CSSProperties} title={`${book.title} — ${book.author}`}>
                <Image src={book.cover} alt={`${book.title} by ${book.author}`} fill sizes="80px" />
              </li>)}
              <li className="hero-book-next" style={{ "--i": copy.bookshelf.books.length } as React.CSSProperties}><span>{copy.bookshelf.readingLabel}</span><em>{copy.bookshelf.reading}</em></li>
            </ul>
            <p>{copy.bookshelf.title}</p>
          </a>
          <div className="hero-connect-panel">
            <div className="hero-availability"><Check size={15} aria-hidden="true" />{profile.availableForWork ? copy.availability : copy.unavailable}</div>
            <h2>{copy.connectTitle[0]}<br />{copy.connectTitle[1]}</h2>
            <div className="hero-connect-actions">
              <a href="#contact" className="hero-primary-link">{copy.connectLink}<ArrowUpRight size={19} aria-hidden="true" /></a>
              <CopyEmail email={profile.email} copy={copy.copy} />
              <a className="hero-copy-email hero-cv-button" href={profile.cv} target="_blank" rel="noopener noreferrer" aria-label={copy.cvLabel} title={copy.cvLabel}><ArrowDownToLine size={17} aria-hidden="true" /></a>
            </div>
            <p className="hero-copy-status">{copy.copy.idle}</p>
          </div>
          {featured && <a className="hero-work-panel" href={featured.liveUrl ?? "#projects"} target={featured.liveUrl ? "_blank" : undefined} rel={featured.liveUrl ? "noopener noreferrer" : undefined}>
            <div className="hero-work-heading"><span>{copy.selectedWork}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
            <div className="hero-work-image"><Image src={featured.image} alt={featured.title} fill sizes="(max-width: 700px) 90vw, 25vw" /></div>
            <div className="hero-work-caption"><h2>{featured.title.split(" – ")[0]}</h2><span>{featured.category}</span></div>
          </a>}
          <HeroSoftSkills copy={copy.signature} skills={copy.softSkills} />
        </div>
      </div>
      <div className="hero-under-grid">
        <div className="hero-portrait-caption">
          <span>{copy.greeting}</span>
          <h2>{profile.name}<span>.</span></h2>
          <p>{copy.personality}</p>
        </div>
        <div className="hero-footnote"><span>{copy.footnote}</span><a href="#about">{copy.aboutLink}<ArrowDownRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}
