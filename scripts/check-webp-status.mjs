import https from 'https';

https.get('https://theswaymvar-eweb.vercel.app/video-cover/videocover1.webp', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
