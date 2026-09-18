const { execSync } = require('child_process');
try {
  const status = execSync('git status', { encoding: 'utf-8' });
  console.log("GIT STATUS:\n", status);
  const log = execSync('git log -n 3 --oneline', { encoding: 'utf-8' });
  console.log("GIT LOG:\n", log);
} catch (e) {
  console.error("Error:", e.message);
}
