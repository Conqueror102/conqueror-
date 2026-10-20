"use client"

import { recordUploadAction, signUploadAction, type UploadedAsset } from "@/app/admin/(panel)/actions"

/** Upload a file straight from the browser to Cloudinary, then record it in the media library. */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const signed = await signUploadAction(folder)
  if (!signed.ok) throw new Error(signed.error)
  const { apiKey, cloudName, signature, ...params } = signed.params
  const body = new FormData()
  body.append("file", file)
  body.append("api_key", apiKey)
  body.append("signature", signature)
  for (const [key, value] of Object.entries(params)) body.append(key, String(value))
  // PDFs go up as "raw": Cloudinary blocks PDF delivery from the image type on many accounts.
  const resource = file.type === "application/pdf" ? "raw" : "auto"
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resource}/upload`, { method: "POST", body })
  const result = (await response.json()) as UploadedAsset & { error?: { message: string } }
  if (!response.ok || result.error) throw new Error(result.error?.message ?? "Upload failed")
  const { url } = await recordUploadAction(result)
  return url
}
