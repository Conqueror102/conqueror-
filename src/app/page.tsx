import { JsonLd } from "@/components/json-ld"
import { PortfolioHeader } from "@/components/layout/site-header"
import { PortfolioHero } from "@/components/home/hero"
import { buildHomeStructuredData } from "@/lib/structured-data"
import { AboutSection } from "@/components/home/about"
import { ProjectsSection } from "@/components/home/projects"
import { ServicesSection } from "@/components/home/services"
import { FaqSection } from "@/components/home/faq"
import { ContactSection } from "@/components/home/contact"
import { SiteFooter } from "@/components/layout/site-footer"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { OutsideIdeSection } from "@/components/home/outside-ide"
import { TestimonialsSection } from "@/components/home/testimonials"
import { ProcessSection } from "@/components/home/process-section"

// New portfolio homepage. The original VS Code edition lives at /vscode (src/legacy).
export default async function HomePage() {
  const content = await getPortfolioContent()
  return (
    <>
      <JsonLd data={buildHomeStructuredData(content)} />
      <PortfolioHeader content={content} />
      <main>
        <PortfolioHero content={content} />
        <AboutSection content={content} />
        <ProjectsSection content={content} />
        <OutsideIdeSection content={content} />
        <TestimonialsSection content={content} />
        <ServicesSection content={content} />
        <ProcessSection content={content} />
        <FaqSection content={content} />
        <ContactSection content={content} />
      </main>
      <SiteFooter content={content} />
    </>
  )
}
