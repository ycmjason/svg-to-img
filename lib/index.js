const { join } = require('path');
const puppeteer = require('puppeteer');

const convertSvg = async (svgString, type) => {
  const browser = await puppeteer.launch({
    headless: !process.env.DEBUG,
    devtools: !!process.env.DEBUG,
    handleSIGINT: !process.env.DEBUG,
    handleSIGTERM: !process.env.DEBUG,
    handleSIGHUP: !process.env.DEBUG,
  });


  const [page] = await browser.pages();

  await page.goto('about:blank');

  await page.addScriptTag({ path: join(__dirname, 'convert-svg.js') });

  const dataUrl = await page.evaluate(async ({ svgString, type }) => {
    return await window.convertSvg(svgString, type);
  }, { svgString, type });

  return Buffer.from(dataUrl.split(',')[1], 'base64');
};

exports.png = (svgString) => convertSvg(svgString, 'png');
exports.jpg = (svgString) => convertSvg(svgString, 'jpeg');
exports.jpeg = (svgString) => convertSvg(svgString, 'jpeg');
