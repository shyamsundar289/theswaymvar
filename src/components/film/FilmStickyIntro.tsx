import { assets } from "../../assets/asset-manifest";
import { films } from "@/data/films";

import { Header } from "@/components/site/Header";

export function FilmStickyIntro() {
  const featuredVideo = films[0]?.video || assets.videos.hero;
  const featuredPoster = films[0]?.poster || assets.recentWork.recent01;

  return (
    <div className="sticky top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] overflow-hidden z-0">
      <Header />
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
