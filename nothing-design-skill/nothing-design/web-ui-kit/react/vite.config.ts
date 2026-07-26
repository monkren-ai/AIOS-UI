import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { themeScriptPlugin } from './scripts/vite-theme-script-plugin'

export default defineConfig({
  base: '/Nothing-UI/',
  plugins: [themeScriptPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
            if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router'
            if (id.includes('react-dom')) return 'react-dom'
            if (id.includes('motion')) return 'motion'
            if (id.includes('react')) return 'react'
            return 'vendor'
          }
          if (id.includes('/src/showcase/ProjectIntroPage')) return 'project-intro'
          if (id.includes('/src/showcase/')) return 'showcase'
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
