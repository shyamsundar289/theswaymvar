import https from 'https';

https.get('https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/11.mp4', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
