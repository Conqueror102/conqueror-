"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  ChevronRight,
  FileCode,
  X,
  Code,
  Settings,
  Search,
  FileText,
  Mail,
  Briefcase,
  GraduationCap,
  Layers,
  MessageSquare,
  ImageIcon,
} from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/icons/brand"
import { cn } from "@/lib/utils"

interface VSCodeLayoutProps {
  children: React.ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
}

// VS Code themes
const themes = {
  "Dark+ (default)": {
    id: "dark-plus",
    background: "#1E1E1E",
    foreground: "#D4D4D4",
    sidebarBackground: "#252526",
    sidebarForeground: "#CCCCCC",
    activityBarBackground: "#333333",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#1E1E1E",
    tabInactiveBackground: "#2D2D2D",
    statusBarBackground: "#007ACC",
    statusBarForeground: "#FFFFFF",
    borderColor: "#3C3C3C",
    accentBlue: "#569CD6",
    accentGreen: "#6A9955",
    accentOrange: "#CE9178",
    accentPurple: "#C586C0",
  },
  "Light+ (default light)": {
    id: "light-plus",
    background: "#FFFFFF",
    foreground: "#333333",
    sidebarBackground: "#F3F3F3",
    sidebarForeground: "#6F6F6F",
    activityBarBackground: "#2C2C2C",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#FFFFFF",
    tabInactiveBackground: "#ECECEC",
    statusBarBackground: "#007ACC",
    statusBarForeground: "#FFFFFF",
    borderColor: "#DDDDDD",
    accentBlue: "#0000FF",
    accentGreen: "#008000",
    accentOrange: "#A31515",
    accentPurple: "#AF00DB",
  },
  Monokai: {
    id: "monokai",
    background: "#272822",
    foreground: "#F8F8F2",
    sidebarBackground: "#2D2D2D",
    sidebarForeground: "#CCCCCC",
    activityBarBackground: "#333333",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#272822",
    tabInactiveBackground: "#3E3D32",
    statusBarBackground: "#007ACC",
    statusBarForeground: "#FFFFFF",
    borderColor: "#3C3C3C",
    accentBlue: "#66D9EF",
    accentGreen: "#A6E22E",
    accentOrange: "#FD971F",
    accentPurple: "#AE81FF",
  },
  GitHub: {
    id: "github",
    background: "#FFFFFF",
    foreground: "#24292E",
    sidebarBackground: "#F6F8FA",
    sidebarForeground: "#24292E",
    activityBarBackground: "#24292E",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#FFFFFF",
    tabInactiveBackground: "#F6F8FA",
    statusBarBackground: "#24292E",
    statusBarForeground: "#FFFFFF",
    borderColor: "#E1E4E8",
    accentBlue: "#0366D6",
    accentGreen: "#28A745",
    accentOrange: "#F97583",
    accentPurple: "#6F42C1",
  },
  "Night Owl": {
    id: "night-owl",
    background: "#011627",
    foreground: "#D6DEEB",
    sidebarBackground: "#011627",
    sidebarForeground: "#D6DEEB",
    activityBarBackground: "#0B2942",
    activityBarForeground: "#D6DEEB",
    tabActiveBackground: "#0B2942",
    tabInactiveBackground: "#01111D",
    statusBarBackground: "#0B2942",
    statusBarForeground: "#D6DEEB",
    borderColor: "#122D42",
    accentBlue: "#82AAFF",
    accentGreen: "#22DA6E",
    accentOrange: "#F78C6C",
    accentPurple: "#C792EA",
  },
}

