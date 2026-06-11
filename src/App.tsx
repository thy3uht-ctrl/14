/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Project } from "./types";
import { PERSONAL_INFO } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import ProjectModal from "./components/ProjectModal";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsSection from "./components/SkillsSection";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto-detect active section during scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "skills"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBrowseProjects = () => {
    setActiveSection("projects");
    const el = document.getElementById("projects");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const handleContactMe = () => {
    window.location.href = `mailto:${PERSONAL_INFO.social.email}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-zinc-900 selection:bg-zinc-950 selection:text-white" id="portfolio-app-root">
      
      {/* Absolute top Navigation Header */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Single Page Sections */}
      <main className="relative" id="portfolio-main">
        {/* HERO SECTION (Text on left, portfolio image on right) */}
        <Hero
          onBrowseProjectsClick={handleBrowseProjects}
          onContactClick={handleContactMe}
        />

        {/* EXPERIENCES TIMELINE SECTION */}
        <ExperienceTimeline />

        {/* PORTFOLIO PROJECTS GRID SECTION */}
        <ProjectGrid onSelectProject={(project) => setSelectedProject(project)} />

        {/* COMPREHENSIVE SKILLS SECTION */}
        <SkillsSection />
      </main>

      {/* FOOTER BLOCK SECTION */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800" id="portfolio-footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo brand copyrights */}
          <div className="flex flex-col space-y-2 text-center md:text-left" id="footer-branding">
            <span className="font-display font-bold tracking-wider text-white text-lg">
              {PERSONAL_INFO.name}
            </span>
            <p className="font-sans text-xs text-zinc-500 max-w-sm font-light">
              融合極致美學與極速效能的數位設計工程師。© {new Date().getFullYear()} {PERSONAL_INFO.englishName}. 保留所有權利。
            </p>
          </div>

          {/* Quick link tags in footer */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wider text-zinc-500" id="footer-actions">
            <a href="#hero" className="hover:text-white transition-colors">回到頂端</a>
            <a href="#projects" className="hover:text-white transition-colors">作品</a>
            <a href="#experience" className="hover:text-white transition-colors">經歷</a>
            <a href="#skills" className="hover:text-white transition-colors">技能</a>
            <a href={`mailto:${PERSONAL_INFO.social.email}`} className="hover:text-white transition-colors">商談</a>
          </div>

        </div>
      </footer>

      {/* Immersive Selected Project Slide-over description dialog */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
