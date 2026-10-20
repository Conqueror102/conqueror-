import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { timingSafeEqual } from "node:crypto"
import { SESSION_COOKIE, SESSION_TTL_SECONDS, createSessionToken, verifySessionToken } from "./session"

/**
 * Single-owner login. Credentials live in env:
 * ADMIN_EMAIL, and either ADMIN_PASSWORD_HASH (bcrypt, preferred in production) or ADMIN_PASSWORD.
 */
export async function checkCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!expectedEmail || email.trim().toLowerCase() !== expectedEmail) return false
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (hash) return bcrypt.compare(password, hash)
  const plain = process.env.ADMIN_PASSWORD
  if (!plain) return false
  const a = Buffer.from(password)
  const b = Buffer.from(plain)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function startSession(email: string) {
  const store = await cookies()
  store.set(SESSION_COOKIE, await createSessionToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function endSession() {
  ;(await cookies()).delete(SESSION_COOKIE)
}

export async function getSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
}

/** Call at the top of every admin page, server action and admin route handler. */
export async function requireAdmin() {
  const session = await getSession()
  if (!session) redirect("/admin/login")
  return session
}
