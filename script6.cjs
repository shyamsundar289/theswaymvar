const sharp = require('sharp');
const fs = require('fs');

async function check() {
  for (let i = 1; i <= 14; i++) {
    const file = 'public/little snap/14_grid/' + i + '.jpg';
    if (fs.existsSync(file)) {
      const meta = await sharp(file).metadata();
      const ratio = meta.width / meta.height;
      let type = 'square (1/1)';
      let cls = 'aspect-[1/1]';
      if (ratio > 1.1) { type = 'landscape'; cls = 'aspect-[5/4]'; }
      if (ratio < 0.9) { type = 'portrait'; cls = 'aspect-[4/5]'; }
      console.log(`${i}.jpg: ${cls}`);
    }
  }
}
check();
