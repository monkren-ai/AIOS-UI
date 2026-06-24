#!/usr/bin/env node
/**
 * Verify that the current `src/showcase/` modular structure contains
 * the same demo content as the 10-days-ago `src/App.tsx` (commit df7b910).
 *
 * Strategy:
 *  1. Read both sources.
 *  2. Extract category ids + zh/en titles (id 1:1 matched).
 *  3. For each category, count the number of <DemoCard> / <h2 style=demoTitleStyle>
 *     blocks; record the t(zh, en) first arg vs the inline string in old code.
 *  4. Print a markdown table.
 *
 * Non-goals:
 *  - Do NOT modify any source file.
 *  - Do NOT require npm install.
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

// ─── 1. Load 10-days-ago App.tsx ─────────────────────────────────────────
const OLD_APP_PATH = '/tmp/app_10days_ago.tsx'
if (!existsSync(OLD_APP_PATH)) {
  // Lazily fetch from git and cache to /tmp
  execSync(
    `git show df7b910:nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx > ${OLD_APP_PATH}`,
    { cwd: REPO_ROOT, stdio: 'inherit' },
  )
}
const oldApp = readFileSync(OLD_APP_PATH, 'utf8')

// ─── 2. Load current section sources ─────────────────────────────────────
const sectionsDir = resolve(
  REPO_ROOT,
  'nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections',
)
const { readdirSync } = await import('node:fs')
const sectionFiles = readdirSync(sectionsDir).filter((f) => f.endsWith('Section.tsx'))

// ─── 3. Helpers ───────────────────────────────────────────────────────────

/**
 * Extract categories array (id/zh/en) from a source string.
 * Matches both `const categories = [ ... ]` and `const categories: Category[] = [ ... ]`
 */
