import { useState, useEffect } from "react";
import { featuredFilms } from "@/data/site";
import { CinematicVideoCard } from "./CinematicVideoCard";
import { Reveal } from "./Reveal";

export function VideoShowcaseSection() {
  // Keeps track of which video is currently active (playing)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Handle clicks outside the videos to stop them and return to cover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Ignore if clicking inside a video card
      if ((e.target as Element).closest('.video-card-container')) {
        return;
      }
      setActiveVideoId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Take only the first 4 if the array is longer
  const displayFilms = featuredFilms.slice(0, 4);

  return (
    <section className="shell py-16 md:py-24">
      {/* Section Header */}
      <Reveal className="flex flex-col items-center text-center mb-12 md:mb-20">
        <p className="label-xs text-bronze tracking-[2px] uppercase text-[12px] mb-4">
          Featured Wedding Films
        </p>
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.1] tracking-tight text-[#2d2c2a] max-w-2xl mb-8">
          Stories captured in motion,{" "}
          <span className="italic font-light text-[#8b867c]">emotion and light.</span>
        </h2>
      </Reveal>

      {/* 2x2 Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mx-auto w-full max-w-[1400px]">
        {displayFilms.map((film, index) => (
          <Reveal key={film.id} delay={0.1 * index} className="w-full h-full">
            <CinematicVideoCard
              film={film}
              isActive={activeVideoId === film.id}
              onActivate={() => setActiveVideoId(film.id)}
            />
          </Reveal>
        ))}
      </div>

      {/* Camera Mode Dial SVG and Closing Text */}
      <Reveal className="flex flex-col items-center mt-16 md:mt-24 text-center pb-8">
        <svg
          width="100"
          height="100"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm mb-2"
        >
          <defs>
            <mask id="camera-cutouts">
              {/* Everything white stays, everything black becomes transparent */}
              <rect width="120" height="120" fill="white" />

              {/* Left Reel Holes - Rotating */}
              <g
                className="animate-spin"
                style={{
                  transformOrigin: "40px 40px",
                  animationDuration: "6s",
                  animationTimingFunction: "linear",
                }}
              >
                <circle cx="40" cy="40" r="3.5" fill="black" />
                <circle cx="40" cy="26" r="4.5" fill="black" />
                <circle cx="53.3" cy="35.7" r="4.5" fill="black" />
                <circle cx="48.2" cy="51.3" r="4.5" fill="black" />
                <circle cx="31.8" cy="51.3" r="4.5" fill="black" />
                <circle cx="26.7" cy="35.7" r="4.5" fill="black" />
              </g>

              {/* Right Reel Holes - Rotating */}
              <g
                className="animate-spin"
                style={{
                  transformOrigin: "80px 40px",
                  animationDuration: "6s",
                  animationTimingFunction: "linear",
                }}
              >
                <circle cx="80" cy="40" r="3.5" fill="black" />
                <circle cx="80" cy="26" r="4.5" fill="black" />
                <circle cx="93.3" cy="35.7" r="4.5" fill="black" />
                <circle cx="88.2" cy="51.3" r="4.5" fill="black" />
                <circle cx="71.8" cy="51.3" r="4.5" fill="black" />
                <circle cx="66.7" cy="35.7" r="4.5" fill="black" />
              </g>

              {/* Body Inner Detail Cutout */}
              <rect
                x="36"
                y="66"
                width="48"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2.5"
              />
            </mask>
          </defs>

          <g mask="url(#camera-cutouts)" fill="#2d2c2a">
            {/* Left Reel */}
            <circle cx="40" cy="40" r="21" />

            {/* Right Reel */}
            <circle cx="80" cy="40" r="21" />

            {/* Main Body */}
            <rect x="29" y="58" width="62" height="38" />

            {/* Lens Connector */}
            <rect x="91" y="67" width="4" height="20" />

            {/* Lens Cone */}
            <polygon points="95,67 111,57 111,97 95,87" />
          </g>
        </svg>

        {/* Text underneath the badge */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase text-[#2d2c2a] font-sans font-medium mb-3">
            YOUR STORY. OUR FRAME. FOREVER.
          </p>
          <p className="font-display italic text-[#8b867c] text-[18px] md:text-[22px]">
            Moments made timeless.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
