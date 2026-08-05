import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { themeScriptPlugin } from './scripts/vite-theme-script-plugin'

export default defineConfig({
  base: '/Nothing-UI/',
  plugins: [themeScriptPlugin(), tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 文档站示例按真实包名书写（`nothing-ui/button`），本地指回源码，
      // 所以代码块里看到的就是使用者该写的，复制出去直接能用。
      'nothing-ui': path.resolve(__dirname, './src/subpath'),
      'figma:asset': path.resolve(__dirname, './src/assets/images'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 5900 个 Tabler 图标整包只被 /icons 的 Tabler 标签页动态 import 一次
            // （要枚举全集，没法 tree-shake）。单独成 chunk，免得它顺着某个静态
            // 引用漏进首屏；这条必须在下面的 `includes('react')` 之前。
            if (id.includes('@tabler/icons-react')) return 'tabler-icons'
            if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router'
            if (id.includes('react-dom')) return 'react-dom'
            if (id.includes('motion')) return 'motion'
            if (id.includes('react')) return 'react'
            return 'vendor'
          }
          // 应用代码一律不手动合并：路由走 React.lazy，交给自动分包才切得开。
          // 手动给整个目录指定 chunk 名的话，只要目录里有一个模块被首屏静态
          // 引用（比如共享的 context），整个 chunk 就会被拽进首屏。
        },
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  server: {
    port: 5173,
  },
})
