// scripts/run-build.cjs
// Helper to run vite build from the correct project directory.
const { execSync } = require("child_process");
const path = require("path");

const projectDir = path.resolve(__dirname, "..");

try {
  console.log(`Building from: ${projectDir}`);
  execSync("npx vite build", {
    cwd: projectDir,
    stdio: "inherit",
    env: { ...process.env },
  });
} catch (err) {
  process.exit(err.status || 1);
}
