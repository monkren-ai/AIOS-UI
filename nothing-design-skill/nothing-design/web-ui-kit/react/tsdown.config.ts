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

// Dynamic scan: src/*/index.ts + src/index.ts as multi-entry
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
      if (!dir.isDirectory()) continue;
      const entryPath = join(srcDir, dir.name, 'index.ts');
      if (existsSync(entryPath)) {
        entries[dir.name] = entryPath;
      }
    }
  }

  return entries;
};

export default defineConfig({
  entry: scanEntries(),
  format: ['esm'],
  outDir: 'es',
  dts: false,
  sourcemap: true,
  unbundle: true,
  external: [...external, /\.css$/],
});
