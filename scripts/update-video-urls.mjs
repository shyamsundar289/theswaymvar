import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '..');

const filesToUpdate = [
  path.join(rootPath, 'src', 'data', 'site.ts'),
  path.join(rootPath, 'src', 'data', 'film-library.ts')
];

for (const file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all "/video-cover/XX.mp4" with the GitHub release URL
    content = content.replace(/\/video-cover\/(\d+)\.mp4/g, 'https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/$1.mp4');
    
    fs.writeFileSync(file, content);
    console.log(`Updated video URLs in ${path.basename(file)}`);
  }
}
