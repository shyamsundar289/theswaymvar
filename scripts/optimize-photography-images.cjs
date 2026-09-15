/**
 * optimize-photography-images.cjs
 *
 * Generates optimized WebP variants of all Photography page images.
 *
 * Usage:
 *   node scripts/optimize-photography-images.cjs           # skip existing
 *   node scripts/optimize-photography-images.cjs --force   # regenerate all
 *
 * Output structure:
 *   public/photography-optimized/
 *     <couple-dir>/
 *       <subdir>/
 *         <filename>-400w.webp
 *         <filename>-800w.webp
 *         <filename>-1200w.webp
 *         <filename>-1600w.webp
 *
 * Original files in /public/<couple>/ are NEVER modified or deleted.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ───────────────────────────────────────────────────────────────
// Configuration
// ───────────────────────────────────────────────────────────────

const WIDTHS = [400, 800, 1200, 1600];
const WEBP_QUALITY = 82;
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "photography-optimized");

// Only these directories contain Photography page images
const SOURCE_DIRS = [
  "Varsha & Shivam",
  "Pooja & Suryaprakash",
  "Khushboo & Jay",
  "Bhawna & Abhishek",
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const FORCE = process.argv.includes("--force");

// ───────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

function stripExtension(filename) {
  const ext = path.extname(filename);
  return filename.slice(0, -ext.length);
}

// ───────────────────────────────────────────────────────────────
// Main
// ───────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║   Photography Image Optimizer                      ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log();
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Widths: ${WIDTHS.join(", ")}px`);
  console.log(`  WebP quality: ${WEBP_QUALITY}`);
  console.log(`  Force regenerate: ${FORCE}`);
  console.log();

  // Collect all source images
  const allImages = [];
  for (const dirName of SOURCE_DIRS) {
    const dirPath = path.join(PUBLIC_DIR, dirName);
    const images = walkDir(dirPath);
    allImages.push(
      ...images.map((img) => ({
        absolutePath: img,
        relativePath: path.relative(PUBLIC_DIR, img),
      })),
    );
  }

  console.log(
    `  Found ${allImages.length} source images across ${SOURCE_DIRS.length} directories.\n`,
  );

  let generated = 0;
  let skipped = 0;
  let errors = 0;
  let totalOutputBytes = 0;

  for (let i = 0; i < allImages.length; i++) {
    const { absolutePath, relativePath } = allImages[i];
    const relDir = path.dirname(relativePath);
    const baseName = stripExtension(path.basename(relativePath));

    process.stdout.write(`  [${i + 1}/${allImages.length}] ${relativePath} ... `);

    for (const width of WIDTHS) {
      const outDir = path.join(OUTPUT_DIR, relDir);
      const outFile = path.join(outDir, `${baseName}-${width}w.webp`);

      if (!FORCE && fs.existsSync(outFile)) {
        skipped++;
        totalOutputBytes += fs.statSync(outFile).size;
        continue;
      }

      try {
        fs.mkdirSync(outDir, { recursive: true });

        await sharp(absolutePath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(outFile);

        const stat = fs.statSync(outFile);
        totalOutputBytes += stat.size;
        generated++;
      } catch (err) {
        errors++;
        console.error(`\n    ✗ Error at ${width}w: ${err.message}`);
      }
    }

    process.stdout.write("✓\n");
  }

  console.log();
  console.log("  ════════════════════════════════════════════════════");
  console.log(`  ✓ Images processed:     ${allImages.length}`);
  console.log(`  ✓ Variants generated:   ${generated}`);
  console.log(`  ○ Variants skipped:     ${skipped} (already exist)`);
  if (errors > 0) {
    console.log(`  ✗ Errors:               ${errors}`);
  }
  console.log(`  ✓ Total optimized size: ${(totalOutputBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  ✓ Output directory:     ${OUTPUT_DIR}`);
  console.log("  ════════════════════════════════════════════════════");
  console.log();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
