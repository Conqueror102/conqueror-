import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session"
import { detectCrawler } from "@/lib/traffic-sources"

async function logCrawler(request: NextRequest, event: NextFetchEvent) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (!detectCrawler(userAgent)) return
  // Loaded only when a crawler shows up, so normal visits stay fast.
  const { recordCrawl } = await import("@/lib/server/analytics")
  event.waitUntil(recordCrawl(request.nextUrl.pathname, userAgent).catch(() => {}))
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin")
  if (!isAdmin) {
    await logCrawler(request, event)
    return NextResponse.next()
  }
  // Optimistic check only: every admin page and action also calls requireAdmin().
  if (pathname === "/admin/login") return NextResponse.next()
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (session) return NextResponse.next()
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.redirect(new URL("/admin/login", request.url))
}

export const config = {
  // Pages, llms.txt, sitemap and robots; not static assets or the tracking API.
  matcher: ["/((?!_next/|api/track|favicon\\.ico|icons/|images/|projects/.*\\.(?:png|jpe?g|webp|avif)$|.*\\.(?:png|jpe?g|webp|avif|svg|gif|ico|woff2?|ttf|css|js)$).*)"],
}
