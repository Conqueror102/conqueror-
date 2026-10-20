export type Education = {
  credential: string
  institution: string
  location: string
  period: string
  description: string
  certifications: string[]
  courses: string[]
}

export const education: Education[] = [
  {
    credential: "Software Engineering",
    institution: "Kode10x",
    location: "Agbogu, Lagos",
    period: "2024 - 2025",
    description: "Specialized in frontend development and server-side architecture, with emphasis on scalable web applications.",
    certifications: ["Certified JavaScript Developer", "Git", "Responsive Web Design"],
    courses: ["Data Structures & APIs", "React and State Management", "Node.js Backend Development", "Database Systems"],
  },
  {
    credential: "Computer Engineering",
    institution: "Inland Computers",
    location: "Ajegule, Lagos",
    period: "2024 - 2025",
    description: "Trained in computer hardware, networking, and embedded systems.",
    certifications: [
      "Certificate in Computer Hardware Maintenance",
      "Certificate in Networking Basics",
      "Certificate in Embedded Systems",
    ],
    courses: ["Digital Systems", "Computer Architecture", "Networking Essentials", "Embedded Programming"],
  },
]

export const courses = [
  { name: "Advanced React and Redux", platform: "Udemy", instructor: "Stephen Grider", year: "2024", url: "https://www.udemy.com/course/react-redux/" },
  { name: "Next.js 15 Full Tutorial", platform: "YouTube", instructor: "Codevolution", year: "2025", url: "https://www.youtube.com/@Codevolution" },
  { name: "TypeScript: The Complete Developer's Guide", platform: "Udemy", instructor: "Stephen Grider", year: "2025", url: "https://www.udemy.com/course/typescript-the-complete-developers-guide/" },
]
