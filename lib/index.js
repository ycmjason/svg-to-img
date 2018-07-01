const puppeteer = require('puppeteer');

const SvgToImg = () => {
  let closed = false;

  const browserPromise = puppeteer.launch({
    headless: !process.env.SVG_TO_IMG_DEBUG,
    devtools: !!process.env.SVG_TO_IMG_DEBUG,
  });


  const PagePromise = browserPromise.then(async browser => {
    const [page] = await browser.pages();
    await page.goto('about:blank');
    await page.addScriptTag({ path: require.resolve('../dist/svg-to-img-full.umd.js') });
    return page;
  });


  const convertSvg = async (svgString, type) => {
    if (closed) throw new Error('SvgToImg: trying to conver image after closing');

    const page = await PagePromise;
    const dataUrl = await page.evaluate(async ({ svgString, type }) => {
      return await window.SvgToImg[type](svgString);
    }, { svgString, type });

    return Buffer.from(dataUrl.split(',')[1], 'base64');
  };

  return {
    async close() {
      closed = true;
      const browser = await browserPromise;
      await browser.close();
    },

    png: async (svgString) => await convertSvg(svgString, 'png'),
    jpg: async (svgString) => await convertSvg(svgString, 'jpeg'),
    jpeg: async (svgString) => await convertSvg(svgString, 'jpeg'),
  };
};

const convertSvg = async (svgString, type) => {
  const svgToImg = SvgToImg();
  const buffer = await SvgToImg()[type](svgString);
  await svgToImg.close();
  return buffer;
};

SvgToImg.png = (svgString) => convertSvg(svgString, 'png');
SvgToImg.jpg = (svgString) => convertSvg(svgString, 'jpeg');
SvgToImg.jpeg = (svgString) => convertSvg(svgString, 'jpeg');

module.exports = SvgToImg;
