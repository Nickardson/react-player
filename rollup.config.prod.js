import { string } from 'rollup-plugin-string'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import json from '@rollup/plugin-json/dist'
import postcss from 'rollup-plugin-postcss'
import progress from 'rollup-plugin-progress'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const input = ['src/index.js']

const name = 'ReactComponents'

const external = [
  'react',
  'react-dom',
  'prop-types',
  'classnames',
  'react-lazy-load-image-component',
  'react-device-detect',
  'react-select',
  'glider-js',
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const plugins = [
  progress(),
  string({ include: '**/*.html' }),
  json(),
  postcss({
    extract: true,
    autoModules: true,
    include: '**/*.css',
    extensions: ['.css'],
  }),
  resolve({
    customResolveOptions: {
      moduleDirectory: 'src',
    },
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'react-slick': ['react-slick'],
      'slick-carousel': ['slick-carousel'],
    },
  }),
  babel({
    exclude: 'node_modules/**',
    presets: ['@babel/env', '@babel/preset-react'],
  }),
  terser({ sourcemap: false }),
  analyze(),
  filesize(),
]

const outputData = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
]

const config = outputData.map(({ file, format }) => ({
  input,
  output: {
    file,
    format,
    name,
    globals,
  },
  external,
  plugins,
}))

export default config
