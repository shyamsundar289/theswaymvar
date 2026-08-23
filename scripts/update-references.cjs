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
    // Inject import if not exists
    if (!content.includes("import { assets }")) {
      // Find the depth
      const depth = filePath.split(path.sep).length - srcDir.split(path.sep).length;
      let relativePrefix = "../".repeat(depth - 1) || "./";
      content = `import { assets } from "${relativePrefix}assets/asset-manifest";\n` + content;
    }
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Updated", filePath);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

// 1. Data files
replaceInFile(path.join(srcDir, "data/site.ts"), [
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
  { from: '"/images/Recent03.webp"', to: "assets.recentWork.recent03" },
  { from: '"/videos/wedding.mp4"', to: "assets.videos.background.wedding" },
  { from: '"/videos/celebration.mp4"', to: "assets.videos.background.celebration" },
  { from: '"/videos/prewedding.mp4"', to: "assets.videos.background.prewedding" },
  { from: '"/videos/portraits.mp4"', to: "assets.videos.background.portraits" },
]);

replaceInFile(path.join(srcDir, "data/images.ts"), [
  { from: '"/images/DSCF0463 copy.webp"', to: "assets.misc.dscf0463" },
  { from: '"/images/4.webp"', to: "assets.misc.image4" },
  { from: '"/images/5.webp"', to: "assets.misc.image5" },
  { from: '"/images/6.webp"', to: "assets.misc.image6" },
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
  { from: '"/images/Recent03.webp"', to: "assets.recentWork.recent03" },
]);

replaceInFile(path.join(srcDir, "data/films.ts"), [
  { from: '"/videos/celebration.mp4"', to: "assets.videos.background.celebration" },
  { from: '"/videos/rituals.mp4"', to: "assets.videos.background.rituals" },
  { from: '"/videos/prewedding.mp4"', to: "assets.videos.background.prewedding" },
  { from: '"/videos/portraits.mp4"', to: "assets.videos.background.portraits" },
  { from: '"/videos/videoseen.mp4"', to: "assets.videos.background.videoseen" },
  { from: '"/videos/wedding.mp4"', to: "assets.videos.background.wedding" },
]);

replaceInFile(path.join(srcDir, "data/weddingArchive.ts"), [
  { from: '"/videos/celebration.mp4"', to: "assets.videos.background.celebration" },
  { from: '"/videos/rituals.mp4"', to: "assets.videos.background.rituals" },
  { from: '"/videos/portraits.mp4"', to: "assets.videos.background.portraits" },
  { from: '"/videos/prewedding.mp4"', to: "assets.videos.background.prewedding" },
  { from: '"/videos/videoseen.mp4"', to: "assets.videos.background.videoseen" },
  { from: '"/videos/wedding.mp4"', to: "assets.videos.background.wedding" },
]);

replaceInFile(path.join(srcDir, "data/film-library.ts"), [
  { from: '"/videos/celebration.mp4"', to: "assets.videos.background.celebration" },
  { from: '"/videos/prewedding.mp4"', to: "assets.videos.background.prewedding" },
  { from: '"/videos/portraits.mp4"', to: "assets.videos.background.portraits" },
  { from: '"/videos/rituals.mp4"', to: "assets.videos.background.rituals" },
  { from: '"/videos/videoseen.mp4"', to: "assets.videos.background.videoseen" },
  { from: '"/videos/ivory-series..mp4"', to: "assets.videos.background.ivorySeries" },
  { from: '"/videos/wedding.mp4"', to: "assets.videos.background.wedding" },
  { from: '"/videos/Herovideo.mp4"', to: "assets.videos.hero" },
  { from: '"/videos/The_Swayamvar (2).mp4"', to: "assets.videos.showcase" },
  { from: '"/film-section/video01.mp4"', to: "assets.videos.films.film01" },
  { from: '"/film-section/video03.mp4"', to: "assets.videos.films.film03" },
  { from: '"/film-section/video05.mp4"', to: "assets.videos.films.film05" },
  { from: '"/film-section/video06.mp4"', to: "assets.videos.films.film06" },
  { from: '"/film-section/video07.mp4"', to: "assets.videos.films.film07" },
  { from: '"/film-section/video08.mp4"', to: "assets.videos.films.film08" },
  { from: '"/film-section/video09.mp4"', to: "assets.videos.films.film09" },
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
  { from: '"/images/Recent03.webp"', to: "assets.recentWork.recent03" },
  { from: '"/images/4.webp"', to: "assets.misc.image4" },
  { from: '"/images/5.webp"', to: "assets.misc.image5" },
  { from: '"/images/6.webp"', to: "assets.misc.image6" },
  { from: '"/images/DSCF0463 copy.webp"', to: "assets.misc.dscf0463" },
]);

