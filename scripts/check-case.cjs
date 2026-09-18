const fs = require('fs');
const path = require('path');

const dir = "D:\\New folder (2)\\theswaymvar\\public\\media\\images\\home\\editorial\\";
const files = fs.readdirSync(dir);
console.log(files.find(f => f.toLowerCase().includes('11')));
