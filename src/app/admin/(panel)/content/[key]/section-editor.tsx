"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { StructuredEditor } from "@/components/admin/structured-editor"
import { resetSectionAction, saveSectionAction, type ActionResult } from "../../actions"

export function SectionEditor({ sectionKey, initial, edited }: { sectionKey: string; initial: unknown; edited: boolean }) {
  const router = useRouter()
  const [value, setValue] = useState(initial)
  const [raw, setRaw] = useState<string | null>(null)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [pending, start] = useTransition()
  const dirty = JSON.stringify(value) !== JSON.stringify(initial) || raw !== null

  const save = () => start(async () => {
    let next = value
    if (raw !== null) {
      try { next = JSON.parse(raw) } catch { setResult({ ok: false, error: "The JSON isn’t valid." }); return }
    }
    const response = await saveSectionAction(sectionKey, next)
    setResult(response)
    if (response.ok) { setValue(next); setRaw(null); router.refresh() }
  })
  const reset = () => {
    if (!confirm("Restore the original content for this section? Your edits here will be lost.")) return
    start(async () => { const response = await resetSectionAction(sectionKey); setResult(response); if (response.ok) router.refresh() })
  }

  return (
    <>
      {raw === null ? <StructuredEditor value={value} onChange={setValue} /> : <textarea className="admin-code" value={raw} onChange={(event) => setRaw(event.target.value)} spellCheck={false} />}
      <div className="admin-savebar">
        <button className="admin-button admin-button-primary" disabled={pending || !dirty} onClick={save}>{pending ? "Saving…" : "Save & publish"}</button>
        <button className="admin-button" onClick={() => setRaw(raw === null ? JSON.stringify(value, null, 2) : null)}>{raw === null ? "Edit as JSON" : "Back to form"}</button>
        {edited ? <button className="admin-button admin-button-danger" disabled={pending} onClick={reset}>Restore original</button> : null}
        <span className="admin-spacer" />
        {result ? <p className={result.ok ? "admin-success" : "admin-error"}>{result.ok ? result.message : result.error}</p> : dirty ? <p className="admin-muted">Unsaved changes</p> : null}
      </div>
    </>
  )
}
