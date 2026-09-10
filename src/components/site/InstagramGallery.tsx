import { Reveal } from "@/components/site/Reveal";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/theswaymvar/";

const instagramLinks = [
  "https://www.instagram.com/p/CwEf4_eoNi3/",
  "https://www.instagram.com/p/CpQglsYBGwB/",
  "https://www.instagram.com/p/CxuPZ3RLkSa/",
  "https://www.instagram.com/p/Cve9oFdpxuQ/",
  "https://www.instagram.com/p/CMY1y4sln-s/",
  "https://www.instagram.com/p/CMCZUSiFHyb/",
  "https://www.instagram.com/p/DV-z5nCCRPj/",
  "https://www.instagram.com/p/DRW1ZfNErhK/",
  "https://www.instagram.com/p/CoGQObhBlCB/",
  "https://www.instagram.com/p/Cri6yk5pjj5/",
  "https://www.instagram.com/p/C1tuDhpMtMf/",
  "https://www.instagram.com/p/Cv2Bjk5MDtq/",
];

export function InstagramGallery() {
  return (
    <section className="w-full bg-background pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Heading Section */}
        <Reveal className="flex flex-col items-center">
          <h2 className="block text-center font-display font-semibold text-[#5D5A55] text-[32px] md:text-[40px] tracking-[1px]">
            Instagram
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center text-[15px] md:text-[18px] tracking-[2px] text-[#8b867c] hover:text-[#d1cbbd] transition-colors duration-300"
          >
            @theswaymvar
          </a>
        </Reveal>

        {/* 50px bottom spacing as specified */}
        <div className="h-[50px] md:h-[55px] w-full shrink-0" />

        {/* Responsive CSS Grid (Max width exactly 1106px to yield 366.65px per image on desktop) */}
        <Reveal delay={0.1} className="w-full px-[3px] lg:px-0 flex justify-center">
          <div className="w-full max-w-[1106px]">
            <div className="grid grid-cols-3 gap-[3px] w-full">
              {instagramLinks.map((link, idx) => {
                const num = idx + 1;
                return (
                  <a
                    key={num}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square relative w-full bg-muted block group overflow-hidden"
                  >
                    <picture>
                      <source media="(min-width: 768px)" srcSet={`${import.meta.env.BASE_URL}grid-desktop/${num}.png`} />
                      <img
                        src={`${import.meta.env.BASE_URL}grid-mobile/${num}.png`}
                        alt={`Instagram post ${num}`}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />
                    </picture>
                    {/* DESKTOP HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-[#2d2c2a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex flex-col justify-between p-6 z-10 pointer-events-none">
                      <div className="w-full flex justify-end">
                        <Instagram className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
