const sharp = require("sharp");
const path = require("path");

const inputPath = path.resolve(
  "D:\\New folder (2)\\theswaymvar\\public\\media\\images\\home\\editorial\\iconic11.png"
);
const outputPath = path.resolve(
  "D:\\New folder (2)\\theswaymvar\\public\\media\\images\\home\\editorial\\iconic11.webp"
);

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .resize(800, null, {
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log("Image optimized successfully to: " + outputPath);
  } catch (err) {
    console.error("Error optimizing image:", err);
  }
}

optimizeImage();
