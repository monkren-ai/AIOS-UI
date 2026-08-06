import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

const TRY_EXTENSIONS = ['.ts', '.tsx', '.mts', '/index.ts', '/index.tsx']

function resolveWithExtensions(basePath: string): string | null {
  if (existsSync(basePath) && statSync(basePath).isFile()) return basePath

  for (const ext of TRY_EXTENSIONS) {
    const candidate = basePath + ext
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  return null
}

/**
 * `@/` 先查 docs/src，再回落到 react/src。
 * 文档站可继续 `@/Button` 引用组件库，无需批量改 import。
 */
export function uiFallbackAlias(options: { docsRoot: string; uiRoot: string }): Plugin {
  return {
    name: 'ui-fallback-alias',
    enforce: 'pre',
    resolveId(source) {
      if (!source.startsWith('@/')) return null

      const subpath = source.slice(2)
      const docsHit = resolveWithExtensions(join(options.docsRoot, subpath))
      if (docsHit) return docsHit

      const uiHit = resolveWithExtensions(join(options.uiRoot, subpath))
      if (uiHit) return uiHit

      return null
    },
  }
}
