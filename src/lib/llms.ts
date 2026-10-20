import { absoluteUrl } from "@/content"
import type { PortfolioContent } from "@/lib/portfolio-content"
import type { Post } from "@/lib/server/blog-repo"
import { realProjects } from "@/lib/structured-data"

const link = (label: string, url: string, note?: string) => `- [${label}](${url})${note ? `: ${note}` : ""}`

/** llms.txt (https://llmstxt.org): a short, link-rich map of the site for AI assistants. */
export function buildLlmsTxt({ profile, projects, site }: PortfolioContent, posts: Post[] = []) {
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `Contact: ${profile.email}. Last updated: ${site.lastUpdated}.`,
    "",
    "## Profile",
    "",
    link("Portfolio", absoluteUrl("/"), "projects, skills, services and contact"),
    link("Full profile for AI assistants", absoluteUrl("/llms-full.txt"), "everything on the site as plain text"),
    link("CV (PDF)", absoluteUrl("/cv")),
    link("Blog", absoluteUrl("/blog"), "articles and build notes"),
    link("GitHub", profile.links.github),
    link("LinkedIn", profile.links.linkedin),
    "",
    "## Projects",
    "",
    ...realProjects(projects).map((project) => link(project.title, absoluteUrl(`/projects/${project.slug}`), project.summary)),
    "",
    ...(posts.length ? ["## Blog", "", ...posts.slice(0, 30).map((post) => link(post.title, absoluteUrl(`/blog/${post.slug}`), post.excerpt)), ""] : []),
    "## Optional",
    "",
    link("X (Twitter)", profile.links.x),
    link("WhatsApp", profile.links.whatsapp),
    "",
  ].join("\n")
}

/** llms-full.txt: the whole portfolio as one Markdown document an AI assistant can read in one request. */
export function buildLlmsFullTxt({ profile, projects, site, skillGroups, services, education, courses, faqs }: PortfolioContent, posts: Post[] = []) {
  return [
    `# ${profile.name} – ${profile.jobTitle}`,
    "",
    `> ${profile.summary}`,
    "",
    "## Quick facts",
    "",
    `- Name: ${profile.name} (also known as ${profile.alternateName})`,
    `- Role: ${profile.jobTitle}`,
    `- Location: ${profile.location.city}, ${profile.location.country} (works remotely worldwide)`,
    `- Available for work: ${profile.availableForWork ? "Yes, freelance and remote roles" : "Not currently"}`,
    `- Email: ${profile.email}`,
    `- Website: ${site.url}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    "",
    "## About",
    "",
    ...profile.bio.flatMap((paragraph) => [paragraph, ""]),
    "## Experience",
    "",
    ...profile.experience.map((item) => `- ${item.role}, ${item.organization} (${item.start} – ${item.end ?? "present"})`),
    "",
    "## Skills",
    "",
    ...skillGroups.map((group) => `- ${group.name}: ${group.skills.join(", ")}`),
    "",
    "## Projects",
    "",
    ...realProjects(projects).flatMap((project) => [
      `### ${project.title}`,
      "",
      project.description,
      "",
      `- Type: ${project.category}`,
      `- Project story: ${absoluteUrl(`/projects/${project.slug}`)}`,
      `- Built with: ${project.technologies.join(", ")}`,
      ...(project.liveUrl ? [`- Live site: ${project.liveUrl}`] : []),
      ...(project.repoUrl ? [`- Source code: ${project.repoUrl}`] : []),
      "",
    ]),
    "## Services",
    "",
    ...services.map((service) => `- **${service.title}**: ${service.description}`),
    "",
    "## Education",
    "",
    ...education.map((item) => `- ${item.credential}, ${item.institution}, ${item.location} (${item.period}). ${item.description}`),
    ...courses.map((course) => `- ${course.name} (${course.platform}, ${course.year})`),
    "",
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    ...(posts.length ? ["## Blog posts", "", ...posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}) (${post.publishedAt?.slice(0, 10)}): ${post.excerpt}`), ""] : []),
  ].join("\n")
}
