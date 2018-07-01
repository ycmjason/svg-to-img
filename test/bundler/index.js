const { rollup } = require('rollup');
const { readFileSync } = require('fs');
const svg = readFileSync(require.resolve('../test.svg'), 'utf8');

module.exports = async () => {
  const { code } = await rollup({
    input: require.resolve('./bundle_entry.js'),
  }).then(r => r.generate({ format: 'iife' }));

  return (req, res) => {
    res.end(`<html>
<head></head>
<body>
  <script>window.svg = \`${svg}\`;</script>
  <script>${code}</script>
</body>
</html>`);
  };
};
