export function Skills() {
  const frontendSkills = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Next.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 80, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "HTML/CSS", level: 90, color: "#E34F26" },
    { name: "Tailwind CSS", level: 85, color: "#06B6D4" },
  ]

  const backendSkills = [
    { name: "Node.js", level: 85, color: "#339933" },
    { name: "Express", level: 80, color: "#000000" },
    { name: "MongoDB", level: 75, color: "#47A248" },
    // { name: "PostgreSQL", level: 70, color: "#336791" },
    // { name: "GraphQL", level: 65, color: "#E10098" },
    { name: "REST API", level: 90, color: "#FF6C37" },
  ]

  const devOpsSkills = [
    { name: "Git", level: 85, color: "#F05032" },
    // { name: "Docker", level: 70, color: "#2496ED" },
    { name: "CI/CD", level: 65, color: "#4285F4" },
    // { name: "AWS", level: 60, color: "#FF9900" },
    { name: "Vercel", level: 80, color: "#000000" },
    { name: "Netlify", level: 75, color: "#00C7B7" },
  ]

  const otherSkills = [
    { name: "UI/UX Design", level: 75, color: "#FF61F6" },
    { name: "Figma", level: 70, color: "#F24E1E" },
    { name: "Testing", level: 65, color: "#C21325" },
    { name: "Performance Optimization", level: 80, color: "#4CAF50" },
    { name: "Responsive Design", level: 90, color: "#FF9800" },
    { name: "Accessibility", level: 75, color: "#2196F3" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Skills</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">Technical Proficiency</div>
        <div className="text-[#D4D4D4] mb-8">A comprehensive overview of my technical skills and expertise</div>
      </div>

      <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4 mb-8">
        <pre className="font-mono text-sm md:text-base whitespace-pre-wrap overflow-auto">
          <code>
            <span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">developerSkills</span>{" "}
            <span className="text-white">=</span> <span className="text-[#DCDCAA]">{"{"}</span>
            <br />
            <span className="text-[#9CDCFE]"> frontend</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">{"["}</span>
            <span className="text-[#CE9178]">"React"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"Next.js"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"TypeScript"</span>
            <span className="text-[#DCDCAA]">{"]"}</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> backend</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">{"["}</span>
            <span className="text-[#CE9178]">"Node.js"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"Express"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"MongoDB"</span>
            <span className="text-[#DCDCAA]">{"]"}</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> devOps</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">{"["}</span>
            <span className="text-[#CE9178]">"Git"</span>
            {/* <span className="text-white">,</span> <span className="text-[#CE9178]">"Docker"</span> */}
            <span className="text-white">,</span> <span className="text-[#CE9178]">"CI/CD"</span>
            <span className="text-[#DCDCAA]">{"]"}</span>
            <span className="text-white">,</span>
            <br />
            <span className="text-[#9CDCFE]"> other</span>
            <span className="text-white">:</span> <span className="text-[#DCDCAA]">{"["}</span>
            <span className="text-[#CE9178]">"UI/UX"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"Figma"</span>
            <span className="text-white">,</span> <span className="text-[#CE9178]">"Testing"</span>
            <span className="text-[#DCDCAA]">{"]"}</span>
            <br />
            <span className="text-[#DCDCAA]">{"}"}</span>
            <span className="text-white">;</span>
          </code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#569CD6] font-bold mb-4">// Frontend Development</div>
          <div className="space-y-4">
            {frontendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-[#3C3C3C] rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#569CD6] font-bold mb-4">// Backend Development</div>
          <div className="space-y-4">
            {backendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-[#3C3C3C] rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#569CD6] font-bold mb-4">// DevOps & Deployment</div>
          <div className="space-y-4">
            {devOpsSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-[#3C3C3C] rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#569CD6] font-bold mb-4">// Other Skills</div>
          <div className="space-y-4">
            {otherSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-[#3C3C3C] rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
        <div className="text-[#6A9955] font-bold mb-4">// Skill Breakdown</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1E1E1E] p-3 rounded-md">
            <div className="text-center mb-2 text-[#569CD6]">Frontend</div>
            <div className="aspect-square flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3C3C3C"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#61DAFB"
                    strokeWidth="2"
                    strokeDasharray="87, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xl font-bold">87%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-3 rounded-md">
            <div className="text-center mb-2 text-[#569CD6]">Backend</div>
            <div className="aspect-square flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3C3C3C"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#339933"
                    strokeWidth="2"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xl font-bold">78%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-3 rounded-md">
            <div className="text-center mb-2 text-[#569CD6]">DevOps</div>
            <div className="aspect-square flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3C3C3C"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2496ED"
                    strokeWidth="2"
                    strokeDasharray="45, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xl font-bold">45%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-3 rounded-md">
            <div className="text-center mb-2 text-[#569CD6]">Design</div>
            <div className="aspect-square flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3C3C3C"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FF61F6"
                    strokeWidth="2"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xl font-bold">75%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
