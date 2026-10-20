import Image from "next/image"
import { ArrowDownToLine, ArrowUpRight, Code2, Component, Mail } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { SkillGraph } from "./skill-graph"
import { Slogan, brandOf } from "@/components/ui/slogan"
import { LazyVideo } from "@/components/ui/lazy-video"

export function AboutSection({ content }: { content: PortfolioContent }) {
  const { profile, projects, skillGroups, home: { about: copy } } = content
  const skillCount = new Set(skillGroups.flatMap(group => group.skills)).size
  return <section className="home-section about-section" id="about" aria-labelledby="about-title">
    <div className="about-surface">
    <div className="about-board">
      <div className="about-identity">
        <span className="about-card-tab"><Component size={16} aria-hidden="true" />{copy.label}</span>
        <div className="about-portrait-frame"><Image src={copy.portrait} alt={copy.photoAlt} fill sizes="(max-width: 700px) 75vw, (max-width: 1000px) 45vw, 30vw" /></div>
        <div className="about-identity-copy">
          <span>{copy.greeting}</span>
          <p className="about-name">{profile.name.split(" ").map((name, index) => <span key={`${name}-${index}`}>{name}</span>)}</p>
          <div className="about-identity-bottom">
            <a className="about-email" href={`mailto:${profile.email}`}>{profile.email}<Mail size={15} aria-hidden="true" /></a>
            <a className="about-cv-link" href={profile.cv} target="_blank" rel="noopener noreferrer" aria-label={copy.cv}><ArrowDownToLine size={22} aria-hidden="true" /><span>{copy.cvLabel}</span></a>
          </div>
        </div>
      </div>
      <div className="about-mosaic">
        <a className="about-display-link" href="#projects"><div><h2 id="about-title">{copy.heading}</h2><Slogan slogan={brandOf(content).slogan} className="about-slogan" /></div><ArrowUpRight aria-hidden="true" /></a>
        <a className="about-feature" href={copy.feature.href} aria-label={copy.feature.link}>
          {copy.feature.video
            ? <LazyVideo className="about-feature-video" src={copy.feature.video} poster={copy.feature.image} label={copy.feature.alt} />
            : <Image src={copy.feature.image} alt={copy.feature.alt} fill sizes="(max-width: 700px) 90vw, 45vw" />}
          <ArrowUpRight className="about-tile-arrow" size={21} aria-hidden="true" />
          <span>{copy.feature.label}</span>
        </a>
        <div className="about-stat-stack">
          <a href="#projects" className="about-stat about-project-stat"><ArrowUpRight className="about-tile-arrow" size={18} aria-hidden="true" /><strong>{projects.length}</strong><span>{copy.projectsLabel}</span></a>
          <a href="#about-skills" className="about-stat about-skill-stat"><ArrowUpRight className="about-tile-arrow" size={18} aria-hidden="true" /><strong>{skillCount}</strong><span>{copy.skillsCountLabel}</span></a>
        </div>
        <a className="about-collaborate" href={copy.collaboration.href} aria-label={copy.collaboration.label}><ArrowUpRight className="about-tile-arrow" size={18} aria-hidden="true" /><Code2 size={37} strokeWidth={1.5} aria-hidden="true" /><span>{copy.collaboration.title}</span></a>
        <a className="about-sculpture" href={copy.sculpture.href} aria-label={copy.sculpture.link}><ArrowUpRight className="about-tile-arrow" size={18} aria-hidden="true" /><Image src={copy.sculpture.image} alt="" width={155} height={155} /></a>
        <a className="about-group-stat" href="#about-skills" aria-label={copy.skillsLink}><ArrowUpRight className="about-tile-arrow" size={18} aria-hidden="true" /><strong>{skillGroups.length}</strong><span>{copy.groupsLabel}</span></a>
      </div>
    </div>
    <div className="about-noteboard" id="about-story">
      <article className="about-letter" aria-labelledby="about-letter-title">
        <Image className="about-letter-paper" src={copy.notes.paper} alt="" fill sizes="(max-width: 700px) 95vw, 90vw" />
        <div className="about-letter-copy">
          <span className="about-letter-kicker">{copy.notes.label}</span>
          <h3 id="about-letter-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h3>
          <div className="about-letter-body">{profile.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="about-letter-interests"><span>{copy.interestsLabel}</span><p>{profile.interests.join(" / ")}</p></div>
        </div>
      </article>
      <ul className="about-pinned-notes">
        {copy.notes.items.map(note => <li className="about-pinned-note" key={note.text} style={{ transform: `rotate(${note.angle}deg)` }}>
          <Image src={note.image} alt="" fill sizes="(max-width: 700px) 45vw, 22vw" />
          <p>{note.text}</p>
        </li>)}
      </ul>
      <a className="about-note-contact" href={copy.notes.href}>{copy.notes.cta}<ArrowUpRight size={19} aria-hidden="true" /></a>
    </div>
    </div>
    <div id="about-skills" className="about-skills">
      <div className="skills-intro"><span className="section-kicker">{copy.skillsLabel}</span><h3>{content.skillGraph.title}</h3></div>
      <SkillGraph content={content.skillGraph} />
    </div>
  </section>
}
