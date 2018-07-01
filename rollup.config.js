import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';

export default ({
  full: {
    input: 'src/svg-to-img-full.js',
    output: {
      file: 'dist/svg-to-img-full.umd.js',
      format: 'umd',
      name: 'svgToImg',
    },
    plugins: [
      globals(),
      babel(),
    ],
  },
  core: {
    input: 'src/svg-to-img.js',
    output: {
      file: 'dist/svg-to-img.esm.js',
      format: 'es',
    },
    plugins: [
      globals(),
    ],
  },
})[process.env.FOR];
