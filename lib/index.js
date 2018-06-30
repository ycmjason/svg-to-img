const { join } = require('path');
const puppeteer = require('puppeteer');
const Jimp = require('jimp');

const scale = (buffer, factor) => new Promise(async (res, rej) => {
  const image = await Jimp.read(buffer);
  image.scale(0.5).getBuffer(Jimp.AUTO, (err, buffer) => {
    if (err) return rej(err);
    res(buffer);
  });
});

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

  await page.addScriptTag({ path: join(__dirname, '../dist/svg-to-img.js') });

  const dataUrl = await page.evaluate(async ({ svgString, type }) => {
    return await window.svgToImg(svgString, type, { scale: 2 });
  }, { svgString, type });

  return await scale(Buffer.from(dataUrl.split(',')[1], 'base64'));
};

exports.png = (svgString) => convertSvg(svgString, 'png');
exports.jpg = (svgString) => convertSvg(svgString, 'jpeg');
exports.jpeg = (svgString) => convertSvg(svgString, 'jpeg');
