export const profile = {
  name: "Victor Onyemaechi",
  alternateName: "Victor Conqueror",
  jobTitle: "Full-Stack & AI Engineer",
  headline: "Full-stack and AI engineer building production web, mobile and AI products, from the interface to the payments ledger.",
  /** One-paragraph summary. Search and AI engines quote this, so keep it factual and specific. */
  summary:
    "Victor Onyemaechi (Victor Conqueror) is a full-stack and AI engineer based in Lagos, Nigeria. He builds complete products end to end: SureCova, a telemedicine platform with a NestJS backend, React Native app and payments ledger; B4Build, a LangGraph multi-agent planner for AI products running on AWS; TimeWise, a multi-tenant attendance SaaS with face recognition and fingerprint devices; and DriveStack, a Google Drive storage aggregator with subscriptions. He works with TypeScript, Next.js, React, React Native, Node.js, NestJS, Python, FastAPI, LangGraph, PostgreSQL, MongoDB, Redis, Docker and AWS, and is available for remote roles and freelance projects.",
  bio: [
    "I’m Victor, a full-stack and AI engineer in Lagos. I like owning a product from the first database table to the last deploy: the interface people touch, the API and data underneath, the payments that move money, and the server it all runs on.",
    "I’m curious by nature and always hungry to learn. I want to know how things work under the hood, so I read the docs and the source, take things apart and build them again. The harder the problem, the more I enjoy it: I like to question the obvious answer and test my assumptions before I commit to a fix. That’s how I caught a face-recognition library misreading head angles, and why TimeWise now measures the head turn itself to stop people checking in with a photo.",
    "Most of what I build is for African markets, where software has to cope with real constraints. SureCova connects patients and doctors across web and mobile, TimeWise checks staff in with QR codes, faces and fingerprint devices, and LemonWaresEX prices currency at the rates people actually trade at.",
    "Lately I’ve been building with AI agents. B4Build uses a LangGraph multi-agent pipeline to turn an AI product idea into a full build plan, then sends a red team to break it.",
  ],
  location: { city: "Lagos", region: "Lagos", country: "Nigeria", countryCode: "NG" },
  email: "victorvector608@gmail.com",
  phone: "+234 802 538 3208",
  availableForWork: true,
  photo: "/images/me2.jpg",
  photoAlt: "/images/me3.jpg",
  /** Header logo. */
  logo: "/images/logo-header.png",
  /** Die-cut sticker in the footer. Upload a PNG with a transparent background. */
  stickerLogo: "/images/logo-sticker.png",
  cv: "/victor-onyemaechi-cv.pdf",
  experience: [
    { role: "Software Developer", organization: "Kode10x", start: "2024", end: null },
    { role: "Intern and Teaching Assistant", organization: "Kode10x", start: "2024", end: null },
  ],
  interests: ["AI agents & LLM tooling", "Payments & fintech infrastructure", "Products for African markets", "Developer experience"],
  links: {
    github: "https://github.com/Conqueror102",
    linkedin: "https://www.linkedin.com/in/victor-conqueror-956635327/",
    x: "https://x.com/TECH_snitch101",
    xHandle: "@TECH_snitch101",
    whatsapp: "https://wa.me/2348025383208",
  },
} as const

export const sameAs = [profile.links.github, profile.links.linkedin, profile.links.x]
