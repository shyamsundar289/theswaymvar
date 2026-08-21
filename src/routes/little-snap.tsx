import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/little-snap')({
  head: () => ({
    meta: [
      { title: "Little Snap — theswayamvar" },
      {
        name: "description",
        content: "This section is currently under construction.",
      },
    ],
  }),
  component: LittleSnapPage,
});

function LittleSnapPage() {
  return (
    // 'bg-black' provides the solid black background
    // 'min-h-[100svh]' ensures it covers the full viewport height
    <div className="bg-black text-white min-h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center">
      
      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide text-white">
        Little Snap
      </h1>
      
      {/* Construction Message in English */}
      <p className="text-white/70 font-sans text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10 tracking-wide">
        This section is currently being built. Please explore our other pages to see more of our work.
      </p>
      
      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link 
          to="/photography" 
          className="border border-white/30 px-8 py-3 uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto"
        >
          Photography
        </Link>
        <Link 
          to="/film" 
          className="border border-white/30 px-8 py-3 uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto"
        >
          Films
        </Link>
      </div>
      
    </div>
  );
}
