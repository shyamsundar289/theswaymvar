const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folders = ['Bhawna & Abhishek', 'Khushboo & Jay', 'Pooja & Suryaprakash', 'Varsha & Shivam'];
const baseDir = path.join(__dirname, 'public');

async function analyze() {
  const files = [];
  for (const folder of folders) {
    const dir = path.join(baseDir, folder);
    if (!fs.existsSync(dir)) continue;

    function walk(d) {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (full.match(/\.(jpg|jpeg|png|webp)$/i)) files.push({ fullPath: full, folder });
      }
    }
    walk(dir);
  }

  const dimMap = new Map();

  for (const fileObj of files) {
    const stat = fs.statSync(fileObj.fullPath);
    const sizeKB = Math.round(stat.size / 1024);
    try {
      const meta = await sharp(fileObj.fullPath).metadata();
      // Match by dimensions
      const key = meta.width + 'x' + meta.height;
      if (!dimMap.has(key)) dimMap.set(key, []);
      dimMap.get(key).push({ 
        name: path.relative(baseDir, fileObj.fullPath), 
        sizeKB: sizeKB, 
        bytes: stat.size,
        width: meta.width, 
        height: meta.height,
        folder: fileObj.folder
      });
    } catch (e) {
      console.error('Error with', fileObj.fullPath, e);
    }
  }

  let found = false;
  for (const [key, list] of dimMap.entries()) {
    if (list.length > 1) {
      // Check if any in this dimension list have SIMILAR size
      // We will print all images that share the SAME dimensions to see if any have similar sizes
      console.log(`\nDimensions Match: ${key}`);
      list.sort((a,b) => a.sizeKB - b.sizeKB);
      list.forEach(item => console.log(`  - ${item.folder} | ${item.name} | Size: ${item.sizeKB} KB (${item.bytes} bytes)`));
      found = true;
    }
  }
}
analyze();
