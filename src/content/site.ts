/**
 * Site-wide settings. Set NEXT_PUBLIC_SITE_URL in Vercel when you move to a custom domain.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://victor-onyemaechi.vercel.app").replace(/\/$/, ""),
  name: "Victor Conqueror",
  locale: "en_US",
  themeColor: "#ffe8d0",
  googleSiteVerification: "qzS6Fzf_hHAwewQfz-gfOatDDr196xJxJ6c_HHC2Q8o",
  /** Bing Webmaster Tools "msvalidate.01" code. Bing's index feeds ChatGPT search, Copilot and DuckDuckGo. */
  bingSiteVerification: "",
  /** IndexNow key (Bing, Yandex, Seznam…). The matching file is public/<key>.txt; run `npm run seo:indexnow` after a deploy. */
  indexNowKey: "4b0d1fe1c3782e62957219c31498f5fd",
  /** Bump this when you update content so sitemaps and llms.txt report a fresh date. */
  lastUpdated: "2026-10-19",
} as const

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString()
