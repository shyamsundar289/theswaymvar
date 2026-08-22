import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

import { images } from "@/data/images";
import { recognition, stories } from "@/data/site";

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
const swaymwarLogo = "/images/swamyvar_logo.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "theswaymvar — Cinematic Wedding Photography & Films" },
      {
        name: "description",
        content:
          "A wedding photography and film studio making quiet, cinematic records of celebrations across India and worldwide. By enquiry only.",
      },
      {
        property: "og:title",
        content: "theswaymvar — Cinematic Wedding Photography & Films",
      },
      {
        property: "og:description",
        content: "Quiet, cinematic wedding photography and films. India and worldwide.",
      },
    ],
  }),
  component: Home,
});



/* =========================================================
   HOME
========================================================= */
function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed:", e));
    }
  };

  // Pause audio when unmounting
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/cinematic-wedding.mp3" loop preload="auto" onTimeUpdate={handleTimeUpdate} />
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
          <p className="label-xs text-bronze tracking-[2px] uppercase text-[12px]">The Studio</p>
          <h4 className="font-display font-normal mt-6 text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[#2d2c2a] mx-auto max-w-[700px]">
            An intimate studio dedicated to the <span className="italic text-[#8b867c] font-light">art of noticing.</span>
          </h4>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[17px] mx-auto">
            theswaymvar was built around a simple preference: that a wedding
            should be recorded, not directed. We arrive early, learn the names,
            and then spend the day out of the way — waiting for the things that
            only happen once.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[17px] mx-auto">
            The result is a body of work that looks like your family rather than
            a catalogue.
          </p>
          <Link
            to="/photography"
            className="label-xs story-link mt-10 inline-block text-foreground mx-auto"
          >
            See the work
          </Link>
        </Reveal>
      </section>

      {/* SWAYMVAR LOGO */}
      <section className="w-full flex justify-center section-y bg-background overflow-hidden relative">
        <Reveal>
          <div className="w-full max-w-[800px] mx-auto flex justify-center relative px-4">
            <img 
              src={swaymwarLogo} 
              alt="The Swayamvar Logo" 
              className="w-full h-auto max-w-[200px] md:max-w-[300px] object-contain drop-shadow-sm"
            />
          </div>
        </Reveal>
      </section>

      {/* EDITORIAL COLLAGE */}
      <EditorialCollage />

      {/* NEW: VIDEO SHOWCASE SECTION */}
      <VideoShowcaseSection />


      {/* CINEMATIC BREAK */}
      <DiagonalBreak
        image="/images/parallax-bg.jpg"
      />


      {/* FEATURED WORK */}
      <section className="w-full max-w-[1440px] mx-auto bg-[#f7f4ee] py-[40px] md:py-[55px] pb-[60px] md:pb-[70px] px-[5vw] lg:px-[7vw]">
        <div className="max-w-[1290px] mx-auto text-center">
          <Reveal>
            {/* TOP SMALL LABELS */}
            <div className="flex items-center justify-center gap-4 text-[13px] tracking-[2.5px] text-[#8b867c] uppercase">
              <span>Capturing Moments</span>
              {/* Floral ornament */}
              <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 text-[#d0c5a8]">
                <path d="M50 5C50 5 48 12 40 15C48 18 50 25 50 25C50 25 52 18 60 15C52 12 50 5 50 5Z" fill="currentColor" opacity="0.8"/>
                <path d="M40 15 Q30 5 20 15 Q30 25 40 15" fill="currentColor" opacity="0.6"/>
                <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="currentColor" opacity="0.6"/>
              </svg>
              <span>Crafting Memories</span>
            </div>
            
            {/* MAIN HEADING */}
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] text-center mt-[35px] max-w-[900px] mx-auto">
              Your Story, <span className="italic font-light text-[#8b867c]">Our Lens</span>
            </h2>
            
            {/* ORNAMENT UNDER HEADING */}
            <div className="flex items-center justify-center mt-[25px] text-[#c1b599]">
              <span className="w-[60px] md:w-[70px] h-[1px] bg-[#d1cbbd]"></span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-4">
                <path d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17L5.5 22L8 14.5L2 9.5H9.5L12 2Z" fill="currentColor" />
              </svg>
              <span className="w-[60px] md:w-[70px] h-[1px] bg-[#d1cbbd]"></span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-[#5D5A55] text-[17px] md:text-[19px] font-normal tracking-[0.2px] text-center max-w-[800px] mx-auto mt-[18px]">
              Every love story is unique. We're here to capture yours in the most timeless way.
            </p>
          </Reveal>
        </div>

        {/* MAIN 3-COLUMN LAYOUT */}
        <div className="mx-auto mt-[38px] w-full max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr_1fr] gap-[28px] items-start w-full">

            {/* LEFT COUPLE IMAGE */}
            <Reveal delay={0.08} className="w-full">
              <Link to="/photography/$slug" params={{ slug: stories[0].slug }} className="hover-lift block group w-full">
                <div 
                  className="overflow-hidden rounded-[20px] bg-muted w-full h-[455px]" 
                  style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
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
                <div className="mt-[28px] text-center w-full">
                  <div className="flex items-center justify-center gap-[10px] text-[12px] tracking-[2px] uppercase text-[#8b867c] font-sans">
                    <span className="font-light">→</span>
                    <span>A Story of Us</span>
                    <span className="font-light">←</span>
                  </div>
                  <h3 className="font-display text-[20px] md:text-[22px] font-normal text-[#2d2c2a] mt-[12px]">
                    {stories[0].couple}
                  </h3>
                  <div className="flex justify-center mt-[20px] text-[#d1cbbd]">
                     {/* Tiny Ornament */}
                     <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 2 L33 7.5 L30 13 L27 7.5 Z" fill="currentColor" opacity="0.8"/>
                        <path d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5" fill="currentColor" opacity="0.5"/>
                        <path d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5" fill="currentColor" opacity="0.5"/>
                     </svg>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* CENTER INTERACTIVE MUSIC CARD */}
            <Reveal delay={0.16} className="w-full z-10 mt-[8px]">
              <div 
                className="relative w-full min-h-[500px] md:h-[500px] bg-[#fcfbfa] rounded-[28px] flex flex-col items-center justify-between select-none"
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 20px 35px rgba(0,0,0,0.10)'
                }}
              >
                {/* Turntable */}
                <div className="relative w-full flex items-start justify-center mt-[45px]">
                  
                  {/* Tonearm (Starts upper-left, curves downward) */}
                  <div className="absolute left-[5%] md:left-[8%] top-[-10%] z-20 pointer-events-none">
                    <svg className={`w-[85px] h-[150px] transition-transform duration-700 origin-[24px_24px] ${isPlaying ? 'rotate-[0deg]' : 'rotate-[15deg]'}`} viewBox="0 0 90 160" fill="none">
                      {/* Pivot at top left */}
                      <circle cx="24" cy="24" r="14" stroke="#b0aba1" strokeWidth="1.5" fill="none" />
                      <circle cx="24" cy="24" r="4" fill="#b0aba1" />
                      {/* Arm dropping down and curving right */}
                      <path d="M24 38 L24 115 Q24 135 45 135 L65 135" stroke="#b0aba1" strokeWidth="1.5" fill="none" />
                      {/* Headshell */}
                      <rect x="65" y="130" width="8" height="18" rx="2" stroke="#b0aba1" strokeWidth="1.5" fill="none" />
                      <line x1="69" y1="132" x2="69" y2="146" stroke="#b0aba1" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Vinyl Record */}
                  <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                    <div className={`w-full h-full rounded-full bg-[#1c1c1c] flex items-center justify-center relative overflow-hidden transition-transform ${isPlaying ? 'animate-spin' : ''}`}
                         style={{
                           animationDuration: '3s',
                           animationTimingFunction: 'linear',
                           background: 'radial-gradient(circle, #242424 0%, #1a1a1a 40%, #0a0a0a 100%)',
                           boxShadow: 'inset 0 0 20px rgba(255,255,255,0.03), 0 10px 20px rgba(0,0,0,0.4)'
                         }}>
                      
                      {/* Grooves */}
                      <div className="absolute inset-[15%] rounded-full border border-white/5 pointer-events-none"></div>
                      <div className="absolute inset-[25%] rounded-full border border-white/5 pointer-events-none"></div>
                      <div className="absolute inset-[35%] rounded-full border border-white/5 pointer-events-none"></div>
                      <div className="absolute inset-[45%] rounded-full border border-white/5 pointer-events-none"></div>

                      {/* Record Label - Bright Cyan */}
                      <div className="w-[56px] h-[56px] rounded-full bg-[#29b6f6] flex items-center justify-center relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]">
                        {/* Spindle */}
                        <div className="absolute w-[10px] h-[10px] rounded-full bg-[#fcfbfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Music Metadata */}
                <div className="text-center w-full mt-auto mb-[20px]">
                  <p className="text-[12px] text-[#788591] font-sans tracking-[2px] mb-[6px]">{formatTime(currentTime)}</p>
                  <h4 className="font-display italic text-[#3e3a35] text-[20px] leading-tight">Cinematic Anthem</h4>
                  <p className="text-[14px] text-[#8c8881] mt-[4px]">Timeless Celebrations</p>
                </div>

                {/* Music Controls */}
                <div className="flex items-center justify-center gap-[14px] w-full pb-[30px]">
                  {/* Previous */}
                  <button 
                    onClick={togglePlay}
                    className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                    style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                    aria-label="Previous track"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                  </button>
                  
                  {/* Play/Pause */}
                  <button 
                    onClick={togglePlay}
                    className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                    style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 19h3V5H8v14zm5-14v14h3V5h-3z"/></svg>
                    ) : (
                      <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>

                  {/* Next */}
                  <button 
                    onClick={togglePlay}
                    className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#2d2c2a] hover:scale-105 active:scale-95 transition"
                    style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                    aria-label="Next track"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* RIGHT COUPLE IMAGE */}
            <Reveal delay={0.24} className="w-full">
              <Link to="/photography/$slug" params={{ slug: stories[2].slug }} className="hover-lift block group w-full">
                <div 
                  className="overflow-hidden rounded-[20px] bg-muted w-full h-[455px]" 
                  style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
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
                <div className="mt-[28px] text-center w-full">
                  <div className="flex items-center justify-center gap-[10px] text-[12px] tracking-[2px] uppercase text-[#8b867c] font-sans">
                    <span className="font-light">→</span>
                    <span>Forever Begins Here</span>
                    <span className="font-light">←</span>
                  </div>
                  <h3 className="font-display text-[20px] md:text-[22px] font-normal text-[#2d2c2a] mt-[12px]">
                    {stories[2].couple}
                  </h3>
                  <div className="flex justify-center mt-[20px] text-[#d1cbbd]">
                     {/* Tiny Ornament */}
                     <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 2 L33 7.5 L30 13 L27 7.5 Z" fill="currentColor" opacity="0.8"/>
                        <path d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5" fill="currentColor" opacity="0.5"/>
                        <path d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5" fill="currentColor" opacity="0.5"/>
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

      {/* RECOGNITION */}
      <section className="border-t border-border/60">
        <div className="shell section-y">
          <p className="label-xs text-center text-muted-foreground">Recognition</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-8">
            {recognition.map((r, i) => (
              <Laurel key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="shell py-20 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display font-light mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            Tell us the dates. We'll tell you what's possible.
          </h2>
          <div className="mt-10">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
      </section>


      </div>
      </div>
    </>
  );
}