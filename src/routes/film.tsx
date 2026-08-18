import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { FilmCollection } from "@/components/film/FilmCollection";
import { stories } from "@/data/site";

function FilmPage() {
  return (
    <>
      <Hero />
      <FilmCollection />
      <CinematicChapters />
      <HowWeCaptureScroller />
    </>
  );
}

export const Route = createFileRoute("/film")({
  component: FilmPage,
});

function CinematicChapters() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="font-display text-4xl text-charcoal">The Chapters</h3>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every celebration has its own rhythm. We structure our approach to match the natural flow of your days, ensuring nothing is missed but everything is felt.
          </p>
        </div>
        <div className="space-y-6">
          {["The Quiet Before", "The Ceremony", "The Celebration"].map((chapter, i) => (
            <div key={i} className="flex items-baseline gap-4 border-b border-border/50 pb-4">
              <span className="font-display text-2xl text-bronze/60">0{i + 1}.</span>
              <span className="font-sans text-lg font-light text-charcoal">{chapter}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
    HOW WE CAPTURE YOU — REDESIGNED SCROLLER
===================================================== */
function HowWeCaptureScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const couples = stories.map((s) => {
    const existingImages = (s.gallery || []).map(g => g.src);
    const defaultImages = [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2069",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=1974"
    ];
    
    return {
      name: s.couple,
      line: s.intro ?? `"Love is not about how many days,\nmonths, or years you have been together.\nLove is about how much you love each other every single day."`,
      images: [
        existingImages[0] || defaultImages[0],
        existingImages[1] || defaultImages[1],
        existingImages[2] || defaultImages[2],
      ]
    };
  });

  const total = couples.length;

  const goTo = useCallback(
    (idx: number) => {
      const i = Math.max(0, Math.min(total - 1, idx));
      setCurrent(i);
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: track.offsetWidth * i, behavior: "smooth" });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].pageX : e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.scrollSnapType = 'none';
  };

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX.current) * 1.5; 
    trackRef.current.scrollLeft = scrollStart.current - walk;
  };

  const onMouseUp = () => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;
    
    if (trackRef.current) trackRef.current.style.scrollSnapType = 'x mandatory';
    const trackWidth = trackRef.current.offsetWidth;
    const scrollLeft = trackRef.current.scrollLeft;
    const closestSlide = Math.round(scrollLeft / trackWidth);
    
    goTo(closestSlide);
  };

  const handleScroll = () => {
      if(!trackRef.current || isDragging.current) return; 
      const trackWidth = trackRef.current.offsetWidth;
      const scrollLeft = trackRef.current.scrollLeft;
      const index = Math.round(scrollLeft / trackWidth);
      
      if(index !== current && index >= 0 && index < total) {
          setCurrent(index);
      }
  };

  return (
    <section className="overflow-hidden bg-charcoal text-ivory h-[calc(100svh-var(--header-height))]">
      {/* 
        We remove the top padding and header text here to make the 
        slides full-bleed and cinematic, perfectly matching the reference. 
      */}
      <div className="relative w-full group">
        
        {/* Interactive Slide Track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing snap-x snap-mandatory w-full hide-scrollbar"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch" 
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onMouseDown}
          onTouchMove={onMouseMove}
          onTouchEnd={onMouseUp}
          onScroll={handleScroll}
        >
          {couples.map((couple, ci) => {
            // Split name nicely, defaulting to "Story" if only one name exists
            const names = couple.name.split(/ & | and | \| /i);
            const firstName = names[0];
            const secondName = names[1] || "Story";
            
            return (
            <div
              key={ci}
              className="flex-none w-full min-w-full box-border snap-center shrink-0 relative h-full group/slide flex items-center justify-center"
            >
              {/* Image 1: The Full Bleed Background (The "Wings") */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#111]">
                <img 
                  src={couple.images[0]} 
                  alt="" 
                  className="w-full h-full object-cover object-center grayscale opacity-40 blur-[1px] pointer-events-none select-none" 
                  draggable={false} 
                />
              </div>

              {/* The Central Editorial Column */}
              <div className="relative z-10 w-[95%] md:w-[85%] lg:w-[70%] xl:w-[60%] max-w-[1100px] bg-charcoal h-full flex flex-col justify-between py-12 md:py-20 px-4 md:px-16 shadow-2xl border-x border-ivory/10 select-none pointer-events-none">
                
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  {/* Quote (Top) */}
                  <p className="font-display text-base md:text-lg lg:text-xl text-ivory/80 font-light mb-8 md:mb-14 max-w-2xl mx-auto text-center tracking-wide leading-[1.8] whitespace-pre-line">
                    {couple.line}
                  </p>

                  {/* Elegant Names (Middle) */}
                  <div className="flex justify-center items-center gap-6 md:gap-10 mb-10 md:mb-16 w-full">
                    <span className="font-display text-[clamp(3.5rem,8vw,7rem)] text-ivory font-light tracking-tight leading-none">
                      {firstName}
                    </span>
                    <span className="font-display text-[clamp(2.25rem,5vw,3.75rem)] text-ivory/50 font-thin translate-y-[-4px]">
                      |
                    </span>
                    <span className="font-display text-[clamp(3.5rem,8vw,7rem)] text-ivory font-light tracking-tight leading-none">
                      {secondName}
                    </span>
                  </div>

                  {/* Side-by-side Framed Photography (Bottom) */}
                  {/* The reference uses slightly wider/squarer images rather than tall portraits */}
                  <div className="flex flex-row justify-center w-full max-w-4xl mx-auto gap-4 md:gap-8 lg:gap-12 px-2 md:px-0">
                    
                    {/* Left Frame */}
                    <div className="w-1/2 aspect-[5/4] md:aspect-[4/3] border-[2px] md:border-[3px] border-ivory overflow-hidden relative shadow-lg">
                      <img
                        src={couple.images[1]}
                        alt={`${couple.name} - 1`}
                        className="w-full h-full object-cover grayscale brightness-95 contrast-110 pointer-events-none"
                        draggable={false}
                      />
                    </div>

                    {/* Right Frame */}
                     <div className="w-1/2 aspect-[5/4] md:aspect-[4/3] border-[2px] md:border-[3px] border-ivory overflow-hidden relative shadow-lg">
                      <img
                        src={couple.images[2]}
                        alt={`${couple.name} - 2`}
                        className="w-full h-full object-cover grayscale brightness-95 contrast-110 pointer-events-none"
                        draggable={false}
                      />
                    </div>

                  </div>
                </div>

                {/* Bottom Logo Mark */}
                <div className="pt-12 md:pt-16 flex flex-col items-center justify-center pb-4">
                   <span className="font-display text-3xl md:text-4xl tracking-[0.25em] text-ivory font-medium opacity-90 drop-shadow-sm">
                     theswaymvar
                   </span>
                </div>

              </div>
            </div>
          )})}
        </div>

        {/* Floating Desktop Arrow Controls */}
        <button
          onClick={(e) => { e.stopPropagation(); goTo(current - 1); }}
          disabled={current === 0}
          aria-label="Previous couple"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-ivory/20 bg-black/20 backdrop-blur-md items-center justify-center text-ivory hover:border-ivory hover:bg-charcoal/80 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:-translate-x-4 z-30 cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-8 h-8 stroke-[1]" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goTo(current + 1); }}
          disabled={current === total - 1}
          aria-label="Next couple"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-ivory/20 bg-black/20 backdrop-blur-md items-center justify-center text-ivory hover:border-ivory hover:bg-charcoal/80 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:translate-x-4 z-30 cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-8 h-8 stroke-[1]" />
        </button>

      </div>

      {/* Global Pagination Indicators (Subtle, below the viewport edge) */}
      <div className="py-8 bg-charcoal flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-xl text-ivory/40 w-6 text-right">
             {String(current + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-4">
            {couples.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to couple ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-300 border-none p-0 cursor-pointer"
                style={{
                  backgroundColor: i === current ? "var(--tw-colors-bronze)" : "var(--tw-colors-ivory)",
                  opacity: i === current ? 1 : 0.2,
                  transform: i === current ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="font-display text-xl text-ivory/40 w-6">
             {String(total).padStart(2, '0')}
          </span>
        </div>
        
        {/* Mobile Swipe Hint */}
        <span className="md:hidden font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ivory/40 mt-2">
          Swipe to explore
        </span>
      </div>
      
      {/* Hide scrollbar strictly */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
