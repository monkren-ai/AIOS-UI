import {
  componentIconSvg,
  quickToggleSvg,
  weatherSvg,
  widgetIconSvg,
} from '@/widgets/icon-svg-registry'
import type { IconEntry, IconGroup } from './types'

/**
 * AIOS 图标源。
 *
 * 真源是 `src/widgets/icon-svg-registry.ts` 的四张子注册表——那里存的是完整的
 * `<svg>…</svg>` 字符串，既能直接内联渲染，也能喂给 DotMatrixIcon 做点阵栅格化。
 * `WidgetIcons.tsx` 里的 40 个 React 组件与 `widgetIconSvg` 的 40 个 key 一一对应，
 * 所以 widget 组的条目会额外带上组件名，用来生成 JSX / import 片段。
 */

export const AIOS_GROUPS: IconGroup[] = [
  { id: 'widget', label: { zh: 'Widget', en: 'Widget' } },
  { id: 'quick-toggle', label: { zh: '快捷开关', en: 'Quick Toggle' } },
  { id: 'weather', label: { zh: '天气', en: 'Weather' } },
  { id: 'component', label: { zh: '组件图标', en: 'Component' } },
]

/** camelCase 注册表 key → PascalCase 组件名，与 WidgetIcons.tsx 的导出同名。 */
function pascalCase(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1)
}

/** camelCase → kebab-case，搜索时两种写法都能命中。 */
function kebabCase(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function buildGroup(
  groupId: string,
  registry: Record<string, string>,
  withComponent: boolean,
): IconEntry[] {
  return Object.keys(registry)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      const componentName = withComponent ? pascalCase(key) : undefined
      return {
        id: `aios/${groupId}/${key}`,
        source: 'aios' as const,
        groupId,
        name: key,
        componentName,
        searchText: `${key} ${kebabCase(key)} ${componentName ?? ''} ${groupId}`.toLowerCase(),
        svg: registry[key],
      }
    })
}

export const AIOS_ICONS: IconEntry[] = [
  ...buildGroup('widget', widgetIconSvg, true),
  ...buildGroup('quick-toggle', quickToggleSvg, false),
  ...buildGroup('weather', weatherSvg, false),
  ...buildGroup('component', componentIconSvg, false),
]

/** 每个分组的图标数量，侧栏的计数用。 */
export const AIOS_GROUP_COUNTS: Record<string, number> = AIOS_ICONS.reduce<
  Record<string, number>
>((acc, icon) => {
  acc[icon.groupId] = (acc[icon.groupId] ?? 0) + 1
  return acc
}, {})

/**
 * 注册表里的 SVG 一律硬编码成黑白（栅格化只看 alpha，颜色无所谓），
 * 内联展示时换成 `currentColor` 才能跟着主题走。
 */
export function toCurrentColorSvg(svg: string): string {
  return svg
    .replace(/(fill|stroke)="(black|white|#000000|#000|#ffffff|#fff)"/gi, '$1="currentColor"')
    .replace(/\s(width|height)="[^"]*"/gi, '')
}

/** 生成该图标的 import 语句。 */
export function aiosImportStatement(icon: IconEntry): string {
  if (icon.componentName) {
    return `import { ${icon.componentName} } from '@/widgets/WidgetIcons'`
  }
  const registryName =
    icon.groupId === 'quick-toggle'
      ? 'quickToggleSvg'
      : icon.groupId === 'weather'
        ? 'weatherSvg'
        : 'componentIconSvg'
  return [
    `import { ${registryName} } from '@/widgets/icon-svg-registry'`,
    `import DotMatrixIcon from '@/components/DotMatrixIcon'`,
  ].join('\n')
}

/** 生成该图标的 JSX 片段。 */
export function aiosJsxSnippet(icon: IconEntry, dotMatrix: boolean): string {
  if (icon.componentName) {
    return dotMatrix
      ? `<${icon.componentName} variant="dot" size="md" />`
      : `<${icon.componentName} size="md" />`
  }
  const registryName =
    icon.groupId === 'quick-toggle'
      ? 'quickToggleSvg'
      : icon.groupId === 'weather'
        ? 'weatherSvg'
        : 'componentIconSvg'
  return `<DotMatrixIcon svg={${registryName}['${icon.name}']} rows={16} cols={16} dotSize={1.5} gap={0.5} />`
}
