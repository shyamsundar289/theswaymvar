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
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-5 py-4 transition-all duration-500 hover:border-[#666] w-full md:w-max min-w-0 md:min-w-[260px]"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e0dcd0]">
                  Let's Create Your Story
                </span>
                <span className="text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>

            {/* COLUMN 2 — EXPLORE */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#8b867c] mb-6 md:mb-8">
                Explore
              </h3>
              <ul className="flex flex-col gap-4">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.1em] text-[#e0dcd0] transition-colors hover:text-[#c4a97d]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — STUDIO */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#8b867c] mb-6 md:mb-8">
                Studio
              </h3>
              <div className="flex flex-col gap-6 font-sans text-[13px] md:text-[14px] uppercase tracking-[0.1em] text-[#e0dcd0]">
                <div>
                  <p className="mb-1 text-[#8b867c] text-[10px] tracking-[0.2em]">Address</p>
                  <p className="leading-relaxed">
                    The Swayamvar Studio<br />
                    Bikaner, Rajasthan<br />
                    India
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[#8b867c] text-[10px] tracking-[0.2em]">Phone</p>
                  <a href="tel:+918949422388" className="transition-colors hover:text-[#c4a97d]">
                    +91 89494 22388
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-[#8b867c] text-[10px] tracking-[0.2em]">Email</p>
                  <a href="mailto:hello@theswayamvar.com" className="transition-colors hover:text-[#c4a97d] lowercase normal-case tracking-normal text-[15px]">
                    hello@theswayamvar.com
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-[#8b867c] text-[10px] tracking-[0.2em]">Instagram</p>
                  <a href="https://www.instagram.com/theswaymvar" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#c4a97d] lowercase normal-case tracking-normal text-[15px]">
                    @theswaymvar
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 4 — FIND US */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#8b867c] mb-6 md:mb-8">
                Find Us
              </h3>
              <div className="w-full aspect-[4/3] bg-[#222] mb-6 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112708.20330685601!2d73.23886576882205!3d28.014264663044955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fdd7ef7bf2a71%3A0x73295c527022138!2sBikaner%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                  title="The Swayamvar Studio Location"
                ></iframe>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-5 py-4 transition-all duration-500 hover:border-[#666] w-full md:w-max min-w-0 md:min-w-[260px]"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e0dcd0]">
                  View In Google Maps
                </span>
                <span className="text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-2">
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