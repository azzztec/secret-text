import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: './dist/main.js',
    format: 'cjs',
    name: 'bundle'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    json({
      compact: true
    })
  ]
};