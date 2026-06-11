import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXPERIENCES } from "../data";

export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState<string>("exp-1");

  // Visual images for each experience item
  const expPics: Record<string, string> = {
    "exp-1": "https://picsum.photos/seed/leadership/800/600",
    "exp-2": "https://picsum.photos/seed/creative_ux/800/600",
    "exp-3": "https://picsum.photos/seed/fullstack_dev/800/600"
  };

  const expShortTitles: Record<string, string> = {
    "exp-1": "伊甸",
    "exp-2": "占卜",
    "exp-3": "加雷馬一日遊"
  };

  return (
    <section 
      id="experience" 
      className="relative py-28 bg-[#F7F7F7] text-zinc-900 overflow-hidden border-y border-zinc-200/80 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* Left Side Section Header */}
        <div className="lg:col-span-3 space-y-6" id="experience-header">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-none bg-zinc-800"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">illustration</span>
          </div>
          <h2 className="font-serif italic text-3xl md:text-5xl text-zinc-900 leading-tight">
            與FF14有關的插圖
          </h2>
          <p className="font-sans text-xs md:text-[13px] text-zinc-500 leading-relaxed font-light">
            在遊戲期間思維隨意發想而畫的圖
          </p>
        </div>

        {/* Right Side Accordion */}
        <div className="lg:col-span-9 flex flex-col md:flex-row gap-5 md:h-[500px] w-full items-stretch" id="experience-accordion">
          <AnimatePresence>
            {EXPERIENCES.map((exp) => {
               const isActive = exp.id === activeId;
               const imageUrl = expPics[exp.id] || "https://picsum.photos/seed/experience/800/600";
               const shortTitle = expShortTitles[exp.id] || exp.role;

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
                  key={exp.id}
                  id={`experience-card-${exp.id}`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveId(exp.id);
                    }
                  }}
                  className={`relative overflow-hidden rounded-sm border transition-all duration-500 flex flex-col justify-between ${
                    isActive 
                      ? "md:flex-[3.5] bg-white border-zinc-200/80 shadow-md" 
                      : "min-h-[140px] md:min-h-0 md:flex-[0.8] bg-zinc-50 hover:bg-zinc-100 border-zinc-200 hover:border-zinc-300 cursor-pointer shadow-sm group text-zinc-650"
                  }`}
                >
                  {isActive ? (
                    /* Expanded Layout */
                    <div className="flex flex-col md:flex-row h-full w-full animate-fadeIn">
                       <div className="relative overflow-hidden w-full md:w-[55%] h-[200px] md:h-full bg-zinc-100 shrink-0">
                        <img
                          src={imageUrl}
                          alt={exp.role}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 filter saturate-[90%]"
                        />
                      </div>

                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white h-full overflow-y-auto">
                        <div>
                           <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                              {exp.id === "exp-1" || exp.id === "exp-2" || exp.id === "exp-3" ? "2025 // FINAL FANTASY XIV" : `${exp.period} // CHRONOLOGY`}
                            </span>
                          </div>

                          <h3 className="font-serif italic text-zinc-900 mb-4 leading-snug" style={exp.id === "exp-1" ? { fontWeight: "normal", fontSize: "32px" } : (exp.id === "exp-2" || exp.id === "exp-3") ? { fontSize: "32px" } : undefined}>
                             {exp.role}
                          </h3>

                          <p className="font-sans text-xs md:text-sm text-zinc-500 leading-relaxed font-light mb-6">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Collapsed Stripe Layout */
                    <div className="absolute inset-0 w-full h-full flex flex-row md:flex-col justify-between items-center p-6 md:py-10 md:px-4 z-10 select-none">
                      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 group-hover:opacity-20 transition-all duration-700 -z-10">
                        <img 
                          src={imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover filter grayscale contrast-125 scale-105" 
                        />
                      </div>

                       <div className="hidden md:flex flex-1 items-center justify-center py-6">
                        <span className="vertical-text font-serif italic text-base text-zinc-700 tracking-[0.18em] uppercase font-bold group-hover:text-zinc-950 transition-colors whitespace-nowrap">
                          {shortTitle}
                        </span>
                      </div>

                       <div className="md:hidden flex-1 px-4 text-left">
                        <span className="font-serif italic text-base text-zinc-805 font-bold">
                          {shortTitle}
                        </span>
                      </div>

                      <div className="font-mono text-[9px] font-semibold text-zinc-500 uppercase tracking-widest bg-zinc-100 md:bg-transparent px-2.5 py-1 md:p-0 rounded-sm">
                        <span className="md:vertical-text">
                          {exp.id === "exp-1" || exp.id === "exp-2" || exp.id === "exp-3" ? "2025" : exp.period.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
