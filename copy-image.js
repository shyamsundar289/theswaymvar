const fs = require('fs');
const path = require('path');

const source = 'C:/Users/shyam/.gemini/antigravity/brain/32de1073-103a-4b0b-837a-1e304b1b4ef4/red_rotary_telephone_1787083895704.jpg';
const dest = path.join(__dirname, 'public', 'images', 'red-rotary-telephone.jpg');

try {
  fs.copyFileSync(source, dest);
  console.log('✅ Image successfully copied to ' + dest);
} catch (e) {
  console.error('❌ Failed to copy image:', e.message);
}
