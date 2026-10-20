"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { checkCredentials, endSession, startSession } from "@/lib/auth/admin"

// Best-effort brute-force brake: per-IP failures in this server instance.
const failures = new Map<string, { count: number; until: number }>()

export type LoginState = { error?: string }

export async function login(_: LoginState, form: FormData): Promise<LoginState> {
  const requestHeaders = await headers()
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  const record = failures.get(ip)
  if (record && record.until > Date.now()) return { error: "Too many attempts. Try again in a few minutes." }

  const email = String(form.get("email") ?? "")
  const password = String(form.get("password") ?? "")
  if (!(await checkCredentials(email, password))) {
    const count = (record?.count ?? 0) + 1
    failures.set(ip, { count, until: count >= 5 ? Date.now() + 10 * 60_000 : 0 })
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { error: "That email and password don’t match." }
  }
  failures.delete(ip)
  await startSession(email)
  const next = String(form.get("next") ?? "")
  redirect(next.startsWith("/admin") ? next : "/admin")
}

export async function logout() {
  await endSession()
  redirect("/admin/login")
}
