import { assets } from "../../assets/asset-manifest";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

// Single 4-item story used on BOTH desktop and mobile (2001 dropped per request).
const timelineData = [
  { year: "Prewedding", image: assets.recentWork.recent01 },
  { year: "Haldi", image: assets.recentWork.recent02 },
  { year: "Sangeet", image: assets.recentWork.recent03 },
  { year: "Varmala", image: assets.misc.image6 },
];

// ==========================================
// EXACT PIXEL GAP MATH (38px Target)
// ==========================================
// To achieve an exact, unbreakable 38px vertical gap between consecutive
// same-column items, we must decouple the track height from the viewport height.
//
// The line now runs EXACTLY from the first dot to the last dot (no overhang):
//   Line height = (N - 1) * step   where N = number of items
//
// Each image is offset by 2px from the line:
//   - First item's image TOP sits 2px BELOW the first dot / line start.
//   - Last item's image BOTTOM sits 2px ABOVE the last dot / line end.
// This is handled via --img-edge-gap (2px) applied as a translateY nudge
// on the first and last item's image block only.
//
// MOBILE MATH (e.g., 390px width) — 4 ITEMS:
// - Image Width (--img-w) ≈ 117px @390
// - Image Height (aspect 1.4) = 117 / 1.4 ≈ 83.5px
// - Label Height (14px font + 4px mb) = 18px
// - Total Item Height (h_item) ≈ 101.5px
// - Required Gap = 38px
// - Step (half distance between same-column items) = (101.5 + 38) / 2 ≈ 69.75px
// - Line Height = 3 steps (N-1 for N=4) ≈ 209.25px  <-- ends exactly at last dot
//
// DESKTOP MATH (e.g., 1440px width) — 4 ITEMS:
// - Image Width ≈ 230px (clamped)
// - Image Height = 230 / 1.4 ≈ 164px
// - Label Height (20px font + 8px mb) = 28px
// - Total Item Height (h_item) ≈ 192px
// - Step = (192 + 34) / 2 = 113px
// - Line Height (3 steps) = 339px
// ==========================================

