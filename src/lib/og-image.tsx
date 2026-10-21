import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { homeContent, profile, site } from "@/content"

export const ogAlt = `${site.name} (${profile.name}) – ${profile.jobTitle}`
export const ogSize = { width: 1200, height: 630 }

const font = (file: string) => readFile(join(process.cwd(), "src", "app", "fonts", file))

async function dataUri(publicPath: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath))
  return `data:image/png;base64,${file.toString("base64")}`
}

/** The social share card: the hero portrait with the logo sticker, beside the name and tagline, in the site's fonts. */
export async function renderOgImage() {
  const [portrait, sticker, delius, fredoka] = await Promise.all([
    dataUri(homeContent.hero.portrait), dataUri("/images/logo-sticker.png"), font("delius.ttf"), font("fredoka-semibold.ttf"),
  ])

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffe8d0", color: "#562d29", position: "relative", fontFamily: "Delius" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 640, padding: "0 0 0 80px" }}>
          <div style={{ fontFamily: "Fredoka", fontSize: 88, fontWeight: 600, lineHeight: 1.02 }}>{site.name}</div>
          <div style={{ fontSize: 40, marginTop: 16, color: "#c2410c" }}>Born to create</div>
        </div>
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 600, height: 630, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "#fed15c", borderTopLeftRadius: 300 }}>
          {/* 1086×1448 cutout scaled to fill the panel height, cropped at the hips */}
          <img src={portrait} alt="" width={516} height={688} style={{ marginBottom: -110 }} />
        </div>
        <img src={sticker} alt="" width={190} height={180} style={{ position: "absolute", left: 610, bottom: 28, transform: "rotate(-10deg)" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Delius", data: delius, weight: 400 },
        { name: "Fredoka", data: fredoka, weight: 600 },
      ],
    },
  )
}
