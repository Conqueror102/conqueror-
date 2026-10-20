import type { Graph, Person, WebSite, ProfilePage, ItemList, FAQPage, ImageObject } from "schema-dts"
import { absoluteUrl } from "@/content"
import type { PortfolioContent } from "@/lib/portfolio-content"

/** Stable @ids, so every page (home, projects, blog) points at the same Person entity. */
export const schemaIds = {
  person: absoluteUrl("/#person"),
  website: absoluteUrl("/#website"),
  profilePage: absoluteUrl("/#profile"),
  projects: absoluteUrl("/#projects"),
  photo: absoluteUrl("/#photo"),
  project: (slug: string) => absoluteUrl(`/projects/${slug}#project`),
}
const ids = schemaIds

/** Projects that are real work (not the layout demo), in the order they're shown. */
export const realProjects = <T extends { referenceDemo?: boolean }>(projects: readonly T[]) => projects.filter((project) => !project.referenceDemo)

/** Home page JSON-LD, built from the live (admin-edited) content. */
export function buildHomeStructuredData({ profile, projects, education, faqs, skillGroups, services, site }: PortfolioContent): Graph {
  const allSkills = skillGroups.flatMap((group) => group.skills)
  const sameAs = [profile.links.github, profile.links.linkedin, profile.links.x]
  const work = realProjects(projects)

  const photo: ImageObject = {
    "@type": "ImageObject",
    "@id": ids.photo,
    url: absoluteUrl(profile.photo),
    contentUrl: absoluteUrl(profile.photo),
    caption: `${profile.name}, ${profile.jobTitle}`,
  }

  const person: Person = {
    "@type": "Person",
    "@id": ids.person,
    name: profile.name,
    alternateName: [profile.alternateName, "Conqueror102"],
    givenName: profile.name.split(" ")[0],
    familyName: profile.name.split(" ").slice(1).join(" "),
    jobTitle: profile.jobTitle,
    description: profile.summary,
    disambiguatingDescription: profile.headline,
    url: site.url,
    mainEntityOfPage: { "@id": ids.profilePage },
    image: { "@id": ids.photo },
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
    homeLocation: { "@type": "Place", name: `${profile.location.city}, ${profile.location.country}` },
    nationality: { "@type": "Country", name: profile.location.country },
    worksFor: { "@type": "Organization", name: "Kode10x" },
    hasOccupation: {
      "@type": "Occupation",
      name: profile.jobTitle,
      occupationLocation: { "@type": "Country", name: profile.location.country },
      skills: allSkills.join(", "),
    },
    alumniOf: education.map((item) => ({ "@type": "EducationalOrganization" as const, name: item.institution })),
    knowsAbout: [...allSkills, ...profile.interests],
    knowsLanguage: "en",
    // What he can be hired for: helps "hire a … developer in Lagos" style answers.
    makesOffer: services.map((service) => ({
      "@type": "Offer" as const,
      itemOffered: { "@type": "Service" as const, name: service.title, description: service.description, provider: { "@id": ids.person } },
      areaServed: "Worldwide",
    })),
    seeks: profile.availableForWork ? { "@type": "Demand", name: "Remote full-stack and AI engineering roles and freelance projects" } : undefined,
    subjectOf: work.map((project) => ({ "@id": ids.project(project.slug) })),
    sameAs,
  }

  const website: WebSite = {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    alternateName: profile.name,
    description: profile.headline,
    inLanguage: "en",
    publisher: { "@id": ids.person },
    author: { "@id": ids.person },
  }

  const profilePage: ProfilePage = {
    "@type": "ProfilePage",
    "@id": ids.profilePage,
    url: site.url,
    name: `${profile.name} – ${profile.jobTitle} Portfolio`,
    isPartOf: { "@id": ids.website },
    mainEntity: { "@id": ids.person },
    primaryImageOfPage: { "@id": ids.photo },
    dateModified: site.lastUpdated,
    inLanguage: "en",
  }

  const projectList: ItemList = {
    "@type": "ItemList",
    "@id": ids.projects,
    name: `Projects by ${profile.name}`,
    numberOfItems: work.length,
    itemListElement: work.map((project, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@type": "CreativeWork" as const,
        "@id": ids.project(project.slug),
        name: project.title,
        description: project.summary,
        image: absoluteUrl(project.image),
        url: absoluteUrl(`/projects/${project.slug}`),
        ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
        keywords: project.technologies.join(", "),
        creator: { "@id": ids.person },
        author: { "@id": ids.person },
      },
    })),
  }

  const faqPage: FAQPage = {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.person },
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  }

  return {
    "@context": "https://schema.org",
    "@graph": [person, photo, website, profilePage, projectList, faqPage],
  }
}

/** Serialises JSON-LD safely for a <script> tag. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c")
