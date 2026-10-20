"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteProjectAction, reorderProjectsAction } from "../actions"

type Row = { slug: string; title: string; category: string; image: string; featured: boolean; live: boolean; hidden: boolean }

export function ProjectList({ initial }: { initial: Row[] }) {
  const router = useRouter()
  const [rows, setRows] = useState(initial)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  const move = (from: number, to: number) => {
    const next = [...rows]
    const [row] = next.splice(from, 1)
    next.splice(to, 0, row)
    setRows(next)
    start(async () => {
      const result = await reorderProjectsAction(next.map((item) => item.slug))
      if (!result.ok) { setError(result.error); setRows(rows) }
    })
  }
  const remove = (row: Row) => {
    if (!confirm(`Delete “${row.title}”? This can’t be undone.`)) return
    start(async () => {
      const result = await deleteProjectAction(row.slug)
      if (result.ok) { setRows((current) => current.filter((item) => item.slug !== row.slug)); router.refresh() } else setError(result.error)
    })
  }

  return (
    <div className="admin-card admin-table-wrap" style={{ padding: 0 }}>
      {error ? <p className="admin-error" style={{ padding: 12 }}>{error}</p> : null}
      <table className="admin-table">
        <thead><tr><th>Order</th><th /><th>Project</th><th>Status</th><th /></tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.slug}>
              <td style={{ whiteSpace: "nowrap" }}>
                <button className="admin-icon-button" title="Move up" disabled={pending || index === 0} onClick={() => move(index, index - 1)}>↑</button>{" "}
                <button className="admin-icon-button" title="Move down" disabled={pending || index === rows.length - 1} onClick={() => move(index, index + 1)}>↓</button>
              </td>
              {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail from any source */}
              <td><img src={row.image} alt="" className="admin-thumb" /></td>
              <td><Link href={`/admin/projects/${row.slug}`} className="admin-link">{row.title}</Link><p className="admin-muted">{row.category} · /projects/{row.slug}</p></td>
              <td><div className="admin-row" style={{ gap: 4 }}>{row.hidden ? <span className="admin-badge">Hidden</span> : null}{row.featured ? <span className="admin-badge admin-badge-accent">Featured</span> : null}{row.live ? <span className="admin-badge admin-badge-success">Live</span> : null}</div></td>
              <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                <Link href={`/admin/projects/${row.slug}`} className="admin-button admin-button-small">Edit</Link>{" "}
                <button className="admin-button admin-button-small admin-button-danger" disabled={pending} onClick={() => remove(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
