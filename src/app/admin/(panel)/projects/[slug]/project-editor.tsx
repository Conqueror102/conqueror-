"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { StructuredEditor } from "@/components/admin/structured-editor"
import type { StoredProject } from "@/lib/content-sections"
import { emptyCaseStudy, projectListTemplates } from "@/lib/project-template"
import { saveProjectAction, type ActionResult } from "../../actions"

const slugify = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-")

export function ProjectEditor({ previousSlug, initial }: { previousSlug: string | null; initial: StoredProject }) {
  const router = useRouter()
  const [project, setProject] = useState(initial)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [pending, start] = useTransition()
  const dirty = JSON.stringify(project) !== JSON.stringify(initial)

  const update = (next: unknown) => {
    const value = next as StoredProject
    // New projects get a slug from the title until you type one yourself.
    if (!previousSlug && project.slug === slugify(project.title) && value.title !== project.title) value.slug = slugify(value.title)
    setProject(value)
  }
  const save = () => start(async () => {
    const response = await saveProjectAction(previousSlug, project)
    setResult(response)
    if (response.ok && response.slug && response.slug !== previousSlug) router.replace(`/admin/projects/${response.slug}`)
    else if (response.ok) router.refresh()
  })
  // Order and timestamps are managed elsewhere, so they stay out of the form.
  const { caseStudy, order, updatedAt, ...fields } = project
  const meta = { order, ...(updatedAt ? { updatedAt } : {}) }

  return (
    <>
      <StructuredEditor value={fields} onChange={(next) => update({ ...(next as object), ...meta, ...(caseStudy ? { caseStudy } : {}) })} folder={`projects/${project.slug || "new"}`} templates={projectListTemplates} />
      <section className="admin-group" style={{ padding: 12 }}>
        <div className="admin-row" style={{ justifyContent: "space-between" }}>
          <div><h2 style={{ fontSize: 15 }}>Case study</h2><p className="admin-muted">Optional long-form case study: challenge, solution, outcomes, metrics and architecture.</p></div>
          {caseStudy
            ? <button type="button" className="admin-button admin-button-small admin-button-danger" onClick={() => confirm("Remove the case study from this project?") && setProject({ ...fields, ...meta } as StoredProject)}>Remove case study</button>
            : <button type="button" className="admin-button admin-button-small" onClick={() => setProject({ ...project, caseStudy: structuredClone(emptyCaseStudy) })}>+ Add case study</button>}
        </div>
        {caseStudy ? <div style={{ marginTop: 12 }}><StructuredEditor value={caseStudy} onChange={(next) => setProject({ ...project, caseStudy: next as StoredProject["caseStudy"] })} folder={`projects/${project.slug || "new"}`} templates={projectListTemplates} /></div> : null}
      </section>
      <div className="admin-savebar">
        <button className="admin-button admin-button-primary" disabled={pending || !dirty} onClick={save}>{pending ? "Saving…" : previousSlug ? "Save & publish" : "Create project"}</button>
        <span className="admin-spacer" />
        {result ? <p className={result.ok ? "admin-success" : "admin-error"}>{result.ok ? result.message : result.error}</p> : dirty ? <p className="admin-muted">Unsaved changes</p> : null}
      </div>
    </>
  )
}
