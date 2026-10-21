export type ProjectVisual = { src: string; alt: string; caption: string; detail?: boolean; position?: string }
export type ProjectCaseStudy = {
  demo: boolean
  summary: string
  client: string
  role: string
  services: string[]
  metrics: { value: string; label: string }[]
  challenge: string[]
  solution: string[]
  outcomes: string[]
  architecture: {
    introduction: string
    pipeline: { label: string; detail: string }[]
    pillars: { title: string; body: string; icon: "database" | "performance" | "security" | "testing" }[]
    access: { title: string; body: string; actionLabel?: string }
  }
}
/** How the project was built: hard problems, decisions and what each choice gave up. */
export type ProjectEngineering = {
  challenges: { title: string; problem: string; solution: string }[]
  decisions: { title: string; why: string }[]
  tradeoffs: { choice: string; gained: string; cost: string }[]
}
export type Project = {
  slug: string
  title: string
  /** One line, used in cards, meta descriptions and llms.txt. */
  summary: string
  description: string
  category: string
  technologies: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  /** True when this is a client site that is in production. */
  live?: boolean
  featured?: boolean
  note?: string
  story?: string[]
  highlights?: string[]
  gallery?: ProjectVisual[]
  facts?: { label: string; value: string }[]
  caseStudy?: ProjectCaseStudy
  engineering?: ProjectEngineering
  referenceDemo?: boolean
}

