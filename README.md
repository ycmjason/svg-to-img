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
svgToImg('<svg>...</svg>', 'png').then(dataURL => { ... });
// or
svgToImg('<svg>...</svg>', 'jpg').then(dataURL => { ... });
svgToImg('<svg>...</svg>', 'jpeg').then(dataURL => { ... });
</script>
```

Or if you are using module loader:

```js
import svgToImg from 'svg-to-img/dist/svg-to-img.esm.js';

svgToImg('<svg>...</svg>', 'png').then(dataURL => { ... });
// or
svgToImg('<svg>...</svg>', 'jpg').then(dataURL => { ... });
svgToImg('<svg>...</svg>', 'jpeg').then(dataURL => { ... });
```

## Server Usage

On the server side, the promise resolves to a buffer instead.

```js
const svgToImg = require('svg-to-img');

svgToImg('<svg>...</svg>', 'png').then(buffer => { ... });
// or
svgToImg('<svg>...</svg>', 'jpg').then(buffer => { ... });
svgToImg('<svg>...</svg>', 'jpeg').then(buffer => { ... });
```


## Author
Jason Yu (me@ycmjason.com)
