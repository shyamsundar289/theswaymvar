const fs = require('fs');
const path = require('path');

function searchImages(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            searchImages(fullPath);
        } else {
            if (file.includes('special-image')) {
                console.log('Found:', fullPath);
            }
        }
    }
}

searchImages(path.join(process.cwd(), 'public'));
