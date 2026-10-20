import Link from "next/link"
import { loadProjects } from "@/lib/server/content-repo"
import { ProjectList } from "./project-list"

export const metadata = { title: "Projects" }

export default async function ProjectsAdminPage() {
  const projects = await loadProjects({ includeHidden: true })
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div><p className="admin-eyebrow">{projects.length} projects</p><h1 className="admin-title">Projects</h1></div>
        <Link href="/admin/projects/new" className="admin-button admin-button-primary">+ New project</Link>
      </header>
      <ProjectList initial={projects.map(({ slug, title, category, image, featured, live, hidden }) => ({ slug, title, category, image, featured: Boolean(featured), live: Boolean(live), hidden: Boolean(hidden) }))} />
    </div>
  )
}
