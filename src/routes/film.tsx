import { createFileRoute } from "@tanstack/react-router";
import { FilmStickyIntro } from "@/components/film/FilmStickyIntro";
import { FilmGridSection } from "@/components/film/FilmGridSection";

function FilmPage() {
  return (
    <div className="relative w-full">
      <FilmStickyIntro />
      <FilmGridSection />
    </div>
  );
}

import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/film")({
  head: () => ({
    meta: getSeoMetadata(
      "Cinematic Wedding Films in Bikaner, Rajasthan | The Swaymvar",
      "Explore cinematic wedding films and wedding videography by The Swaymvar. Based in Bikaner, capturing real moments across Rajasthan and destination weddings.",
      "/film"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/film` }],
  }),
  component: FilmPage,
});
