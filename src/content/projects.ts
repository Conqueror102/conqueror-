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
}

export const projects: Project[] = [
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
    featured: true,
  },
  {
    slug: "time-wise",
    title: "Time Wise – Staff Attendance System",
    summary: "Staff attendance tracking with QR code check-in, photo capture on clock-in and admin controls.",
    description:
      "A staff attendance tracking app with QR code check-in, photo capture on clock-in, and admin controls for user registration, lateness rules, and daily logs.",
    category: "Web application",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "QR Code"],
    image: "/projects/checkIn.png",
    liveUrl: "https://time-wise-check-in-out.vercel.app",
    repoUrl: "https://github.com/Conqueror102/TimeWise-CheckIn-Out",
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    summary: "An interactive, timed and personalized quiz application.",
    description:
      "A modern, interactive quiz application built with React, designed to deliver a smooth, timed, and personalized quiz experience for users.",
    category: "Web application",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS", "Google Sheets"],
    image: "/projects/quiz-app.png",
    liveUrl: "https://kode10x-quiz-app.vercel.app/",
    repoUrl: "https://github.com/kode10x-org/Kode10x-quiz-app",
  },
  {
    slug: "gentle-men",
    title: "Gentle Men – Fashion eCommerce (early project)",
    summary: "A static fashion store built with HTML and CSS while learning.",
    description:
      "A simple static fashion eCommerce website built with HTML and CSS during my beginner days, showcasing product listings, pricing, and a contact page.",
    category: "Learning project",
    technologies: ["HTML", "CSS"],
    image: "/projects/gentle.png",
    liveUrl: "https://gentle-men101.vercel.app/",
    repoUrl: "https://github.com/Conqueror102/gentlemen-ecommerce",
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
