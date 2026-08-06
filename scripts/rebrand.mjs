/**
 * 品牌标识符重命名：把 nothing 系列标识符统一替换为 aios。
 *
 * 只替换带连字符或下划线的标识符形式与明确的品牌写法，
 * 避免误伤英文单词 "nothing"（例如 "if nothing is urgent"）。
 *
 * 刻意保留两类内容：
 *  1. NothingEar —— 画的是 Nothing Ear 这款具体耳机，改名会指错对象；
 *  2. 关于 Nothing 这家公司的事实陈述（字体铸造厂、灵感来源、其设计理念），
 *     改写会让文档失真，这些出处说明本身有价值。
 *
 * 品牌字面量按字符拼接，避免脚本运行时替换掉自身的规则定义。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { basename } from 'node:path'

const DRY_RUN = process.argv.includes('--dry-run')
const SELF = basename(new URL(import.meta.url).pathname)

const OLD = ['n', 'o', 't', 'h', 'i', 'n', 'g'].join('')
const OLD_CAP = OLD[0].toUpperCase() + OLD.slice(1)
const NEW = 'aios'
const NEW_CAP = 'AIOS'

const KEEP_IDENTIFIERS = new Set([`${OLD_CAP}Ear`])

const KEEP_PHRASES = [
  `same foundry as ${OLD_CAP}'s actual typefaces`,
  `inspired by ${OLD_CAP}'s visual language`,
  `${OLD_CAP} rejects glass`,
  `${OLD_CAP} does not use shadows`,
  `${OLD_CAP} uses opaque`,
  `${OLD_CAP} adapts the`,
  `${OLD_CAP} Phone`,
  `${OLD_CAP} Ear`,
  `${OLD_CAP}'s monochrome language`,
  `${OLD_CAP}'s visual DNA`,
  `A ${OLD_CAP} interface does not pretend`,
  `In the ${OLD_CAP} system`,
  `the ${OLD_CAP} look`,
  `${OLD_CAP} 设计语言`,
  `${OLD_CAP} 的界面不假装`,
  `${OLD_CAP} 不用阴影`,
  `${OLD_CAP} 系统里层级`,
  `${OLD_CAP} 的栅格化渲染`,
]

const RULES = [
  // CSS 类名、CSS 变量、目录名、skill 名
  [new RegExp(`${OLD}-`, 'g'), `${NEW}-`],
  // 缓动 token：ease-<brand> 与 --ease-<brand>
  [new RegExp(`ease-${OLD}`, 'g'), `ease-${NEW}`],
  // 导出常量前缀
  [new RegExp(`${OLD.toUpperCase()}_`, 'g'), `${NEW_CAP}_`],
  // 字符串字面量（IconSource、Tailwind color key 等）
  [new RegExp(`'${OLD}'`, 'g'), `'${NEW}'`],
  // 品牌短语
  [new RegExp(`${OLD_CAP} red`, 'g'), `${NEW_CAP} red`],
  [new RegExp(`${OLD_CAP} 红`, 'g'), `${NEW_CAP} 红`],
  [new RegExp(`${OLD_CAP} adaptation`, 'g'), `${NEW_CAP} adaptation`],
  [new RegExp(`${OLD_CAP} design system`, 'g'), `${NEW_CAP} design system`],
  [new RegExp(`${OLD_CAP} design`, 'g'), `${NEW_CAP} design`],
  [new RegExp(`${OLD_CAP} Component`, 'g'), `${NEW_CAP} Component`],
  [new RegExp(`${OLD_CAP} components?`, 'g'), `${NEW_CAP} component`],
  [new RegExp(`${OLD_CAP} signature`, 'g'), `${NEW_CAP} signature`],
  [new RegExp(`${OLD_CAP} 的标签排版`, 'g'), `${NEW_CAP} 的标签排版`],
  [new RegExp(`${OLD_CAP}-Inspired`, 'g'), NEW_CAP],
  [new RegExp(`"${OLD_CAP} style"`, 'g'), `"${NEW_CAP} style"`],
  [new RegExp(`${OLD_CAP}-UI`, 'g'), `${NEW_CAP}-UI`],
  [new RegExp(`${OLD_CAP} UI`, 'g'), `${NEW_CAP} UI`],
]

const searchPattern = [
  `${OLD}-`,
  `ease-${OLD}`,
  `${OLD.toUpperCase()}_`,
  `'${OLD}'`,
  OLD_CAP,
].join('|')

const files = execSync(
  `rg -l "${searchPattern}" ` +
    `--glob '!node_modules' --glob '!dist' --glob '!**/es/**' ` +
    `--glob '!package-lock.json' --glob '!*.png' --glob '!*.jpg' --glob '!*.ico' .`,
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
)
  .trim()
  .split('\n')
  .filter(Boolean)
  .filter((f) => basename(f) !== SELF)

let changedFiles = 0
let totalReplacements = 0

for (const file of files) {
  const original = readFileSync(file, 'utf8')
  let fileReplacements = 0
  let next = original

  // 先把要保留的句子换成占位符，避免被后续规则改写
  const placeholders = []
  for (const phrase of KEEP_PHRASES) {
    if (next.includes(phrase)) {
      next = next.split(phrase).join(`\u0000K${placeholders.push(phrase) - 1}\u0000`)
    }
  }

  // PascalCase 标识符：NothingFoo -> AIOSFoo
  next = next.replace(new RegExp(`${OLD_CAP}([A-Z][a-zA-Z]*)`, 'g'), (match, suffix) => {
    if (KEEP_IDENTIFIERS.has(match)) return match
    fileReplacements += 1
    return `${NEW_CAP}${suffix}`
  })

  for (const [pattern, replacement] of RULES) {
    next = next.replace(pattern, () => {
      fileReplacements += 1
      return replacement
    })
  }

  next = next.replace(/\u0000K(\d+)\u0000/g, (_, i) => placeholders[Number(i)])

  if (next !== original) {
    changedFiles += 1
    totalReplacements += fileReplacements
    if (!DRY_RUN) writeFileSync(file, next)
  }
}

console.log(`${DRY_RUN ? '[dry-run] ' : ''}文件 ${changedFiles} 个，替换 ${totalReplacements} 处`)
