import Link from "next/link"
import { contentSections } from "@/lib/content-sections"

export const metadata = { title: "Site content" }

export default function ContentIndexPage() {
  const groups = new Map<string, [string, (typeof contentSections)[keyof typeof contentSections]][]>()
  for (const entry of Object.entries(contentSections)) {
    const list = groups.get(entry[1].group) ?? []
    list.push(entry as [string, (typeof contentSections)[keyof typeof contentSections]])
    groups.set(entry[1].group, list)
  }
  return (
    <div className="admin-stack">
      <header className="admin-header"><div><p className="admin-eyebrow">Edit anything on the site</p><h1 className="admin-title">Site content</h1></div></header>
      {[...groups].map(([group, sections]) => (
        <section key={group} className="admin-stack">
          <h2 style={{ fontSize: 15 }}>{group}</h2>
          <div className="admin-grid">
            {sections.map(([key, section]) => (
              <Link key={key} href={`/admin/content/${key}`} className="admin-card"><h2>{section.label}</h2><p className="admin-muted">{section.description}</p></Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
