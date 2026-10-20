import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/admin"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } }

export default async function LoginPage() {
  if (await getSession()) redirect("/admin")
  return (
    <main className="admin admin-login">
      <div className="admin-card admin-login-card">
        <p className="admin-eyebrow">Portfolio admin</p>
        <h1 className="admin-title">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  )
}
