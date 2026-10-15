"use client"

import { useState } from "react"
import { ArrowRight, Code, Cpu, Database, Layout, Lightbulb, Smartphone, Zap, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function Services({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  // const [activeSection, setActiveSection] = useState<string | null>(null)

  const services = [
    {
      title: "Web Development",
      description: "Building responsive and performant web applications with modern technologies.",
      icon: <Code className="w-10 h-10 text-blue-400" />,
      color: "blue",
    },
    {
      title: "Mobile App Development",
      description: "Creating cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="w-10 h-10 text-green-400" />,
      color: "green",
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces and experiences.",
      icon: <Layout className="w-10 h-10 text-purple-400" />,
      color: "purple",
    },
    {
      title: "Backend Development",
      description: "Building robust server-side applications and APIs.",
      icon: <Database className="w-10 h-10 text-yellow-400" />,
      color: "yellow",
    },
    {
      title: "Performance Optimization",
      description: "Improving the speed and efficiency of web and mobile applications.",
      icon: <Zap className="w-10 h-10 text-red-400" />,
      color: "red",
    },
    {
      title: "Consultation",
      description: "Providing expert advice on technology choices and architecture.",
      icon: <Lightbulb className="w-10 h-10 text-orange-400" />,
      color: "orange",
    },
  ]

  const workProcess = [
    {
      step: 1,
      title: "Discovery",
      description: "Understanding your requirements, goals, and vision for the project.",
      command: 'init project --name="Your Project" --type="web|mobile|design"',
      output: "> Project initialized successfully. Starting discovery phase...",
    },
    {
      step: 2,
      title: "Planning",
      description: "Creating a detailed roadmap, timeline, and technical specifications.",
      command: 'plan --scope="detailed" --timeline --deliverables',
      output: "> Planning complete. Project timeline and deliverables defined.",
    },
    {
      step: 3,
      title: "Design",
      description: "Crafting the visual identity, user interface, and user experience.",
      command: "design --ui --ux --wireframes --mockups",
      output: "> Design phase completed. UI/UX designs and mockups ready for review.",
    },
    {
      step: 4,
      title: "Development",
      description: "Building the application with clean, efficient, and maintainable code.",
      command: 'develop --frontend --backend --features="core,auth,api"',
      output: "> Development in progress. Core features implemented.",
    },
    {
      step: 5,
      title: "Testing",
      description: "Ensuring quality through comprehensive testing and bug fixing.",
      command: "test --unit --integration --e2e --performance",
      output: "> Testing completed. All tests passing. Performance metrics within target range.",
    },
    {
      step: 6,
      title: "Deployment",
      description: "Launching your application to production environments.",
      command: 'deploy --env="production" --cdn --monitoring',
      output: "> Deployment successful. Application is now live at https://yourproject.com",
    },
    {
      step: 7,
      title: "Maintenance",
      description: "Providing ongoing support, updates, and improvements.",
      command: "maintain --updates --support --monitoring",
      output: "> Maintenance plan activated. Regular updates and support enabled.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Services</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">What I Offer</div>
        <div className="text-[#D4D4D4] mb-8">Comprehensive development services to bring your ideas to life</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#252526] border border-[#3C3C3C] rounded-md p-6 hover:border-blue-400 transition-colors duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-[#569CD6] text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-[#D4D4D4]">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Work Process</div>
        <div className="text-[#569CD6] text-2xl font-bold mb-4">How I Work</div>
        <div className="text-[#D4D4D4] mb-8">A systematic approach to deliver high-quality results</div>
      </div>

      <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md mb-8">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3C3C3C] text-[#D4D4D4] font-semibold flex items-center">
          <Cpu className="w-4 h-4 mr-2" />
          <span>Work Process Terminal</span>
        </div>

        <div className="p-4 font-mono text-sm">
          <div className="text-[#569CD6] mb-4">// Select a step to see details</div>

          <div className="flex flex-wrap gap-2 mb-6">
            {workProcess.map((step) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={cn(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  activeStep === step.step
                    ? "bg-[#007ACC] text-white"
                    : "bg-[#252526] text-[#D4D4D4] hover:bg-[#2D2D2D]",
                )}
              >
                Step {step.step}
              </button>
            ))}
          </div>

          {activeStep ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#007ACC] flex items-center justify-center text-white font-bold mr-3">
                  {workProcess[activeStep - 1].step}
                </div>
                <div className="text-[#569CD6] text-lg font-bold">{workProcess[activeStep - 1].title}</div>
              </div>

              <div className="text-[#D4D4D4] pl-11">{workProcess[activeStep - 1].description}</div>

              <div className="bg-[#0D0D0D] p-3 rounded-md border border-[#3C3C3C] mt-4">
                <div className="flex items-center text-[#D4D4D4]">
                  <span className="text-[#569CD6]">$</span>
                  <span className="ml-2">{workProcess[activeStep - 1].command}</span>
                </div>
                <div className="text-[#6A9955] mt-2">{workProcess[activeStep - 1].output}</div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  className="px-3 py-1 rounded-md bg-[#252526] text-[#D4D4D4] hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeStep === 1}
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(workProcess.length, activeStep + 1))}
                  className="px-3 py-1 rounded-md bg-[#252526] text-[#D4D4D4] hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={activeStep === workProcess.length}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[#D4D4D4] bg-[#0D0D0D] p-3 rounded-md border border-[#3C3C3C]">
              <div className="flex items-center">
                <span className="text-[#569CD6]">$</span>
                <span className="ml-2">select-step --number=1-7</span>
              </div>
              <div className="text-[#6A9955] mt-2">{">"} Please select a step to view details...</div>
              <div className="mt-2 w-3 h-5 bg-white inline-block animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-6">
        <div className="text-[#569CD6] text-xl font-bold mb-4">Ready to Start a Project?</div>
        <p className="text-[#D4D4D4] mb-6">
          Let's discuss your project requirements and how I can help bring your vision to life.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            onClick={() => setActiveSection("Contact.jsx")}
            className="bg-[#007ACC] hover:bg-[#0062A3] text-white px-6 py-2 rounded-md transition-colors duration-200 inline-flex items-center"
          >
            Contact Me
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a
            href="https://wa.me/+2348025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-md transition-colors duration-200 inline-flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp Me
          </a>
        </div>
      </div>
    </div>
  )
}
