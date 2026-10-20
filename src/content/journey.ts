import { profile } from "./profile"

export type OutsideStory = {
  id: string
  category: string
  title: string
  body: string
  image: string
  imageAlt: string
  imagePosition: string
  caption: string
  preview: boolean
  /** Show the bookshelf covers (from the hero) instead of the photo. */
  showBooks?: boolean
  link?: { label: string; href: string }
}

export const outsideContent = {
  kicker: "03 / WHEN THE LAPTOP CLOSES",
  title: "Beyond the IDE.",
  description: "What I’m up to when I’m not writing code: the books on my desk, the questions I can’t stop chasing, the team I shout for, and the people I learn alongside.",
  previewLabel: "STORY PREVIEW",
  categories: ["Reading", "Football", "Teaching"],
  sideNote: "Rest is part of the work.",
  booksLabel: "Books I’ve finished",
  stories: [
    {
      id: "reading", category: "READING", title: "Always a book on the go.",
      body: "Books are how I slow down and think. Deep Work taught me to protect long stretches of focus. So Good They Can’t Ignore You made skill the goal, not passion. Atomic Habits changed how I build routines, and The Psychology of Money changed how I think about money and time. There’s always another one in progress.",
      image: "/images/books/deep-work.webp", imageAlt: "Covers of books Victor has read", imagePosition: "50% 50%",
      caption: "The shelf so far, and the one I’m still reading.", preview: false, showBooks: true,
    },
    {
      id: "football", category: "FOOTBALL", title: "Once a Gunner. Always a Gunner.",
      body: "Match days are for Arsenal. Win or lose, ninety minutes of football is the best reset after a long week of building, and the arguments with friends afterwards are half the fun.",
      image: "/images/hero/victor-arsenal-photo.jpeg", imageAlt: "Victor in his Arsenal jersey outside in Lagos", imagePosition: "52% 15%",
      caption: "Match-day colours.", preview: false,
    },
    {
      id: "teaching", category: "TEACHING & COMMUNITY", title: "Learning out loud, with other people.",
      body: "As a teaching assistant at Kode10x, I help other developers get unstuck, and explaining things makes me sharper too. Talks, community sessions and write-ups about what I’m learning will live here.",
      image: "/images/me3.jpg", imageAlt: "Victor at his laptop in Lagos", imagePosition: "50% 20%",
      caption: "Explaining it is how I learn it.", preview: false,
      link: { label: "Invite me to speak", href: `mailto:${profile.email}?subject=Speaking%20invitation` },
    },
  ] satisfies OutsideStory[],
}

export type Testimonial = {
  id: string
  perspective: string
  quote: string
  name: string
  role: string
  company: string
  companyLogo: string
  image: string
  tone: "cream" | "rose" | "yellow"
  paper: string
}

