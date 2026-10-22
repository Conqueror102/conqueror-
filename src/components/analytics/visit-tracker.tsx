"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SESSION_MINUTES = 30

function storage(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

/**
 * Anonymous ids: a visitor id kept on this browser and a session that ends after 30 idle minutes.
 * Arriving from another site or a tagged (UTM) link always starts a new session, so its source is counted.
 */
function ids(newArrival: boolean) {
  const local = storage("local")
  let visitorId = local?.getItem("pv_vid")
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    local?.setItem("pv_vid", visitorId)
  }
  const raw = local?.getItem("pv_sid")
  const [sessionId, last] = raw?.split("|") ?? []
  const fresh = newArrival || !sessionId || Date.now() - Number(last) > SESSION_MINUTES * 60_000
  const id = fresh ? crypto.randomUUID() : sessionId
  local?.setItem("pv_sid", `${id}|${Date.now()}`)
  return { visitorId, sessionId: id, entry: fresh }
}

function send(payload: Record<string, unknown>, beacon = false) {
  // Browsers driven by automation tools (Puppeteer, Playwright, Selenium) report themselves here.
  if (navigator.webdriver) return Promise.resolve(null)
  const body = JSON.stringify(payload)
  if (beacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "text/plain" }))
    return Promise.resolve(null)
  }
  return fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } })
    .then((response) => (response.ok && response.status !== 204 ? response.json() : null))
    .catch(() => null)
}

function classifyClick(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? ""
  const label = (anchor.getAttribute("aria-label") || anchor.textContent || "").trim().slice(0, 120)
  if (/^mailto:/i.test(href)) return { name: "email_click", target: href.replace(/^mailto:/i, "").split("?")[0], label }
  if (/^tel:/i.test(href)) return { name: "phone_click", target: href, label }
  if (/\/cv(\?|$)|\.pdf(\?|$)/i.test(href)) return { name: "cv_click", target: href, label }
  let url: URL
  try { url = new URL(href, location.href) } catch { return null }
  if (url.host !== location.host) {
    if (/wa\.me|whatsapp/i.test(url.host)) return { name: "whatsapp_click", target: url.href, label }
    return { name: "outbound_click", target: url.href, label }
  }
  if (url.pathname.startsWith("/projects/")) return { name: "project_click", target: url.pathname, label }
  if (url.pathname.startsWith("/blog/")) return { name: "post_click", target: url.pathname, label }
  return null
}

type View = { path: string; id: string | null; visitorId: string; sessionId: string; visibleMs: number; visibleSince: number | null; scroll: number }

// Module state survives React's development double-mount, so each page view is sent once.
let active: View | null = null
let lastUrl: string | null = null

function visibleTime(view: View) {
  return view.visibleMs + (view.visibleSince ? Date.now() - view.visibleSince : 0)
}

function flush(view: View) {
  if (view.id) send({ type: "leave", id: view.id, duration: visibleTime(view), scroll: view.scroll }, true)
}

/** Records page views with their source, time on page and key clicks. Skips the admin. */
export function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return
    if (active?.path !== pathname) {
      if (active) flush(active)
      const referrer = lastUrl ?? document.referrer
      const external = !lastUrl && ((Boolean(document.referrer) && new URL(document.referrer).host !== location.host) || /[?&]utm_/.test(location.search))
      const { visitorId, sessionId, entry } = ids(external)
      const view: View = { path: pathname, id: null, visitorId, sessionId, visibleMs: 0, visibleSince: document.visibilityState === "visible" ? Date.now() : null, scroll: 0 }
      active = view
      lastUrl = location.href
      send({
        type: "pageview", visitorId, sessionId, entry, path: pathname, title: document.title, query: location.search.slice(1), referrer,
        screen: `${screen.width}x${screen.height}`, language: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).then((result) => { view.id = result?.id ?? null })
    }

    const onScroll = () => {
      if (!active) return
      const max = document.documentElement.scrollHeight - innerHeight
      active.scroll = Math.max(active.scroll, max > 0 ? (scrollY / max) * 100 : 100)
    }
    const onVisibility = () => {
      if (!active) return
      if (document.visibilityState === "hidden") {
        active.visibleMs = visibleTime(active)
        active.visibleSince = null
        flush(active)
      } else active.visibleSince = Date.now()
    }
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a")
      const click = anchor ? classifyClick(anchor) : null
      if (click && active) send({ type: "event", ...click, visitorId: active.visitorId, sessionId: active.sessionId, path: active.path }, true)
    }
    addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    document.addEventListener("click", onClick, true)
    return () => {
      removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibility)
      document.removeEventListener("click", onClick, true)
    }
  }, [pathname])

  return null
}

/** For forms and other components: record a custom event, e.g. trackEvent("contact_submit"). */
export function trackEvent(name: string, details: { target?: string; label?: string } = {}) {
  const local = storage("local")
  const sessionId = local?.getItem("pv_sid")?.split("|")[0]
  send({ type: "event", name, ...details, visitorId: local?.getItem("pv_vid"), sessionId, path: location.pathname }, true)
}
