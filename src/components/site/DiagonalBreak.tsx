export function DiagonalBreak({
  image,
}: {
  image: string;
}) {
  return (
    <section 
      className="relative isolate overflow-hidden bg-fixed bg-cover bg-center h-[50vh] md:h-[70vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Lighter overlay to let the beautiful image shine through */}
      <div className="absolute inset-0 bg-black/20 z-0" />
      <div className="grain absolute inset-0 z-0" />

      {/* Curved White Overlay at the Top with Double Strip & Shadow */}
      <div className="absolute -top-[1px] left-0 w-full z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block w-full h-[70px] md:h-[140px]">
          {/* Layer 1: The 'double strip' made much wider, using vinyl color #eae0d1 */}
          <path d="M0,0 L100,0 L100,18 Q50,98 0,55 Z" className="fill-[#eae0d1]" />
          
          {/* Layer 2: The main solid curve */}
          <path d="M0,0 L100,0 L100,18 Q50,98 0,18 Z" className="fill-background" />
        </svg>
      </div>

      {/* Curved White Overlay at the Bottom with Double Strip & Shadow (Opposite Side) */}
      <div className="absolute -bottom-[1px] left-0 w-full z-20 pointer-events-none drop-shadow-[0_-15px_25px_rgba(0,0,0,0.5)]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block w-full h-[70px] md:h-[140px]">
          {/* Layer 1: The 'double strip', thick on the right side, tapering to nothing on the left */}
          <path d="M0,100 L100,100 L100,45 Q50,2 0,82 Z" className="fill-[#eae0d1]" />
          
          {/* Layer 2: The main solid curve pointing upwards */}
          <path d="M0,100 L100,100 L100,82 Q50,2 0,82 Z" className="fill-background" />
        </svg>
      </div>
      
      <div className="relative z-10 text-center w-full px-4">
        <h2 className="text-[12vw] md:text-[8rem] font-script text-white tracking-wider opacity-90 drop-shadow-xl" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          Photography
        </h2>
      </div>
    </section>
  );
}