replaceInFile(path.join(srcDir, "data/photography-images.ts"), [
  { from: '"/images/crew/pic1.jpg"', to: "assets.crew.getMemberPhoto(1)" },
  { from: '"/images/crew/pic2.jpg"', to: "assets.crew.getMemberPhoto(2)" },
  { from: '"/images/crew/pic3.jpg"', to: "assets.crew.getMemberPhoto(3)" },
  { from: '"/images/crew/pic4.jpg"', to: "assets.crew.getMemberPhoto(4)" },
  { from: '"/images/crew/pic5.jpg"', to: "assets.crew.getMemberPhoto(5)" },
  { from: '"/images/crew/pic6.jpg"', to: "assets.crew.getMemberPhoto(6)" },
  { from: '"/images/crew/pic7.jpg"', to: "assets.crew.getMemberPhoto(7)" },
  { from: '"/images/crew/pic8.jpg"', to: "assets.crew.getMemberPhoto(8)" },
  { from: '"/images/crew/pic9.jpg"', to: "assets.crew.getMemberPhoto(9)" },
  { from: '"/images/crew/pic10.jpg"', to: "assets.crew.getMemberPhoto(10)" },
  { from: '"/images/crew/pic11.jpg"', to: "assets.crew.getMemberPhoto(11)" },
  { from: '"/images/crew/pic12.jpg"', to: "assets.crew.getMemberPhoto(12)" },
  { from: '"/images/crew/pic13.jpg"', to: "assets.crew.getMemberPhoto(13)" },
  { from: '"/images/crew/pic14.jpg"', to: "assets.crew.getMemberPhoto(14)" },
  { from: '"/images/crew/pic15.jpg"', to: "assets.crew.getMemberPhoto(15)" },
  { from: '"/images/crew/pic16.jpg"', to: "assets.crew.getMemberPhoto(16)" },
  { from: '"/images/crew/pic17.jpg"', to: "assets.crew.getMemberPhoto(17)" },
  { from: '"/images/crew/pic18.jpg"', to: "assets.crew.getMemberPhoto(18)" },
]);

// 2. Components
replaceInFile(path.join(srcDir, "components/site/Hero.tsx"), [
  { from: '"/images/DSCF0463 copy.webp"', to: "assets.misc.dscf0463" },
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/4.webp"', to: "assets.misc.image4" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
  { from: '"/images/5.webp"', to: "assets.misc.image5" },
  { from: '"/images/Recent03.webp"', to: "assets.recentWork.recent03" },
  { from: '"/images/6.webp"', to: "assets.misc.image6" },
]);

replaceInFile(path.join(srcDir, "components/site/AnimatedHero.tsx"), [
  { from: '"/images/Home/home-hero-desktop-03.png"', to: "assets.home.hero.desktop" },
  { from: '"/images/Home/home-hero-mobile-03.png"', to: "assets.home.hero.mobile" },
]);

replaceInFile(path.join(srcDir, "components/site/Header.tsx"), [
  { from: '"/images/swamyvar_logo.svg"', to: "assets.svg.logo" },
]);

replaceInFile(path.join(srcDir, "components/site/StoryTimeline.tsx"), [
  { from: '"/images/crew/special-image-01.jpg"', to: "assets.crew.getSpecialImage(1)" },
  { from: '"/images/crew/special-image-02.jpg"', to: "assets.crew.getSpecialImage(2)" },
  { from: '"/images/crew/special-image-03.jpg"', to: "assets.crew.getSpecialImage(3)" },
  { from: '"/images/crew/special-image-04.jpg"', to: "assets.crew.getSpecialImage(4)" },
  { from: '"/images/crew/special-image-05.jpg"', to: "assets.crew.getSpecialImage(5)" },
]);

replaceInFile(path.join(srcDir, "components/site/CrewSection.tsx"), [
  { from: "`/images/crew/pic${i + 1}.jpg`", to: "assets.crew.getMemberPhoto(i + 1)" },
]);

replaceInFile(path.join(srcDir, "routes/crew.tsx"), [
  { from: "`/images/crew/pic${num}.jpg`", to: "assets.crew.getMemberPhoto(num)" },
  { from: "`/images/crew/pic${i + 1}.jpg`", to: "assets.crew.getMemberPhoto(i + 1)" },
  { from: '"/images/crew/group.png"', to: "assets.crew.group" },
  { from: '"/videos/videoseen.mp4"', to: "assets.videos.background.videoseen" },
]);

