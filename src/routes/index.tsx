// @ts-nocheck
import { assets } from "../assets/asset-manifest";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

import { images } from "@/data/images";
import { stories, waLink } from "@/data/site";

import { Reveal, RevealImage } from "@/components/site/Reveal";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { DiagonalBreak } from "@/components/site/DiagonalBreak";
import { EditorialCollage } from "@/components/site/EditorialCollage";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { Laurel } from "@/components/site/Laurel";
import { WhatsAppButton } from "@/components/site/CTA";

import { VideoShowcaseSection } from "@/components/site/VideoShowcaseSection";
import { StoryTimeline } from "@/components/site/StoryTimeline";

import { InstagramGallery } from "@/components/site/InstagramGallery";


import { getSeoMetadata, BUSINESS_INFO, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: getSeoMetadata(
      "The Swaymvar — Wedding Photography & Films in Bikaner",
      BUSINESS_INFO.description,
      "/"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

/* =========================================================
   HOME
========================================================= */
function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicSectionRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play failed:", e));
    }
  };

  // Pause audio when unmounting or scrolling out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // When section is out of view, pause music automatically
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.0 }
    );

    if (musicSectionRef.current) {
      observer.observe(musicSectionRef.current);
    }

    return () => {
      observer.disconnect();
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={assets.audio.music.cinematicWedding}
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      />
      {/* HERO WITH PARALLAX SCROLL EFFECT */}
      <div className="relative w-full">
        <div className="sticky top-0 left-0 w-full h-[100svh] z-0 overflow-hidden">
          <AnimatedHero />
        </div>

        {/* MAIN CONTENT LAYER THAT SCROLLS OVER THE HERO */}
        <div className="relative z-10 bg-background w-full">
          {/* BRAND / STUDIO */}
          <section className="shell section-y flex flex-col items-center justify-center overflow-hidden">
            <Reveal className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
              <p className="label-xs text-bronze tracking-[2px] uppercase text-[12px]">
                The Studio
              </p>
              <h4 className="font-display font-normal mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[#2d2c2a] mx-auto max-w-[700px]">
                An intimate studio dedicated to the{" "}
                <span className="italic text-[#8b867c] font-light">art of noticing.</span>
              </h4>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[17px] mx-auto">
                theswaymvar was built around a simple preference: that a wedding should be recorded,
                not directed. We arrive early, learn the names, and then spend the day out of the
                way — waiting for the things that only happen once.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[17px] mx-auto">
                The result is a body of work that looks like your family rather than a catalogue.
              </p>
              <Link
                to="/photography"
                className="label-xs story-link mt-10 inline-block text-foreground mx-auto"
              >
                See the work
              </Link>
            </Reveal>
          </section>



          {/* EDITORIAL COLLAGE */}
          <EditorialCollage />

          {/* NEW: VIDEO SHOWCASE SECTION */}
          <VideoShowcaseSection />

          {/* CINEMATIC BREAK */}
          <DiagonalBreak image={assets.misc.parallaxBg} />

          {/* FEATURED WORK */}
          <section ref={musicSectionRef} className="w-full max-w-[1440px] mx-auto bg-[#f7f4ee] py-[40px] md:py-[55px] pb-[60px] md:pb-[70px] px-[5vw] lg:px-[7vw]">
            <div className="max-w-[1290px] mx-auto text-center">
              <Reveal>
                {/* TOP SMALL LABELS */}
                <div className="flex flex-row items-center justify-center gap-1.5 md:gap-4 text-[9px] sm:text-[11px] md:text-[13px] tracking-[1.5px] md:tracking-[2.5px] text-[#8b867c] uppercase flex-nowrap whitespace-nowrap">
                  <span>Capturing Moments</span>
                  {/* Floral ornament */}
                  <svg
                    width="60"
                    height="20"
                    viewBox="0 0 100 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-1 md:mx-2 text-[#d0c5a8] w-[40px] md:w-[100px] h-auto"
                  >
                    <path
                      d="M50 5C50 5 48 12 40 15C48 18 50 25 50 25C50 25 52 18 60 15C52 12 50 5 50 5Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path d="M40 15 Q30 5 20 15 Q30 25 40 15" fill="currentColor" opacity="0.6" />
                    <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="currentColor" opacity="0.6" />
                  </svg>
                  <span>Crafting Memories</span>
                </div>

                {/* MAIN HEADING */}
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] text-center mt-[25px] md:mt-[35px] max-w-[900px] mx-auto whitespace-nowrap">
                  Your Story, <span className="italic font-light text-[#8b867c]">Our Lens</span>
                </h2>

                {/* ORNAMENT UNDER HEADING */}
                <div className="flex items-center justify-center mt-[15px] md:mt-[25px] text-[#c1b599]">
                  <span className="w-[40px] md:w-[70px] h-[1px] bg-[#d1cbbd]"></span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-4"
                  >
                    <path
                      d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17L5.5 22L8 14.5L2 9.5H9.5L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="w-[40px] md:w-[70px] h-[1px] bg-[#d1cbbd]"></span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-[#5D5A55] text-[15px] md:text-[19px] font-normal tracking-[0.2px] text-center max-w-[800px] mx-auto mt-[18px]">
                  Every love story is unique. We're here to capture yours in the most timeless way.
                </p>
              </Reveal>
            </div>

            {/* MAIN 3-COLUMN LAYOUT */}
            <div className="mx-auto mt-[38px] w-full max-w-[1280px]">
              <div className="grid grid-cols-3 lg:grid-cols-[1fr_1.05fr_1fr] gap-[10px] sm:gap-[15px] md:gap-[28px] items-start w-full">
                {/* LEFT COUPLE IMAGE */}
                <Reveal delay={0.08} className="w-full">
                  <Link
                    to="/photography/$slug"
                    params={{ slug: stories[0].slug }}
                    className="hover-lift block group w-full"
                  >
                    <div
                      className="overflow-hidden rounded-[8px] md:rounded-[20px] bg-muted w-full aspect-[3/4] md:aspect-auto md:h-[455px]"
                      style={{ boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
                    >
                      <img
                        src={stories[0].cover}
                        alt={stories[0].couple}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* TEXT & ORNAMENT */}
                    <div className="mt-[12px] md:mt-[28px] text-center w-full px-1">
                      <div className="flex items-center justify-center gap-[4px] md:gap-[10px] text-[5px] sm:text-[7px] md:text-[12px] tracking-[1px] md:tracking-[2px] uppercase text-[#8b867c] font-sans">
                        <span className="font-light">→</span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">A Story of Us</span>
                        <span className="font-light">←</span>
                      </div>
                      <h3 className="font-display text-[10px] sm:text-[12px] md:text-[22px] font-normal text-[#2d2c2a] mt-[4px] md:mt-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {stories[0].couple}
                      </h3>
                      <div className="flex justify-center mt-[8px] md:mt-[20px] text-[#d1cbbd]">
                        {/* Tiny Ornament */}
                        <svg
                          width="60"
                          height="15"
                          viewBox="0 0 60 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[20px] md:w-[60px] h-auto"
                        >
                          <path
                            d="M30 2 L33 7.5 L30 13 L27 7.5 Z"
                            fill="currentColor"
                            opacity="0.8"
                          />
                          <path
                            d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5"
                            fill="currentColor"
                            opacity="0.5"
                          />
                          <path
                            d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5"
                            fill="currentColor"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>

                {/* CENTER INTERACTIVE MUSIC CARD */}
                <Reveal delay={0.16} className="w-full z-10 mt-[4px] md:mt-[8px]">
                  <div
                    className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-[500px] md:h-[500px] bg-[#fcfbfa] rounded-[10px] md:rounded-[28px] flex flex-col items-center justify-between select-none"
                    style={{
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 20px 35px rgba(0,0,0,0.10)",
                    }}
                  >
                    {/* Turntable */}
                    <div className="relative w-full flex items-start justify-center mt-[20px] md:mt-[50px]">
                      
                      {/* Vinyl Record & Tonearm Wrapper */}
                      <div className="relative w-[55%] md:w-[190px] aspect-square flex items-center justify-center">
                        
                        {/* Tonearm (Anchored to the vinyl) */}
                        <div className="absolute -left-[18%] md:-left-[30px] -top-[12%] md:top-[-20px] z-20 pointer-events-none w-[45%] md:w-[85px]">
                          <svg
                            className={`w-full h-auto transition-transform duration-[1000ms] ease-in-out ${isPlaying ? "rotate-[-5deg]" : "rotate-[12deg]"}`}
                            style={{ transformOrigin: "26.66% 15%" }}
                            viewBox="0 0 90 160"
                            fill="none"
                          >
                            {/* Pivot at top left */}
                            <circle
                              cx="24"
                              cy="24"
                              r="14"
                              stroke="#b0aba1"
                              strokeWidth="1.5"
                              fill="none"
                            />
                            <circle cx="24" cy="24" r="4" fill="#b0aba1" />
                            {/* Arm dropping down and curving right */}
                            <path
                              d="M24 38 L24 115 Q24 135 45 135 L65 135"
                              stroke="#b0aba1"
                              strokeWidth="1.5"
                              fill="none"
                            />
                            {/* Headshell */}
                            <rect
                              x="65"
                              y="130"
                              width="8"
                              height="18"
                              rx="2"
                              stroke="#b0aba1"
                              strokeWidth="1.5"
                              fill="none"
                            />
                            <line
                              x1="69"
                              y1="132"
                              x2="69"
                              y2="146"
                              stroke="#b0aba1"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>

                        {/* Vinyl Disc */}
                        <div
                          className="w-full h-full rounded-full bg-[#1c1c1c] flex items-center justify-center relative overflow-hidden animate-spin"
                          style={{
                            animationDuration: "3s",
                            animationTimingFunction: "linear",
                            animationPlayState: isPlaying ? "running" : "paused",
                            background:
                              "radial-gradient(circle, #242424 0%, #1a1a1a 40%, #0a0a0a 100%)",
                            boxShadow: "inset 0 0 20px rgba(255,255,255,0.03)",
                          }}
                        >
                          {/* Grooves */}
                          <div className="absolute inset-[15%] rounded-full border border-white/5 pointer-events-none"></div>
                          <div className="absolute inset-[25%] rounded-full border border-white/5 pointer-events-none"></div>
                          <div className="absolute inset-[35%] rounded-full border border-white/5 pointer-events-none"></div>
                          <div className="absolute inset-[45%] rounded-full border border-white/5 pointer-events-none"></div>

                          {/* Spinning Light Reflection */}
                          <div 
                            className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
                            style={{
                              background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.15) 30deg, transparent 60deg, transparent 180deg, rgba(255,255,255,0.15) 210deg, transparent 240deg)"
                            }}
                          ></div>

                          {/* Record Label - Bright Cyan */}
                          <div className="w-[30%] h-[30%] max-w-[64px] max-h-[64px] rounded-full bg-[#29b6f6] flex items-center justify-center relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]">
                            {/* Spindle */}
                            <div className="absolute w-[3px] h-[3px] md:w-[10px] md:h-[10px] rounded-full bg-[#fcfbfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Music Metadata */}
                    <div className="text-center w-full mt-auto mb-[8px] md:mb-[20px] px-1">
                      <p className="text-[5px] sm:text-[7px] md:text-[12px] text-[#788591] font-sans tracking-[1px] md:tracking-[2px] mb-[2px] md:mb-[6px]">
                        {formatTime(currentTime)}
                      </p>
                      <h4 className="font-display italic text-[#3e3a35] text-[9px] sm:text-[12px] md:text-[20px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        Cinematic Anthem
                      </h4>
                      <p className="text-[6px] sm:text-[8px] md:text-[14px] text-[#8c8881] mt-[2px] md:mt-[4px] whitespace-nowrap overflow-hidden text-ellipsis">Timeless Celebrations</p>
                    </div>

                    {/* Music Controls */}
                    <div className="flex items-center justify-center gap-[4px] md:gap-[14px] w-full pb-[10px] md:pb-[30px]">
                      {/* Previous */}
                      <button
                        onClick={togglePlay}
                        className="w-[18px] h-[18px] md:w-[42px] md:h-[42px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                        aria-label="Previous track"
                      >
                        <svg className="w-[8px] h-[8px] md:w-3.5 md:h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                      </button>

                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="w-[22px] h-[22px] md:w-[50px] md:h-[50px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg className="w-[10px] h-[10px] md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 19h3V5H8v14zm5-14v14h3V5h-3z" />
                          </svg>
                        ) : (
                          <svg className="w-[12px] h-[12px] md:w-5 md:h-5 fill-current ml-[1px] md:ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Next */}
                      <button
                        onClick={togglePlay}
                        className="w-[18px] h-[18px] md:w-[42px] md:h-[42px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                        aria-label="Next track"
                      >
                        <svg className="w-[8px] h-[8px] md:w-3.5 md:h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Reveal>

                {/* RIGHT COUPLE IMAGE */}
                <Reveal delay={0.24} className="w-full">
                  <Link
                    to="/photography/$slug"
                    params={{ slug: stories[2].slug }}
                    className="hover-lift block group w-full"
                  >
                    <div
                      className="overflow-hidden rounded-[8px] md:rounded-[20px] bg-muted w-full aspect-[3/4] md:aspect-auto md:h-[455px]"
                      style={{ boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
                    >
                      <img
                        src={stories[2].cover}
                        alt={stories[2].couple}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* TEXT & ORNAMENT */}
                    <div className="mt-[12px] md:mt-[28px] text-center w-full px-1">
                      <div className="flex items-center justify-center gap-[4px] md:gap-[10px] text-[5px] sm:text-[7px] md:text-[12px] tracking-[1px] md:tracking-[2px] uppercase text-[#8b867c] font-sans">
                        <span className="font-light">→</span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">Forever Begins</span>
                        <span className="font-light">←</span>
                      </div>
                      <h3 className="font-display text-[10px] sm:text-[12px] md:text-[22px] font-normal text-[#2d2c2a] mt-[4px] md:mt-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {stories[2].couple}
                      </h3>
                      <div className="flex justify-center mt-[8px] md:mt-[20px] text-[#d1cbbd]">
                        {/* Tiny Ornament */}
                        <svg
                          width="60"
                          height="15"
                          viewBox="0 0 60 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[20px] md:w-[60px] h-auto"
                        >
                          <path
                            d="M30 2 L33 7.5 L30 13 L27 7.5 Z"
                            fill="currentColor"
                            opacity="0.8"
                          />
                          <path
                            d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5"
                            fill="currentColor"
                            opacity="0.5"
                          />
                          <path
                            d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5"
                            fill="currentColor"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>

          {/* STORY TIMELINE */}
          <StoryTimeline />

          {/* INSTAGRAM GALLERY */}
          <InstagramGallery />

          {/* CLOSING CTA - WHATSAPP SECTION */}
          <section className="w-full bg-background border-t-[1px] border-[#d1cbbd]/30 py-[clamp(3rem,6vw,5rem)] px-[clamp(1rem,4vw,3rem)] flex justify-center">
            <Reveal className="w-full max-w-[900px]">
              <div className="relative w-full flex flex-col items-center text-center">

                {/* Elegant Ornament */}
                <div className="mb-[clamp(1rem,3vw,2rem)] text-[#c4a97d]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L13.5 10.5L23 12L13.5 13.5L12 23L10.5 13.5L1 12L10.5 10.5L12 1Z" fill="currentColor" opacity="0.8" />
                  </svg>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-sans text-[clamp(11px,1.2vw,13px)] tracking-[0.3em] uppercase text-[#8b867c] mb-[clamp(0.25rem,1vw,0.75rem)]">
                    Tell us the dates.
                  </span>
                  <h2 className="font-display italic font-light text-[clamp(28px,5vw,48px)] text-[#2d2c2a] leading-[1.15] max-w-[600px]">
                    We'll tell you what's possible.
                  </h2>
                </div>

                <div className="flex items-center justify-center w-full max-w-[180px] mt-[clamp(1.25rem,3vw,2rem)] mb-[clamp(1.5rem,4vw,2.5rem)] text-[#d1cbbd]/50">
                  <span className="h-[1px] w-full bg-current"></span>
                  <div className="w-[4px] h-[4px] rotate-45 bg-[#c4a97d] mx-4 shrink-0"></div>
                  <span className="h-[1px] w-full bg-current"></span>
                </div>

                {/* Dark Rectangle WhatsApp Button */}
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center bg-[#1c1c1c] px-[clamp(2rem,4vw,3.5rem)] py-[clamp(1rem,2vw,1.25rem)] transition-all duration-500 hover:bg-[#333] w-max rounded-sm shadow-md"
                >
                  <span className="font-sans text-[clamp(10px,1.1vw,12px)] uppercase tracking-[0.25em] text-white transition-colors duration-500">
                    Enquire on WhatsApp
                  </span>
                </a>
              </div>
            </Reveal>
          </section>

        </div>
      </div>
    </>
  );
}
