import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/svg-to-img-full.js',
    output: {
      file: 'dist/svg-to-img-full.umd.js',
      format: 'umd',
      name: 'SvgToImg',
    },
    plugins: [
      globals(),
      babel(),
      terser(),
    ],
  },
  {
    input: 'src/svg-to-img.js',
    output: {
      file: 'dist/svg-to-img.esm.js',
      format: 'es',
    },
    plugins: [
      globals(),
    ],
  },
];
