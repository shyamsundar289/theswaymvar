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
      const size = stat.size;
      try {
        const meta = await sharp(file).metadata();
        const key = size + '_' + meta.width + 'x' + meta.height;
        if (!statsMap.has(key)) statsMap.set(key, []);
        statsMap.get(key).push({ name: path.relative(dir, file), size, width: meta.width, height: meta.height });
      } catch (e) {
        console.error('Error with', file, e);
      }
    }

    let found = false;
    console.log('\n--- ' + folder + ' ---');
    for (const [key, list] of statsMap.entries()) {
      if (list.length > 1) {
        found = true;
        const info = list[0];
        console.log(`Match Found! Size: ${(info.size / 1024).toFixed(2)} KB, Dimensions: ${info.width}x${info.height}`);
        list.forEach(item => console.log(`  - ${item.name}`));
      }
    }
    if (!found) console.log('No images with exact same size and dimensions found.');
  }
}
analyze();
