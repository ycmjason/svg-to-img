const { join } = require('path');
const puppeteer = require('puppeteer');

const convertSvg = async (svgString, type) => {
  const browser = await puppeteer.launch({ headless: !!process.env.DEBUG });

  const [page] = await browser.pages();

  await page.goto('about:blank');

  await page.addScriptTag({ path: join(__dirname, 'convert-svg.js') });

  const dataUrl = await page.evaluate(svgString => window.convertSvg(svgString, 'png'), svgString);

  return Buffer.from(dataUrl.split(',')[1], 'base64');
};

/*
convertSvg(`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="230" height="230" viewBox="0 0 100 100">
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css?family=Dancing+Script');
    </style>
  </defs>

<rect x="1.75"
  y="1.75"
  rx="50"
  ry="50"
  width="96.5"
  height="96.5"
  fill="#f5beb7"></rect>

<text x="50"
  y="50"
  dx="-2.5"
  dy="2"
  fill="#ffffff"
  font-size="70"
  font-family="Dancing Script"
  text-anchor="middle"
  dominant-baseline="central">F</text>

<rect x="1.75"
  y="1.75"
  rx="50"
  ry="50"
  width="96.5"
  height="96.5"
  fill-opacity="0"
  stroke="#feeeec"
  stroke-width="3.5"></rect>
</svg>`, 'png').then(console.log);
*/

exports.png = (svgString) => convertSvg(svgString, 'png');
exports.jpg = (svgString) => convertSvg(svgString, 'jpeg');
exports.jpeg = (svgString) => convertSvg(svgString, 'jpeg');
