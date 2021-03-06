const { readFileSync } = require('fs');
const svg = readFileSync(require.resolve('./test.svg'), 'utf8');

module.exports = () => (req, res) => {
  res.end(`<html>
<head></head>
<body>
  <script>${readFileSync(require.resolve('../dist/svg-to-img-full.umd.js'))}</script>
  <script>
  const div = document.createElement('div');
  div.innerHTML = \`<h1>SVG</h1>${svg}\`;
  document.body.appendChild(div);

  const svg = \`${svg}\`;
  SvgToImg.png(svg).then(dataUrl => {
    const div = document.createElement('div');
    div.innerHTML = \`
      <h1>PNG</h1>
      <img src="\${dataUrl}">
    \`;
    document.body.appendChild(div);
  });

  SvgToImg.jpg(svg).then(dataUrl => {
    const div = document.createElement('div');
    div.innerHTML = \`
      <h1>JPEG</h1>
      <img src="\${dataUrl}">
    \`;
    document.body.appendChild(div);
  });
  </script>
</body>
</html>`);
};
