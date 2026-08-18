const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('d:/Github/editorial-bloom/src');
let allColors = new Set();
const hexRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g;
const rgbRegex = /(rgba?|oklch)\([^)]+\)/g;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hexMatches = content.match(hexRegex);
  if (hexMatches) hexMatches.forEach(m => allColors.add(m.toUpperCase()));
  
  const rgbMatches = content.match(rgbRegex);
  if (rgbMatches) rgbMatches.forEach(m => allColors.add(m));
});

console.log(Array.from(allColors).join('\n'));
