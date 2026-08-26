import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/images";
import { stories, waLink } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";
import { PhotographyHero } from "@/components/site/PhotographyHero";
import { PhotographyGridSection } from "@/components/photography/PhotographyGridSection";

import { getSeoMetadata } from "@/config/seo";

export const Route = createFileRoute("/photography/")({
  head: () => ({
    meta: getSeoMetadata(
      "Wedding Photography in Bikaner, Rajasthan | The Swaymvar",
      "Selected wedding stories and candid wedding photography across Rajasthan and destination locations by The Swaymvar.",
      "/photography"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/photography` }],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  const featured = stories.slice(0, 3);

  return (
    <div className="relative w-full">
      {/* =======================================================
          SECTION 1 — STICKY PHOTOGRAPHY HERO
      ======================================================= */}
      <div className="sticky top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] z-0 overflow-hidden bg-[#F6F4EE]">
        <PhotographyHero />
      </div>

      {/* =======================================================
          SECTION 2 — CONTENT SLIDING OVER HERO
      ======================================================= */}
      <div className="relative z-10 w-full bg-white">
        <PhotographyGridSection />
      </div>

      {/* =======================================================
          SECTION 3 — OUR PHOTOGRAPHY APPROACH
      ======================================================= */}
    </div>
  );
}
