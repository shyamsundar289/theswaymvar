import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '..');

async function main() {
  console.log('Starting optimization tasks...');

  // 1. Rename video&cover to video-cover
  const oldVideoPath = path.join(rootPath, 'public', 'video&cover');
  const newVideoPath = path.join(rootPath, 'public', 'video-cover');
  if (fs.existsSync(oldVideoPath)) {
    try {
      if (!fs.existsSync(newVideoPath)) {
        fs.mkdirSync(newVideoPath);
      }
      const files = fs.readdirSync(oldVideoPath);
      for (const file of files) {
        fs.copyFileSync(path.join(oldVideoPath, file), path.join(newVideoPath, file));
      }
      console.log('Copied video&cover to video-cover');
    } catch (e) {
      console.error('Error copying video folder:', e);
    }
  } else {
    console.log('video&cover does not exist');
  }

  // 2. Convert grid-desktop and grid-mobile PNGs to WebP
  for (const folder of ['grid-desktop', 'grid-mobile']) {
    const dir = path.join(rootPath, 'public', folder);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.png')) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, file.replace('.png', '.webp'));
        
        // Skip if webp already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping existing ${outputPath}`);
          continue;
        }

        try {
          await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
          console.log(`Converted ${inputPath} -> ${outputPath}`);
        } catch (e) {
          console.error(`Error converting ${inputPath}`, e);
        }
      }
    }
  }

  console.log('Optimization complete!');
}

main().catch(console.error);
