import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel';
import pkg from './package.json'

export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'iife'
    },
    plugins: [
      serve('dist'),
      resolve(),
      commonjs({
        'namedExports': {
          './node_modules/_html2json@1.0.2@html2json/index.js': ['html2json']
        }    
      }),
      typescript(),
      babel()
    ]
  }
]