import fs from 'fs/promises';
import path from 'path';

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.ico']);
const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', '.output']);

async function getFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            if (IGNORE_DIRS.has(item.name)) continue;
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                files = files.concat(await getFiles(fullPath));
            } else {
                if (imageExts.has(path.extname(fullPath).toLowerCase())) {
                    files.push(fullPath);
                }
            }
        }
    } catch (e) {}
    return files;
}

async function main() {
    const pubImgs = await getFiles('public');
    const srcImgs = await getFiles('src');
    const allImgs = [...pubImgs, ...srcImgs].map(p => p.replace(/\\/g, '/'));

    const mapping = {};
    const usedNames = new Set();

    for (const img of allImgs) {
        const ext = path.extname(img).toLowerCase();
        let newExt = (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.avif') ? '.webp' : ext;
        if (ext === '.svg') newExt = '.svg';
        
        const isSrc = img.startsWith('src/');
        
        let page = 'misc';
        let section = 'general';
        let variant = '';
        
        const lowerImg = img.toLowerCase();
        
        if (lowerImg.includes('/home/')) page = 'home';
        else if (lowerImg.includes('/about/')) page = 'about';
        else if (lowerImg.includes('/crew/')) page = 'crew';
        else if (lowerImg.includes('/recent-work/') || lowerImg.includes('recent')) page = 'recent-work';
        
        if (lowerImg.includes('hero')) section = 'hero';
        else if (lowerImg.includes('iconic') || lowerImg.includes('editorial')) section = 'editorial';
        else if (lowerImg.includes('team')) section = 'team';
        
        if (lowerImg.includes('desktop')) variant = 'desktop';
        else if (lowerImg.includes('mobile')) variant = 'mobile';
        
        const base = path.basename(img, ext).toLowerCase();
        const matchNum = base.match(/\d+/g);
        let number = '';
        if (matchNum) {
            number = matchNum[matchNum.length - 1].padStart(2, '0');
        }
        
        let newNameBase = `${page}_${section}`;
        if (base.includes('logo')) newNameBase += '_logo';
        else if (base.includes('favicon')) newNameBase += '_favicon';
        else if (base.includes('person')) newNameBase += '_person';
        else if (base.includes('group')) newNameBase += '_group';
        else if (base.includes('parallax')) newNameBase += '_parallax';
        
        if (number) newNameBase += `_${number}`;
        if (variant) newNameBase += `_${variant}`;
        
        let newName = newNameBase + newExt;
        
        let counter = 1;
        while (usedNames.has(newName)) {
            newName = `${newNameBase}_alt${counter}${newExt}`;
            counter++;
        }
        
        usedNames.add(newName);
        
        if (isSrc) {
            mapping[img] = `src/assets/${newName}`;
        } else {
            mapping[img] = `public/media/images/${page}/${section}/${newName}`;
        }
    }

    await fs.writeFile('rename_map.json', JSON.stringify(mapping, null, 2));
    console.log("Created rename_map.json");
}

main();
