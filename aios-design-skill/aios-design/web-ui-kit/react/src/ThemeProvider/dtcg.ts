import {
  REQUIRED_THEME_TOKENS,
  THEME_TOKEN_CSS_VARIABLES,
  type ThemeDefinition,
  type ThemeImportResult,
  type ThemeMode,
  type ThemeTokenName,
  type ThemeTokenValues,
} from './themes'

export const MAX_THEME_FILE_SIZE = 256 * 1024
const EXTENSION_KEY = 'io.github.monkren-ai.aios-ui'
const unsafe = /url\s*\(|@import|<\/?script|javascript:/i

interface ParseOptions {
  fileName?: string
  fileSize?: number
}

function safeId(input: string) {
  return input
    .normalize('NFKD')
    .toLowerCase()
    .replace(/\.tokens(?:\.json)?$|\.json$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'custom-theme'
}

function pointerGet(root: unknown, pointer: string): unknown {
  const path = pointer.replace(/^#\/?/, '').split('/').filter(Boolean)
  let value: unknown = root
  for (const part of path) {
    if (!value || typeof value !== 'object') return undefined
    value = (value as Record<string, unknown>)[part.replace(/~1/g, '/').replace(/~0/g, '~')]
  }
  return value
}

function getPath(root: unknown, path: string): unknown {
  let value: unknown = root
  for (const part of path.split('.')) {
    if (!value || typeof value !== 'object') return undefined
    value = (value as Record<string, unknown>)[part]
  }
  return value
}

function resolveValue(modeRoot: unknown, documentRoot: unknown, value: unknown, chain: string[]): unknown {
  if (typeof value !== 'string') return value
  const match = value.match(/^\{(.+)\}$/)
  if (!match && !value.startsWith('#/')) return value
  const reference = match?.[1] ?? value
  if (chain.includes(reference)) throw new Error(`检测到循环引用：${[...chain, reference].join(' → ')}`)
  const target = reference.startsWith('#/')
    ? pointerGet(documentRoot, reference)
    : getPath(modeRoot, reference)
  if (target === undefined) throw new Error(`无法解析引用：${reference}`)
  const tokenValue = target && typeof target === 'object' && '$value' in target
    ? (target as Record<string, unknown>).$value
    : target
  return resolveValue(modeRoot, documentRoot, tokenValue, [...chain, reference])
}

function flatten(
  node: unknown,
  output: Map<string, { value: unknown; type?: string }>,
  prefix = '',
  inheritedType?: string,
) {
  if (!node || typeof node !== 'object') return
  const object = node as Record<string, unknown>
  const type = typeof object.$type === 'string' ? object.$type : inheritedType
  if ('$value' in object && prefix) {
    output.set(prefix, { value: object.$value, ...(type ? { type } : {}) })
    return
  }
  for (const [key, child] of Object.entries(object)) {
    if (key.startsWith('$')) continue
    flatten(child, output, prefix ? `${prefix}.${key}` : key, type)
  }
}

function channel(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('sRGB 分量必须是数字')
  return Math.round(Math.max(0, Math.min(1, value)) * 255)
}

function colorToCss(value: unknown): string {
  if (typeof value === 'string' && /^(#[0-9a-f]{6}|#[0-9a-f]{8}|rgba?\([\d\s.,%]+\))$/i.test(value)) return value
  if (!value || typeof value !== 'object') throw new Error('颜色必须是 sRGB 对象或安全的 hex/rgb 值')
  const object = value as Record<string, unknown>
  if (object.colorSpace !== 'srgb') throw new Error(`首版仅支持 sRGB，收到 ${String(object.colorSpace)}`)
  if (!Array.isArray(object.components) || object.components.length < 3) throw new Error('sRGB 颜色缺少三个 components')
  const [r, g, b] = object.components.map(channel)
  const alpha = object.alpha === undefined ? 1 : Number(object.alpha)
  return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})` : `#${[r, g, b].map((part) => part.toString(16).padStart(2, '0')).join('')}`
}

function normalizeValue(path: ThemeTokenName, raw: unknown): string {
  if (path.startsWith('color.')) return colorToCss(raw)
  if (path.startsWith('font.family.')) {
    const value = Array.isArray(raw) ? raw.join(', ') : String(raw)
    if (!value.trim() || unsafe.test(value)) throw new Error('字体族包含不安全或空值')
    return value
  }
  if (path.startsWith('font.weight.')) {
    const value = String(raw)
    if (!/^(normal|bold|[1-9]00)$/.test(value)) throw new Error('字重必须是 100–900、normal 或 bold')
    return value
  }
  const dimension = raw && typeof raw === 'object'
    ? `${String((raw as Record<string, unknown>).value)}${String((raw as Record<string, unknown>).unit)}`
    : String(raw)
  if (!/^(0|\d+(?:\.\d+)?(?:px|rem|em))$/.test(dimension) || unsafe.test(dimension)) {
    throw new Error('尺寸仅允许 0、px、rem 或 em')
  }
  return dimension
}

function hexRgb(value: string): [number, number, number] | null {
  const hex = value.match(/^#([0-9a-f]{6})/i)?.[1]
  if (!hex) return null
  return [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16)) as [number, number, number]
}

function contrast(a: string | undefined, b: string | undefined) {
  const first = a ? hexRgb(a) : null
  const second = b ? hexRgb(b) : null
  if (!first || !second) return null
  const luminance = (rgb: [number, number, number]) => {
    const channels = rgb.map((v) => {
      const n = v / 255
      return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  }
  const [high, low] = [luminance(first), luminance(second)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

function contrastWarnings(mode: ThemeMode, values: ThemeTokenValues) {
  const checks: Array<[ThemeTokenName, ThemeTokenName, number, string]> = [
    ['color.text.default', 'color.background.default', 4.5, '正文/背景'],
    ['color.text.default', 'color.surface.default', 4.5, '正文/表面'],
    ['color.text.strong', 'color.background.default', 4.5, '强调文字/背景'],
    ['color.interactive.default', 'color.background.default', 3, '焦点环/背景'],
  ]
  return checks.flatMap(([foreground, background, minimum, label]) => {
    const ratio = contrast(values[foreground], values[background])
    return ratio !== null && ratio < minimum
      ? [`${mode}：${label} 对比度 ${ratio.toFixed(2)}:1，建议至少 ${minimum}:1`]
      : []
  })
}

export function parseDtcgTheme(input: unknown, options: ParseOptions = {}): ThemeImportResult {
  const errors: string[] = []
  const missing: string[] = []
  const unknown = new Set<string>()
  const warnings: string[] = []
  if (options.fileSize && options.fileSize > MAX_THEME_FILE_SIZE) {
    return { theme: null, coverage: 0, errors: ['文件超过 256 KB 限制'], missing, unknown: [], contrastWarnings: [] }
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { theme: null, coverage: 0, errors: ['主题文件必须是 JSON 对象'], missing, unknown: [], contrastWarnings: [] }
  }
  const root = input as Record<string, unknown>
  const modes: Partial<Record<ThemeMode, ThemeTokenValues>> = {}
  for (const mode of ['light', 'dark'] as const) {
    if (!root[mode]) continue
    const flat = new Map<string, { value: unknown; type?: string }>()
    flatten(root[mode], flat)
    const values: ThemeTokenValues = {}
    for (const [path, token] of flat) {
      if (!(path in THEME_TOKEN_CSS_VARIABLES)) {
        unknown.add(`${mode}.${path}`)
        continue
      }
      try {
        const resolved = resolveValue(root[mode], root, token.value, [path])
        values[path as ThemeTokenName] = normalizeValue(path as ThemeTokenName, resolved)
      } catch (error) {
        errors.push(`${mode}.${path}：${error instanceof Error ? error.message : '无法解析'}`)
      }
    }
    for (const token of REQUIRED_THEME_TOKENS) {
      if (!values[token]) missing.push(`${mode}.${token}`)
    }
    modes[mode] = values
    warnings.push(...contrastWarnings(mode, values))
  }
  if (!modes.light && !modes.dark) errors.push('顶层至少需要 light 或 dark 模式')
  if (missing.length) errors.push(`缺少每个模式必需的 ${REQUIRED_THEME_TOKENS.length} 个核心 token`)
  const extensions = root.$extensions as Record<string, unknown> | undefined
  const metadata = extensions?.[EXTENSION_KEY] as Record<string, unknown> | undefined
  const fallbackName = (options.fileName ?? 'Custom theme').replace(/\.tokens(?:\.json)?$|\.json$/i, '')
  const name = typeof metadata?.name === 'string' && metadata.name.trim() ? metadata.name.trim().slice(0, 80) : fallbackName
  const id = safeId(typeof metadata?.id === 'string' ? metadata.id : name)
  const mapped = Object.values(modes).reduce((sum, mode) => sum + Object.keys(mode ?? {}).length, 0)
  const possible = Object.keys(THEME_TOKEN_CSS_VARIABLES).length * Math.max(1, Object.keys(modes).length)
  const theme: ThemeDefinition | null = errors.length
    ? null
    : {
        id,
        name,
        version: typeof metadata?.version === 'string' ? metadata.version : '1.0.0',
        description: typeof metadata?.description === 'string' ? metadata.description : undefined,
        source: 'custom',
        modes,
      }
  return {
    theme,
    coverage: Math.round((mapped / possible) * 100),
    errors,
    missing,
    unknown: [...unknown],
    contrastWarnings: warnings,
  }
}

function dtcgValue(path: ThemeTokenName, value: string) {
  if (!path.startsWith('color.')) return value
  const rgb = hexRgb(value)
  return rgb
    ? { colorSpace: 'srgb', components: rgb.map((part) => Number((part / 255).toFixed(5))) }
    : value
}

function assignPath(root: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split('.')
  let target = root
  parts.forEach((part, index) => {
    if (index === parts.length - 1) target[part] = { $value: value }
    else target = (target[part] ??= {}) as Record<string, unknown>
  })
}

export function serializeDtcgTheme(theme: ThemeDefinition): string {
  const output: Record<string, unknown> = {
    $extensions: {
      [EXTENSION_KEY]: {
        id: theme.id,
        name: theme.name,
        version: theme.version,
        description: theme.description,
      },
    },
  }
  for (const mode of ['light', 'dark'] as const) {
    const values = theme.modes[mode]
    if (!values) continue
    const group: Record<string, unknown> = {}
    for (const [path, value] of Object.entries(values)) {
      if (value) assignPath(group, path, dtcgValue(path as ThemeTokenName, value))
    }
    output[mode] = group
  }
  return JSON.stringify(output, null, 2)
}
