const fs = require('fs');
const path = require('path');

const dir = "D:\\New folder (2)\\theswaymvar\\public\\media\\images\\home\\editorial\\";

const filesToRename = [
  { old: "home_editorial_11_desktop.webp.png", new: "home_editorial_11_desktop.webp" },
  { old: "home_editorial_11_mobile.webp.png", new: "home_editorial_11_mobile.webp" }
];

filesToRename.forEach(({ old: oldName, new: newName }) => {
  const oldPath = path.join(dir, oldName);
  const newPath = path.join(dir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${oldName} to ${newName}`);
  } else {
    console.log(`${oldName} not found.`);
  }
});
