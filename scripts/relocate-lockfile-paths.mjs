/**
 * 把 lockfile 里 react 包的路径键从旧 workspace 根（web-ui-kit/）重写到仓库根布局。
 *
 * npm 10.x 在 workspace 根位置变化后会丢弃 lockfile 并从零解析依赖树，
 * 而该版本的 arborist 解析 vitest peer set 时会崩溃（edgesOut of null）。
 * 就地改写路径键可让 npm 复用既有解析结果，绕开这条代码路径。
 */
import { readFileSync, writeFileSync } from 'node:fs'

const [, , lockPath, oldPrefix, newPrefix] = process.argv

if (!lockPath || !oldPrefix || !newPrefix) {
  console.error('用法: node relocate-lockfile-paths.mjs <lockfile> <旧前缀> <新前缀>')
  process.exit(1)
}

const lock = JSON.parse(readFileSync(lockPath, 'utf8'))

const relocate = (key) =>
  key === oldPrefix || key.startsWith(`${oldPrefix}/`)
    ? newPrefix + key.slice(oldPrefix.length)
    : key

const packages = {}
for (const [key, value] of Object.entries(lock.packages)) {
  if (value.link && value.resolved) {
    value.resolved = relocate(value.resolved)
  }
  packages[relocate(key)] = value
}
lock.packages = packages

const root = lock.packages['']
if (root?.workspaces) {
  root.workspaces = root.workspaces.map(relocate)
}

writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`)

const moved = Object.keys(packages).filter((k) => k.startsWith(newPrefix)).length
console.log(`已重写 ${moved} 个路径键: ${oldPrefix} -> ${newPrefix}`)
