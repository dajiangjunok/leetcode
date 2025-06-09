import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'
import url from 'node:url'
import mockjs from 'mockjs'

function viteMockServer(): Plugin {
  return {
    name: 'mock-plugin',
    configureServer(server) {
      server.middlewares.use('/api/list', async (req: any, res) => {
        const parseUrl = url.parse(req.originalUrl, true)
        const query = parseUrl.query
        // 模拟接口
        res.setHeader('Content-Type', 'application/json')
        const data = mockjs.mock({
          'list|1000': [
            {
              'id|+1': 1,
              name: query.keyword,
              'age|1-100': 100,
              birthday: '@date',
              city: '@city',
              phone: /^1[385][1-9]\d{8}/
            }
          ]
        })

        res.end(JSON.stringify(data))
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServer()]
})
