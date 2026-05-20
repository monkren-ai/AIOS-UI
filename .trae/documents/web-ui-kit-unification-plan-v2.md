# web-ui-kit 组件统一计划 V2

## 当前状态（前期已执行）

| 操作 | 状态 |
|------|------|
| 删除 Vanilla JS (`js/` + `css/` + `vanilla/`) | ✅ 已完成 |
| 删除 shadcn 40 个重复组件 | ✅ 已完成 |
| 删除 `nothing-UI kit/` Rainmeter 皮肤 | ✅ 已完成 |
| 整合 `2.0/` → `react/shadcn/` | ✅ 已完成 |
| NothingWidgets20 规整到 `widgets/` | ✅ 已完成 |
| PNG 规整到 `assets/images/` | ✅ 已完成 |

## shadcn 残余 8 个独有文件

```
react/shadcn/src/app/components/ui/
├── calendar.tsx          ← Tailwind + react-day-picker
├── carousel.tsx          ← Tailwind + embla-carousel
├── chart.tsx             ← Tailwind + recharts
├── command.tsx           ← Tailwind + cmdk
├── sidebar.tsx           ← Tailwind + CSS vars
├── sonner.tsx            ← Tailwind + sonner toast
├── use-mobile.ts         ← 纯 hook
└── utils.ts              ← cn() 含 tailwind-merge

react/shadcn/src/styles/
├── tailwind.css          ← 删除
├── theme.css             ← 令牌合并到 tokens.css 后删除
├── fonts.css             ← 删除（NDOT 声明，react 系统用 Google Fonts）
├── index.css             ← 删除（源入口级联）
```

---

## 执行步骤

### Step 1: 提取 shadcn Token 到 tokens.css

将 `shadcn/theme.css` 中的 Nothing 品牌色值合并到 `react/src/styles/tokens.css`：

| shadcn 变量 | 值 | tokens.css 目标 |
|------------|-----|-----------------|
| `--radius: 1.25rem` | 20px | `--radius-lg: 1.25rem` |
| `#1a1d1c` | 深色主色 | 暗色主题已覆盖 |
| `#FCFAFE` | 近白 | `--text-display` 亮色主题 |
| `#e1e5ea` | 浅灰 | `--surface-dim` 新增 |
| `#aeabb1` | 强调灰 | `--text-secondary` |
| `#6c696e` | 次级文字 | `--text-tertiary` |

### Step 2: 删除 shadcn 残余配置文件

```
删除:
  shadcn/src/styles/tailwind.css
  shadcn/src/styles/theme.css      (令牌已合并)
  shadcn/src/styles/fonts.css       (NDOT 声明，react 用 Google Fonts)
  shadcn/src/styles/index.css       (入口级联)
  shadcn/postcss.config.mjs         (Tailwind 构建)
  shadcn/src/main.tsx               (shadcn 独立入口)
  shadcn/index.html                 (shadcn 独立 HTML)
```

### Step 3: 迁移 NothingWidgets20 到 react/src/components/widgets/

```
移动:
  shadcn/src/app/components/widgets/NothingWidgets20.tsx → react/src/components/widgets/NothingWidgets20.tsx
  shadcn/src/app/components/widgets/svg-qvv4ctcv53.ts    → react/src/components/widgets/svg-qvv4ctcv53.ts
  shadcn/src/assets/images/*.png (7个)                    → react/src/assets/  (或保留在 shadcn 待定)
```

### Step 4: 转换 shadcn 独有组件为纯 CSS + BEM 模式

对 6 个需要转换的组件，将 Tailwind inline class 提取为独立 CSS 文件：

