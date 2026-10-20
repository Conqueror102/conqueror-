"use client"

import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { VSCodeLayout } from "./vscode-layout"
import { LoadingPlaceholder } from "./loading-placeholder"
import { Modal } from "./modal"
import ClientPortfolio from "./client-portfolio"
import { projects } from "@/content"

// Import components with SSR enabled but with loading states
const Hero = dynamic(() => import("../sections/hero").then((mod) => mod.Hero), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const About = dynamic(() => import("../sections/about").then((mod) => mod.About), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Skills = dynamic(() => import("../sections/skills").then((mod) => mod.Skills), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Services = dynamic(() => import("../sections/services").then((mod) => mod.Services), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Education = dynamic(() => import("../sections/education").then((mod) => mod.Education), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Projects = dynamic(() => import("../sections/projects").then((mod) => mod.Projects), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const ImageGallery = dynamic(() => import("../sections/image-gallery").then((mod) => mod.ImageGallery), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Contact = dynamic(() => import("../sections/contact").then((mod) => mod.Contact), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

interface VSCodePortfolioProps {
  initialSection?: string
}

export function VSCodePortfolio({ initialSection = "Home.jsx" }: VSCodePortfolioProps) {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isMounted, setIsMounted] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const galleryImages = projects.map((project) => ({
    src: project.image,
    alt: `${project.title} screenshot`,
    caption: project.title,
  }))

  useEffect(() => {
    setIsMounted(true)
    const storedType = typeof window !== 'undefined' ? localStorage.getItem('portfolioUserType') : null
    if (storedType) {
      setUserType(storedType)
    } else {
      setShowModal(true)
    }
  }, [])

  const handleUserType = (type: string) => {
    setUserType(type)
    localStorage.setItem('portfolioUserType', type)
    setShowModal(false)
  }

  if (!isMounted) {
    return (
      <div className="h-screen w-full bg-[#1E1E1E] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-lg">Loading Portfolio...</div>
        </div>
      </div>
    )
  }

  if (showModal) {
    return (
      <Modal>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Who are you?</h2>
          <p className="mb-6 text-gray-500">Choose your experience:</p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#007ACC] hover:bg-[#005A9E] text-white px-6 py-2 rounded-md font-semibold transition" onClick={() => handleUserType('developer')}>Developer</button>
            <button className="bg-[#252526] hover:bg-[#007ACC] text-white px-6 py-2 rounded-md font-semibold border border-[#3C3C3C] transition" onClick={() => handleUserType('client')}>Client</button>
          </div>
        </div>
      </Modal>
    )
  }

  if (userType === 'client') {
    return <ClientPortfolio />
  }

  return (
    <VSCodeLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      <Suspense fallback={<LoadingPlaceholder height="600px" />}>
        {activeSection === "Home.jsx" && <Hero />}
        {activeSection === "AboutMe.jsx" && <About />}
        {activeSection === "Skills.jsx" && <Skills />}
        {activeSection === "Services.jsx" && <Services setActiveSection={setActiveSection} />}
        {activeSection === "Education.jsx" && <Education />}
        {activeSection === "Projects.jsx" && <Projects />}
        {activeSection === "Gallery.jsx" && <ImageGallery images={galleryImages} />}
        {activeSection === "Contact.jsx" && <Contact />}
      </Suspense>
    </VSCodeLayout>
  )
}
