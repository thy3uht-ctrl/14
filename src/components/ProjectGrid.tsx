import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectGrid({ onSelectProject }: ProjectGridProps) {
  const [activeId, setActiveId] = useState<string>("1");

  const filteredProjects = PROJECTS;

  // Safeguard: make sure activeId is in filter list
  const isCurrentActiveInFilter = filteredProjects.some(p => p.id === activeId);
  const currentActiveId = isCurrentActiveInFilter ? activeId : (filteredProjects[0]?.id || "1");

  return (
    <section id="projects" className="py-24 bg-[#F7F7F7] border-y border-zinc-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" id="projects-header">
          <div className="space-y-4 max-w-3xl md:max-w-5xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-none bg-zinc-900"></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">comics</span>
            </div>
            <h2 className="font-serif italic text-3xl md:text-5xl text-zinc-900">
              FF14同人小漫畫
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light md:whitespace-nowrap">
              在遊玩遊戲期間對劇情的一些二次創作漫畫，與我自己希望能看到的光之戰士與他人的互動關係。
            </p>
          </div>
        </div>

        {/* Project Vertical Stripe Accordion Container */}
        <motion.div 
          className="flex flex-col md:flex-row gap-5 md:h-[620px] w-full items-stretch"
          layout
          id="project-cards-container"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isActive = project.id === currentActiveId;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveId(project.id);
                    }
                  }}
                  className={`relative overflow-hidden rounded-sm border transition-all duration-500 flex flex-col justify-between ${
                    isActive 
                      ? "md:flex-[3.5] bg-white border-zinc-200/80 shadow-md" 
                      : "min-h-[140px] md:min-h-0 md:flex-[0.8] bg-zinc-50 hover:bg-zinc-100 border-zinc-200 cursor-pointer shadow-sm group"
                  }`}
                >
                  {isActive ? (
                    /* Expanded Active Layout view */
                    <div className="flex flex-col md:flex-row h-full w-full animate-fadeIn">
                      <div 
                        className="relative overflow-hidden w-full md:w-[45%] h-[280px] md:h-full bg-[#EAEAEA] cursor-pointer shrink-0"
                        onClick={() => onSelectProject(project)}
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 filter saturate-[90%]"
                        />
                      </div>

                      {/* Info Text segment */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white h-full overflow-y-auto">
                        <div className="space-y-4">
                          <div className="mb-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                              2025 // FINAL FANTASY XIV
                            </span>
                          </div>

                          <h3 
                            onClick={() => onSelectProject(project)}
                            className={`hover:text-zinc-600 transition-colors cursor-pointer mb-4 leading-snug ${
                              project.id === "1" || project.id === "2" || project.id === "3" || project.id === "4"
                                ? "font-['Times_New_Roman'] text-[26px] md:text-[26px] font-normal" 
                                : "font-serif italic text-xl md:text-2xl text-zinc-900"
                            }`}
                          >
                            {project.title}
                          </h3>

                          <p className="font-sans text-xs md:text-sm text-zinc-500 leading-relaxed font-light whitespace-pre-line">
                            {project.description}
                          </p>
                        </div>

                        {/* View Details Action Button */}
                        <div className="flex justify-end mt-6 pt-4 border-t border-zinc-50">
                          <button
                            onClick={() => onSelectProject(project)}
                            className="bg-zinc-900 hover:bg-zinc-800 text-white font-sans font-medium text-[11px] tracking-widest uppercase py-2.5 px-5 rounded-sm flex items-center space-x-2 transition-all shadow-sm ring-1 ring-zinc-950/5 active:scale-98"
                          >
                            <span>觀看小漫畫</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Collapsed Stripe Layout view */
                    <div className="absolute inset-0 w-full h-full flex flex-row md:flex-col justify-between items-center p-6 md:py-10 md:px-4 z-10 select-none">
                      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 group-hover:opacity-20 transition-all duration-700 -z-10">
                        <img 
                          src={project.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover filter grayscale contrast-125 scale-105" 
                        />
                      </div>

                      {/* Middle Vertical text */}
                      <div className="hidden md:flex flex-1 items-center justify-center py-6">
                        <span className={`vertical-text text-lg text-zinc-700 tracking-[0.18em] uppercase font-bold group-hover:text-zinc-950 transition-colors whitespace-nowrap ${
                          project.id === "1" || project.id === "2" || project.id === "3" || project.id === "4"
                            ? "font-['Times_New_Roman'] font-normal"
                            : "font-serif italic"
                        }`}>
                          {project.title.split(" - ")[0]}
                        </span>
                      </div>

                      {/* Mobile-only view title block */}
                      <div className="md:hidden flex-1 px-4 text-left">
                        <span className={`text-base text-zinc-800 font-bold ${
                          project.id === "1" || project.id === "2" || project.id === "3" || project.id === "4"
                            ? "font-['Times_New_Roman'] font-normal"
                            : "font-serif italic"
                        }`}>
                          {project.title.split(" - ")[0]}
                        </span>
                      </div>

                      {/* Bottom indicator */}
                      <div className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-widest bg-zinc-150 md:bg-transparent px-2.5 py-1 md:p-0 rounded-sm">
                        <span className="md:vertical-text bg-[#F3F4F6] md:bg-transparent px-2.5 py-1 md:p-0 font-bold border border-zinc-200 md:border-none rounded-sm">
                          2025
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
