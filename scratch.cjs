const path = require('path');
try {
  console.log(path.resolve(undefined, "./src"));
} catch(e) {
  console.error("Error:", e.message);
}
