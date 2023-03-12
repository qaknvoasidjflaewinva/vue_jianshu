import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true, //是否开启热更新
    https: false, //是否开启 https
    open: true, //是否开启本地跨域代理
    proxy: {
      ['/dev-api']: {
        target: 'http://127.0.0.1:7001', //后端请求地址
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^/dev-api`), '')
      }
    }
  }
})