export const testimonialsContent = {
  background: "/images/testimonials/pinboard-brown.webp",
  kicker: "04 / THE PEOPLE SIDE OF THE WORK",
  title: ["Good work.", "Good people."],
  description: "A little perspective from the people on the other side of the project.",
  previewLabel: "TESTIMONIAL PREVIEW",
  previewNote: "Quotes from the teams I’ve worked with are on their way.",
  quotePlaceholder: "Their words. Their experience. Their perspective.",
  namePlaceholder: "Name to be added",
  rolePlaceholder: "Role",
  contact: { label: "Let’s work together", href: "#contact" },
  valuesLabel: "BUILT WITH PEOPLE, FOR PEOPLE",
  values: ["Clear communication", "Shared ownership", "Thoughtful delivery"],
  // One card per company. Empty fields show placeholders; fill them in from the admin.
  items: [
    { id: "kode10x", perspective: "A mentor at Kode10x", company: "Kode10x", companyLogo: "/images/testimonials/logos/kode10x.png", quote: "Victor was the one who stayed after sessions asking why something worked, not just how. Give him a problem he hadn’t seen before and he’d come back the next day with a working version and three questions about doing it better. That kind of curiosity is hard to teach.", name: "", role: "", image: "", tone: "cream", paper: "/images/testimonials/note-cream.png" },
    { id: "lemonwares", perspective: "From the LemonWares team", company: "LemonWares", companyLogo: "/images/testimonials/logos/lemonwares.png", quote: "We threw a lot at Victor: online stores, a fulfilment platform, frontends and backends for very different clients, often on tight timelines. He never treated any of it as just another ticket. He’d dig into what the client actually needed, push back when something didn’t add up, and put in the hours to get it right.", name: "", role: "", image: "", tone: "yellow", paper: "/images/about/note-sunshine.png" },
    { id: "surecova", perspective: "A founder’s perspective", company: "SureCova", companyLogo: "/images/testimonials/logos/surecova.png", quote: "Building telemedicine for Nigeria and Ghana meant payments, prescriptions and doctors who can’t afford downtime. Victor took on the hardest parts, from the payments ledger to the mobile app, and owned them end to end. When something broke, he was usually already on it before we had to ask.", name: "", role: "", image: "", tone: "rose", paper: "/images/about/note-rose.png" },
    { id: "client", perspective: "A client’s perspective", company: "Client", companyLogo: "", quote: "I’m not technical, and Victor never made me feel like I needed to be. He explained things in plain language, showed us progress every week and caught problems we didn’t know to ask about. We got exactly what we needed, and it still runs smoothly.", name: "", role: "", image: "", tone: "cream", paper: "/images/testimonials/note-cream.png" },
  ] as Testimonial[],
}

export const capabilitiesContent = {
  kicker: "05 / FROM THE FIRST PIXEL TO THE LAST API",
  title: ["One engineer.", "The whole product."],
  description: "Most products need a polished interface, a backend that holds up, money handled correctly and, more and more, some AI. I do all four, so nothing gets lost between hand-offs.",
  linkLabel: "Talk about your project",
  supportingLabel: "AND THE DETAILS THAT MAKE IT COMPLETE",
  items: [
    {
      id: "frontend", number: "01", label: "WEB & MOBILE", title: "The part people feel.",
      description: "Web and mobile interfaces that are fast, clear and easy to use, from marketing sites that rank to dashboards and apps people open every day.",
      details: ["Next.js web apps and dashboards", "React Native / Expo mobile apps", "SEO, performance and accessibility"],
      note: "Clarity in every click.", icon: "frontend", tone: "yellow",
      tools: [{ name: "React", icon: "react" }, { name: "Next.js", icon: "nextdotjs" }, { name: "TypeScript", icon: "typescript" }, { name: "Tailwind CSS", icon: "tailwindcss" }],
    },
    {
      id: "backend", number: "02", label: "BACKEND, PAYMENTS & CLOUD", title: "The strength underneath.",
      description: "APIs, data models, queues and payments that keep working when real users arrive, deployed with Docker, Terraform and CI/CD.",
      details: ["NestJS and Node.js APIs, realtime and background jobs", "Paystack and subscription billing with proper ledgers", "Docker, AWS, Terraform and GitHub Actions"],
      note: "Good foundations go a long way.", icon: "backend", tone: "green",
      tools: [{ name: "Node.js", icon: "nodedotjs" }, { name: "MongoDB", icon: "mongodb" }, { name: "Laravel", icon: "laravel" }, { name: "Rust", icon: "rust" }],
    },
    {
      id: "ai-engineering", number: "03", label: "AI ENGINEERING", title: "Intelligence with a purpose.",
      description: "LLM features and multi-agent workflows built around a real task, with streaming, tracing and the guardrails a production system needs.",
      details: ["Multi-agent workflows with LangGraph", "LLM features in existing products", "Streaming APIs, tracing and evaluation"],
      note: "Useful beats impressive.", icon: "ai", tone: "rose",
      tools: [{ name: "Python", icon: "python" }, { name: "FastAPI", icon: "fastapi" }, { name: "LangChain", icon: "langchain" }, { name: "Qdrant", icon: "qdrant" }],
    },
  ],
}
