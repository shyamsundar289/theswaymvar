import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

const INSTAGRAM_URL = "https://www.instagram.com/theswaymvar/";

export function InstagramGallery() {
  // Exactly 12 curated luxury wedding images
  const gridImages = [
    { src: images.moments[3], alt: "Intimate bride and groom portrait" },
    { src: images.story.opener, alt: "Wedding venue and architecture" },
    { src: images.moments[7], alt: "Black and white bridal portrait" },
    { src: images.moments[0], alt: "Candid couple lifestyle image" },
    { src: images.moments[5], alt: "Wedding landscape ceremony" },
    { src: images.story.three, alt: "Editorial bridal portrait" },
    { src: images.photo.featuredHero, alt: "Architectural wedding image" },
    { src: images.moments[2], alt: "Intimate black and white couple image" },
    { src: images.photo.featuredRight, alt: "Ornate wedding venue" },
    { src: images.break.cinematic, alt: "Cinematic portrait" },
    { src: images.films.reelB, alt: "Wedding procession" },
    { src: images.premium.cover, alt: "Destination bridal portrait" },
  ];

  return (
    <section className="w-full bg-background pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        
        {/* Heading Section */}
        <Reveal className="flex flex-col items-center">
          <h2 className="block text-center font-display font-semibold uppercase text-[#d1cbbd] text-[32px] md:text-[40px] tracking-[1px]">
            INSTAGRAM
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center text-[12px] md:text-[14px] tracking-[2px] text-[#8b867c] hover:text-[#d1cbbd] transition-colors duration-300"
          >
            @theswaymvar
          </a>
        </Reveal>

        {/* 50px bottom spacing as specified */}
        <div className="h-[50px] md:h-[55px] w-full shrink-0" />

        {/* Responsive CSS Grid (Max width 1175px) */}
        <Reveal delay={0.1} className="w-full px-4 md:px-8 flex justify-center">
          <div className="w-full max-w-[1175px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px] w-full">
              {gridImages.map((img, idx) => (
                <div key={idx} className="aspect-square relative w-full bg-muted">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
