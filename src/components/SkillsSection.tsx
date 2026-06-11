import React, { useState } from "react";
import { SKILL_CATEGORIES, PERSONAL_INFO } from "../data";
import SkillDetailModal from "./SkillDetailModal";
// @ts-expect-error - Vite handles static image imports smoothly
import carouselImage from "../assets/images/carousel_core_tech_1781038445212.png";
// @ts-expect-error - Vite handles static image imports smoothly
import ffxivSkillsBg from "../assets/images/ffxiv_skills_bg_1_1781029098118.png";
// @ts-expect-error - Vite handles static image imports smoothly
import ff14HeroPortrait from "../assets/images/ff14_hero_portrait_1781087450558.png";

export default function SkillsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Backing images for categories.
  const cardImages = [
    ffxivSkillsBg,
    carouselImage,
    ff14HeroPortrait
  ];

  return (
    <section id="skills" className="py-24 bg-[#1A1A1A] text-white overflow-hidden border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16" id="skills-heading-container">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-none bg-white/80 animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Final Fantasy OST</span>
          </div>
          <h2 className="font-serif italic text-3xl md:text-5xl text-white">
            遊戲音樂推薦
          </h2>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
            這裡將推薦FF系列除劇情外最知名的遊戲特色，壯闊史詩的遊戲原聲帶。<br />
            每一首曲子在遊戲中都能與劇情相對應且足夠顯眼，不是只落於背景的音樂。
          </p>
        </div>

        {/* Dynamic skills cards (3 clean columns with overlays) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="skills-grid">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.title} 
              id={`skills-cat-card-${idx}`}
              onClick={() => setSelectedIdx(idx)}
              className="relative overflow-hidden rounded-sm aspect-[3/4] border border-zinc-800 bg-zinc-950 flex flex-col justify-end group hover:border-zinc-400 transition-all duration-500 shadow-lg cursor-pointer"
            >
              {/* Backing Image */}
              {cardImages[idx] && (
                <div className="absolute inset-0 w-full h-full bg-zinc-950">
                  <img 
                    src={cardImages[idx]} 
                    alt={cat.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-[1000ms] ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                </div>
              )}

              {/* Decorative drafting borders */}
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-white/10 group-hover:bg-white/20 transition-colors pointer-events-none" />
              <div className="absolute top-0 right-0 w-[1px] h-16 bg-white/10 group-hover:bg-white/20 transition-colors pointer-events-none" />

              {/* Titles Description overlay */}
              <div className="space-y-3 z-10 w-full font-sans p-6 sm:p-8 bg-gradient-to-t from-zinc-950 to-transparent">
                <div className="space-y-1">
                  <h3 
                    style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                    className="font-serif italic text-2xl md:text-3xl font-medium text-white tracking-wide leading-tight"
                  >
                    {cat.title}
                  </h3>
                </div>
                <div className="h-[2px] w-12 bg-white/50 group-hover:w-24 transition-all duration-500 rounded-none" />
                <p className="font-sans text-[11px] sm:text-xs text-zinc-200 font-light tracking-wide pt-1 opacity-90 leading-relaxed group-hover:text-white transition-colors">
                  {cat.description || `${cat.skills.slice(0, 3).join(" • ")}...`}
                </p>
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-zinc-300 group-hover:text-white pt-2 transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-300">
                  <span>點擊查看詳情</span>
                  <span>→</span>
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Ambient bottom box */}
        <div className="mt-16 bg-zinc-900 p-6 rounded-sm border border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-6" id="skills-footer-cta">
          <div className="space-y-1">
            <h4 className="font-sans text-sm font-semibold text-zinc-200">
              需要定制專屬的設計系統或高性能 Web 重構嗎？
            </h4>
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.social.email}`}
            className="bg-white text-zinc-950 font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-zinc-100 transition-colors shrink-0"
            id="skills-footer-contact-link"
          >
            索取服務提案
          </a>
        </div>

      </div>

      {/* Render the full slide modal */}
      <SkillDetailModal 
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        categories={SKILL_CATEGORIES}
        initialIndex={selectedIdx !== null ? selectedIdx : 0}
      />
    </section>
  );
}
