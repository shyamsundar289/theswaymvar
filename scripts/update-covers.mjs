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
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(/videocover(\d+)\.png/g, 'videocover$1.webp');
    fs.writeFileSync(file, updated);
    console.log(`Updated covers in ${path.basename(file)}`);
  }
}
