import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute('/crew')({
  component: CrewPage,
});

// --- CONSTANTS & EASING ---
const transitionEase = [0.16, 1, 0.3, 1];
const transitionDuration = 1.4;

// --- SHARED TYPES ---
type SplitDirection = number;

interface CrewMember {
  id: number;
  number: string;
  name: string;
  role: string;
  description: string;
  image: string;
  layout: string;
}

// --- NAV DATA (single source of truth for both the real nav and the decorative arc text) ---
const navLinks = [
  { label: "HOME", href: "/" },
  { label: "FILM", href: "/film" },
  { label: "PHOTOGRAPHY", href: "/photography" },
  { label: "SERVICES", href: "/services" },
  { label: "CREW", href: "/crew" },
  { label: "ABOUT", href: "/about" },
];

// --- DATA ---
const crewData: CrewMember[] = Array.from({ length: 18 }).map((_, i) => {
  const num = i + 1;
  const layouts = ["editorial-split", "cinema-center", "offset-minimal", "landscape-overlap", "vertical-hero"];
  const names = [
    "MEERA KAPOOR", "SOPHIA LOREN", "ELENA RUST", "ANYA SHARMA", "ISABELLA VANE",
    "SARAH JENNINGS", "ARJUN MEHRA", "DAVID CHEN", "MARCUS WEBB", "ROHAN DESAI",
    "LUKE HARRISON", "THOMAS WRIGHT", "JULIAN COLES", "SAMIR KHAN", "VICTOR HUGO"
  ];
  const roles = [
    "Creative Director", "Lead Photographer", "Cinematographer", "Art Director", "Editor & Colorist",
    "Analog Specialist", "Lead Cinematographer", "Drone Operator", "Photographer", "Audio Director",
    "Second Shooter", "Lighting Tech", "Producer", "Cinematographer", "Film Photographer"
  ];
  return {
    id: num,
    number: String(num).padStart(2, "0"),
    name: names[i] || `MEMBER ${String(num).padStart(2, "0")}`,
    role: roles[i] || (i % 2 === 0 ? "Cinematographer" : "Photographer"),
    description: "Drawn to movement, music and the quiet moments between celebrations, they turn wedding days into films that feel like memories rather than productions.",
    image: `/images/crew/pic${num}.jpg`,
    layout: layouts[i % layouts.length],
  };
});

const gridAssets = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  type: "image",
  src: `/images/crew/pic${i + 1}.jpg`,
  caption: i % 3 === 0 ? "As Featured In — VOGUE" : i % 2 === 0 ? "Between Takes" : "On Location — Paris, 2024"
}));

// --- MOTION VARIANTS ---
const imageVariants: Record<string, Variants> = {
  "editorial-split": {
    enter: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", scale: 1.1, filter: "blur(10px)" }),
    center: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)", transition: { duration: transitionDuration, ease: transitionEase } },
    exit: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 0.95, filter: "blur(10px)", transition: { duration: transitionDuration * 0.8, ease: transitionEase } })
  },
  "cinema-center": {
    enter: () => ({ clipPath: "circle(0% at 50% 50%)", scale: 1.05 }),
    center: { clipPath: "circle(100% at 50% 50%)", scale: 1, transition: { duration: transitionDuration, ease: transitionEase } },
    exit: () => ({ clipPath: "circle(0% at 50% 50%)", scale: 0.95, transition: { duration: transitionDuration * 0.8, ease: transitionEase } })
  },
  "offset-minimal": {
    enter: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)", y: dir > 0 ? 100 : -100 }),
    center: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: transitionDuration, ease: transitionEase } },
    exit: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "polygon(0 0, 100% 0, 100% 0, 0 0)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: dir > 0 ? -100 : 100, transition: { duration: transitionDuration * 0.8, ease: transitionEase } })
  },
  "landscape-overlap": {
    enter: (dir: SplitDirection) => ({ opacity: 0, scale: 1.1, y: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, scale: 1, y: 0, transition: { duration: transitionDuration, ease: transitionEase } },
    exit: (dir: SplitDirection) => ({ opacity: 0, scale: 0.9, y: dir > 0 ? -50 : 50, transition: { duration: transitionDuration * 0.8, ease: transitionEase } })
  },
  "vertical-hero": {
    enter: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }),
    center: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: transitionDuration, ease: transitionEase } },
    exit: (dir: SplitDirection) => ({ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", transition: { duration: transitionDuration * 0.8, ease: transitionEase } })
  }
};

