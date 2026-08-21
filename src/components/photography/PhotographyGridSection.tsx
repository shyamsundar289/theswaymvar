import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

export function PhotographyGridSection() {
  const photoGrid = [
    { src: images.moments[0], couple: "Meher & Arjun" },
    { src: images.moments[1], couple: "Ira & Vikram" },
    { src: images.moments[2], couple: "Naina & Rohan" },
    { src: images.moments[3], couple: "Saira & Dev" },
    { src: images.moments[4], couple: "Tara & Kabir" },
    { src: images.moments[5], couple: "Anya & Jai" },
    { src: images.moments[6], couple: "Zara & Ahaan" },
    { src: images.moments[7], couple: "Rhea & Sameer" },
    { src: "/images/Recent01.webp", couple: "Ananya & Kunal" },
    { src: "/images/Recent02.webp", couple: "Riya & Aryan" },
    { src: "/images/Recent03.webp", couple: "Myra & Ishaan" },
    { src: images.premium.cover, couple: "Kiara & Advik" }
  ];

  return (
    <section className="bg-background pt-10 md:pt-16 pb-24 relative z-10 w-full">
      {/* Editorial Header Section */}
      <div className="shell flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center w-full">
          {/* Main Heading */}
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] max-w-3xl mb-6">
            Moments frozen in time, <span className="italic font-light text-[#8b867c]">felt forever.</span>
          </h2>

          {/* Supporting text */}
          <p className="text-[#5D5A55] text-[16px] md:text-[18px] font-normal tracking-[0.2px] max-w-2xl mx-auto mb-10 md:mb-14">
            A curated collection of our most cherished photographs. Every frame tells a story of love, family, and the quiet moments in between.
          </p>
        </Reveal>
      </div>

      {/* Grid with Editorial Lines */}
      <div className="w-full max-w-[1440px] mx-auto px-[5vw] lg:px-[7vw]">
        <Reveal delay={0.1}>
          {/* Top Divider */}
          <div className="w-full h-[1px] bg-[#e4e0d7] mb-8 md:mb-16"></div>
        </Reveal>

        {/* Photo Grid */}
        <Reveal delay={0.2} className="w-full">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12 md:gap-y-16">
            {photoGrid.map((item, idx) => (
              <div key={idx} className="w-full flex flex-col group">
                
                {/* PICTURE FRAME (Matched to Home Page) */}
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

                {/* TEXT & ORNAMENT (Matched to Home Page) */}
                <div className="mt-[16px] md:mt-[28px] text-center w-full flex flex-col justify-start flex-grow">
                  <div className="flex items-center justify-center gap-[6px] md:gap-[10px] text-[9px] md:text-[12px] tracking-[1.5px] md:tracking-[2px] uppercase text-[#8b867c] font-sans">
                    <span className="font-light">→</span>
                    <span>A Story of Us</span>
                    <span className="font-light">←</span>
                  </div>
                  <h3 className="font-display text-[15px] md:text-[22px] font-normal text-[#2d2c2a] mt-[8px] md:mt-[12px] px-2 leading-tight min-h-[36px] flex items-center justify-center">
                    {item.couple}
                  </h3>
                  <div className="flex justify-center mt-[8px] md:mt-[20px] text-[#d1cbbd]">
                     {/* Tiny Ornament */}
                     <svg width="40" height="10" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[50px] md:h-[12px]">
                        <path d="M30 2 L33 7.5 L30 13 L27 7.5 Z" fill="currentColor" opacity="0.8"/>
                        <path d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5" fill="currentColor" opacity="0.5"/>
                        <path d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5" fill="currentColor" opacity="0.5"/>
                     </svg>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
