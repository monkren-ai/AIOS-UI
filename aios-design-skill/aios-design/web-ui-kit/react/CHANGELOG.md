# Changelog

## 3.0.0

### Added

- 新增独立的主题家族 API：`ThemeDefinition`、`ThemeTokenValues`、`ThemeImportResult`、`AIOS_BUILTIN_THEMES`、`parseDtcgTheme()` 与 `serializeDtcgTheme()`。
- `ThemeProvider` / `ConfigProvider` 支持 `themes`、`defaultThemeId`、`themeIdStorageKey`、`onThemeIdChange`；Context 新增 `themeId`、`activeTheme`、`themes`、`setThemeId`。
- 内置 AIOS Default、AIOS Paper、AIOS High Contrast 三套双模式主题；`ThemeScript` 可恢复主题快照，避免首屏闪回。
- 文档站新增 `/themes`，支持浏览器本地 DTCG 2025.10 文件审查、启用、替换、导出与删除。

### Breaking

- 删除 `Caffeinate`、`Clipboard`、`MusicPlayer`、`PhotoCarousel`、`Quotes`、`WalkieTalkie`、`DateWidget`、`Taskbar`、`WidgetCard` 及其子路径导出。
- `Card` 删除 `mode="widget"`，只保留普通内容卡片。
- `Battery` 删除 `widgetMode`；`QuickToggle`、`AgeMotion`、`NextEvent`、`SunDial` 删除独立 `theme`，统一使用全局语义令牌。
- 删除全部 Widget 专用令牌、注册表、样式与文档展示。

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
- 文档站：`/docs` · `/components`（71 组件）· `/icons`（AIOS + Tabler）· `/showcase`
- `/docs/migrating-v2` 升级指南

### Changed

- 组件变体集中到 `*-variants.ts`（Tailwind 工具类）
- 构建：`tsdown` 产出 ESM `es/`；站点 Vite 分包（Tabler 独立 chunk）

## 1.x

见仓库历史与 `PROJECT_PROGRESS.md`（v1 功能完备阶段）。
