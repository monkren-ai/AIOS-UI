# Changelog

## 2.0.0

样式层整体重写：纯 CSS + BEM → **Tailwind CSS v4 + CVA**。视觉与绝大多数 API 保持不变；以下为破坏性变更。

### Breaking

- **产品名**：AIOS UI → **AIOS UI**
- **包名**：`aios-ui-kit-react` / `aios-ui` → **`aios-ui-kit`**（导入写作 `aios-ui-kit/button`）
- **仓库**：`monkren-ai/AIOS-UI` → **`monkren-ai/AIOS-UI`**（站点 `base` / `basename` 同步为 `/AIOS-UI/`）
- **Switch**：移除 `on`，改用 `checked`；新增 `defaultChecked`
- **Input / Textarea**：字符串回调改为 `onValueChange`；`onChange` 恢复为原生事件；Input 支持 `defaultValue`
- **Modal / Sheet**：`open` 改为必填
- **ContextMenu**：分隔线改为独立 `{ separator: true }` 条目（旧的条目级 `separator?: boolean` 仍短暂兼容）

### Added

- Tailwind v4 `@theme` 映射（`styles/theme.css`）+ `cn()`（`clsx` + `tailwind-merge`）
- `DirectionProvider`、`ReducedMotionProvider`
- ThemeProvider `storageKey` 与 `ThemeScript` 对齐
- 子路径导出 `aios-ui-kit/<kebab-name>`
- 文档站：`/docs` · `/components`（71 组件）· `/icons`（Nothing + Tabler）· `/showcase`
- `/docs/migrating-v2` 升级指南

### Changed

- 组件变体集中到 `*-variants.ts`（Tailwind 工具类）
- 构建：`tsdown` 产出 ESM `es/`；站点 Vite 分包（Tabler 独立 chunk）

## 1.x

见仓库历史与 `PROJECT_PROGRESS.md`（v1 功能完备阶段）。
