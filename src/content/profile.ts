export const profile = {
  name: "Victor Onyemaechi",
  alternateName: "Victor Conqueror",
  jobTitle: "Full Stack Developer",
  headline: "Full Stack Developer building fast, modern web apps with React, Next.js, TypeScript and Node.js.",
  /** One-paragraph summary. Search and AI engines quote this, so keep it factual and specific. */
  summary:
    "Victor Onyemaechi is a full stack developer based in Lagos, Nigeria. He builds responsive web applications with React, Next.js, TypeScript, Node.js, Express and MongoDB, and has shipped 10+ real-world projects including a medical staffing platform, a staff attendance system with QR check-in, e-commerce sites and business websites. He works as a software developer at Kode10x and is available for freelance and remote work.",
  bio: [
    "I'm a passionate Full Stack Developer with expertise in building modern web applications. I specialize in creating responsive, user-friendly interfaces and robust backend systems.",
    "My goal is to deliver high-quality solutions that solve real-world problems and provide exceptional user experiences. I'm constantly learning and exploring new technologies to stay at the forefront of web development.",
  ],
  location: { city: "Lagos", region: "Lagos", country: "Nigeria", countryCode: "NG" },
  email: "victorvector608@gmail.com",
  phone: "+234 802 538 3208",
  availableForWork: true,
  photo: "/images/me2.jpg",
  photoAlt: "/images/me3.jpg",
  logo: "/images/logo.jpg",
  cv: "/victor-onyemaechi-cv.pdf",
  experience: [
    { role: "Software Developer", organization: "Kode10x", start: "2024", end: null },
    { role: "Intern and Teaching Assistant", organization: "Kode10x", start: "2024", end: null },
  ],
  interests: ["Open Source Development", "UI/UX Design", "Web Performance Optimization", "Artificial Intelligence"],
  links: {
    github: "https://github.com/Conqueror102",
    linkedin: "https://www.linkedin.com/in/victor-conqueror-956635327/",
    x: "https://x.com/TECH_snitch101",
    xHandle: "@TECH_snitch101",
    whatsapp: "https://wa.me/2348025383208",
  },
} as const

export const sameAs = [profile.links.github, profile.links.linkedin, profile.links.x]
