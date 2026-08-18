import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/images";

export function EditorialCollage() {
  // Define 14 images representing the sequence specified in the requirements
  const sequence = [
    { src: images.story.opener, alt: "Architecture and venue details" }, // 1. Architecture / venue
    { src: images.photo.featuredHero, alt: "Bride close-up portrait" }, // 2. Bride close-up
    { src: images.moments[2], alt: "Black and white intimate couple" }, // 3. Black-and-white intimate couple
    { src: images.moments[0], alt: "Candid romantic couple" }, // 4. Candid romantic couple
    { src: images.story.three, alt: "Elegant bridal portrait" }, // 5. Elegant bridal portrait
    
    { src: images.moments[6], alt: "Groom and bride emotional moment" }, // 6. Groom + bride emotional moment
    { src: images.moments[4], alt: "Fashion editorial bridal portrait" }, // 7. Fashion/editorial bridal portrait
    
    // Position 8 is the TEXT CARD
    
    { src: images.moments[1], alt: "Bride walking ceremony" }, // 8. Bride walking / ceremony
    { src: images.moments[5], alt: "Wedding celebration" }, // 9. Wedding celebration
    { src: images.moments[7], alt: "Black and white couple portrait" }, // 10. Black-and-white couple
    { src: images.films.reelA, alt: "Bride and groom intimate moment" }, // 11. Bride + groom intimate moment
    { src: images.films.reelB, alt: "Wedding procession" }, // 12. Wedding procession
    { src: images.break.cinematic, alt: "Black and white couple" }, // 13. Black-and-white couple portrait
    { src: images.premium.cover, alt: "Destination scenic bridal portrait" }, // 14. Destination / scenic bridal portrait
  ];

  return (
    <section className="w-full bg-background overflow-hidden">
      <Reveal className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[3px] w-full">
          
          {/* 1 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[0].src} alt={sequence[0].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 2 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[1].src} alt={sequence[1].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 3 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[2].src} alt={sequence[2].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 4 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[3].src} alt={sequence[3].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 5 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[4].src} alt={sequence[4].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          
          {/* 6 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[5].src} alt={sequence[5].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 7 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[6].src} alt={sequence[6].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          
          {/* 8 - CENTER TEXT CARD */}
          <div className="aspect-square relative w-full bg-[#fdfbf6] flex flex-col items-center justify-center text-center p-3 sm:p-5 md:p-6">
            <p className="text-[8px] sm:text-[10px] lg:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#8b867c] mb-2 sm:mb-3 w-full">
              Some of our most
            </p>
            <h2 className="font-serif text-[clamp(1.25rem,3vw,2.5rem)] text-[#2d2c2a] leading-none mb-2 sm:mb-3 w-full uppercase tracking-widest font-normal drop-shadow-sm">
              "Iconic"
            </h2>
            <p className="text-[8px] sm:text-[10px] lg:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#8b867c] w-full">
              Wedding Moments
            </p>
          </div>
          
          {/* 9 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[7].src} alt={sequence[7].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 10 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[8].src} alt={sequence[8].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          
          {/* 11 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[9].src} alt={sequence[9].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 12 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[10].src} alt={sequence[10].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 13 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[11].src} alt={sequence[11].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 14 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[12].src} alt={sequence[12].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* 15 */}
          <div className="aspect-square relative w-full bg-muted">
            <img src={sequence[13].src} alt={sequence[13].alt} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>

        </div>
      </Reveal>
    </section>
  );
}
