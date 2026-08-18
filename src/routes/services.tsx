import React, { useEffect, useRef, useState, useLayoutEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { X, ArrowRight, ArrowUpRight, Camera, Film } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createFileRoute } from '@tanstack/react-router';
import { images } from "@/data/images";

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const PAPER = '#F6F4EE';
const INK = '#15130F';
const INK_ALT = '#1C1912';
const INK_TEXT = '#2A2721';
const HAIRLINE_LIGHT = '#DCD7C9';
const HAIRLINE_DARK = 'rgba(255,255,255,0.12)';

type ServiceType = 'photography' | 'films';
type EventType = 'pre-wedding' | 'haldi' | 'mehndi' | 'sangeet' | 'wedding' | 'reception';

interface Project {
  id: string;
  coupleName: string;
  title: string;
  location: string;
  date: Date;
  year: string;
  category: string;
  featured: boolean;
  coverImage: string;
  services: ServiceType[];
  events: EventType[];
  description: string;
  gallery: string[];
}

const MOCK_PROJECTS: Project[] = [
  { id: 'p1', coupleName: 'Aarav & Priya', title: 'The Royal Jaipur Wedding', location: 'Rambagh Palace, Jaipur', date: new Date('2026-12-15'), year: '2026', category: 'Destination Wedding', featured: true, coverImage: images.moments[0], services: ['photography', 'films'], events: ['haldi', 'sangeet', 'wedding', 'reception'], description: 'A three-day royal affair in the heart of Rajasthan.', gallery: [images.moments[8], images.moments[9], images.moments[10]] },
  { id: 'p2', coupleName: 'Rohan & Siya', title: 'Minimalist Coastal Vows', location: 'Alila Diwa, Goa', date: new Date('2026-11-20'), year: '2026', category: 'Beach Wedding', featured: true, coverImage: images.moments[1], services: ['photography'], events: ['pre-wedding', 'wedding'], description: 'Sunsets, sea breeze, and intimate moments.', gallery: [images.moments[2], images.moments[3]] },
  { id: 'p3', coupleName: 'Karan & Meera', title: 'A Modern Fairytale', location: 'Lake Como, Italy', date: new Date('2026-09-10'), year: '2026', category: 'Elopement', featured: true, coverImage: images.moments[2], services: ['photography', 'films'], events: ['wedding'], description: 'An editorial dream on the shores of Lake Como.', gallery: [images.moments[4]] },
  { id: 'p4', coupleName: 'Rahul & Ananya', title: 'Neon & Traditions', location: 'Taj Palace, Delhi', date: new Date('2026-08-05'), year: '2026', category: 'Sangeet & Wedding', featured: false, coverImage: images.moments[3], services: ['films'], events: ['sangeet', 'mehndi'], description: 'A high-energy, vibrant collision of modern club aesthetics.', gallery: [] },
  { id: 'p5', coupleName: 'Vikram & Neha', title: 'Into the Mountains', location: 'Mussoorie', date: new Date('2026-06-12'), year: '2026', category: 'Pre-Wedding', featured: false, coverImage: images.moments[4], services: ['photography'], events: ['pre-wedding'], description: 'Misty mornings and cinematic landscapes.', gallery: [] },
  { id: 'p6', coupleName: 'Arjun & Riya', title: 'The Heritage Haldi', location: 'Udaipur', date: new Date('2026-05-22'), year: '2026', category: 'Haldi', featured: false, coverImage: images.moments[5], services: ['photography', 'films'], events: ['haldi'], description: 'Yellow hues, flower showers, and chaotic joy.', gallery: [] },
  { id: 'p7', coupleName: 'Sameer & Tara', title: 'Under the Stars', location: 'Suryagarh, Jaisalmer', date: new Date('2025-12-01'), year: '2025', category: 'Reception', featured: false, coverImage: images.moments[6], services: ['photography'], events: ['reception', 'sangeet'], description: 'A glittering reception in the desert.', gallery: [] },
  { id: 'p8', coupleName: 'Dev & Ishita', title: 'The Ancestral Home', location: 'Kerala', date: new Date('2025-10-15'), year: '2025', category: 'Traditional Wedding', featured: true, coverImage: images.moments[7], services: ['photography', 'films'], events: ['wedding'], description: 'Rooted in culture. A deeply traditional, soulful ceremony.', gallery: [] },
];

