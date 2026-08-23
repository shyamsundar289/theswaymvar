import { assets } from "../../assets/asset-manifest";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { images } from "@/data/images";

const timelineData = [
  { year: "2001", image: assets.misc.image4 },
  { year: "2003", image: assets.recentWork.recent01 },
  { year: "2005", image: assets.recentWork.recent02 },
  { year: "2007", image: assets.recentWork.recent03 },
  { year: "2009", image: assets.misc.image6 },
];

function TimelineItem({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof timelineData)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isRightSide = index % 2 === 0;
  const isFirst = index === 0;
  const totalGaps = 4;
  const end = index / totalGaps;
  const start = Math.max(0, end - 0.2);

  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const easedProgress = useTransform(localProgress, (p) => {
    if (isFirst) return 1;
    return 1 - Math.pow(1 - p, 3);
  });

  const imgY = useTransform(easedProgress, [0, 1], ["100%", "0%"]);
  const dotScale = useTransform(easedProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(easedProgress, [0, 1], [0, 1]);
  const yearY = useTransform(easedProgress, [0, 1], [20, 0]);
  const yearOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

  const contentBlock = (
    <div
      className={`flex flex-col w-full text-left lg:text-${!isRightSide ? "right" : "left"} items-start lg:items-${!isRightSide ? "end" : "start"}`}
    >
      <motion.span
        initial={{ y: isFirst ? 0 : 20, opacity: isFirst ? 1 : 0 }}
        style={{ y: yearY, opacity: yearOpacity }}
        className="text-[clamp(14px,2vw,20px)] font-medium text-muted-foreground mb-1 lg:mb-2 tracking-wide"
      >
        {item.year}
      </motion.span>

      {/* Responsive image frame sizing */}
      <div className="w-[min(100%,300px)] lg:w-[clamp(150px,min(30vw,24svh),280px)] aspect-[1.4] rounded-[0.5rem] md:rounded-[1.25rem] overflow-hidden bg-transparent relative shrink-0">
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
    <div
      className="relative lg:absolute left-0 w-full flex items-center z-20 mb-[clamp(1.5rem,5vw,2.5rem)] lg:mb-0 lg:-translate-y-1/2 lg:top-[var(--desktop-top)]"
      style={{
        "--desktop-top": `${(index / totalGaps) * 100}%`,
      } as React.CSSProperties}
    >
      {/* Center Dot */}
      <motion.div
        initial={{ scale: isFirst ? 1 : 0.5, opacity: isFirst ? 1 : 0 }}
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-[24px] lg:left-1/2 top-1/2 w-3 h-3 md:w-4 md:h-4 bg-background rounded-full border-[2px] md:border-[3px] border-[#d1cbbd] -translate-x-1/2 -translate-y-1/2 z-30"
      />

      {/* Content Wrapper */}
      <div 
        className={`w-full flex ${
          isRightSide 
            ? 'pl-[52px] lg:pl-[calc(50%+3rem)] justify-start' 
            : 'pl-[52px] lg:pl-0 lg:pr-[calc(50%+3rem)] justify-start lg:justify-end'
        }`}
      >
        {contentBlock}
      </div>
    </div>
  );
}

function StoryTextContent({ hideSignature = false }: { hideSignature?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-center lg:items-start w-full">
      {/* Custom Dictionary Definition Graphic (SVG Only with Animation) */}
      <div className="flex flex-col items-center lg:items-start w-full mx-auto lg:mx-0 mb-[clamp(1rem,3svh,2.5rem)] mt-[clamp(0.5rem,2svh,1rem)]">
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
        <svg
          viewBox="0 0 200 120"
          className="w-[clamp(140px,25svh,240px)] mb-[clamp(0.5rem,1.5svh,1rem)] drop-shadow-md animate-float-film"
          fill="currentColor"
        >
          <defs>
            <clipPath id="pull-clip">
              <rect x="55" y="0" width="0" height="120">
                <animate
                  attributeName="width"
                  values="0; 135; 135"
                  keyTimes="0; 0.7; 1"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </rect>
            </clipPath>
          </defs>

          {/* Group with clip-path applied for pulling out effect */}
          <g clipPath="url(#pull-clip)">
            {/* Film Strip */}
            <path
              d="M 55 34 L 92 34 C 102 34, 105 52, 115 52 L 182 52 C 184 52, 185 53, 185 55 L 185 80 C 185 82, 184 83, 182 83 L 55 83 Z"
              fill="#18181b"
            />

            {/* Top Sprocket Holes */}
            <rect x="62" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="72" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />
            <rect x="82" y="36.5" width="4.5" height="5.5" rx="1" fill="#fcfbfa" />

            {/* Bottom Sprocket Holes */}
            {[62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162, 172].map((x) => (
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
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 25,0; 25,0"
                keyTimes="0; 0.7; 1"
                dur="2.5s"
                repeatCount="indefinite"
              />
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((x) => (
                <rect key={x} x={x} y="100" width="1.5" height="8" fill="#52525b" />
              ))}
            </g>
          </g>

          {/* Canister Label */}
          <rect x="22" y="30" width="16" height="60" fill="#27272a" />
          <rect x="38" y="30" width="20" height="60" fill="#f4f4f5" />

          {/* Canister Text Details */}
          <text
            x="31"
            y="60"
            transform="rotate(-90 31,60)"
            fill="#71717a"
            fontFamily="sans-serif"
            fontWeight="bold"
            fontSize="10"
            letterSpacing="3"
          >
            400
          </text>
          <text
            x="49"
            y="60"
            transform="rotate(-90 49,60)"
            fill="#18181b"
            fontFamily="sans-serif"
            fontWeight="bold"
            fontSize="13"
            letterSpacing="1"
          >
            400 TX
          </text>
        </svg>
      </div>

      {/* Ornament Badge */}
      <div className="flex flex-col items-center lg:items-start mb-[clamp(1rem,3svh,2.5rem)] w-full">
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
      <h3 className="flex flex-col items-center lg:items-start text-foreground mb-[clamp(0.5rem,2svh,1rem)] text-center lg:text-left w-full">
        <span className="text-[clamp(12px,1.5svh,17px)] font-medium tracking-[0.3em] uppercase text-[#D0A17C] mb-[clamp(0.25rem,1svh,0.75rem)]">
          Where Our
        </span>
        <span className="text-[clamp(32px,5svh,48px)] leading-[1.1] text-[#2d2c2a] opacity-90 font-script">
          Forever Began
        </span>
      </h3>

      {/* Heart Divider */}
      <div className="mb-[clamp(0.75rem,2svh,1.5rem)] flex justify-center lg:justify-start w-full">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className="text-[#d1cbbd] fill-current opacity-80"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Paragraph */}
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-md mx-auto lg:mx-0 leading-relaxed text-center lg:text-left w-full">
        Every love story is made of little moments — the first memories, the laughter we shared, and
        the milestones that brought us closer. Through every chapter, our journey grew into
        something beautiful, leading us to the beginning of our forever.
      </p>

      {/* Couple Name Signature */}
      {!hideSignature && (
        <div className="flex mt-[clamp(1rem,3svh,2.5rem)] justify-center lg:justify-start w-full">
          <span className="text-[clamp(36px,5svh,48px)] text-[#D0A17C] font-script">
            Ritesh & Genelia
          </span>
        </div>
      )}
    </div>
  );
}

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="text-foreground font-sans relative lg:mt-24 h-auto lg:h-[600vh] mb-[10vh] md:mb-[30vh] overflow-hidden lg:overflow-visible bg-[#FAF8F4] lg:bg-transparent"
    >
      {/* Mobile background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none lg:hidden">
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[120vw] aspect-square border-[1px] border-[#d1cbbd]/30 rounded-full" />
      </div>

      {/* MOBILE ONLY: Static Story Content */}
      <div className="lg:hidden w-full px-4 pt-12 pb-6 relative z-30 max-w-[420px] mx-auto flex flex-col items-center text-center">
        <span className="text-[clamp(40px,10vw,48px)] text-[#D0A17C] font-script mb-8">
          Ritesh & Genelia
        </span>
        <StoryTextContent hideSignature={true} />
      </div>

      {/* ONE clear height model on desktop. On mobile, relative flow layout */}
      <div className="relative lg:sticky lg:top-[130px] h-auto lg:h-[calc(100svh-130px)] w-full max-w-[420px] lg:max-w-none mx-auto flex flex-col items-center box-border lg:overflow-hidden lg:bg-[#FAF8F4] pb-[10vh] lg:pb-0 z-20">
        
        {/* DESKTOP DECORATIVE BACKGROUND */}
        <div className="hidden lg:flex absolute inset-0 z-0 pointer-events-none items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] aspect-square border-[1px] border-[#d1cbbd]/30 rounded-full" />
          <div className="absolute left-[10%] top-[20%] w-[3px] h-[3px] rounded-full bg-[#d1cbbd]/50" />
          <div className="absolute right-[15%] bottom-[30%] w-[3px] h-[3px] rounded-full bg-[#d1cbbd]/50" />
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[55%] aspect-square border-l-[1px] border-t-[1px] border-b-[1px] border-[#d1cbbd]/30 rounded-l-full" />
        </div>

        <div className="max-w-[1400px] mx-auto flex flex-1 flex-col lg:flex-row w-full justify-center z-10 relative h-full">
          {/* DESKTOP ONLY: Text Section inside sticky area */}
          <div className="hidden lg:flex relative w-[40%] px-12 xl:px-16 flex-col justify-center shrink-0">
            <StoryTextContent />
          </div>

          {/* RIGHT: Pinned Timeline Section (CARD) */}
          <div className="w-full lg:w-[60%] relative flex-1 flex flex-col lg:justify-center px-4 lg:py-8 h-auto lg:h-full">
            
            {/* TIMELINE CARD */}
            <div className="relative w-full h-auto lg:h-[85%] lg:max-h-[850px] lg:bg-white lg:border lg:border-[#e8e4dc] lg:rounded-[2rem] lg:shadow-sm lg:p-8 flex flex-col justify-center">
              
              {/* INNER VISUAL FRAME: Safe vertical height */}
              <div className="relative z-20 w-full h-auto lg:h-[80%] sm:h-[75%] py-4 lg:py-0">
                
                {/* Background Dashed Line */}
                <div className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-[2px] border-l-[2px] border-dashed border-[#d1cbbd]/40 -translate-x-1/2 z-0"></div>

                {/* Animated Solid Cream Progress Line */}
                <motion.div
                  className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-[#d1cbbd] -translate-x-1/2 origin-top z-10"
                  style={{ scaleY: scrollYProgress }}
                />

                {/* Render Timeline Items */}
                <div className="relative lg:absolute inset-0 w-full h-full z-20 flex flex-col lg:block">
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
  );
}
