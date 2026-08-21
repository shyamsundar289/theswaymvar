import { createFileRoute } from '@tanstack/react-router';
import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: "Your Memories — theswayamvar" },
      {
        name: "description",
        content: "A curated collection of our most cherished photographs.",
      },
    ],
  }),
  component: YourMemoriesPage,
});

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
    <div className="bg-background text-foreground min-h-[100svh] flex flex-col w-full">
      
      {/* 1. HERO SECTION (Exact height as Photography/Film) */}
      <section className="relative w-full h-[50vh] md:h-[500px] lg:h-[580px] p-0 m-0 overflow-hidden bg-[#1a1a1a]">
        <img 
          src={images.hero.primary} 
          alt="Your Memories Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85" 
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* 2. GRID SECTION (5 Columns) */}
      <section className="bg-background pt-16 md:pt-24 pb-24 relative z-10 w-full">
        {/* Editorial Header Section */}
        <div className="shell flex flex-col items-center text-center mb-16">
          <Reveal className="flex flex-col items-center w-full">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-[#2d2c2a] w-full max-w-4xl mb-8 pb-4">
              Moments frozen in time, <span className="italic font-light text-[#8b867c]">felt<br/>forever.</span>
            </h2>
            <p className="text-[#5D5A55] text-[16px] md:text-[18px] font-normal leading-[1.6] tracking-[0.2px] max-w-[650px] mx-auto">
              A curated collection of our most cherished photographs. Every frame tells a<br className="hidden md:block"/> story of love, family, and the quiet moments in between.
            </p>
          </Reveal>
        </div>

        <div className="w-full max-w-[1800px] mx-auto px-[5vw] lg:px-[7vw]">
          {/* Photo Grid - 5 COLUMNS */}
          <Reveal delay={0.2} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-12 md:gap-y-16">
              {photoGrid.map((item, idx) => (
                <div key={idx} className="w-full flex flex-col group">
                  
                  {/* EXACT PICTURE FRAME (Matched to Photography Page) */}
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

                  {/* TEXT & MORE MOMENTS LINK */}
                  <div className="mt-[16px] md:mt-[24px] text-center w-full flex flex-col justify-start flex-grow">
                    <h3 className="font-display text-[17px] md:text-[20px] lg:text-[22px] font-normal text-[#2d2c2a] px-2 leading-tight flex items-center justify-center">
                      {item.couple}
                    </h3>
                    <a 
                      href="/photography"
                      className="inline-flex items-center justify-center gap-[6px] md:gap-[8px] mt-[10px] text-[9px] md:text-[10px] tracking-[2px] uppercase text-[#8b867c] font-sans hover:text-[#2d2c2a] transition-colors"
                    >
                      <span className="font-light">→</span>
                      <span className="border-b border-transparent hover:border-[#2d2c2a] pb-[1px] transition-all">More Moments</span>
                      <span className="font-light">←</span>
                    </a>
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