export function VSCodeLayout({ children, activeSection, setActiveSection }: VSCodeLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<string>("Dark+ (default)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isMaximized, setIsMaximized] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Use default theme for initial server render
  const defaultTheme = themes["Dark+ (default)"]
  const [theme, setTheme] = useState(defaultTheme)

  // Update theme when currentTheme changes (client-side only)
  useEffect(() => {
    setTheme(themes[currentTheme as keyof typeof themes] || defaultTheme)
  }, [currentTheme, defaultTheme])

  // Handle mobile detection (client-side only)
  useEffect(() => {
    setIsMounted(true)

    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      if (isMobileView) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev)
  }, [])

  const sections = [
    { id: "Home.jsx", label: "Home.jsx", icon: <FileCode className="w-4 h-4 text-blue-400" /> },
    { id: "AboutMe.jsx", label: "AboutMe.jsx", icon: <FileCode className="w-4 h-4 text-green-400" /> },
    { id: "Skills.jsx", label: "Skills.jsx", icon: <FileCode className="w-4 h-4 text-yellow-400" /> },
    { id: "Services.jsx", label: "Services.jsx", icon: <FileCode className="w-4 h-4 text-red-400" /> },
    { id: "Education.jsx", label: "Education.jsx", icon: <FileCode className="w-4 h-4 text-indigo-400" /> },
    { id: "Projects.jsx", label: "Projects.jsx", icon: <FileCode className="w-4 h-4 text-orange-400" /> },
    { id: "Gallery.jsx", label: "Gallery.jsx", icon: <FileCode className="w-4 h-4 text-pink-400" /> },
    { id: "Contact.jsx", label: "Contact.jsx", icon: <FileCode className="w-4 h-4 text-purple-400" /> },
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: "https://github.com/Conqueror102", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/victor-conqueror-956635327/", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, url: "https://x.com/TECH_snitch101?t=7vmP5XNzi4doLq-7J22fhA&s=09", label: "Twitter" },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      url: "https://wa.me/08025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
      label: "WhatsApp",
    },
    { icon: <Mail className="w-5 h-5" />, url: "mailto:victorvector608@gmail.com", label: "Email" },
  ]

  // Dropdown state for switching views
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [userType, setUserType] = React.useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('portfolioUserType') || 'developer' : 'developer'
  );

  const handleSwitch = (type: string) => {
    setUserType(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioUserType', type);
      window.location.reload();
    }
  };

  // Server-side rendering fallback
  if (!isMounted) {
    return (
      <div
        
      >
        {/* Static version for server-side rendering */}
        <div
          className="flex items-center justify-between h-9 px-2 border-b"
          style={{ borderColor: defaultTheme.borderColor, backgroundColor: defaultTheme.activityBarBackground }}
        >
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <span className="text-xs opacity-70">VS Code Portfolio</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden ">
          {/* Static content area */}
          <div className="flex-1 overflow-auto p-4" style={{ backgroundColor: defaultTheme.background }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen font-mono text-sm transition-colors duration-200",
        isMaximized
          ? "fixed inset-0 z-50"
          : "border border-gray-700 rounded-lg shadow-xl mx-auto my-4 max-w-[1200px] h-[100vh]",
      )}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
      }}
    >
      {/* Window Controls Bar */}
      <div
        className="flex items-center justify-between h-9 px-2 border-b"
        style={{ borderColor: theme.borderColor, backgroundColor: theme.activityBarBackground }}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2 mr-4">
            <button className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80"></button>
            <button className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80" onClick={toggleMaximize}></button>
            <button className="w-3 h-3 rounded-full bg-[#27C93F] hover:opacity-80"></button>
          </div>
          <span className="text-xs opacity-70">VS Code Portfolio</span>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            className="bg-[#252526] border border-[#3C3C3C] text-[#CCCCCC] text-xs px-1 py-0.5 focus:outline-hidden max-w-[80px] sm:max-w-none"
            style={{ borderRadius: 2 }}
          >
            {Object.keys(themes).map((themeName) => (
              <option
                key={themeName}
                value={themeName}
                style={{ 
                  backgroundColor: '#252526',
                  color: '#CCCCCC'
                }}
              >
                {themeName}
              </option>
            ))}
          </select>
          {/* Dropdown for switching views (VS Code style) */}
          <div className="relative">
            <button
              className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-[#252526] border border-[#3C3C3C] text-xs text-[#CCCCCC] font-mono flex items-center gap-1 focus:outline-hidden"
              style={{ borderRadius: 2, minWidth: '80px', maxWidth: '100px' }}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              {userType === 'developer' ? 'Dev View' : 'Client View'}
              <svg className="w-3 h-3 text-[#CCCCCC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown && (
              <div
                className="absolute right-0 mt-1 w-28 sm:w-36 border border-[#3C3C3C] bg-[#252526] text-xs font-mono z-50"
                style={{ borderRadius: 2 }}
              >
                <button
                  className={`block w-full text-left px-2 sm:px-4 py-1 sm:py-2 transition-colors ${userType === 'client' ? 'bg-[#007ACC] text-white' : 'text-[#CCCCCC] hover:bg-[#2C2C32] hover:text-white'}`}
                  style={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                  onClick={() => { handleSwitch('client'); setOpenDropdown(false); }}
                >
                  Client View
                </button>
                <button
                  className={`block w-full text-left px-2 sm:px-4 py-1 sm:py-2 transition-colors ${userType === 'developer' ? 'bg-[#007ACC] text-white' : 'text-[#CCCCCC] hover:bg-[#2C2C32] hover:text-white'}`}
                  style={{ borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }}
                  onClick={() => { handleSwitch('developer'); setOpenDropdown(false); }}
                >
                  Developer View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-auto ">
        {/* Activity Bar */}
        <div
          className="w-12 shrink-0 flex flex-col items-center py-2 border-r"
          style={{ backgroundColor: theme.activityBarBackground, borderColor: theme.borderColor }}
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-sm mb-2 hover:bg-white/20",
              isSidebarOpen && "border-l-2 border-white",
            )}
            title="Explorer"
          >
            <FileText className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button>

          {/* <button className="p-2 rounded-sm mb-2 hover:bg-white/20" title="Search">
            <Search className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button> */}
        {/* 
          <button className="p-2 rounded-sm mb-2 hover:bg-white/20" title="Source Control">
            <Code className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button> */}

          <button
            className="p-2 rounded-sm mb-2 hover:bg-white/20"
            title="Gallery"
            onClick={() => setActiveSection("Gallery.jsx")}
          >
            <ImageIcon className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button>

          <button
            className="p-2 rounded-sm mb-2 hover:bg-white/20"
            title="Services"
            onClick={() => setActiveSection("Services.jsx")}
          >
            <Layers className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button>

          <button
            className="p-2 rounded-sm mb-2 hover:bg-white/20"
            title="Education"
            onClick={() => setActiveSection("Education.jsx")}
          >
            <GraduationCap className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button>

          <button
            className="p-2 rounded-sm mb-2 hover:bg-white/20"
            title="Projects"
            onClick={() => setActiveSection("Projects.jsx")}
          >
            <Briefcase className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
          </button>

          <div className="mt-auto flex flex-col items-center space-y-2">
            {!isSidebarOpen &&
              socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-sm hover:bg-white/20"
                  title={link.label}
                >
                  {React.cloneElement(link.icon, { style: { color: theme.activityBarForeground } })}
                </a>
              ))}

            <button className="p-2 rounded-sm hover:bg-white/20" title="Settings">
              <Settings className="w-5 h-5" style={{ color: theme.activityBarForeground }} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="w-56 border-r shrink-0 flex flex-col"
            style={{ backgroundColor: theme.sidebarBackground, borderColor: theme.borderColor }}
          >
            <div className="p-2 text-xs font-semibold uppercase" style={{ color: theme.sidebarForeground }}>
              Explorer
            </div>

            <div className="p-2">
              <div className="flex items-center mb-1 text-xs font-semibold" style={{ color: theme.sidebarForeground }}>
                <ChevronRight className="w-4 h-4" />
                <span>VICTOR's-PORTFOLIO</span>
              </div>

              <ul className="space-y-1 pl-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center space-x-2 px-2 py-1 rounded-sm text-left",
                        activeSection === section.id && "bg-white/20",
                      )}
                      style={{ color: theme.sidebarForeground }}
                    >
                      {section.icon}
                      <span>{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto p-2">
              <div className="flex items-center mb-1 text-xs font-semibold" style={{ color: theme.sidebarForeground }}>
                <ChevronRight className="w-4 h-4" />
                <span>SOCIAL</span>
              </div>

              <ul className="space-y-1 pl-4">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-2 py-1 rounded-sm hover:bg-white/20"
                      style={{ color: theme.sidebarForeground }}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Tabs */}
          <div className="flex items-center h-9 border-b overflow-x-auto" style={{ borderColor: theme.borderColor }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "h-full px-3 py-1 flex items-center space-x-2 border-r",
                  activeSection === section.id ? "border-b-2" : "opacity-70",
                )}
                style={{
                  borderRightColor: theme.borderColor,
                  borderBottomColor: activeSection === section.id ? theme.accentBlue : "transparent",
                  backgroundColor:
                    activeSection === section.id ? theme.tabActiveBackground : theme.tabInactiveBackground,
                }}
              >
                {section.icon}
                <span className="hidden md:inline">{section.label}</span>
                {activeSection === section.id && <X className="w-3 h-3 ml-2 opacity-50 hover:opacity-100" />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4" style={{ backgroundColor: theme.background }}>
            {children}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-between h-6 px-2 text-xs"
        style={{ backgroundColor: theme.statusBarBackground, color: theme.statusBarForeground }}
      >
        <div className="flex items-center space-x-2">
          <span>main</span>
          <span>•</span>
          <span>JavaScript React</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  )
}
