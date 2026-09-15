const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeFolder(dir, width) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const fullPath = path.join(dir, file);
      const ext = path.extname(file);
      const webpPath = fullPath.replace(new RegExp(ext + '$', 'i'), '.webp');
      
      console.log(`Optimizing ${file} to WebP...`);
      await sharp(fullPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpPath);
        
      // Delete original to save space and force use of WebP
      fs.unlinkSync(fullPath);
    }
  }
}

async function run() {
  await optimizeFolder(path.join(__dirname, 'public/little snap/14_grid'), 1200);
  await optimizeFolder(path.join(__dirname, 'public/little snap/6_grid'), 800);
  
  // Also optimize founder image
  const founderPath = path.join(__dirname, 'public/media/images/about/general/founder_Ravi_Maru.JPG');
  if (fs.existsSync(founderPath)) {
    const webpPath = founderPath.replace(/\.JPG$/i, '.webp');
    await sharp(founderPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webpPath);
    fs.unlinkSync(founderPath);
    console.log('Optimized Founder Image');
  }
}

run().then(() => console.log('Done')).catch(console.error);
