import "server-only"
import type { Document } from "mongodb"
import { getDb } from "./db"
import type { Visit } from "./analytics"

export type Count = { key: string; count: number }
export type Filters = { days: number; source?: string; sourceType?: string }

const since = (days: number) => new Date(Date.now() - days * 86_400_000)

// Visits flagged as automated stay stored but are left out of every report.
const human = { bot: { $ne: true } }

function visitMatch({ days, source, sourceType }: Filters): Document {
  return { createdAt: { $gte: since(days) }, ...human, ...(source ? { source } : {}), ...(sourceType ? { sourceType } : {}) }
}

async function countBy(collection: string, match: Document, field: string, limit = 12): Promise<Count[]> {
  const db = await getDb()
  const rows = await db.collection(collection).aggregate([
    { $match: match },
    { $group: { _id: { $ifNull: [`$${field}`, "Unknown"] }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ]).toArray()
  return rows.map((row) => ({ key: String(row._id || "Unknown"), count: row.count as number }))
}

export async function analyticsReport(filters: Filters) {
  const db = await getDb()
  const visits = db.collection<Visit>("visits")
  const match = visitMatch(filters)
  // Sources are counted per session (its entry page), which is how a "visit" is normally defined.
  const entries = { ...match, entry: true }

  const [totals] = await visits.aggregate([
    { $match: match },
    { $group: { _id: null, views: { $sum: 1 }, visitors: { $addToSet: "$visitorId" }, sessions: { $addToSet: "$sessionId" }, avgDuration: { $avg: "$durationMs" }, avgScroll: { $avg: "$scrollDepth" } } },
    { $project: { views: 1, visitors: { $size: "$visitors" }, sessions: { $size: "$sessions" }, avgDuration: 1, avgScroll: 1 } },
  ]).toArray()

  const timezone = "Africa/Lagos"
  const daily = await visits.aggregate([
    { $match: match },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone } }, views: { $sum: 1 }, sessions: { $addToSet: "$sessionId" }, ai: { $sum: { $cond: [{ $and: ["$entry", { $eq: ["$sourceType", "ai"] }] }, 1, 0] } } } },
    { $project: { views: 1, sessions: { $size: "$sessions" }, ai: 1 } },
    { $sort: { _id: 1 } },
  ]).toArray()

  const [sourceTypes, sources, aiSources, referrers, pages, landing, countries, cities, devices, browsers, oses, campaigns, languages] = await Promise.all([
    countBy("visits", entries, "sourceType", 10),
    countBy("visits", entries, "source", 20),
    countBy("visits", { ...entries, sourceType: "ai" }, "source", 12),
    countBy("visits", { ...entries, referrerHost: { $type: "string" } }, "referrer", 15),
    countBy("visits", match, "path", 15),
    countBy("visits", entries, "path", 10),
    countBy("visits", entries, "country", 15),
    countBy("visits", { ...entries, city: { $type: "string" } }, "city", 10),
    countBy("visits", entries, "device", 5),
    countBy("visits", entries, "browser", 8),
    countBy("visits", entries, "os", 8),
    countBy("visits", { ...entries, "utm.campaign": { $type: "string" } }, "utm.campaign", 10),
    countBy("visits", entries, "language", 8),
  ])

  const eventMatch = { createdAt: { $gte: since(filters.days) } }
  const [events, cvBySource, projectClicks, outbound, crawlers, crawlerPages] = await Promise.all([
    countBy("events", eventMatch, "type", 15),
    countBy("events", { ...eventMatch, type: { $in: ["cv_download", "cv_click"] } }, "source", 10),
    countBy("events", { ...eventMatch, type: "project_click" }, "target", 10),
    countBy("events", { ...eventMatch, type: { $in: ["outbound_click", "whatsapp_click", "email_click"] } }, "target", 10),
    countBy("crawls", eventMatch, "bot", 20),
    countBy("crawls", { ...eventMatch, ai: true }, "path", 10),
  ])

  // Recent sessions with their pages, newest first.
  const recent = await visits.aggregate([
    { $match: match },
    { $sort: { createdAt: 1 } },
    { $group: {
      _id: "$sessionId",
      start: { $first: "$createdAt" }, visitorId: { $first: "$visitorId" },
      source: { $first: "$source" }, sourceType: { $first: "$sourceType" }, referrer: { $first: "$referrer" }, utm: { $first: "$utm" },
      country: { $first: "$country" }, city: { $first: "$city" }, device: { $first: "$device" }, browser: { $first: "$browser" }, os: { $first: "$os" },
      language: { $first: "$language" }, timezone: { $first: "$timezone" },
      pages: { $push: { path: "$path", at: "$createdAt", durationMs: "$durationMs" } }, totalMs: { $sum: { $ifNull: ["$durationMs", 0] } },
    } },
    { $sort: { start: -1 } },
    { $limit: 60 },
  ]).toArray()

  const returning = await visits.aggregate([
    { $match: match },
    { $group: { _id: "$visitorId", sessions: { $addToSet: "$sessionId" } } },
    { $group: { _id: null, returning: { $sum: { $cond: [{ $gt: [{ $size: "$sessions" }, 1] }, 1, 0] } } } },
  ]).toArray()

  return {
    totals: {
      views: (totals?.views as number) ?? 0,
      visitors: (totals?.visitors as number) ?? 0,
      sessions: (totals?.sessions as number) ?? 0,
      avgDuration: (totals?.avgDuration as number) ?? 0,
      avgScroll: (totals?.avgScroll as number) ?? 0,
      returning: (returning[0]?.returning as number) ?? 0,
      aiSessions: aiSources.reduce((sum, row) => sum + row.count, 0),
    },
    daily: daily.map((row) => ({ day: row._id as string, views: row.views as number, sessions: row.sessions as number, ai: row.ai as number })),
    sourceTypes, sources, aiSources, referrers, pages, landing, countries, cities, devices, browsers, oses, campaigns, languages,
    events, cvBySource, projectClicks, outbound, crawlers, crawlerPages,
    recent: recent.map((row) => ({
      sessionId: row._id as string, start: (row.start as Date).toISOString(), visitorId: row.visitorId as string,
      source: row.source as string, sourceType: row.sourceType as string, referrer: row.referrer as string | undefined, utm: row.utm as Visit["utm"],
      country: row.country as string | undefined, city: row.city as string | undefined, device: row.device as string, browser: row.browser as string | undefined, os: row.os as string | undefined,
      language: row.language as string | undefined, timezone: row.timezone as string | undefined,
      pages: (row.pages as { path: string; at: Date; durationMs?: number }[]).map((page) => ({ path: page.path, at: page.at.toISOString(), durationMs: page.durationMs })),
      totalMs: row.totalMs as number,
    })),
  }
}

export type AnalyticsReport = Awaited<ReturnType<typeof analyticsReport>>

/** Small summary for the admin overview. */
export async function analyticsSummary(days = 7) {
  const db = await getDb()
  const events = { createdAt: { $gte: since(days) } }
  const match = { ...events, ...human }
  const [views, sessions, ai, cv] = await Promise.all([
    db.collection("visits").countDocuments(match),
    db.collection("visits").countDocuments({ ...match, entry: true }),
    db.collection("visits").countDocuments({ ...match, entry: true, sourceType: "ai" }),
    db.collection("events").countDocuments({ ...events, type: "cv_download" }),
  ])
  const topSources = await countBy("visits", { ...match, entry: true }, "source", 5)
  return { views, sessions, ai, cv, topSources }
}
