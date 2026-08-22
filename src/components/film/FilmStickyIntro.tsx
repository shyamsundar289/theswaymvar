import { films } from "@/data/films";

export function FilmStickyIntro() {
  const featuredVideo = films[0]?.video || "/videos/Herovideo.mp4";
  const featuredPoster = films[0]?.poster || "/images/Recent01.webp";

  return (
    <div className="sticky top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] overflow-hidden z-0">
      <video
        src={featuredVideo}
        poster={featuredPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
