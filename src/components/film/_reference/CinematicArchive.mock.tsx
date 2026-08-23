import { assets } from "../../../assets/asset-manifest";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Play, X, ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react";

// ---------------------------------------------------------------------------
// DATA MOCK (Replacing with structure that fits editorial-bloom)
// ---------------------------------------------------------------------------
export type Film = {
  id: string;
  couple: string;
  location: string;
  country: string;
  year: number;
  category: string;
  type: string;
  duration: string;
  poster: string;
  preview: string;
  video: string;
  featured?: boolean;
};

const mockFilms: Film[] = [
  {
    id: "film-001",
    couple: "Aarav & Meera",
    location: "Udaipur, Rajasthan",
    country: "India",
    year: 2024,
    category: "WEDDING",
    type: "Wedding Film",
    duration: "06:42",
    poster:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop",
    preview: assets.videos.background.wedding,
    video: assets.videos.background.wedding,
    featured: true,
  },
  {
    id: "film-002",
    couple: "Rhea & Kunal",
    location: "Jaipur, Rajasthan",
    country: "India",
    year: 2023,
    category: "WEDDING",
    type: "Destination Film",
    duration: "05:15",
    poster:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    preview: assets.videos.background.celebration,
    video: assets.videos.background.celebration,
    featured: true,
  },
  {
    id: "film-003",
    couple: "Sophia & Liam",
    location: "Lake Como",
    country: "Italy",
    year: 2024,
    category: "DESTINATION",
    type: "Destination Film",
    duration: "08:10",
    poster:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop",
    preview: assets.videos.background.portraits,
    video: assets.videos.background.portraits,
    featured: true,
  },
  {
    id: "film-004",
    couple: "Ananya & Rohan",
    location: "Mumbai, Maharashtra",
    country: "India",
    year: 2022,
    category: "PRE-WEDDING",
    type: "Pre-Wedding Film",
    duration: "03:45",
    poster:
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop",
    preview: assets.videos.background.prewedding,
    video: assets.videos.background.prewedding,
  },
  {
    id: "film-005",
    couple: "Sarah & James",
    location: "New York",
    country: "USA",
    year: 2023,
    category: "DESTINATION",
    type: "Wedding Film",
    duration: "07:20",
    poster:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    preview: assets.videos.background.rituals,
    video: assets.videos.background.rituals,
  },
];

const showreelData = {
  title: "2026 Showreel",
  poster:
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop",
  video: assets.videos.background.videoseen,
};

// ---------------------------------------------------------------------------
// UTILS & SHARED COMPONENTS
// ---------------------------------------------------------------------------

const PlayCircle = () => (
  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F6F4EE]/30 bg-[#F6F4EE]/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
    <Play className="ml-1 h-5 w-5 text-[#F6F4EE]" fill="currentColor" />
  </div>
);

