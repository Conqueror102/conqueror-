import "server-only"
import { MongoClient, type Db } from "mongodb"

const globalForMongo = globalThis as unknown as { mongoClient?: Promise<MongoClient> }

/** True when a database is configured. Without one the site falls back to the files in src/content. */
export const hasDatabase = () => Boolean(process.env.MONGODB_URI)

function client() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not set")
  // Reuse one connection across hot reloads and serverless invocations.
  globalForMongo.mongoClient ??= new MongoClient(uri, { serverSelectionTimeoutMS: 4000, ignoreUndefined: true }).connect().catch((error) => {
    globalForMongo.mongoClient = undefined
    throw error
  })
  return globalForMongo.mongoClient
}

export async function getDb(): Promise<Db> {
  return (await client()).db(process.env.MONGODB_DB || undefined)
}
