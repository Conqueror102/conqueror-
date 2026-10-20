import { recordEvent, recordLeave, recordPageview } from "@/lib/server/analytics"

/** Receives page views, time-on-page and click events from the visit tracker. */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = JSON.parse(await request.text())
  } catch {
    return new Response(null, { status: 400 })
  }
  // Ignore requests posted from other sites.
  const origin = request.headers.get("origin")
  if (origin && new URL(origin).host !== new URL(request.url).host) return new Response(null, { status: 403 })

  try {
    if (body.type === "pageview") {
      const id = await recordPageview(request, body)
      return Response.json({ id })
    }
    if (body.type === "leave" && typeof body.id === "string") {
      await recordLeave(body.id, Number(body.duration) || 0, Number(body.scroll) || 0)
      return new Response(null, { status: 204 })
    }
    if (body.type === "event" && typeof body.name === "string") {
      await recordEvent(request, { type: body.name, visitorId: body.visitorId as string, sessionId: body.sessionId as string, path: body.path as string, target: body.target as string, label: body.label as string })
      return new Response(null, { status: 204 })
    }
  } catch (error) {
    console.error("[track]", error)
    return new Response(null, { status: 500 })
  }
  return new Response(null, { status: 400 })
}
