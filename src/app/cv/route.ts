import { getPortfolioContent } from "@/lib/portfolio-content"
import { recordEvent } from "@/lib/server/analytics"

/** Always serves the current CV, wherever it is stored, with a friendly file name. */
export async function GET(request: Request) {
  const { profile } = await getPortfolioContent()
  await recordEvent(request, { type: "cv_download", path: "/cv" }).catch(() => {})
  if (!/^https?:\/\//.test(profile.cv)) return Response.redirect(new URL(profile.cv, request.url), 302)
  const upstream = await fetch(profile.cv)
  if (!upstream.ok || !upstream.body) return Response.redirect(profile.cv, 302)
  const fileName = `${profile.name.replace(/\s+/g, "-")}-CV.pdf`
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
