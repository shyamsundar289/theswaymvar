import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '..');

async function main() {
  const dir = path.join(rootPath, 'public', 'video-cover');
  if (!fs.existsSync(dir)) {
    console.log('video-cover dir not found');
    return;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace('.png', '.webp'));
      
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

main().catch(console.error);
