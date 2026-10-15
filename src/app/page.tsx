import { JsonLd } from "@/components/json-ld"
import { homeStructuredData } from "@/lib/structured-data"
import { VSCodePortfolio } from "@/legacy/vscode/components/vscode-portfolio"

// The VS Code portfolio stays on the homepage until the new UI is built.
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <VSCodePortfolio />
    </>
  )
}
