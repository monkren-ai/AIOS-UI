# 启用项目 gh-pages 自动部署

## 任务摘要

为 `Nothing-UI` 仓库启用 GitHub Pages：将 `nothing-design-skill/nothing-design/web-ui-kit/react/`（React + dumi 文档站）自动构建并发布到 `gh-pages` 分支，通过 GitHub Actions 实现 push 到 `main` 后自动部署。

最终可访问地址：`https://monkren-ai.github.io/Nothing-UI/`

## 现状分析

### 项目结构

- 仓库远端：`https://github.com/monkren-ai/Nothing-UI.git`
- 默认分支：`main`
- 可部署子项目：`nothing-design-skill/nothing-design/web-ui-kit/react/`
  - 框架：React 19 + dumi 2.4.34（组件库 + 文档站一体）
  - 构建命令：`npm run docs:build`（dumi build，输出到 `dist/`）
  - 构建产物路径：`nothing-design-skill/nothing-design/web-ui-kit/react/dist`
  - 已存在配置：`.dumirc.ts`（含 `base: '/'`、`publicPath: '/'`）

### 现有 dumi 关键配置（`.dumirc.ts`）

```typescript
base: '/',
publicPath: '/',
```

这两项在 GitHub Pages 子路径部署（`/Nothing-UI/`）下会导致：
- 资源 404（`publicPath` 错误）
- 路由失效（`base` 错误，刷新页面 404）

### GitHub 仓库状态

- 无 `.github/workflows/` 目录，无任何 CI/CD
- 无 `gh-pages` 分支
- 无 `.nvmrc`（需在 workflow 中显式指定 Node 版本）

### 关键约束

- 用户选择：**GitHub Actions 自动部署**（推荐）
- GitHub Pages 路径：必须以 `/Nothing-UI/` 为 base
- 不修改构建产物结构（dumi build 默认输出 `dist/index.html`）

## 方案

### 步骤 1：修改 `.dumirc.ts` 适配子路径部署

文件：`nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts`

将硬编码的 `/` 改为基于 `homepage` 派生（参考 dumi 官方子路径部署文档），保持向后兼容：

```typescript
import { resolve } from 'node:path';
import { defineConfig } from 'dumi';
import { description, name } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
// GitHub Pages 站点根（仓库名）
const repoName = 'Nothing-UI';
const basePath = `/${repoName}/`;
const homepage = `https://github.com/monkren-ai/${repoName}`;

const themeConfig = { /* ... 保持原样 ... */ };

export default defineConfig({
  // ... 保持原样
  base: basePath,           // 改: '/' → '/Nothing-UI/'
  publicPath: basePath,     // 改: '/' → '/Nothing-UI/'
  // ... 其余保持原样
});
```

**为什么**：dumi 的 `base` 控制客户端路由 base，路由跳转、`<Link>` 生成路径均依赖它；`publicPath` 控制静态资源（JS/CSS/字体）的 URL 前缀。两者都设为 `/Nothing-UI/` 才能在 `https://monkren-ai.github.io/Nothing-UI/` 下正确工作。

### 步骤 2：创建 GitHub Actions workflow

新建文件：`.github/workflows/deploy-docs.yml`

