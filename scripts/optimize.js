import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../public/images");

async function optimizeImages() {
  try {
    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
      if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")) {
        const inputPath = path.join(imagesDir, file);
        const parsed = path.parse(file);
        const outputPath = path.join(imagesDir, `${parsed.name}.webp`);

        // Skip if webp already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping ${file}, WebP already exists.`);
          continue;
        }

        console.log(`Optimizing ${file} -> ${parsed.name}.webp`);

        // Optimize to high-quality webp
        // We use width: 1920 to prevent insanely large dimensions from slowing down decoding,
        // while preserving top-tier visual quality
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
      }
    }
    console.log("Image optimization complete.");
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
