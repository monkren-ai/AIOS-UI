#!/usr/bin/env node
/**
 * 自动生成 src/index.ts
 *
 * 扫描 src/ 下的一级目录（或同名 .ts/.tsx 文件），使用 TypeScript AST
 * 读取每个模块的命名导出，并按类别生成显式 re-export。
 * 类别顺序：Providers → Core Libs → Components → Agent / AI OS。
 * 新增组件目录后重新运行本脚本即可，无需手动维护 barrel。
 *
 * Usage:
 *   npm run sync:exports
 *   npm run sync:exports -- --check    # CI 校验，不同步则退出码 1
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const SRC_DIR = resolve(__dirname, '../src')
const INDEX_PATH = join(SRC_DIR, 'index.ts')

const HEADER = `/**
 * AIOS UI - 基于 AIOS 设计语言的现代 React 组件库
 *
 * @example
 * \`\`\`tsx
 * import * as motion from 'motion/react'
 * import { ConfigProvider, Button, Input } from 'aios-ui-kit'
 *
 * <ConfigProvider motion={motion} defaultTheme="dark">
 *   <Button variant="primary">Click me</Button>
 * </ConfigProvider>
 * \`\`\`
 */

// ===== 全局样式（设计令牌）=====
import './styles/tokens.css'

`

const FOOTER = `\nexport const VERSION = '1.0.0'\n`

interface Category {
  title: string
  members: string[]
}

// 显式类别定义：保留 Providers / Core / Components / Agent 的语义分组。
// Components 留空，由脚本动态扫描补充；遇到新增组件目录时无需修改此处。
const CATEGORIES: Category[] = [
  { title: 'Providers', members: ['ConfigProvider', 'ThemeProvider', 'MotionProvider'] },
  { title: 'Core Libs', members: ['lib'] },
  { title: 'Components', members: [] },
  { title: 'Agent / AI OS', members: ['agent'] },
]

// 不参与 barrel 导出的一级目录/文件
const EXCLUDED_ENTRIES = new Set([
  'hooks',
  'styles',
  'components',
  'widgets',
  'system',
  'subpath',
  'types',
  'ui',
  'index',
  'version',
])

// 各模块中不对外暴露的内部导出（保持与历史 barrel 一致）
const INTERNAL_EXPORTS: Record<string, Set<string>> = {
  ConfigProvider: new Set(['ConfigContext', 'defaultCdnFn']),
  MotionProvider: new Set(['MotionContext']),
}

// 当模块入口是聚合层，且部分导出实际来自子文件时，指定覆盖导入路径。
// key 为顶层目录名；value 为 { 导出名称: 实际相对导入路径 }。
// 用于绕过 tsdown/rolldown 对多层 re-export 的解析限制。
const EXPORT_OVERRIDES: Record<string, Record<string, string>> = {
  ThemeProvider: {
    ThemeScript: './ThemeProvider/ThemeScript',
    getThemeScript: './ThemeProvider/ThemeScript',
    ThemeScriptOptions: './ThemeProvider/ThemeScript',
    ThemeScriptProps: './ThemeProvider/ThemeScript',
  },
}

interface ParsedExports {
  valueNames: string[]
  typeNames: string[]
}

function isExportKeyword(modifier: ts.Modifier): boolean {
  return modifier.kind === ts.SyntaxKind.ExportKeyword
}

/**
 * 解析模块的公开命名导出（不含 default）。
 * 支持 index.ts(x) 以及直接导出组件/类型的 .ts/.tsx 文件。
 * 自动展开 `export * from './x'`，避免手动维护多层 re-export。
 */
function parseModuleExports(filePath: string, visited: Set<string> = new Set()): ParsedExports {
  if (visited.has(filePath)) return { valueNames: [], typeNames: [] }
  visited.add(filePath)

  const sourceFile = ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.ESNext,
    true,
  )

  const valueNames: string[] = []
  const typeNames: string[] = []

  function addName(name: string, isType: boolean) {
    if (name === 'default') return
    if (isType) {
      typeNames.push(name)
    } else {
      valueNames.push(name)
    }
  }

  function mergeParsed(exports: ParsedExports) {
    for (const name of exports.valueNames) addName(name, false)
    for (const name of exports.typeNames) addName(name, true)
  }

  const dir = dirname(filePath)

  ts.forEachChild(sourceFile, (node) => {
    // export { a, type B } from 'x'
    // export type { C, D } from 'x'
    if (ts.isExportDeclaration(node)) {
      const isTypeOnly = node.isTypeOnly
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const elem of node.exportClause.elements) {
          const name = elem.name.getText(sourceFile)
          addName(name, isTypeOnly || elem.isTypeOnly)
        }
      } else if (!node.exportClause && node.moduleSpecifier) {
        // export * from './x'
        const specifier = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '')
        const resolved = resolveRelativeModule(dir, specifier)
        if (resolved) {
          mergeParsed(parseModuleExports(resolved, visited))
        }
      }
      return
    }

    const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
    if (!modifiers?.some(isExportKeyword)) return

    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          addName(decl.name.getText(sourceFile), false)
        }
      }
      return
    }

    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      if (node.name) addName(node.name.getText(sourceFile), false)
      return
    }

    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      if (node.name) addName(node.name.getText(sourceFile), true)
      return
    }
  })

  return { valueNames, typeNames }
}

/**
 * 解析相对路径模块说明符，支持 .ts/.tsx 扩展名推断。
 */
function resolveRelativeModule(dir: string, specifier: string): string | null {
  if (!specifier.startsWith('.')) return null
  const base = join(dir, specifier)
  for (const ext of ['', '.ts', '.tsx', '/index.ts', '/index.tsx']) {
    const candidate = base + ext
    if (existsSync(candidate)) return candidate
  }
  return null
}

/**
 * 返回模块入口文件路径（优先目录 index，其次同名文件），无则返回 null。
 */
function resolveModuleEntry(name: string): string | null {
  const dirPath = join(SRC_DIR, name)
  const indexTs = join(dirPath, 'index.ts')
  const indexTsx = join(dirPath, 'index.tsx')
  const flatTs = join(SRC_DIR, `${name}.ts`)
  const flatTsx = join(SRC_DIR, `${name}.tsx`)

  if (existsSync(indexTs)) return indexTs
  if (existsSync(indexTsx)) return indexTsx
  if (existsSync(flatTs)) return flatTs
  if (existsSync(flatTsx)) return flatTsx
  return null
}

function listTopLevelEntries(): string[] {
  const names = new Set<string>()
  for (const entry of readdirSync(SRC_DIR, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      names.add(entry.name)
    } else if (
      entry.isFile() &&
      /\.(ts|tsx)$/.test(entry.name) &&
      !entry.name.endsWith('.test.tsx')
    ) {
      names.add(entry.name.replace(/\.(ts|tsx)$/, ''))
    }
  }
  return [...names]
}

interface ExportSource {
  path: string
  exports: ParsedExports
}

function formatExportStatement(source: ExportSource): string {
  const parts: string[] = []
  if (source.exports.valueNames.length > 0) {
    parts.push(source.exports.valueNames.join(', '))
  }
  if (source.exports.typeNames.length > 0) {
    parts.push(...source.exports.typeNames.map((name) => `type ${name}`))
  }
  return `export { ${parts.join(', ')} } from '${source.path}'`
}

function emptyExports(exports: ParsedExports): boolean {
  return exports.valueNames.length === 0 && exports.typeNames.length === 0
}

function filterInternalExports(name: string, exports: ParsedExports): ParsedExports {
  const internal = INTERNAL_EXPORTS[name]
  if (!internal) return exports
  return {
    valueNames: exports.valueNames.filter((n) => !internal.has(n)),
    typeNames: exports.typeNames.filter((n) => !internal.has(n)),
  }
}

function buildCategories(): {
  title: string
  entries: { name: string; sources: ExportSource[] }[]
}[] {
  const reserved = new Set(CATEGORIES.flatMap((c) => c.members))
  const allEntries = listTopLevelEntries()

  const componentEntries = allEntries
    .filter((name) => !reserved.has(name))
    .filter((name) => !EXCLUDED_ENTRIES.has(name))
    .map((name) => ({ name, entry: resolveModuleEntry(name) }))
    .filter((item): item is { name: string; entry: string } => item.entry !== null)
    .sort((a, b) => a.name.localeCompare(b.name))

  return CATEGORIES.map((cat) => {
    const members = cat.title === 'Components' ? componentEntries.map((e) => e.name) : cat.members
    return {
      title: cat.title,
      entries: members
        .map((name) => {
          const entry = reserved.has(name)
            ? resolveModuleEntry(name)
            : componentEntries.find((e) => e.name === name)?.entry
          if (!entry) return { name, sources: [] }

          const exports = filterInternalExports(name, parseModuleExports(entry))
          const overrides = EXPORT_OVERRIDES[name]

          // 默认来源：从顶层目录导入
          const defaultSource: ExportSource = {
            path: `./${name}`,
            exports: { valueNames: [...exports.valueNames], typeNames: [...exports.typeNames] },
          }
          const sources: ExportSource[] = [defaultSource]

          if (overrides) {
            const overriddenPaths = new Map<string, ParsedExports>()

            for (const [exportName, overridePath] of Object.entries(overrides)) {
              const isValue = defaultSource.exports.valueNames.includes(exportName)
              const isType = defaultSource.exports.typeNames.includes(exportName)
              if (!isValue && !isType) continue

              // 从默认来源移除
              if (isValue) {
                defaultSource.exports.valueNames = defaultSource.exports.valueNames.filter(
                  (n) => n !== exportName,
                )
              }
              if (isType) {
                defaultSource.exports.typeNames = defaultSource.exports.typeNames.filter(
                  (n) => n !== exportName,
                )
              }

              // 加入覆盖来源
              let target = overriddenPaths.get(overridePath)
              if (!target) {
                target = { valueNames: [], typeNames: [] }
                overriddenPaths.set(overridePath, target)
              }
              if (isValue) target.valueNames.push(exportName)
              if (isType) target.typeNames.push(exportName)
            }

            for (const [path, pathExports] of overriddenPaths) {
              sources.push({ path, exports: pathExports })
            }
          }

          return { name, sources: sources.filter((s) => !emptyExports(s.exports)) }
        })
        .filter((entry) => entry.sources.length > 0),
    }
  }).filter((cat) => cat.entries.length > 0)
}

function buildIndex(): string {
  const categories = buildCategories()
  const lines: string[] = []

  for (const cat of categories) {
    lines.push(`// ===== ${cat.title} =====`)
    for (const entry of cat.entries) {
      for (const source of entry.sources) {
        lines.push(formatExportStatement(source))
      }
    }
    lines.push('')
  }

  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop()
  }

  return HEADER + lines.join('\n') + FOOTER
}

function main() {
  const check = process.argv.includes('--check')
  const next = buildIndex()
  const current = existsSync(INDEX_PATH) ? readFileSync(INDEX_PATH, 'utf8') : ''

  if (current === next) {
    console.log('✓ src/index.ts is in sync')
    return
  }

  if (check) {
    console.error('✗ src/index.ts is out of sync — run `npm run sync:exports`')
    process.exit(1)
  }

  writeFileSync(INDEX_PATH, next)
  console.log('✓ src/index.ts regenerated')
}

main()
