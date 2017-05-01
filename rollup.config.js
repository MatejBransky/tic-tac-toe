import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'

export default {
  entry: 'js/main.js',
  format: 'cjs',
  plugins: [ resolve(), json() ],
  dest: 'index.js',
  sourceMap: true
}