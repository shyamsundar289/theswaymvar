const fs = require("fs");
const path = require("path");

const auditFile = path.join(__dirname, "../audit-report.json");
const refsFile = path.join(__dirname, "../references-report.json");

const audit = JSON.parse(fs.readFileSync(auditFile, "utf8"));
const refs = JSON.parse(fs.readFileSync(refsFile, "utf8"));

const mapping = [];
const oldPathsSet = new Set();

function formatName(name) {
  return name
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "")
    .toLowerCase();
}

function getNewPath(old) {
  const p = old.toLowerCase();
  const ext = path.extname(old).toLowerCase();
  const base = formatName(path.basename(old, ext)) + ext;

  if (p.includes("fonts/")) return "media/fonts/" + base;
  if (p.includes("audio/")) return "media/audio/music/" + base;
  if (p.includes("film-section/")) return "media/videos/films/" + base.replace("video", "film-");

  if (p.includes("videos/")) {
    if (base.includes("hero")) return "media/videos/hero/" + base;
    if (base.includes("swayamvar")) return "media/videos/showcase/" + base;
    return "media/videos/background/" + base;
  }

  if (p.endsWith(".svg")) {
    if (base.includes("logo")) return "media/svg/logo/" + base;
    return "media/svg/icons/" + base;
  }

  if (p.includes("iconic 14/desktop")) {
    const num = path.basename(p, ext).padStart(2, "0");
    return `media/images/home/editorial/iconic-${num}-desktop${ext}`;
  }

  if (p.includes("iconic 14/mobile")) {
    const num = path.basename(p, ext).padStart(2, "0");
    return `media/images/home/editorial/iconic-${num}-mobile${ext}`;
  }

  if (p.includes("home-hero-desktop")) return "media/images/home/hero/hero-03-desktop.png";
  if (p.includes("home-hero-mobile")) return "media/images/home/hero/hero-03-mobile.png";

  if (p.includes("recent")) return "media/images/recent-work/" + base;
  if (p.includes("about/")) return "media/images/about/" + base;
  if (p.includes("crew/")) return "media/images/crew/" + base;

  return "media/images/misc/" + base;
}

for (const file of audit) {
  const oldPath = "public/" + file.path;
  const newPath = "public/" + getNewPath(file.path);
  let refsList = [];
  refs.valid.forEach((v) => {
    if (v.asset.replace(/^\//, "").toLowerCase() === file.path.toLowerCase()) refsList.push(v.file);
  });

  mapping.push({
    oldPath,
    newPath,
    type: file.ext.toUpperCase().replace(".", ""),
    size: file.size,
    references: [...new Set(refsList)],
    status: "MIGRATED",
  });
  oldPathsSet.add(file.path.toLowerCase());
}

for (const broken of refs.broken) {
  const asset = broken.asset.replace(/^\//, "");
  if (!oldPathsSet.has(asset.toLowerCase())) {
    oldPathsSet.add(asset.toLowerCase());
    if (asset.includes("${")) {
      mapping.push({
        oldPath: "public/" + asset,
        newPath: "MISSING (Dynamic path, manual fix required)",
        type: "UNKNOWN",
        size: 0,
        references: [broken.file],
        status: "USER ACTION REQUIRED",
      });
    } else {
      mapping.push({
        oldPath: "public/" + asset,
        newPath: "public/" + getNewPath(asset),
        type: path.extname(asset).toUpperCase().replace(".", "") || "UNKNOWN",
        size: 0,
        references: [broken.file],
        status: "MISSING - USER ACTION REQUIRED",
      });
    }
  }
}

let md = `# Asset Migration Map\n\n| OLD PATH | NEW PATH | TYPE | REFERENCES | STATUS |\n| -------- | -------- | ---- | ---------- | ------ |\n`;
for (const m of mapping) {
  md += `| \`${m.oldPath}\` | \`${m.newPath}\` | ${m.type} | ${m.references.length || 0} | ${m.status} |\n`;
}
fs.mkdirSync(path.join(__dirname, "../docs"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "../docs/asset-migration-map.md"), md, "utf8");
fs.writeFileSync(
  path.join(__dirname, "../migration-data.json"),
  JSON.stringify(mapping, null, 2),
  "utf8",
);
