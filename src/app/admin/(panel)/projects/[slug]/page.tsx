import Link from "next/link"
import { notFound } from "next/navigation"
import { getProject } from "@/lib/server/content-repo"
import { emptyProject, withAllFields } from "@/lib/project-template"
import { ProjectEditor } from "./project-editor"

type Props = { params: Promise<{ slug: string }> }

export const metadata = { title: "Edit project" }

export default async function ProjectEditPage({ params }: Props) {
  const { slug } = await params
  const isNew = slug === "new"
  const project = isNew ? emptyProject : await getProject(slug)
  if (!project) notFound()
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div>
          <Link href="/admin/projects" className="admin-link">← Projects</Link>
          <h1 className="admin-title">{isNew ? "New project" : project.title}</h1>
        </div>
        {isNew ? null : <Link href={`/projects/${slug}`} target="_blank" className="admin-button">View on site ↗</Link>}
      </header>
      <ProjectEditor previousSlug={isNew ? null : slug} initial={JSON.parse(JSON.stringify(withAllFields(project)))} />
    </div>
  )
}
