export type SkillGroup = { name: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { name: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { name: "Tools & Deployment", skills: ["Git", "CI/CD", "Vercel", "Netlify", "Cloudinary"] },
  { name: "Design & Quality", skills: ["UI/UX Design", "Figma", "Responsive Design", "Accessibility", "Performance Optimization", "SEO"] },
]

export const allSkills = skillGroups.flatMap((group) => group.skills)
