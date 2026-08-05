import type { ComponentDoc } from './types'

/**
 * 组件正文按需加载。
 *
 * `import.meta.glob` 让 Vite 为 `entries/` 下每个文件切出独立 chunk，
 * 只有访问到对应组件页时才下载。清单（`manifest.ts`）始终是同步可用的，
 * 侧栏和搜索不必等这些 chunk。
 */
const ENTRY_LOADERS = import.meta.glob<Record<string, ComponentDoc>>('./entries/*.tsx')

export async function loadComponentDoc(slug: string): Promise<ComponentDoc | null> {
  const loader = ENTRY_LOADERS[`./entries/${slug}.tsx`]
  if (!loader) return null

  const module = await loader()
  const doc = Object.values(module).find(
    (value): value is ComponentDoc =>
      typeof value === 'object' && value !== null && 'slug' in value,
  )
  return doc ?? null
}

/** 该 slug 是否已经有正文文件。用于把「未收录」和「拼错了」区分开。 */
export function hasComponentDoc(slug: string): boolean {
  return `./entries/${slug}.tsx` in ENTRY_LOADERS
}

export * from './types'
export * from './categories'
export * from './docs'
export * from './manifest'
