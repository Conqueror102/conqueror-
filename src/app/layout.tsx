import type { Metadata, Viewport } from "next"
import { Delius, Fredoka, JetBrains_Mono } from "next/font/google"
import { site, profile, allSkills } from "@/content"
import "./globals.css"

const delius = Delius({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-delius" })
const fredoka = Fredoka({ subsets: ["latin"], display: "swap", variable: "--font-fredoka" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains-mono" })

const title = `${profile.name} | ${profile.jobTitle} in Lagos, Nigeria`
const description =
  "Full stack developer in Lagos, Nigeria building fast, SEO-friendly web apps with React, Next.js, TypeScript, Node.js and MongoDB. 10+ shipped projects. Available for freelance and remote work."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    profile.name,
    "full stack developer Lagos",
    "full stack developer Nigeria",
    "Next.js developer",
    "React developer",
    "remote full stack developer",
    "freelance web developer Nigeria",
    ...allSkills.slice(0, 10),
  ],
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "llms.txt" }] },
  },
  openGraph: {
    type: "profile",
    firstName: "Victor",
    lastName: "Onyemaechi",
    username: "Conqueror102",
    locale: site.locale,
    url: "/",
    siteName: `${profile.name} Portfolio`,
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
  verification: { google: site.googleSiteVerification },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.themeColor,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${delius.variable} ${fredoka.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
