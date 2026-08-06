/**
 * 生成 subpath 入口。
 *
 * appica-ui 的消费方式是 `import { Button } from '@appica/ui-react/button'` —— 每个组件一个
 * 入口，打包器不必先把整个 barrel 拉进来再摇树。这里为 `src/` 下每个组件目录生成一个
 * kebab-case 的转发文件。
 *
 * 顺带一个好处：文档站的示例代码可以照着真实的包路径写（`aios-ui-kit/button`），
 * 靠一条 alias 指到这里，于是「文档里贴的代码」和「能跑的代码」是同一份。
 *
 *   npx tsx scripts/generate-subpaths.ts
 *   npx tsx scripts/generate-subpaths.ts --check
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SRC = resolve(import.meta.dirname, '../src')
const OUT = join(SRC, 'subpath')

/** 不是组件目录，不生成入口。 */
const EXCLUDED = new Set([
  'hooks',
  'lib',
  'styles',
  'subpath',
  'types',
  'ui',
])

/** 这些目录导出的是一组组件，用目录名整体转发。 */
const GROUPED = new Set(['agent', 'conversation'])

/**
 * 只有 default export、没有 named export 的目录。
 * 对它们写 `export *` 会得到一个空模块——TypeScript 的 `export *`
 * 不转发 default，消费方写 `import X from 'aios-ui-kit/…'` 就会报错。
 */
const DEFAULT_ONLY = new Set(['ErrorBoundary'])

function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function collect(): { subpath: string; target: string }[] {
  return readdirSync(SRC, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !EXCLUDED.has(entry.name))
    .filter(
      (entry) =>
        existsSync(join(SRC, entry.name, 'index.ts')) ||
        existsSync(join(SRC, entry.name, 'index.tsx')),
    )
    .map((entry) => ({
      subpath: GROUPED.has(entry.name) ? entry.name : toKebab(entry.name),
      target: entry.name,
    }))
    .sort((a, b) => a.subpath.localeCompare(b.subpath))
}

function render(target: string): string {
  if (DEFAULT_ONLY.has(target)) {
    // 同时给出 default 和同名 named，两种导入方式都能用。
    return `export { default, default as ${target} } from '@/${target}'\n`
  }
  return `export * from '@/${target}'\n`
}

const entries = collect()
const check = process.argv.includes('--check')

if (check) {
  const stale: string[] = []
  for (const { subpath, target } of entries) {
    const file = join(OUT, `${subpath}.ts`)
    if (!existsSync(file) || readFileSync(file, 'utf8') !== render(target)) {
      stale.push(subpath)
    }
  }
  const existing = existsSync(OUT)
    ? readdirSync(OUT)
        .filter((name) => name.endsWith('.ts'))
        .map((name) => name.slice(0, -3))
    : []
  const orphaned = existing.filter((name) => !entries.some((entry) => entry.subpath === name))

  if (stale.length || orphaned.length) {
    console.error('subpath 入口已过期。请运行 `npm run sync:subpaths`。')
    if (stale.length) console.error('  缺失/过期:', stale.join(', '))
    if (orphaned.length) console.error('  多余:', orphaned.join(', '))
    process.exit(1)
  }
  console.log(`subpath 入口已是最新（${entries.length} 个）。`)
} else {
  rmSync(OUT, { recursive: true, force: true })
  mkdirSync(OUT, { recursive: true })
  for (const { subpath, target } of entries) {
    writeFileSync(join(OUT, `${subpath}.ts`), render(target))
  }
  console.log(`已生成 ${entries.length} 个 subpath 入口到 src/subpath/。`)
}