const textVariants: Variants = {
  enter: (dir: SplitDirection) => ({ y: dir > 0 ? 40 : -40, opacity: 0, filter: "blur(4px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: transitionEase, delay: 0.2, staggerChildren: 0.05 } },
  exit: (dir: SplitDirection) => ({ y: dir > 0 ? -40 : 40, opacity: 0, filter: "blur(4px)", transition: { duration: 0.6, ease: transitionEase } })
};

// --- MICRO-COMPONENTS ---
const StaggeredText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.span className={`inline-block whitespace-normal break-words ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            enter: { y: "100%", opacity: 0, rotateX: 90 },
            center: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: transitionEase } },
            exit: { y: "-100%", opacity: 0, rotateX: -90, transition: { duration: 0.4, ease: transitionEase } }
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const CrewMemberSlide = ({ member, direction }: { member: CrewMember; direction: number }) => {
  const { layout } = member;

  if (layout === "editorial-split") {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 py-24 md:p-24 gap-8 md:gap-12 bg-background text-foreground">
        <motion.div variants={textVariants} className="w-full md:w-5/12 flex flex-col justify-center z-10">
          <p className="font-display text-muted-foreground text-[clamp(4rem,10vw,8rem)] tracking-tighter mb-2 md:mb-4">{member.number}</p>
          <div className="overflow-hidden mb-2">
            <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-tighter leading-none">
              <StaggeredText text={member.name} />
            </h2>
          </div>
          <div className="w-full max-w-[200px] h-px bg-border my-4 md:my-6 origin-left transform scale-x-0 animate-[scaleX_1s_ease-out_forwards_0.5s]" />
          <p className="text-xs text-muted-foreground mb-4 md:mb-6 uppercase tracking-[0.2em]">{member.role}</p>
          <p className="text-sm md:text-base leading-relaxed text-foreground max-w-sm">{member.description}</p>
        </motion.div>

        <div className="w-full md:w-7/12 h-[45vh] md:h-full flex justify-end items-center relative">
          <motion.div variants={imageVariants[layout]} className="w-full md:max-w-[500px] h-full md:max-h-[80vh] relative overflow-hidden bg-muted rounded-sm">
            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-center" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (layout === "cinema-center") {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 md:p-12 bg-background text-foreground">
        <motion.div variants={imageVariants[layout]} className="absolute inset-0 w-full h-full overflow-hidden bg-muted">
          <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        </motion.div>

        <motion.div variants={textVariants} className="relative z-10 flex flex-col items-center text-center mt-auto pb-12 md:pb-24 w-full max-w-3xl px-4">
          <p className="font-display text-muted-foreground text-2xl md:text-3xl mb-4">{member.number} / 18</p>
          <h2 className="font-display font-light text-[clamp(3rem,6vw,6rem)] mb-4 uppercase tracking-tighter w-full">
            <StaggeredText text={member.name} />
          </h2>
          <div className="w-px h-12 md:h-16 bg-border my-4 md:my-6" />
          <p className="text-xs md:text-sm text-foreground uppercase tracking-[0.2em] mb-4">{member.role}</p>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg">{member.description}</p>
        </motion.div>
      </div>
    );
  }

  if (layout === "offset-minimal") {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center p-6 md:p-24 bg-background text-foreground">
        <div className="w-full md:w-1/2 h-[45vh] md:h-[70vh] flex justify-center md:justify-start">
          <motion.div variants={imageVariants[layout]} className="w-full max-w-[400px] h-full relative overflow-hidden rounded-sm">
            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-center" />
          </motion.div>
        </div>

        <motion.div variants={textVariants} className="w-full md:w-1/2 flex flex-col text-right md:pl-12 mt-8 md:mt-0 z-10">
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] mb-4 uppercase tracking-tighter ml-auto max-w-[12ch]">
            <StaggeredText text={member.name} />
          </h2>
          <p className="text-xs text-muted-foreground mb-6 uppercase tracking-[0.3em]">{member.role}</p>
          <div className="w-full h-px bg-border mb-6" />
          <p className="text-sm md:text-base text-foreground ml-auto max-w-sm">{member.description}</p>
          <p className="font-display text-muted-foreground text-[clamp(4.5rem,10vw,8rem)] mt-8 md:mt-12 transform md:translate-x-4">{member.number}</p>
        </motion.div>
      </div>
    );
  }

  if (layout === "landscape-overlap") {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-16 bg-background text-foreground">
        <motion.div variants={imageVariants[layout]} className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden shadow-xl rounded-sm">
          <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
        </motion.div>

        <motion.div variants={textVariants} className="absolute bottom-8 left-4 right-4 md:right-auto md:bottom-24 md:left-24 z-10 bg-background/95 backdrop-blur-md p-6 md:p-10 border border-border max-w-lg md:max-w-xl shadow-2xl">
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <span className="font-display text-3xl md:text-4xl text-muted-foreground">{member.number}</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">{member.role}</span>
          </div>
          <h2 className="font-display font-light text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 uppercase tracking-tighter">
            <StaggeredText text={member.name} />
          </h2>
          <p className="text-xs md:text-sm text-foreground leading-relaxed">{member.description}</p>
        </motion.div>
      </div>
    );
  }

  // fallback/vertical-hero
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-background text-foreground overflow-hidden">
      <motion.div variants={imageVariants["vertical-hero"]} className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full opacity-30 md:opacity-100">
        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
        <div className="absolute inset-0 bg-background/60 md:hidden" />
      </motion.div>
      <motion.div variants={textVariants} className="relative z-10 w-full px-6 md:px-24 flex flex-col justify-center">
        <div className="flex flex-col max-w-xl">
          <p className="font-display text-muted-foreground text-[clamp(2rem,4vw,4rem)] mb-4">{member.number} / 18</p>
          <h2 className="font-display font-light text-[clamp(3rem,6vw,7rem)] leading-[0.85] mb-6 md:mb-8 uppercase tracking-tighter break-words">
            <StaggeredText text={member.name} />
          </h2>
          <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="w-12 h-px bg-border" />
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.2em]">{member.role}</p>
          </div>
          <p className="text-sm md:text-base text-foreground max-w-md">{member.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

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
  useEffect(() => {
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

// --- MAIN COMPONENT ---
function CrewPage() {
  // Section Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const btsVideoRef = useRef<HTMLDivElement>(null);
  const gridVideoRef = useRef<HTMLVideoElement>(null);

  // States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Hero header-visibility state — controls whether the real site header is hidden.
  // Independent from isImmersive (Section 6's scroll-lock) so the two never fight each other.
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Crew Motion States
  const [isImmersive, setIsImmersive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSectionComplete, setIsSectionComplete] = useState(false);

  // --- HERO VISIBILITY OBSERVER ---
  // Hides the header while the hero is substantially in view, reveals it again
  // the moment the visitor scrolls past — and re-hides if they scroll back up to it.
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.intersectionRatio > 0.4);
      },
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // --- SECTION 6 SCROLL-LOCK LOGIC (unchanged behavior) ---
  useEffect(() => {
    const state = {
      isImmersive: false,
      activeIndex: 0,
      isTransitioning: false,
      lastScrollTime: Date.now(),
      member18Complete: false,
      isSectionComplete: false
    };

    let touchStartY = 0;

    const lockImmersive = (startIndex: number) => {
      if (state.isSectionComplete) return;
      state.isImmersive = true;
      state.activeIndex = startIndex;
      state.member18Complete = startIndex === 17;

      setIsImmersive(true);
      setActiveIndex(startIndex);

      if (stageContainerRef.current) {
        window.scrollTo({ top: stageContainerRef.current.offsetTop, behavior: 'instant' });
      }
    };

    const unlockImmersive = (exitDirection: "up" | "down") => {
      state.isImmersive = false;
      setIsImmersive(false);

      if (exitDirection === 'down') {
        state.isSectionComplete = true;
        setIsSectionComplete(true);
      }

      window.scrollBy({ top: exitDirection === 'down' ? 100 : -100, behavior: 'instant' });
    };

    const attemptEntry = (deltaY: number) => {
      if (state.isImmersive || state.isSectionComplete) return;
      if (!stageContainerRef.current) return;

      const rect = stageContainerRef.current.getBoundingClientRect();

      if (deltaY > 0 && rect.top <= 10 && rect.top >= -50) {
        lockImmersive(0);
      }
      else if (deltaY < 0 && rect.bottom <= window.innerHeight + 50 && rect.bottom >= window.innerHeight - 10) {
        lockImmersive(17);
      }
    };

    const handleNavigation = (deltaY: number) => {
      if (!state.isImmersive) {
        attemptEntry(deltaY);
        return false;
      }

      if (state.isTransitioning) return true;

      const now = Date.now();
      if (now - state.lastScrollTime < 100) return true;
      if (Math.abs(deltaY) < 15) return true;

      state.lastScrollTime = now;

      if (deltaY > 0) {
        if (state.activeIndex < 17) {
          state.isTransitioning = true;
          state.activeIndex++;
          setDirection(1);
          setActiveIndex(state.activeIndex);
          setTimeout(() => {
            state.isTransitioning = false;
            if (state.activeIndex === 17) state.member18Complete = true;
          }, transitionDuration * 1000);
        } else {
          if (state.member18Complete) {
            unlockImmersive('down');
          }
        }
      } else {
        if (state.activeIndex > 0) {
          state.isTransitioning = true;
          state.activeIndex--;
          state.member18Complete = false;
          setDirection(-1);
          setActiveIndex(state.activeIndex);
          setTimeout(() => { state.isTransitioning = false; }, transitionDuration * 1000);
        } else {
          unlockImmersive('up');
        }
      }
      return true;
    };

    const handleWheel = (e: WheelEvent) => {
      if (handleNavigation(e.deltaY)) e.preventDefault();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (state.isImmersive) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 30) handleNavigation(deltaY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.isImmersive) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"];
      if (keys.includes(e.code)) {
        e.preventDefault();
        if (e.code === "ArrowDown" || e.code === "PageDown" || (e.code === "Space" && !e.shiftKey)) {
          handleNavigation(50);
        } else if (e.code === "ArrowUp" || e.code === "PageUp" || (e.code === "Space" && e.shiftKey)) {
          handleNavigation(-50);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Intersection Observer for grid video autoplay
  useEffect(() => {
    if (!gridVideoRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gridVideoRef.current?.play().catch(() => {});
        } else {
          gridVideoRef.current?.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(gridVideoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-[100svh] selection:bg-foreground selection:text-background font-sans">

      {/* SCROLL LOCK — only while the Section 6 immersive stage is active */}
      {isImmersive && (
        <style>{`
          ::-webkit-scrollbar { display: none; }
          body { -ms-overflow-style: none; scrollbar-width: none; overflow: hidden; }
        `}</style>
      )}

      {/* HEADER CHROME HIDING — while hero is in view OR immersive stage is active */}
      {(isImmersive || isHeroVisible) && (
        <style>{`
          header, nav, .header-container, [data-header], .site-header {
            display: none !important; opacity: 0 !important; pointer-events: none !important;
          }
        `}</style>
      )}

      {/* SECTION 1 — TEAM PHOTO INTRO (HERO)
          Premium cinematic treatment: a full vignette over the photo (not just the header
          strip) so the whole frame reads as an intentional editorial portrait rather than a
          flat crop, an animated entrance for the header, a richer multi-stop gold/ivory arch
          top and bottom, and a slim scroll-cue anchoring the bottom of the frame. */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Group Photo — classic editorial B&W grade for maximum luxury feel */}
        <div className="absolute inset-0 w-full h-full">
          <motion.img
            src="/images/crew/group.png"
            alt="The full crew, together"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.12) brightness(0.97)" }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.92, scale: 1 }}
            transition={{ duration: 2.2, ease: transitionEase }}
          />
          {/* Full-frame cinematic vignette — darkens the corners/edges so the group photo reads
              as a graded, intentional portrait rather than a flat snapshot. Center stays clear. */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)" }}
          />
          {/* Faint warm overlay — a hint of gold over the monochrome, so it reads as a graded
              archival print rather than a plain desaturated photo */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-15"
            style={{ background: "linear-gradient(180deg, rgba(201,168,118,0.35) 0%, rgba(20,16,12,0) 45%, rgba(201,168,118,0.3) 100%)" }}
          />
        </div>

        {/* Gradient defs shared by both arcs — warm ivory/taupe sweep instead of flat fill */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="archGradientTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--background)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--background)" stopOpacity="0.92" />
              <stop offset="85%" stopColor="var(--accent, #C9A876)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--accent, #C9A876)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="archGradientBottom" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--background)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--background)" stopOpacity="0.92" />
              <stop offset="85%" stopColor="var(--accent, #C9A876)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--accent, #C9A876)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layered soft arch - top (mirror of bottom), richer two-tone gold-ivory sweep so the
            frame itself reads as a deliberate luxury detail rather than a plain crop. */}
        <svg
          className="absolute top-0 left-0 w-full h-[260px] pointer-events-none z-10"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,100 Q720,195 0,100 Z" fill="url(#archGradientTop)" opacity="0.6" />
          <path d="M0,0 L1440,0 L1440,68 Q720,150 0,68 Z" fill="url(#archGradientTop)" />
          {/* Hairline tracing the inner edge of the arch — the "frame" detail */}
          <path d="M0,68 Q720,150 1440,68" fill="none" stroke="var(--accent, #C9A876)" strokeWidth="1.5" opacity="0.55" />
        </svg>

        {/* Layered soft arch - bottom (exact mirror of top) */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[260px] pointer-events-none z-10"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
        >
          <path d="M0,260 L1440,260 L1440,160 Q720,65 0,160 Z" fill="url(#archGradientBottom)" opacity="0.6" />
          <path d="M0,260 L1440,260 L1440,192 Q720,110 0,192 Z" fill="url(#archGradientBottom)" />
          <path d="M0,192 Q720,110 1440,192" fill="none" stroke="var(--accent, #C9A876)" strokeWidth="1.5" opacity="0.55" />
        </svg>

        {/* Premium editorial header — centered monogram wordmark, symmetric nav split left/right.
            SEPARATE from the global site header (hidden while hero is in view via the
            style block above) — this one always shows here for the hero only.
            Luxury treatment: a firm top-down scrim so text is ALWAYS legible regardless of
            what's behind it, a small gold monogram badge, a fully centered serif wordmark
            with tagline, nav split evenly either side with faint dividers and a center-out
            gold underline on hover, and slim gold hairlines bracketing the whole bar. */}
        <motion.header
          className="absolute top-0 left-0 w-full z-30"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: transitionEase, delay: 0.3 }}
        >
          {/* Firm scrim — deliberately strong near the top so the wordmark/nav never wash out,
              regardless of how light the photo underneath happens to be. */}
          <div
            className="absolute inset-0 h-[220px] pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.8) 0%, rgba(10,8,6,0.5) 55%, rgba(10,8,6,0) 100%)" }}
          />

          {/* Top gold hairline */}
          <div
            className="relative h-px w-full opacity-60"
            style={{ background: "linear-gradient(90deg, transparent 0%, var(--accent, #C9A876) 50%, transparent 100%)" }}
          />

          <div className="relative flex items-center justify-between px-6 md:px-12 py-5 md:py-7">
            {/* Left nav group */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
              {navLinks.slice(0, 3).map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="h-3 w-px bg-white/25" aria-hidden="true" />}
                  <Link
                    to={link.href}
                    className="group relative text-white text-[11px] lg:text-xs uppercase tracking-[0.25em] pb-1 hover:text-[var(--accent,#C9A876)] transition-colors duration-300"
                  >
                    {link.label}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: "var(--accent, #C9A876)" }}
                    />
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            {/* Centered monogram + wordmark */}
            <Link to="/" className="group flex flex-col items-center shrink-0 px-4 md:px-8">
              <span
                className="w-8 h-8 md:w-10 md:h-10 mb-2 rounded-full flex items-center justify-center text-[11px] md:text-xs font-display tracking-widest transition-transform duration-500 group-hover:scale-105"
                style={{ border: "1px solid var(--accent, #C9A876)", color: "var(--accent, #C9A876)" }}
              >
                TM
              </span>
              <span className="text-white text-lg md:text-2xl tracking-[0.4em] font-display font-light leading-none whitespace-nowrap">
                THESWAYMVAR
              </span>
              <span className="mt-2 flex items-center gap-3 w-full justify-center">
                <span className="h-px w-6" style={{ background: "var(--accent, #C9A876)" }} />
                <span className="text-[9px] tracking-[0.35em] text-white/70 uppercase whitespace-nowrap">
                  Films &amp; Photography
                </span>
                <span className="h-px w-6" style={{ background: "var(--accent, #C9A876)" }} />
              </span>
            </Link>

            {/* Right nav group */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-end">
              {navLinks.slice(3).map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="h-3 w-px bg-white/25" aria-hidden="true" />}
                  <Link
                    to={link.href}
                    className="group relative text-white text-[11px] lg:text-xs uppercase tracking-[0.25em] pb-1 hover:text-[var(--accent,#C9A876)] transition-colors duration-300"
                  >
                    {link.label}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: "var(--accent, #C9A876)" }}
                    />
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            {/* Mobile: simple centered wordmark only (nav groups above are md:flex, hidden on mobile) */}
          </div>

          {/* Bottom gold hairline — brackets the bar for a framed, editorial feel */}
          <div
            className="relative h-px w-full opacity-50"
            style={{ background: "linear-gradient(90deg, transparent 0%, var(--accent, #C9A876) 50%, transparent 100%)" }}
          />
        </motion.header>

        {/* Bottom heading block — large centered wordmark line + tagline, sitting just above
            the arch. This is the section's visual anchor: the photo is the stage, this is
            the caption. Entrance is staggered slightly after the header for a considered,
            editorial reveal rather than everything appearing at once. */}
        <motion.div
          className="absolute bottom-[120px] md:bottom-[150px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center px-6 pointer-events-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: transitionEase, delay: 0.7 }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/70 uppercase mb-4">
            Fifteen Storytellers, One Vision
          </span>
          <h1 className="font-display text-white text-[clamp(3rem,6vw,6rem)] tracking-tight leading-none">
            CREW COLLECTIVE
          </h1>
          <span className="mt-5 flex items-center gap-4">
            <span className="h-px w-10" style={{ background: "var(--accent, #C9A876)" }} />
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] text-white/60 uppercase whitespace-nowrap">
              Meet the Crew
            </span>
            <span className="h-px w-10" style={{ background: "var(--accent, #C9A876)" }} />
          </span>
        </motion.div>

        {/* Slim scroll-cue — anchors the very bottom of the frame, sits above the arch */}
        <motion.div
          className="absolute bottom-14 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: transitionEase, delay: 1.3 }}
        >
          <span className="text-[9px] tracking-[0.35em] text-white/70 uppercase">Scroll</span>
          <motion.span
            className="h-10 w-px"
            style={{ background: "linear-gradient(180deg, var(--accent, #C9A876) 0%, transparent 100%)" }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* SECTION 2 — BRIDGE SECTION */}
      <section className="py-24 md:py-48 px-6 bg-background flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: transitionEase }}
        >
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4 md:mb-6">The People Behind the Frame</p>
          <p className="font-display text-2xl md:text-4xl text-foreground max-w-[600px] leading-relaxed">
            A collective of storytellers, shooters, and dreamers — spread across continents, united by one obsession: capturing love the way it actually feels.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4 — BTS VIDEO (VIEWPORT FIT) */}
      <section ref={btsVideoRef} className="h-[calc(100svh-var(--header-height))] bg-background relative z-20 flex items-center justify-center p-4 md:p-10 lg:p-14">
        <div className="relative w-full h-full max-w-[1600px] overflow-hidden rounded-[4px]">
          {/* Padded frame border */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{ border: "1px solid rgba(201, 168, 118, 0.35)" }}
          />

          {/* Viewfinder-style corner marks */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8 md:w-12 md:h-12 z-20 pointer-events-none`}
              style={{ borderColor: "var(--accent, #C9A876)", borderWidth: "1.5px" }}
            />
          ))}

          <div className="w-full h-full relative bg-foreground overflow-hidden">
            <video
              src="/videos/videoseen.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Static caption overlay — no interaction, no play control, sound stays off */}
            <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center z-10 p-6 pointer-events-none">
              <p className="text-xs text-white/80 mb-6 uppercase tracking-[0.4em]">On Location</p>
              <h2 className="font-display text-white text-[clamp(3rem,8vw,9rem)] tracking-tighter leading-none">
                BEHIND THE SCENES
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TRANSITION TEXT */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-16 px-6 bg-background flex justify-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: transitionEase }}
          className="font-display text-[clamp(2rem,4vw,4rem)] text-foreground"
        >
          Every frame tells a story. Here's ours, unfiltered.
        </motion.h2>
      </section>

      {/* SECTION 5 — BEHIND THE FRAME (EDITORIAL PHOTO GRID) */}
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

      
      {/* SECTION 7 — ABOUT */}
      <section className="py-32 md:py-48 bg-white border-t border-border flex flex-col items-center justify-center text-center px-4 relative z-20">
        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-[0.3em]">The Collective</p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-tighter mb-8">
          ABOUT US
        </h2>
        <p className="max-w-2xl text-foreground/80 text-sm md:text-base leading-relaxed mb-12">
          We are a team of passionate visual storytellers operating globally. We believe in authenticity, cinematic aesthetics, and preserving the raw emotion of your most important celebrations.
        </p>
        <Link to="/about" className="inline-block border border-foreground text-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer">
          Discover More
        </Link>
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

      <style>{`
        @keyframes scaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}