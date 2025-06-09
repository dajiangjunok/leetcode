import { defineConfig } from 'rollup'
import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser'


export default defineConfig({
  input: 'index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife', // umd  cjs es amd
    // dir: 'dist'
  },
  globals: {
    jquery: "$",
    lodash: "_"
  },
  external: ['jquery', 'lodash'],
  plugins: [
    babel(),
    nodeResolve(),
    commonjs({ transformMixedEsModules: true }),// 处理混合模块
    postcss(),
    typescript(),
    terser()
  ]
})