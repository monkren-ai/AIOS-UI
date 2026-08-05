import type { IconEntry, TablerIconComponent } from './types'

/**
 * Tabler 图标源。
 *
 * 整包接近 6000 个图标，静态 import 会把主 chunk 撑爆，所以这里只在用户
 * 真的切到 Tabler 标签页时才 `import()`。结果缓存在模块级 Promise 上，
 * 来回切标签不会重复下载、也不会重复建条目。
 */

export const TABLER_GROUPS = [
  { id: 'outline', label: { zh: '描边', en: 'Outline' } },
  { id: 'filled', label: { zh: '填充', en: 'Filled' } },
]

let pending: Promise<IconEntry[]> | null = null

/** IconArrowUpRight → arrow-up-right */
function kebabFromComponentName(componentName: string): string {
  return componentName
    .replace(/^Icon/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

export function loadTablerIcons(): Promise<IconEntry[]> {
  if (!pending) {
    pending = import('@tabler/icons-react').then((module) => {
      const entries: IconEntry[] = []

      for (const [exportName, value] of Object.entries(module)) {
        // 图标导出都是 `Icon` 前缀 + 大写字母开头；forwardRef 的产物是对象而非函数。
        if (!/^Icon[A-Z0-9]/.test(exportName)) continue
        if (!value || (typeof value !== 'function' && typeof value !== 'object')) continue

        const name = kebabFromComponentName(exportName)
        const groupId = exportName.endsWith('Filled') ? 'filled' : 'outline'
        entries.push({
          id: `tabler/${exportName}`,
          source: 'tabler',
          groupId,
          name,
          componentName: exportName,
          searchText: `${name} ${exportName.toLowerCase()}`,
          Component: value as TablerIconComponent,
        })
      }

      entries.sort((a, b) => a.name.localeCompare(b.name))
      return entries
    })
  }
  return pending
}

export function tablerImportStatement(icon: IconEntry): string {
  return `import { ${icon.componentName} } from '@tabler/icons-react'`
}

export function tablerJsxSnippet(icon: IconEntry, size: number): string {
  return `<${icon.componentName} size={${size}} stroke={2} />`
}
