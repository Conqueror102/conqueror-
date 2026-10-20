import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { site, site as siteSettings } from "@/content"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { VisitTracker } from "@/components/analytics/visit-tracker"
import "./globals.css"
import "./home.css"
import "./hero.css"
import "./about.css"
import "./about-notes.css"
import "./skill-graph.css"
import "./journey.css"
import "./testimonials.css"
import "./process.css"
import "./footer.css"
import "./projects.css"
import "./project-detail.css"

const delius = localFont({ src: "./fonts/delius.ttf", weight: "400", display: "swap", variable: "--font-delius" })
const fredoka = localFont({ src: "./fonts/fredoka.ttf", weight: "300 700", display: "swap", variable: "--font-fredoka" })
const jetbrainsMono = localFont({ src: "./fonts/jetbrains-mono.ttf", weight: "100 800", display: "swap", variable: "--font-jetbrains-mono" })

export async function generateMetadata(): Promise<Metadata> {
  const { profile, site, skillGroups } = await getPortfolioContent()
  const allSkills = skillGroups.flatMap((group) => group.skills)
  const title = `${site.name} (${profile.name}) | ${profile.jobTitle} in ${profile.location.city}, ${profile.location.country}`
  const description = profile.headline
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    authors: [{ name: profile.name, url: site.url }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [
      profile.name,
      profile.alternateName,
      "Born to create",
      "full stack developer Lagos",
      "full stack developer Nigeria",
      "AI engineer Lagos",
      "AI engineer Nigeria",
      "LangGraph developer",
      "AI agent developer",
      "React Native developer Nigeria",
      "Next.js developer",
      "NestJS developer",
      "Paystack integration developer",
      "remote full stack developer",
      "hire full stack developer Nigeria",
      "freelance web developer Nigeria",
      ...allSkills.slice(0, 10),
    ],
    category: "technology",
    alternates: {
      canonical: "/",
      types: {
        "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
        "application/rss+xml": [{ url: "/blog/rss.xml", title: `${profile.name} – Blog` }],
      },
    },
    openGraph: {
      type: "profile",
      firstName: profile.name.split(" ")[0],
      lastName: profile.name.split(" ").slice(1).join(" "),
      username: "Conqueror102",
      locale: site.locale,
      url: "/",
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: profile.links.xHandle,
      site: profile.links.xHandle,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    verification: { google: site.googleSiteVerification, ...(siteSettings.bingSiteVerification ? { other: { "msvalidate.01": siteSettings.bingSiteVerification } } : {}) },
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.themeColor,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${delius.variable} ${fredoka.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}<VisitTracker /></body>
    </html>
  )
}
