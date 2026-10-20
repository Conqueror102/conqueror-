"use client"

import { ArrowUpRight, BookOpen, Check, GraduationCap, HeartHandshake, MessagesSquare, Puzzle, ScanSearch, ShieldCheck, Shuffle, Timer, Users, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { HomepageCopy } from "@/content/home"

const icons = { communication: MessagesSquare, teamwork: Users, problem: Puzzle, ownership: ShieldCheck, adaptability: Shuffle, learning: BookOpen, mentoring: GraduationCap, time: Timer, empathy: HeartHandshake, detail: ScanSearch }

type Copy = HomepageCopy["hero"]["signature"]
type Skill = HomepageCopy["hero"]["softSkills"][number]

/** The "That's me" card. On hover (or tap) the soft skills circle out around it; each one opens a short note. */
export function HeroSoftSkills({ copy, skills }: { copy: Copy; skills: readonly Skill[] }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Skill | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [open])

  const Icon = selected ? icons[selected.icon as keyof typeof icons] : null
  return (
    <div ref={root} className="hero-signature-panel" data-open={open} role="group" aria-label={copy.skillsLabel}
      onPointerEnter={event => { if (event.pointerType !== "touch") setOpen(true) }}
      onPointerLeave={event => { if (event.pointerType !== "touch") setOpen(false) }}
      onClick={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
      <div className="hero-signature-top"><span>{copy.label}</span><a href="#about" aria-label={copy.link} onClick={event => event.stopPropagation()}><ArrowUpRight size={22} aria-hidden="true" /></a></div>
      <h2>{copy.name}</h2>
      <p>{copy.note}</p>
      <span className="hero-fan-hint" aria-hidden="true">{copy.skillsHint}</span>
      <ul className="hero-skill-ring">
        {skills.map((skill, index) => {
          const SkillIcon = icons[skill.icon as keyof typeof icons]
          return <li key={skill.id} style={{ "--i": index, "--n": skills.length, "--delay": `${index * 35}ms` } as React.CSSProperties}>
            <button type="button" aria-label={skill.title} aria-describedby={`hero-skill-tip-${skill.id}`} tabIndex={open ? 0 : -1}
              onClick={event => { event.stopPropagation(); setSelected(skill); dialog.current?.showModal() }}>
              <SkillIcon size={20} strokeWidth={1.7} aria-hidden="true" />
            </button>
            <span className="hero-skill-tip" id={`hero-skill-tip-${skill.id}`} role="tooltip"><strong>{skill.title}</strong>{skill.summary}<em>{copy.skillsTipCta}</em></span>
          </li>
        })}
      </ul>
      <dialog ref={dialog} className="hero-skill-dialog" aria-labelledby="hero-skill-title" onClose={() => setSelected(null)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        {selected && Icon && <div className="hero-skill-card">
          <button type="button" className="hero-lightbox-close" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
          <span className="hero-skill-icon"><Icon size={30} strokeWidth={1.6} aria-hidden="true" /></span>
          <p className="hero-skill-kicker">{copy.skillsLabel}</p>
          <h3 id="hero-skill-title">{selected.title}</h3>
          <p className="hero-skill-summary">{selected.summary}</p>
          <p className="hero-skill-kicker">{copy.inPractice}</p>
          <ul>{selected.points.map(point => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}</ul>
          <nav>{skills.map(skill => <button type="button" key={skill.id} aria-pressed={skill.id === selected.id} onClick={() => setSelected(skill)}>{skill.title}</button>)}</nav>
        </div>}
      </dialog>
    </div>
  )
}
