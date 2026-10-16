export type SkillGroup = { name: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { name: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { name: "Tools & Deployment", skills: ["Git", "CI/CD", "Vercel", "Netlify", "Cloudinary"] },
  { name: "Design & Quality", skills: ["UI/UX Design", "Figma", "Responsive Design", "Accessibility", "Performance Optimization", "SEO"] },
]

export const allSkills = skillGroups.flatMap((group) => group.skills)

/**
 * Icons8 icon for each skill, as "style/name" (the part of an Icons8 URL after img.icons8.com/
 * without the size), e.g. https://img.icons8.com/color/96/typescript.png -> "color/typescript".
 * To change one, find the icon on icons8.com, copy its link and paste the style/name here.
 */
export const skillIcons: Record<string, string> = {
  React: "color/react-native",
  "Next.js": "fluency/nextjs",
  TypeScript: "color/typescript",
  JavaScript: "color/javascript",
  HTML: "color/html-5--v1",
  CSS: "color/css3",
  "Tailwind CSS": "color/tailwindcss",
  "Node.js": "color/nodejs",
  Express: "ios-filled/express-js",
  MongoDB: "color/mongodb",
  Git: "color/git",
  Vercel: "ios-filled/vercel",
  Netlify: "color/netlify",
  Figma: "color/figma--v1",
  Cloudinary: "color/cloudinary",
}
