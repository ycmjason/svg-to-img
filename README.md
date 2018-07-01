# @ycm.jason/svg-to-img

Just another svg-to-image library, that works in the browser and node.

## Install

```js
npm install --save @ycm.jason/svg-to-img
```

Or use CDN

```html
<script src="https://unpkg.com/@ycm.jason/svg-to-img/dist/svg-to-img-full.umd.js"></script>
```

## Browser API

### SvgToImg.png(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[String]>> Promise that resolves to the [dataurl] of the png image.

### SvgToImg.jpeg(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[String]>> Promise that resolves to the [dataurl] of the jpeg image.
- alias: `SvgToImg.jpg(svgString)`

## Node API

### SvgToImg.png(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[Buffer]>> Promise that resolves to the [Buffer] of the png image.

### SvgToImg.jpeg(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[Buffer]>> Promise that resolves to the [Buffer] of the jpeg image.
- alias: `SvgToImg.jpg(svgString)`

### class: SvgToImg

You can create a SvgToImg by calling `SvgToImg()`. This will create a reusable instance of puppeteer. Ideal if you have to convert multiple SVGs.

```
const SvgToImg = require('@ycm.jason/svg-to-img');
const svgToImg = SvgToImg();
```

#### svgToImg.close()
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]> Promise that resolves after puppeteer closes the browser.

#### svgToImg.png(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[Buffer]>> Promise that resolves to the [Buffer] of the png image.


#### svgToImg.jpeg(svgString)
- `svgString` <[String]> The string containing the svg xml.
- return: <[Promise]<[Buffer]>> Promise that resolves to the [Buffer] of the jpeg image.
- alias: `svgToImg.jpg(svgString)`


## Usage

### Browser

```html
<script src="https://unpkg.com/@ycm.jason/svg-to-img/dist/svg-to-img-full.umd.js"></script>

<script>
SvgToImg.png('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpg('<svg>...</svg>').then(dataURL => { ... });
</script>
```

Or if you are using module loader:

```js
import SvgToImg from 'svg-to-img/dist/svg-to-img.esm.js';

SvgToImg.png('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(dataURL => { ... });

SvgToImg.jpg('<svg>...</svg>').then(dataURL => { ... });
```

### Node

When using this with node, the promise resolves to a buffer.


#### One-off API

The following API is great for one-off conversion. They will spawn an instance of `puppeteer` and close it after the SVG has been converted.

```js
const SvgToImg = require('svg-to-img');

SvgToImg.png('<svg>...</svg>').then(buffer => { ... });

SvgToImg.jpeg('<svg>...</svg>').then(buffer => { ... });

SvgToImg.jpg('<svg>...</svg>').then(buffer => { ... });
```

The above code spawns three independent `puppeteer` server and closes them after each image generation. Setting up and tearing down the `puppeteer` can be computationally expensive. So you could use the persistent API.

#### Persistent API

```js
const svgToImg = require('svg-to-img')(); // spawns the puppeteer

svgToImg.png('<svg>...</svg>').then(buffer => { ... });

svgToImg.jpeg('<svg>...</svg>').then(buffer => { ... });

svgToImg.jpg('<svg>...</svg>').then(buffer => { ... });

svgToImg.close(() => { ... });
```

## Author
Jason Yu (me@ycmjason.com)

[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[dataurl]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs "Data URL"
[SvgToImg]: #class-svgtoimg
