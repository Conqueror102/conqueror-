import Link from "next/link"
import { analyticsReport, type Count } from "@/lib/server/analytics-report"

export const metadata = { title: "Visitors" }

type Props = { searchParams: Promise<{ days?: string; type?: string; source?: string }> }

const ranges = [1, 7, 30, 90, 365]
const typeLabels: Record<string, string> = { ai: "AI assistants", search: "Search engines", social: "Social", email: "Email", referral: "Other websites", campaign: "Campaigns (UTM)", direct: "Direct", internal: "Internal" }
const eventLabels: Record<string, string> = {
  cv_download: "CV downloads (/cv)", cv_click: "CV link clicks", contact_submit: "Contact form sent", project_click: "Project opened",
  outbound_click: "Outbound link clicks", email_click: "Email link clicks", whatsapp_click: "WhatsApp clicks", phone_click: "Phone clicks", post_click: "Blog post opened",
}

const formatDuration = (ms: number) => {
  if (!ms) return "—"
  const seconds = Math.round(ms / 1000)
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}
const flag = (country?: string) => (country && country.length === 2 ? String.fromCodePoint(...[...country.toUpperCase()].map((c) => 127397 + c.charCodeAt(0))) : "")

function Breakdown({ title, rows, labels, hint, link }: { title: string; rows: Count[]; labels?: Record<string, string>; hint?: string; link?: (key: string) => string }) {
  const max = Math.max(1, ...rows.map((row) => row.count))
  return (
    <section className="admin-card admin-stack" style={{ gap: 10 }}>
      <div><h2>{title}</h2>{hint ? <p className="admin-muted" style={{ fontSize: 12 }}>{hint}</p> : null}</div>
      {rows.length === 0 ? <p className="admin-muted">No data yet.</p> : rows.map((row) => (
        <div key={row.key} className="admin-stack" style={{ gap: 3 }}>
          <div className="admin-row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link ? <Link className="admin-link" href={link(row.key)}>{labels?.[row.key] ?? row.key}</Link> : labels?.[row.key] ?? row.key}</span>
            <strong>{row.count.toLocaleString()}</strong>
          </div>
          <div className="admin-bar"><span style={{ width: `${(row.count / max) * 100}%` }} /></div>
        </div>
      ))}
    </section>
  )
}