```yaml
name: Deploy Docs to GitHub Pages

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

      - name: Build docs site
        working-directory: nothing-design-skill/nothing-design/web-ui-kit/react
        env:
          NODE_ENV: production
        run: npm run docs:build

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

**为什么**：
- `actions/checkout@v4`：拉取代码
- `actions/setup-node@v4` + `node-version: '20'`：dumi 2.4 / Vite 8 推荐 Node 20+
- `npm ci`：使用 lockfile 锁定依赖（仓库内已有 `package-lock.json`）
- `npm run docs:build`：执行 dumi 静态站点构建
- `actions/configure-pages@v5` + `upload-pages-artifact@v3` + `deploy-pages@v4`：官方 Pages 部署三件套
- `permissions: pages: write, id-token: write`：官方推荐 Pages 部署所需权限
- `concurrency.group: pages`：防止并发部署导致 race condition
- 触发条件：`push to main` + `workflow_dispatch`（手动触发）

### 步骤 3：GitHub 仓库端配置（需用户操作，**不在自动化范围内**）

在 GitHub 仓库页面：
1. 进入 `Settings` → `Pages`
2. `Source` 选择 **`GitHub Actions`**（非 "Deploy from a branch"）
3. 保存

> 注：如果不显式选择 GitHub Actions，Pages 会默认从 `gh-pages` 分支读取。Actions 部署方案下，**不**需要也不应该手动创建 `gh-pages` 分支——它由 `actions/deploy-pages@v4` 自动管理。

### 步骤 4：验证

1. 推送 commit 到 `main` 触发 workflow
2. 在仓库 `Actions` 标签页确认 `Deploy Docs to GitHub Pages` 运行成功
3. 访问 `https://monkren-ai.github.io/Nothing-UI/` 验证：
   - 首页可访问
   - 切换 `/components/button`、`/showcase` 等路由后刷新页面，不出现 404
   - 浏览器 DevTools Network 中 JS/CSS 资源 URL 都带 `/Nothing-UI/` 前缀
   - 主题切换、暗/亮模式正常

## 待修改/新建文件

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts` | 修改 | `base` 和 `publicPath` 从 `'/'` 改为 `'/Nothing-UI/'` |
| `.github/workflows/deploy-docs.yml` | 新建 | GitHub Actions 自动构建并部署到 Pages |

## 假设与决策

- **使用官方 `actions/deploy-pages` 而非 `peaceiris/actions-gh-pages`**：官方 action 权限更细、配置更简单，无需 `GITHUB_TOKEN` push 到 gh-pages 分支
- **不创建 `gh-pages` 分支**：官方 deploy-pages action 通过 artifact + Pages API 部署，不依赖物理分支存在
- **Node 版本选择 20**：dumi 2.4、Vite 8、tsdown 0.22 均兼容 Node 20 LTS；若后续升级 dumi 3 可能需 Node 22
- **不改构建产物目录**：dumi build 默认输出 `dist/`，与 `upload-pages-artifact` 路径匹配
- **不改 docs 源文件**：base 改动后 dumi 会自动生成正确的 `index.html`（含 `<base href="/Nothing-UI/">`）
- **不动 `package.json` 的 scripts**：现有 `docs:build` 已满足需求

## 不在范围内

- 自定义域名 / CNAME（用户未要求）
- 改 dumi 主题或组件库代码
- 添加 build cache、preview deploy、环境隔离
- 修改 `vite.config.ts`（不影响 dumi 构建产物）
- 配置 Pages 仓库端 `Source: GitHub Actions`（需用户在 GitHub UI 操作）

## 验证步骤

1. **本地构建验证**（提交前）：
   ```bash
   cd nothing-design-skill/nothing-design/web-ui-kit/react
   npm ci
   npm run docs:build
   npx serve dist -l 5000
   # 访问 http://localhost:5000/Nothing-UI/ 检查 base 路径是否正确
   ```
2. **GitHub UI 设置**：仓库 Settings → Pages → Source 选择 `GitHub Actions`
3. **推送触发**：commit 并 push 到 main
4. **Actions 验证**：仓库 Actions 标签页查看 workflow 状态
5. **站点验证**：浏览器访问 `https://monkren-ai.github.io/Nothing-UI/`，测试多页面路由刷新、资源加载、主题切换

## 风险与回滚

- **风险 1：dumi 2.4 base 兼容性**——若 base 改动后 dumi 内部生成路径异常，可临时回退 `base: '/'` 并改用子目录托管（`Settings → Pages → Branch: gh-pages / (root)`）。本方案是 dumi 官方推荐做法，兼容性高。
- **风险 2：Actions 权限不足**——若组织仓库对 Pages 写入权限受限，workflow 会失败；需在组织 Settings → Actions → General 中允许读写 Pages。
- **回滚**：删除 `.github/workflows/deploy-docs.yml` 并还原 `.dumirc.ts` 即可。
