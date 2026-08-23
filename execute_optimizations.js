import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', '.output']);
const codeExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss']);

async function getCodeFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            if (IGNORE_DIRS.has(item.name)) continue;
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                files = files.concat(await getCodeFiles(fullPath));
            } else {
                if (codeExts.has(path.extname(fullPath).toLowerCase())) {
                    files.push(fullPath);
                }
            }
        }
    } catch (e) {}
    return files;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

async function main() {
    console.log("Loading mapping...");
    const mapping = JSON.parse(await fs.readFile('rename_map.json', 'utf8'));
    
    console.log("Loading code files...");
    const codeFiles = await getCodeFiles('src');
    const rootFiles = ['package.json', 'tsconfig.json']; // add any others if needed
    for (const f of rootFiles) {
        try { await fs.access(f); codeFiles.push(f); } catch (e) {}
    }

    const fileContents = {};
    for (const file of codeFiles) {
        fileContents[file] = await fs.readFile(file, 'utf8');
    }

    // Prepare replacements
    // Sort mapping by oldPath length descending to prevent partial replacements
    const sortedMappings = Object.entries(mapping).sort((a, b) => b[0].length - a[0].length);

    let replacedCount = 0;

    for (const [oldPath, newPath] of sortedMappings) {
        const oldCodePath = oldPath.replace(/^public/, '');
        const newCodePath = newPath.replace(/^public/, '');
        
        const oldCodePathEncoded = oldCodePath.replace(/ /g, '%20');
        const oldBasename = path.basename(oldPath);
        const newBasename = path.basename(newPath);
        
        const oldExt = path.extname(oldPath);
        const newExt = path.extname(newPath);
        const oldBaseNoExt = path.basename(oldPath, oldExt);
        const newBaseNoExt = path.basename(newPath, newExt);

        for (const file of codeFiles) {
            let content = fileContents[file];
            let originalContent = content;
            
            // 1. Replace exact public paths
            const regex1 = new RegExp(escapeRegExp(oldCodePath), 'gi');
            content = content.replace(regex1, newCodePath);
            
            // 2. Replace encoded public paths
            const regex2 = new RegExp(escapeRegExp(oldCodePathEncoded), 'gi');
            content = content.replace(regex2, newCodePath);

            // 3. For src imports like `import img from "@/assets/DSC09937copy.jpg"`
            if (oldPath.startsWith('src/assets/')) {
                const regex3 = new RegExp(escapeRegExp(oldBasename), 'gi');
                content = content.replace(regex3, newBasename);
                
                // Also if they imported without extension? Rarely happens for images, but just in case
            }

            if (content !== originalContent) {
                fileContents[file] = content;
                replacedCount++;
            }
        }
    }

    console.log(`Updated paths in ${replacedCount} file usages. Writing files...`);
    for (const file of codeFiles) {
        await fs.writeFile(file, fileContents[file]);
    }

    console.log("Processing images...");
    for (const [oldPath, newPath] of sortedMappings) {
        try {
            await fs.mkdir(path.dirname(newPath), { recursive: true });
            
            const ext = path.extname(oldPath).toLowerCase();
            const isWebpTarget = (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.avif');
            
            if (isWebpTarget) {
                const isDesktop = newPath.includes('desktop') || newPath.includes('hero');
                const isMobile = newPath.includes('mobile');
                const maxWidth = isDesktop ? 1920 : (isMobile ? 800 : null);
                
                let s = sharp(oldPath);
                const metadata = await s.metadata();
                
                if (maxWidth && metadata.width > maxWidth) {
                    s = s.resize({ width: maxWidth, withoutEnlargement: true });
                }
                
                await s.webp({ quality: 80 }).toFile(newPath);
            } else {
                // Just copy SVGs or already webp
                await fs.copyFile(oldPath, newPath);
            }
            
            // Remove old file if path changed
            if (oldPath !== newPath) {
                await fs.unlink(oldPath);
            }
            console.log(`Processed: ${oldPath} -> ${newPath}`);
        } catch (e) {
            console.error(`Error processing ${oldPath}: ${e.message}`);
        }
    }
    
    console.log("Done.");
}

main();
