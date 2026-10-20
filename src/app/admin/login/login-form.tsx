"use client"

import { useActionState } from "react"
import { login, type LoginState } from "./actions"

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {})
  return (
    <form action={action} className="admin-stack">
      <label className="admin-field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="admin-field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error ? <p className="admin-error" role="alert">{state.error}</p> : null}
      <button className="admin-button admin-button-primary" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  )
}
