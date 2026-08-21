import { films } from "@/data/films";

export function FilmStickyIntro() {
  const featuredVideo = films[0]?.video || "/videos/Herovideo.mp4";
  const featuredPoster = films[0]?.poster || "/images/Recent01.webp";

  return (
    <>
      {/* 
        FIXED BACKGROUND HERO
        This guarantees the video stays pinned at the top while the page scrolls over it,
        completely immune to any overflow-hidden sticky bugs.
      */}
      <div className="fixed top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] overflow-hidden z-0">
        {/* Full-bleed background video */}
        <video
          src={featuredVideo}
          poster={featuredPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 
        INVISIBLE SPACER
        Takes up the exact same height in the document flow 
        so the next section (FilmGridSection) starts precisely beneath the video.
      */}
      <div className="w-full h-[50vh] md:h-[500px] lg:h-[580px] bg-transparent pointer-events-none" />
    </>
  );
}
