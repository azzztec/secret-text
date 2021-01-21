import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
    name: 'bundle'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};