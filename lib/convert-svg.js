(() => {
  'use strict';
  const getImageDataURL = (image, type) => {
    // pre: image is loaded
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const FACTOR = 2;
    canvas.width = width * FACTOR;
    canvas.height = height * FACTOR;

    context.scale(FACTOR, FACTOR);

    if (type === 'jpeg') {
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);
    }

    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(`image/${type}`);
  };


  window.convertSvg = (svgString, type) => new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res(getImageDataURL(image, type));
    image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  });
})();