const HoverVideoPreview = ({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster: string;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <>
      <img
        src={poster}
        alt="Film Poster"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

// ---------------------------------------------------------------------------
// 1. FILM VIEWER (FULLSCREEN MODAL)
// ---------------------------------------------------------------------------
function FilmViewer({
  films,
  activeIndex,
  onClose,
  onChangeIndex,
}: {
  films: Film[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((activeIndex + 1) % films.length);
      if (e.key === "ArrowLeft") onChangeIndex((activeIndex - 1 + films.length) % films.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, films.length, onClose, onChangeIndex]);

  if (!activeFilm) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col bg-[#15130F] text-[#F6F4EE]"
    >
      {/* Header Controls */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-10">
        <div>
          <h2 className="font-display text-4xl md:text-6xl text-[#F6F4EE]">{activeFilm.couple}</h2>
          <p className="mt-2 label-xs text-[#F6F4EE]/60">
            {activeFilm.category} &middot; {activeFilm.location} &middot; {activeFilm.year}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/5 p-4 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Video Player */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-24 md:px-20">
        <motion.div
          key={activeFilm.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full max-w-[1400px] overflow-hidden bg-black shadow-2xl"
        >
          <video
            ref={videoRef}
            src={activeFilm.video}
            poster={activeFilm.poster}
            autoPlay
            controls
            muted={isMuted}
            playsInline
            className="h-full w-full bg-black object-contain"
          />
        </motion.div>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:p-10">
        <button
          onClick={() => onChangeIndex((activeIndex - 1 + films.length) % films.length)}
          className="group flex items-center gap-4 label-xs text-[#F6F4EE]/70 transition-colors hover:text-[#F6F4EE]"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="hidden md:block">Previous Story</span>
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full bg-white/5 p-3 text-white transition-colors hover:bg-white/10"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        <button
          onClick={() => onChangeIndex((activeIndex + 1) % films.length)}
          className="group flex items-center gap-4 label-xs text-[#F6F4EE]/70 transition-colors hover:text-[#F6F4EE]"
        >
          <span className="hidden md:block">Next Story</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// 2. FILMS WE'VE CRAFTED (Featured)
// ---------------------------------------------------------------------------
function FeaturedFilms({
  films,
  onOpenFilm,
}: {
  films: Film[];
  onOpenFilm: (index: number) => void;
}) {
  const featured = films.filter((f) => f.featured).slice(0, 4); // Max 4 for layout
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!featured.length) return null;

  return (
    <section className="shell section-y-lg bg-[#F6F4EE] flex flex-col items-center">
      <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
        <span className="label-xs text-[#15130F]/60 mb-6">Curated Selection</span>
        <h2 className="font-display text-5xl leading-[0.95] md:text-8xl text-[#15130F] max-w-4xl">
          Films we've crafted.
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#15130F]/70 md:text-base">
          A collection of celebrations, stories, and moments we've had the privilege to preserve in
          motion.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
        {featured.map((film, idx) => {
          // First film takes up more space (hero of the featured section)
          const isLarge = idx === 0;
          const gridClass = isLarge ? "md:row-span-2 lg:col-span-8" : "lg:col-span-4";

          return (
            <div
              key={film.id}
              className={`group relative flex cursor-pointer flex-col ${gridClass}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onOpenFilm(films.findIndex((f) => f.id === film.id))}
            >
              <div
                className={`relative w-full overflow-hidden bg-[#E8E4D9] shadow-sm ${
                  isLarge ? "aspect-video md:aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <motion.div
                  className="absolute inset-0 h-full w-full"
                  animate={{ scale: hoveredIndex === idx ? 1.03 : 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <HoverVideoPreview
                    src={film.preview}
                    poster={film.poster}
                    isActive={hoveredIndex === idx}
                  />
                </motion.div>

                {/* Overlay Gradient & Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#15130F]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <PlayCircle />
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-[#15130F]">
                    {film.couple}
                  </h3>
                  <p className="mt-2 label-xs text-[#15130F]/60">{film.location}</p>
                </div>
                <span className="label-xs text-[#15130F]/40 border border-border px-3 py-1 rounded-full flex items-center">
                  {film.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 3. CINEMATIC SHOWREELS
// ---------------------------------------------------------------------------
function CinematicShowreels({ onOpenFilm }: { onOpenFilm: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="shell section-y-lg flex flex-col items-center bg-[#F6F4EE] text-center border-t border-border/40">
      <span className="label-xs text-[#15130F]/60 mb-6">Our Work</span>
      <h2 className="font-display text-5xl leading-[0.95] md:text-8xl text-[#15130F] max-w-4xl">
        Cinematic Showreel.
      </h2>
      <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#15130F]/70 md:text-base">
        A glimpse into the movement, emotion, and atmosphere behind our films.
      </p>

      <div
        className="group relative mt-16 md:mt-24 aspect-video w-full cursor-pointer overflow-hidden bg-[#15130F] shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:aspect-[21/9]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpenFilm}
      >
        <HoverVideoPreview
          src={showreelData.video}
          poster={showreelData.poster}
          isActive={isHovered}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#15130F_120%)] opacity-40 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center bg-[#15130F]/20 transition-colors duration-500 group-hover:bg-[#15130F]/10">
          <div className="flex flex-col items-center gap-6">
            <h3 className="font-display text-5xl md:text-8xl tracking-wide text-[#F6F4EE]">
              {showreelData.title}
            </h3>
            <PlayCircle />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. FILM STORIES & COLLECTIONS (Scroll Archive)
// ---------------------------------------------------------------------------
function ScrollArchive({
  films,
  onOpenFilm,
}: {
  films: Film[];
  onOpenFilm: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", ...Array.from(new Set(films.map((f) => f.category)))];
  const filteredFilms =
    activeCategory === "ALL" ? films : films.filter((f) => f.category === activeCategory);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (filteredFilms.length === 0) return;
    const index = Math.min(Math.floor(latest * filteredFilms.length), filteredFilms.length - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  useEffect(() => setActiveIndex(0), [activeCategory]);

  return (
    <section className="relative w-full bg-[#F6F4EE] text-[#15130F] border-t border-border/40">
      {/* Editorial Intro Header */}
      <div className="shell section-y-lg flex flex-col items-center text-center">
        <span className="label-xs text-[#15130F]/60 mb-6">Wedding Archive</span>
        <h2 className="font-display text-5xl leading-[0.95] md:text-8xl text-[#15130F] max-w-4xl">
          2020 &mdash; 2026
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#15130F]/70 md:text-base">
          Seven Years. Hundreds of Moments. Countless Stories.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="no-scrollbar sticky top-0 z-30 flex justify-center gap-6 overflow-x-auto border-b border-border/60 bg-[#F6F4EE]/90 px-6 py-6 backdrop-blur-xl md:gap-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`label-xs transition-colors duration-300 ${
              activeCategory === cat
                ? "border-b border-[#15130F] pb-1 text-[#15130F]"
                : "text-[#15130F]/40 hover:text-[#15130F]/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredFilms.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center label-xs text-[#15130F]/40">
          More stories coming soon.
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{ height: `${filteredFilms.length * 100}vh` }}
          className="relative w-full"
        >
          {/* Sticky Viewport */}
          <div className="sticky top-[80px] flex h-[calc(100vh-80px)] w-full flex-col justify-between overflow-hidden shell py-8 md:py-12">
            {/* TOP METADATA: Year & Location */}
            <div className="w-full flex justify-between items-start z-40 pointer-events-none">
              <div className="font-display text-5xl md:text-7xl text-[#15130F]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={filteredFilms[activeIndex]?.year}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="block"
                  >
                    {filteredFilms[activeIndex]?.year}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredFilms[activeIndex]?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-end gap-1"
                  >
                    <span className="label-xs text-[#15130F]/80">
                      {filteredFilms[activeIndex]?.location}
                    </span>
                    <span className="label-xs text-[#15130F]/50">
                      {filteredFilms[activeIndex]?.type}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* MAIN VIDEO COMPOSITION LAYER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence>
                {filteredFilms.map((film, idx) => {
                  const isActive = idx === activeIndex;
                  const isPrev = idx === activeIndex - 1;
                  const isNext = idx === activeIndex + 1;

                  if (!isActive && !isPrev && !isNext) return null;

                  // Cinematic editorial movement logic based on scroll direction
                  let initial = { opacity: 0, scale: 0.85, y: "15vh", x: "15vw", rotateZ: 5 };
                  let animate = {
                    opacity: 1,
                    scale: 1,
                    y: "0vh",
                    x: "0vw",
                    rotateZ: 0,
                    zIndex: 10,
                  };
                  let exit = {
                    opacity: 0,
                    scale: 0.95,
                    y: "-15vh",
                    x: "-15vw",
                    rotateZ: -5,
                    zIndex: 5,
                  };

                  if (isPrev) {
                    animate = {
                      opacity: 0,
                      scale: 1.05,
                      y: "-20vh",
                      x: "-20vw",
                      rotateZ: -5,
                      zIndex: 0,
                    };
                  }
                  if (isNext) {
                    animate = {
                      opacity: 0,
                      scale: 0.85,
                      y: "20vh",
                      x: "20vw",
                      rotateZ: 5,
                      zIndex: 0,
                    };
                  }

                  return (
                    <motion.div
                      key={film.id}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="group absolute w-[85vw] md:w-[60vw] max-w-[1100px] aspect-[4/5] md:aspect-[16/10] flex cursor-pointer items-center justify-center pointer-events-auto"
                      onClick={() =>
                        isActive && onOpenFilm(films.findIndex((f) => f.id === film.id))
                      }
                    >
                      <div className="relative h-full w-full overflow-hidden bg-[#15130F] shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                        <HoverVideoPreview
                          src={film.preview}
                          poster={film.poster}
                          isActive={isActive}
                        />

                        {/* Dim inactive films slightly */}
                        <div className="absolute inset-0 bg-[#0F0D0A]/20 transition-colors duration-500 group-hover:bg-[#0F0D0A]/0" />

                        {isActive && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <PlayCircle />
                          </div>
                        )}
                        {/* Gradient scrim for safe metadata (if any placed inside) */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#15130F]/40 to-transparent pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* BOTTOM METADATA: Couple Name & Timeline Progress */}
            <div className="w-full flex justify-between items-end z-40 pointer-events-none">
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={filteredFilms[activeIndex]?.couple}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl text-[#15130F]"
                  >
                    {filteredFilms[activeIndex]?.couple}
                  </motion.h3>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-end gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prog-${filteredFilms[activeIndex]?.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-display text-2xl md:text-4xl text-[#15130F]/90"
                  >
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredFilms.length).padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// 5. DESTINATION / LOCATION FILMS
// ---------------------------------------------------------------------------
function DestinationFilms() {
  const destinations = [
    {
      name: "Udaipur",
      region: "Rajasthan",
      cover:
        "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Jaipur",
      region: "Rajasthan",
      cover:
        "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Lake Como",
      region: "Italy",
      cover:
        "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="shell section-y-lg bg-[#F6F4EE] text-[#15130F] border-t border-border/40">
      <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
        <span className="label-xs text-[#15130F]/60 mb-6">Global Archives</span>
        <h2 className="font-display text-5xl leading-[0.95] md:text-8xl text-[#15130F] max-w-4xl">
          Destination Films.
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#15130F]/70 md:text-base">
          Stories shaped by the places where they unfold.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
        {destinations.map((dest) => (
          <div
            key={dest.name}
            className="group relative h-[60vh] cursor-pointer overflow-hidden md:h-[70vh] bg-[#E8E4D9]"
          >
            <img
              src={dest.cover}
              alt={dest.name}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15130F]/70 via-[#15130F]/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="mb-2 block label-xs text-[#F6F4EE]/70">{dest.region}</span>
                <h3 className="font-display text-3xl text-[#F6F4EE] transition-transform duration-500 group-hover:-translate-y-2 md:text-4xl">
                  {dest.name}
                </h3>
              </div>
              <div className="flex h-10 w-10 -translate-x-4 items-center justify-center rounded-full border border-[#F6F4EE]/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                <ChevronRight className="h-4 w-4 text-[#F6F4EE]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------------------------
export function CinematicArchive() {
  const [viewerActiveIndex, setViewerActiveIndex] = useState<number | null>(null);

  const openFilm = (index: number) => {
    setViewerActiveIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setViewerActiveIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col">
      <FeaturedFilms films={mockFilms} onOpenFilm={openFilm} />
      <CinematicShowreels onOpenFilm={() => openFilm(0)} />
      <ScrollArchive films={mockFilms} onOpenFilm={openFilm} />
      <DestinationFilms />

      <AnimatePresence>
        {viewerActiveIndex !== null && (
          <FilmViewer
            films={mockFilms}
            activeIndex={viewerActiveIndex}
            onClose={closeViewer}
            onChangeIndex={setViewerActiveIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
