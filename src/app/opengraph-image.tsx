import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { profile } from "@/content"

export const alt = `${profile.name} – ${profile.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", profile.photo))
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #007acc 140%)",
          color: "white",
        }}
      >
        <img src={photoSrc} alt="" width={340} height={340} style={{ borderRadius: 32, objectFit: "cover", border: "6px solid #38bdf8" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, color: "#7dd3fc" }}>Portfolio</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginTop: 12 }}>{profile.name}</div>
          <div style={{ fontSize: 40, marginTop: 20, color: "#e2e8f0" }}>{profile.jobTitle}</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#94a3b8" }}>React · Next.js · TypeScript · Node.js</div>
          <div style={{ fontSize: 26, marginTop: 12, color: "#94a3b8" }}>Lagos, Nigeria · Available for remote work</div>
        </div>
      </div>
    ),
    size,
  )
}
