import tsc from 'rollup-plugin-tsc';
import uglify from 'rollup-plugin-uglify';
import path from 'path';

const plugins = [
  tsc({
    compilerOptions: {
      target: 'es2015',
      checkJs: true,
      sourceMap: true,
      removeComments: true,
      module: 'es2015',
      allowJs: true
    },
    include: ['spec/**/*', 'src/**/*']
  }),
  uglify()
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(__dirname, 'dist', 'vmap-js-node.js'),
      format: 'cjs'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(__dirname, 'dist', 'vmap-js.js'),
      format: 'iife',
      name: 'VMAP'
    },
    plugins
  }
];