function TimelineItem({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: { year: string; image: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const sides = ["right", "left", "right", "left", "right"];
  const isRightSide = sides[index % sides.length] === "right";
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const totalGaps = total - 1;

  // itemPosition is strictly for scroll-mapping (0%, ..., 100%) across however
  // many items this breakpoint actually renders.
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

  const imgY = useTransform(easedProgress, [0, 1], ["100%", "0%"]);
  const dotScale = useTransform(easedProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(easedProgress, [0, 1], [0, 1]);
  const yearY = useTransform(easedProgress, [0, 1], [20, 0]);
  const yearOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

  const alignClass = isRightSide ? "text-left items-start" : "text-right items-end";
  const sideClass = isRightSide
    ? "pl-[calc(50%+1rem)] sm:pl-[calc(50%+1.5rem)] md:pl-[calc(50%+2rem)] justify-start"
    : "pr-[calc(50%+1rem)] sm:pr-[calc(50%+1.5rem)] md:pr-[calc(50%+2rem)] justify-end";

  // Exact 2px nudge: first item's image top sits 2px below the dot/line start,
  // last item's image bottom sits 2px above the dot/line end. Middle items are
  // untouched (they're already dot-centered).
  const edgeNudgeClass = isFirst
    ? "translate-y-[2px] md:translate-y-[2px]"
    : isLast
      ? "-translate-y-[2px] md:-translate-y-[2px]"
      : "";

  const contentBlock = (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <motion.span
        initial={{ y: isFirst ? 0 : 20, opacity: isFirst ? 1 : 0 }}
        style={{ y: yearY, opacity: yearOpacity }}
        className="text-[clamp(24px,3vw,32px)] font-script font-light text-[#2d2c2a] opacity-95 mb-[4px] md:mb-[8px] tracking-wide leading-none block"
      >
        {item.year}
      </motion.span>
      {/* Strict fixed-size container mapping exactly to the CSS variables.
          edgeNudgeClass applies the exact 2px offset for first/last items only. */}
      <div
        className={`w-[var(--img-w)] md:w-[var(--img-w-md)] h-[var(--img-h)] md:h-[var(--img-h-md)] rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-transparent relative shrink-0 ${edgeNudgeClass}`}
      >
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

  const alignmentStyle: React.CSSProperties = {
    "--item-top": `calc(${index} * var(--step))`,
    "--item-top-md": `calc(${index} * var(--step-md))`,
    transform: "translateY(-12px)",
  } as React.CSSProperties;

  return (
    <div
      className="absolute left-0 w-full flex items-start z-20 top-[var(--item-top)] md:top-[var(--item-top-md)]"
      style={alignmentStyle}
    >
      <motion.div
        initial={{ scale: isFirst ? 1 : 0.5, opacity: isFirst ? 1 : 0 }}
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-1/2 top-[calc(var(--lbl-h)+var(--img-h)/2)] md:top-[calc(var(--lbl-h-md)+var(--img-h-md)/2)] w-3 h-3 md:w-4 md:h-4 bg-background rounded-full border-[2px] md:border-[3px] border-[#d1cbbd] -translate-x-1/2 -translate-y-1/2 z-30"
      />
      <div className={`w-full flex ${sideClass}`}>{contentBlock}</div>
    </div>
  );
}

function StoryTextContent() {
  return (
    <div className="relative z-10 flex flex-col items-center md:items-start w-full text-center md:text-left pt-0 mt-0">
      <h3 className="flex flex-col items-center md:items-start text-foreground mb-4 md:mb-[clamp(1rem,3svh,2rem)] w-full">
        <span className="text-[36px] sm:text-[42px] md:text-[clamp(42px,6svh,64px)] leading-[1.1] text-[#2d2c2a] opacity-95 font-script font-light">
          The Story We Frame
        </span>
      </h3>
      
      <div className="mb-4 md:mb-[clamp(1rem,3svh,2rem)] flex justify-center md:justify-start w-full">
        <svg width="12" height="12" viewBox="0 0 24 24" className="text-[#D0A17C] fill-current opacity-60">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      
      <p className="text-[13px] sm:text-sm md:text-[clamp(14px,1.8svh,16px)] text-[#5c5b59] max-w-sm mx-auto md:mx-0 leading-[1.9] font-light tracking-wide w-full">
        From anticipation to celebration, every moment has its own rhythm. We capture the quiet glances, the vibrant rituals, the wild celebrations, and the emotions in between — turning every chapter of your wedding into a story worth reliving.
      </p>
    </div>
  );
}

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress targets ONLY the section wrapping this component, giving
  // clean 0-1 output for the whole scroll-locked story. Mobile uses a shorter
  // scroll track (4 items) than desktop (5 items) — see heightClass below.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = timelineData.length; // 4

  return (
    <div className="w-full relative bg-[#FAF8F4] m-0 p-0">
      <section
        ref={containerRef}
        className="text-foreground font-sans relative w-full h-[500vh] bg-[#FAF8F4] m-0 p-0 border-none z-20"
      >
        <div className="sticky top-0 w-full min-h-[100svh] md:h-[100svh] mx-auto flex flex-col md:flex-row items-center justify-center box-border z-20 py-4 md:py-8 overflow-visible md:overflow-hidden bg-[#FAF8F4]">
          {/* Atmospheric Cinematic Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Soft glow behind Timeline Card (Right/Bottom) */}
            <div className="absolute right-[-20%] top-[40%] md:top-[10%] md:right-[-5%] w-[120vw] md:w-[65vw] h-[120vw] md:h-[65vw] rounded-full bg-[#E5D4C3] opacity-30 md:opacity-[0.25] blur-[100px] md:blur-[140px] mix-blend-multiply" />
            
            {/* Subtle glow behind Text (Left/Top) */}
            <div className="absolute left-[-20%] top-[-10%] md:left-[-10%] md:top-[5%] w-[100vw] md:w-[55vw] h-[100vw] md:h-[55vw] rounded-full bg-[#EADDCE] opacity-40 md:opacity-[0.35] blur-[90px] md:blur-[130px] mix-blend-multiply" />
            
            {/* Oversized faint organic form (Center/Bottom) */}
            <div className="absolute left-[10%] md:left-[20%] bottom-[-20%] md:bottom-[-10%] w-[150vw] md:w-[80vw] h-[100vw] md:h-[50vw] rounded-[100%] bg-[#DBCBB9] opacity-20 md:opacity-[0.15] blur-[100px] md:blur-[150px] mix-blend-multiply" />
          </div>

          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row flex-1 w-full justify-center md:justify-between items-center relative h-auto md:h-full px-4 sm:px-6 md:px-12 lg:px-20 z-10">
            <div className="flex w-full md:w-[45%] flex-col justify-center items-center md:items-start shrink-0 mb-8 sm:mb-12 md:mb-0 md:pr-8 lg:pr-16 z-30 bg-transparent">
              <StoryTextContent />
            </div>

            <div
              className="w-full md:w-[55%] flex-1 flex flex-col justify-center items-center md:items-end z-20"
              style={
                {
                  "--img-w": "clamp(80px, min(28vw, 14svh), 160px)",
                  "--img-h": "calc(var(--img-w) / 1.35)",
                  "--lbl-h": "28px",
                  "--item-h": "calc(var(--img-h) + var(--lbl-h))",
                  "--gap": "28px",
                  "--step": "calc((var(--item-h) + var(--gap)) / 2)",

                  "--img-w-md": "clamp(160px, min(24vw, 22svh), 260px)",
                  "--img-h-md": "calc(var(--img-w-md) / 1.35)",
                  "--lbl-h-md": "40px",
                  "--item-h-md": "calc(var(--img-h-md) + var(--lbl-h-md))",
                  "--gap-md": "40px",
                  "--step-md": "calc((var(--item-h-md) + var(--gap-md)) / 2)",
                } as React.CSSProperties
              }
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[640px] bg-[#fdfbf9] border border-[#e8e4dc]/70 rounded-[1.75rem] md:rounded-[2.5rem] shadow-[0_12px_40px_rgba(45,44,42,0.04)] flex flex-col items-center justify-center overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="relative w-full h-[calc(3*var(--step))] md:h-[calc(3*var(--step-md))] mb-[var(--item-h)] md:mb-[var(--item-h-md)] z-20">
                  <div className="absolute left-1/2 top-[calc(var(--lbl-h)+var(--img-h)/2-12px)] md:top-[calc(var(--lbl-h-md)+var(--img-h-md)/2-12px)] h-[calc(3*var(--step))] md:h-[calc(3*var(--step-md))] w-[1px] md:w-[2px] border-l-[1px] md:border-l-[2px] border-dashed border-[#d1cbbd]/50 -translate-x-1/2 z-0" />

                  <motion.div
                    className="absolute left-1/2 top-[calc(var(--lbl-h)+var(--img-h)/2-12px)] md:top-[calc(var(--lbl-h-md)+var(--img-h-md)/2-12px)] h-[calc(3*var(--step))] md:h-[calc(3*var(--step-md))] w-[1px] md:w-[2px] bg-[#c3b6a4] -translate-x-1/2 origin-top z-10"
                    style={{ scaleY: scrollYProgress }}
                  />

                  {timelineData.map((item, index) => (
                    <TimelineItem
                      key={item.year}
                      item={item}
                      index={index}
                      total={total}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
