import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { images } from "@/data/images";

const timelineData = [
  { year: "2001", image: "/images/crew/special-image-01.jpg" },
  { year: "2003", image: "/images/crew/special-image-02.jpg" },
  { year: "2005", image: "/images/crew/special-image-03.jpg" },
  { year: "2007", image: "/images/crew/special-image-04.jpg" },
  { year: "2009", image: "/images/crew/special-image-05.jpg" },
];

function TimelineItem({ 
  item, 
  index, 
  scrollYProgress 
}: { 
  item: typeof timelineData[0], 
  index: number,
  scrollYProgress: MotionValue<number> 
}) {
  const isRightSide = index % 2 === 0;

  // 4 items to animate (index 1 to 4). There are 4 gaps between the 5 dots.
  const isFirst = index === 0;
  
  // Calculate when the line reaches this dot.
  // Dot 0 is at 0%, Dot 1 is at 25%, Dot 2 at 50%, Dot 3 at 75%, Dot 4 at 100%.
  const totalGaps = 4; // timelineData.length - 1
  const end = index / totalGaps; // 0, 0.25, 0.5, 0.75, 1.0
  const start = Math.max(0, end - 0.2); // Animation takes 20% of scroll, finishing as line arrives

  // Map global scroll progress to local 0-1 progress
  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Apply smooth cubic ease-out to the scrubbed progress. First image is always fully revealed (1).
  const easedProgress = useTransform(localProgress, p => {
    if (isFirst) return 1;
    return 1 - Math.pow(1 - p, 3);
  });

  // Image translates from 100% (bottom of the wrapper) to 0%
  const imgY = useTransform(easedProgress, [0, 1], ["100%", "0%"]);

  // Dot scale and opacity
  const dotScale = useTransform(easedProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

  // Year Y and opacity
  const yearY = useTransform(easedProgress, [0, 1], [20, 0]);
  const yearOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

  const contentBlock = (
    <div className={`flex flex-col w-full text-${!isRightSide ? 'right' : 'left'} items-${!isRightSide ? 'end' : 'start'}`}>
      <motion.span 
        initial={{ y: isFirst ? 0 : 20, opacity: isFirst ? 1 : 0 }}
        style={{ y: yearY, opacity: yearOpacity }} 
        className="text-xs sm:text-sm md:text-xl font-medium text-muted-foreground mb-1 md:mb-2 tracking-wide"
      >
        {item.year}
      </motion.span>
      
      {/* 
        Fixed Frame with overflow: hidden. 
        It reserves the space in the layout so nothing shifts.
      */}
      <div className="w-[100px] sm:w-[130px] md:w-[180px] lg:w-[240px] xl:w-[280px] aspect-[1.4] rounded-[0.5rem] md:rounded-[1.25rem] overflow-hidden bg-transparent relative">
        <motion.img 
          initial={{ y: isFirst ? "0%" : "100%" }}
          style={{ y: imgY }}
          src={item.image} 
          alt={`Year ${item.year}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <div className={`relative flex items-center w-full ${index > 0 ? 'mt-[-25px] sm:mt-[-40px] md:-mt-[70px] lg:-mt-[100px] xl:-mt-[120px]' : ''}`}>
      {/* Left Area (Always 50%) */}
      <div className="flex w-1/2 pr-4 sm:pr-8 md:pr-12 justify-end">
        {!isRightSide && contentBlock}
      </div>
      
      {/* Center Dot (Always exactly in middle) */}
      <motion.div 
        initial={{ scale: isFirst ? 1 : 0.5, opacity: isFirst ? 1 : 0 }}
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-background rounded-full border-[1.5px] md:border-[3px] border-[#d1cbbd] -translate-x-1/2 z-30"
      />
      
      {/* Right Area (Always 50%) */}
      <div className="flex w-1/2 pl-4 sm:pl-8 md:pl-12 justify-start">
        {isRightSide && contentBlock}
      </div>
    </div>
  );
}

function StoryTextContent({ hideSignature = false }: { hideSignature?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-center lg:items-start w-full">
      {/* Custom Dictionary Definition Graphic (SVG Only with Animation) */}
      <div className="flex flex-col items-center lg:items-start max-w-[280px] sm:max-w-[340px] w-full mx-auto lg:mx-0 mb-8 lg:mb-10 mt-4">
        <style>{`
          @keyframes float-film {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-1.5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float-film {
            animation: float-film 5s ease-in-out infinite;
          }
        `}</style>

        {/* SVG Film Roll */}
        <svg viewBox="0 0 200 120" className="w-full max-w-[240px] mb-4 drop-shadow-md animate-float-film" fill="currentColor">
          <defs>
            <clipPath id="pull-clip">
              <rect x="55" y="0" width="0" height="120">
                <animate attributeName="width" values="0; 135; 135" keyTimes="0; 0.7; 1" dur="2.5s" repeatCount="indefinite" />
              </rect>
            </clipPath>
          </defs>

          {/* Group with clip-path applied for pulling out effect */}
          <g clipPath="url(#pull-clip)">
            {/* Film Strip */}
            <path d="M 55 34 L 92 34 C 102 34, 105 52, 115 52 L 182 52 C 184 52, 185 53, 185 55 L 185 80 C 185 82, 184 83, 182 83 L 55 83 Z" fill="#18181b" />
            
            {/* Top Sprocket Holes */}
            <rect x="62" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="72" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="82" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />

            {/* Bottom Sprocket Holes */}
            {[62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162, 172].map(x => (
              <rect key={x} x={x} y="74.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            ))}
          </g>

          {/* Canister Shadow/Depth */}
          <rect x="18" y="22" width="44" height="76" rx="2" fill="#000" opacity="0.2" />

          {/* Canister Body Caps */}
          <rect x="20" y="20" width="40" height="10" rx="2" fill="#18181b" />
          <rect x="20" y="90" width="40" height="10" rx="2" fill="#18181b" />
          
          {/* Rotating Bottom Spool */}
          <rect x="30" y="100" width="20" height="8" rx="1" fill="#18181b" />
          <clipPath id="spool-clip">
            <rect x="30" y="100" width="20" height="8" rx="1" />
          </clipPath>
          <g clipPath="url(#spool-clip)">
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0; 25,0; 25,0" keyTimes="0; 0.7; 1" dur="2.5s" repeatCount="indefinite" />
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(x => (
                <rect key={x} x={x} y="100" width="1.5" height="8" fill="#52525b" />
              ))}
            </g>
          </g>
          
          {/* Canister Label */}
          <rect x="22" y="30" width="16" height="60" fill="#27272a" />
          <rect x="38" y="30" width="20" height="60" fill="#f4f4f5" />
          
          {/* Canister Text Details */}
          <text x="31" y="60" transform="rotate(-90 31,60)" fill="#71717a" fontFamily="sans-serif" fontWeight="bold" fontSize="10" letterSpacing="3">400</text>
          <text x="49" y="60" transform="rotate(-90 49,60)" fill="#18181b" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">400 TX</text>
        </svg>
      </div>

      {/* Ornament Badge */}
      <div className="flex flex-col items-center lg:items-start mb-8 md:mb-10 w-full">
        {/* Small ornament */}
        <svg width="40" height="10" viewBox="0 0 40 10" className="text-[#d1cbbd]/60 fill-current">
          <path d="M20 0L22 4L26 5L22 6L20 10L18 6L14 5L18 4Z" />
          <circle cx="10" cy="5" r="1.5" />
          <circle cx="30" cy="5" r="1.5" />
          <line x1="0" y1="5" x2="6" y2="5" stroke="currentColor" strokeWidth="0.5" />
          <line x1="34" y1="5" x2="40" y2="5" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="flex flex-col items-center lg:items-start text-foreground mb-4 md:mb-4 text-center lg:text-left w-full">
        <span className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-medium tracking-[0.3em] uppercase text-[#D0A17C] mb-2 md:mb-3">
          Where Our
        </span>
        <span className="text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-[#2d2c2a] opacity-90" style={{ fontFamily: "'Pinyon Script', cursive" }}>
          Forever Began
        </span>
      </h3>
      
      {/* Heart Divider */}
      <div className="mb-6 flex justify-center lg:justify-start w-full">
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#d1cbbd] fill-current opacity-80">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Paragraph */}
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-md mx-auto lg:mx-0 leading-relaxed text-center lg:text-left w-full">
        Every love story is made of little moments — the first memories, the laughter we shared, and the milestones that brought us closer. Through every chapter, our journey grew into something beautiful, leading us to the beginning of our forever.
      </p>
      
      {/* Couple Name Signature */}
      {!hideSignature && (
        <div className="flex mt-8 md:mt-10 justify-center lg:justify-start w-full">
          <span className="text-[40px] sm:text-[44px] md:text-[48px] text-[#D0A17C]" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Ritesh & Genelia
          </span>
        </div>
      )}
    </div>
  );
}

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the 600vh container (100vh viewport + 500vh scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* MOBILE ONLY: Static Text Section. Placed BEFORE the animation container so it scrolls away naturally before animation starts. */}
      <div className="lg:hidden w-full px-4 sm:px-8 pt-10 pb-6 bg-background relative z-30">
        <StoryTextContent hideSignature={true} />
      </div>

      <section 
        ref={containerRef}
        className="bg-background text-foreground font-sans relative lg:mt-24 h-[600vh] mb-[15vh] md:mb-[30vh]"
      >
        {/* The sticky viewport that locks the timeline in place. */}
        <div className="sticky top-[120px] md:top-[160px] min-h-[calc(100svh-120px)] md:min-h-[calc(100svh-160px)] h-[calc(100svh-120px)] md:h-[calc(100svh-160px)] w-full flex flex-col lg:flex-row items-center box-border overflow-hidden">
        
        {/* MOBILE ONLY: Sticky Signature */}
        <div className="lg:hidden w-full flex justify-center pt-2 pb-0 shrink-0 z-30 bg-background/90 backdrop-blur-sm relative">
           <span className="text-[36px] sm:text-[40px] text-[#D0A17C] pb-2" style={{ fontFamily: "'Pinyon Script', cursive" }}>
             Ritesh & Genelia
           </span>
        </div>

        <div className="max-w-[1400px] mx-auto flex w-full h-full justify-center">
          
          {/* DESKTOP ONLY: Text Section inside sticky area */}
          <div className="hidden lg:flex relative w-[40%] px-16 flex-col justify-center bg-background z-20 shrink-0">
            {/* Elegant Background Arc */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[110%] aspect-square border-l-[1px] border-t-[1px] border-b-[1px] border-[#d1cbbd]/30 rounded-l-full pointer-events-none z-0"></div>
            <StoryTextContent />
          </div>

          {/* RIGHT: Pinned Timeline Section */}
          <div className="w-full lg:w-[60%] relative flex-1 flex flex-col justify-center px-4 py-4 lg:py-8 h-full">
            
            <div className="relative z-20 w-full flex flex-col justify-center items-center h-full">
              
              {/* Background Dashed Line starts exactly at the center of the first image dot and ends at the last */}
              <div className="absolute left-1/2 top-[46px] sm:top-[59px] md:top-[82px] lg:top-[104px] xl:top-[118px] bottom-[46px] sm:bottom-[59px] md:bottom-[82px] lg:bottom-[104px] xl:bottom-[118px] w-[2px] border-l-[2px] border-dashed border-[#d1cbbd]/40 -translate-x-1/2 z-0"></div>

              {/* Animated Solid Cream Progress Line (follows overall scroll) */}
              <motion.div
                className="absolute left-1/2 top-[46px] sm:top-[59px] md:top-[82px] lg:top-[104px] xl:top-[118px] bottom-[46px] sm:bottom-[59px] md:bottom-[82px] lg:bottom-[104px] xl:bottom-[118px] w-[2px] bg-[#d1cbbd] -translate-x-1/2 origin-top z-10"
                style={{ scaleY: scrollYProgress }}
              />

              {/* Render Timeline Items */}
              <div className="w-full flex flex-col justify-center relative z-20 py-4 h-full">
                {timelineData.map((item, index) => (
                  <TimelineItem 
                    key={index} 
                    item={item} 
                    index={index} 
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

