import React, { useEffect, useRef, useState, useLayoutEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { X, ArrowRight, ArrowUpRight, Camera, Film } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createFileRoute } from '@tanstack/react-router';
import { images } from "@/data/images";
import { PhotographyGallery } from "@/components/site/PhotographyGallery";
import { SharedHero } from "@/components/site/SharedHero";

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


const getHeroServices = () => [
  { id: 's1', title: 'Wedding Photography', image: images.services.wedding },
  { id: 's2', title: 'Wedding Films', image: images.services.films },
  { id: 's3', title: 'Pre-Wedding', image: images.moments[0] },
  { id: 's4', title: 'Destination Weddings', image: images.services.destination },
  { id: 's5', title: 'Editorial Portraits', image: images.moments[2] },
  { id: 's6', title: 'Engagements', image: images.moments[3] },
  { id: 's7', title: 'Albums & Heirlooms', image: images.services.finearts },
];

function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  const useLayoutEffectHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useLayoutEffectHook(effect, deps);
}

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
        <h3 className="text-white font-display text-lg md:text-xl opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-sm">
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
  const CARD_WIDTH = isMobile ? 180 : 250;
  const GAP = isMobile ? 16 : 40;
  const ITEM_WIDTH = CARD_WIDTH + GAP;
  
  // Create duplicates for endless loop
  const heroServices = React.useMemo(() => getHeroServices(), []);
  const marqueeItems = [...heroServices, ...heroServices, ...heroServices, ...heroServices];
  const SET_WIDTH = heroServices.length * ITEM_WIDTH;

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
    <>
      <section className="w-full bg-background py-6 md:py-12 xl:py-[4.5rem] shell">
        <div 
          className="relative overflow-hidden bg-background h-[339px] w-full"
          style={{ 
            perspective: '1200px', 
            transformStyle: 'preserve-3d',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <div className="absolute inset-0 bg-[#EAE6D7]" />

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
    </>
  );
};

function ServicesPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-background text-foreground">
      <main>
        {/* 
          Existing Your Memories animation
          Temporarily disabled.
          DO NOT DELETE.
          <CinematicHero /> 
        */}
        
        <SharedHero 
          icon={<Camera className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />}
          eyebrow="MEMORIES THAT LAST."
          title="Your Memories"
          description={<>Beautiful moments, perfectly preserved.<br/>A timeless reflection of your day.</>}
          imageSrc={images.services.finearts}
          fontOverride="serif"
          fullWidthMedia={true}
        />
        
        {/* PHOTOGRAPHY CATEGORY/FILTER NAVIGATION AND GALLERY */}
        <PhotographyGallery />
      </main>
    </div>
  );
}