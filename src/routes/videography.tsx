import { assets } from "../assets/asset-manifest";
import { createFileRoute } from "@tanstack/react-router";
import { SharedHero } from "@/components/site/SharedHero";
import { Video } from "lucide-react";
import { images } from "@/data/images";

import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/videography")({
  head: () => ({
    meta: getSeoMetadata(
      "Cinematic Wedding Films & Videography in Bikaner | The Swaymvar",
      "The Swaymvar creates cinematic wedding films and videography in Bikaner, Rajasthan. Quiet, real records of your celebrations and destination weddings.",
      "/videography"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/videography` }],
  }),
  component: VideographyPage,
});

function VideographyPage() {
  return (
    <div className="bg-background min-h-[100svh] text-foreground">
      <SharedHero
        icon={<Video className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />}
        eyebrow="EVERY FRAME. EVERY FEELING."
        title="Videography"
        description={
          <>
            Cinematic films. Real moments.
            <br />
            Captured in motion, cherished forever.
          </>
        }
        ctaText="WATCH FILMS"
        ctaLink="/film"
        videoSrc={assets.videos.hero}
        fontOverride="serif"
      />
    </div>
  );
}
