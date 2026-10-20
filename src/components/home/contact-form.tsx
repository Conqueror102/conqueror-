"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRight, LoaderCircle } from "lucide-react"
import { sendContactMessage } from "@/lib/contact"
import { trackEvent } from "@/components/analytics/visit-tracker"
import type { HomepageCopy } from "@/content/home"

export function ContactForm({ copy }: { copy: HomepageCopy["contact"]["form"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")
    try {
      await sendContactMessage({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? "") })
      form.reset()
      setStatus("success")
      trackEvent("contact_submit")
    } catch { setStatus("error") }
  }
  return <form className="portfolio-contact-form" onSubmit={submit} aria-busy={status === "sending"}>
    <div className="form-field"><label htmlFor="contact-name">{copy.name}</label><input id="contact-name" name="name" autoComplete="name" required maxLength={200} placeholder={copy.namePlaceholder} disabled={status === "sending"} /></div>
    <div className="form-field"><label htmlFor="contact-email">{copy.email}</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder={copy.emailPlaceholder} disabled={status === "sending"} /></div>
    <div className="form-field form-message"><label htmlFor="contact-message">{copy.message}</label><textarea id="contact-message" name="message" required maxLength={5000} rows={4} placeholder={copy.messagePlaceholder} disabled={status === "sending"} /></div>
    <div className="form-bottom"><button type="submit" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}{status === "sending" ? <LoaderCircle size={20} className="contact-spinner" aria-hidden="true" /> : <ArrowUpRight size={22} aria-hidden="true" />}</button><p>{copy.hint}</p></div>
    <p className={`form-status form-status-${status}`} role="status" aria-live="polite">{status === "success" ? copy.success : status === "error" ? copy.error : ""}</p>
  </form>
}
