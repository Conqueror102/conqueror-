import nodemailer from "nodemailer"
import { profile, site } from "@/content"

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
    const safe = { name: escapeHtml(clean.name), email: escapeHtml(clean.email), message: escapeHtml(clean.message).replace(/\n/g, "<br>") }
    const firstName = clean.name.split(/\s+/)[0].slice(0, 40)
    await transporter.sendMail({
      from: `"${site.name} Portfolio" <${EMAIL_USER}>`,
      to: CONTACT_TO_EMAIL ?? profile.email,
      replyTo: { name: clean.name, address: clean.email },
      subject: `New portfolio enquiry from ${clean.name}`,
      text: `New enquiry from your portfolio\n\nName: ${clean.name}\nEmail: ${clean.email}\n\n${clean.message}\n\nReply to this email to answer ${firstName} directly.`,
      html: emailLayout("New enquiry from your portfolio", `<p style="margin:0 0 16px"><strong>${safe.name}</strong> &lt;<a href="mailto:${safe.email}" style="color:#c2410c">${safe.email}</a>&gt; sent a message:</p><div style="padding:16px 18px;background:#fff7ed;border-left:3px solid #f97316;border-radius:6px;margin:0 0 20px">${safe.message}</div><p style="margin:0"><a href="mailto:${safe.email}?subject=${encodeURIComponent("Re: your message")}" style="display:inline-block;padding:10px 18px;background:#1c1917;color:#fff;border-radius:999px;text-decoration:none">Reply to ${escapeHtml(firstName)}</a></p>`),
    })
    // Confirmation to the sender. It never repeats their message, so the form can't be used to relay spam.
    // Failure here shouldn't fail the request, since the enquiry already arrived.
    await transporter.sendMail({
      from: `"${profile.name}" <${EMAIL_USER}>`,
      to: { name: clean.name, address: clean.email },
      replyTo: profile.email,
      subject: "Thanks for reaching out, I’ve got your message",
      text: `Hi ${firstName},\n\nThanks for getting in touch. Your message reached me and I’ll reply within two working days.\n\nIf it’s urgent, WhatsApp me at ${profile.links.whatsapp}.\n\nVictor\n${profile.jobTitle}\n${site.url}`,
      html: emailLayout(`Hi ${escapeHtml(firstName)}, thanks for reaching out`, `<p style="margin:0 0 16px">Your message reached me, and I’ll reply within two working days.</p><p style="margin:0 0 20px">If it’s urgent, you can <a href="${profile.links.whatsapp}" style="color:#c2410c">message me on WhatsApp</a>. In the meantime, have a look at <a href="${site.url}/#projects" style="color:#c2410c">what I’ve built</a>.</p><p style="margin:0">Victor<br><span style="color:#78716c">${profile.jobTitle}</span></p>`),
    }).catch(error => console.error("Contact form: failed to send confirmation", error))
    return json("Message sent successfully!", 200)
  } catch (error) {
    console.error("Contact form: failed to send email", error)
    return json("Sorry, your message could not be sent. Please try again or reach out on WhatsApp.", 500)
  }
}

function emailLayout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px 12px;background:#ffe8d0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1c1917"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden"><tr><td style="padding:22px 28px;background:#1c1917;color:#ffe8d0;font-size:15px;letter-spacing:.04em"><strong>Victor.</strong> <span style="opacity:.7">PORTFOLIO</span></td></tr><tr><td style="padding:28px;font-size:15px;line-height:1.6"><h1 style="margin:0 0 18px;font-size:21px;line-height:1.3">${title}</h1>${body}</td></tr><tr><td style="padding:16px 28px;border-top:1px solid #f5f5f4;font-size:12px;color:#a8a29e"><a href="${site.url}" style="color:#a8a29e">${site.url.replace(/^https?:\/\//, "")}</a> · Lagos, Nigeria</td></tr></table></td></tr></table></body></html>`
}
