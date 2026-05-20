# 项目全量梳理与整合计划（V2）

## 用户要求

- ❌ 移除 `nothing-UI kit/` Rainmeter 桌面皮肤（~300 个文件，与 Web 无关）
- 🔀 将 `2.0/` 整合到 `web-ui-kit/react/` 下

---

## 结构分析

### 两个 React 项目对比

| | `web-ui-kit/react/` | `2.0/` |
|---|---|---|
| 构建工具 | Vite 5 | Vite 6 |
| 样式方案 | vanilla CSS（tokens.css） | Tailwind CSS v4 |
| 组件数量 | 79 个自定义 Nothing 组件 | 47 个 shadcn/ui 组件 |
| 独有组件 | 时钟、电池、日历、音乐播放器等 | NothingWidgets20 全功能组件 |
| 字体 | Doto / Space Grotesk / Space Mono | Roboto / NDOT 47 |
| 状态 | 独立项目，含 Showcase 演示 | 独立项目，含 NothingWidgets 演示 |

### 整合决策

将 2.0 作为 `web-ui-kit/react/shadcn/` 子目录独立存放，保持其 Tailwind 构建体系不变。两者不合并 package.json，各自 `pnpm install` / `pnpm dev`。

---

## 执行步骤

### Step 1: 删除 nothing-UI kit Rainmeter 皮肤

```
删除整个目录:
  nothing-design-skill/nothing-design/nothing-UI kit/
```

约 300 个文件，释放几百 MB。此目录与 Web 组件库 **无任何代码关联**。

### Step 2: 移除 2.0 中的冗余文件

删除以下文件（在移动前清理干净）：

| # | 路径 | 原因 |
|---|------|------|
| 1 | `2.0/src/styles/globals.css` | 空文件 (0 字节) |
| 2 | `2.0/default_shadcn_theme.css` | 无引用 |
| 3 | `2.0/src/app/components/figma/ImageWithFallback.tsx` | 无导入 |
| 4 | `2.0/guidelines/Guidelines.md` | 空模板 |
| 5 | `2.0/README.md` | 占位模板 |
| 6-12 | `2.0/src/imports/NothingWidgets20/*.png` (7个) | 与 `src/assets/` 重复 |

同步删除空目录：`figma/`、`guidelines/`

### Step 3: 规整 2.0 内部组件目录

在移动之前，将 2.0 内部结构整理好：

```
移动前:
  src/imports/NothingWidgets20/
    ├── NothingWidgets20.tsx
    └── svg-qvv4ctcv53.ts

移动后:
  src/app/components/widgets/
    ├── NothingWidgets20.tsx
    └── svg-qvv4ctcv53.ts
```

同时规整 assets：
```
移动前:  src/assets/*.png (7个)
移动后:  src/assets/images/*.png (7个)
```

**涉及修改**：
- `App.tsx` 导入路径：`"../imports/NothingWidgets20/NothingWidgets20"` → `"./components/widgets/NothingWidgets20"`
- `vite.config.ts` figmaAssetResolver 路径：`src/assets` → `src/assets/images`

### Step 4: 移动 2.0 到 web-ui-kit/react/shadcn/

```
移动:
  2.0/ 整个目录 → web-ui-kit/react/shadcn/
```

移动后删除空的 `2.0/` 目录。

### Step 5: 验证

1. 进入 `web-ui-kit/react/shadcn/` 运行 `pnpm install && pnpm dev`
2. 确认页面正常渲染
3. 确认图片加载无 404
4. 确认 web-ui-kit/react/ 原有项目不受影响

---

## 变更前后对比

```
清理前:
nothing-design-skill/nothing-design/
├── 2.0/                           ← 移动
├── nothing-UI kit/                ← 删除
└── web-ui-kit/
    ├── react/
    ├── css/
    ├── js/
    └── vanilla/

清理后:
nothing-design-skill/nothing-design/
├── web-ui-kit/
│   ├── react/
│   │   ├── ...                    (79 组件，原样不动)
│   │   └── shadcn/                ← 2.0 移入
│   │       ├── src/
│   │       │   ├── main.tsx
│   │       │   ├── app/
│   │       │   │   ├── App.tsx
│   │       │   │   └── components/
│   │       │   │       ├── ui/         (47 个 shadcn 组件)
│   │       │   │       └── widgets/    (NothingWidgets20)
│   │       │   ├── assets/images/      (7 个 PNG)
│   │       │   └── styles/             (4 个 CSS)
│   │       ├── package.json
│   │       ├── vite.config.ts
│   │       └── index.html
│   ├── css/                       (Vanilla CSS)
│   ├── js/                        (Vanilla JS)
│   └── vanilla/
├── SKILL.md
└── references/
```

---

## 涉及修改的文件

| 操作 | 文件 | 说明 |
|------|------|------|
| 修改 | `2.0/src/app/App.tsx` | 更新 NothingWidgets 导入路径 |
| 修改 | `2.0/vite.config.ts` | 更新 figmaAssetResolver 路径 |
| 删除 | `nothing-UI kit/` 整个目录 | Rainmeter 皮肤 |
| 删除 | 12 个冗余文件 | globals.css、default_shadcn_theme.css 等 |
| 移动 | `2.0/` → `web-ui-kit/react/shadcn/` | 整合 |
| 移动 | 2 个文件 | NothingWidgets20.tsx + svg-qvv4ctcv53.ts → widgets/ |
| 移动 | 7 个 PNG | src/assets/ → src/assets/images/ |
| 新建 | `src/app/components/widgets/` | 目录 |
| 新建 | `src/assets/images/` | 目录 |

## 不动

- ❌ web-ui-kit/react/ 原有 79 个组件 + 83 个 CSS
- ❌ web-ui-kit/css/ + web-ui-kit/js/ + web-ui-kit/vanilla/
- ❌ SKILL.md + references/
- ❌ .figma/ + .trae/ + .vscode/
- ❌ 不在 2.0/src/app/components/ui/ 的 47 个 shadcn 组件文件上做任何样式修改
