"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deletePostAction } from "../actions"

export function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  return (
    <button
      className="admin-button admin-button-small admin-button-danger"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete “${title}”? This can’t be undone.`)) return
        start(async () => {
          const result = await deletePostAction(slug)
          if (!result.ok) alert(result.error)
          router.refresh()
        })
      }}
    >
      Delete
    </button>
  )
}
