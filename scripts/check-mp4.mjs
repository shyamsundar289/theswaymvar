import fs from 'fs';

function checkFastStart(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(8);
  
  // Read first atom
  fs.readSync(fd, buffer, 0, 8, 0);
  let size = buffer.readUInt32BE(0);
  let type = buffer.toString('ascii', 4, 8);
  
  console.log(`First atom: ${type} (size: ${size})`);
  
  let offset = size;
  
  // Read second atom
  fs.readSync(fd, buffer, 0, 8, offset);
  size = buffer.readUInt32BE(0);
  type = buffer.toString('ascii', 4, 8);
  
  console.log(`Second atom: ${type} (size: ${size})`);
  
  if (type === 'moov') {
    console.log('Faststart is ENABLED (moov is before mdat)');
  } else if (type === 'mdat') {
    console.log('Faststart is DISABLED (mdat is before moov)');
  }
  
  fs.closeSync(fd);
}

checkFastStart('d:\\New folder (2)\\theswaymvar\\public\\video-cover\\11.mp4');
