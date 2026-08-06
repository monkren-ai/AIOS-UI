import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  readFileSync(join(__dirname, 'package.json'), 'utf-8'),
) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

// 文档站已拆至 ../docs，库 build 只扫描组件目录
const NON_LIBRARY_DIRS = new Set<string>()

// Dynamic scan: src/*/index.ts + src/index.ts + src/subpath/*.ts as multi-entry
const scanEntries = (): Record<string, string> => {
  const entries: Record<string, string> = {};
  const srcDir = join(__dirname, 'src');

  // 主入口 src/index.ts
  const mainEntry = join(srcDir, 'index.ts');
  if (existsSync(mainEntry)) {
    entries.index = mainEntry;
  }

  // 子目录入口 src/*/index.ts
  if (existsSync(srcDir)) {
    const dirs = readdirSync(srcDir, { withFileTypes: true });
    for (const dir of dirs) {
      if (!dir.isDirectory() || NON_LIBRARY_DIRS.has(dir.name)) continue;
      const entryPath = join(srcDir, dir.name, 'index.ts');
      if (existsSync(entryPath)) {
        entries[dir.name] = entryPath;
      }
    }
  }

  // subpath 入口 src/subpath/*.ts —— 对应 package.json 的 "./*" 导出，
  // 让 `import { Button } from 'aios-ui-kit/button'` 有真实文件可落。
  const subpathDir = join(srcDir, 'subpath');
  if (existsSync(subpathDir)) {
    for (const file of readdirSync(subpathDir)) {
      if (!file.endsWith('.ts')) continue;
      entries[`subpath/${file.slice(0, -3)}`] = join(subpathDir, file);
    }
  }

  return entries;
};

export default defineConfig({
  entry: scanEntries(),
  format: ['esm'],
  outDir: 'es',
  dts: true,
  sourcemap: true,
  unbundle: true,
  external: [...external, /\.css$/],
});
