const fs = require("fs");
const path = require("path");
const srcDir = path.join(__dirname, "../src");

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

const files = getAllSrcFiles(srcDir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");

  const regex = /([a-zA-Z0-9_]+)=assets\.([a-zA-Z0-9_.()]+)/g;
  let newContent = content.replace(regex, "$1={assets.$2}");

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, "utf8");
    console.log("Fixed JSX in", path.relative(srcDir, file));
  }
}
