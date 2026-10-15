import type { Graph, Person, WebSite, ProfilePage, ItemList } from "schema-dts"
import { site, absoluteUrl, profile, sameAs, projects, allSkills, education } from "@/content"

const ids = {
  person: absoluteUrl("/#person"),
  website: absoluteUrl("/#website"),
  profilePage: absoluteUrl("/#profile"),
  projects: absoluteUrl("/#projects"),
}

const person: Person = {
  "@type": "Person",
  "@id": ids.person,
  name: profile.name,
  alternateName: profile.alternateName,
  jobTitle: profile.jobTitle,
  description: profile.summary,
  url: site.url,
  image: absoluteUrl(profile.photo),
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.countryCode,
  },
  worksFor: { "@type": "Organization", name: "Kode10x" },
  alumniOf: education.map((item) => ({ "@type": "EducationalOrganization" as const, name: item.institution })),
  knowsAbout: allSkills,
  knowsLanguage: "en",
  sameAs,
}

const website: WebSite = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: `${site.name} | ${profile.jobTitle}`,
  description: profile.headline,
  inLanguage: "en",
  publisher: { "@id": ids.person },
}

const profilePage: ProfilePage = {
  "@type": "ProfilePage",
  "@id": ids.profilePage,
  url: site.url,
  name: `${profile.name} – ${profile.jobTitle} Portfolio`,
  isPartOf: { "@id": ids.website },
  mainEntity: { "@id": ids.person },
  dateModified: site.lastUpdated,
  inLanguage: "en",
}

const projectList: ItemList = {
  "@type": "ItemList",
  "@id": ids.projects,
  name: `Projects by ${profile.name}`,
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    item: {
      "@type": "CreativeWork" as const,
      name: project.title,
      description: project.summary,
      image: absoluteUrl(project.image),
      url: project.liveUrl,
      ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
      keywords: project.technologies.join(", "),
      creator: { "@id": ids.person },
    },
  })),
}

export const homeStructuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [person, website, profilePage, projectList],
}

/** Serialises JSON-LD safely for a <script> tag. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c")
