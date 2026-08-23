const fs = require("fs");
const path = require("path");
const srcDir = path.join(__dirname, "../src");

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  for (const r of replacements) {
    if (content.includes(r.from)) {
      content = content.replace(new RegExp(escapeRegExp(r.from), "g"), r.to);
      changed = true;
    }
  }
  if (changed) {
    if (!content.includes("import { assets }")) {
      const depth = filePath.split(path.sep).length - srcDir.split(path.sep).length;
      let relativePrefix = "../".repeat(depth - 1) || "./";
      content = `import { assets } from "${relativePrefix}assets/asset-manifest";\n` + content;
    }
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Updated", filePath);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&");
}

replaceInFile(path.join(srcDir, "components/film/_reference/CinematicArchive.mock.tsx"), [
  { from: '"/videos/wedding.mp4"', to: "assets.videos.background.wedding" },
  { from: '"/videos/celebration.mp4"', to: "assets.videos.background.celebration" },
  { from: '"/videos/portraits.mp4"', to: "assets.videos.background.portraits" },
  { from: '"/videos/prewedding.mp4"', to: "assets.videos.background.prewedding" },
  { from: '"/videos/rituals.mp4"', to: "assets.videos.background.rituals" },
  { from: '"/videos/videoseen.mp4"', to: "assets.videos.background.videoseen" },
]);

replaceInFile(path.join(srcDir, "components/site/MarshallSpeaker.tsx"), [
  { from: '"/images/logo.png"', to: "assets.misc.speakerLogo" },
]);

replaceInFile(path.join(srcDir, "components/site/RedTelephoneSection.tsx"), [
  { from: '"/images/red-rotary-telephone.jpg"', to: "assets.misc.redTelephone" },
]);

replaceInFile(path.join(srcDir, "data/site.ts"), [
  { from: "'/videos/celebration.mp4'", to: "assets.videos.background.celebration" },
  { from: "'/videos/prewedding.mp4'", to: "assets.videos.background.prewedding" },
  { from: "'/videos/portraits.mp4'", to: "assets.videos.background.portraits" },
  { from: "'/videos/wedding.mp4'", to: "assets.videos.background.wedding" },
]);
