"use client"

import { useState } from "react"
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  MessageSquare,
} from "lucide-react"

export function Education() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    education: true,
    certifications: false,
    courses: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const education = [
    {
  degree: "Software Engineer",
  institution: "Kode10x",
  location: "Agbogu, Lagos",
  period: "2024 - 2025",
  description:
    "Specialized in Frontend development and Server side architecture, with emphasis on scalable web applications.",
  certifications: [
    "Certified JavaScript Developer",
    "Git",
    "Responsive Web Design",
    "etc"
  ],
  courses: [
    "Data Structures & APIs",
    "React and State Management",
    "Node.js Backend Development",
    "Database Systems"
  ],
},

    {
  degree: "Computer Engineer",
  institution: "Inland Computers",
  location: "Ajegule, Lagos",
  period: "2024 - 2025",
  description:
    "Trained in computer hardware, networking, and embedded systems.",
    certifications: [
  "Certificate in Computer Hardware Maintenance",
  "Certificate in Networking Basics",
  "Certificate in Embedded Systems"
],

  courses: [
    "Digital Systems",
    "Computer Architecture",
    "Networking Essentials",
    "Embedded Programming"
  ],
}

  ]

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-12345",
      url: "https://aws.amazon.com/certification/",
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2021",
      credentialId: "GCP-67890",
      url: "https://cloud.google.com/certification/cloud-developer",
    },
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta (Facebook)",
      date: "2021",
      credentialId: "META-54321",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    },
    {
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2020",
      credentialId: "TF-09876",
      url: "https://www.tensorflow.org/certificate",
    },
  ]

  const courses = [
    {
      name: "Advanced React and Redux",
      platform: "Udemy",
      instructor: "Stephen Grider",
      completionDate: "2024",
      url: "https://www.udemy.com/course/react-redux/",
    },
    {
      name: "Next.js - Next.js 15 Full Tutorial",
      platform: "YouTube",
      instructor: "codevolution",
      completionDate: "2025",
      url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
    },
    {
      name: "TypeScript: The Complete Developer's Guide",
      platform: "Udemy",
      instructor: "Stephen Grider",
      completionDate: "2025",
      url: "https://www.udemy.com/course/typescript-the-complete-developers-guide/",
    },
    // {
    //   name: "CS50: Introduction to Computer Science",
    //   platform: "Harvard University (edX)",
    //   instructor: "David J. Malan",
    //   completionDate: "2019",
    //   url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
    // },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Education</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">Academic Background</div>
        <div className="text-[#D4D4D4] mb-8">My educational journey and continuous learning path</div>
      </div>
{/* 
      <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4 mb-8">
        <pre className="font-mono text-sm md:text-base whitespace-pre-wrap overflow-auto">
          <code>
            <span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">education</span>{" "}
            <span className="text-white">=</span> <span className="text-[#DCDCAA]">{"{"}</span>
            <br />
            <span className="text-[#9CDCFE]"> schools</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
            <br />
            <span className="text-[#DCDCAA]"> {"{"}</span>
            <br />
            <span className="text-[#9CDCFE]"> name</span>
            <span className="text-white">:</span>{" "}
            <span className="text-[#CE9178]">"Ebenezer Nur/Pry School"</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> certificate</span>
            <span className="text-white">:</span> <span className="text-[#CE9178]">"First School Leaving Certificate (FSLC)"</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> year</span>
            <span className="text-white">:</span> <span className="text-[#B5CEA8]">2010-2016</span>
            <br />
            <span className="text-[#DCDCAA]"> {"}"}</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#DCDCAA]"> {"{"}</span>
            <br />
            <span className="text-[#9CDCFE]"> name</span>
            <span className="text-white">:</span>{" "}
            <span className="text-[#CE9178]">"Awodi-ora Senior Secondary School "</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> certificate</span>
            <span className="text-white">:</span> <span className="text-[#CE9178]">"West African Examination Council (WAEC)"</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> year</span>
            <span className="text-white">:</span> <span className="text-[#B5CEA8]">2016-2022</span>
            <br />
            <span className="text-[#DCDCAA]"> {"}"}</span>
            <br />
            <span className="text-[#DCDCAA]"> ]</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> certifications</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
            <span className="text-[#CE9178]">"AWS Certified Solutions Architect"</span>
            <span className="text-white">,</span>{" "}
            <span className="text-[#CE9178]">"Google Professional Cloud Developer"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"Meta Frontend Developer"</span>
            <span className="text-[#DCDCAA]">]</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> continuousLearning</span>
            <span className="text-white">:</span> <span className="text-[#569CD6]">true</span>
            <br />
            <span className="text-[#DCDCAA]">{"}"}</span>
            <span className="text-white">;</span>
          </code>
        </pre>
      </div> */}

      <div className="space-y-6">
        {/* Formal Education */}
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => toggleSection("education")}
          >
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 text-[#569CD6] mr-2" />
              <span className="text-[#569CD6] font-bold">Formal Education</span>
            </div>
            {expandedSections.education ? (
              <ChevronDown className="w-5 h-5 text-[#D4D4D4]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#D4D4D4]" />
            )}
          </button>

          {expandedSections.education && (
            <div className="p-4 border-t border-[#3C3C3C]">
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 pb-6 last:pb-0">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#3C3C3C]"></div>
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#569CD6]"></div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-[#569CD6] font-bold">{edu.degree}</h3>
                        <div className="text-[#D4D4D4]">
                          {edu.institution}, {edu.location}
                        </div>
                      </div>
                      <div className="flex items-center text-[#6A9955] mt-1 md:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <p className="text-[#D4D4D4] mb-2">{edu.description}</p>

                    <div className="text-[#D4D4D4]">
                      <span className="text-[#9CDCFE]">Certification:</span> 
                      <div className="flex flex-wrap gap-2">
                       {edu.certifications.map((certifications, courseIndex) => (
                          <span key={courseIndex} className="bg-[#1E1E1E] text-[#CE9178] px-2 py-1 rounded-md text-xs">
                            {certifications}
                          </span>
                        ))}
                         </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-[#9CDCFE] mb-1">Key Courses:</div>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, courseIndex) => (
                          <span key={courseIndex} className="bg-[#1E1E1E] text-[#CE9178] px-2 py-1 rounded-md text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {/* <div className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => toggleSection("certifications")}
          >
            <div className="flex items-center">
              <Award className="w-5 h-5 text-[#569CD6] mr-2" />
              <span className="text-[#569CD6] font-bold">Certifications</span>
            </div>
            {expandedSections.certifications ? (
              <ChevronDown className="w-5 h-5 text-[#D4D4D4]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#D4D4D4]" />
            )}
          </button>

          {expandedSections.certifications && (
            <div className="p-4 border-t border-[#3C3C3C]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[#569CD6] font-bold">{cert.name}</h3>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4D4D4] hover:text-[#569CD6]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-[#D4D4D4] mt-1">{cert.issuer}</div>
                    <div className="flex items-center text-[#6A9955] mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="text-[#9CDCFE] text-sm mt-2">
                      Credential ID: <span className="text-[#D4D4D4]">{cert.credentialId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> */}

        {/* Online Courses */}
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => toggleSection("courses")}
          >
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-[#569CD6] mr-2" />
              <span className="text-[#569CD6] font-bold">Online Courses</span>
            </div>
            {expandedSections.courses ? (
              <ChevronDown className="w-5 h-5 text-[#D4D4D4]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#D4D4D4]" />
            )}
          </button>

          {expandedSections.courses && (
            <div className="p-4 border-t border-[#3C3C3C]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[#569CD6] font-bold">{course.name}</h3>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4D4D4] hover:text-[#569CD6]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-[#D4D4D4] mt-1">{course.platform}</div>
                    <div className="text-[#9CDCFE] text-sm mt-1">
                      Instructor: <span className="text-[#D4D4D4]">{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-[#6A9955] mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Completed in {course.completionDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-[#252526] border border-[#3C3C3C] rounded-md p-6">
        <div className="text-[#569CD6] text-xl font-bold mb-4">Continuous Learning</div>
        <p className="text-[#D4D4D4] mb-6">
          I'm committed to continuous learning and staying up-to-date with the latest technologies and best practices in
          software development. I regularly participate in online courses, workshops, and conferences to expand my
          knowledge and skills.
        </p>
        <a
          href="https://wa.me/+2348025383208?text=Hi%20there!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20your%20educational%20background."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-md transition-colors duration-200 inline-flex items-center"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask Me About My Education on WhatsApp
        </a>
      </div>
    </div>
  )
}
