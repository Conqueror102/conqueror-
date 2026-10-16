import { JsonLd } from "@/components/json-ld"
import { PortfolioHeader } from "@/components/layout/site-header"
import { PortfolioHero } from "@/components/home/hero"
import { homeStructuredData } from "@/lib/structured-data"

// New portfolio homepage. The original VS Code edition lives at /vscode (src/legacy).
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <PortfolioHeader />
      <main>
        <PortfolioHero />
      </main>
    </>
  )
}
