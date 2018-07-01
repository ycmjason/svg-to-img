# @ycm.jason/svg-to-img

This library converts svg to png/jpeg in browser or node.

## Install

```js
npm install --save @ycm.jason/svg-to-img
```

## Browser Usage

```html
<script src="node_modules/@ycm.jason/svg-to-img/dist/svg-to-img-full.umd.js"></script>

<script>
SvgToImg.png('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpg('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(dataURL => { ... });
</script>
```

Or if you are using module loader:

```js
import SvgToImg from 'svg-to-img/dist/svg-to-img.esm.js';

SvgToImg.png('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpg('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(dataURL => { ... });
```

## Server Usage

On the server side, the promise resolves to a buffer instead.

```js
const SvgToImg = require('svg-to-img');

SvgToImg.png('<svg>...</svg>').then(buffer => { ... });

SvgToImg.jpg('<svg>...</svg>').then(buffer => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(buffer => { ... });
```

The above code spawns three `puppeteer` server and tear them down after each image generation. This API is nice for one-off usage. 

If you need to convert multiple images, I would suggest the following API.

```js
const svgToImg = require('svg-to-img')(); // spawns the puppeteer

svgToImg.png('<svg>...</svg>').then(buffer => { ... });

svgToImg.jpg('<svg>...</svg>').then(buffer => { ... });

svgToImg.jpeg('<svg>...</svg>').then(buffer => { ... });

svgToImg.close(() => { ... });
```

## Author
Jason Yu (me@ycmjason.com)
