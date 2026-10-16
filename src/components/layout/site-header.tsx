"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { profile } from "@/content"

const navigation = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="portfolio-header">
      <a className="portfolio-wordmark" href="#home" aria-label="Victor Conqueror home">
        Victor<span>.</span><small>CONQUEROR</small>
      </a>
      <nav className="portfolio-desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="portfolio-header-actions">
        <Link className="portfolio-dev-link" href="/vscode">Developer view <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <a className="portfolio-contact-link" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
        <button className="portfolio-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="portfolio-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="portfolio-mobile-nav" id="portfolio-mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
          <Link href="/vscode" onClick={() => setMenuOpen(false)}>Developer view<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </nav>
      )}
    </header>
  )
}
