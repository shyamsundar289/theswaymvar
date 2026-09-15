const sharp = require('sharp');
sharp('public/little snap/14_grid/13.heic')
  .toFile('public/little snap/14_grid/13.jpg')
  .then(() => console.log('Converted successfully'))
  .catch(e => console.error('Error converting:', e));