replaceInFile(path.join(srcDir, "routes/index.tsx"), [
  { from: '"/audio/cinematic-wedding.mp3"', to: "assets.audio.music.cinematicWedding" },
  { from: '"/images/parallax-bg.jpg"', to: "assets.misc.parallaxBg" },
  { from: '"/images/swamyvar_logo.svg"', to: "assets.svg.logo" },
]);

replaceInFile(path.join(srcDir, "routes/about.tsx"), [
  { from: '"/images/swamyvar_logo.svg"', to: "assets.svg.logo" },
  { from: '"/images/about/person.jpg"', to: "assets.about.person" },
  { from: '"/images/about/Team_photo.jpg"', to: "assets.about.teamPhoto" },
  { from: '"/images/crew/pic1.jpg"', to: "assets.crew.getMemberPhoto(1)" },
  { from: '"/images/crew/pic2.jpg"', to: "assets.crew.getMemberPhoto(2)" },
  { from: '"/images/crew/pic4.jpg"', to: "assets.crew.getMemberPhoto(4)" },
  { from: '"/images/crew/pic7.jpg"', to: "assets.crew.getMemberPhoto(7)" },
  { from: '"/images/crew/pic3.jpg"', to: "assets.crew.getMemberPhoto(3)" },
]);

replaceInFile(path.join(srcDir, "routes/__root.tsx"), [
  { from: '"/images/Favicon_icon.png"', to: "assets.misc.favicon" },
]);

replaceInFile(path.join(srcDir, "routes/services.tsx"), [
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
]);

replaceInFile(path.join(srcDir, "routes/videography.tsx"), [
  { from: '"/videos/Herovideo.mp4"', to: "assets.videos.hero" },
]);

replaceInFile(path.join(srcDir, "components/photography/PhotographyGridSection.tsx"), [
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
  { from: '"/images/Recent02.webp"', to: "assets.recentWork.recent02" },
  { from: '"/images/Recent03.webp"', to: "assets.recentWork.recent03" },
]);

replaceInFile(path.join(srcDir, "components/film/FilmStickyIntro.tsx"), [
  { from: '"/videos/Herovideo.mp4"', to: "assets.videos.hero" },
  { from: '"/images/Recent01.webp"', to: "assets.recentWork.recent01" },
]);

// 3. For EditorialCollage and LittleSnap, we need a bit more careful replacement
const ecPath = path.join(srcDir, "components/site/EditorialCollage.tsx");
if (fs.existsSync(ecPath)) {
  let ec = fs.readFileSync(ecPath, "utf8");
  ec = ec.replace(
    /`\/images\/Home\/iconic 14\/Desktop\/\${num}\.png`/g,
    "assets.home.editorial[num - 1].desktop",
  );
  ec = ec.replace(
    /`\/images\/Home\/iconic 14\/\${num}\.png`/g,
    "assets.home.editorial[num - 1].mobile",
  );
  if (!ec.includes("import { assets }"))
    ec = `import { assets } from "../../assets/asset-manifest";\n` + ec;
  fs.writeFileSync(ecPath, ec, "utf8");
  console.log("Updated EditorialCollage.tsx");
}

const lsPath = path.join(srcDir, "routes/little-snap.tsx");
if (fs.existsSync(lsPath)) {
  let ls = fs.readFileSync(lsPath, "utf8");
  for (let i = 1; i <= 14; i++) {
    ls = ls.replace(
      `"/images/Home/iconic 14/Desktop/${i}.png"`,
      `assets.home.editorial[${i - 1}].desktop`,
    );
    ls = ls.replace(`"/images/Home/iconic 14/${i}.png"`, `assets.home.editorial[${i - 1}].mobile`);
  }
  if (!ls.includes("import { assets }"))
    ls = `import { assets } from "../assets/asset-manifest";\n` + ls;
  fs.writeFileSync(lsPath, ls, "utf8");
  console.log("Updated little-snap.tsx");
}

// 4. Update CSS
const cssPath = path.join(srcDir, "styles.css");
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, "utf8");
  css = css.replace(
    /\/fonts\/OrangeAvenueDEMO-Regular\.otf/g,
    "/media/fonts/orange-avenue-regular.otf",
  );
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("Updated styles.css");
}
