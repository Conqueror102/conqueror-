"use client"

import React, { useEffect, useState, useRef } from "react"
import { Award, BarChart3, CheckCircle, Clock, Download, Layout } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Hero() {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const fullText =
    "const developer = {\n  name: 'Victor Onyemaechi',\n  title: 'Full Stack Developer',\n  skills: ['React', 'Next.js', 'TypeScript', 'Node.js, javascript', 'HTML', 'CSS'],\n  passion: 'Building beautiful web experiences'\n};"

  useEffect(() => {
    setIsMounted(true)

    // Start typing animation after a short delay to ensure component is fully mounted
    const startTypingTimeout = setTimeout(() => {
      setIsTyping(true)
      let i = 0

      typingIntervalRef.current = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1))
          i++
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current)
          }
        }
      }, 50)
    }, 500)

    return () => {
      clearTimeout(startTypingTimeout)
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  const stats = [
   {
  title: "Skill Level",
  value: "Intermediate",
  icon: <BarChart3 className="w-8 h-8" />,
  color: "yellow",
},

    {
  title: "Real-World Projects",
  value: "10+",
  icon: <Layout className="w-8 h-8" />,
  color: "green",
},
    {
      title: "Client Satisfaction",
      value: "100%",
      icon: <Award className="w-8 h-8" />,
      color: "purple",
    },
  ]

  // Server-side rendering fallback
  if (!isMounted) {
    return (
      <div className="max-w-4xl  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
          <div>
            <div className="text-[#6A9955] text-xl md:text-2xl mb-2">// Hi, I'm a Developer</div>
            <div className="text-[#569CD6] text-3xl md:text-4xl font-bold mb-4">Welcome to my portfolio</div>
            <div className="text-[#CE9178] text-lg md:text-xl mb-4">
              {"<"}
              <span className="text-[#4EC9B0]">Portfolio</span>
              {" />"}
            </div>

            <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4 mb-6 h-32"></div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-[#569CD6] shadow-lg">
              <Image
                src="/images/me2.jpg"
                alt="Developer Profile"
                className="w-full h-full object-cover"
                width={320}
                height={320}
                 priority 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "border border-[#3C3C3C] rounded-md p-6 text-center",
                index === 0 ? "bg-[#61DAFB]/10" : index === 1 ? "bg-[#3EC46D]/10" : "bg-[#C586C0]/10",
              )}
            >
              <div className="flex justify-center mb-3">
                {React.cloneElement(stat.icon, {
                  className: cn(
                    "w-10 h-10",
                    index === 0 ? "text-[#61DAFB]" : index === 1 ? "text-[#3EC46D]" : "text-[#C586C0]",
                  ),
                })}
              </div>
              <div
                className={cn(
                  "text-3xl font-bold mb-2",
                  index === 0 ? "text-[#61DAFB]" : index === 1 ? "text-[#3EC46D]" : "text-[#C586C0]",
                )}
              >
                {stat.value}
              </div>
              <div className="text-[#D4D4D4]">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
        <div>
          <div className="text-[#6A9955] text-xl md:text-2xl mb-2">// Hi, I'm a Developer</div>
          <div className="text-[#569CD6] text-3xl md:text-4xl font-bold mb-4">Welcome to my portfolio</div>
          <div className="text-[#CE9178] text-lg md:text-xl mb-4">
            {"<"}
            <span className="text-[#4EC9B0]">Portfolio</span>
            {" />"}
          </div>

          <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4 mb-6">
            <pre className="font-mono text-base md:text-lg whitespace-pre-wrap">
              <code>
                {/* Typing animation with VS Code theme highlights */}
                {(() => {
                  // Highlight as the text types out
                  const highlight = (typed: string) => {
                    // Regex to match the name, skills, and passion values
                    const out = typed
                      .replace(/\b(const|skills|passion|title|name)\b/g, '<span class="text-[#569CD6]">$1</span>')
                      .replace(/('Victor Onyemaechi')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/(developer)/g, '<span class="text-[#4FC1FF]">$1</span>')
                      .replace(/('Full Stack Developer')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('React')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('Next\.js')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('TypeScript')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('Node\.js, javascript')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('HTML')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('CSS')/g, '<span class="text-[#CE9178] font-semibold">$1</span>')
                      .replace(/('Building beautiful web experiences')/g, '<span class="text-[#CE9178] font-semibold">$1</span>');
                    return out;
                  };
                  return (
                    <span dangerouslySetInnerHTML={{ __html: highlight(text) }} />
                  );
                })()}
                {isTyping && <span className="animate-pulse">|</span>}
              </code>
            </pre>
            <div className="flex justify-center mt-2">
              <a href="/victor-onyemaechi-cv.pdf" download="Victors Cv.pdf">
        <button className="bg-[#007ACC] hover:bg-[#0062A3] text-white px-6 py-2 rounded-md transition-colors duration-200">
          Download CV
          <Download className="inline-block ml-2" />
        </button>
        </a>
      </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-96 rounded-lg overflow-hidden border-4 border-[#569CD6] shadow-lg">
            <Image
                src="/images/me2.jpg"
                alt="Developer Profile"
                className="w-full h-full object-cover"
                width={320}
                height={320}
                priority
              />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="text-lg font-bold ">Victor Onyemaechi</div>
              <div className="text-sm opacity-80">Full Stack Developer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "border border-[#3C3C3C] rounded-md p-6 text-center",
              index === 0 ? "bg-[#61DAFB]/10" : index === 1 ? "bg-[#3EC46D]/10" : "bg-[#C586C0]/10",
            )}
          >
            <div className="flex justify-center mb-3">
              {React.cloneElement(stat.icon, {
                className: cn(
                  "w-10 h-10",
                  index === 0 ? "text-[#61DAFB]" : index === 1 ? "text-[#3EC46D]" : "text-[#C586C0]",
                ),
              })}
            </div>
            <div
              className={cn(
                "text-3xl font-bold mb-2",
                index === 0 ? "text-[#61DAFB]" : index === 1 ? "text-[#3EC46D]" : "text-[#C586C0]",
              )}
            >
              {stat.value}
            </div>
            <div className="text-[#D4D4D4]">{stat.title}</div>
          </div>
        ))}
      </div>

      
    </div>
  )
}
