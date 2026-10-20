"use client"

import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseIcon,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MessageSquare,
  Users,
  Code,
  Palette,
  Smartphone,
  Search,
  ShoppingCart,
  Wrench,
  Type,
  Terminal,
  PenTool as Figma,
  Database,
} from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/icons/brand"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { sendContactMessage } from "@/lib/contact"


export default function ClientPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 font-sans text-gray-800">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        {/* <TestimonialsSection /> */}
        <ProcessSection />
        <EducationSection />
        {/* <BlogSection /> */}
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  // Dropdown state
  const [open, setOpen] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [userType, setUserType] = React.useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('portfolioUserType') || 'client' : 'client'
  );

  
  const handleSwitch = (type: string) => {
    setUserType(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioUserType', type);
      window.location.reload();
    }
  };

  // Only relevant links for client portfolio
  const navLinks = ["Home", "About", "Services", "Skills", "Projects", "Contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="container mx-auto md:px-16 sm:px-6 max-sm:py-1 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl flex items-center font-bold hover:text-blue-600 transition-colors">
            <div>
              <img src="/images/logo.jpg" alt="" className="h-14 w-14"/>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
             &lt;Victor Conqueror/&gt;
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
{/* Dropdown for switching views */}
<div className="relative max-sm:hidden">
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-full font-semibold shadow-sm hover:shadow-lg focus:outline-hidden"
                onClick={() => setOpen((prev) => !prev)}
              >
                {userType === 'developer' ? 'Developer View' : 'Client View'}
                <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-t-lg ${userType === 'client' ? 'font-bold text-blue-600' : ''}`}
                    onClick={() => { handleSwitch('client'); setOpen(false); }}
                  >
                    Client View
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-b-lg ${userType === 'developer' ? 'font-bold text-blue-600' : ''}`}
                    onClick={() => { handleSwitch('developer'); setOpen(false); }}
                  >
                    Developer View
                  </button>
                </div>
              )}
            </div>
            
            {/* Hamburger for mobile */}
            <button className="md:hidden  text-blue-500 bg-blue-500/10 rounded-full p-2" onClick={() => setMobileMenu((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out z-40 ${mobileMenu ? 'max-h-[500px] opacity-100 ' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <nav className="flex flex-col gap-2 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 pointer-events-auto">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-600 hover:text-blue-600 transition-colors text-base font-medium py-2 px-2 rounded-lg"
                onClick={() => setMobileMenu(false)}
              >
                {item}
              </a>
            ))}
            {/* Client/Developer view dropdown in mobile menu */}
            <div className="mt-4 border-t pt-3">
              <div className="font-semibold text-xs text-gray-500 mb-2 pl-1">View Mode</div>
              <div className="flex flex-col gap-1">
                <button
                  className={`w-full text-left px-4 py-2 rounded-sm ${userType === 'client' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-blue-50 text-gray-700'}`}
                  onClick={() => { handleSwitch('client'); setMobileMenu(false); }}
                >
                  Client View
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-sm ${userType === 'developer' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-blue-50 text-gray-700'}`}
                  onClick={() => { handleSwitch('developer'); setMobileMenu(false); }}
                >
                  Developer View
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="home" className="pt-20 md:pt-32 pb-10 md:pb-20  md:px-16 overflow-hidden">
      <div className="container mx-auto px-4  sm:px-6">
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 z-10">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-blue-700/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
              <h1 className="text-5xl sm:text-4xl md:text-6xl font-bold mb-1 leading-tight animate-fade-in text-gray-800">Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400">Victor Onyemaechi</span></h1>
             
              <div className="text-2xl py-3 max-sm:py-1 sm:text-3xl md:text-5xl">Frontend Engineer & Server Architecturer</div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl animate-fade-in-delay">
                I craft beautiful, functional digital experiences with a focus on clean design and intuitive user
                interfaces. Helping businesses stand out in the digital landscape.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-blue-400 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-delay-2"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-delay-2"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10 w-full max-w-[400px] sm:max-w-xs md:max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-blue-700 shadow-2xl transform md:rotate-3 hover:rotate-0 transition-all duration-500">
              <Image src="/images/me3.jpg" alt="Victor Onyemaechi" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
   { value: "75%↑",  label: "Tech Stack Familiarity" },
    { value: "10+", label: "Projects Completed" },
    { value: "14+", label: "Satisfied Users" },
  ]

  return (
    <section className="py-12  md:px-16">
      <div className="container mx-auto px-6">
        <div className="bg-blue-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-8 text-center ${index < stats.length - 1 ? "border-r border-gray-100" : ""}`}
              >
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src="/images/me3.jpg" alt="Victor Onyemaechi" fill className="object-cover" priority />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="inline-block mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-1 text-gray-800">About Me</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full"></div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
               I'm a passionate Full Stack Developer with expertise in building modern web applications. With over 1 years of experience, I specialize in creating responsive, user-friendly interfaces and robust backend systems.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                My approach combines technical expertise with an eye for design, allowing me to build solutions that are
                both functional and visually stunning. I'm constantly learning new technologies and techniques to stay
                at the cutting edge of web development.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/victor-onyemaechi-cv.pdf" 
                  download 
                  className="inline-flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
                <Link
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-700 to-blue-400 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Hire Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-8 h-8 " />,
      title: "Web Development",
      description: "Building responsive, high-performance websites and web applications using the latest technologies.",
    },
    {
      icon: <Palette className="w-8 h-8 " />,
      title: "UI/UX Design",
      description: "Creating intuitive, user-friendly interfaces with a focus on aesthetics and functionality.",
    },
    {
      icon: <Smartphone className="w-8 h-8 " />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications for iOS and Android devices.",
    },
    {
      icon: <Search className="w-8 h-8 " />,
      title: "SEO Optimization",
      description: "Improving website visibility and search engine rankings through proven SEO strategies.",
    },
    {
      icon: <ShoppingCart className="w-8 h-8 " />,
      title: "E-commerce Solutions",
      description: "Building online stores with secure payment processing and inventory management.",
    },
    {
      icon: <Wrench className="w-8 h-8 " />,
      title: "Maintenance & Support",
      description: "Providing ongoing maintenance, updates, and technical support for web applications.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">My Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl text-blue-500  bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-gradient-to-r from-blue-500 to-blue-400 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skills = [
    { name: "React", level: 90, icon: <Code className="w-5 h-5 " /> },
    { name: "Next.js", level: 85, icon: <Code className="w-5 h-5 " /> },
    { name: "TypeScript", level: 80, icon: <Type className="w-5 h-5 " /> },
    { name: "Tailwind CSS", level: 95, icon: <Palette className="w-5 h-5 " /> },
    { name: "UI/UX Design", level: 85, icon: <Figma className="w-5 h-5 " /> },
    { name: "Node.js", level: 75, icon: <Database className="w-5 h-5 " /> },
  ]

  const otherSkills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Redux",
    "Framer Motion",
    "MongoDB",
    "Express",
    "Firebase",
    "Material UI",
    "Vite",
    "Axios",
    "Git",
    "GitHub",
    "Shadcn UI",
    "Tailwind CSS",
    "Node.js",
    "TypeScript",
    "SuperBase",
    "TankStack"
  ]

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">My Skills</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 flex items-center text-blue-500 justify-center bg-blue-500/10 rounded-lg mr-3 text-lg shadow-xs">
                    {skill.icon}
                  </span>
                  <span className="font-medium text-gray-800">{skill.name}</span>
                </div>
                <span className="text-gray-500">{skill.level}%</span>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Other Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "A Saas Website",
      description: "A modern, responsive SaaS website built for an IT solutions company. It features pages for services, products, projects, and company information, with a fully functional contact form and clean, professional UI.",
      image: "/projects/lims.png",
      tags: ["Next.js", "React", "Tailwind CSS", "NodeMailer", "Google Sheet"],
      demoLink: "https:wearelims.com",
      githubLink: "https://github.com/Conqueror102?tab=repositories",
    },
   {
  title: "AI Prompts Platform",
  description: "A prompt-sharing platform where users can post, browse, rate, and copy AI prompts. Includes feed filtering, ratings, and user authentication.",
  image: "/projects/ai.png",
  tags: ["Next.js", "MongoDB", "Tailwind CSS", "Shadcn UI", "NextAuth"],
  demoLink: "https://aiprompt-feeds.vercel.app/",
  githubLink: "https://github.com/Conqueror102/Aiprompt-feeds"
},
{
  title: "Time Wise – Staff Attendance System",
  description: "A staff attendance tracking app with QR code check-in, photo capture on clock-in, and admin controls for user registration, lateness rules, and daily logs.",
  image: "/projects/checkIn.png",
  tags: ["Next.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "QR Code"],
  demoLink: "https://time-wise-check-in-out.vercel.app",
  githubLink: "https://github.com/Conqueror102/TimeWise-CheckIn-Out"
},

{
  title: "Show Royal Meal – Bread Booking App",
  description: "An SEO-friendly bread booking platform that lets customers place orders online. Includes an admin panel for managing products, bookings, and uploads.",
  image: "/projects/bread.png",
  tags: ["Next.js", "React", "TypeScript","Express", "MongoDB", "Tailwind CSS", "Cloudinary", "Multer", "TanStack", "Nodemailer"],
  demoLink: "https://royal-meal-bakery.vercel.app/", // if available
  githubLink: "https://github.com/Conqueror102" // adjust if specific repo
},

{
  title: "Celymed – Logistics & Transport Website",
  description: "A clean, SEO-optimized website for a logistics and transport company. Designed to build brand awareness, showcase services, and enable easy contact via WhatsApp and call options.",
  image: "/projects/logis.png",
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  demoLink: "https://celymed-logistic.vercel.app/",
  githubLink: "https://github.com/Conqueror102" // replace if there's a specific repo
},

{
  title: "Ronix Kitchen – Food Ordering Website",
  description: "A modern food delivery platform for Nigerian cuisine. Users can browse dishes, view featured meals, and place orders. Built for responsiveness, speed, and customer engagement.",
  image: "/projects/food.png",
  tags: ["React", "Node.js", "Tailwind CSS", "Express", "Multer"],
  demoLink: "https://ronix-kitchen.vercel.app/",
  githubLink: "https://github.com/Conqueror102" // update if there's a dedicated repo
},



    {
      title: "A Fashion E-commerce Website",
      description: "A simple static fashion eCommerce website built using HTML and CSS, showcasing product listings, pricing, and a contact page.",
      image: "/projects/gentle.png",
      tags: ["React", "Framer Motion", "Tailwind CSS"],
      demoLink: "https://gentle-men101.vercel.app/",
      githubLink: "https://github.com/Conqueror102/gentlemen-ecommerce",
    },
    {
      title: "Medical staffing platform",
      description: "Medark is an innovative web application designed to streamline the recruitment process in the medical industry by directly connecting hospitals with qualified healthcare professionals.",
      image: "/projects/med-ark.png",
      tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      demoLink: "https://med-ark.vercel.app/",
      githubLink: "https://github.com/Conqueror102/medArk",
    },
    {
      title: "Study Abroad Consultancy Website",
      description: "A professional, modern website built for a study abroad consultancy agency that specializes in helping students apply to UK universities.",
      image: "/projects/WAS.png",
      tags: ["React","Vite","Tailwind CSS","Axios","Yup","Node.js","Express","MongoDB","Cloudinary","Multer"],
      demoLink: "https://uk-master-class-project.vercel.app/",
      githubLink: "https://github.com/Conqueror102?tab=repositories",
    },
    {
      title: "Solar Energy Solutions & Product eCommerce Website",
      description: "Peviacom is a modern web platform for a solar energy company, designed to showcase renewable energy solutions and sell solar products through an integrated eCommerce-like interface.",
      image: "/projects/peviacom.png",
      tags: ["React","Vite","Material UI","Google Sheet"],
      demoLink: "https://peviacom.com",
      githubLink: "https://github.com/Conqueror102?tab=repositories",
    },
    {
      title: "Quiz App",
      description: "A modern, interactive quiz application built with React, designed to deliver a smooth, timed, and personalized quiz experience for users.",
      image: "/projects/quiz-app.png",
      tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS","Google Sheet" ],
      demoLink: "https://kode10x-quiz-app.vercel.app/",
      githubLink: "https://github.com/kode10x-org/Kode10x-quiz-app",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">My Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>
          <div className="flex justify-center mb-8">
         
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white backdrop-blur-xs rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Link
                      href={project.demoLink}
                      className="text-blue-500 hover:text-blue-400 font-medium text-sm flex items-center transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                    <Link
                      href={project.githubLink}
                      className="text-gray-600 hover:text-blue-500 font-medium text-sm flex items-center transition-colors"
                    >
                      <Github className="mr-1 h-4 w-4" />
                      Code
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  // Implementation of TestimonialsSection
}

function ProcessSection() {
  const process = [
    {
      icon: <Users size={24} />,
      title: "Discovery",
      description:
        "Understanding your business needs, target audience, and project goals through in-depth consultation.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Planning",
      description: "Creating a detailed project roadmap, wireframes, and technical specifications.",
    },
    {
      icon: <BriefcaseIcon size={24} />,
      title: "Development",
      description: "Building your project using modern technologies and best practices for optimal performance.",
    },
    {
      icon: <Award size={24} />,
      title: "Delivery",
      description: "Rigorous testing, refinement, and launching your project with ongoing support and maintenance.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">My Work Process</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row  justify-between relative max-sm:items-start">
            <div className="hidden md:block absolute top-[74px] left-0 right-0 h-1 bg-gradient-to-r from-blue-700 to-blue-400 transform -translate-y-1/2 z-0"></div>

            {process.map((step, index) => (
              <div key={index} className="md:w-1/4 relative z-10  mb-10 md:mb-0">
                <div className="flex flex-col md:items-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6 text-blue-500">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="md:text-center text-gray-600 px-4 max-sm:p-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  const education = [
    {
      degree: "Software Engineer",
      institution: "Kode10x",
      period: "2024 - 2025",
      description: "Specialized in Frontend development and Server side architecture, with emphasis on scalable web applications.",
    },
    {
      degree: "Computer Engineer",
      institution: "Inland Computers",
      period: "2017 - 2024",
      description: "Trained in computer hardware, networking, and embedded systems.",
    },
  ]

  // const certifications = [
  //   {
  //     title: "Certified JavaScript Developer",
  //     issuer: "Kode10x",
  //     date: "2024",
  //   },
  //   {
  //     title: "Git",
  //     issuer: "Kode10x",
  //     date: "2024",
  //   },
  //   {
  //     title: "Responsive Web Design",
  //     issuer: "Kode10x",
  //     date: "2024",
  //   },
  //   {
  //     title: "Certificate in Computer Hardware Maintenance",
  //     issuer: "Inland Computers",
  //     date: "2024",
  //   },
  // ]

  return (
    <section id="education" className="py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Education & Certifications</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>

          <div className="grid  gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <GraduationCap className="mr-3 text-blue-500" />
                Education
              </h3>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
                    <div className="absolute h-full w-1 bg-gradient-to-b from-blue-500 to-blue-400 left-0 top-0 rounded-l-2xl"></div>
                    <div className="pl-4">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{item.degree}</h4>
                      <p className="text-blue-500 font-medium mb-2">{item.institution}</p>
                      <p className="text-gray-500 text-sm mb-3">{item.period}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <Award className="mr-3 text-violet-500" />
                Certifications
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-bold text-gray-800">{cert.title}</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-violet-500">{cert.issuer}</span>
                        <span className="text-gray-500">{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}



function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = React.useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsLoading(true)
    try {
      const message = await sendContactMessage(formData)
      setStatus({ type: "success", message })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Something went wrong." })
    } finally {
      setIsLoading(false)
    }
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className="py-20 relative bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 z-10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Get In Touch</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mb-6 mx-0 md:mx-auto"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-500/10 to-blue-400/10 backdrop-blur-xs">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                <p className="mb-8 text-gray-600">
                  I'd love to hear from you. Fill out the form or reach out directly through the following channels:
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 text-blue-500" />
                    <span className="text-gray-700">victorvector608@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-6 w-6 mr-4 flex items-center justify-center text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">+234 802 538 3208</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-6 w-6 mr-4 flex items-center justify-center text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Lagos, Nigeria</span>
                  </div>
                </div>
                <div className="mt-12 flex space-x-4">
                  <Link
                    href="https://x.com/TECH_snitch101?t=1MXTBHsRp_tx9nFgz7iNAA&s=09"
                    className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors text-blue-500 shadow-xs"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/victor-conqueror-956635327/"
                    className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors text-blue-500 shadow-xs"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com/Conqueror102"
                    className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors text-blue-500 shadow-xs"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://wa.me/+2348025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors text-blue-500 shadow-xs"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="p-8 md:p-12">
                {status && (
                  <div className={`mb-4 px-4 py-3 rounded-xl text-center font-medium ${status.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                    {status.message}
                  </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      id="name"
                      name="name"
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      id="email"
                      name="email"
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-hidden transition-all"
                      placeholder="Project inquiry"
                    />
                  </div> */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "I offer web development, UI/UX design, mobile app development, e-commerce solutions, SEO optimization, and ongoing maintenance and support services.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "What is your design process?",
      answer:
        "My design process involves discovery (understanding your needs), planning (wireframes and mockups), design implementation, feedback and revisions, and final delivery. I keep you involved throughout the process.",
    },
    {
      question: "Do you provide maintenance after project completion?",
      answer:
        "Yes, I offer ongoing maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. This includes regular updates, security patches, and technical support.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-0 md:mx-auto">
              Answers to common questions about my services, process, and workflow.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Have more questions? Feel free to reach out directly.</p>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-white  bg-gradient-to-r from-blue-700 to-blue-400 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium  "
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8  md:px-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
              Victor Onyemaechi
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              I create beautiful, functional websites and applications that help businesses grow and succeed in the digital world.
            </p>
            <div className="flex space-x-4 ">
              <Link
                href="https://x.com/TECH_snitch101?t=1MXTBHsRp_tx9nFgz7iNAA&s=09"
                className="bg-white shadow-xs p-3 rounded-full hover:bg-gray-200 transition-colors text-blue-500"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/victor-conqueror-956635327/"
                className="bg-white shadow-xs p-3 rounded-full hover:bg-gray-200 transition-colors text-blue-500"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/Conqueror102"
                className="bg-white shadow-xs p-3 rounded-full hover:bg-gray-200 transition-colors text-blue-500"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/+2348025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors text-blue-500 shadow-xs"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-500">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-500">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-blue-500 mt-1" />
                <span className="text-gray-600">victorvector608@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center text-blue-500 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600">+234 802 538 3208</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center text-blue-500 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Victor Onyemaechi. All rights reserved.</p>
        
        </div>
      </div>
    </footer>
  )
} 