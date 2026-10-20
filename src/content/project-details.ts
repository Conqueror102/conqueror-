import type { Project } from "./projects"

/** Project-specific story fields. The admin can supply these alongside each project. */
export const projectStories: Record<string, Pick<Project, "story" | "highlights" | "gallery" | "facts">> = {
  surecova: { highlights:["Patients subscribe to a doctor, consult, chat in real time and get prescriptions.","Doctors are paid out of subscription revenue through a dedicated payments ledger.","One platform across a mobile app, website, admin console and API."] },
  b4build: { highlights:["Nine planning phases, from idea pressure-test to scaling path.","A red-team agent that attacks the finished plan.","Follow-up questions re-run only the phases they affect."] },
  "time-wise": { highlights:["Check in by staff ID, QR code, face recognition or fingerprint device.","Multi-tenant: every organization’s data is isolated automatically.","Self-hosted with Docker Compose and automatic HTTPS."] },
  drivestack: { highlights:["Several Google Drive accounts, one combined storage pool.","Subscriptions and referrals, priced in each customer’s local currency.","OAuth tokens encrypted with AES-256-GCM."] },
  "milky-way": {
    highlights:["Wholesale and retail beauty shopping with a Paystack checkout.","Delivery fees by location, set by the store’s admins.","An admin that runs products, orders, categories, homepage content and site colours."],
    gallery:[{ src:"/projects/milky-way-hero.webp", alt:"Milky Way Cosmetics homepage hero: “Your Beauty. Our Passion” beside a face with a blue cream swatch", caption:"The homepage hero." }],
  },
  "project-cham": {
    highlights:["Programs, stories, events and a gallery that tell the organization’s story.","A clear path to support a child or partner with the nonprofit.","A Livewire admin for posts, events, team, gallery, reviews and donor inquiries."],
    gallery:[{ src:"/projects/project-cham-hero.webp", alt:"Project CHAM homepage hero: “No Child Should Face Cancer Alone”", caption:"The homepage hero." }],
  },
  "tender-cradle": {
    highlights:["Online enrolment with document uploads.","A parents’ shop with customer accounts and Paystack payments.","An admin for orders, products, enrolments, leads, the blog and the gallery."],
    gallery:[{ src:"/projects/tender-cradle-hero.webp", alt:"Tender Cradle homepage hero: “Where Little Stars Shine Bright”", caption:"The homepage hero." }],
  },
  greenstone: {
    highlights:["A full-screen hero carousel of the developer’s properties.","Projects, services, team and blog, all editable from the admin.","Contact and newsletter forms that capture leads."],
    gallery:[{ src:"/projects/greenstone-hero.webp", alt:"Greenstone homepage hero: “Building the future of Real Estate”", caption:"The homepage hero." }],
  },
  ifaf: {
    highlights:["Reservations with a private booking link and bank-transfer receipt upload.","Admin approval tied to a unique bank transaction reference.","Printable tickets with a QR code per attendee and camera check-in at the door."],
    gallery:[{ src:"/projects/ifaf-hero.webp", alt:"IFAF homepage hero: “Bridging the divide. Connecting cultures.” surrounded by people in traditional dress", caption:"The homepage hero." }],
  },
  "modupe-olusoga": {
    highlights:["An editorial hero built around Modupe’s name and portrait.","Speaking, mentorship, insights and programmes in one platform.","An enquiry form for session and speaking requests."],
    gallery:[{ src:"/projects/modupe-olusoga-hero.webp", alt:"Modupe Olusoga homepage hero with her name in large serif type beside her portrait", caption:"The homepage hero, in development." }],
  },
  lemonwaresex: { highlights:["Official and parallel-market exchange rates side by side.","Exact decimal math with no floating-point errors.","A metered developer API with keys and rate limits."] },
  "course-correct": { highlights:["Video, audio and PDF lessons by level and semester.","Paystack payments and passkey course access.","Single-device login for paid accounts."] },
  lodgely: { highlights:["Pages for students, landlords, agents and universities.","City and university landing pages built for search.","Housing guides and trust-and-safety content."] },
  medark: {
    story: ["Healthcare recruitment brings two groups together: hospitals looking for qualified people, and professionals looking for their next opportunity. Medark connects them directly in one web application."],
    highlights: ["Connects hospitals with qualified healthcare professionals.", "Brings medical recruitment into a dedicated web platform."],
    gallery: [
      { src:"/projects/med-ark.png", alt:"Medark homepage with healthcare recruitment headline and medical professionals illustration", caption:"The homepage — introducing the connection." },
      { src:"/projects/med-ark.png", alt:"A close-up of the healthcare illustration on the Medark homepage", caption:"A closer look at the homepage illustration.", detail:true, position:"85% 50%" },
    ],
  },
  lims: { highlights:["Service, product, and company information pages.","A place to showcase the company’s projects.","A working contact form for enquiries."] },
  peviacom: { highlights:["Introduces renewable energy and solar solutions.","Showcases solar products.","An eCommerce-style interface for the product offering."] },
  "study-abroad-consultancy": { highlights:["Introduces a study abroad consultancy agency.","Focuses on helping students apply to UK universities."] },
  "show-royal-meal": { highlights:["Online bread booking for customers.","Admin tools for products, bookings, and uploads.","An SEO-friendly ordering experience."] },
  "ai-prompts-platform": { highlights:["Post and browse AI prompts.","Rate and copy prompts from the feed.","Feed filtering and authentication."] },
  "celymed-logistics": { highlights:["A web presence for a logistics and transport company.","Service information and brand presentation.","Direct WhatsApp and call contact options."] },
  "ronix-kitchen": { highlights:["Browse Nigerian dishes and featured meals.","Place food orders online.","A responsive food ordering interface."] },
  "kode10x-quiz-app": { highlights:["Interactive quizzes built with React.","Timed and personalized quiz experiences."] },
}

