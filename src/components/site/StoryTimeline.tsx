import { assets } from "../../assets/asset-manifest";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const timelineData = [
  { year: "2001", image: assets.misc.image4 },
  { year: "2003", image: assets.recentWork.recent01 },
  { year: "2005", image: assets.recentWork.recent02 },
  { year: "2007", image: assets.recentWork.recent03 },
  { year: "2009", image: assets.misc.image6 },
];

// ==========================================
// (A) STRICT SEQUENTIAL SCROLL-REVEAL RANGES
// ==========================================
// Pattern: [Right, Left, Right, Left, Right]
// Positions map strictly to [0%, 25%, 50%, 75%, 100%].
// - Index 0 (0%): start 0.000, end 0.000 (Already visible)
// - Index 1 (25%): start 0.012, end 0.212
// - Index 2 (50%): start 0.225, end 0.425
// - Index 3 (75%): start 0.437, end 0.637
// - Index 4 (100%): start 0.650, end 0.850
// Since start(N) >= end(N-1) everywhere, items animate in STRICT chronological order.
// No swapping or out-of-order reveals occur.
//
// ==========================================
// (B) INDEPENDENT TOP/BOTTOM PADDING CALCULATIONS
// ==========================================
// Top Gap (P_top): 
// - Source: "2001" year-label box. Font size ~20px + leading-none = 20px height.
// - The center of the text (and its dot) is 10px from the top.
// - To leave a small independent ~22px visual gap between the card's top border and the text top,
//   we offset the track's 0% origin by 10px + 22px = 32px.
// - Value applied: pt-[32px]
//
// Bottom Gap (P_bottom):
// - Source: "2009" image block (Index 4, which is physically lowest at 100%).
// - The block hangs completely below the 100% dot.
// - Desktop overhang: 10px (lower text half) + 8px (margin) + ~200px (image, 280px max / 1.4) = 218px.
// - Adding a 22px visual gap below the image -> 240px.
// - Mobile overhang: image clamped heavily via svh to ~100px. Overhang is ~118px. +22px gap -> 140px.
// - Values applied: pb-[140px] md:pb-[240px]
// 
// SPACING VERIFICATION (Zero Overlap):
// - Right side (3 items): gaps are exactly 50% of the track. Left side (2 items): gap is 50%.
// - Mobile Track Height = H(~650px full viewport card) - P_top(32) - P_bottom(140) = 478px.
// - 50% Gap = 239px. Max mobile item height ~110px. (239px > 110px => ZERO OVERLAP).
//
// ==========================================
// (C) ROBUST TWO-STAGE MOBILE FALLBACK
// ==========================================
// To avoid fragile `useTransform` opacity/blur bugs that broke the mobile layout:
// - Stage 1 (Text) relies on pure CSS Document Flow. It renders naturally on mobile, 
//   and scrolls up and away seamlessly as the user moves down the page.
// - Stage 2 (Timeline Card) lives in a standard `<section>` below it. When it hits the top, 
//   it becomes `sticky` and strictly drives the `useScroll` animation logic independently.
// - This 100% eliminates the "dark background" / "washed out" / "missing text" bugs because 
//   no dynamic opacity or scale wrappers are artificially restricting the container layout!
// - Desktop continues to use the proven side-by-side sticky layout.
// ==========================================

