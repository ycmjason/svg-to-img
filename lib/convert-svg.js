((root, factory) => {
  // umd export
  if (typeof define === 'function' && define.amd) { // eslint-disable-line
    define([], factory); // eslint-disable-line
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.convertSvg = factory();
  }
})(this, () => {
  'use strict';
  const getImageDataURL = (image, type) => {
    // pre: image is loaded
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    if (type === 'jpeg') {
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);
    }

    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(`image/${type}`);
  };


  return (svgString, type, { scale = 1 } = {}) => new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => {
      image.width *= scale;
      image.height *= scale;
      res(getImageDataURL(image, type));
    };
    image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  });
});
