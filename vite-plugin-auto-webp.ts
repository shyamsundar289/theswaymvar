import { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export function autoWebpPlugin(): Plugin {
  return {
    name: "vite-plugin-auto-webp",
    enforce: "pre",
    async resolveId(source, importer, options) {
      if (source.match(/\.(jpg|jpeg|png)$/i) && !source.includes("node_modules")) {
        const resolution = await this.resolve(source, importer, { skipSelf: true, ...options });
        if (resolution && resolution.id) {
          const filePath = resolution.id.split("?")[0];
          const ext = path.extname(filePath);
          const webpPath = filePath.replace(new RegExp(`${ext}$`, "i"), ".webp");

          if (!fs.existsSync(webpPath)) {
            console.log(`[AutoWebP] Converting ${path.basename(filePath)} to WebP...`);
            try {
              await sharp(filePath)
                .resize({ width: 1600, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(webpPath);
            } catch (err) {
              console.error("[AutoWebP] Error:", err);
              return resolution; // fallback to original
            }
          }

          // Redirect Vite to process the .webp file instead of the .jpg file
          // Since the file now exists on disk, Vite's standard asset plugin will handle it perfectly
          const webpSource = source.replace(new RegExp(`${ext}$`, "i"), ".webp");
          return this.resolve(webpSource, importer, { skipSelf: true, ...options });
        }
      }
      return null;
    },
  };
}
