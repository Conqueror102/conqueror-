import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Advance Quiz App",
      description: "A modern, interactive quiz application built with React, designed to deliver a smooth, timed, and personalized quiz experience for users.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS","Google Sheet" ],
      github: "https://github.com/kode10x-org/Kode10x-quiz-app",
      demo: "https://kode10x-quiz-app.vercel.app/",
      image: "/quiz-app.png",
    },
    {
      title: "Medical staffing platform",
      description:
        "Medark is an innovative web application designed to streamline the recruitment process in the medical industry by directly connecting hospitals with qualified healthcare professionals.",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "JavaScript", "Tailwind CSS", "Express", "Cloudinary", "Multer", "Nodemailer"],
      github: "https://github.com/Conqueror102/medArk",
      demo: "https://med-ark.vercel.app/",
      image: "/med-ark.png",
    },
    {
      title: "A Saas Website",
      description: "A modern, responsive SaaS website built for an IT solutions company. It features pages for services, products, projects, and company information, with a fully functional contact form and clean, professional UI.",
      technologies: ["React", "Vite", "Tailwind CSS", "Axios", "Yup", "node.js","Express.js","MongoDB"],
      github: "https://github.com/Conqueror102?tab=repositories",
      demo: "https:wearelims.com",
      image: "/lims.png",
      live:true
    },
    {
      title: "Study Abroad Consultancy Website",
      description: "A professional, modern website built for a study abroad consultancy agency that specializes in helping students apply to UK universities.",
      technologies: ["React","Vite","Tailwind CSS","Axios","Yup","Node.js",
"Express","MongoDB","Cloudinary","Multer",],
      github: "https://github.com/Conqueror102?tab=repositories",
      demo: "https://uk-master-class-project.vercel.app/",
      image: "/WAS.png",
      live:true
    },
    {
      title: "Solar Energy Solutions & Product eCommerce Website",
      description: "Peviacom is a modern web platform for a solar energy company, designed to showcase renewable energy solutions and sell solar products through an integrated eCommerce-like interface.",
      technologies: ["React","Vite","Material UI","Google Sheet"],
      github: "https://github.com/Conqueror102?tab=repositories",
      demo: "https://peviacom.com",
      image: "/peviacom.png",
      live:true
    },
    {
      title: "A Fashion E-commerce Website",
      description: "Gentle Men is A simple static fashion eCommerce website built using HTML and CSS during my beginner days, showcasing product listings, pricing, and a contact page. ⚠️ Note: HTML & CSS fashion eCommerce website project I built during my beginner days. The site may trigger a browser security warning due to lack of HTTPS, but it’s completely harmless and contains no malicious content. It was created solely for practice and learning purposes.",
      technologies: ["HTML", "CSS"],
      github: "https://github.com/Conqueror102/gentlemen-ecommerce",
      demo: "https://gentle-men101.vercel.app/",
      image: "/gentle.png",
    },

     {
  title: "AI Prompts Platform",
  description: "A prompt-sharing platform where users can post, browse, rate, and copy AI prompts. Includes feed filtering, ratings, and user authentication.",
  image: "/ai.png",
  technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Shadcn UI", "NextAuth"],
  demoLink: "https://aiprompt-feeds.vercel.app/",
  githubLink: "https://github.com/Conqueror102/Aiprompt-feeds"
},
{
  title: "Time Wise – Staff Attendance System",
  description: "A staff attendance tracking app with QR code check-in, photo capture on clock-in, and admin controls for user registration, lateness rules, and daily logs.",
  image: "/checkIn.png",
  technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "QR Code"],
  demoLink: "https://time-wise-check-in-out.vercel.app",
  githubLink: "https://github.com/Conqueror102/TimeWise-CheckIn-Out"
},

{
  title: "Show Royal Meal – Bread Booking App",
  description: "An SEO-friendly bread booking platform that lets customers place orders online. Includes an admin panel for managing products, bookings, and uploads.",
  image: "/bread.png",
  technologies: ["Next.js", "React", "TypeScript","Express", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "TanStack", "Nodemailer"],
  demoLink: "https://royal-meal-bakery.vercel.app/", // if available
  githubLink: "https://github.com/Conqueror102" // adjust if specific repo
},

{
  title: "Celymed – Logistics & Transport Website",
  description: "A clean, SEO-optimized website for a logistics and transport company. Designed to build brand awareness, showcase services, and enable easy contact via WhatsApp and call options.",
  image: "/logis.png",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  demoLink: "https://celymed-logistic.vercel.app/",
  githubLink: "https://github.com/Conqueror102" // replace if there's a specific repo
},

{
  title: "Ronix Kitchen – Food Ordering Website",
  description: "A modern food delivery platform for Nigerian cuisine. Users can browse dishes, view featured meals, and place orders. Built for responsiveness, speed, and customer engagement.",
  image: "/food.png",
  technologies: ["React", "Node.js", "Tailwind CSS", "Express", "Multer"],
  demoLink: "https://ronix-kitchen.vercel.app/",
  githubLink: "https://github.com/Conqueror102" // update if there's a dedicated repo
},



  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Projects</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">My Work</div>
        <div className="text-[#D4D4D4]">A collection of my recent development projects</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden hover:border-[#569CD6] transition-colors duration-200"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
         <div className="px-4 pt-3">
             {project.live && (
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-green-600 text-xs font-medium">Live</p>
        </div>
            )}
         </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#569CD6] text-lg font-bold">{project.title}</h3>
                <div className="flex space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4D4D4] hover:text-[#569CD6]"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4D4D4] hover:text-[#569CD6]"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-[#D4D4D4] mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-[#1E1E1E] text-[#CE9178] px-2 py-1 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#3C3C3C] bg-[#1E1E1E]">
              <div className="text-[#6A9955] text-xs">// View project details</div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
