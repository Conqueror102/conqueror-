"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import type { HomepageCopy } from "@/content/home"

export function CopyEmail({ email, copy }: { email: string; copy: HomepageCopy["hero"]["copy"] }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  return <div className="hero-email-control">
    <button className="hero-copy-email" type="button" aria-label={status === "copied" ? copy.copiedLabel : copy.label} onClick={async () => {
      try { await navigator.clipboard.writeText(email); setStatus("copied") } catch { setStatus("error") }
    }}>{status === "copied" ? <Check size={18} /> : <Copy size={18} />}</button>
    <span className="hero-copy-feedback" role="status">{status === "copied" ? copy.success : status === "error" ? `${copy.error} ${email}` : ""}</span>
  </div>
}
