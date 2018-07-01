import svgToImg from '../../dist/svg-to-img.esm.js';
const svg = window.svg;

const div = document.createElement('div');
div.innerHTML = `<h1>SVG</h1><img src="data:image/svg+xml,${encodeURIComponent(svg)}">`;
document.body.appendChild(div);

svgToImg(svg, 'png').then(dataUrl => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h1>PNG</h1>
    <img src="${dataUrl}">
  `;
  document.body.appendChild(div);
});

svgToImg(svg, 'jpeg').then(dataUrl => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h1>JPEG</h1>
    <img src="${dataUrl}">
  `;
  document.body.appendChild(div);
});
