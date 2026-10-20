import type { Metadata } from "next"
import "./admin.css"
import "../blog.css"

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin" }, robots: { index: false, follow: false } }

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
