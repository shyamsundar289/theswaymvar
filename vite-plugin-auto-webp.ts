import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export function autoWebpPlugin(): Plugin {
  return {
    name: 'vite-plugin-auto-webp',
    enforce: 'pre',
    async load(id) {
      if (id.match(/\.(jpg|jpeg|png)$/i) && !id.includes('node_modules')) {
        try {
          const filePath = id.split('?')[0]; 
          const ext = path.extname(filePath);
          const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
          
          if (!fs.existsSync(webpPath)) {
            console.log(`[AutoWebP] Converting ${path.basename(filePath)} to WebP...`);
            await sharp(filePath)
              .resize({ width: 1600, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(webpPath);
          }
          
          // Return an import redirect to the new WebP file
          return `export { default } from "${webpPath.replace(/\\/g, '/')}";`;
          
        } catch (err) {
          console.error('[AutoWebP] Error:', err);
          return null; 
        }
      }
      return null;
    }
  };
}
