const puppeteer = require('puppeteer');

const convertSvg = async (svgString, type) => {
  const browser = await puppeteer.launch({
    headless: !process.env.SVG_TO_IMG_DEBUG,
    devtools: !!process.env.SVG_TO_IMG_DEBUG,
  });


  const [page] = await browser.pages();

  await page.goto('about:blank');

  await page.addScriptTag({ path: require.resolve('../dist/svg-to-img-full.umd.js') });

  const dataUrl = await page.evaluate(async ({ svgString, type }) => {
    return await window.SvgToImg[type](svgString);
  }, { svgString, type });

  return Buffer.from(dataUrl.split(',')[1], 'base64');
};

exports.png = (svgString) => convertSvg(svgString, 'png');
exports.jpg = (svgString) => convertSvg(svgString, 'jpeg');
exports.jpeg = (svgString) => convertSvg(svgString, 'jpeg');
