// Marks the automated burst of 22 Oct 2026 (33 one-page "Google" visits from US data centres in under a minute)
// as bot traffic so reports skip it. Nothing is deleted. Dry run by default; pass --apply to write.
// Usage: node scripts/flag-bot-visits.mjs [--apply]     Undo: db.visits.updateMany({ bot: true }, { $unset: { bot: "" } })
import { readFileSync } from "node:fs"
import { MongoClient } from "mongodb"

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z_]+)=(.*)$/)
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^"|"$/g, "")
}

const filter = {
  createdAt: { $gte: new Date("2026-10-22T07:21:00Z"), $lt: new Date("2026-10-22T07:23:00Z") },
  os: "Linux", browser: "Chrome", timezone: "America/New_York", referrerHost: "google.com", country: "US",
}

const client = await new MongoClient(process.env.MONGODB_URI).connect()
const visits = client.db(process.env.MONGODB_DB || undefined).collection("visits")
console.log(`${await visits.countDocuments(filter)} visits match`)
if (process.argv.includes("--apply")) {
  const result = await visits.updateMany(filter, { $set: { bot: true } })
  console.log(`flagged ${result.modifiedCount}`)
}
await client.close()
