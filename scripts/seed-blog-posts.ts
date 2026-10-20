/**
 * Loads the launch blog posts in scripts/blog-posts/*.md into the `posts` collection.
 * Idempotent by slug: re-running replaces each post with the file's current content.
 *
 *   npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 *
 * Mirrors savePost in src/lib/server/blog-repo.ts, which can't be imported outside Next ("server-only").
 */
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { MongoClient } from "mongodb"
import type { Post } from "../src/lib/server/blog-repo"

type Seed = Pick<Post, "slug" | "title" | "excerpt" | "tags" | "seoTitle" | "seoDescription" | "publishedAt">

const seeds: Seed[] = [
  {
    slug: "how-i-built-a-langgraph-multi-agent-planner",
    title: "How I built a LangGraph multi-agent planner",
    excerpt: "B4Build turns an AI product idea into a nine-phase build plan with five LangGraph nodes, a rule-based coordinator and a red-team agent that attacks the result.",
    tags: ["AI agents", "LangGraph", "FastAPI"],
    seoTitle: "How I Built a LangGraph Multi-Agent Planner",
    seoDescription: "Inside B4Build: five LangGraph nodes, a rule-based coordinator, a red-team agent, partial re-runs, SSE streaming and the AWS setup behind it.",
    publishedAt: "2026-10-20T02:00:00.000Z",
  },
  {
    slug: "paystack-webhooks-done-right",
    title: "Paystack webhooks done right",
    excerpt: "Verify the signature, re-verify the transaction, make recording idempotent, never retry provider calls and keep money in a ledger: the rules behind SureCova's payments.",
    tags: ["Payments", "Paystack", "NestJS"],
    seoTitle: "Paystack Webhooks Done Right: A Practical Guide",
    seoDescription: "How to verify Paystack webhooks, handle the redirect and webhook arriving twice, stay idempotent and keep money in a ledger, from SureCova.",
    publishedAt: "2026-10-20T02:01:00.000Z",
  },
  {
    slug: "face-recognition-check-in-that-cant-be-fooled-by-a-photo",
    title: "Face-recognition check-in that can't be fooled by a photo",
    excerpt: "How TimeWise stops a printed or on-screen photo from checking someone in: a random head-turn challenge measured from facial landmarks, not a buggy head-pose plugin.",
    tags: ["Computer vision", "SaaS", "Nigeria"],
    seoTitle: "Face Check-in That a Photo Can't Fool: Liveness",
    seoDescription: "How TimeWise blocks photo spoofing at a face-recognition kiosk with a random head-turn challenge measured from landmarks, plus the plugin bug behind it.",
    publishedAt: "2026-10-20T02:02:00.000Z",
  },
  {
    slug: "hiring-a-remote-full-stack-developer-from-lagos",
    title: "Hiring a remote full-stack developer from Lagos: what to expect",
    excerpt: "What working with me looks like: four stages, 2 to 4 weeks for a website, 6 to 12 weeks for an MVP with payments, and a WAT (UTC+1) schedule that overlaps with Europe.",
    tags: ["Hiring", "Freelance"],
    seoTitle: "Hiring a Remote Full-Stack Developer from Lagos",
    seoDescription: "Timelines, process, time zones and handover when you hire Victor Conqueror, a remote full-stack and AI engineer in Lagos, Nigeria (WAT, UTC+1).",
    publishedAt: "2026-10-20T02:03:00.000Z",
  },
]

const readingMinutes = (markdown: string) => Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 220))

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not set. Run with --env-file=.env.local")
  const client = await new MongoClient(uri, { serverSelectionTimeoutMS: 4000, ignoreUndefined: true }).connect()
  try {
    const posts = client.db(process.env.MONGODB_DB || undefined).collection<Post & { _id: string }>("posts")
    for (const seed of seeds) {
      const content = (await readFile(join(process.cwd(), "scripts", "blog-posts", `${seed.slug}.md`), "utf8")).trim() + "\n"
      const doc: Post = {
        ...seed,
        content,
        coverImage: "",
        coverAlt: "",
        status: "published",
        featured: false,
        canonicalUrl: "",
        updatedAt: new Date().toISOString(),
        readingMinutes: readingMinutes(content),
      }
      await posts.replaceOne({ _id: seed.slug }, doc, { upsert: true })
      console.log(`saved ${seed.slug} (${content.split(/\s+/).filter(Boolean).length} words, ${doc.readingMinutes} min)`)
    }
  } finally {
    await client.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
