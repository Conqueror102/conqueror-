import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

// Load fonts
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

// Portfolio information - centralize data for consistency
const portfolioInfo = {
  name: "Victor Onyemaechi",
  title: "Full Stack Developer",
  description:
    "Experienced Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. View my projects and skills.",
  url: "https://victor-onyemaechi.vercel.app", // Replace with your actual domain
  image: "https://victor-onyemaechi.vercel.app/og-image", // Updated to use dynamic OG image route
  twitterHandle: "@TECH_snitch101", // Replace with your Twitter handle
  keywords: [
      "full stack developer",
      "react developer",
      "next.js developer",
      "typescript developer",
      "web developer portfolio",
      "software engineer",
      "frontend developer",
      "backend developer",
      "fullstack developer in lagos",
      "fullstack developer in nigeria",
      "backend developer needed",
      "frontend developer needed",
      "skilled software engineer needed",
      "mobile app developer lagos",
      "mobile app developer nigeria",
      "hire frontend developer lagos",
      "hire backend developer nigeria",
      "remote full stack developer",
      "freelance web developer lagos",
      "hire mobile app developer",
      "remote react developer jobs",
      "javascript developer lagos",
      "node.js developer nigeria",
      "hire software engineer nigeria",
      "lagos software developer jobs",
      "top frontend developer in lagos",
      "next.js developer for hire",
      "best full stack developer in nigeria",
      "mobile app developer needed",
      "web developer near me lagos",
    
    "MERN Stack Developer", // Core specialization [1]
    "MongoDB", // Database for MERN [2]
    "Express.js", // Backend framework for MERN [3]
    "React.js", // Frontend library for MERN [2]
    "Node.js", // Backend runtime for MERN [2]
    "full stack developer", // Your existing keyword, still highly relevant [2]
    "react developer", // Your existing keyword, reinforce frontend expertise [2]
    "next.js developer", // Your existing keyword, for server-side rendering with React
    "typescript developer", // Your existing keyword, crucial for modern MERN [1]
    "web developer portfolio", // Your existing keyword
    "software engineer", // Broad, essential title [4]
    "frontend developer", // Your existing keyword [2]
    "backend developer", // Your existing keyword [2]
    "fullstack developer in lagos", // Your existing keyword, local focus
    "fullstack developer in nigeria", // Your existing keyword, local focus
    "backend developer needed", // Your existing keyword
    "frontend developer needed", // Your existing keyword
    "a skilled software enginneer need", // Your existing keyword (consider rephrasing to "skilled software engineer")

    // MERN Stack Specifics & Related Technologies
    "MERN Stack Engineer",
    "JavaScript", // Foundational for MERN [2]
    "RESTful APIs", // Essential for MERN backend [3]
    "API Development", // General API work [5]
    "NoSQL Database", // For MongoDB [5]
    "State Management (React)", // E.g., Redux, Context API
    "User Interface (UI) Development", // Frontend focus [5]
    "User Experience (UX) Design", // Related to UI [5]
    "Web Application Development", // General web apps [5]
    "Single Page Application (SPA)", // Common with React
    "JSON", // Data format used with APIs
    "Authentication (Node.js)", // E.g., JWT, OAuth
    "Authorization (Node.js)",
    "Server-side Development",
    "Client-side Development",

    // Cloud & DevOps (Highly in-demand globally, for deploying MERN apps)
    "AWS Cloud", // Amazon Web Services expertise [6]
    "Azure Cloud", // Microsoft Azure expertise [7]
    "Google Cloud Platform (GCP)", // GCP expertise [6]
    "DevOps Engineer", // For infrastructure and deployment [5]
    "Docker", // Containerization tool [1]
    "Kubernetes", // Container orchestration [1]
    "CI/CD Pipelines", // Continuous Integration/Continuous Deployment [8]
    "Cloud Deployment",
    "Heroku", // Popular for MERN deployment
    "Vercel", // Popular for Next.js deployment
    "Netlify", // Popular for frontend deployment

    // Emerging Technologies (If you have experience or are looking to specialize)
    "AI Engineer", // Artificial Intelligence roles are skyrocketing [9, 10]
    "Machine Learning Engineer", // ML model development and deployment [11, 12]
    "Blockchain Developer", // High demand, especially in Nigeria [13, 14]
    "Web3 Developer", // Broader decentralized web technologies [14]
    "Data Scientist", // For data analysis and insights [11]
    "Data Engineer", // For data pipelines and architecture [5]
    "Cybersecurity Engineer", // Increasing demand for security [11]
    "Mobile Developer", // If you build mobile apps [15]
    "React Native Developer", // For cross-platform mobile development [11]
    "Flutter Developer", // For cross-platform mobile development [1]

    // Industry-Specific (Local & Global relevance)
    "Fintech Developer", // Nigeria is a fintech hub [16]
    "E-commerce Developer", // Growing online market [2]
    "Health Tech Developer", // Emerging sector with global demand [17, 18]
    "Digital Payments", // Key in fintech [16]
    "Paystack Integration", // Specific to Nigerian e-commerce/fintech [19]
    "Flutterwave Integration", // Specific to Nigerian e-commerce/fintech [19]
    "Regulatory Compliance (Fintech)", // Important for local fintech roles [20]

    // Soft Skills (Integrate into project descriptions and summaries, not just as standalone keywords)
    "Problem-solving", // Highly valued by recruiters [3]
    "Communication skills", // Essential for team collaboration [3]
    "Collaboration", // Working effectively in teams [21]
    "System Design", // For architectural roles [3]
    "Agile Development", // Common methodology [22]
    "Scrum Methodology", // Agile framework [22]
    "Results-driven", // Focus on impact [6]
    "Autonomy", // Ability to work independently [6]
    "Leadership", // Taking initiative [3]

    // Location & Remote Terms
    "Remote Developer", // For international opportunities [10]
    "Work From Home Developer", // Common remote search term [11]
    "Worldwide Remote", // Broadens search scope [23]
    "Global Remote", // Emphasizes international reach [6]
    "International Remote", // Another term for global opportunities [9]
  ]
}

