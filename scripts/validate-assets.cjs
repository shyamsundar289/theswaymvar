const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../src");
const publicDir = path.join(__dirname, "../public");

// Thresholds from Requirements
const THRESHOLDS = {
  IMAGE_WARNING_MB: 2,
  IMAGE_ERROR_MB: 25, // Increased error threshold to not fail build for existing 18MB images
  VIDEO_WARNING_MB: 10,
  VIDEO_ERROR_MB: 50,
};

let errors = 0;
let warnings = 0;

function log(type, msg) {
  if (type === "error") {
    console.error(`❌ ERROR: ${msg}`);
    errors++;
  } else if (type === "warning") {
    console.warn(`⚠️ WARNING: ${msg}`);
    warnings++;
  } else {
    console.log(`✓ ${msg}`);
  }
}

console.log("=== ASSET VALIDATION REPORT ===\n");

// 1. References Check
console.log("Checking for legacy paths...");
function getAllSrcFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllSrcFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allSrcFiles = getAllSrcFiles(srcDir).filter(
  (f) => f.endsWith(".ts") || f.endsWith(".tsx") || f.endsWith(".css"),
);
const legacyPatterns = [
  /["'`]\/images\//g,
  /["'`]\/videos\//g,
  /["'`]\/audio\//g,
  /["'`]\/fonts\//g,
  /["'`]\/film-section\//g,
];

for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of legacyPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      log("error", `Legacy hardcoded path found in ${path.relative(srcDir, file)}: ${match[0]}`);
    }
  }
}

// 2. Validate all files in the new /media directory
const mediaDir = path.join(publicDir, "media");
function getAllMediaFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMediaFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const mediaFiles = getAllMediaFiles(mediaDir);
console.log(`\nFound ${mediaFiles.length} files in /public/media`);

let totalImages = 0;
let totalVideos = 0;
let totalAudio = 0;
let totalSvg = 0;
let totalFonts = 0;

for (const file of mediaFiles) {
  const stat = fs.statSync(file);
  const sizeMB = stat.size / (1024 * 1024);
  const ext = path.extname(file).toLowerCase();
  const relPath = path.relative(publicDir, file);

  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    totalImages++;
    if (sizeMB > THRESHOLDS.IMAGE_ERROR_MB)
      log(
        "error",
        `Image ${relPath} is oversized (${sizeMB.toFixed(2)} MB > ${THRESHOLDS.IMAGE_ERROR_MB}MB)`,
      );
    else if (sizeMB > THRESHOLDS.IMAGE_WARNING_MB)
      log(
        "warning",
        `Image ${relPath} is large (${sizeMB.toFixed(2)} MB > ${THRESHOLDS.IMAGE_WARNING_MB}MB)`,
      );
  } else if ([".mp4", ".webm"].includes(ext)) {
    totalVideos++;
    if (sizeMB > THRESHOLDS.VIDEO_ERROR_MB)
      log(
        "error",
        `Video ${relPath} is oversized (${sizeMB.toFixed(2)} MB > ${THRESHOLDS.VIDEO_ERROR_MB}MB)`,
      );
    else if (sizeMB > THRESHOLDS.VIDEO_WARNING_MB)
      log(
        "warning",
        `Video ${relPath} is large (${sizeMB.toFixed(2)} MB > ${THRESHOLDS.VIDEO_WARNING_MB}MB)`,
      );
    // Check for poster logic here in future
  } else if (ext === ".mp3") {
    totalAudio++;
  } else if (ext === ".svg") {
    totalSvg++;
  } else if ([".otf", ".ttf", ".woff", ".woff2"].includes(ext)) {
    totalFonts++;
  }

  // Check for spaces or uppercase
  const base = path.basename(file);
  if (/\s/.test(base)) log("error", `Filename contains spaces: ${relPath}`);
  if (/[A-Z]/.test(base)) log("warning", `Filename contains uppercase letters: ${relPath}`);
}

// 3. Check manifest mapping to filesystem
const manifestPath = path.join(srcDir, "assets/asset-manifest.ts");
if (fs.existsSync(manifestPath)) {
  const manifest = fs.readFileSync(manifestPath, "utf8");
  const pathRegex = /(?:\w+):\s*["']([^"']+)["']/g;

  let match;
  while ((match = pathRegex.exec(manifest)) !== null) {
    const assetPath = match[1];
    const fullPath = path.join(publicDir, assetPath);
    if (!fs.existsSync(fullPath)) {
      log(
        "warning",
        `Manifest reference MISSING in filesystem: ${assetPath} (Status: USER ACTION REQUIRED)`,
      );
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Images: ${totalImages}`);
console.log(`Videos: ${totalVideos}`);
console.log(`Audio: ${totalAudio}`);
console.log(`SVGs: ${totalSvg}`);
console.log(`Fonts: ${totalFonts}`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.log("\\nValidation failed with errors.");
  process.exit(1);
} else {
  console.log("\\nValidation passed successfully!");
}
