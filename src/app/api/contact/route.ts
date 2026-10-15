import nodemailer from "nodemailer"

export const runtime = "nodejs"

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!)

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const json = (message: string, status: number) => Response.json({ message }, { status })

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json("Invalid request.", 400)
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return json("Name, email and message are required.", 400)
  }
  const clean = { name: name.trim().slice(0, 200), email: email.trim().slice(0, 200), message: message.trim().slice(0, 5000) }
  if (!clean.name || !clean.message || !isEmail(clean.email)) {
    return json("Please enter your name, a valid email and a message.", 400)
  }

  const { EMAIL_USER, EMAIL_PASS, CONTACT_TO_EMAIL } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("Contact form: EMAIL_USER or EMAIL_PASS is not set")
    return json("Email is not configured. Please reach out on WhatsApp or LinkedIn instead.", 500)
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL_USER, pass: EMAIL_PASS } })
    await transporter.sendMail({
      from: EMAIL_USER,
      to: CONTACT_TO_EMAIL ?? "victortochukwu1000@gmail.com",
      replyTo: clean.email,
      subject: `Portfolio contact from ${clean.name}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\nMessage: ${clean.message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(clean.name)}</p><p><strong>Email:</strong> ${escapeHtml(clean.email)}</p><p><strong>Message:</strong><br>${escapeHtml(clean.message).replace(/\n/g, "<br>")}</p>`,
    })
    return json("Message sent successfully!", 200)
  } catch (error) {
    console.error("Contact form: failed to send email", error)
    return json("Sorry, your message could not be sent. Please try again or reach out on WhatsApp.", 500)
  }
}
