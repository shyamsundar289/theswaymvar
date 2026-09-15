const fs = require('fs');
const path = require('path');

const coupleDirs = [
  "Varsha & Shivam",
  "Pooja & Suryaprakash",
  "Khushboo & Jay",
  "Bhawna & Abhishek",
];

const allOriginals = [];
for (const dir of coupleDirs) {
  const fullDirPath = path.join(__dirname, 'public', dir);
  if (fs.existsSync(fullDirPath)) {
    const subdirs = fs.readdirSync(fullDirPath);
    for (const subdir of subdirs) {
      const subPath = path.join(fullDirPath, subdir);
      if (fs.statSync(subPath).isDirectory()) {
        const files = fs.readdirSync(subPath);
        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png)$/i)) {
            allOriginals.push(`/${dir}/${subdir}/${file}`);
          }
        }
      }
    }
  }
}

// Shuffle the array to mix couples and orientations
for (let i = allOriginals.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOriginals[i], allOriginals[j]] = [allOriginals[j], allOriginals[i]];
}

// Take exactly 100 images (or all if less than 100)
const selected = allOriginals.slice(0, 100);

let tsContent = `export const heroImages = [\n`;
for (let i = 0; i < selected.length; i++) {
  tsContent += `  "${selected[i]}",\n`;
}
tsContent += `];\n`;

// Read the existing file and replace
const targetFile = path.join(__dirname, 'src/data/photography-projects.ts');
let fileContent = fs.readFileSync(targetFile, 'utf8');

// Replace the array using regex
fileContent = fileContent.replace(/export const heroImages = \[[\s\S]*?\];/g, tsContent.trim());

fs.writeFileSync(targetFile, fileContent);
console.log(`Successfully injected ${selected.length} unique images into heroImages!`);
