import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/images";
import { stories, waLink } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";
import { PhotographyHero } from "@/components/site/PhotographyHero";
import { PhotographyGridSection } from "@/components/photography/PhotographyGridSection";

export const Route = createFileRoute("/photography/")({
  head: () => ({
    meta: [
      { title: "Photography — Wedding Stories | theswaymvar" },
      {
        name: "description",
        content:
          "Selected wedding stories photographed and filmed by theswaymvar — Udaipur, Alibaug, Jaipur, Coonoor, Lake Como and Goa.",
      },
      {
        property: "og:title",
        content: "Photography — Wedding Stories | theswaymvar",
      },
      {
        property: "og:description",
        content: "Selected wedding stories, told whole.",
      },
    ],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  const featured = stories.slice(0, 3);

  return (
    <>
      {/* =======================================================
          SECTION 1 — FIXED PHOTOGRAPHY HERO
      ======================================================= */}
      <div className="fixed top-0 left-0 w-full h-[50vh] md:h-[500px] lg:h-[580px] z-0 overflow-hidden bg-[#F6F4EE]">
        <PhotographyHero />
      </div>
      <div className="w-full h-[50vh] md:h-[500px] lg:h-[580px] pointer-events-none bg-transparent" />

      {/* =======================================================
          SECTION 2 — CONTENT SLIDING OVER HERO
      ======================================================= */}
      <div className="relative z-10 w-full bg-white">
        <PhotographyGridSection />
      </div>

      {/* =======================================================
          SECTION 3 — OUR PHOTOGRAPHY APPROACH
      ======================================================= */}

      
    </>
  );
}
