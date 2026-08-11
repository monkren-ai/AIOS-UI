# AIOS UI (`aios-ui-kit`)

面向 AI OS 场景的 React 组件库，视觉基于 **AIOS 设计语言**：**单色工业美学**、零阴影 / 零 blur / 零渐变，Tailwind CSS v4 + CVA。

当前版本 **2.0.0**。从 1.x / `aios-ui*` 升级请先看站点 `/docs/migrating-v2`。

## 安装

```bash
npm install aios-ui-kit motion
# 或
pnpm add aios-ui-kit motion
```

要求：

- **React 19+**（ref-as-prop，无 `forwardRef`）
- **Tailwind CSS v4**
- **motion ≥ 12**（peer；由你安装，经 `ConfigProvider` 注入）

## 快速开始

```css
/* app.css / globals.css */
@import 'tailwindcss';
@import 'aios-ui-kit/styles.css';

@source '../node_modules/aios-ui-kit/es';
```

```tsx
import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'
import { Button } from 'aios-ui-kit/button'
import './app.css'

export function App() {
  return (
    <ConfigProvider motion={motion} defaultTheme="dark" enableSystem>
      <Button variant="primary">Continue</Button>
    </ConfigProvider>
  )
}
```

子路径导入（推荐）：`aios-ui-kit/button`、`aios-ui-kit/input`……对应 `package.json` 的 `exports["./*"]`。

## 文档站

本地：

```bash
npm install
npm run dev
```

路由：`/` · `/docs` · `/components` · `/icons` · `/showcase`。  
GitHub Pages 使用仓库路径 `base: '/AIOS-UI/'`。

## 开发脚本

| 命令 | 作用 |
|------|------|
| `npm run sync:exports` | 同步 `src/index.ts` barrel |
| `npm run sync:subpaths` | 生成 `src/subpath/*` |
| `npm run build` | 构建库到 `es/`（含样式与类型） |
| `npm run build:showcase` | 构建文档 / showcase 站点 |
| `npm test` | Vitest |
| `npm run type-check` | `tsc --noEmit` |

## 许可证

MIT