const HERO_SERVICES = [
  { id: 's1', title: 'Wedding Photography', image: images.services.wedding },
  { id: 's2', title: 'Wedding Films', image: images.services.films },
  { id: 's3', title: 'Pre-Wedding', image: images.moments[0] },
  { id: 's4', title: 'Destination Weddings', image: images.services.destination },
  { id: 's5', title: 'Editorial Portraits', image: images.moments[2] },
  { id: 's6', title: 'Engagements', image: images.moments[3] },
  { id: 's7', title: 'Albums & Heirlooms', image: images.services.finearts },
];

interface AppState {
  activeProject: Project | null;
  setActiveProject: (p: Project | null) => void;
}
const AppContext = createContext<AppState>({ activeProject: null, setActiveProject: () => {} });

function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  const useLayoutEffectHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useLayoutEffectHook(effect, deps);
}

const FrameCorners = ({ tone = 'light' }: { tone?: 'light' | 'dark' }) => {
  const color = tone === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(21,19,15,0.7)';
  return (
    <div className="pointer-events-none absolute inset-3 md:inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: color }} />
    </div>
  );
};

const SectionHeading = ({ title, subtitle, tone = 'light' }: { title: string, subtitle?: string, tone?: 'light' | 'dark' }) => (
  <div className="mb-14 md:mb-20 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
    <h2 className={cn("text-3xl md:text-5xl font-serif font-light tracking-tight uppercase", tone === 'light' ? "text-[#15130F]" : "text-neutral-50")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }} className="block">
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
    {subtitle && (
      <motion.p initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25, ease: EASE }} className={cn("font-sans tracking-[0.25em] uppercase text-[11px] md:text-xs max-w-xs", tone === 'light' ? "text-neutral-500" : "text-neutral-400")}>
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FilterTabs = ({ filters, active, onChange, tone = 'light' }: any) => (
  <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-serif text-sm md:text-base", tone === 'light' ? "text-neutral-400" : "text-white/40")}>
    {filters.map((f: any, i: number) => (
      <React.Fragment key={f.value}>
        {i > 0 && <span className="opacity-50 font-sans text-xs">|</span>}
        <button onClick={() => onChange(f.value)} className={cn("pb-0.5 border-b transition-colors duration-500", active === f.value ? cn("border-current", tone === 'light' ? "text-[#15130F]" : "text-white") : "border-transparent hover:opacity-80")}>
          {f.label}
        </button>
      </React.Fragment>
    ))}
  </div>
);

// EXACT 3D Cinematic Marquee 
const CinematicCard = ({ service, index, trackX, windowWidth, setHovered, CARD_WIDTH, GAP }: any) => {
  const ITEM_WIDTH = CARD_WIDTH + GAP;
  const localX = index * ITEM_WIDTH;

  // Global absolute position mapping for precise 3D math
  const globalX = useTransform(trackX, tx => tx + localX + CARD_WIDTH / 2);

  // Math mappings to create the exact visual 3D ring/form
  const rotateY = useTransform(globalX, gx => {
    const center = windowWidth / 2;
    const dist = gx - center;
    const norm = dist / (windowWidth * 0.55);
    return norm * 45; // Smooth rotation facing the center
  });

  const scale = useTransform(globalX, gx => {
    const center = windowWidth / 2;
    const dist = Math.abs(gx - center);
    const norm = dist / (windowWidth * 0.55);
    return Math.max(1 - norm * 0.2, 0.75); 
  });

  const z = useTransform(globalX, gx => {
    const center = windowWidth / 2;
    const dist = Math.abs(gx - center);
    const norm = dist / (windowWidth * 0.55);
    return -Math.abs(norm) * 350; // Push back significantly to create a real 3D cylinder depth
  });

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        position: 'absolute',
        left: 0,
        top: '50%', 
        y: '-50%',
        x: useTransform(trackX, tx => tx + localX),
        rotateY,
        scale,
        z,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group aspect-[3/4] md:aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer will-change-transform z-10 hover:z-20"
    >
      <img
        src={service.image}
        alt={service.title}
        loading="eager"
        className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#15130F] via-[#15130F]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
      
      <div className="absolute bottom-6 md:bottom-8 left-6 right-6 text-center">
        <h3 className="text-white font-serif text-lg md:text-xl opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-sm">
          {service.title}
        </h3>
      </div>
    </motion.div>
  );
};

