import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transitionEase = [0.16, 1, 0.3, 1];

const gridAssets = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  type: "image",
  src: `/images/crew/pic${i + 1}.jpg`,
  caption: i % 3 === 0 ? "As Featured In — VOGUE" : i % 2 === 0 ? "Between Takes" : "On Location — Paris, 2024"
}));

// --- LIGHTBOX COMPONENT ---
const Lightbox = ({
  assets,
  activeIndex,
  onClose,
  onNavigate
}: {
  assets: typeof gridAssets,
  activeIndex: number | null,
  onClose: () => void,
  onNavigate: (dir: number) => void
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose, onNavigate]);

  if (activeIndex === null) return null;
  const item = assets[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white p-2 z-50 hover:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          className="absolute left-4 md:left-8 text-white p-4 z-50 hover:opacity-70 transition-opacity"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          className="absolute right-4 md:right-8 text-white p-4 z-50 hover:opacity-70 transition-opacity"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.4, ease: transitionEase }}
          className="relative max-w-5xl w-full max-h-[85vh] h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video src={item.src} autoPlay controls playsInline className="max-w-full max-h-full object-contain" />
          ) : (
            <img src={item.src} alt="" className="max-w-full max-h-full object-contain" />
          )}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm uppercase tracking-widest text-center w-full">
            {item.caption}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export function CrewSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* BRIDGE SECTION */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 px-6 bg-background flex flex-col items-center text-center border-t border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: transitionEase }}
        >
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4 md:mb-6">The People Behind the Frame</p>
          <p className="font-display text-2xl md:text-4xl text-foreground max-w-[600px] leading-relaxed mx-auto">
            A collective of storytellers, shooters, and dreamers — spread across continents, united by one obsession: capturing love the way it actually feels.
          </p>
        </motion.div>
      </section>

      {/* BEHIND THE FRAME (EDITORIAL PHOTO GRID) */}
      <section className="pt-4 pb-12 md:pb-24 px-4 md:px-12 bg-background">
        <div className="max-w-[1600px] mx-auto text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4">Behind The Frame</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground tracking-tight">Candid Moments, Unposed</h2>
        </div>
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {gridAssets.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-2 md:p-3 border border-border cursor-pointer group aspect-square hover:shadow-xl transition-all duration-500"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="w-full h-full relative overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt="Editorial candid"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Hover Caption */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <span className="text-white text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
                    {item.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX PORTAL */}
      <Lightbox
        assets={gridAssets}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) => {
          setLightboxIndex(prev => {
            if (prev === null) return null;
            const next = prev + dir;
            if (next < 0) return gridAssets.length - 1;
            if (next >= gridAssets.length) return 0;
            return next;
          });
        }}
      />
    </>
  );
}
