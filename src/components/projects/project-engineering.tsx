import type { ProjectEngineering } from "@/content/projects"
import type { PortfolioContent } from "@/lib/portfolio-content"

/** The building story: hard problems and their fixes, the decisions behind them, and what each choice cost. */
export function ProjectEngineeringSections({ engineering, copy }: { engineering: ProjectEngineering; copy: PortfolioContent["projectDetailCopy"] }) {
  return <>
    {engineering.challenges.length > 0 && <section className="pd-hard-parts pd-width pd-section" id="hard-parts" aria-labelledby="pd-hard-parts-title">
      <div className="pd-section-heading"><div><p className="pd-kicker">{copy.hardPartsLabel}</p><h2 id="pd-hard-parts-title">{copy.hardPartsTitle}</h2></div><p>{copy.hardPartsLead}</p></div>
      <ol>{engineering.challenges.map((item, index) => <li key={item.title}>
        <span className="pd-hard-index">{String(index + 1).padStart(2, "0")}</span>
        <h3>{item.title}</h3>
        <div className="pd-hard-body">
          <div><p className="pd-hard-label">{copy.problemLabel}</p><p>{item.problem}</p></div>
          <div><p className="pd-hard-label">{copy.fixLabel}</p><p>{item.solution}</p></div>
        </div>
      </li>)}</ol>
    </section>}
    {engineering.decisions.length > 0 && <section className="pd-decisions pd-section" id="decisions" aria-labelledby="pd-decisions-title"><div className="pd-width">
      <p className="pd-kicker">{copy.decisionsLabel}</p><h2 id="pd-decisions-title">{copy.decisionsTitle}</h2>
      <ul>{engineering.decisions.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.why}</p></li>)}</ul>
    </div></section>}
    {engineering.tradeoffs.length > 0 && <section className="pd-tradeoffs pd-width pd-section" id="tradeoffs" aria-labelledby="pd-tradeoffs-title">
      <p className="pd-kicker">{copy.tradeoffsLabel}</p><h2 id="pd-tradeoffs-title">{copy.tradeoffsTitle}</h2>
      <div className="pd-tradeoff-list">{engineering.tradeoffs.map(item => <article key={item.choice}>
        <div><p className="pd-hard-label">{copy.choiceLabel}</p><h3>{item.choice}</h3></div>
        <div className="pd-tradeoff-gain"><p className="pd-hard-label">{copy.gainedLabel}</p><p>{item.gained}</p></div>
        <div className="pd-tradeoff-cost"><p className="pd-hard-label">{copy.costLabel}</p><p>{item.cost}</p></div>
      </article>)}</div>
    </section>}
  </>
}
