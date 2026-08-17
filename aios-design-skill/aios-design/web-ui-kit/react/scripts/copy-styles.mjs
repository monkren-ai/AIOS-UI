/**
 * 把 src 下全部 CSS 原样镜像到 es/，保留组件相对路径。
 *
 * tsdown 把 `.css` 当外部资源，只保留 import 语句、不产出文件，
 * 所以组件内的相对导入和 `aios-ui-kit/styles.css` 导出都需要自己填上。
 * 不做任何编译 —— 消费方的 Tailwind 会负责处理 `@theme`。
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const from = join(root, 'src')
const to = join(root, 'es')

if (!existsSync(from)) {
  console.error('src 不存在，跳过。')
  process.exit(0)
}

let copied = 0

function copyCss(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const sourcePath = join(directory, entry.name)
    if (entry.isDirectory()) {
      copyCss(sourcePath)
      continue
    }
    if (!entry.isFile() || !entry.name.endsWith('.css')) continue

    const targetPath = join(to, relative(from, sourcePath))
    mkdirSync(dirname(targetPath), { recursive: true })
    cpSync(sourcePath, targetPath)
    copied += 1
  }
}

copyCss(from)
console.log(`已复制 ${copied} 个样式文件到 es/。`)