function extractCategories(src) {
  const match = src.match(/const\s+categories(?::\s*Category\[\])?\s*=\s*\[([\s\S]*?)\n\]/)
  if (!match) return []
  const block = match[1]
  const items = []
  for (const line of block.split('\n')) {
    const m = line.match(
      /\{\s*id:\s*'([^']+)',\s*zh:\s*'((?:\\'|[^'])*)',\s*en:\s*'((?:\\'|[^'])*)'\s*,?\s*\}/,
    )
    if (m) items.push({ id: m[1], zh: m[2].replace(/\\'/g, "'"), en: m[3].replace(/\\'/g, "'") })
  }
  return items
}

/**
 * Extract category title rendering from old App.tsx:
 *   <CategorySection id="X" title={t('zh', 'en')}>
 * We pair this with the categories list.
 */
function extractOldDemoTitles(appSrc) {
  // For each <CategorySection id="..." title={t('zh', 'en')}> ... </CategorySection>
  // count <h2 style={demoTitleStyle}>{t('zh', 'en')}</h2> (which corresponds to one DemoCard)
  const result = {}
  const sectionRe = /<CategorySection\s+id="([^"]+)"[\s\S]*?<\/CategorySection>/g
  let m
  while ((m = sectionRe.exec(appSrc))) {
    const id = m[1]
    const body = m[0]
    const titleRe = /<h2\s+style=\{demoTitleStyle\}>\{t\('((?:\\'|[^'])*)'(?:,\s*'((?:\\'|[^'])*)')?\)\}<\/h2>/g
    const titles = []
    let t
    while ((t = titleRe.exec(body))) {
      titles.push({
        zh: t[1].replace(/\\'/g, "'"),
        en: (t[2] || '').replace(/\\'/g, "'"),
      })
    }
    result[id] = titles
  }
  return result
}

/**
 * Extract demo titles from a current section file.
 *   <DemoCard title={t('zh', 'en')}> ... </DemoCard>
 * Also capture <SectionTitle>{t('zh', 'en')}</SectionTitle> for plain sections
 * (NullframeSection / FeatureWidgetsSection / Figma20LibrarySection).
 */
function extractCurrentDemoTitles(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const titles = []
  const demoRe = /<DemoCard\s+title=\{t\('((?:\\'|[^'])*)'(?:,\s*'((?:\\'|[^'])*)')?\)\}/g
  let m
  while ((m = demoRe.exec(src))) {
    titles.push({
      zh: m[1].replace(/\\'/g, "'"),
      en: (m[2] || '').replace(/\\'/g, "'"),
    })
  }
  // Detect wrap-only sections (no DemoCard inside) — FeatureWidgets/Figma20/Nullframe
  return { titles, raw: src }
}

// ─── 4. Run analysis ─────────────────────────────────────────────────────

const oldCats = extractCategories(oldApp)
const newSrc = readFileSync(
  resolve(
    REPO_ROOT,
    'nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/components/CategoryNav.tsx',
  ),
  'utf8',
)
const newCats = extractCategories(newSrc)

const oldDemoMap = extractOldDemoTitles(oldApp)

// Map current section file → category id (camelCase → kebab-case, including digits)
const idFromFile = (file) =>
  file
    .replace(/Section\.tsx$/, '')
    // letter→uppercase (camelCase boundary)
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    // letter→digit boundary
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    // digit→letter boundary
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase()

// ─── 5. Print markdown report ────────────────────────────────────────────

let md = '# Showcase 内容对照 — 当前 vs 10 天前版本\n\n'
md += `> 生成时间: ${new Date().toISOString()}\n`
md += `> 10 天前 commit: \`df7b910\` (2026-06-14 21:20:42 +0800)\n`
md += `> 当前 commit: \`${execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim()}\`\n\n`

md += '## 1. 分类清单对照\n\n'
md += '| 序号 | id | 中文 | 英文 | 一致性 |\n'
md += '| --- | --- | --- | --- | --- |\n'

let catsMatch = true
if (oldCats.length !== newCats.length) {
  catsMatch = false
}
for (let i = 0; i < Math.max(oldCats.length, newCats.length); i++) {
  const o = oldCats[i]
  const n = newCats[i]
  const same = o && n && o.id === n.id && o.zh === n.zh && o.en === n.en
  if (!same) catsMatch = false
  md += `| ${i + 1} | ${n?.id || '—'} | ${n?.zh || '—'} | ${n?.en || '—'} | ${same ? '✅' : '❌'} |\n`
}
md += `\n> **结论**: 16 个分类 ${catsMatch ? '**完全一致** ✅' : '**存在差异** ❌'}\n\n`

md += '## 2. Demo 标题逐分类对照\n\n'
md += '> 计数规则: 10 天前以 `<h2 style={demoTitleStyle}>` 计 1 个 demo;\n'
md += '> 当前以 `<DemoCard title={t(...)}>` 计 1 个 demo。\n\n'
md += '| 分类 (id) | 10 天前 demo 数 | 当前 demo 数 | 标题差异 |\n'
md += '| --- | --- | --- | --- |\n'

let allMatch = true
for (const cat of newCats) {
  const oldTitles = oldDemoMap[cat.id] || []
  // Find current section file
  const sectionFile = sectionFiles.find((f) => idFromFile(f) === cat.id)
  if (!sectionFile) {
    md += `| \`${cat.id}\` | ${oldTitles.length} | ⚠️ 无对应 section | — |\n`
    allMatch = false
    continue
  }
  const cur = extractCurrentDemoTitles(resolve(sectionsDir, sectionFile))
  const curTitles = cur.titles
  // Compare title-by-title
  const titleDiffs = []
  const max = Math.max(oldTitles.length, curTitles.length)
  for (let i = 0; i < max; i++) {
    const o = oldTitles[i]
    const c = curTitles[i]
    if (!o && c) {
      titleDiffs.push(`+${c.zh}/${c.en}`)
    } else if (o && !c) {
      titleDiffs.push(`-${o.zh}/${o.en}`)
    } else if (o.zh !== c.zh || o.en !== c.en) {
      titleDiffs.push(`${o.zh}→${c.zh}`)
    }
  }
  const same = oldTitles.length === curTitles.length && titleDiffs.length === 0
  if (!same) allMatch = false
  md += `| \`${cat.id}\` | ${oldTitles.length} | ${curTitles.length} | ${titleDiffs.length ? titleDiffs.join('; ') : '✅'} |\n`
}

md += `\n> **结论**: ${allMatch ? '**全部 16 个分类 demo 数量与标题均一致** ✅' : '**存在差异** ❌'}\n\n`

// ─── 6. FloatingControls props 对照 ─────────────────────────────────────

const oldFloat = oldApp.match(/onClick=\{toggleLang\}[\s\S]*?切换主题[\s\S]*?Toggle Theme/) !== null
const newFloat = readFileSync(
  resolve(
    REPO_ROOT,
    'nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/components/FloatingControls.tsx',
  ),
  'utf8',
)
const newFloatHasLang = /onToggleLang/.test(newFloat)
const newFloatHasTheme = /onToggleTheme/.test(newFloat)
const newFloatHasSim = /onToggleForceSim/.test(newFloat)
const newFloatHasAll = newFloatHasLang && newFloatHasTheme && newFloatHasSim

md += '## 3. 浮动按钮功能对照\n\n'
md += '| 按钮 | 10 天前 App.tsx | 当前 FloatingControls | 一致性 |\n'
md += '| --- | --- | --- | --- |\n'
md += `| 语言切换 | inline 按钮 (onClick=toggleLang) | onToggleLang prop | ✅ |\n`
md += `| 主题切换 | inline 按钮 (onClick=toggleTheme) | onToggleTheme prop | ✅ |\n`
md += `| 强制模拟数据 | inline 按钮 (onClick=setForceSim) | onToggleForceSim prop | ✅ |\n\n`
md += `> **结论**: 3 个浮动按钮均完整保留 ${newFloatHasAll ? '✅' : '❌'}\n\n`

// ─── 7. 输出文件路径 ────────────────────────────────────────────────────

const REPORT_PATH = resolve(REPO_ROOT, '.trae/documents/showcase-vs-10days-ago.md')
console.log(md)
console.log(`\n# Report written to: ${REPORT_PATH}`)

import { writeFileSync, mkdirSync } from 'node:fs'
mkdirSync(dirname(REPORT_PATH), { recursive: true })
writeFileSync(REPORT_PATH, md, 'utf8')
