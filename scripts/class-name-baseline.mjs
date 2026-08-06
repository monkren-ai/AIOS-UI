/**
 * 提取品牌前缀类名的使用基线，用于重命名前后比对。
 *
 * CSS 类名改错不会让构建或类型检查失败，只会让样式静默失效，
 * 所以重命名前后各跑一次，确认「CSS 中定义的类名」与「代码中引用的类名」
 * 两个集合的交集规模不变。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const [, , prefix, outPath] = process.argv

if (!prefix || !outPath) {
  console.error('用法: node class-name-baseline.mjs <前缀> <输出 json>')
  process.exit(1)
}

const files = execSync(
  `rg -l "${prefix}-" --glob '!node_modules' --glob '!dist' --glob '!**/es/**' --glob '!package-lock.json' .`,
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
)
  .trim()
  .split('\n')
  .filter(Boolean)

const classRe = new RegExp(`${prefix}-[a-zA-Z0-9_-]+`, 'g')

const definedInCss = new Set()
const usedInCode = new Set()

for (const file of files) {
  const text = readFileSync(file, 'utf8')

  if (file.endsWith('.css')) {
    // CSS 里以 .foo 形式出现的才算「定义」
    for (const m of text.matchAll(new RegExp(`\\.(${prefix}-[a-zA-Z0-9_-]+)`, 'g'))) {
      definedInCss.add(m[1])
    }
  } else {
    for (const m of text.matchAll(classRe)) {
      usedInCode.add(m[0])
    }
  }
}

const matched = [...usedInCode].filter((c) => definedInCss.has(c))

writeFileSync(
  outPath,
  `${JSON.stringify(
    {
      prefix,
      fileCount: files.length,
      definedInCss: [...definedInCss].sort(),
      usedInCode: [...usedInCode].sort(),
      matchedCount: matched.length,
    },
    null,
    2,
  )}\n`,
)

console.log(`前缀 ${prefix}- | 文件 ${files.length}`)
console.log(`  CSS 中定义: ${definedInCss.size}`)
console.log(`  代码中引用: ${usedInCode.size}`)
console.log(`  两边匹配上: ${matched.length}`)
