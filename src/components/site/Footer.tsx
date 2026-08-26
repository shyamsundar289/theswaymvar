import { Link } from "@tanstack/react-router";
import { nav, waLink } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";

export function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#111111] text-[#f4f0e6] pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(1.5rem,3vw,2rem)] overflow-hidden box-border">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(12px,3vw,48px)]">
        <Reveal>
          {/* 
            Proportional 4-column grid. 
            Approximates the desktop widths: 
            Promise (1.25fr), Explore (0.75fr), Studio (1.25fr), Find Us (1fr)
          */}
          <div
            className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,1.2fr)_minmax(0,1.1fr)] mb-[clamp(2rem,5vw,4rem)] w-full gap-y-[clamp(2rem,5vw,4rem)] gap-x-[clamp(8px,2vw,40px)]"
          >
            {/* COLUMN 1 — OUR PROMISE */}
            <div className="flex flex-col w-full min-w-0">
              <h3 className="font-sans text-[clamp(7px,1vw,11px)] uppercase tracking-[0.2em] text-[#c4a97d] mb-[clamp(0.75rem,1.5vw,2rem)] whitespace-nowrap">
                Our Promise
              </h3>
              <h2 className="font-display text-[clamp(11px,1.9vw,2rem)] leading-[1.2] font-normal mb-[clamp(1rem,3vw,2.5rem)] pr-[2px] md:pr-2">
                We take a limited<br />
                number of weddings<br />
                each year.
              </h2>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-[clamp(12px,1.5vw,20px)] py-[clamp(6px,1vw,12px)] transition-all duration-500 hover:border-[#666] w-max max-w-full gap-[clamp(8px,1.5vw,20px)]"
              >
                <span className="font-sans text-[clamp(7.5px,1vw,10px)] uppercase tracking-[0.15em] text-[#e0dcd0] whitespace-nowrap overflow-hidden text-ellipsis">
                  Create
                </span>
                <span className="text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-1 md:group-hover:translate-x-2 text-[clamp(10px,1.5vw,16px)] shrink-0">
                  →
                </span>
              </a>
            </div>

            {/* COLUMN 2 — EXPLORE */}
            <div className="flex flex-col w-full min-w-0">
              <h3 className="font-sans text-[clamp(7px,1vw,11px)] uppercase tracking-[0.2em] text-[#8b867c] mb-[clamp(0.75rem,1.5vw,2rem)] whitespace-nowrap">
                Explore
              </h3>
              <ul className="flex flex-col gap-[clamp(4px,1vw,16px)]">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-sans text-[clamp(7px,1.2vw,14px)] uppercase tracking-[0.1em] text-[#e0dcd0] transition-colors hover:text-[#c4a97d] block break-words"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — STUDIO */}
            <div className="flex flex-col w-full min-w-0">
              <h3 className="font-sans text-[clamp(7px,1vw,11px)] uppercase tracking-[0.2em] text-[#8b867c] mb-[clamp(0.75rem,1.5vw,2rem)] whitespace-nowrap">
                Studio
              </h3>
              <div className="flex flex-col gap-[clamp(0.5rem,1.5vw,1.5rem)] font-sans text-[clamp(7px,1.2vw,14px)] uppercase tracking-[0.1em] text-[#e0dcd0]">
                <div>
                  <p className="mb-[clamp(2px,0.5vw,4px)] text-[#8b867c] text-[clamp(6px,0.8vw,10px)] tracking-[0.2em] break-words">
                    Address
                  </p>
                  <p className="leading-[1.4] md:leading-[1.6] break-words">
                    Shop - 101, Shanti Nath Empire
                    <br />
                    GS Road, Bikaner (Raj.)
                    <br />
                    334001
                  </p>
                </div>
                <div>
                  <p className="mb-[clamp(2px,0.5vw,4px)] text-[#8b867c] text-[clamp(6px,0.8vw,10px)] tracking-[0.2em] break-words">
                    Phone
                  </p>
                  <a
                    href="tel:+918049422388"
                    className="transition-colors hover:text-[#c4a97d] block break-words"
                  >
                    +91 80494 22388
                  </a>
                </div>
                <div>
                  <p className="mb-[clamp(2px,0.5vw,4px)] text-[#8b867c] text-[clamp(6px,0.8vw,10px)] tracking-[0.2em] break-words">
                    Email
                  </p>
                  <a
                    href="mailto:theswaymvar@gmail.com"
                    className="transition-colors hover:text-[#c4a97d] lowercase normal-case tracking-normal text-[clamp(7.5px,1.3vw,15px)] block break-all"
                  >
                    theswaymvar@gmail.com
                  </a>
                </div>
                <div>
                  <p className="mb-[clamp(2px,0.5vw,4px)] text-[#8b867c] text-[clamp(6px,0.8vw,10px)] tracking-[0.2em] break-words">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/theswaymvar"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[#c4a97d] lowercase normal-case tracking-normal text-[clamp(7.5px,1.3vw,15px)] block break-all"
                  >
                    @theswaymvar
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 4 — FIND US */}
            <div className="flex flex-col w-full min-w-0">
              <h3 className="font-sans text-[clamp(7px,1vw,11px)] uppercase tracking-[0.2em] text-[#8b867c] mb-[clamp(0.75rem,1.5vw,2rem)] whitespace-nowrap">
                Find Us
              </h3>
              <div className="w-full aspect-[4/3] bg-[#222] mb-[clamp(0.75rem,1.5vw,1.5rem)] rounded-[2px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112708.20330685601!2d73.23886576882205!3d28.014264663044955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fdd7ef7bf2a71%3A0x73295c527022138!2sBikaner%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700 w-full h-full object-cover block"
                  title="The Swayamvar Studio Location"
                ></iframe>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-[clamp(4px,1.5vw,20px)] py-[clamp(6px,1.5vw,16px)] transition-all duration-500 hover:border-[#666] w-full"
              >
                <span className="font-sans text-[clamp(6.5px,1vw,10px)] uppercase tracking-[0.15em] text-[#e0dcd0] whitespace-nowrap overflow-hidden text-ellipsis">
                  View In Google Maps
                </span>
                <span className="text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-1 md:group-hover:translate-x-2 ml-1 md:ml-4 text-[clamp(9px,1.5vw,16px)] shrink-0">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="w-full border-t border-[#2a2a2a] pt-[clamp(0.75rem,2vw,1.5rem)] flex flex-col items-center justify-center gap-4">
            <div className="font-sans text-[clamp(7.5px,1vw,10px)] uppercase tracking-[0.2em] text-[#8b867c] text-center px-2 md:px-4 whitespace-nowrap">
              © {new Date().getFullYear()} THE SWAYMVAR. ALL RIGHTS RESERVED.
            </div>
            
            <div className="max-w-4xl font-sans text-[clamp(8px,1vw,12px)] leading-relaxed text-[#666666] text-center px-4 md:px-8">
              The Swaymvar is a wedding photography and cinematic wedding films studio based in Bikaner, Rajasthan, India, documenting weddings through photography, videography and visual storytelling across Rajasthan and destination wedding locations.
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
