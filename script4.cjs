const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folders = ['Bhawna & Abhishek', 'Khushboo & Jay', 'Pooja & Suryaprakash', 'Varsha & Shivam'];
const baseDir = path.join(__dirname, 'public');

async function analyze() {
  for (const folder of folders) {
    const dir = path.join(baseDir, folder);
    if (!fs.existsSync(dir)) continue;

    const files = [];
    function walk(d) {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (full.match(/\.(jpg|jpeg|png|webp)$/i)) files.push(full);
      }
    }
    walk(dir);

    const statsMap = new Map();

    for (const file of files) {
      const stat = fs.statSync(file);
      const sizeKB = Math.round(stat.size / 1024); // Windows Explorer size
      try {
        const meta = await sharp(file).metadata();
        // Key is Dimensions + Size in KB
        const key = meta.width + 'x' + meta.height + '_' + sizeKB + 'KB';
        if (!statsMap.has(key)) statsMap.set(key, []);
        statsMap.get(key).push({ name: path.relative(dir, file), sizeKB, width: meta.width, height: meta.height });
      } catch (e) {}
    }

    let found = false;
    let out = [];
    for (const [key, list] of statsMap.entries()) {
      if (list.length > 1) {
        found = true;
        const info = list[0];
        out.push(`Match! Dimensions: ${info.width}x${info.height}, Size: ${info.sizeKB} KB`);
        list.forEach(item => out.push(`  - ${item.name}`));
      }
    }
    
    if (found) {
      console.log(`\n--- ${folder} MATCHES ---`);
      console.log(out.join('\n'));
    } else {
      console.log(`\n--- ${folder} MATCHES ---`);
      console.log('No matches found (no two images have same dimensions + same KB size).');
    }
  }
}
analyze().catch(console.error);
