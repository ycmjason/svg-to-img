# @ycm.jason/svg-to-img

This library convers svg to png/jpeg in browser or node.

## Install

```js
npm install --save @ycm.jason/svg-to-img
```

## Browser Usage

```js
<script src="node_modules/@ycm.jason/svg-to-img/dist/svg-to-img-full.umd.js"></script>
<script>
svgToImg('<svg>...</svg>', 'png');
// or
svgToImg('<svg>...</svg>', 'jpg');
svgToImg('<svg>...</svg>', 'jpeg');
</script>
```

Or if you are using module loader:

```js
import svgToImg from 'svg-to-img/dist/svg-to-img.esm.js';

svgToImg('<svg>...</svg>', 'png');
// or
svgToImg('<svg>...</svg>', 'jpg');
svgToImg('<svg>...</svg>', 'jpeg');
```

## Server Usage

```js
const svgToImg = require('svg-to-img');

svgToImg('<svg>...</svg>', 'png');
// or
svgToImg('<svg>...</svg>', 'jpg');
svgToImg('<svg>...</svg>', 'jpeg');
```


## Author
Jason Yu (me@ycmjason.com)
