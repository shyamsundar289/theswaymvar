import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

export function EditorialCollage() {
  const tiles = [
    { type: 'img', span: 'col-span-2 row-span-2', aspect: '1/1', src: images.premium.cover, alt: 'Bridal portrait' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: images.moments[3], alt: 'Candid moment' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.moments[0], alt: 'Wedding details' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.story.opener, alt: 'Documentary moment' },
    { type: 'img', span: 'col-span-2 row-span-2', aspect: '1/1', src: '/images/4.webp', alt: 'Venue architecture' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: images.moments[5], alt: 'Celebration moment' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.approach.inset, alt: 'Groom portrait' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: '/images/Recent01.webp', alt: 'Couple portrait' },
    
    // CENTER TEXT CARD
    { type: 'text', span: 'col-span-2 row-span-2', aspect: '1/1' },
    
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: images.moments[2], alt: 'Intimate portrait' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: '/images/DSCF0463 copy.webp', alt: 'Wedding decor detail' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.moments[6], alt: 'Candid celebration' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: '/images/Recent03.webp', alt: 'Couple portrait' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: '/images/6.webp', alt: 'Jewelry details' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.moments[4], alt: 'Emotional family moment' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: '/images/5.webp', alt: 'Scenic couple portrait' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: images.hero.primary, alt: 'Bridal portrait' },
    { type: 'img', span: 'col-span-1 row-span-2', aspect: '1/2', src: '/images/Recent02.webp', alt: 'Groom details' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.break.cinematic, alt: 'Cinematic break' },
    { type: 'img', span: 'col-span-1 row-span-1', aspect: '1/1', src: images.moments[7], alt: 'Emotional moment' },
  ];

  return (
    <section className="w-full bg-background overflow-hidden relative">
      <Reveal className="w-full">
        {/* DENSE EDITORIAL GRID (Zero Gaps, Strict Alignment) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-row-dense gap-0 w-full max-w-[2000px] mx-auto">
          {tiles.map((tile, index) => {
            if (tile.type === 'text') {
              return (
                <div 
                  key={`text-${index}`} 
                  className={`${tile.span} relative w-full h-full overflow-hidden p-0 m-0 border-0 bg-[#F6F4EE] flex flex-col justify-center items-center text-center shadow-[inset_0_0_40px_rgba(0,0,0,0.015)]`}
                  style={{ aspectRatio: tile.aspect }}
                >
                  <div className="flex flex-col items-center justify-center p-4">
                    {/* Quiet Brand Credit */}
                    <a 
                      href="/little-snap"
                      className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#8b867c] mb-6 md:mb-8 transition-colors hover:text-[#2d2c2a] cursor-pointer"
                    >
                      @little_snap__
                    </a>
                    
                    {/* Editorial Mark Quote */}
                    <div className="font-display text-[#2d2c2a] flex flex-col items-center leading-[0.95]">
                      <span className="text-[14px] md:text-[18px] tracking-[0.1em] font-medium uppercase mb-1">Every</span>
                      <span className="text-[32px] md:text-[46px] tracking-tight italic mb-3">frame</span>
                      <span className="text-[14px] md:text-[18px] tracking-[0.1em] font-medium uppercase mb-2">holds a</span>
                      <span className="text-[36px] md:text-[52px] tracking-tight italic">memory.</span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={`img-${index}`} 
                className={`${tile.span} relative w-full h-full overflow-hidden group p-0 m-0 border-0 bg-muted`}
                style={{ aspectRatio: tile.aspect }}
              >
                <img 
                  src={tile.src} 
                  alt={tile.alt} 
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" 
                  loading="lazy" 
                />
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
