import Link from "next/link"
import { analyticsSummary } from "@/lib/server/analytics-report"

export const metadata = { title: "Overview" }

const shortcuts = [
  { href: "/admin/projects/new", title: "Add a project", body: "Upload a new project with its images and case study." },
  { href: "/admin/blog/new", title: "Write a post", body: "Publish an article to your blog." },
  { href: "/admin/content", title: "Edit site content", body: "Change any text, link or image on the site." },
  { href: "/admin/media", title: "Upload your CV", body: "Replace the CV visitors download." },
]

export default async function AdminHome() {
  const summary = await analyticsSummary(7).catch(() => null)
  return (
    <div className="admin-stack" style={{ gap: 20 }}>
      <header className="admin-header"><div><p className="admin-eyebrow">Welcome back</p><h1 className="admin-title">Overview</h1></div></header>
      {summary ? (
        <section className="admin-stack">
          <div className="admin-row" style={{ justifyContent: "space-between" }}><h2 style={{ fontSize: 15 }}>Last 7 days</h2><Link href="/admin/analytics" className="admin-link">All visitor stats →</Link></div>
          <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {[["Visits", summary.sessions], ["Page views", summary.views], ["From AI assistants", summary.ai], ["CV downloads", summary.cv]].map(([label, value]) => (
              <div key={label} className="admin-card"><p className="admin-muted" style={{ fontSize: 12 }}>{label}</p><p className="admin-stat">{Number(value).toLocaleString()}</p></div>
            ))}
          </div>
          {summary.topSources.length ? <p className="admin-muted">Top sources: {summary.topSources.map((row) => `${row.key} (${row.count})`).join(", ")}</p> : null}
        </section>
      ) : <p className="admin-card admin-error">The database isn’t reachable. Run <code>docker compose up -d</code> and check MONGODB_URI.</p>}
      <div className="admin-grid">
        {shortcuts.map((item) => <Link key={item.href} href={item.href} className="admin-card"><h2>{item.title}</h2><p className="admin-muted">{item.body}</p></Link>)}
      </div>
    </div>
  )
}
