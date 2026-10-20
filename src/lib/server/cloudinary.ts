import "server-only"
import { v2 as cloudinary } from "cloudinary"

export const ROOT_FOLDER = "portfolio"

export function cloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
}

function configure() {
  if (!cloudinaryConfigured()) throw new Error("Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your env.")
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
  return cloudinary
}

/** Signature for a direct browser upload, so large files never pass through the server. */
export function signUpload(folder: string, publicId?: string) {
  const client = configure()
  const timestamp = Math.round(Date.now() / 1000)
  const params: Record<string, string | number> = { folder: `${ROOT_FOLDER}/${folder}`, timestamp }
  if (publicId) Object.assign(params, { public_id: publicId, overwrite: "true", invalidate: "true" })
  const signature = client.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!)
  return { ...params, signature, apiKey: process.env.CLOUDINARY_API_KEY!, cloudName: process.env.CLOUDINARY_CLOUD_NAME! }
}

export async function destroyAsset(publicId: string, resourceType: string) {
  await configure().uploader.destroy(publicId, { resource_type: resourceType, invalidate: true })
}

/** Serve images in the best format and quality for each browser. */
export function optimizedImageUrl(secureUrl: string) {
  return secureUrl.includes("/image/upload/") && !secureUrl.includes("/upload/f_auto") ? secureUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto/") : secureUrl
}