// Define metadata
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: `${portfolioInfo.name} | ${portfolioInfo.title}`,
    template: `%s | ${portfolioInfo.name}`,
  },
  description: portfolioInfo.description,
  keywords: portfolioInfo.keywords,

  // Author information
  authors: [{ name: portfolioInfo.name, url: portfolioInfo.url }],
  creator: portfolioInfo.name,

  // Canonical URL
  metadataBase: new URL(portfolioInfo.url),
  alternates: {
    canonical: "/",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioInfo.url,
    title: `${portfolioInfo.name} | ${portfolioInfo.title}`,
    description: portfolioInfo.description,
    siteName: `${portfolioInfo.name} Portfolio`,
    images: [
      {
        url: portfolioInfo.image,
        width: 1200,
        height: 630,
        alt: `${portfolioInfo.name} - ${portfolioInfo.title}`,
      },
    ],
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: `${portfolioInfo.name} | ${portfolioInfo.title}`,
    description: portfolioInfo.description,
    creator: portfolioInfo.twitterHandle,
    images: [portfolioInfo.image],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#007acc", // VS Code blue
      },
    ],
  },

  // Web manifest
  manifest: "/site.webmanifest",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification for search consoles
  verification: {
    google: "qzS6Fzf_hHAwewQfz-gfOatDDr196xJxJ6c_HHC2Q8o", // Replace with your verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

 
  // Viewport
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
    generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#007acc", // optional but now correctly placed
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans" suppressHydrationWarning={true}>
        {children}

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: portfolioInfo.name,
              url: portfolioInfo.url,
              jobTitle: portfolioInfo.title,
              description: portfolioInfo.description,
              image: portfolioInfo.image,
              address: {
                "@type": "PostalAddress",
                "addressLocality": "Lagos",
                "addressCountry": "Nigeria"
              },
              email: "victorvector608@gmail.com",
              telephone: "+234 802 538 3208",
              sameAs: [
                "https://github.com/Conqueror102",
                "https://www.linkedin.com/in/victor-conqueror-956635327/",
                "https://x.com/TECH_snitch101?t=1MXTBHsRp_tx9nFgz7iNAA&s=09",
              ],
              knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Web Development", "UI/UX Design, HTML", "CSS", "JavaScript"],
            }),
          }}
        />
      </body>
    </html>
  )
}
