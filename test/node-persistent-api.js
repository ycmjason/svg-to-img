const { join } = require('path');
const { readFileSync } = require('fs');

const svgToImg = require('..')();

module.exports = async () => {
  const svg = readFileSync(join(__dirname, 'test.svg'), 'utf8');
  const png = (await svgToImg.png(svg)).toString('base64');
  const jpg = (await svgToImg.jpg(svg)).toString('base64');
  await svgToImg.close();

  return (req, res) => {
    const html = `
    <html>
      <head>
      </head>
      <body>
      <div>
        <h1>SVG</h1>
        <img src="data:image/svg+xml,${encodeURIComponent(svg)}">
      </div>
      <div>
        <h1>PNG</h1>
        <img src="data:image/png;base64,${png}">
      </div>
      <div>
        <h1>JPEG</h1>
        <img src="data:image/jpeg;base64,${jpg}">
      </div>
      </body>
    </html>
    `;

    res.end(html);
  };
};
