import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import path from "node:path";
import fs from "node:fs";
import { autoWebpPlugin } from "./vite-plugin-auto-webp.ts";

// Auto-rename folders to bypass ad-blockers during dev/build
const publicDir = path.resolve(import.meta.dirname, 'public');
const instaDesktopPath = path.join(publicDir, 'instadesktop');
const instaMobilePath = path.join(publicDir, 'instamobile');

if (fs.existsSync(instaDesktopPath)) {
  fs.renameSync(instaDesktopPath, path.join(publicDir, 'grid-desktop'));
  console.log("Renamed public/instadesktop to public/grid-desktop to bypass ad-blockers");
}
if (fs.existsSync(instaMobilePath)) {
  fs.renameSync(instaMobilePath, path.join(publicDir, 'grid-mobile'));
  console.log("Renamed public/instamobile to public/grid-mobile to bypass ad-blockers");
}

export default defineConfig({
  plugins: [
    autoWebpPlugin(),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    nitro({}),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
});
