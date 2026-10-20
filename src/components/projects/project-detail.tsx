import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Database, Gauge, Info, MoveUpRight, ShieldCheck, Workflow } from "lucide-react"
import type { Project } from "@/content/projects"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { ProjectGallery } from "./project-gallery"
import { ProjectEngineeringSections } from "./project-engineering"

const pillarIcons = { database:Database, performance:Gauge, security:ShieldCheck, testing:Workflow }

export function ProjectDetail({ project, next, index, content }: { project:Project; next:Project; index:number; content:PortfolioContent }) {
  const copy = content.projectDetailCopy
  const study = project.caseStudy
  const engineering = project.engineering
  const engineeringSections = engineering && <ProjectEngineeringSections engineering={engineering} copy={copy} />
  const [name,...subtitle] = project.title.split(" – ")
  const images = project.gallery?.length ? project.gallery : [{src:project.image,alt:`${project.title} — ${content.home.projects.imageAltSuffix}`,caption:copy.defaultGalleryCaption}]
  return <>
    <main className={`project-detail pd-case-study pd-tone-${index % 4} ${project.referenceDemo ? "pd-reference-demo" : ""}`}>
      <article data-nosnippet={study?.demo ? "" : undefined}>
        <header className="pd-hero pd-width">
          <Link href="/#projects" className="pd-back"><ArrowLeft size={16} aria-hidden="true" />{copy.back}</Link>
          {study?.demo && <aside className="pd-demo"><Info size={17} aria-hidden="true" /><div><strong>{copy.demoLabel}</strong><p>{project.referenceDemo ? copy.referenceNotice : copy.demoNotice}</p></div></aside>}
          <div className="pd-hero-meta"><span>{copy.eyebrow} / {String(index+1).padStart(2,"0")}</span><span>{project.category}</span></div>
          <div className="pd-case-intro"><div><h1>{name}{" "}{subtitle.length > 0 && <span>{subtitle.join(" – ")}</span>}</h1><p className="pd-executive">{study?.summary ?? project.description}</p></div>
            {study && <aside className="pd-project-brief"><dl><div><dt>{copy.client}</dt><dd>{study.client}</dd></div><div><dt>{copy.role}</dt><dd>{study.role}</dd></div><div><dt>{copy.services}</dt><dd><ul>{study.services.map(service=><li key={service}>{service}</li>)}</ul></dd></div>{project.liveUrl && <div><dt>{copy.product}</dt><dd><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{copy.live}<ArrowUpRight size={16} aria-hidden="true" /></a></dd></div>}</dl></aside>}
          </div>
        </header>
        {study && <section className="pd-metrics" aria-label={copy.metricLabel}><div className="pd-width"><p>{study.demo ? copy.metricLabel : copy.outcomesTitle}</p><dl>{study.metrics.map(metric=><div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></div></section>}
        <figure className="pd-cover pd-width"><div className="pd-cover-image"><Image src={project.image} alt={`${project.title} — ${content.home.projects.imageAltSuffix}`} fill sizes="(max-width:700px) 90vw, 85vw" preload /></div><figcaption><span>01 / {copy.coverCaption}</span><a href="#challenge">{copy.explore}<ArrowDown size={15} aria-hidden="true" /></a></figcaption></figure>
        <nav className="pd-section-nav" aria-label={copy.navLabel}><div className="pd-width">{copy.navigation.filter(item => (["#hard-parts","#decisions","#tradeoffs"].includes(item.href) ? Boolean(engineering) : study || item.href === "#gallery" || item.href === "#stack")).map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</div></nav>
        {study && <>
          <section className="pd-case-section pd-width pd-section" id="challenge" aria-labelledby="pd-challenge-title"><div><p className="pd-kicker">{copy.challengeLabel}</p><h2 id="pd-challenge-title">{copy.challengeTitle}</h2></div><div className="pd-narrative">{study.challenge.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></section>
          <section className="pd-solution" id="solution" aria-labelledby="pd-solution-title"><div className="pd-case-section pd-width pd-section"><div><p className="pd-kicker">{copy.solutionLabel}</p><h2 id="pd-solution-title">{copy.solutionTitle}</h2></div><div className="pd-narrative">{study.solution.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></div></section>
          {engineeringSections}
          <section className="pd-outcomes pd-width pd-section" id="outcomes" aria-labelledby="pd-outcomes-title"><p className="pd-kicker">{copy.outcomesLabel}</p><h2 id="pd-outcomes-title">{copy.outcomesTitle}</h2><ol>{study.outcomes.map((outcome,i)=><li key={outcome}><span>{String(i+1).padStart(2,"0")}</span><p>{outcome}</p><Check size={25} aria-hidden="true" /></li>)}</ol></section>
          <section className="pd-architecture pd-section" id="architecture" aria-labelledby="pd-architecture-title"><div className="pd-width"><p className="pd-kicker">{copy.architectureLabel}</p><h2 id="pd-architecture-title">{copy.architectureTitle}</h2><p className="pd-architecture-lead">{study.architecture.introduction}</p><h3 className="pd-pipeline-title">{copy.pipelineLabel}</h3><ol className="pd-pipeline">{study.architecture.pipeline.map((node,i)=><li key={node.label}><span>{String(i+1).padStart(2,"0")}</span><h4>{node.label}</h4><p>{node.detail}</p>{i < study.architecture.pipeline.length-1 && <ArrowRight className="pd-pipeline-arrow" size={19} aria-hidden="true" />}</li>)}</ol><div className="pd-engineering">{study.architecture.pillars.map(pillar=>{const Icon=pillarIcons[pillar.icon];return <section key={pillar.title}><Icon size={25} aria-hidden="true"/><h3>{pillar.title}</h3><p>{pillar.body}</p></section>})}</div><aside className="pd-technical-note"><div><h3>{study.architecture.access.title}</h3><p>{study.architecture.access.body}</p></div><div className="pd-technical-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{study.architecture.access.actionLabel ?? copy.production}<ArrowUpRight size={17} aria-hidden="true" /></a>}{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">{copy.source}<ArrowUpRight size={17} aria-hidden="true" /></a>}</div></aside></div></section>
        </>}
        {!study && engineeringSections}
        <section className="pd-width pd-section" id="gallery" aria-labelledby="pd-gallery-title"><div className="pd-section-heading"><div><p className="pd-kicker">{copy.galleryLabel}</p><h2 id="pd-gallery-title">{copy.gallery}</h2></div><span>{String(images.length).padStart(2,"0")}</span></div><ProjectGallery images={images} copy={copy} /></section>
        <section className="pd-stack pd-width pd-section" id="stack" aria-labelledby="pd-stack-title"><div><p className="pd-kicker">{copy.stackLabel}</p><h2 id="pd-stack-title">{copy.stack}</h2></div><ul>{project.technologies.map((technology,i) => {const logo=content.footerPile.logos.find(mark=>mark.name===technology);return <li key={technology}>{logo ? <Image src={logo.icon} alt="" width={30} height={30} /> : <span>{String(i+1).padStart(2,"0")}</span>}<span>{technology}</span></li>})}</ul></section>
      </article>
      {next.slug !== project.slug && <section className="pd-next"><Link href={`/projects/${next.slug}`} className="pd-width"><div><span>{copy.next}</span><h2>{next.title.split(" – ")[0]}</h2><p>{next.category}</p></div><div className="pd-next-image"><Image src={next.image} alt={next.title} fill sizes="(max-width:700px) 35vw, 25vw" /></div><MoveUpRight size={56} aria-hidden="true" /></Link></section>}
    </main>
    <footer className="pd-end pd-width"><Link href="/#projects"><ArrowLeft size={15} aria-hidden="true" />{copy.all}</Link><Link href="/#contact">{copy.contact}<ArrowUpRight size={17} aria-hidden="true" /></Link></footer>
  </>
}
