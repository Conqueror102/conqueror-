"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import type { HomepageCopy } from "@/content/home"

export function MobileNavigation({ navigation, copy }: { navigation: readonly {label:string;href:string}[]; copy: HomepageCopy["header"] }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])
  return <>
    <button className="portfolio-menu-toggle" type="button" aria-label={open ? copy.closeMenu : copy.openMenu} aria-expanded={open} aria-controls="portfolio-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    {open && <nav className="portfolio-mobile-nav" id="portfolio-mobile-nav" aria-label={copy.mobileNav}>
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
      <Link href="/vscode" onClick={() => setOpen(false)}>{copy.developer}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </nav>}
  </>
}
