"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/analytics", label: "Visitors" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/content", label: "Site content" },
  { href: "/admin/media", label: "Media & CV" },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <nav className="admin-nav" aria-label="Admin">
      {items.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>
      })}
    </nav>
  )
}