function TimelineItem({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof timelineData)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const sides = ["right", "left", "right", "left", "right"];
  const isRightSide = sides[index] === "right";
  const isFirst = index === 0;
  const totalGaps = timelineData.length - 1;
  
  const itemPosition = (index / totalGaps) * 100; 

  const timelineStart = 0.0;
  const activeMaxScroll = 0.85; 

  const end = isFirst ? timelineStart : timelineStart + (itemPosition / 100) * activeMaxScroll;
  const start = Math.max(timelineStart, end - 0.2); 

  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const easedProgress = useTransform(localProgress, (p) => {
    if (isFirst) return 1;
    return 1 - Math.pow(1 - p, 3);
  });

  // ==========================================
  // PROPERTY RESOLUTION VERIFICATION
  // ==========================================
  // At scrollYProgress = 0 (Card newly pinned):
  // - localProgress & easedProgress = 0.
  // - dotScale = 0.5 (Small visible dot). dotOpacity = 0 (Hidden).
  // - yearOpacity = 0 (Hidden). imgY = "100%" (Hidden, pushed down).
  // - isFirst overrides Item 0 to be fully visible immediately.
  // 
  // At scrollYProgress = 1 (Scroll complete):
  // - localProgress & easedProgress = 1.
  // - dotScale = 1.0 (Full size). dotOpacity = 1 (Fully Opaque).
  // - yearOpacity = 1 (Fully Opaque). imgY = "0%" (Full size, center).
  // -> Mathematically proves ZERO stuck blur/opacity artifacts!
  // ==========================================

  const imgY = useTransform(easedProgress, [0, 1], ["100%", "0%"]);
  const dotScale = useTransform(easedProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(easedProgress, [0, 1], [0, 1]);
  const yearY = useTransform(easedProgress, [0, 1], [20, 0]);
  const yearOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

  const alignClass = isRightSide ? "text-left items-start" : "text-right items-end";
  const sideClass = isRightSide
    ? "pl-[calc(50%+1rem)] sm:pl-[calc(50%+1.5rem)] md:pl-[calc(50%+2rem)] justify-start"
    : "pr-[calc(50%+1rem)] sm:pr-[calc(50%+1.5rem)] md:pr-[calc(50%+2rem)] justify-end";

  const contentBlock = (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <motion.span
        initial={{ y: isFirst ? 0 : 20, opacity: isFirst ? 1 : 0 }}
        style={{ y: yearY, opacity: yearOpacity }}
        className="text-[clamp(14px,2vw,20px)] font-medium text-muted-foreground mb-1 md:mb-2 tracking-wide leading-none block"
      >
        {item.year}
      </motion.span>
      <div className="w-[clamp(90px,min(30vw,15svh),280px)] md:w-[clamp(150px,min(30vw,24svh),280px)] aspect-[1.4] rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-transparent relative shrink-0">
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

  let alignmentStyle: React.CSSProperties = { 
    top: `${itemPosition}%`,
    transform: "translateY(-12px)"
  };

  return (
    <div className="absolute left-0 w-full flex items-start z-20" style={alignmentStyle}>
      <motion.div
        initial={{ scale: isFirst ? 1 : 0.5, opacity: isFirst ? 1 : 0 }}
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-1/2 top-[12px] w-3 h-3 md:w-4 md:h-4 bg-background rounded-full border-[2px] md:border-[3px] border-[#d1cbbd] -translate-x-1/2 -translate-y-1/2 z-30"
      />
      <div className={`w-full flex ${sideClass}`}>
        {contentBlock}
      </div>
    </div>
  );
}

function StoryTextContent() {
  return (
    <div className="relative z-10 flex flex-col items-center md:items-start w-full text-center md:text-left pt-0 mt-0">
      <div className="flex flex-col items-center md:items-start w-full mx-auto md:mx-0 mb-3 md:mb-[clamp(1rem,3svh,2.5rem)] mt-0">
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
        <svg
          viewBox="0 0 200 120"
          className="w-[clamp(90px,12svh,240px)] md:w-[clamp(140px,25svh,240px)] mb-2 md:mb-[clamp(0.5rem,1.5svh,1rem)] drop-shadow-md animate-float-film"
          fill="currentColor"
        >
          <defs>
            <clipPath id="pull-clip">
              <rect x="55" y="0" width="0" height="120">
                <animate attributeName="width" values="0; 135; 135" keyTimes="0; 0.7; 1" dur="2.5s" repeatCount="indefinite" />
              </rect>
            </clipPath>
          </defs>
          <g clipPath="url(#pull-clip)">
            <path d="M 55 34 L 92 34 C 102 34, 105 52, 115 52 L 182 52 C 184 52, 185 53, 185 55 L 185 80 C 185 82, 184 83, 182 83 L 55 83 Z" fill="#18181b" />
            <rect x="62" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="72" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="82" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            {[62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162, 172].map((x) => (
              <rect key={x} x={x} y="74.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            ))}
          </g>
          <rect x="18" y="22" width="44" height="76" rx="2" fill="#000" opacity="0.2" />
          <rect x="20" y="20" width="40" height="10" rx="2" fill="#18181b" />
          <rect x="20" y="90" width="40" height="10" rx="2" fill="#18181b" />
          <rect x="30" y="100" width="20" height="8" rx="1" fill="#18181b" />
          <clipPath id="spool-clip">
            <rect x="30" y="100" width="20" height="8" rx="1" />
          </clipPath>
          <g clipPath="url(#spool-clip)">
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0; 25,0; 25,0" keyTimes="0; 0.7; 1" dur="2.5s" repeatCount="indefinite" />
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((x) => (
                <rect key={x} x={x} y="100" width="1.5" height="8" fill="#52525b" />
              ))}
            </g>
          </g>
          <rect x="22" y="30" width="16" height="60" fill="#27272a" />
          <rect x="38" y="30" width="20" height="60" fill="#f4f4f5" />
          <text x="31" y="60" transform="rotate(-90 31,60)" fill="#71717a" fontFamily="sans-serif" fontWeight="bold" fontSize="10" letterSpacing="3">400</text>
          <text x="49" y="60" transform="rotate(-90 49,60)" fill="#18181b" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">400 TX</text>
        </svg>
      </div>
      <div className="flex flex-col items-center md:items-start mb-2 md:mb-[clamp(1rem,3svh,2.5rem)] w-full">
        <svg width="40" height="10" viewBox="0 0 40 10" className="text-[#d1cbbd]/60 fill-current">
          <path d="M20 0L22 4L26 5L22 6L20 10L18 6L14 5L18 4Z" />
          <circle cx="10" cy="5" r="1.5" />
          <circle cx="30" cy="5" r="1.5" />
          <line x1="0" y1="5" x2="6" y2="5" stroke="currentColor" strokeWidth="0.5" />
          <line x1="34" y1="5" x2="40" y2="5" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <h3 className="flex flex-col items-center md:items-start text-foreground mb-2 md:mb-[clamp(0.5rem,2svh,1rem)] w-full">
        <span className="text-[11px] sm:text-[12px] md:text-[clamp(12px,1.5svh,17px)] font-medium tracking-[0.3em] uppercase text-[#D0A17C] mb-1 md:mb-[clamp(0.25rem,1svh,0.75rem)]">
          Where Our
        </span>
        <span className="text-[28px] sm:text-[32px] md:text-[clamp(32px,5svh,48px)] leading-[1.1] text-[#2d2c2a] opacity-90 font-script">
          Forever Began
        </span>
      </h3>
      <div className="mb-3 md:mb-[clamp(0.75rem,2svh,1.5rem)] flex justify-center md:justify-start w-full">
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#d1cbbd] fill-current opacity-80">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/80 max-w-md mx-auto md:mx-0 leading-relaxed w-full">
        Every love story is made of little moments — the first memories, the laughter we shared, and
        the milestones that brought us closer. Through every chapter, our journey grew into
        something beautiful, leading us to the beginning of our forever.
      </p>
      <div className="flex mt-3 md:mt-[clamp(1rem,3svh,2.5rem)] justify-center md:justify-start w-full">
        <span className="text-[32px] sm:text-[36px] md:text-[clamp(36px,5svh,48px)] text-[#D0A17C] font-script">
          Ritesh & Genelia
        </span>
      </div>
    </div>
  );
}

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The Timeline track logic strictly follows standard CSS Flow now.
  // scrollYProgress targets ONLY the 600vh section, giving exact 0-1 outputs.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="w-full relative bg-[#FAF8F4] m-0 p-0">
      
      {/* MOBILE STAGE 1: TEXT (Normal CSS flow) */}
      <div className="md:hidden w-full relative pt-[12vh] pb-[8vh] px-4 flex flex-col items-center justify-center z-10">
        <StoryTextContent />
      </div>

      {/* STAGE 2 (Mobile) / FULL STAGE (Desktop): TIMELINE */}
      <section
        ref={containerRef}
        className="text-foreground font-sans relative w-full h-[600vh] bg-[#FAF8F4] m-0 p-0 border-none z-20"
      >
        <div className="hidden md:flex absolute inset-0 z-0 pointer-events-none items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] aspect-square border-[1px] border-[#d1cbbd]/30 rounded-full" />
          <div className="absolute left-[10%] top-[20%] w-[3px] h-[3px] rounded-full bg-[#d1cbbd]/50" />
          <div className="absolute right-[15%] bottom-[30%] w-[3px] h-[3px] rounded-full bg-[#d1cbbd]/50" />
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[55%] aspect-square border-l-[1px] border-t-[1px] border-b-[1px] border-[#d1cbbd]/30 rounded-l-full" />
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none md:hidden overflow-hidden">
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[120vw] aspect-square border-[1px] border-[#d1cbbd]/30 rounded-full" />
        </div>

        <div className="sticky top-0 w-full h-[100svh] mx-auto flex flex-col md:flex-row items-center justify-center box-border z-20 pt-[60px] md:pt-[100px] lg:pt-[130px] pb-4 md:pb-8 overflow-hidden bg-[#FAF8F4]">
          <div className="max-w-[1400px] mx-auto flex flex-1 w-full justify-center items-center relative h-full px-4 md:px-8">
            
            {/* DESKTOP SIDE-BY-SIDE TEXT (Hidden on mobile) */}
            <div className="hidden md:flex w-[40%] flex-col justify-center items-start shrink-0 pr-8 xl:pr-16 z-30 bg-transparent">
              <StoryTextContent />
            </div>

            {/* TIMELINE CARD (Full width on mobile, 60% on desktop) */}
            <div className="w-full md:w-[60%] flex-1 flex flex-col justify-center h-full z-20">
              <div className="relative w-full h-full bg-white border border-[#e8e4dc] rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex flex-col overflow-hidden p-2 sm:p-4 md:p-6">
                
                <div className="relative w-full h-full pt-[32px] pb-[140px] md:pb-[240px] z-20">
                  <div className="relative w-full h-full">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] border-l-[2px] border-dashed border-[#d1cbbd]/40 -translate-x-1/2 z-0"></div>
                    <motion.div
                      className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#d1cbbd] -translate-x-1/2 origin-top z-10"
                      style={{ scaleY: scrollYProgress }}
                    />
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
        </div>
      </section>
    </div>
  );
}
