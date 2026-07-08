# 移除 dumi，回归原始 Vite Showcase

## Summary

完全移除 `nothing-design-skill/nothing-design/web-ui-kit/react/` 中引入的 dumi 文档站，恢复为纯 Vite 驱动的 showcase 单页应用。同时将 `.github/workflows/deploy-docs.yml` 改造为 Vite 静态构建 + GitHub Pages 部署，使其继续在 `https://monkren-ai.github.io/Nothing-UI/` 提供 showcase 站点。

---

## Current State Analysis

### 已确认的 dumi 痕迹

| 位置 | 性质 | 处理 |
|------|------|------|
| `.dumirc.ts` | dumi 配置文件 | 删除 |
| `.dumi/` (整个目录) | dumi 自动生成 (`appData.json` / `core/` / `dumi/` / `plugin-html2sketch/` / `exports.ts` / `testBrowser.tsx` / `umi.ts`) | 删除（含 `git rm` 解除跟踪） |
| `.dumi/tsconfig.json` | 已被 `.dumi/tmp/` 间接引用 | 删除 |
| `docs/index.md` | dumi 文档站首页 | 删除 |
| `docs/showcase.md` | dumi 文档站 showcase 页 | 删除 |
| `src/**/index.md` ×66 | dumi 组件文档（含 frontmatter + `<code src="./demos/...">` 引用） | 删除 |
| `src/**/demos/index.tsx` ×66 | dumi 组件 demo 代码（仅被 dumi `<code>` 引用，showcase 自身不引用） | 删除（含空 `demos/` 目录） |
| `package.json` | devDependencies `dumi ^2.4.34`；scripts `dev:docs` / `docs:build` / `docs:dev` | 删除依赖与脚本 |
| `tsconfig.json` | `paths["@@/*"]` 指向 `.dumi/tmp/*`（仅 dumi tmp 内部使用） | 移除该路径 |
| `src/styles/tokens.css` | 第 138 行注释中提到 "dumi" | 改写注释，去除 dumi 引用 |
| `.github/workflows/deploy-docs.yml` | `npm run docs:build` (dumi build) 部署到 GH Pages | 重写为 Vite build |
| `vite.config.ts` | 当前 `base` 未配置（默认 `/`），GH Pages 子路径 `/Nothing-UI/` 下资源会 404 | 新增 `base: '/Nothing-UI/'` |
| `index.html` | `<title>Nothing UI Kit - React</title>` 仍可用 | 保留 |

### 不动的核心

- `src/main.tsx`（已直接渲染 `<Showcase />`）
- `src/showcase/**`（showcase 主体）
- `src/**/index.ts`（组件入口）
- `src/**/<Component>.tsx` 与 `<Component>.css`（组件实现）
- `src/**/<Component>.test.tsx`（测试）
- `es/`（已构建产物，由 `tsdown` 产出，与 dumi 无关）
- `tsdown.config.ts`、`vitest.config.ts`、`tailwind.config.js`、`postcss.config.js`、`eslint.config.js`、`.prettierrc`、`.lintstagedrc.mjs`、`commitlint.config.mjs`、`.editorconfig`、`components.json`
- 根目录 `.gitignore`、`.gitattributes`、`.github/workflows/` 目录

### 关键事实

- 当前 `main.tsx` 已经走 Vite 路径（`/src/main.tsx`），showcase 完全独立于 dumi，移除 dumi 不会影响本地 `npm run dev` 启动 showcase。
- `test-page.mjs` 通过 `http://localhost:5179/`（Vite 端口）验证组件，dumi 移除后该脚本无需改动。
- `tsconfig.json` 中 `"@@/*"` 路径仅 dumi tmp 内部使用，删除 `.dumi/` 后无任何代码引用，可安全移除。
- tokens.css 第 138 行 `[data-prefers-color="dark"]` / `[data-prefers-color="light"]` 选择器是 dumi 文档站切换主题的约定，showcase 自身通过 `useShowcaseState.toggleTheme` 设置 `data-theme`（非 `data-prefers-color`）。移除 dumi 后这些选择器将不再被使用，注释同步改写；CSS 规则本身**不删除**，避免对外部使用 `data-prefers-color` 的消费者产生破坏性变更。

