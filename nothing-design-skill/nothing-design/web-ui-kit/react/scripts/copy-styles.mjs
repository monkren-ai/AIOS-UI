/**
 * 把 src/styles/*.css 原样搬到 es/styles/。
 *
 * tsdown 把 `.css` 当外部资源，只保留 import 语句、不产出文件，
 * 所以 `nothing-ui/styles.css` 这个导出得自己填上。
 * 不做任何编译 —— 消费方的 Tailwind 会负责处理 `@theme`。
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const from = join(root, 'src/styles')
const to = join(root, 'es/styles')

if (!existsSync(from)) {
  console.error('src/styles 不存在，跳过。')
  process.exit(0)
}

mkdirSync(to, { recursive: true })
cpSync(from, to, { recursive: true, filter: (src) => !src.endsWith('.ts') })
console.log('已复制样式到 es/styles/。')
