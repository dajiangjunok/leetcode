import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 配置 '@' 指向 'src' 目录
      '@': path.resolve(__dirname, 'src'),
      // 配置 '~' 指向 'src/assets' 目录
      '~assets': path.resolve(__dirname, 'src/assets'),
    }

  },
})
