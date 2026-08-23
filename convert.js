import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSVGsToWebP() {
  const inputDir = path.join(__dirname, "public", "images", "Home", "iconic 14");
  console.log(`Scanning directory: ${inputDir}`);

  try {
    const files = await fs.readdir(inputDir);
    const svgFiles = files.filter((f) => f.toLowerCase().endsWith(".svg"));

    if (svgFiles.length === 0) {
      console.log("No SVG files found.");
      return;
    }

    console.log(`Found ${svgFiles.length} SVG files. Starting conversion...`);

    for (const file of svgFiles) {
      const inputPath = path.join(inputDir, file);
      const outputName = file.replace(/\.svg$/i, ".webp");
      const outputPath = path.join(inputDir, outputName);

      try {
        await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
        console.log(`✅ Converted: ${file} -> ${outputName}`);
      } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err.message);
      }
    }

    console.log("🎉 All done! You can now view the updated images on the website.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

convertSVGsToWebP();
