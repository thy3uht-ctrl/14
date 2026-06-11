import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const images = project.images && project.images.length > 0
    ? project.images
    : [project.imageUrl];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto reset index when the selected project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto" id="project-detail-modal">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        id="modal-backdrop"
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 md:pl-16">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-zinc-100"
          id="modal-panel-content"
        >
          {/* Modal Header */}
          <div className="px-6 py-6 border-b border-zinc-100 flex items-center justify-end sticky top-0 bg-white z-10">
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-50 transition-colors"
              title="Close Case Study"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Main Image Showcase */}
            <div className="flex flex-col items-center space-y-5 w-full" id="modal-image-container">
              <div className="relative rounded-sm overflow-hidden bg-zinc-100 border border-zinc-200 aspect-[21/29.7] w-full max-w-lg md:max-w-xl shadow-md group" id="modal-image-showcase">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${project.title} - 展示圖 ${currentIndex + 1}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover filter saturate-[95%]"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev(e);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200 p-2.5 rounded-full text-zinc-800 hover:text-zinc-950 transition-all shadow-md opacity-0 group-hover:opacity-100 duration-300"
                      title="上一張"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext(e);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200 p-2.5 rounded-full text-zinc-800 hover:text-zinc-950 transition-all shadow-md opacity-0 group-hover:opacity-100 duration-300"
                      title="下一張"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Total Index Indicator */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-sm tracking-widest uppercase font-bold">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Dots Controls */}
              {images.length > 1 && (
                <div className="flex items-center space-x-2 pt-1">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-6 bg-zinc-950" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                      title={`切換到第 ${idx + 1} 張`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Title Block */}
            <div className="space-y-3" id="modal-title-block">
              <h2 className={`text-zinc-900 leading-snug ${
                project.id === "1" || project.id === "2" || project.id === "3" || project.id === "4"
                  ? "font-['Times_New_Roman'] text-xl md:text-2xl font-normal"
                  : "font-serif text-xl md:text-2xl italic"
              }`}>
                {project.title}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