const CinematicHero = () => {
  // Always initialize to 1200 on first render to prevent hydration mismatches
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isHovered, setHovered] = useState(false);
  const trackX = useMotionValue(0);

  useIsomorphicLayoutEffect(() => {
    // Immediately set to the correct width after hydration on the client
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const CARD_WIDTH = isMobile ? 240 : 320;
  const GAP = isMobile ? 16 : 40;
  const ITEM_WIDTH = CARD_WIDTH + GAP;
  
  // Create duplicates for endless loop
  const marqueeItems = [...HERO_SERVICES, ...HERO_SERVICES, ...HERO_SERVICES, ...HERO_SERVICES];
  const SET_WIDTH = HERO_SERVICES.length * ITEM_WIDTH;

  useAnimationFrame((time, delta) => {
    if (isHovered) return; 
    
    // Slow cinematic speed
    const speed = isMobile ? 40 : 65; 
    const moveBy = (speed * delta) / 1000;
    let nextX = trackX.get() - moveBy;
    
    if (nextX <= -SET_WIDTH) {
      nextX += SET_WIDTH; 
    }
    trackX.set(nextX);
  });

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 flex flex-col justify-center min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-gradient-to-b from-[#F2EFE8] to-[#EAE6D7]">
      
      {/* Subtle glowing center backdrop to enhance the premium feel & contrast */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[300px] md:h-[500px] bg-white/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center px-6 max-w-4xl mx-auto relative z-10 flex flex-col items-center mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          {/* Added pt-4 and changed leading to prevent font cutting at the top */}
          <h1 className="font-display font-normal text-[clamp(3rem,6vw,6rem)] text-[#15130F] mb-6 tracking-tight leading-tight pt-4">
            Crafting Timeless <br className="hidden md:block"/>
            <span className="font-display italic text-2xl md:text-3xl font-normal opacity-90">Wedding Stories</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-[#15130F]/60 max-w-2xl mx-auto leading-relaxed">
            Photography, Films and heirloom experiences designed with elegance, emotion and cinematic storytelling.
          </p>
        </motion.div>
      </div>

      <div 
        className="w-full relative h-[450px] md:h-[540px] cursor-grab active:cursor-grabbing flex-shrink-0"
        style={{ 
          perspective: '1200px', 
          transformStyle: 'preserve-3d',
          /* Smoothly fades out the cards at the edges of the screen, containing them in the hero */
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {marqueeItems.map((service, index) => (
          <CinematicCard
            key={`${service.id}-${index}`}
            service={service}
            index={index}
            trackX={trackX}
            windowWidth={windowWidth}
            setHovered={setHovered}
            CARD_WIDTH={CARD_WIDTH}
            GAP={GAP}
          />
        ))}
      </div>
    </section>
  );
};

// Rebuilt Featured Stories without GSAP
const FeaturedStoryItem = ({ project, index }: { project: Project, index: number }) => {
  const { setActiveProject } = useContext(AppContext);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={cn("relative group cursor-pointer flex flex-col", index % 2 === 0 ? "md:items-start" : "md:items-end")} onClick={() => setActiveProject(project)}>
      <div className="w-full md:w-[62vw] lg:w-[48vw] h-[46vh] md:h-[62vh] overflow-hidden relative border" style={{ borderColor: HAIRLINE_DARK }}>
        <div className="absolute inset-0" style={{ backgroundColor: INK_ALT }} />
        <motion.img 
          style={{ y: imgY, scale: 1.15 }} 
          src={project.coverImage} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover origin-center opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-700" />
        <FrameCorners tone="light" />
      </div>
      <div className={cn("absolute top-1/2 -translate-y-1/2 z-10 w-full pointer-events-none px-4 md:px-0", index % 2 === 0 ? "md:left-[40vw] text-left" : "md:right-[40vw] md:text-right")}>
        <div className="overflow-hidden mb-2">
          <motion.p initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="font-sans text-[11px] tracking-[0.3em] uppercase text-neutral-300 drop-shadow-md">
            {project.category} · {project.year}
          </motion.p>
        </div>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white tracking-tight mix-blend-difference group-hover:scale-[1.015] transition-transform duration-700 origin-left">
          {project.coupleName}
        </h3>
        <div className="overflow-hidden mt-3">
          <motion.p initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="font-display text-lg md:text-xl text-neutral-300 italic">
            {project.location}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const FeaturedStories = ({ projects }: { projects: Project[] }) => (
  <section className="py-28 md:py-36 relative z-10" style={{ backgroundColor: INK }}>
    <SectionHeading title="Selected Works" subtitle="Signature cinematic and editorial stories representing our craft at its finest." tone="dark" />
    <div className="flex flex-col gap-24 md:gap-32 px-6 md:px-12">
      {projects.map((project, index) => <FeaturedStoryItem key={project.id} project={project} index={index} />)}
    </div>
  </section>
);

// Rebuilt LatestStories using framer-motion useInView equivalent
const LatestStories = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveProject } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const sorted = [...projects].sort((a, b) => b.date.getTime() - a.date.getTime());
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });

  return (
    <section ref={containerRef} className="py-28 md:py-36 relative border-t" style={{ backgroundColor: PAPER, borderColor: HAIRLINE_LIGHT }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-12 relative">
        <div className="hidden md:block md:col-span-5 h-[90vh] sticky top-0 py-20">
          <div className="w-full h-full relative overflow-hidden border" style={{ borderColor: HAIRLINE_LIGHT }}>
            <AnimatePresence mode="popLayout">
              <motion.img key={activeIndex} src={sorted[activeIndex]?.coverImage} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.9, ease: EASE }} className="absolute inset-0 w-full h-full object-cover" />
            </AnimatePresence>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 py-10 md:py-40 flex flex-col gap-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-[1px]" style={{ backgroundColor: HAIRLINE_LIGHT }}>
            <motion.div className="w-full origin-top" style={{ scaleY: scrollYProgress, backgroundColor: INK }} />
          </div>
          <div className="mb-8 pl-8">
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: INK }}>Latest Journal</h2>
            <p className="font-sans tracking-[0.25em] uppercase text-xs text-neutral-500 mt-3">Chronicles of recent celebrations</p>
          </div>
          {sorted.map((project, i) => {
            const dateStr = project.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            return (
              <motion.div 
                key={project.id} 
                onViewportEnter={() => setActiveIndex(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={cn("pl-8 relative cursor-pointer group transition-opacity duration-500", i === activeIndex ? "opacity-100" : "opacity-40 hover:opacity-70")} 
                onClick={() => setActiveProject(project)}
              >
                <div className="md:hidden w-full h-44 mb-6 overflow-hidden border" style={{ borderColor: HAIRLINE_LIGHT }}>
                  <img src={project.coverImage} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-neutral-500 border rounded-full px-3 py-1" style={{ borderColor: HAIRLINE_LIGHT }}>{dateStr}</span>
                  <span className="w-8 h-[1px]" style={{ backgroundColor: HAIRLINE_LIGHT }} />
                  <span className="font-sans text-[11px] tracking-widest uppercase text-neutral-400">{project.category}</span>
                </div>
                <h3 className="font-display text-2xl md:text-4xl mb-2 group-hover:translate-x-2 transition-transform duration-500" style={{ color: INK }}>{project.coupleName}</h3>
                <p className="font-display text-base text-neutral-500 italic">{project.location}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ExploreService = () => {
  const [hovered, setHovered] = useState<ServiceType | null>(null);
  const services = [
    { id: 'photography' as ServiceType, title: 'Photography', subtitle: 'Timeless. Candid. Editorial.', desc: 'Still moments that speak volumes — from grand portraits to fleeting emotion.', img: images.services.wedding },
    { id: 'films' as ServiceType, title: 'Cinematic Films', subtitle: 'Motion. Sound. Emotion.', desc: 'Narrative-driven cinematic pieces, scored to perfection and color-graded like a feature film.', img: images.services.films }
  ];

  return (
    <section className="h-auto min-h-[calc(100svh-var(--header-height))] md:h-[calc(100svh-var(--header-height))] w-full flex flex-col md:flex-row overflow-hidden relative" style={{ backgroundColor: INK }}>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h2 className="text-white font-sans text-[11px] tracking-[0.4em] uppercase opacity-60">Our Expertise</h2>
      </div>
      {services.map((svc) => {
        const isHovered = hovered === svc.id;
        const isOtherHovered = hovered !== null && hovered !== svc.id;
        return (
          <motion.div key={svc.id} className="relative flex-1 h-full cursor-pointer overflow-hidden border-r last:border-0 group" style={{ borderColor: HAIRLINE_DARK }} animate={{ flex: isHovered ? 1.8 : isOtherHovered ? 0.6 : 1, opacity: isOtherHovered ? 0.55 : 1 }} transition={{ duration: 0.8, ease: EASE }} onMouseEnter={() => setHovered(svc.id)} onMouseLeave={() => setHovered(null)}>
            <motion.img src={svc.img} className="absolute inset-0 w-full h-full object-cover" animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 1.4, ease: 'easeOut' }} />
            <div className={cn("absolute inset-0 transition-colors duration-700", isHovered ? "bg-black/35" : "bg-black/60")} />
            <FrameCorners tone="light" />
            <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
              <motion.div animate={{ y: isHovered ? 0 : 16 }} transition={{ duration: 0.6, ease: EASE }}>
                <div className="flex items-center gap-3 mb-4">
                  {svc.id === 'photography' ? <Camera className="text-white/70" size={18} /> : <Film className="text-white/70" size={18} />}
                  <span className="font-sans text-[11px] tracking-widest uppercase text-white/70">{svc.subtitle}</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-5 uppercase tracking-tight">{svc.title}</h3>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="text-neutral-300 font-sans text-sm max-w-md leading-relaxed mb-7">{svc.desc}</p>
                      <button className="flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-white group/btn border-b border-white/30 pb-1 w-fit hover:border-white transition-colors">
                        Explore Portfolio <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

// Rebuilt Explore Event horizontally using framer-motion pure scroll mapping
const ExploreEvent = ({ projects }: { projects: Project[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // Map vertical scroll progress of this huge container to horizontal motion
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]); 

  const events: { id: EventType, title: string, desc: string }[] = [
    { id: 'pre-wedding', title: 'Pre-Wedding', desc: 'Editorial shoots capturing your chemistry before the chaos begins.' },
    { id: 'haldi', title: 'Haldi', desc: 'Vibrant yellows, chaotic joy, and raw emotional moments.' },
    { id: 'mehndi', title: 'Mehndi', desc: 'Intricate details, music, and the colors of celebration.' },
    { id: 'sangeet', title: 'Sangeet', desc: 'High energy, glamorous performances, and endless dancing.' },
    { id: 'wedding', title: 'Wedding', desc: 'The sacred rituals, tearful glances, and timeless vows.' },
    { id: 'reception', title: 'Reception', desc: 'The grand finale, toast, and architectural portraits.' },
  ];

  return (
    <section ref={targetRef} className="h-[300vh] relative" style={{ backgroundColor: INK_ALT }}>
      <div className="sticky top-[var(--header-height)] h-[calc(100svh-var(--header-height))] overflow-hidden flex flex-col justify-center">
        <div className="absolute top-10 left-6 md:left-12 z-20">
          <h2 className="text-white font-sans text-[11px] tracking-[0.4em] uppercase opacity-60">Explore By Event</h2>
        </div>
        
        <motion.div style={{ x }} className="flex items-center gap-12 md:gap-28 px-12 md:px-32 h-[64vh] w-max">
          {events.map((evt, idx) => {
            const eventProjects = projects.filter(p => p.events.includes(evt.id));
            const previewImg = eventProjects[0]?.coverImage || images.moments[0];
            return (
              <div key={evt.id} className="relative w-[78vw] md:w-[36vw] h-full flex flex-col justify-center shrink-0 group">
                <div className="text-white font-serif text-[7rem] md:text-[10rem] leading-none absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/4 z-0 opacity-[0.06] pointer-events-none select-none">
                  0{idx + 1}
                </div>
                <div className="relative z-10 w-full h-[44vh] overflow-hidden mb-7 border" style={{ borderColor: HAIRLINE_DARK }}>
                  <img src={previewImg} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" alt={evt.title} />
                  <FrameCorners tone="light" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-4xl md:text-5xl text-white mb-2 uppercase">{evt.title}</h3>
                    <p className="font-sans text-sm text-neutral-400 max-w-sm">{evt.desc}</p>
                  </div>
                  <div className="font-sans text-[11px] tracking-widest text-neutral-400 uppercase border rounded-full px-4 py-2 self-start md:self-end" style={{ borderColor: HAIRLINE_DARK }}>
                    {eventProjects.length} Stories
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const RealCouplesArchive = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState<'all' | EventType>('all');
  const { setActiveProject } = useContext(AppContext);
  const filters: { label: string, value: 'all' | EventType }[] = [
    { label: 'All', value: 'all' }, { label: 'Pre-Wedding', value: 'pre-wedding' }, { label: 'Haldi', value: 'haldi' }, { label: 'Mehndi', value: 'mehndi' }, { label: 'Sangeet', value: 'sangeet' }, { label: 'Wedding', value: 'wedding' }, { label: 'Reception', value: 'reception' },
  ];
  const filteredProjects = projects.filter(p => filter === 'all' || p.events.includes(filter as EventType));

  return (
    <section className="py-28 md:py-36 relative z-10" style={{ backgroundColor: PAPER }}>
      <SectionHeading title="Real Couples" subtitle="Our complete archive of love stories, documented across the globe." tone="light" />
      <div className="px-6 md:px-12 mb-14 md:mb-20">
        <FilterTabs filters={filters} active={filter} onChange={(v: string) => setFilter(v as 'all' | EventType)} tone="light" />
      </div>
      <div className="px-6 md:px-12">
        <motion.div layout className="flex flex-col gap-10 md:gap-14">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }} className="group cursor-pointer flex flex-col sm:flex-row border-t pt-10 md:pt-14 first:border-t-0 first:pt-0" style={{ borderColor: HAIRLINE_LIGHT }} onClick={() => setActiveProject(project)}>
                <div className="relative w-full sm:w-[46%] aspect-[16/10] overflow-hidden bg-neutral-200 shrink-0">
                  <img src={project.coverImage} alt={project.coupleName} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out" />
                  <FrameCorners tone="light" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.services.map(s => <span key={s} className="px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em]" style={{ backgroundColor: 'rgba(246,244,238,0.92)', color: INK }}>{s}</span>)}
                  </div>
                </div>
                <div className="w-full sm:w-[54%] flex flex-col justify-center sm:pl-10 md:pl-14 pt-6 sm:pt-0">
                  <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-3">{project.category} · {project.year}</p>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3 group-hover:translate-x-1.5 transition-transform duration-500 ease-out" style={{ color: INK }}>{project.coupleName}</h3>
                  <p className="font-display italic text-lg text-neutral-500 mb-6">{project.location}</p>
                  <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase w-fit" style={{ color: INK }}>View Story <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-500" /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const CoupleStoryViewer = () => {
  const { activeProject, setActiveProject } = useContext(AppContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: '4%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '4%' }} transition={{ duration: 0.7, ease: EASE }} className="fixed inset-0 z-[100] flex flex-col overflow-y-auto overflow-x-hidden" style={{ backgroundColor: PAPER }} ref={containerRef}>
        <div className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase">Story Archive</span>
          <button onClick={() => setActiveProject(null)} className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="relative h-[70vh] w-full shrink-0">
          <img src={activeProject.coverImage} alt={activeProject.coupleName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, ease: EASE }} className="font-sans text-[11px] tracking-[0.4em] uppercase text-white/80 mb-5">
              {activeProject.category} · {activeProject.location}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, ease: EASE }} className="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight mb-5">
              {activeProject.coupleName}
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center gap-3">
              {activeProject.events.map(e => <span key={e} className="px-4 py-2 border border-white/30 rounded-full font-sans text-[10px] tracking-widest text-white uppercase backdrop-blur-md">{e}</span>)}
            </motion.div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-2xl mb-6 uppercase" style={{ color: INK }}>The Narrative</h3>
              <div className="space-y-3 font-sans text-[11px] tracking-widest uppercase text-neutral-500">
                <p>Date: {activeProject.date.toLocaleDateString()}</p>
                <p>Venue: {activeProject.location}</p>
                <p>Services: {activeProject.services.join(', ')}</p>
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-xl md:text-3xl leading-relaxed" style={{ color: INK_TEXT }}>"{activeProject.description}"</p>
            </div>
          </div>
        </div>
        {activeProject.gallery && activeProject.gallery.length > 0 && (
          <div className="px-6 md:px-12 pb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {activeProject.gallery.map((img, idx) => (
                <div key={idx} className={cn("overflow-hidden bg-neutral-200 border", idx === 0 || idx === 3 ? "md:col-span-2 aspect-video" : "aspect-[4/5]")} style={{ borderColor: HAIRLINE_LIGHT }}>
                  <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]" alt="" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="py-28 text-center flex flex-col items-center justify-center px-6" style={{ backgroundColor: INK }}>
          <h3 className="font-display text-3xl md:text-5xl text-white mb-8">Envisioning something similar?</h3>
          <button className="bg-white text-black px-8 py-4 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors flex items-center gap-3">
            Inquire Availability <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function ServicesPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ activeProject, setActiveProject }}>
      <div className="min-h-screen selection:bg-[#15130F] selection:text-[#F6F4EE] font-sans overflow-x-hidden" style={{ backgroundColor: PAPER, color: INK }}>
        <CoupleStoryViewer />
        <AnimatePresence>
          {isLoading && (
            <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: EASE }} className="fixed inset-0 z-[999] flex items-center justify-center" style={{ backgroundColor: INK }}>
              <motion.h1 initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="font-display text-white text-2xl md:text-3xl tracking-[0.35em] lowercase">
                theswaymvar
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
        <main>
          {/* THE NEW CINEMATIC 3D CAROUSEL HERO SECTION */}
          <CinematicHero />
          
          <FeaturedStories projects={MOCK_PROJECTS.filter(p => p.featured)} />
          <LatestStories projects={MOCK_PROJECTS} />
          <ExploreService />
          <ExploreEvent projects={MOCK_PROJECTS} />
          <RealCouplesArchive projects={MOCK_PROJECTS} />
        </main>
      </div>
    </AppContext.Provider>
  );
}