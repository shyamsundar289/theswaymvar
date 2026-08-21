import { createFileRoute } from "@tanstack/react-router";
import { FilmStickyIntro } from "@/components/film/FilmStickyIntro";
import { FilmGridSection } from "@/components/film/FilmGridSection";

function FilmPage() {
  return (
    <>
      <FilmStickyIntro />
      <FilmGridSection />
    </>
  );
}

export const Route = createFileRoute("/film")({
  component: FilmPage,
});
