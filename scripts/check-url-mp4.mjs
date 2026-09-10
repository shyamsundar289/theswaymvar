import https from 'https';

https.get('https://theswaymvar-eweb.vercel.app/video-cover/11.mp4', (res) => {
  let body = Buffer.alloc(0);
  res.on('data', (d) => {
    body = Buffer.concat([body, d]);
  });
  res.on('end', () => {
    console.log('Headers:', res.headers);
    console.log('Body:', body.toString('utf8'));
  });
}).on('error', (e) => {
  console.error(e);
});
