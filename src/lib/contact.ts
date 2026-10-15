export type ContactMessage = { name: string; email: string; message: string }

/** Sends the contact form to /api/contact and returns the server's message. Throws on failure. */
export async function sendContactMessage(data: ContactMessage): Promise<string> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const body = (await response.json().catch(() => ({}))) as { message?: string }
  if (!response.ok) throw new Error(body.message ?? "Something went wrong.")
  return body.message ?? "Message sent successfully!"
}