export default async function AnalyticsPage({ searchParams }: Props) {
  const params = await searchParams
  const days = ranges.includes(Number(params.days)) ? Number(params.days) : 30
  const report = await analyticsReport({ days, sourceType: params.type, source: params.source })
  const query = (extra: Record<string, string | undefined>) => {
    const search = new URLSearchParams(Object.entries({ days: String(days), type: params.type, source: params.source, ...extra }).filter(([, value]) => value) as [string, string][])
    return `/admin/analytics?${search}`
  }
  const maxDaily = Math.max(1, ...report.daily.map((row) => row.views))
  const filtered = params.type || params.source

  return (
    <div className="admin-stack" style={{ gap: 18 }}>
      <header className="admin-header">
        <div><p className="admin-eyebrow">Last {days === 1 ? "24 hours" : `${days} days`}</p><h1 className="admin-title">Visitors</h1></div>
        <div className="admin-row" style={{ gap: 6 }}>
          {ranges.map((range) => <Link key={range} href={query({ days: String(range) })} className={`admin-button admin-button-small ${range === days ? "admin-button-primary" : ""}`}>{range === 1 ? "24h" : range === 365 ? "1y" : `${range}d`}</Link>)}
        </div>
      </header>
      {filtered ? <p className="admin-card">Showing only {params.type ? typeLabels[params.type] ?? params.type : params.source}. <Link className="admin-link" href={query({ type: undefined, source: undefined })}>Clear filter</Link></p> : null}

      <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
        {[
          ["Visits", report.totals.sessions.toLocaleString()],
          ["Unique visitors", report.totals.visitors.toLocaleString()],
          ["Page views", report.totals.views.toLocaleString()],
          ["From AI assistants", report.totals.aiSessions.toLocaleString()],
          ["Returning visitors", report.totals.returning.toLocaleString()],
          ["Avg. time on page", formatDuration(report.totals.avgDuration)],
          ["Avg. scroll depth", report.totals.avgScroll ? `${Math.round(report.totals.avgScroll)}%` : "—"],
        ].map(([label, value]) => <div key={label} className="admin-card"><p className="admin-muted" style={{ fontSize: 12 }}>{label}</p><p className="admin-stat">{value}</p></div>)}
      </div>

      <section className="admin-card admin-stack">
        <h2>Page views per day</h2>
        {report.daily.length === 0 ? <p className="admin-muted">No visits recorded yet. Open the site in another tab to see your first one.</p> : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 160 }}>
            {report.daily.map((row) => (
              <div key={row.day} title={`${row.day}: ${row.views} views, ${row.sessions} visits, ${row.ai} from AI`} style={{ flex: 1, minWidth: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ height: `${(row.views / maxDaily) * 100}%`, background: "var(--a-accent)", borderRadius: "4px 4px 0 0", opacity: .85, minHeight: 2 }} />
              </div>
            ))}
          </div>
        )}
        {report.daily.length ? <div className="admin-row admin-muted" style={{ justifyContent: "space-between", fontSize: 12 }}><span>{report.daily[0].day}</span><span>{report.daily.at(-1)?.day}</span></div> : null}
      </section>

      <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        <Breakdown title="Channels" rows={report.sourceTypes} labels={typeLabels} hint="Counted per visit, from the first page." link={(key) => query({ type: key, source: undefined })} />
        <Breakdown title="Sources" rows={report.sources} hint="ChatGPT, Google, LinkedIn, direct and more." link={(key) => query({ source: key, type: undefined })} />
        <Breakdown title="AI assistants" rows={report.aiSources} hint="People who clicked through from an AI answer." />
        <Breakdown title="Referring pages" rows={report.referrers} hint="The exact page that linked to you." />
        <Breakdown title="Top pages" rows={report.pages} />
        <Breakdown title="Landing pages" rows={report.landing} />
        <Breakdown title="Countries" rows={report.countries.map((row) => ({ ...row, key: `${flag(row.key)} ${row.key}`.trim() }))} hint="Location is filled in when the site runs on Vercel." />
        <Breakdown title="Cities" rows={report.cities} />
        <Breakdown title="Devices" rows={report.devices} />
        <Breakdown title="Browsers" rows={report.browsers} />
        <Breakdown title="Operating systems" rows={report.oses} />
        <Breakdown title="Languages" rows={report.languages} />
        <Breakdown title="UTM campaigns" rows={report.campaigns} hint="Add ?utm_source=…&utm_campaign=… to links you share." />
        <Breakdown title="Actions" rows={report.events} labels={eventLabels} />
        <Breakdown title="CV downloads by source" rows={report.cvBySource} />
        <Breakdown title="Projects opened" rows={report.projectClicks} />
        <Breakdown title="Outbound clicks" rows={report.outbound} />
        <Breakdown title="Crawlers and AI bots" rows={report.crawlers} hint="Bots reading the site, e.g. GPTBot and ClaudeBot. Not counted as visits." />
        <Breakdown title="Pages read by AI bots" rows={report.crawlerPages} />
      </div>

      <section className="admin-card admin-stack" style={{ padding: 0 }}>
        <h2 style={{ padding: "16px 18px 0" }}>Recent visits</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>When</th><th>Source</th><th>Location</th><th>Device</th><th>Pages</th><th>Time</th></tr></thead>
            <tbody>
              {report.recent.map((visit) => (
                <tr key={visit.sessionId}>
                  <td style={{ whiteSpace: "nowrap" }}>{new Date(visit.start).toLocaleString("en-GB", { timeZone: "Africa/Lagos", dateStyle: "medium", timeStyle: "short" })}</td>
                  <td>
                    <strong>{visit.source}</strong> <span className="admin-badge">{typeLabels[visit.sourceType] ?? visit.sourceType}</span>
                    {visit.referrer ? <p className="admin-muted" style={{ fontSize: 12, wordBreak: "break-all" }}>{visit.referrer}</p> : null}
                    {visit.utm ? <p className="admin-muted" style={{ fontSize: 12 }}>{Object.entries(visit.utm).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join(" · ")}</p> : null}
                  </td>
                  <td>{[flag(visit.country), visit.city, visit.country].filter(Boolean).join(" ") || "—"}<p className="admin-muted" style={{ fontSize: 12 }}>{[visit.language, visit.timezone].filter(Boolean).join(" · ")}</p></td>
                  <td>{visit.device}<p className="admin-muted" style={{ fontSize: 12 }}>{[visit.browser, visit.os].filter(Boolean).join(" · ")}</p></td>
                  <td>
                    <details><summary style={{ cursor: "pointer" }}>{visit.pages.length} page{visit.pages.length > 1 ? "s" : ""}</summary>
                      <ol style={{ margin: "6px 0 0", paddingLeft: 18 }}>{visit.pages.map((page, index) => <li key={index}>{page.path} <span className="admin-muted">{formatDuration(page.durationMs ?? 0)}</span></li>)}</ol>
                    </details>
                  </td>
                  <td>{formatDuration(visit.totalMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {report.recent.length === 0 ? <p className="admin-muted" style={{ padding: 18 }}>No visits yet.</p> : null}
        </div>
      </section>
    </div>
  )
}
