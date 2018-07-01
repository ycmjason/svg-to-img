import '../node_modules/@babel/polyfill/dist/polyfill.min.js';

window.Buffer = Buffer; // make sure rollup-plugin-node-globals to populate Buffer
