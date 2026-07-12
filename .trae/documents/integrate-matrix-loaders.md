# 集成 zzzzshawn/matrix 到 Nothing UI — 完成计划

## 摘要

将 [zzzzshawn/matrix](https://github.com/zzzzshawn/matrix)（Dotmatrix Loader Library）的 `loaders/` 库整合到 Nothing UI 的 React 应用中。采用「完整库基础设施 + 精选 12 个 loader 展示」方案；将现有静态 `DotMatrix.tsx` 重命名为 `StaticDotMatrix.tsx` 以避免命名混淆，新增 `DotMatrixLoadersSection` 展示矩阵加载器。

> **注**：本计划在上一轮会话中已获批准并执行了 Step 1–6，因上下文丢失中断于 Step 7 验证阶段。本文件更新为「当前进度 + 剩余工作」形式，供本轮会话完成收尾。

## 当前进度（已验证）

以下工作已在磁盘上完成，经 Read/Grep 确认：

| 步骤 | 状态 | 证据 |
|----|----|----|
| Step 1: 复制 matrix `loaders/` 库 | ✅ 完成 | `src/components/dotmatrix-loaders/` 含 30 文件：`core/`(12)、`base/`(1)、`hooks/`(3)、`loaders/`(12)、`index.ts`、`types.ts` |
| Step 2: 验证自包含性 | ✅ 完成 | 库内导入仅为 `react` 与相对路径；无 `@/lib`、`next/*` 越界导入（Grep 零命中） |
| Step 3: 迁移样式文件 | ✅ 完成 | `src/styles/dotmatrix-loaders.css` 存在；section 顶部 `import '@/styles/dotmatrix-loaders.css'` |
| Step 4: 重命名静态 DotMatrix | ✅ 完成 | `StaticDotMatrix.tsx` 存在；`DotMatrix.tsx` 已删除；无残留 `from '.../DotMatrix'` 导入（Grep 零命中） |
| Step 5: 创建展示 Section | ✅ 完成 | `src/sections/DotMatrixLoadersSection.tsx` 含 12 loader 网格，shape 标签，标题/描述 |
| Step 6: 接入 App.tsx | ✅ 完成 | L28 import、L120 lazy、L208 category、L1226-1228 三处 `<StaticDotMatrix>`、L1318-1320 section 渲染 |
| Step 6 衍生: widget 导入更新 | ✅ 完成 | Glyph.tsx:3、PhotoFrameWidget.tsx:6、WeatherWidget.tsx:4 均已 `import StaticDotMatrix from '../StaticDotMatrix'` |

### index.ts 导出（已验证，12 loader + 类型）

```ts
export type { DotMatrixCommonProps, DotMatrixPhase, DotShape, MatrixPattern } from "./types";
export type { DotMatrixColorPreset } from "./core/color-presets";
export { DotMatrixIcon } from "./loaders/dot-matrix-icon";
export { DotmSquare1, DotmSquare3, DotmSquare7, DotmSquare11, DotmSquare13, DotmSquare18 } from "./loaders/*";
export { DotmCircular1, DotmCircular5, DotmCircular8 } from "./loaders/*";
export { DotmTriangle1, DotmTriangle4 } from "./loaders/*";
```

## 剩余工作

### Task A: 修复 3 个 widget 文件中残留的 `<DotMatrix` JSX 标签（TS2307 根因）

重命名 `DotMatrix.tsx` → `StaticDotMatrix.tsx` 后，3 个 widget 文件的**导入行已更新**，但 **JSX 标签仍写作 `<DotMatrix`**，导致 TS2307（找不到名称 `DotMatrix`）。

**文件与待改位置**（Grep 确认，共 7 处 JSX + 1 处注释保留）：

1. [Glyph.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/Glyph.tsx)
   - L666: `<DotMatrix` → `<StaticDotMatrix`（1 处）

2. [PhotoFrameWidget.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/PhotoFrameWidget.tsx)
   - L150: `<DotMatrix` → `<StaticDotMatrix`（1 处）
   - L116: 注释 `// ...fallback 到 4x4 DotMatrix 几何占位` — **保留不动**（仅为注释，不影响编译）

3. [WeatherWidget.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/WeatherWidget.tsx)
   - L240, L304, L335, L364, L392: `<DotMatrix` → `<StaticDotMatrix`（5 处）

**方法**：对每个文件用 Edit `replace_all` 将 `<DotMatrix` 替换为 `<StaticDotMatrix`。安全前提：这 3 个文件中无 `<DotMatrixIcon`（已 Grep 确认 widgets 目录下 `DotMatrix` 命中仅上述 7 处 JSX + 导入行 + 1 注释，无 `DotMatrixIcon`），故 `replace_all` 不会误伤。

**注意**：替换 `<DotMatrix` 时需确认闭合标签 `</DotMatrix>` 也同步改为 `</StaticDotMatrix>`。Grep 仅匹配了开标签，但 JSX 要求开闭合一致。实施时对每个文件用 `replace_all` 同时替换 `<DotMatrix` 和 `</DotMatrix>` 两个模式（或先 Grep `</DotMatrix>` 确认数量）。

### Task B: 验证

```powershell
# 在 nothing-design-skill/nothing-design/web-ui-kit/react/ 目录下
npm run type-check   # 零类型错误（重点关注 TS2307 是否消除）
npm run dev          # 开发服务器正常启动
```

**浏览器检查**：
- 左侧导航出现「点阵加载器」分类，点击可跳转
- 12 个 loader 全部渲染并循环动画
- 原「视觉展示」区的静态点阵仍正常（`StaticDotMatrix`）
- 无控制台报错（motion 导入、CSS 变量、`dmx-*` 类）

## 假设与决策

1. **库自包含**：`loaders/` 文件夹不依赖 matrix 仓库的 `lib/`、`app/`、`components/`。已验证无越界导入。
2. **motion 导入统一**：库使用 CSS 动画（`.dmx-*` 类 + CSS 变量），不依赖 motion/framer-motion，无需导入统一。
3. **cn 处理**：库自带 `core/cx.ts`（无 tailwind-merge 依赖），与 Nothing UI 的 `cn`（clsx-only）互不干扰，各自独立使用。
4. **不修改 loader 内部动画逻辑**：仅做接入与导入适配。
5. **样式隔离**：`.dmx-*` 前缀与 Nothing UI 现有 `.nothing-*` 前缀不冲突。
6. **精选集可扩展**：完整库已复制进来，未来追加 loader 只需在 section 的 `loaders` 数组与 `index.ts` 增补。
7. **StaticDotMatrix 保留**：原静态点阵组件仍用于「视觉展示」区，仅改名澄清。
8. **注释保留**：PhotoFrameWidget.tsx L116 的注释提及 `DotMatrix` 是历史描述，不影响编译，保留不动以避免无谓改动。

## 验证步骤

1. `npm run type-check` — 零类型错误（TS2307 消除为重点）
2. `npm run dev` — 开发服务器正常启动
3. 浏览器检查「点阵加载器」区段 — 12 个 loader 全部动画正常
4. 浏览器检查「视觉展示」区段 — 静态点阵（StaticDotMatrix）仍正常
5. 控制台无报错
