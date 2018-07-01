import '../vendor/jimp.min.js';
const Jimp = window.Jimp;

const scale = (url, factor) => new Promise(async (res, rej) => {
  const image = await Jimp.read(url);
  image.scale(0.5).getBuffer(Jimp.AUTO, (err, buffer) => {
    if (err) return rej(err);
    res(url.replace(/,.*/, ',' + buffer.toString('base64')));
  });
});

const getImageDataURL = (image, type) => {
  // pre: image is loaded
  const FACTOR = 2;
  const { width, height } = image;
  const canvas = document.createElement('canvas');
  canvas.width = width * FACTOR;
  canvas.height = height * FACTOR;

  const context = canvas.getContext('2d');
  context.scale(FACTOR, FACTOR);

  if (type === 'jpeg') {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  }

  context.drawImage(image, 0, 0, width, height);
  return scale(canvas.toDataURL(`image/${type}`), 0.5);
};


const convertSvg = (svgString, type) => new Promise((res, rej) => {
  const image = new Image();
  image.onload = () => res(getImageDataURL(image, type));
  image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
});

export default {
  png: svgString => convertSvg(svgString, 'png'),
  jpg: svgString => convertSvg(svgString, 'jpeg'),
  jpeg: svgString => convertSvg(svgString, 'jpeg'),
};
