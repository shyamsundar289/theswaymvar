import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/little-snap")({
  head: () => ({
    meta: [
      { title: "Little Snap — theswaymvar" },
      {
        name: "description",
        content: "Ten moments, ten stories.",
      },
    ],
  }),
  component: LittleSnapPage,
});

function LittleSnapPage() {
  return (
    <div className="bg-white min-h-[200vh] w-full">
      {/* Simple white page, scrollable but empty */}
    </div>
  );
}
