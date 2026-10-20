// Tells Bing (and through it ChatGPT search, Copilot, DuckDuckGo), Yandex and Seznam that pages changed,
// so they recrawl in minutes instead of weeks. Run after each production deploy: npm run seo:indexnow
import { readFileSync } from "node:fs"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://victor-onyemaechi.vercel.app").replace(/\/$/, "")
const key = readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8").match(/indexNowKey:\s*"([^"]+)"/)?.[1]
if (!key) throw new Error("indexNowKey is not set in src/content/site.ts")

const sitemap = await (await fetch(`${siteUrl}/sitemap.xml`)).text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).filter((url) => url.startsWith(siteUrl))
urls.push(`${siteUrl}/llms.txt`, `${siteUrl}/llms-full.txt`)

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(siteUrl).host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList: urls }),
})
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urls.length} URLs`)