---

## Proposed Changes

### Step 1: 配置 Vite 支持 GH Pages 子路径部署

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/vite.config.ts`

在 `defineConfig` 中新增 `base: '/Nothing-UI/'`，使 `vite build` 产物的资源引用与路由前缀一致。

```ts
export default defineConfig({
  base: '/Nothing-UI/',
  plugins: [react()],
  resolve: { alias: { ... } },
  build: { sourcemap: true },
  server: { port: 5173 },
})
```

**为什么**：用户选择"改为 Vite 构建部署"后，workflow 会把 `dist/` 发布到 `https://<user>.github.io/Nothing-UI/`。`base` 必须显式声明以避免静态资源 404。

---

### Step 2: 在 package.json 增加 `build:showcase` 脚本

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/package.json`

在 `scripts` 中新增：

```json
"build:showcase": "vite build",
```

保留 `dev`（vite）、`build`（tsdown，库产物）、`build:watch` 不变。删除以下 dumi 相关脚本：

- `dev:docs` (`dumi dev`)
- `docs:build` (`dumi build`)
- `docs:dev` (`dumi dev`)

在 `devDependencies` 中删除 `"dumi": "^2.4.34"`。

**为什么**：`docs:build` 后续不再存在，workflow 需要直接调用新脚本；显式 `build:showcase` 命名清晰区分库构建与展示页构建。

---

### Step 3: 清理 tsconfig.json 中的 dumi 路径

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/tsconfig.json`

从 `compilerOptions.paths` 中删除 `"@@/*": ["./.dumi/tmp/*"]` 整行，保留 `"@/*": ["./src/*"]`。

**为什么**：`.dumi/tmp/` 删除后该路径无意义，残留会触发 TS 解析错误。

---

### Step 4: 删除 dumi 配置与自动生成目录

**操作**：删除以下路径（保留本地文件，git 删除走后续 commit 阶段，本步骤只移除产物）。

- `nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts`
- `nothing-design-skill/nothing-design/web-ui-kit/react/.dumi/`（含 `tsconfig.json` 和 `tmp/`）

**为什么**：`tsdown` 构建与 `vite` 都不依赖 dumi；`.dumi/tmp/` 已与 `package-lock.json` 中 dumi 副本脱钩，删除后 dumi 不会重新生成（因 `dev:docs` / `docs:dev` 已删除）。

---

### Step 5: 删除 dumi 文档站入口

**操作**：删除以下文件。

- `nothing-design-skill/nothing-design/web-ui-kit/react/docs/index.md`
- `nothing-design-skill/nothing-design/web-ui-kit/react/docs/showcase.md`

并删除空目录 `docs/`。

**为什么**：dumi 文档站是 dumi 唯一使用者，移除后目录无意义。

---

### Step 6: 删除所有组件的 dumi 文档与 demo

**操作**：遍历删除 66 对文件。

- `nothing-design-skill/nothing-design/web-ui-kit/react/src/<Component>/index.md`
- `nothing-design-skill/nothing-design/web-ui-kit/react/src/<Component>/demos/index.tsx`

**实施方式**（仅描述，避免在只读阶段执行）：

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
# 列出待删除的 index.md
find src -mindepth 2 -name "index.md" -type f
# 列出待删除的 demos 目录
find src -mindepth 2 -type d -name "demos"
# 确认无业务代码引用 demos/ 与 index.md
grep -rE "from '.*demos" src
grep -rE "import.*index\.md" src
```

**为什么**：用户明确选择"全部删除"。`demos/index.tsx` 内的 demo 与 showcase 现有 sections 互不引用（已通过 grep 验证 `src/showcase` 无 `demos` 引用），保留会产生孤岛代码。

---

### Step 7: 改写 tokens.css 中 dumi 相关注释

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css`

第 137-139 行原内容：

```css
/* ===== 暗色主题（默认）=====
 * 同时响应 [data-theme]（ThemeProvider）和 [data-prefers-color]（dumi）。
 */
```

修改为：

```css
/* ===== 暗色主题（默认）=====
 * 通过 [data-theme]（ThemeProvider）切换；保留 [data-prefers-color] 选择器以便外部文档站（如 Storybook）复用。
 */
```

