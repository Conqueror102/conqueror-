/**
 * Site-wide settings. Set NEXT_PUBLIC_SITE_URL in Vercel when you move to a custom domain.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://victor-onyemaechi.vercel.app").replace(/\/$/, ""),
  name: "Victor Onyemaechi",
  locale: "en_US",
  themeColor: "#007acc",
  googleSiteVerification: "qzS6Fzf_hHAwewQfz-gfOatDDr196xJxJ6c_HHC2Q8o",
  /** Bump this when you update content so sitemaps and llms.txt report a fresh date. */
  lastUpdated: "2026-10-15",
} as const

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString()
