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

    const dimMap = new Map();

    for (const file of files) {
      const stat = fs.statSync(file);
      const sizeMB = (stat.size / 1024 / 1024).toFixed(1); 
      try {
        const meta = await sharp(file).metadata();
        const key = meta.width + 'x' + meta.height;
        if (!dimMap.has(key)) dimMap.set(key, []);
        dimMap.get(key).push({ name: path.relative(dir, file), sizeMB: sizeMB });
      } catch (e) {}
    }

    console.log(`\n=== ${folder} ===`);
    for (const [key, list] of dimMap.entries()) {
      if (list.length > 1) {
        // Find if any share the same MB
        const mbMap = new Map();
        for (const item of list) {
          if (!mbMap.has(item.sizeMB)) mbMap.set(item.sizeMB, []);
          mbMap.get(item.sizeMB).push(item.name);
        }
        
        let foundSameMB = false;
        for (const [mb, names] of mbMap.entries()) {
          if (names.length > 1) {
            foundSameMB = true;
            console.log(`[MATCH] Dimensions: ${key} | Size: ${mb} MB`);
            names.forEach(n => console.log(`  - ${n}`));
          }
        }
      }
    }
  }
}
analyze().catch(console.error);
