import type { StoredProject } from "@/lib/content-sections"

/** Every project field, so the editor shows optional ones too. */
export const emptyProject: StoredProject = {
  slug: "",
  title: "",
  summary: "",
  description: "",
  category: "",
  technologies: [],
  image: "",
  liveUrl: "",
  repoUrl: "",
  live: false,
  featured: false,
  hidden: false,
  note: "",
  story: [],
  highlights: [],
  gallery: [],
  facts: [],
  order: 0,
}

export const emptyCaseStudy: NonNullable<StoredProject["caseStudy"]> = {
  demo: false,
  summary: "",
  client: "",
  role: "",
  services: [],
  metrics: [],
  challenge: [],
  solution: [],
  outcomes: [],
  architecture: {
    introduction: "",
    pipeline: [],
    pillars: [],
    access: { title: "", body: "", actionLabel: "" },
  },
}

/** Shapes for list items, so empty lists still get the right fields when you add one. */
export const projectListTemplates = {
  gallery: { src: "", alt: "", caption: "", detail: false, position: "" },
  facts: { label: "", value: "" },
  metrics: { value: "", label: "" },
  pipeline: { label: "", detail: "" },
  pillars: { title: "", body: "", icon: "database" },
  challenges: { title: "", problem: "", solution: "" },
  decisions: { title: "", why: "" },
  tradeoffs: { choice: "", gained: "", cost: "" },
}

/** Fill in every field so the form shows them all; order of keys follows the template. */
export function withAllFields(project: Partial<StoredProject>): StoredProject {
  const merged = { ...emptyProject, ...project }
  if (merged.caseStudy) merged.caseStudy = { ...emptyCaseStudy, ...merged.caseStudy, architecture: { ...emptyCaseStudy.architecture, ...merged.caseStudy.architecture } }
  return merged
}
