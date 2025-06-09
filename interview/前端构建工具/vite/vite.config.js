import { defineConfig } from "vite"
import { resolve } from 'path'
// import swc from '@rollup/plugin-swc'
import { createHtmlPlugin } from 'vite-plugin-html';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      template: 'public/index.html', // 指定自定义 HTML 模板路径
      inject: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'main.js'),
      output: {
        dir: 'dist',
        entryFileNames: 'index.js',
        format: 'umd',
        name: 'MyGlobal'
      },
      // plugins: [swc(), nodeResolve(), commonjs()]
    }
  },
  esbuild: false, // 禁用 esbuild
  swc: {
    // 配置 SWC 选项（需要安装 @swc/core）
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
      target: 'es2015',
    },
  },
})