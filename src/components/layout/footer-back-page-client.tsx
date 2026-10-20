"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

type Notes = PortfolioContent["footerNotes"]

export function FooterQuotes({ copy }: { copy: Notes["quotes"] }) {
  const [index, setIndex] = useState(0)
  const count = copy.items.length
  // Start on a random quote after hydration, so every visit opens on something new.
  useEffect(() => { setIndex(Math.floor(Math.random() * count)) }, [count])
  const quote = copy.items[index]
  if (!quote) return null
  return <figure className="footer-quote-card">
    <span className="footer-note-label">{copy.label}</span>
    <Quote className="footer-quote-mark" size={44} aria-hidden="true" />
    <blockquote key={index} aria-live="polite"><p>{quote.text}</p></blockquote>
    <figcaption><strong>{quote.author}</strong>{quote.source && <span>{quote.source}</span>}</figcaption>
    {copy.items.length > 1 && <div className="footer-quote-controls">
      <span>{String(index + 1).padStart(2, "0")} {copy.counter} {String(copy.items.length).padStart(2, "0")}</span>
      <div>
        <button type="button" className="footer-quote-prev" aria-label={copy.previous} onClick={() => setIndex((index - 1 + count) % count)}><ArrowLeft size={14} aria-hidden="true" /></button>
        <button type="button" onClick={() => setIndex((index + 1) % count)}>{copy.next}<ArrowRight size={14} aria-hidden="true" /></button>
      </div>
    </div>}
  </figure>
}

/** Victor's local time, filled in after hydration so server and client markup match. */
export function LagosClock({ copy }: { copy: Notes["clock"] }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])
  const time = now ? new Intl.DateTimeFormat("en-GB", { timeZone: copy.timeZone, hour: "2-digit", minute: "2-digit" }).format(now) : "--:--"
  const hour = now ? Number(new Intl.DateTimeFormat("en-GB", { timeZone: copy.timeZone, hour: "2-digit", hourCycle: "h23" }).format(now)) : -1
  const mood = copy.moods.find(item => hour >= item.from && hour < item.to)
  return <div className="footer-clock">
    <span className="footer-note-label">{copy.label}</span>
    <time suppressHydrationWarning>{time}</time>
    <p>{mood?.text ?? " "}</p>
  </div>
}
