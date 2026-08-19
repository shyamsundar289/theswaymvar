import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

export function CinematicFilmSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  // Total unwound distance mapped strictly to scroll
  const desktopDashOffset = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const mobileDashOffset = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  
  // Reel 1 (Top-Right) reveals as path reaches it
  const reel1Scale = useTransform(scrollYProgress, [0.15, 0.25], [0.5, 1]);
  const reel1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  
  // Reel 2 (Bottom-Left) reveals as path reaches it
  const reel2Scale = useTransform(scrollYProgress, [0.45, 0.55], [0.5, 1]);
  const reel2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  const desktopPath = "M 350 -100 L 350 50 Q 350 150 450 150 L 850 150 A 150 150 0 0 1 850 450 L 350 450 A 150 150 0 0 0 350 750 L 550 750 Q 650 750 650 850 L 650 1000";
  
  const mobilePath = "M 200 -100 L 200 80 Q 200 180 300 180 L 400 180 A 120 120 0 0 1 400 420 Q 300 420 300 520 L 300 580 Q 300 680 200 680 A 120 120 0 0 0 200 920 L 300 920 Q 400 920 400 1020 L 400 1300";

  return (
    <section ref={containerRef} className="relative w-full bg-[#F3EFE6] overflow-hidden py-24 md:py-32 border-y border-[#15130F]/10">
      
      {/* DESKTOP SVG */}
      <div className="hidden md:block w-full max-w-[1200px] mx-auto relative">
        <svg viewBox="0 0 1200 800" className="w-full h-auto drop-shadow-2xl overflow-visible">
           {/* Defs and Mask */}
           <defs>
             <mask id="desktop-film-mask">
               <motion.path 
                 d={desktopPath} 
                 stroke="white" 
                 strokeWidth="120" 
                 fill="none" 
                 style={{ pathLength }} 
                 strokeLinecap="round" 
               />
             </mask>
           </defs>

           {/* Reels */}
           <FilmReel cx={850} cy={300} r={150} scale={reel1Scale} opacity={reel1Opacity} direction={1} scrollProgress={scrollYProgress} />
           <FilmReel cx={350} cy={600} r={150} scale={reel2Scale} opacity={reel2Opacity} direction={-1} scrollProgress={scrollYProgress} />

           {/* Film Strip (Rendered after reels to overlap slightly, creating spooling depth) */}
           <g mask="url(#desktop-film-mask)">
             {/* Base Black */}
             <path d={desktopPath} stroke="#15130F" strokeWidth="80" fill="none" />
             {/* Perforations (Animated by scroll) */}
             <motion.path 
                d={desktopPath} 
                stroke="#F3EFE6" 
                strokeWidth="64" 
                strokeDasharray="6 12" 
                fill="none" 
                style={{ strokeDashoffset: desktopDashOffset }}
                className="transition-none"
             />
             {/* Core Black */}
             <path d={desktopPath} stroke="#15130F" strokeWidth="52" fill="none" />
           </g>
        </svg>
      </div>

      {/* MOBILE SVG */}
      <div className="block md:hidden w-full relative">
        <svg viewBox="0 0 600 1100" className="w-full h-auto drop-shadow-xl overflow-visible">
           <defs>
             <mask id="mobile-film-mask">
               <motion.path 
                 d={mobilePath} 
                 stroke="white" 
                 strokeWidth="100" 
                 fill="none" 
                 style={{ pathLength }} 
                 strokeLinecap="round" 
                 className="transition-none"
               />
             </mask>
           </defs>

           {/* Reels (smaller radius for mobile) */}
           <FilmReel cx={400} cy={300} r={120} scale={reel1Scale} opacity={reel1Opacity} direction={1} scrollProgress={scrollYProgress} />
           <FilmReel cx={200} cy={800} r={120} scale={reel2Scale} opacity={reel2Opacity} direction={-1} scrollProgress={scrollYProgress} />

           {/* Film Strip */}
           <g mask="url(#mobile-film-mask)">
             <path d={mobilePath} stroke="#15130F" strokeWidth="60" fill="none" />
             <motion.path 
                d={mobilePath} 
                stroke="#F3EFE6" 
                strokeWidth="48" 
                strokeDasharray="4 10" 
                fill="none" 
                style={{ strokeDashoffset: mobileDashOffset }}
                className="transition-none"
             />
             <path d={mobilePath} stroke="#15130F" strokeWidth="40" fill="none" />
           </g>
        </svg>
      </div>
      
    </section>
  );
}

interface FilmReelProps {
  cx: number;
  cy: number;
  r: number;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  direction: 1 | -1;
  scrollProgress: MotionValue<number>;
}

function FilmReel({ cx, cy, r, scale, opacity, direction, scrollProgress }: FilmReelProps) {
  // Proportional dimensions based on radius
  const spoolR = r * 0.85;
  const outerRimR = r * 0.93;
  const innerRimR = r * 0.36;
  const hubR = r * 0.16;
  
  // Circumference of the spool where the film wraps
  const spoolCircumference = 2 * Math.PI * spoolR;
  // Total distance film moves over scroll 0 to 1
  const totalFilmDistance = 3000;
  // Calculate total rotation in degrees based on film distance
  const totalDegrees = (totalFilmDistance / spoolCircumference) * 360;
  
  // Bind rotation directly to scroll
  const rotation = useTransform(scrollProgress, [0, 1], [0, totalDegrees * direction]);
  
  return (
    <motion.g style={{ x: cx, y: cy, scale, opacity }} className="transition-none">
      <motion.g style={{ rotate: rotation, originX: "0px", originY: "0px" }} className="transition-none">
        {/* Deep Orange Film Spool */}
        <circle cx="0" cy="0" r={spoolR} fill="#E84A27" />
        
        {/* Outer Black Rim */}
        <circle cx="0" cy="0" r={outerRimR} fill="none" stroke="#15130F" strokeWidth={r * 0.1} />
        
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <line 
            key={angle} 
            x1="0" 
            y1="0" 
            x2="0" 
            y2={outerRimR} 
            stroke="#15130F" 
            strokeWidth={r * 0.08} 
            transform={`rotate(${angle})`} 
          />
        ))}
        
        {/* Inner Black Ring */}
        <circle cx="0" cy="0" r={innerRimR} fill="none" stroke="#15130F" strokeWidth={r * 0.06} />
        
        {/* Center Hub */}
        <circle cx="0" cy="0" r={hubR} fill="#F3EFE6" stroke="#15130F" strokeWidth={r * 0.05} />
        <circle cx="0" cy="0" r={r * 0.05} fill="#15130F" />
      </motion.g>
    </motion.g>
  );
}
