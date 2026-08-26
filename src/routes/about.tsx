import { Header } from "@/components/site/Header";
import { assets } from "../assets/asset-manifest";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { images } from "@/data/images";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: getSeoMetadata(
      "About The Swaymvar — Wedding Photographer in Bikaner",
      "Learn about The Swaymvar, a wedding photography and cinematic wedding films studio based in Bikaner, Rajasthan, India.",
      "/about"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [fullImage, setFullImage] = useState<string | null>(null);

  const teamMembers = [
    {
      id: "t1",
      name: "Riya Maru",
      role: "Founder & Filmmaker",
      img: assets.crew.getMemberPhoto(1),
    },
    {
      id: "t2",
      name: "Megha Verma",
      role: "Lead Photographer",
      img: assets.crew.getMemberPhoto(2),
    },
    { id: "t3", name: "Arjun Nair", role: "Cinematographer", img: assets.crew.getMemberPhoto(4) },
    { id: "t4", name: "Karan Malhotra", role: "Editor", img: assets.crew.getMemberPhoto(7) },
  ];

  return (
    <div className="bg-[#FAF8F4] text-foreground min-h-[100svh] selection:bg-[#d1cbbd]/30 overflow-x-hidden">
      {/* SECTION 1 HERO */}
      <section className="relative w-full">
        <Header />
        <div className="pt-[clamp(5rem,10vw,8rem)] pb-[clamp(1rem,2vw,2rem)] px-[5vw] w-full">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center justify-center gap-[clamp(1.5rem,6vw,5rem)]">
          {/* Logo Content */}
          <Reveal className="w-[100px] sm:w-[150px] md:w-[22%] max-w-[200px] shrink-0 flex items-center justify-center">
            <img
              src={assets.svg.logo}
              alt="theswayamvar logo"
              className="w-full h-auto object-contain"
            />
          </Reveal>

          {/* Text Content */}
          <Reveal className="flex flex-col items-center text-center md:w-[65%] max-w-3xl">
            <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] text-[#2d2c2a] leading-[1] tracking-tight mb-3 md:mb-4">
              theswayamvar
            </h1>
            <Ornament className="mb-4" />
            <p className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-5 md:mb-6 opacity-80">
              Cinematic Wedding Films & Photography
            </p>
            <p className="font-sans text-[clamp(0.8rem,4vw,1.0625rem)] text-[#5D5A55] leading-[1.8] max-w-[580px] mx-auto mb-0">
              We are a wedding photography and film studio making quiet, cinematic records of
              celebrations across India and worldwide. We focus on narrative, light, and the honest
              moments you were too busy to notice.
            </p>
          </Reveal>
        </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — WHAT WE DO
          ══════════════════════════════════════════════════════ */}
      <section className="w-full pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(1.5rem,3vw,2rem)] px-[5vw] border-t border-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-[clamp(2rem,4vw,3rem)]">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-3">
              What we do
            </p>
            <Ornament />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-[1fr_1px_1fr] gap-2 sm:gap-6 md:gap-[clamp(2.5rem,4vw,2.5rem)] items-start">
              {/* Wedding Films */}
              <div className="flex flex-col items-center text-center">
                <svg
                  width="80"
                  height="56"
                  viewBox="0 0 100 70"
                  fill="none"
                  className="mb-4 text-[#2d2c2a] md:w-[100px] md:h-[70px]"
                >
                  <rect
                    x="10"
                    y="15"
                    width="55"
                    height="35"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="37"
                    cy="32"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <circle
                    cx="37"
                    cy="32"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <rect
                    x="65"
                    y="20"
                    width="25"
                    height="8"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <line x1="70" y1="15" x2="70" y2="10" stroke="currentColor" strokeWidth="1" />
                  <rect
                    x="66"
                    y="6"
                    width="12"
                    height="9"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect
                    x="15"
                    y="50"
                    width="45"
                    height="4"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
                <h3 className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-[#2d2c2a] mb-2 md:mb-3">
                  Wedding Films
                </h3>
                <p className="font-sans text-[clamp(0.75rem,4vw,0.9375rem)] text-[#5D5A55] leading-[1.7] max-w-[280px]">
                  Cinematic storytelling that captures the emotion, movement and beauty of your day.
                </p>
              </div>

              {/* Vertical divider */}
              <div className="block w-[1px] h-full bg-[#e4e0d7] self-stretch mx-auto" />

              {/* Wedding Photography */}
              <div className="flex flex-col items-center text-center">
                <svg
                  width="72"
                  height="56"
                  viewBox="0 0 90 70"
                  fill="none"
                  className="mb-4 text-[#2d2c2a] md:w-[90px] md:h-[70px]"
                >
                  <rect
                    x="10"
                    y="18"
                    width="70"
                    height="42"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="45"
                    cy="40"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    fill="none"
                  />
                  <circle
                    cx="45"
                    cy="40"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <circle
                    cx="45"
                    cy="40"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    fill="none"
                  />
                  <rect
                    x="25"
                    y="12"
                    width="40"
                    height="6"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="68"
                    cy="26"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <rect
                    x="15"
                    y="22"
                    width="8"
                    height="4"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
                <h3 className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-[#2d2c2a] mb-2 md:mb-3">
                  Wedding Photography
                </h3>
                <p className="font-sans text-[clamp(0.75rem,4vw,0.9375rem)] text-[#5D5A55] leading-[1.7] max-w-[280px]">
                  Timeless images that preserve the real, raw and beautiful moments as they unfold.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — THE PERSON BEHIND THIS
          ══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#EDE8DF] pt-[clamp(2.5rem,6vw,3rem)] pb-[clamp(3.5rem,10vw,6rem)]">
        <div className="max-w-6xl mx-auto px-[5vw] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,6vw,4rem)] items-center lg:items-start">
          {/* Image */}
          <RevealImage
            src={assets.about.person}
            alt="Riya Maru — Founder"
            className="w-full max-w-[400px] mx-auto lg:max-w-none aspect-[4/5] overflow-hidden bg-muted"
          />

          {/* Text */}
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left pt-[clamp(0.5rem,2vw,1.5rem)]">
            <p className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#c4a97d] mb-[clamp(0.5rem,2vw,1rem)]">
              The person behind this
            </p>
            <h2 className="font-display text-[clamp(1.8rem,7vw,3.5rem)] text-[#2d2c2a] leading-[1.1] mb-[clamp(0.5rem,2vw,1rem)]">
              Riya Maru
            </h2>
            <div className="flex items-center gap-0 mb-[clamp(1.25rem,4vw,2rem)]">
              <div className="w-[40px] md:w-[70px] h-[1px] bg-[#c4a97d]" />
              <span className="text-[#c4a97d] text-[8px] mx-[6px]">✦</span>
            </div>
            <div className="space-y-[clamp(0.875rem,3vw,1.25rem)] text-[clamp(0.8rem,4vw,0.9375rem)] text-[#5D5A55] leading-[1.8]">
              <p>
                I started with a borrowed camera and a preference for sitting in the back row. What
                I learned quickly was that the most important moments of a wedding rarely happen on
                stage. They happen in the hallways, in the thirty seconds before walking down the
                aisle, and in the quiet glances exchanged when nobody else is looking.
              </p>
              <p>
                We shifted our focus entirely toward documentary-style filmmaking and photography
                because we realized that directing a couple to pose for a memory completely strips
                the truth out of it. We believe the smallest, most imperfect moments often become
                the most important memories you keep.
              </p>
              <p>
                For us, the greatest privilege is not just being invited to your celebration, but
                being trusted enough to blend in, stay out of the way, and preserve the day exactly
                as it felt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — GROUP PHOTO
          ══════════════════════════════════════════════════════ */}
      <section className="w-full py-[clamp(2.5rem,8vw,5rem)] px-[5vw] border-t border-[#e8e4dc]">
        <div className="max-w-[1440px] mx-auto">
          <Reveal className="w-full aspect-[4/3] sm:aspect-video md:aspect-[21/9] bg-muted relative overflow-hidden rounded-[2px]">
            <img
              src={assets.about.teamPhoto}
              alt="The Swayamvar Team"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — MEET THE TEAM
          ══════════════════════════════════════════════════════ */}
      <section className="w-full py-[clamp(2.5rem,8vw,5rem)] px-[5vw] border-t border-[#e8e4dc]">
        <div className="max-w-[1440px] mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-[clamp(2rem,6vw,3.5rem)]">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-[clamp(0.5rem,2vw,1rem)]">
              Meet the team
            </p>
            <Ornament />
          </Reveal>

          <Reveal delay={0.15} className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,4vw,2rem)] max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  onClick={() => setFullImage(member.img)}
                >
                  <div
                    className="relative overflow-hidden rounded-[16px] md:rounded-[20px] bg-muted w-full aspect-[4/5] mb-[clamp(0.75rem,2vw,1rem)]"
                    style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.06)" }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 md:group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                    />
                  </div>
                  <h4 className="font-display text-[clamp(0.85rem,4vw,1.125rem)] text-[#2d2c2a] tracking-wide mb-[2px]">
                    {member.name}
                  </h4>
                  <p className="font-sans text-[clamp(0.55rem,2.5vw,0.625rem)] tracking-[0.15em] uppercase text-[#8b867c]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — LET'S CONNECT
          ══════════════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-[clamp(2.5rem,8vw,4rem)] pb-[clamp(2rem,6vw,2rem)] px-[5vw]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-[clamp(2rem,6vw,3rem)]">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-[clamp(0.5rem,2vw,1rem)]">
              Let's connect
            </p>
            <h2 className="font-display text-[clamp(1.6rem,7vw,3rem)] text-[#2d2c2a] leading-[1.15] mb-[clamp(1rem,2vw,1.5rem)]">
              We'd Love To Hear From You
            </h2>
            <Ornament />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#d1cbbd] lg:border-none rounded-lg lg:rounded-none overflow-hidden">
              {/* Instagram */}
              <div className="flex flex-col items-center text-center py-[clamp(1.5rem,5vw,2rem)] px-[clamp(1rem,3vw,1.5rem)] border-b lg:border-b-0 lg:border-r border-[#d1cbbd]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2c2a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-[clamp(0.5rem,2vw,1rem)]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#2d2c2a" stroke="none" />
                </svg>
                <h4 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-[clamp(0.5rem,1vw,0.75rem)]">
                  Instagram
                </h4>
                <a
                  href="https://www.instagram.com/theswaymvar"
                  target="_blank"
                  rel="noopener"
                  className="font-sans text-[clamp(0.75rem,3.5vw,0.75rem)] text-[#5D5A55] hover:text-[#c4a97d] transition-colors"
                >
                  @theswaymvar
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center py-[clamp(1.5rem,5vw,2rem)] px-[clamp(1rem,3vw,1.5rem)] border-b lg:border-b-0 lg:border-r border-[#d1cbbd]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2c2a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-[clamp(0.5rem,2vw,1rem)]"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                <h4 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-[clamp(0.5rem,1vw,0.75rem)]">
                  Email
                </h4>
                <a
                  href="mailto:theswaymvar@gmail.com"
                  className="font-sans text-[clamp(0.75rem,3.5vw,0.75rem)] text-[#5D5A55] hover:text-[#c4a97d] transition-colors"
                >
                  theswaymvar@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center py-[clamp(1.5rem,5vw,2rem)] px-[clamp(1rem,3vw,1.5rem)] border-b lg:border-b-0 lg:border-r border-[#d1cbbd]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2c2a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-[clamp(0.5rem,2vw,1rem)]"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <h4 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-[clamp(0.5rem,1vw,0.75rem)]">
                  Phone
                </h4>
                <a
                  href="tel:+918049422388"
                  className="font-sans text-[clamp(0.75rem,3.5vw,0.75rem)] text-[#5D5A55] hover:text-[#c4a97d] transition-colors"
                >
                  +91 80494 22388
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center text-center py-[clamp(1.5rem,5vw,2rem)] px-[clamp(1rem,3vw,1.5rem)] border-b lg:border-b-0 lg:border-r border-[#d1cbbd]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2c2a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-[clamp(0.5rem,2vw,1rem)]"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                <h4 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-[clamp(0.5rem,1vw,0.75rem)]">
                  WhatsApp
                </h4>
                <a
                  href="https://wa.me/918049422388"
                  target="_blank"
                  rel="noopener"
                  className="font-sans text-[clamp(0.75rem,3.5vw,0.75rem)] text-[#5D5A55] hover:text-[#c4a97d] transition-colors"
                >
                  +91 80494 22388
                </a>
              </div>

              {/* Studio */}
              <div className="flex flex-col items-center text-center py-[clamp(1.5rem,5vw,2rem)] px-[clamp(1rem,3vw,1.5rem)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2c2a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-[clamp(0.5rem,2vw,1rem)]"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h4 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#2d2c2a] mb-[clamp(0.5rem,1vw,0.75rem)]">
                  Studio
                </h4>
                <div className="font-sans text-[clamp(0.75rem,3.5vw,0.75rem)] text-[#5D5A55] leading-[1.6]">
                  <p>Shop - 101, Shanti Nath Empire</p>
                  <p>GS Road, Bikaner (Raj.)</p>
                  <p>334001</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-pointer"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white z-10 text-[10px] md:text-xs tracking-widest uppercase font-sans transition-colors">
              Close
            </button>
            <img
              src={fullImage}
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt="Fullscreen preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

