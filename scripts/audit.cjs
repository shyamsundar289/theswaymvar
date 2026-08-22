const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const mediaExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.webm', '.mp3', '.wav', '.otf', '.ttf', '.woff', '.woff2'];
const allPublicFiles = getAllFiles(publicDir).filter(f => mediaExtensions.includes(path.extname(f).toLowerCase()));

const report = allPublicFiles.map(f => {
  const stat = fs.statSync(f);
  return {
    path: path.relative(publicDir, f).replace(/\\/g, '/'),
    size: stat.size,
    ext: path.extname(f).toLowerCase()
  };
});

fs.writeFileSync(path.join(__dirname, '../audit-report.json'), JSON.stringify(report, null, 2), 'utf8');