export const projects: Project[] = [
  {
    slug: "surecova",
    title: "SureCova – Telemedicine Platform",
    summary: "A telemedicine platform for Nigeria and Ghana where patients subscribe to a doctor, consult, get prescriptions and pay, across web, mobile and admin.",
    description:
      "SureCova is a subscription telemedicine platform for African markets. Patients subscribe to a doctor, book consultations, message in real time and receive verifiable prescriptions, while doctors are paid out of subscription revenue. It runs as five applications: a NestJS API with realtime and worker services, an Expo / React Native app for patients and doctors, a Next.js website with prescription verification, an admin console and a separate payments service with its own ledger.",
    category: "Product platform",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "React Native", "Expo", "Next.js", "Prisma", "Socket.io", "Paystack", "Docker", "Nginx", "Cloudinary"],
    image: "/projects/surecova.webp",
    liveUrl: "https://surecova.com",
    live: true,
    featured: true,
  },
  {
    slug: "b4build",
    title: "B4Build – AI Build Planner",
    summary: "A multi-agent AI tool that turns an AI product idea into a full build plan, from idea pressure-test to cost model and scaling path, then red-teams it.",
    description:
      "B4Build walks engineers and founders through every decision of building an AI application. A LangGraph state machine runs nine planning phases, from idea validation and model choice to architecture, infrastructure, cost, security, observability and scaling. A synthesizer compiles the report, a red-team agent attacks it for fatal flaws, and follow-up questions such as “what if I use Claude instead?” re-run only the phases they affect.",
    category: "AI engineering",
    technologies: ["Python", "FastAPI", "LangGraph", "OpenAI", "Pydantic", "PostgreSQL", "Next.js", "TypeScript", "Clerk", "AWS", "Terraform", "Docker", "GitHub Actions"],
    image: "/projects/b4build.webp",
    repoUrl: "https://github.com/Conqueror102/b4build",
    featured: true,
  },
  {
    slug: "time-wise",
    title: "TimeWise – Staff Attendance SaaS",
    summary: "A free, multi-tenant attendance platform where staff check in by ID, QR code, hands-free face recognition or a fingerprint device.",
    description:
      "TimeWise is a multi-tenant staff attendance platform. Organizations register, add staff and run a check-in kiosk that accepts staff IDs, QR codes, hands-free face recognition (CompreFace or AWS Rekognition) and ZKTeco fingerprint devices. Admins get lateness rules in their own timezone, reports and analytics, and a platform-owner panel oversees every tenant. It ships with Docker Compose and automatic HTTPS for self-hosting.",
    category: "Product platform",
    technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS", "shadcn/ui", "AWS Rekognition", "Cloudinary", "Nodemailer", "Docker"],
    image: "/projects/timewise.webp",
    repoUrl: "https://github.com/Conqueror102/time-wise-v2",
    featured: true,
  },
  {
    slug: "drivestack",
    title: "DriveStack – Google Drive Storage Aggregator",
    summary: "A SaaS backend that combines several Google Drive accounts into one storage pool, with subscriptions, referrals and local pricing.",
    description:
      "DriveStack lets one user connect multiple Google accounts and manage all their Drive storage from a single place: combined quotas, file browsing and search, moving files between accounts, uploads and duplicate detection. The NestJS backend adds Dodo Payments subscriptions with idempotent webhooks, a referral engine that unlocks extra account slots, one USD price shown in local currency through Dodo’s adaptive currency, and a separate admin API with revenue and audit logs.",
    category: "Product platform",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Google Drive API", "Socket.io", "Dodo Payments", "Swagger"],
    image: "/projects/drivestack.webp",
    repoUrl: "https://github.com/Conqueror102/driveStackBE",
    featured: true,
  },
  {
    slug: "milky-way",
    title: "Milky Way – Beauty Store & Admin",
    summary: "An online store for a Lagos beauty supplier, with wholesale and retail pricing, Paystack checkout and an admin that runs the whole shop.",
    description:
      "Milky Way Cosmetics supplies skincare, beauty, body and spa products at wholesale and retail prices from Amuwo-Odofin, Lagos. The site gives shoppers a product catalogue, a shop page, product photo galleries, a cart and a Paystack checkout with delivery fees by location. Behind it, an admin dashboard handles products with Cloudinary photo uploads, optional stock tracking, orders and payment status, transactions, categories, delivery places, homepage photos and copy, footer socials and even the site’s colours. It runs as a Laravel and Livewire app in a FrankenPHP container on Vercel, backed by PostgreSQL.",
    category: "E-commerce",
    technologies: ["Laravel", "PHP", "Livewire", "Flux UI", "Tailwind CSS", "PostgreSQL", "Paystack", "Cloudinary", "FrankenPHP", "Docker", "Vercel"],
    image: "/projects/milky-way.webp",
    repoUrl: "https://github.com/Conqueror102/Milky-way",
  },
  {
    slug: "project-cham",
    title: "Project CHAM – Childhood Cancer Nonprofit",
    summary: "The website and content admin for a nonprofit that supports children living with cancer and their families in Nigeria.",
    description:
      "Project CHAM supports children living with cancer and the families beside them through awareness, access to care, practical support and advocacy, in partnership with LUTH oncology. The site tells that story with programs, stories and guides, events, a gallery, team profiles and a simple path to support a child or partner with the organization. Staff run it from a Livewire admin with posts, events, team members, gallery items, reviews and donor inquiries, plus media uploads, and they received a written admin handover guide.",
    category: "Nonprofit website",
    technologies: ["Laravel", "PHP", "Livewire", "Flux UI", "Tailwind CSS", "Vite"],
    image: "/projects/project-cham.webp",
    liveUrl: "https://projectcham.com",
    repoUrl: "https://github.com/Conqueror102/projectChame",
    live: true,
  },
  {
    slug: "tender-cradle",
    title: "Tender Cradle – Nursery Platform & Shop",
    summary: "A Montessori nursery’s website with online enrolment, a parents’ shop with Paystack checkout, a blog and a full admin dashboard.",
    description:
      "Tender Cradle is a playful, animated website for a Montessori nursery and childcare centre. Parents can explore programs and admissions, apply through an online enrolment form with document uploads, read the blog and buy nursery essentials in a shop with customer accounts, a cart, Paystack payments and order history. The admin dashboard covers orders, products, customers, enrolments, leads, newsletter subscribers, the team, the gallery and a rich-text blog editor. The React frontend talks to an Express and Prisma API on PostgreSQL that verifies payments with Paystack webhooks and idempotency keys.",
    category: "Product platform",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "TipTap", "Node.js", "Express", "Prisma", "PostgreSQL", "Paystack", "Zod", "JWT"],
    image: "/projects/tender-cradle.webp",
    liveUrl: "https://tendercradle.com",
    repoUrl: "https://github.com/LemonWares-Technology/tenderCradle",
    live: true,
  },
  {
    slug: "greenstone",
    title: "Greenstone – Real Estate Website & CMS",
    summary: "A website for a Lagos and Abuja property developer, with projects, services and blog managed from its own admin.",
    description:
      "Greenstone Developments has been building homes and mixed-use properties across Lagos and Abuja for over two decades. The website presents its projects, services, team, gallery and blog behind a full-screen hero carousel of its developments, and turns visitors into leads through contact and newsletter forms. Everything is editable from an admin dashboard: projects, services, blog posts in a rich-text editor, team members with draft and published states, the gallery and subscribers. A separate Express and Prisma API on PostgreSQL powers it, with ZeptoMail for email.",
    category: "Client website",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "TipTap", "Node.js", "Express", "Prisma", "PostgreSQL", "ZeptoMail", "Zod"],
    image: "/projects/greenstone.webp",
    repoUrl: "https://github.com/LemonWares-Technology/greenstoneFrontend-",
  },
  {
    slug: "ifaf",
    title: "IFAF – Festival Website & Ticketing",
    summary: "The website and ticketing system for the International Food and Arts Festival in Lagos, with bank-transfer payments and QR check-in.",
    description:
      "IFAF, the International Food and Arts Festival, brings global food, art, music and tradition together for one day in Lagos. The website tells the festival’s story and sells tickets without a card processor: guests reserve places, get a private booking link and upload their bank transfer receipt. Admins review each receipt and approve it against a bank transaction reference that can never be used twice. Approved bookings get printable tickets with one QR code per attendee, and staff check guests in at the door by camera scan or code. Unpaid reservations expire on a schedule, receipts stay private to admins, and prices, capacity and bank details are all managed from the admin settings.",
    category: "Event platform",
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS", "Vite", "SQLite", "Pest"],
    image: "/projects/ifaf.webp",
    repoUrl: "https://github.com/Conqueror102/IFAF",
  },
  {
    slug: "lemonwaresex",
    title: "LemonWaresEX – FX Conversion API",
    summary: "A currency conversion platform and developer API that prices both official and parallel-market exchange rates, with exact decimal math.",
    description:
      "LemonWaresEX solves the gap between official central-bank rates and the street rates people actually trade at in markets like Nigeria. It ingests ECB rates and parallel-market rates, handles bid and ask spreads and cross-rate triangulation, and does every calculation with arbitrary-precision decimals. Developers get a metered REST API with API keys, tiered rate limits and request analytics.",
    category: "Fintech & APIs",
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS", "Pest", "Fly.io"],
    image: "/projects/lemonwaresex.webp",
    repoUrl: "https://github.com/Conqueror102/currencyConverter",
  },
  {
    slug: "course-correct",
    title: "Course Correct – University Course Platform",
    summary: "A paid learning platform for university students with video, audio and PDF lessons, Paystack payments, passkey access and single-device login.",
    description:
      "Course Correct sells course content to university students by level and semester. Admins upload video (streamed through Mux), audio and PDF lessons; students pay with Paystack or unlock courses with passkeys, and single-device login keeps paid accounts from being shared.",
    category: "Product platform",
    technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Mux", "Cloudinary", "Paystack"],
    image: "/projects/course-correct.webp",
    repoUrl: "https://github.com/Conqueror102/courseCorrectBE",
  },
  {
    slug: "lodgely",
    title: "Lodgely – Accommodation Platform Website",
    summary: "The website for a property and student-accommodation platform in Nigeria and Rwanda, built for search visibility from day one.",
    description:
      "Lodgely is building digital accommodation and property infrastructure for Africa, starting with student housing in Nigeria and Rwanda. The website covers students, landlords, agents and universities with dedicated pages, city and university landing pages, housing guides and trust-and-safety content, all with per-page metadata, structured sitemaps and share images.",
    category: "Client website",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/lodgely.webp",
  },
  {
    slug: "modupe-olusoga",
    title: "Modupe Olusoga – Personal Brand Platform",
    summary: "A thought-leadership website for speaking, mentorship and insights, currently in development.",
    description:
      "A personal brand platform for Modupe Olusoga that connects institution building with individual development. Speaking, mentorship, session requests and insights lead the experience, with organizations as supporting evidence of leadership and impact. The editorial hero and enquiry form are built; the programme pages and content admin are next.",
    category: "Personal brand website",
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS", "Vite"],
    image: "/projects/modupe-olusoga.webp",
    repoUrl: "https://github.com/Conqueror102/brand_portfolio",
    note: "In development",
  },
  {
    slug: "medark",
    title: "Medark – Medical Staffing Platform",
    summary: "A recruitment platform that connects hospitals directly with qualified healthcare professionals.",
    description:
      "Medark is a web application that streamlines recruitment in the medical industry by connecting hospitals directly with qualified healthcare professionals.",
    category: "Web application",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS", "Cloudinary", "Multer", "Nodemailer"],
    image: "/projects/med-ark.png",
    liveUrl: "https://med-ark.vercel.app/",
    repoUrl: "https://github.com/Conqueror102/medArk",
  },
  {
    slug: "lims",
    title: "LIMS – IT Solutions SaaS Website",
    summary: "A responsive website for an IT solutions company with services, products, projects and a working contact form.",
    description:
      "A modern, responsive SaaS website built for an IT solutions company. It features pages for services, products, projects, and company information, with a fully functional contact form and clean, professional UI.",
    category: "Client website",
    technologies: ["React", "Vite", "Tailwind CSS", "Axios", "Yup", "Node.js", "Express", "MongoDB"],
    image: "/projects/lims.png",
    liveUrl: "https://wearelims.com",
    live: true,
  },
  {
    slug: "peviacom",
    title: "Peviacom – Solar Energy eCommerce",
    summary: "A solar energy company website that showcases renewable solutions and sells solar products.",
    description:
      "Peviacom is a web platform for a solar energy company, designed to showcase renewable energy solutions and sell solar products through an integrated eCommerce-style interface.",
    category: "Client website",
    technologies: ["React", "Vite", "Material UI", "Google Sheets"],
    image: "/projects/peviacom.png",
    liveUrl: "https://peviacom.com",
    live: true,
  },
  {
    slug: "study-abroad-consultancy",
    title: "Study Abroad Consultancy Website",
    summary: "A website for an agency that helps students apply to UK universities.",
    description:
      "A professional, modern website built for a study abroad consultancy agency that specializes in helping students apply to UK universities.",
    category: "Client website",
    technologies: ["React", "Vite", "Tailwind CSS", "Axios", "Yup", "Node.js", "Express", "MongoDB", "Cloudinary", "Multer"],
    image: "/projects/WAS.png",
    liveUrl: "https://uk-master-class-project.vercel.app/",
    live: true,
  },
  {
    slug: "show-royal-meal",
    title: "Show Royal Meal – Bread Booking App",
    summary: "An SEO-friendly bakery ordering site with an admin panel for products, bookings and uploads.",
    description:
      "An SEO-friendly bread booking platform that lets customers place orders online. Includes an admin panel for managing products, bookings, and uploads.",
    category: "Web application",
    technologies: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "TanStack Query", "Nodemailer"],
    image: "/projects/bread.png",
    liveUrl: "https://royal-meal-bakery.vercel.app/",
  },
  {
    slug: "ai-prompts-platform",
    title: "AI Prompts Platform",
    summary: "A platform to post, browse, rate and copy AI prompts, with feed filtering and authentication.",
    description:
      "A prompt-sharing platform where users can post, browse, rate, and copy AI prompts. Includes feed filtering, ratings, and user authentication.",
    category: "Web application",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "shadcn/ui", "NextAuth"],
    image: "/projects/ai.png",
    liveUrl: "https://aiprompt-feeds.vercel.app/",
    repoUrl: "https://github.com/Conqueror102/Aiprompt-feeds",
  },
  {
    slug: "celymed-logistics",
    title: "Celymed – Logistics & Transport Website",
    summary: "An SEO-optimized website for a logistics company with WhatsApp and call contact options.",
    description:
      "A clean, SEO-optimized website for a logistics and transport company. Designed to build brand awareness, showcase services, and enable easy contact via WhatsApp and call options.",
    category: "Client website",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/logis.png",
    liveUrl: "https://celymed-logistic.vercel.app/",
  },
  {
    slug: "ronix-kitchen",
    title: "Ronix Kitchen – Food Ordering Website",
    summary: "A food ordering site for Nigerian cuisine with featured meals and online orders.",
    description:
      "A modern food delivery platform for Nigerian cuisine. Users can browse dishes, view featured meals, and place orders. Built for responsiveness, speed, and customer engagement.",
    category: "Web application",
    technologies: ["React", "Node.js", "Express", "Tailwind CSS", "Multer"],
    image: "/projects/food.png",
    liveUrl: "https://ronix-kitchen.vercel.app/",
  },
  {
    slug: "kode10x-quiz-app",
    title: "Kode10x Quiz App",
    summary: "A timed quiz app I built for Kode10x to assess new students during intake.",
    description:
      "When Kode10x takes in new students to teach, it needs a fair way to assess them first. I built this quiz application for that intake: each applicant sits a timed, personalised quiz, and Kode10x uses the results in its enrolment. It has since been used to assess many students coming into Kode10x’s classes. The front end is React, with Node.js, Express and MongoDB behind it.",
    category: "Web application",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS", "Google Sheets"],
    image: "/projects/quiz-app.png",
    liveUrl: "https://kode10x-quiz-app.vercel.app/",
    repoUrl: "https://github.com/kode10x-org/Kode10x-quiz-app",
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
