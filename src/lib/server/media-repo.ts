import "server-only"
import { getDb } from "./db"

export type MediaAsset = {
  _id: string // Cloudinary public_id
  url: string
  originalUrl: string
  resourceType: string
  format?: string
  bytes?: number
  width?: number
  height?: number
  folder: string
  name: string
  createdAt: Date
}

const media = async () => (await getDb()).collection<MediaAsset>("media")

export async function recordMedia(asset: MediaAsset) {
  await (await media()).replaceOne({ _id: asset._id }, asset, { upsert: true })
}

export async function listMedia(limit = 200) {
  return (await media()).find().sort({ createdAt: -1 }).limit(limit).toArray()
}

export async function removeMedia(id: string) {
  return (await media()).findOneAndDelete({ _id: id })
}
