import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { uiFallbackAlias } from './scripts/vite-ui-fallback-alias'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uiRoot = path.resolve(__dirname, '../nothing-design-skill/nothing-design/web-ui-kit/react/src')
const docsRoot = path.resolve(__dirname, './src')

export default defineConfig({
  plugins: [uiFallbackAlias({ docsRoot, uiRoot })],
  resolve: {
    alias: {
      'aios-ui-kit': path.resolve(uiRoot, 'subpath'),
      'figma:asset': path.resolve(docsRoot, 'assets/images'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    css: true,
  },
})
