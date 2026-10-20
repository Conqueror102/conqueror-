import { SignJWT, jwtVerify } from "jose"

/** Edge-safe session helpers, shared by the proxy and server code. */
export const SESSION_COOKIE = "admin_session"
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set to at least 32 characters")
  return new TextEncoder().encode(value)
}

export async function createSessionToken(email: string) {
  return new SignJWT({ role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret())
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] })
    return payload.role === "owner" && payload.sub ? { email: payload.sub } : null
  } catch {
    return null
  }
}
