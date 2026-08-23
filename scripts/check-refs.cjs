const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../src");
const publicDir = path.join(__dirname, "../public");

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

const allSrcFiles = getAllFiles(srcDir).filter(
  (f) => f.endsWith(".ts") || f.endsWith(".tsx") || f.endsWith(".css"),
);
const allPublicFiles = new Set(
  getAllFiles(publicDir).map((f) => path.relative(publicDir, f).replace(/\\/g, "/")),
);

const regex = /(["'`])(\/(?:images|videos|audio|fonts|media|film-section)\/[^"'`]+)\1/g;
const relativeRegex = /(["'`])(\.\.?\/[^"'`]+\.(?:png|jpg|jpeg|webp|svg|mp4|mp3|webm))\1/g;

const broken = [];
const valid = [];

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, "utf8");
  let match;

  while ((match = regex.exec(content)) !== null) {
    const assetPath = match[2];
    // Remove leading slash to check in public
    const relativePath = assetPath.substring(1);
    const decoded = decodeURIComponent(relativePath);

    // Check if it exists exactly
    let exists = allPublicFiles.has(decoded);

    // Check case-insensitive if not found
    let actualPath = null;
    if (!exists) {
      for (const p of allPublicFiles) {
        if (p.toLowerCase() === decoded.toLowerCase()) {
          actualPath = p;
          break;
        }
      }
    } else {
      actualPath = decoded;
    }

    if (actualPath === decoded) {
      valid.push({ file: path.relative(srcDir, file), asset: assetPath });
    } else if (actualPath) {
      broken.push({
        file: path.relative(srcDir, file),
        asset: assetPath,
        reason: "Case Mismatch",
        actual: "/" + actualPath,
      });
    } else {
      broken.push({
        file: path.relative(srcDir, file),
        asset: assetPath,
        reason: "File Missing or Moved",
      });
    }
  }
}

fs.writeFileSync(
  path.join(__dirname, "../references-report.json"),
  JSON.stringify({ broken, valid }, null, 2),
  "utf8",
);
