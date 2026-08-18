const fs = require('fs');
let content = fs.readFileSync('src/assets/swayamvar-icon-gold.svg', 'utf8');

// Remove the solid background path
content = content.replace('<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1000V2000H1000H2000V1000V0H1000H0V1000Z" fill="#F8F3EF"/>\r\n', '');
content = content.replace('<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1000V2000H1000H2000V1000V0H1000H0V1000Z" fill="#F8F3EF"/>\n', '');

// Remove the inverted square boundary from the main path
content = content.replace('d="M0 1000V2000H1000H2000V1000V0H1000H0V1000ZM1059.75', 'd="M1059.75');

fs.writeFileSync('src/assets/swayamvar-icon-gold.svg', content);
console.log("SVG successfully patched!");
