import { heroLogos } from "./home"
import { skillGraph } from "./skill-graph"

/** Reuse authentic artwork across the web, AI, data, and deployment ecosystems. */
const marks = new Map<string, { name: string; icon: string }>()
for (const node of skillGraph.nodes) if (node.icon) marks.set(node.icon, { name: node.label, icon: node.icon })
for (const logo of heroLogos) {
  const icon = `/icons/brands/${logo.slug}.svg`
  marks.set(icon, { name: logo.name, icon })
}

export const footerPile = {
  logos: [...marks.values()],
  desktop: { columns: 38, rows: 12 },
  mobile: { columns: 13, rows: 12 },
  pause: "Pause logo motion", resume: "Resume logo motion",
} as const
