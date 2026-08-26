import { createFileRoute, Link } from '@tanstack/react-router';
import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: getSeoMetadata(
      "Wedding Photography & Videography Services | The Swaymvar",
      "Explore the candid wedding photography, cinematic wedding films, and videography services offered by The Swaymvar in Bikaner, Rajasthan.",
      "/services"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: YourMemoriesPage,
});

import { Header } from "@/components/site/Header";

function YourMemoriesPage() {
  const photoGrid = [
    { src: images.moments[0], couple: "Ananya & Kabir" },
    { src: images.moments[1], couple: "Priya & Siddharth" },
    { src: images.moments[2], couple: "Roshni & Rahul" },
    { src: images.moments[3], couple: "Neha & Aryan" },
    { src: images.moments[4], couple: "Diya & Vedant" },
    
    { src: images.moments[5], couple: "Sneha & Dhruv" },
    { src: images.moments[6], couple: "Kritika & Rohan" },
    { src: images.moments[7], couple: "Aisha & Vihaan" },
    { src: "/images/Recent01.webp", couple: "Mira & Dev" },
    { src: "/images/Recent02.webp", couple: "Tara & Ishaan" }
  ];

  return (
    <div className="relative bg-background text-foreground min-h-[100svh] flex flex-col w-full">
      
      {/* 1. HERO SECTION (Exact structure as FilmStickyIntro but with an image) */}
      <div className="sticky top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] overflow-hidden z-0">
        <Header />
        <img 
          src={images.hero.primary} 
          alt="Your Memories Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85" 
        />
        {/* Cinematic overlay just like Film page */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 2. MAIN SECTION (Matches FilmGridSection exactly) */}
      <section className="bg-background pt-10 md:pt-16 pb-24 relative z-10 w-full">
        {/* Editorial Header Section */}
        <div className="shell flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center w-full">
            {/* Main Heading matched identically to Film Page style */}
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] max-w-3xl mb-6">
              Echoes of laughter, <span className="italic font-light text-[#8b867c]">kept for a lifetime.</span>
            </h2>
            {/* Supporting text */}
            <p className="text-[#5D5A55] text-[16px] md:text-[18px] font-normal tracking-[0.2px] max-w-2xl mx-auto mb-10 md:mb-14">
              A visual journal of raw emotions and untold stories. Every image is a testament to the beautiful, unscripted moments that make you who you are.
            </p>
          </Reveal>
        </div>

        {/* Grid with Editorial Lines */}
        <div className="w-full max-w-[1440px] mx-auto px-[5vw] lg:px-[7vw]">
          <Reveal delay={0.1}>
            {/* Top Divider matching Film Page */}
            <div className="w-full h-[1px] bg-[#e4e0d7] mb-8 md:mb-16"></div>
          </Reveal>

          {/* Photo Grid - 5 COLUMNS */}
          <Reveal delay={0.2} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-12 md:gap-y-16">
              {photoGrid.map((item, idx) => (
                <div key={idx} className="w-full flex flex-col group">
                  
                  {/* PICTURE FRAME */}
                  <div 
                    className="overflow-hidden rounded-[20px] bg-muted w-full aspect-[4/5]" 
                    style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
                  >
                    <img 
                      src={item.src} 
                      alt={item.couple} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* TEXT & REDIRECT ('view more') */}
                  <div className="mt-[20px] text-center w-full flex flex-col justify-start flex-grow">
                    <h3 className="font-display text-[18px] md:text-[20px] font-normal text-[#2d2c2a] leading-tight">
                      {item.couple}
                    </h3>
                    <div className="mt-[8px]">
                      <Link 
                        to="/photography"
                        className="text-[10px] tracking-[2px] uppercase text-[#8b867c] font-sans hover:text-[#2d2c2a] transition-colors inline-block"
                      >
                        <span className="border-b border-transparent hover:border-[#2d2c2a] pb-[1px] transition-all">view more</span>
                      </Link>
                    </div>
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