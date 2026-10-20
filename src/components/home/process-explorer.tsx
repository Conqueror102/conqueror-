"use client"

import Image from "next/image"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import { useRef, useState, type KeyboardEvent } from "react"
import type { PortfolioContent } from "@/lib/portfolio-content"

type Props = { steps: PortfolioContent["process"]; copy: PortfolioContent["processPresentation"] }

export function ProcessExplorer({ steps, copy }: Props) {
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + steps.length) % steps.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = steps.length - 1
    else return
    event.preventDefault()
    setActive(next)
    buttons.current[next]?.focus()
  }

  return <div className="process-explorer">
    <div className="process-stage-label"><span>{copy.exploreLabel}</span><span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span></div>
    <div className="process-tabs" role="tablist" aria-label={copy.tabsLabel}>
      {steps.map((step, index) => <button key={step.title} ref={element => { buttons.current[index] = element }} role="tab" id={`process-tab-${index}`} aria-controls={`process-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
        <span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><ArrowDownRight size={20} aria-hidden="true" />
      </button>)}
    </div>
    {steps.map((step, index) => <div key={step.title} className="process-panel" role="tabpanel" id={`process-panel-${index}`} aria-labelledby={`process-tab-${index}`} tabIndex={0} hidden={active !== index}>
      <div className="process-scene"><Image src={step.image} alt={step.imageAlt} fill sizes="(max-width: 700px) 95vw, 55vw" loading="eager" /></div>
      <div className="process-panel-copy"><span className="process-phase">{String(index + 1).padStart(2, "0")} — {step.title}</span><h3>{step.headline}</h3><p>{step.description}</p>
        <ul>{step.outcomes.map(outcome => <li key={outcome}><ArrowRight size={14} aria-hidden="true" />{outcome}</li>)}</ul>
        <div className="process-outcome"><span>{copy.outcomeLabel}</span><p>{step.result}</p></div>
      </div>
    </div>)}
  </div>
}
