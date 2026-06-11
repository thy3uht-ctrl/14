import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data";

interface HeroProps {
  onBrowseProjectsClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onBrowseProjectsClick, onContactClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-16 md:py-20 max-w-7xl mx-auto px-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
        {/* Left Side: Rich text Content */}
        <motion.div
          id="hero-text-container"
          className="md:col-span-5 lg:col-span-6 flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Welcome Tag */}
          <div className="flex items-center space-x-2" id="hero-welcome-badge">
            <span className="w-6 h-[1px] bg-zinc-400"></span>
            <span className="font-mono text-[10px] lowercase tracking-widest text-zinc-400 font-bold">
              welcome to my space
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3" id="hero-heading-block">
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[2.6rem] text-zinc-900 leading-tight tracking-tight animate-fadeIn">
              1年前入坑FF系列，<br />
              從此踏上了不歸路
            </h2>
          </div>

          {/* Rich Description */}
          <div className="space-y-4 max-w-full md:max-w-2xl lg:max-w-[580px]" id="hero-description-block">
            <p className="font-sans text-xs md:text-[13px] leading-relaxed text-zinc-500 font-normal">
              {PERSONAL_INFO.bio}
            </p>
            {PERSONAL_INFO.subBio.split("\n\n").map((para, i) => (
              <p key={i} className="font-sans text-xs md:text-[13px] leading-relaxed text-zinc-500 font-light">
                {para}
              </p>
            ))}
          </div>

          {/* Call to Actions / Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1" id="hero-cta-group">
            <button
              id="hero-view-work-btn"
              onClick={onBrowseProjectsClick}
              className="flex items-center space-x-2 bg-zinc-950 text-white select-none hover:bg-zinc-800 px-5 py-3.5 rounded-sm font-sans text-[11px] font-bold tracking-widest uppercase transition-all shadow-md group border border-transparent"
            >
              <span>瀏覽精選作品</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>

        {/* Right Side: Portrait/Artwork */}
        <motion.div
          id="hero-artwork-container"
          className="md:col-span-7 lg:col-span-6 flex justify-center items-center relative w-full"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait Image */}
          <div className="relative overflow-hidden rounded-sm shadow-lg w-full max-w-[450px] aspect-[3/4] flex items-center justify-center">
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={`${PERSONAL_INFO.name} - Portrait Illustration`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover smooth-hover hover:scale-101 filter grayscale-[15%] hover:grayscale-0 duration-700"
              id="hero-portrait-img"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
