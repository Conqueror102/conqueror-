import {
  profile, homeContent, heroLogos, skillGroups, skillIcons, skillGraph, services, process, processPresentation, faqs,
  education, courses, outsideContent, testimonialsContent, capabilitiesContent, footerPile, footerNotes, projectDetailCopy, caseStudyPreview,
  projects, projectStories, projectCaseStudies, projectEngineering, site, type Project,
} from "@/content"

/**
 * Every editable section of the site. The files in src/content are the defaults: the database
 * stores an edited copy of a section under the same key, and the site uses that copy when it exists.
 */
export const contentSections = {
  profile: { label: "Profile & links", group: "About you", description: "Name, headline, bio, contact details, photos, CV link and social links.", defaults: profile },
  site: { label: "Site settings", group: "About you", description: "Search verification, theme colour and the last-updated date.", defaults: { name: site.name, themeColor: site.themeColor, googleSiteVerification: site.googleSiteVerification, lastUpdated: site.lastUpdated, locale: site.locale } },
  home: { label: "Homepage copy", group: "Homepage", description: "Navigation, header, hero, about, contact, footer and every label on the homepage.", defaults: homeContent },
  heroLogos: { label: "Hero logos", group: "Homepage", description: "The floating technology logos around the hero portrait.", defaults: heroLogos },
  footerNotes: { label: "Footer notes", group: "Homepage", description: "The back page of the footer: quotes, the short letter, the quick profile card, Right now notes and the Lagos clock.", defaults: footerNotes },
  footerPile: { label: "Footer logo pile", group: "Homepage", description: "The physics logo pile in the footer.", defaults: footerPile },
  skillGraph: { label: "Skill graph", group: "Skills", description: "The interactive skill ecosystem graph.", defaults: skillGraph },
  skillGroups: { label: "Skill groups", group: "Skills", description: "Skills listed by category, used in search data and llms.txt.", defaults: skillGroups },
  skillIcons: { label: "Skill icons", group: "Skills", description: "Icons8 icon for each skill, as style/name (e.g. color/typescript).", defaults: skillIcons },
  services: { label: "Services", group: "Services", description: "What you offer.", defaults: services },
  process: { label: "Process steps", group: "Services", description: "How you work, step by step.", defaults: process },
  processPresentation: { label: "Process section copy", group: "Services", description: "Headings and labels around the process steps.", defaults: processPresentation },
  faqs: { label: "FAQ", group: "Services", description: "Questions and answers, also published as FAQ structured data.", defaults: faqs },
  outside: { label: "Beyond the IDE", group: "Story", description: "Life outside coding: reading, football and teaching stories.", defaults: outsideContent },
  testimonials: { label: "Testimonials", group: "Story", description: "What people say about working with you.", defaults: testimonialsContent },
  capabilities: { label: "Capabilities", group: "Story", description: "The capabilities section.", defaults: capabilitiesContent },
  education: { label: "Education", group: "Story", description: "Schools, certifications and courses.", defaults: education },
  courses: { label: "Courses", group: "Story", description: "Extra courses listed in llms-full.txt.", defaults: courses },
  projectDetailCopy: { label: "Project page labels", group: "Projects", description: "Headings and labels used on every project page.", defaults: projectDetailCopy },
  caseStudyPreview: { label: "Case-study demo", group: "Projects", description: "The Rentium reference layout demo.", defaults: caseStudyPreview },
} as const

export type ContentSectionKey = keyof typeof contentSections
export type ContentSectionValues = { -readonly [K in ContentSectionKey]: (typeof contentSections)[K]["defaults"] }
export const isContentSectionKey = (key: string): key is ContentSectionKey => Object.hasOwn(contentSections, key)

/** A project as stored in the database: the file fields plus ordering and visibility. */
export type StoredProject = Project & { order: number; hidden?: boolean; updatedAt?: string }

/** The file projects merged with their stories and case studies, used until projects are edited in admin. */
export const defaultProjects: StoredProject[] = projects.map((project, index) => ({
  ...project,
  ...projectStories[project.slug],
  ...(projectCaseStudies[project.slug] ? { caseStudy: projectCaseStudies[project.slug] } : {}),
  ...(projectEngineering[project.slug] ? { engineering: projectEngineering[project.slug] } : {}),
  order: index,
}))
