"use client"

import type React from "react"
import { sendContactMessage } from "@/lib/contact"
import { useState } from "react"
import {
  Mail,
  Send,
  MessageSquare,
} from "lucide-react"
import { Github, Linkedin } from "@/components/icons/brand"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [commandHistory, setCommandHistory] = useState<string[]>([
    "$ init contact-form",
    "> Contact form initialized successfully.",
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Add command to history
    setCommandHistory((prev) => [
      ...prev,
      `$ send-message --name="${formData.name}" --email="${formData.email}"`,
      "> Processing message...",
    ])

    try {
      const message = await sendContactMessage(formData)

      setCommandHistory((prev) => [
        ...prev,
        `> ${message}`,
      ])
    } catch (error) {
      setCommandHistory((prev) => [
        ...prev,
        `> Error: ${error instanceof Error ? error.message : "Something went wrong."}`,
      ])
    }

    setFormData({ name: "", email: "", message: "" })
  }


  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Contact</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">Get In Touch</div>
        <div className="text-[#D4D4D4]">Have a project in mind? Let's work together!</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4">
          <div className="flex items-center text-[#569CD6] font-bold mb-4">
            <Mail className="w-5 h-5 mr-2" />
            <span>Contact Form</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#9CDCFE] mb-1">
                name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-[#D4D4D4] focus:outline-hidden focus:border-[#569CD6]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#9CDCFE] mb-1">
                email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-[#D4D4D4] focus:outline-hidden focus:border-[#569CD6]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#9CDCFE] mb-1">
                message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-[#D4D4D4] focus:outline-hidden focus:border-[#569CD6]"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#007ACC] hover:bg-[#0062A3] text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </button>
          </form>
        </div>

        <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md flex flex-col">
          <div className="bg-[#252526] px-4 py-2 border-b border-[#3C3C3C] text-[#D4D4D4] font-semibold">Terminal</div>

          <div className="flex-1 p-4 font-mono text-sm overflow-auto">
            {commandHistory.map((line, index) => (
              <div key={index} className={line.startsWith(">") ? "text-[#6A9955]" : "text-[#D4D4D4]"}>
                {line}
              </div>
            ))}
            <div className="flex items-center mt-2">
              <span className="text-[#D4D4D4]">$</span>
              <span className="ml-2 w-2 h-4 bg-white animate-pulse"></span>
            </div>
          </div>

          <div className="bg-[#007ACC] px-4 py-1 text-xs text-white">Contact Terminal — node v18.0.0</div>
        </div>
      </div>

      <div className="mt-8 bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
        <div className="text-[#569CD6] font-bold mb-2">// Other Ways to Connect</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center space-x-2 text-[#D4D4D4] hover:text-[#569CD6]"
          >
            <Mail className="w-5 h-5" />
            <span>victorvector608@gmail,com</span>
          </a>

          <a
            href="https://github.com/Conqueror102"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#D4D4D4] hover:text-[#569CD6]"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/victor-conqueror-956635327/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#D4D4D4] hover:text-[#569CD6]"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="mt-8 bg-[#25D366]/10 border border-[#25D366] rounded-md p-6">
        <div className="flex items-center text-[#25D366] font-bold text-xl mb-4">
          <MessageSquare className="w-6 h-6 mr-2" />
          <span>WhatsApp Me Directly</span>
        </div>
        <p className="text-[#D4D4D4] mb-6">
          For quick responses and real-time communication, feel free to reach out to me on WhatsApp.
        </p>
        <a
          href="https://wa.me/+2348025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center font-bold"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}
