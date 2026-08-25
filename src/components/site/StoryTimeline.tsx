import { assets } from "../../assets/asset-manifest";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

// Single 4-item story used on BOTH desktop and mobile (2001 dropped per request).
const timelineData = [
  { year: "Prewedding", image: assets.recentWork.recent01.replace('.webp', '_timeline.webp') },
  { year: "Haldi", image: assets.recentWork.recent02.replace('.webp', '_timeline.webp') },
  { year: "Sangeet", image: assets.recentWork.recent03.replace('.webp', '_timeline.webp') },
  { year: "Varmala", image: assets.misc.image6.replace('.webp', '_timeline.webp') },
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
// SYNC FIX (previous pass):
// The connecting line and each item's image now derive their progress from
// the exact same per-segment [start, end] window + the same easing curve
// (getSegmentWindow below), so the line only fills in at the rate the
// corresponding image is actually animating in.
//
// PRELOAD / RENDER-READY FIX (this pass):
// The reported symptom -- "image scroll pe sahi jagah aane me time leti hai"
// -- was NOT actually an animation-timing bug. It was the browser paying the
// decode/paint cost for each <img> the FIRST time it became visible, which
// happened to be exactly when the user was scrolling past its trigger point.
// Motion was updating the `y` transform every frame correctly, but the
// <img> itself had nothing decoded yet, so the browser showed a blank/late
// frame or a visible pop-in even though the transform value was already at
// its target position.
//
// Fix, in three parts:
//   1. `usePreloadImages` fires a `new Image()` for every timeline image the
//      moment this component mounts (well before the user scrolls into the
//      section), so bytes are already in the browser's image cache.
//   2. Every <motion.img> uses `loading="eager"` and `decoding="sync"` so
//      the browser never lazy-loads or defers decode of images that are
//      about to be scroll-triggered.
//   3. We gate the scroll-linked reveal on a `imagesReady` boolean -- until
//      every image has finished loading, each image is rendered at its
//      resting position (y: 0%) and fully opaque/visible instead of parked
//      off-screen. This guarantees there is never a state where scroll
//      progress says "fully arrived" but the bitmap is still one frame from
//      being ready to paint.
// ==========================================

// Shared timing constants so every item + the line agree on exact windows.
const TIMELINE_START = 0.0;
const ACTIVE_MAX_SCROLL = 0.92;

function getSegmentWindow(index: number, total: number) {
  const isFirst = index === 0;
  const totalGaps = total - 1;
  const itemPosition = (index / totalGaps) * 100;
  const prevItemPosition = isFirst ? 0 : ((index - 1) / totalGaps) * 100;

  const end = isFirst ? TIMELINE_START : TIMELINE_START + (itemPosition / 100) * ACTIVE_MAX_SCROLL;
  const start = isFirst ? TIMELINE_START : TIMELINE_START + (prevItemPosition / 100) * ACTIVE_MAX_SCROLL;

  return { start, end };
}

// Preloads every image used in the timeline as soon as the component mounts,
// well ahead of the user scrolling into the pinned section. Returns true
// once all images have either loaded or errored (we don't want a single
// broken asset to permanently block the reveal).
function usePreloadImages(urls: string[]) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    if (urls.length === 0) {
      setReady(true);
      return;
    }

    const markOneDone = () => {
      loadedCount += 1;
      if (!cancelled && loadedCount >= urls.length) {
        setReady(true);
      }
    };

    urls.forEach((url) => {
      const img = new Image();
      img.decoding = "sync";
      img.onload = markOneDone;
      img.onerror = markOneDone;
      img.src = url;
      // If already cached, some browsers won't fire onload reliably -- check complete.
      if (img.complete) {
        markOneDone();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [urls.join("|")]);

  return ready;
}

function TimelineItem({
  item,
  index,
  total,
  scrollYProgress,
  imagesReady,
}: {
  item: { year: string; image: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  imagesReady: boolean;
}) {
  const sides = ["right", "left", "right", "left", "right"];
  const isRightSide = sides[index % sides.length] === "right";
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const { start, end } = getSegmentWindow(index, total);

  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const easedProgress = useTransform(localProgress, (p) => {
    if (isFirst) return 1;
    // Quintic-out: snappy arrival, image settles quickly instead of
    // trailing the scroll for a long visible stretch.
    return 1 - Math.pow(1 - p, 5);
  });

  // REVERSE-SCROLL FIX:
  // Previously imgVisibility toggled to "hidden" whenever p <= 0, which
  // caused the image to visibly vanish when scrolling back up (bottom to
  // top) -- as soon as easedProgress dipped back to exactly 0 for a frame,
  // the browser dropped the image instead of just sliding it back off
  // screen. Visibility toggling is not needed at all: the image is already
  // fully clipped by its parent's `overflow-hidden` container, so sliding
  // it to 102% naturally hides it without ever touching the DOM's paint
  // state. Removing the visibility hack makes the slide-in/out perfectly
  // symmetric in both scroll directions -- same curve, same speed, forward
  // and backward, with no disappearing frame.
  const imgY = useTransform(easedProgress, (p) => (imagesReady ? `${(1 - p) * 102}%` : "0%"));

  const dotScale = useTransform(easedProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(easedProgress, [0, 1], [0, 1]);
  const yearY = useTransform(easedProgress, [0, 1], [20, 0]);
  const yearOpacity = useTransform(easedProgress, [0, 1], [0, 1]);

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
    <div className="flex flex-col items-center w-[var(--img-w)] md:w-[var(--img-w-md)]">
      <motion.div
        initial={{ y: isFirst ? 0 : 20, opacity: isFirst ? 1 : 0 }}
        style={{ y: yearY, opacity: yearOpacity }}
        className="inline-flex flex-col items-center mb-[6px] md:mb-[10px]"
      >
        <span className="text-[clamp(18px,2.2vw,26px)] font-script font-light text-[#2d2c2a] opacity-95 tracking-wide leading-none">
          {item.year}
        </span>
        {/* Dynamic Width Ultra-thin Ornamental Divider */}
        <div className="flex items-center justify-center w-full mt-[3px] opacity-90 text-[#bfae91]">
           {/* Left dots */}
           <div className="w-[2px] h-[2px] rounded-full bg-current opacity-60"></div>
           <div className="w-[1.5px] h-[1.5px] rounded-full bg-current opacity-40 ml-[2px]"></div>
           {/* Left line */}
           <div className="flex-grow h-[0.5px] bg-current opacity-60 ml-[2px]"></div>
           {/* Center diamond */}
           <div className="w-[3px] h-[3px] rotate-45 bg-current mx-[4px] opacity-90"></div>
           {/* Right line */}
           <div className="flex-grow h-[0.5px] bg-current opacity-60 mr-[2px]"></div>
           {/* Right dots */}
           <div className="w-[1.5px] h-[1.5px] rounded-full bg-current opacity-40 mr-[2px]"></div>
           <div className="w-[2px] h-[2px] rounded-full bg-current opacity-60"></div>
        </div>
      </motion.div>
      {/* Strict fixed-size container mapping exactly to the CSS variables.
          edgeNudgeClass applies the exact 2px offset for first/last items only. */}
      <div
        className={`w-[var(--img-w)] md:w-[var(--img-w-md)] h-[var(--img-h)] md:h-[var(--img-h-md)] rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-transparent relative shrink-0 ${edgeNudgeClass}`}
        style={{
          // Force Safari to respect border-radius clipping on absolute children
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
          transform: "translateZ(0)",
        }}
      >
        <motion.img
          initial={{ y: isFirst ? "0%" : "102%" }}
          style={{ y: imgY, willChange: "transform" }}
          src={item.image}
          alt={`Year ${item.year}`}
          loading="eager"
          decoding="sync"
          fetchPriority={isFirst ? "high" : "auto"}
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
      {/* Animated Film Roll (Custom SVG) */}
      <div className="w-full flex justify-center md:justify-start md:-mt-2 mb-4 md:mb-8 px-0">
        <div className="flex justify-start items-center w-[140px] md:w-[220px] h-[60px] md:h-[95px]">
          <svg viewBox="0 0 160 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Leader Shape (Tongue) at the end of the film */}
              <clipPath id="film-shape">
                <path d="M 0 22 H 150 V 40 H 137 Q 130 40 130 58 H 0 Z" />
              </clipPath>
              {/* Mask to ensure film hides behind the canister slit */}
              <clipPath id="canister-mask">
                <rect x="28" y="0" width="140" height="80" />
              </clipPath>
            </defs>

            {/* Sliding Film Strip */}
            <g clipPath="url(#canister-mask)">
              {/* Slides from inside the canister (-120px) to fully out (0px) */}
              <motion.g
                animate={{ x: [-120, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                {/* The film body clipped to the leader shape */}
                <g clipPath="url(#film-shape)">
                  <rect x="0" y="22" width="160" height="36" fill="#1c1c1c" />

                  {/* Rolling Sprockets (Moves continuously for the 'roll' effect) */}
                  <motion.g
                    animate={{ x: [0, 14] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(15)].map((_, i) => (
                      <rect key={`top-${i}`} x={i * 14} y="25" width="5" height="5" rx="1" fill="#FAF8F4" />
                    ))}
                    {[...Array(15)].map((_, i) => (
                      <rect key={`bot-${i}`} x={i * 14} y="50" width="5" height="5" rx="1" fill="#FAF8F4" />
                    ))}
                  </motion.g>
                </g>
              </motion.g>
            </g>

            {/* Canister (Static X, drawn on top at exactly x=0 for flush alignment) */}
            <g>
              <rect x="0" y="5" width="30" height="70" rx="3" fill="#111" />
              <rect x="2" y="15" width="26" height="50" fill="#e8e4dc" />
              <rect x="-2" y="5" width="34" height="6" rx="2" fill="#1a1a1a" />
              <rect x="-2" y="69" width="34" height="6" rx="2" fill="#1a1a1a" />
              <rect x="7" y="0" width="16" height="6" fill="#222" />
              <rect x="7" y="74" width="16" height="6" fill="#222" />
              <text x="15" y="40" fill="#2d2c2a" fontSize="11" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 15 40)" textAnchor="middle" letterSpacing="1">400 TX</text>
            </g>
            {/* Slit Depth (Static so film always comes from the exact same slot) */}
            <rect x="28" y="18" width="2" height="44" fill="#000" />
          </svg>
        </div>
      </div>

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = timelineData.length; // 4

  // Preload every image used in this section the moment the component
  // mounts -- long before the user scrolls the pinned section into its
  // active range. This removes the decode/paint delay that was making
  // scroll-triggered images feel like they "take time to reach position"
  // even though their transform value was already correct.
  const imageUrls = timelineData.map((t) => t.image);
  const imagesReady = usePreloadImages(imageUrls);

  const lineProgress = useTransform(scrollYProgress, (raw) => {
    const totalGaps = total - 1;
    let filled = 0;

    for (let i = 1; i < total; i++) {
      const { start, end } = getSegmentWindow(i, total);
      if (raw <= start) {
        break;
      }
      const clamped = Math.min(Math.max((raw - start) / Math.max(end - start, 0.0001), 0), 1);
      const eased = 1 - Math.pow(1 - clamped, 5);
      filled = (i - 1) / totalGaps + eased / totalGaps;
    }

    return Math.min(Math.max(filled, 0), 1);
  });

  return (
    <div className="w-full relative bg-[#FAF8F4] m-0 p-0">
      <section
        ref={containerRef}
        className="text-foreground font-sans relative w-full h-[500vh] bg-[#FAF8F4] m-0 p-0 border-none z-20"
      >
        <div className="sticky top-0 w-full min-h-[100svh] md:h-[100svh] mx-auto flex flex-col md:flex-row items-center justify-center box-border z-20 py-4 md:py-8 overflow-visible md:overflow-hidden bg-[#FAF8F4]">
          {/* Atmospheric Cinematic Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute right-[-20%] top-[40%] md:top-[10%] md:right-[-5%] w-[120vw] md:w-[65vw] h-[120vw] md:h-[65vw] rounded-full bg-[#E5D4C3] opacity-30 md:opacity-[0.25] blur-[100px] md:blur-[140px] mix-blend-multiply" />
            <div className="absolute left-[-20%] top-[-10%] md:left-[-10%] md:top-[5%] w-[100vw] md:w-[55vw] h-[100vw] md:h-[55vw] rounded-full bg-[#EADDCE] opacity-40 md:opacity-[0.35] blur-[90px] md:blur-[130px] mix-blend-multiply" />
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
                    style={{ scaleY: lineProgress }}
                  />

                  {timelineData.map((item, index) => (
                    <TimelineItem
                      key={item.year}
                      item={item}
                      index={index}
                      total={total}
                      scrollYProgress={scrollYProgress}
                      imagesReady={imagesReady}
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
