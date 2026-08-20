import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import path from "node:path";
import { autoWebpPlugin } from "./vite-plugin-auto-webp.ts";

export default defineConfig({
  plugins: [
    autoWebpPlugin(),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"]
        }
      }
    }),
    nitro({}),
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src")
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core"
    ]
  },
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        'd:/Github/editorial-bloom',
        'C:/Users/shyam/.gemini/antigravity/brain/32de1073-103a-4b0b-837a-1e304b1b4ef4'
      ]
    }
  }
});
