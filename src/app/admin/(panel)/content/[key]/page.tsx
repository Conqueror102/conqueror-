import Link from "next/link"
import { notFound } from "next/navigation"
import { contentSections, isContentSectionKey } from "@/lib/content-sections"
import { getSection } from "@/lib/server/content-repo"
import { SectionEditor } from "./section-editor"

type Props = { params: Promise<{ key: string }> }

export async function generateMetadata({ params }: Props) {
  const { key } = await params
  return { title: isContentSectionKey(key) ? contentSections[key].label : "Site content" }
}

export default async function SectionPage({ params }: Props) {
  const { key } = await params
  if (!isContentSectionKey(key)) notFound()
  const section = contentSections[key]
  const { value, edited, updatedAt } = await getSection(key)
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div>
          <Link href="/admin/content" className="admin-link">← Site content</Link>
          <h1 className="admin-title">{section.label}</h1>
          <p className="admin-muted">{section.description}</p>
        </div>
        <span className={`admin-badge ${edited ? "admin-badge-accent" : ""}`}>{edited ? "Edited in admin" : "Original content"}</span>
      </header>
      <SectionEditor key={updatedAt?.toISOString() ?? "original"} sectionKey={key} initial={JSON.parse(JSON.stringify(value))} edited={edited} />
    </div>
  )
}