export const projectDetailCopy = {
  back:"All projects", eyebrow:"THE CASE STUDY", overview:"The idea behind it.", overviewLabel:"01 / CONTEXT", features:"What it brings to life.", featuresLabel:"02 / IN FOCUS", gallery:"A closer look.", galleryLabel:"08 / THE INTERFACE", stack:"The tools behind the work.", stackLabel:"09 / THE BUILD",
  navLabel:"On this project page", navigation:[{label:"Problem",href:"#challenge"},{label:"Solution",href:"#solution"},{label:"Hard parts",href:"#hard-parts"},{label:"Decisions",href:"#decisions"},{label:"Trade-offs",href:"#tradeoffs"},{label:"Outcomes",href:"#outcomes"},{label:"Architecture",href:"#architecture"},{label:"Gallery",href:"#gallery"},{label:"Stack",href:"#stack"}],
  live:"Visit live website", source:"Explore the code", explore:"Explore the story", type:"PROJECT TYPE", tools:"TOOLS IN THE STACK", coverCaption:"Interface overview", defaultGalleryCaption:"A view of the project interface.", enlarge:"Enlarge image", close:"Close image viewer", previousImage:"Previous image", nextImage:"Next image",
  hardPartsLabel:"03 / BUILDING IT", hardPartsTitle:"The hard parts", hardPartsLead:"The problems I ran into while building it, and how I solved them.", problemLabel:"The problem", fixLabel:"What I did",
  decisionsLabel:"04 / JUDGEMENT", decisionsTitle:"Decisions & why", tradeoffsLabel:"05 / TRADE-OFFS", tradeoffsTitle:"What each choice cost", choiceLabel:"The choice", gainedLabel:"What I gained", costLabel:"What I gave up",
  next:"NEXT IN THE COLLECTION", all:"Back to all projects", contact:"Have something in mind? Let’s talk.", home:"Portfolio home", notes:"Project note",
  client:"CLIENT", role:"ROLE", services:"SERVICES PROVIDED", product:"LIVE PRODUCT",
  demoLabel:"DEMO CASE STUDY", demoNotice:"Client, role, performance figures, outcomes, and architecture below are illustrative placeholders for this layout.", metricLabel:"AT A GLANCE",
  referenceNotice:"Rentium reference supplied for this layout demo. The project, role, and results shown are example content, not claims about Victor’s work.",
  challengeLabel:"01 / PROBLEM", challengeTitle:"The Problem", solutionLabel:"02 / EXECUTION", solutionTitle:"The Solution", outcomesLabel:"06 / IMPACT", outcomesTitle:"Key Outcomes", architectureLabel:"07 / ARCHITECTURE", architectureTitle:"System Design & Technical Rigor", pipelineLabel:"End-to-End Execution Pipeline", production:"Explore the live project",
} as const
