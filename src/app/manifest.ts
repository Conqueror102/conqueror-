import type { MetadataRoute } from "next"
import { profile, site } from "@/content"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} – ${profile.jobTitle}`,
    short_name: "Victor O.",
    description: profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
