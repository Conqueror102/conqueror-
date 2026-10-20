export function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// About Me</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">Developer Profile</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
        <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-md p-4">
          <pre className="font-mono text-sm md:text-base whitespace-pre-wrap overflow-auto">
            <code>
              <span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">aboutMe</span>{" "}
              <span className="text-white">=</span> <span className="text-[#DCDCAA]">{"{"}</span>
              <br />
              <span className="text-[#9CDCFE]"> name</span>
              <span className="text-white">:</span> <span className="text-[#CE9178]">"Victor Onyemaechi"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> role</span>
              <span className="text-white">:</span> <span className="text-[#CE9178]">"Full Stack Developer"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> location</span>
              <span className="text-white">:</span> <span className="text-[#CE9178]">"Lagos, Ajegule"</span>
              <span className="text-white">,</span>
              <br />
              {/* <span className="text-[#9CDCFE]"> education</span>
              <span className="text-white">:</span>{" "}
             <span className="text-[#CE9178]">Awodi-ora Senior Secondary School (2016-2022) - WAEC</span>
              <span className="text-white">,</span> */}
              <br />
              <span className="text-[#9CDCFE]"> experience</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
              <br />
              {/* <span className="text-[#CE9178]"> "Senior Developer at Tech Company (2020-Present)"</span> */}
              <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "Software Developer at Kode10x (2024-till date)"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "Intership and Teaching at Kode10x (2024-till date)"</span>
               <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "Computer Engineer"</span>
              <br />
              <span className="text-[#DCDCAA]"> ]</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> skills</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">{"{"}</span>
              <br />
              <span className="text-[#9CDCFE]"> languages</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
              <span className="text-[#CE9178]">"JavaScript"</span>
              <span className="text-white">,</span> <span className="text-[#CE9178]">"TypeScript"</span> 
              <span className="text-white">,</span> <span className="text-[#CE9178]">"HTML/CSS"</span>
              <span className="text-[#DCDCAA]">]</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> frameworks</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
              <span className="text-[#CE9178]">"React"</span>
              <span className="text-white">,</span> <span className="text-[#CE9178]">"Next.js"</span>
              <span className="text-white">,</span> <span className="text-[#CE9178]">"Node.js"</span>
              <span className="text-white">,</span> <span className="text-[#CE9178]">"Express"</span>
              <span className="text-[#DCDCAA]">]</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> tools</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
              <span className="text-[#CE9178]">"Git"</span>
              {/* <span className="text-white">,</span> <span className="text-[#CE9178]">"Docker"</span> */}
              <span className="text-white">,</span> <span className="text-[#CE9178]">"VS Code"</span>
              <span className="text-white">,</span> <span className="text-[#CE9178]">"Figma"</span>
              <span className="text-[#DCDCAA]">]</span>
              <br />
              <span className="text-[#DCDCAA]"> {"}"}</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> interests</span>
              <span className="text-white">:</span> <span className="text-[#DCDCAA]">[</span>
              <br />
              <span className="text-[#CE9178]"> "Open Source Development"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "UI/UX Design"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "Web Performance Optimization"</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#CE9178]"> "Artificial Intelligence"</span>
              <br />
              <span className="text-[#DCDCAA]"> ]</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-[#9CDCFE]"> bio</span>
              <span className="text-white">:</span>{" "}
              <span className="text-[#CE9178]">
              "I'm a dedicated developer with a track record of building real-world web applications. I thrive on solving challenges with clean, efficient code and constantly leveling up my skills."
              </span>
              <br />
              <span className="text-[#DCDCAA]">{"}"}</span>
              <span className="text-white">;</span>
            </code>
          </pre>
        </div>

        <div className="space-y-6">
          <div className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden">
            <div className="bg-[#3C3C3C] px-3 py-1 text-xs text-white font-semibold">profile.jpg</div>
            <div className="p-4">
              <div className="aspect-square rounded-md overflow-hidden border-2 border-[#569CD6]">
                <img
                  src="/images/me3.jpg"
                  alt="Developer Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
            <div className="text-[#569CD6] font-bold mb-2">// About Me</div>
            <p className="text-[#D4D4D4] mb-4">
              I'm a passionate Full Stack Developer with expertise in building modern web applications. With over 1
              years of experience, I specialize in creating responsive, user-friendly interfaces and robust backend
              systems.
            </p>
            <p className="text-[#D4D4D4]">
              My goal is to deliver high-quality solutions that solve real-world problems and provide exceptional user
              experiences. I'm constantly learning and exploring new technologies to stay at the forefront of web
              development.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#569CD6] font-bold mb-2">// Professional Skills</div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span>React/Next.js</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-[#3C3C3C] rounded-full h-2">
                <div className="bg-[#569CD6] h-2 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>TypeScript</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-[#3C3C3C] rounded-full h-2">
                <div className="bg-[#569CD6] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              
              <div className="flex justify-between mb-1 mt-3">
                <span>JavaScript</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-[#3C3C3C] rounded-full h-2">
                <div className="bg-[#569CD6] h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Node.js</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-[#3C3C3C] rounded-full h-2">
                <div className="bg-[#569CD6] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>UI/UX Design</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-[#3C3C3C] rounded-full h-2">
                <div className="bg-[#569CD6] h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#252526] border border-[#3C3C3C] rounded-md p-4">
          <div className="text-[#6A9955] font-bold mb-2">// Personal Interests</div>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-[#D4D4D4]">Open Source Contribution</li>
            <li className="text-[#D4D4D4]">Learning New Technologies</li>
            <li className="text-[#D4D4D4]">Technical Writing</li>
            <li className="text-[#D4D4D4]">Mentoring Junior Developers</li>
            <li className="text-[#D4D4D4]">Attending Tech Conferences</li>
            <li className="text-[#D4D4D4]">Building Side Projects</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
