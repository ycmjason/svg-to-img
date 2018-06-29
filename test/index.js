const { join } = require('path');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const opn = require('opn');

const svg2img = require('..');

(async () => {
  const svg = readFileSync(join(__dirname, 'test.svg'), 'utf8');
  const png = await svg2img.png(svg);
  const jpg = await svg2img.jpg(svg);

  const html = `
  <html>
    <head>
    </head>
    <body>
    <h1>SVG</h1>
    <img src="/test.svg">
    <p>
    <h1>PNG</h1>
    <img src="/test.png">
    <p>
    <h1>JPG</h1>
    <img src="/test.jpg">
    </body>
  </html>
  `;

  createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/test.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.end(svg);
    }

    if (req.url === '/test.png') {
      res.setHeader('Content-Type', 'image/png');
      return res.end(png);
    }

    if (req.url === '/test.jpg') {
      res.setHeader('Content-Type', 'image/jpeg');
      return res.end(jpg);
    }

    res.end(html);
  }).listen(5000, () => opn('http://localhost:5000'));
})();
