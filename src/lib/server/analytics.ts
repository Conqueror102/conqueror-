import "server-only"
import { createHash, randomUUID } from "node:crypto"
import { UAParser } from "ua-parser-js"
import { getDb, hasDatabase } from "./db"
import { classifySource, detectCrawler, hostOf, type SourceType } from "@/lib/traffic-sources"

export type Visit = {
  _id: string
  visitorId: string
  sessionId: string
  path: string
  title?: string
  query?: string
  referrer?: string
  referrerHost?: string
  source: string
  sourceType: SourceType
  utm?: { source?: string; medium?: string; campaign?: string; term?: string; content?: string }
  /** First page of the session, which carries the real source. */
  entry: boolean
  country?: string
  region?: string
  city?: string
  device: string
  browser?: string
  os?: string
  screen?: string
  language?: string
  timezone?: string
  ipHash?: string
  durationMs?: number
  scrollDepth?: number
  /** Set by hand on visits later found to be automated; reports skip them. */
  bot?: boolean
  createdAt: Date
}

export type SiteEvent = { _id: string; type: string; visitorId?: string; sessionId?: string; path?: string; target?: string; label?: string; source?: string; country?: string; createdAt: Date }
export type Crawl = { _id: string; bot: string; ai: boolean; path: string; userAgent: string; createdAt: Date }

const collection = async <T extends { _id: string }>(name: string) => (await getDb()).collection<T>(name)
let indexesReady: Promise<unknown> | undefined

function ensureIndexes() {
  indexesReady ??= (async () => {
    const db = await getDb()
    // Raw analytics are kept for 13 months.
    const ttl = 60 * 60 * 24 * 400
    await Promise.all([
      db.collection("visits").createIndexes([{ key: { createdAt: -1 } }, { key: { createdAt: 1 }, expireAfterSeconds: ttl, name: "ttl" }, { key: { sessionId: 1 } }]),
      db.collection("events").createIndexes([{ key: { createdAt: -1 } }, { key: { createdAt: 1 }, expireAfterSeconds: ttl, name: "ttl" }]),
      db.collection("crawls").createIndexes([{ key: { createdAt: -1 } }, { key: { createdAt: 1 }, expireAfterSeconds: ttl, name: "ttl" }]),
    ])
  })().catch((error) => {
    indexesReady = undefined
    throw error
  })
  return indexesReady
}

function geo(headers: Headers) {
  const decode = (value: string | null) => (value ? decodeURIComponent(value) : undefined)
  return {
    country: headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? undefined,
    region: decode(headers.get("x-vercel-ip-country-region")),
    city: decode(headers.get("x-vercel-ip-city")),
  }
}

function ipHash(headers: Headers) {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip")
  if (!ip) return undefined
  // Daily salt: visits can be counted per day without keeping anything that identifies a person.
  const day = new Date().toISOString().slice(0, 10)
  return createHash("sha256").update(`${process.env.ANALYTICS_SALT || process.env.ADMIN_SESSION_SECRET || ""}:${day}:${ip}`).digest("hex").slice(0, 24)
}

function device(userAgent: string) {
  const result = new UAParser(userAgent).getResult()
  const type = result.device.type === "mobile" ? "Mobile" : result.device.type === "tablet" ? "Tablet" : "Desktop"
  return { device: type, browser: result.browser.name, os: result.os.name }
}

/** Known crawlers, plus automated Chrome that hides behind a normal user agent but still reports "HeadlessChrome" in its client hints. */
function isAutomated(headers: Headers) {
  return Boolean(detectCrawler(headers.get("user-agent"))) || /headless/i.test(headers.get("sec-ch-ua") ?? "")
}

const text = (value: unknown, max = 300) => (typeof value === "string" && value ? value.slice(0, max) : undefined)

export type PageviewInput = {
  visitorId?: string; sessionId?: string; path?: string; title?: string; query?: string; referrer?: string; entry?: boolean
  screen?: string; language?: string; timezone?: string
}

export async function recordPageview(request: Request, input: PageviewInput) {
  if (!hasDatabase()) return null
  const userAgent = request.headers.get("user-agent") ?? ""
  if (isAutomated(request.headers)) return null
  await ensureIndexes()
  const params = new URLSearchParams(input.query ?? "")
  const utm = {
    source: text(params.get("utm_source"), 100), medium: text(params.get("utm_medium"), 100), campaign: text(params.get("utm_campaign"), 150),
    term: text(params.get("utm_term"), 150), content: text(params.get("utm_content"), 150),
  }
  const utmTags = Object.fromEntries(Object.entries(utm).filter(([, value]) => value))
  const hasUtm = Object.keys(utmTags).length > 0
  const siteHost = hostOf(request.url)
  const referrer = text(input.referrer, 500)
  const { source, type } = classifySource({ referrer, utmSource: utm.source ?? params.get("ref") ?? params.get("source"), utmMedium: utm.medium, siteHost })
  const visits = await collection<Visit>("visits")
  const sessionId = text(input.sessionId, 64) ?? "unknown"
  // The first page we see for a session is its entry, even if the browser thought the session was older.
  const entry = Boolean(input.entry) || !(await visits.findOne({ sessionId }, { projection: { _id: 1 } }))
  const visit: Visit = {
    _id: randomUUID(),
    visitorId: text(input.visitorId, 64) ?? "unknown",
    sessionId,
    path: text(input.path, 300) ?? "/",
    title: text(input.title, 200),
    query: text(input.query, 500),
    referrer,
    referrerHost: hostOf(referrer) || undefined,
    source,
    sourceType: type,
    utm: hasUtm ? utmTags : undefined,
    entry,
    ...geo(request.headers),
    ...device(userAgent),
    screen: text(input.screen, 20),
    language: text(input.language, 20),
    timezone: text(input.timezone, 60),
    ipHash: ipHash(request.headers),
    createdAt: new Date(),
  }
  await visits.insertOne(visit)
  return visit._id
}

export async function recordLeave(viewId: string, durationMs: number, scrollDepth: number) {
  if (!hasDatabase()) return
  const duration = Math.max(0, Math.min(Math.round(durationMs), 1000 * 60 * 60))
  await (await collection<Visit>("visits")).updateOne({ _id: viewId }, { $set: { durationMs: duration, scrollDepth: Math.max(0, Math.min(100, Math.round(scrollDepth))) } })
}

export async function recordEvent(request: Request, input: { type: string; visitorId?: string; sessionId?: string; path?: string; target?: string; label?: string }) {
  if (!hasDatabase()) return
  if (isAutomated(request.headers)) return
  await ensureIndexes()
  const session = input.sessionId ? await (await collection<Visit>("visits")).findOne({ sessionId: input.sessionId, entry: true }, { projection: { source: 1 } }) : null
  await (await collection<SiteEvent>("events")).insertOne({
    _id: randomUUID(),
    type: input.type.slice(0, 40),
    visitorId: text(input.visitorId, 64),
    sessionId: text(input.sessionId, 64),
    path: text(input.path, 300),
    target: text(input.target, 500),
    label: text(input.label, 200),
    source: session?.source,
    country: geo(request.headers).country,
    createdAt: new Date(),
  })
}

export async function recordCrawl(path: string, userAgent: string) {
  const bot = detectCrawler(userAgent)
  if (!bot || !hasDatabase()) return
  await ensureIndexes()
  await (await collection<Crawl>("crawls")).insertOne({ _id: randomUUID(), bot: bot.name, ai: bot.ai, path: path.slice(0, 300), userAgent: userAgent.slice(0, 400), createdAt: new Date() })
}
