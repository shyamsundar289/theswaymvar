import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple regex to extract all string values starting with /media/ or /images/
const content = fs.readFileSync('src/assets/asset-manifest.ts', 'utf8');
const regex = /['"`](\/(media|images)[^'"`]+)['"`]/g;

let match;
let missing = 0;
let total = 0;

while ((match = regex.exec(content)) !== null) {
    const assetPath = match[1];
    // Asset path is like /media/images/home/hero/home_hero_03_desktop.webp
    // Physical path is public + assetPath
    const physicalPath = path.join('public', assetPath);
    
    total++;
    if (!fs.existsSync(physicalPath)) {
        console.error(`MISSING ASSET: ${assetPath}`);
        missing++;
    }
}

if (missing === 0) {
    console.log(`Validation PASSED: All ${total} assets found.`);
} else {
    console.log(`Validation FAILED: ${missing}/${total} assets missing.`);
}
