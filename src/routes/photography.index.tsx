import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/images";
import { stories, waLink } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";
import { PhotographyHero } from "@/components/site/PhotographyHero";
import { PhotographyGallery } from "@/components/site/PhotographyGallery";

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
          SECTION 1 — PHOTOGRAPHY HERO (image-free, 100px header)
      ======================================================= */}
      <PhotographyHero />

      {/* =======================================================
          SECTION 2 — FILTER BAR + MASONRY GALLERY
      ======================================================= */}
      <PhotographyGallery />

      {/* =======================================================
          SECTION 3 — OUR PHOTOGRAPHY APPROACH
      ======================================================= */}

      
    </>
  );
}
