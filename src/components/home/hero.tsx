"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, Check, Copy } from "lucide-react"
import { Github, Linkedin } from "@/components/icons/brand"
import { Icons8Credit } from "@/components/icons/icons8"
import { profile, projects } from "@/content"

const toolkit = [
  { name: "JavaScript", file: "javascript" },
  { name: "TypeScript", file: "typescript" },
  { name: "React", file: "react" },
  { name: "Next.js", file: "nextjs" },
  { name: "Node.js", file: "nodejs" },
  { name: "MongoDB", file: "mongodb" },
]

export function PortfolioHero() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const featuredProject = projects.find((project) => project.slug === "medark")!

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus("copied")
    } catch {
      setCopyStatus("error")
    }
  }

  return (
    <section className="portfolio-hero" id="home" aria-labelledby="hero-title">
      <div className="hero-bento">
        <div className="hero-portrait-panel">
          <span className="hero-portrait-kicker">THE HUMAN BEHIND THE CODE</span>
          <Image className="hero-portrait" src="/images/hero/victor-arsenal-macbook.png" alt="Illustrated Victor in a red Arsenal jersey, holding a MacBook, surrounded by floating three-dimensional technology logos" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 46vw, 38vw" priority />
          <div className="hero-portrait-caption">
            <span>Hey, I’m</span>
            <h2>Victor Onyemaechi<span>.</span></h2>
            <p>Developer. Creative thinker. Arsenal fan.</p>
          </div>
        </div>

        <div className="hero-intro-panel">
          <div className="hero-eyebrow"><span>FULL STACK DEVELOPER</span><span>LAGOS, NG</span></div>
          <h1 id="hero-title">Big ideas.<br />Built for <em>the web.</em></h1>
          <p>I turn a “what if” into something you can click, use, and love.</p>
          <a href="#projects" className="hero-inline-link">Explore my work <ArrowDownRight size={21} aria-hidden="true" /></a>
        </div>

        <div className="hero-code-panel" aria-label="A little about Victor in code">
          <div className="hero-code-header"><span>about-me.ts</span><span>01</span></div>
          <pre><code><span className="code-pink">const</span> victor = {"{"}{"\n"}
            {"  "}role: <span className="code-yellow">{'"full-stack developer"'}</span>,{"\n"}
            {"  "}loves: [<span className="code-yellow">{'"clean interfaces"'}</span>,{"\n"}
            {"          "}<span className="code-yellow">{'"solving real problems"'}</span>],{"\n"}
            {"  "}available: <span className="code-green">true</span>{"\n"}
            {"}"};</code></pre>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">Find me on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>

        <div className="hero-stack-panel">
          <div className="hero-card-heading"><h2>A few tools of the trade.</h2><span>MY STACK</span></div>
          <ul className="hero-toolkit" aria-label="Core technologies">
            {toolkit.map((tool) => (
              <li key={tool.file}>
                <Image src={`/icons/stack/${tool.file}.png`} alt="" width={40} height={40} />
                <span>{tool.name}</span>
              </li>
            ))}
          </ul>
          <Icons8Credit className="hero-icon-credit" />
        </div>

        <div className="hero-connect-panel">
          <div className="hero-availability"><Check size={15} aria-hidden="true" /> Open for freelance & remote work</div>
          <h2>Something in mind?<br />Let’s make it real.</h2>
          <div className="hero-connect-actions">
            <a href="#contact" className="hero-primary-link">Let’s build together <ArrowUpRight size={19} aria-hidden="true" /></a>
            <button className="hero-copy-email" type="button" onClick={copyEmail} aria-label={copyStatus === "copied" ? "Email copied" : "Copy email address"}>
              {copyStatus === "copied" ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <a className="hero-social-link" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="Victor on GitHub"><Github className="h-5 w-5" /></a>
            <a className="hero-social-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Victor on LinkedIn"><Linkedin className="h-5 w-5" /></a>
          </div>
          <p className="hero-copy-status" role="status">{copyStatus === "copied" ? "Email copied. Say hello whenever you’re ready." : copyStatus === "error" ? `Copy unavailable — ${profile.email}` : "From the first pixel to the last API."}</p>
        </div>

        <a className="hero-work-panel" href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Medark, a featured medical staffing platform">
          <div className="hero-work-heading"><span>SELECTED WORK</span><ArrowUpRight size={22} aria-hidden="true" /></div>
          <div className="hero-work-image"><Image src={featuredProject.image} alt="Medark medical staffing platform homepage" fill sizes="(max-width: 700px) 90vw, 25vw" /></div>
          <div className="hero-work-caption"><h2>Medark</h2><span>Healthcare, connected.</span></div>
        </a>
      </div>
      <div className="hero-footnote"><span>A little creativity. A lot of intention.</span><a href="#about">Get to know me <ArrowDownRight size={16} aria-hidden="true" /></a></div>
    </section>
  )
}
