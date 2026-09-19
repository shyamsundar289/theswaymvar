import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: getSeoMetadata(
      "Wedding Photography & Videography Services | The Swaymvar",
      "Explore the candid wedding photography, cinematic wedding films, and videography services offered by The Swaymvar in Bikaner, Rajasthan.",
      "/services",
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: YourMemoriesPage,
});

import { Header } from "@/components/site/Header";

function YourMemoriesPage() {
  const typographicCards = [
    { couple: "Chanchal & Harshit" },
    { couple: "Khushboo & Chhatrapal" },
    { couple: "Bhawana & Abhishek" },
    { couple: "Rajishree & Nitin" },
    { couple: "Khushbu & Jay" },
  ];

  return (
    <div className="relative bg-background text-foreground min-h-[100svh] flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <div className="sticky top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] overflow-hidden z-0">
        <Header />
        <img
          src={images.hero.primary}
          alt="Your Memories Hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 2. MAIN SECTION */}
      <section className="bg-background pt-10 md:pt-16 pb-24 relative z-10 w-full">
        {/* Editorial Header Section */}
        <div className="shell flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center w-full">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] max-w-3xl mb-6">
              Echoes of laughter,{" "}
              <span className="italic font-light text-[#8b867c]">kept for a lifetime.</span>
            </h2>
            <p className="text-[#5D5A55] text-[16px] md:text-[18px] font-normal tracking-[0.2px] max-w-2xl mx-auto mb-10 md:mb-14">
              A visual journal of raw emotions and untold stories. Every name carries a beautiful, unscripted moment that makes you who you are.
            </p>
          </Reveal>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-[5vw] lg:px-[7vw]">
          <Reveal delay={0.1}>
            <div className="w-full h-[1px] bg-[#e4e0d7] mb-8 md:mb-16"></div>
          </Reveal>

          {/* Typographic Grid - 5 COLUMNS */}
          <Reveal delay={0.2} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
              {typographicCards.map((item, idx) => (
                <div key={idx} className="w-full flex flex-col group items-center">
                  {/* TYPOGRAPHIC CARD */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden rounded-[24px] bg-[#FAF8F4] border border-[#e8e4dc] flex flex-col items-center justify-center p-6 text-center transition-all duration-700 hover:bg-[#f5f1e8] hover:border-[#c4a97d]"
                    style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}
                  >
                    
                    <p className="font-sans text-[9px] tracking-[3px] uppercase text-[#8b867c] mb-6">
                      A Story Of
                    </p>
                    
                    <h3 className="font-display text-[20px] md:text-[24px] font-normal text-[#2d2c2a] leading-[1.2] transition-transform duration-700 group-hover:scale-105">
                      {item.couple.split(' & ')[0]} <br />
                      <span className="text-[#c4a97d] italic font-light font-serif my-2 block">&</span>
                      {item.couple.split(' & ')[1] || item.couple}
                    </h3>

                    <div className="absolute inset-0 border-[1px] border-transparent transition-colors duration-700 m-2 group-hover:border-[#e8e4dc]/50 pointer-events-none rounded-[20px]"></div>
                  </div>

                  {/* TEXT & REDIRECT ('view more') */}
                  <div className="mt-5 text-center w-full">
                    <Link
                      to="/photography"
                      className="text-[10px] tracking-[2px] uppercase text-[#8b867c] font-sans hover:text-[#2d2c2a] transition-colors inline-block"
                    >
                      <span className="border-b border-[#e4e0d7] hover:border-[#2d2c2a] pb-[2px] transition-all duration-300">
                        View Memories
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
