import Link from "next/link"
import { requireAdmin } from "@/lib/auth/admin"
import { logout } from "../login/actions"
import { AdminNav } from "./admin-nav"

export const dynamic = "force-dynamic"

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()
  return (
    <div className="admin admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">Portfolio <span>admin</span></Link>
        <AdminNav />
        <div className="admin-sidebar-foot">
          <Link href="/" target="_blank" className="admin-link">View site ↗</Link>
          <p className="admin-muted">{session.email}</p>
          <form action={logout}><button className="admin-button admin-button-ghost">Sign out</button></form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
