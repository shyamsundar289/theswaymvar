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

  const statsMap = new Map();

  for (const fileObj of files) {
    const stat = fs.statSync(fileObj.fullPath);
    const sizeBytes = stat.size;
    try {
      const meta = await sharp(fileObj.fullPath).metadata();
      // Let's match by dimensions and exact byte size
      const key = meta.width + 'x' + meta.height + '_' + sizeBytes;
      if (!statsMap.has(key)) statsMap.set(key, []);
      statsMap.get(key).push({ 
        name: path.relative(baseDir, fileObj.fullPath), 
        size: sizeBytes, 
        width: meta.width, 
        height: meta.height,
        folder: fileObj.folder
      });
    } catch (e) {
      console.error('Error with', fileObj.fullPath, e);
    }
  }

  let found = false;
  for (const [key, list] of statsMap.entries()) {
    if (list.length > 1) {
      found = true;
      const info = list[0];
      console.log(`\nMatch Found! Dimensions: ${info.width}x${info.height}, Size: ${(info.size / 1024 / 1024).toFixed(2)} MB (${info.size} bytes)`);
      list.forEach(item => console.log(`  - Couple: ${item.folder} | File: ${item.name}`));
    }
  }
  if (!found) console.log('\nNo exact matches found across all 106 images.');
}
analyze();