**为什么**：dumi 不再存在，但 `[data-prefers-color="dark|light"]` 规则对外可能仍有用（dumi 之外的文档/嵌入场景），不删除规则；仅更新注释与上游说明。

---

### Step 8: 重写 GitHub Pages workflow 为 Vite 部署

**文件**：`.github/workflows/deploy-docs.yml`

替换为以下内容：

```yaml
name: Deploy Showcase to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: nothing-design-skill/nothing-design/web-ui-kit/react/package-lock.json

      - name: Install dependencies
        working-directory: nothing-design-skill/nothing-design/web-ui-kit/react
        run: npm ci

      - name: Build showcase
        working-directory: nothing-design-skill/nothing-design/web-ui-kit/react
        env:
          NODE_ENV: production
        run: npm run build:showcase

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: nothing-design-skill/nothing-design/web-ui-kit/react/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**为什么**：GH Pages 子路径 `/Nothing-UI/` 由 Step 1 的 `vite.config.ts#base` 配合 `vite build` 产出正确路径；保留原 workflow 名称（避免 Settings/Pages 中已配的历史状态错位），仅替换构建步骤。

---

## Assumptions & Decisions

1. **showcase 入口不变**：`src/main.tsx` 已使用 Vite 渲染 `<Showcase />`，无 dumi 依赖。
2. **保留 tsdown 库构建**：`scripts.build` 仍然输出 `es/` 供组件库消费者使用，不动。
3. **不删除 tokens.css 的 `[data-prefers-color]` 规则**：该属性可能在外部文档工具复用，注释改写即可。
4. **不调整 eslint / vitest / tailwind / postcss / husky / commitlint / lint-staged 等配置**：它们与 dumi 解耦。
5. **不动 `tsdown.config.ts` 的 `scanEntries`**：库入口扫描与 dumi 无关。
6. **不修改 `vite.config.ts` 的 `server.port`**：保留 5173（`test-page.mjs` 用 5179 端口启动另一份验证，保持现状）。
7. **`index.html` 保留**：Vite 默认入口已正确指向 `/src/main.tsx`。
8. **步骤 6 的范围限定**：仅删除 `src/<Component>/index.md` 和 `src/<Component>/demos/index.tsx`；不删除 `src/<Component>/index.ts`（这是库入口）。`demos/` 目录删除后保留空的父目录清理（防止空目录在 git 中遗留）。

---

## Verification Steps

1. **依赖清理验证**：
   - `cd nothing-design-skill/nothing-design/web-ui-kit/react && grep -E "\"dumi\"|docs:build|docs:dev|dev:docs" package.json` 期望无输出。
   - `find . -name ".dumirc.ts" -o -name ".dumi"` 期望无输出（在 web-ui-kit/react 目录内）。

2. **TypeScript 编译**：
   - `npm run type-check` 应通过；`tsc --noEmit` 不应报 `@@/*` 路径解析错误。

3. **本地 showcase 启动**：
   - `npm run dev`，浏览器访问 `http://localhost:5173/`，确认 60+ 组件全部正常渲染、暗/亮主题可切换。
   - 浏览器控制台应无 dumi 相关 404。

4. **Vite 构建产物**：
   - `npm run build:showcase` 应产出 `dist/index.html`。
   - 检查 `dist/index.html`：所有 `<script src="...">` 与 `<link href="...">` 路径以 `/Nothing-UI/` 开头。
   - `dist/assets/` 中应出现 main 入口的 chunk 与 CSS。

5. **本地预览**：
   - `npx vite preview --base /Nothing-UI/`（或直接 `vite preview`），确认路由与资源无 404。

6. **测试**：
   - `npm run test` 应继续通过（vitest 不依赖 dumi）。

7. **Lint**：
   - `npm run lint` 应无 dumi 导入错误。

8. **GitHub Pages（待 push 后验证）**：
   - push 到 `main` 后，Actions 应成功完成 build + deploy。
   - 浏览器访问 `https://monkren-ai.github.io/Nothing-UI/`，确认 showcase 正常加载与主题切换。
