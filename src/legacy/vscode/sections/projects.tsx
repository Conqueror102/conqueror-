import { ExternalLink } from "lucide-react"
import { Github } from "@/components/icons/brand"
import { projects } from "@/content"

export function Projects() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[#6A9955] text-xl mb-2">// Projects</div>
        <div className="text-[#569CD6] text-3xl font-bold mb-4">My Work</div>
        <div className="text-[#D4D4D4]">A collection of my recent development projects</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-[#252526] border border-[#3C3C3C] rounded-md overflow-hidden hover:border-[#569CD6] transition-colors duration-200"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
         <div className="px-4 pt-3">
             {project.live && (
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-green-600 text-xs font-medium">Live</p>
        </div>
            )}
         </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#569CD6] text-lg font-bold">{project.title}</h3>
                <div className="flex space-x-2">
                  {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4D4D4] hover:text-[#569CD6]"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  )}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4D4D4] hover:text-[#569CD6]"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-[#D4D4D4] mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-[#1E1E1E] text-[#CE9178] px-2 py-1 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 border-t border-[#3C3C3C] bg-[#1E1E1E]">
              <div className="text-[#6A9955] text-xs">// View project details</div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
