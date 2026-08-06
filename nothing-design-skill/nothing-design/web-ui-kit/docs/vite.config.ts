import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { themeScriptPlugin } from './scripts/vite-theme-script-plugin'
import { uiFallbackAlias } from './scripts/vite-ui-fallback-alias'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uiRoot = path.resolve(__dirname, '../react/src')
const docsRoot = path.resolve(__dirname, './src')

export default defineConfig({
  base: '/AIOS-UI/',
  plugins: [
    uiFallbackAlias({ docsRoot, uiRoot }),
    themeScriptPlugin(),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      // 示例代码里的 `aios-ui-kit/button` 指回组件库 subpath 源码
      'aios-ui-kit': path.resolve(uiRoot, 'subpath'),
      'figma:asset': path.resolve(docsRoot, 'assets/images'),
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
            if (id.includes('@tabler/icons-react')) return 'tabler-icons'
            if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router'
            if (id.includes('react-dom')) return 'react-dom'
            if (id.includes('motion')) return 'motion'
            if (id.includes('react')) return 'react'
            return 'vendor'
          }
        },
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  server: {
    port: 6543,
  },
})