| shadcn 文件 | → react/src/styles/ | 依赖 |
|------------|---------------------|------|
| `calendar.tsx` | `calendar.css` 新增样式（已有 react 版本的文件名 `calendar.css`，需合并不覆盖） | react-day-picker（保留） |
| `carousel.tsx` | `carousel.css` 新建 | embla-carousel（保留） |
| `chart.tsx` | `chart.css` 新建 | recharts（保留） |
| `command.tsx` | `command.css` 已有同名文件，补全样式 | cmdk（保留） |
| `sidebar.tsx` | `sidebar.css` 已有同名文件，补全样式 | 无额外依赖 |
| `sonner.tsx` | `sonner.css` 已有同名文件，检查 | sonner（保留） |

转换原则：
- Tailwind `rounded-2xl` → `border-radius: var(--radius-lg)`
- Tailwind `bg-primary text-primary-foreground` → `background: var(--accent); color: var(--text-display)`
- Tailwind `flex items-center gap-2` → `display: flex; align-items: center; gap: var(--space-xs)`
- Tailwind `transition-all duration-200` → `transition: all var(--duration-micro) var(--easing)`
- Tailwind `animate-in fade-in-0` → `animation: fadeIn var(--duration-micro) var(--easing)`

### Step 5: 迁移工具函数

```
移动并修改:
  shadcn/src/app/components/ui/use-mobile.ts → react/src/hooks/useMobile.ts
  shadcn/src/app/components/ui/utils.ts      → react/src/lib/utils.ts (移除 tailwind-merge，仅保留 clsx)
```

### Step 6: 更新 NothingWidgets20 导入

NothingWidgets20.tsx 内部引用：
- `svg-qvv4ctcv53.ts` → 相对路径 `./svg-qvv4ctcv53` 不变
- `figma:asset/*.png` → 由 vite 插件解析到 `src/assets/images/`，检查路径
- 任何 Tailwind class → 替换为纯 CSS class（从 `widgets.css`）

### Step 7: 更新 package.json

在 `react/package.json` 中：
- 移除：`@tailwindcss/vite`, `tailwindcss`, `tw-animate-css`, `class-variance-authority`
- 添加需要的新依赖（如果有，检查 NothingWidgets20 实际依赖）

### Step 8: 删除 shadcn 目录

整个 `react/shadcn/` 目录删除（所有内容已移出或不再需要）。

### Step 9: 验证

```
cd react && pnpm install && pnpm dev
```

检查：
1. React Showcase（App.tsx）正常渲染所有组件
2. NothingWidgets20 正常渲染
3. 浏览器无 404、无样式错误
4. 无 TypeScript 错误

---

## 最终结构

```
web-ui-kit/react/
├── src/
│   ├── main.tsx                  (统一入口)
│   ├── App.tsx                   (统一 Showcase，包含 NothingWidgets20)
│   ├── components/
│   │   ├── Accordion.tsx         (79 个 React 组件)
│   │   ├── ...                   
│   │   └── widgets/
│   │       ├── NothingWidgets20.tsx
│   │       └── svg-qvv4ctcv53.ts
│   ├── styles/
│   │   ├── tokens.css            (统一设计令牌)
│   │   └── ...                   (83 个 CSS 文件)
│   ├── hooks/                    (6 个 hook)
│   ├── lib/
│   │   └── utils.ts
│   └── assets/images/            (7 个 PNG)
├── package.json                  (无 Tailwind 依赖)
└── vite.config.ts                (无 Tailwind 插件)
```

---

## 变更量统计

| 操作 | 文件数 |
|------|--------|
| 转换 shadcn 组件 Tailwind→CSS | 6 个 tsx + 6 个 css |
| 新增 CSS 文件 | ~3 个（carousel.css, chart.css 等） |
| 更新 tokens.css | 1 个 |
| 迁移组件/工具 | 4 个（NothingWidgets20×2 + useMobile + utils） |
| 删除 shadcn 残余 | ~10 个（配置 + 样式 + 入口） |
| 删除 shadcn 整个目录 | 1 个 |
| 更新 package.json | 1 个 |

## 不涉及

- ❌ 不修改 React 79 个组件业务逻辑
- ❌ 不修改 hooks/ 已有 5 个 hook
- ❌ 不改变 BEM 命名约定
