import { Link } from "@tanstack/react-router";
import { nav, waLink } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#f4f0e6] pt-8 pb-4 md:pt-12">
      <div className="shell max-w-[1440px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-8 md:mb-10">
            {/* COLUMN 1 — OUR PROMISE */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c4a97d] mb-6 md:mb-8">
                Our Promise
              </h3>
              <h2 className="font-display text-[26px] md:text-[32px] leading-[1.2] font-normal mb-8 md:mb-12">
                We take a limited number of weddings each year.
              </h2>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-5 py-4 transition-all duration-500 hover:border-[#666] w-max max-w-full min-w-[260px]"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e0dcd0]">
                  Let's Create Your Story
                </span>
                <span className="ml-4 font-light text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* COLUMN 2 — EXPLORE */}
            <div className="flex flex-col lg:pl-10">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c4a97d] mb-6 md:mb-8">
                Explore
              </h3>
              <ul className="flex flex-col gap-4 md:gap-5">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-sans text-[14px] text-[#e0dcd0] transition-colors duration-300 hover:text-[#c4a97d]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — STUDIO */}
            <div className="flex flex-col lg:-ml-[10px]">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c4a97d] mb-6 md:mb-8">
                Studio
              </h3>
              <ul className="flex flex-col gap-5 md:gap-6 text-[13px] text-[#8b867c]">
                <li className="flex items-start gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="1.5" className="mt-1 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <div className="flex flex-col leading-[1.6]">
                    <span className="text-[#e0dcd0] mb-0.5">The Swayamvar Studio</span>
                    <span>Bikaner,</span>
                    <span>Rajasthan, India</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="1.5" className="shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href="tel:+918949422388" className="text-[#e0dcd0] transition-colors duration-300 hover:text-[#c4a97d]">+91 89494 22388</a>
                </li>
                <li className="flex items-center gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="1.5" className="shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 4l-10 9L2 4" />
                  </svg>
                  <a href="mailto:hello@theswayamvar.com" className="text-[#e0dcd0] transition-colors duration-300 hover:text-[#c4a97d]">hello@theswayamvar.com</a>
                </li>
                <li className="flex items-center gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="1.5" className="shrink-0">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <a href="https://www.instagram.com/theswaymvar" target="_blank" rel="noopener noreferrer" className="text-[#e0dcd0] transition-colors duration-300 hover:text-[#c4a97d]">@theswaymvar</a>
                </li>
              </ul>
            </div>

            {/* COLUMN 4 — FIND US */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c4a97d] mb-6 md:mb-8">
                Find Us
              </h3>
              <div className="relative w-full aspect-video md:aspect-auto md:h-[180px] mb-8 overflow-hidden bg-[#1a1a1a] border border-[#222]">
                <iframe
                  src="https://maps.google.com/maps?q=Bikaner,+Rajasthan,+India&t=m&z=13&output=embed&iwloc=near"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bikaner Studio Location"
                ></iframe>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-5 py-4 transition-all duration-500 hover:border-[#666] w-max max-w-full min-w-[260px]"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e0dcd0]">
                  View In Google Maps
                </span>
                <span className="ml-4 font-light text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="w-full border-t border-[#2a2a2a] pt-4 flex items-center justify-center">
            <div className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#8b867c] text-center">
              © 2026 THE SWAYAMVAR. ALL RIGHTS RESERVED.
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}