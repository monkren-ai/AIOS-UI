# 修复组件展示不全 Spec

## Why
统一计划完成后，`App.tsx` 缺少对新创建 CSS 文件（`widgets.css`/`carousel.css`/`chart.css`）的导入，导致新增组件的 BEM 样式不生效，Nothing Widgets 2.0 区域、Carousel、Chart 组件无法正常渲染。

## What Changes
- 在 `App.tsx` 中新增 `widgets.css`、`carousel.css`、`chart.css` 的 CSS import
- 补充 `widgets.css` 中遗漏的 CSS 类（`widget-pill--light`/`widget-pill--dark` / `widget-card-wrapper`）
- 修复 NothingWidgets20.tsx 中残留的 Tailwind 类（`rounded-[20px]`、`bg-[#...]` 等 ~22 处）
- 验证 dev server 无编译错误且组件正确展示

## Impact
- Affected specs: 无（修复性变更）
- Affected code: `src/App.tsx`, `src/styles/widgets.css`, `src/components/widgets/NothingWidgets20.tsx`

## ADDED Requirements
### Requirement: App.tsx 导入新 CSS 文件
系统 SHALL 在 App.tsx 的 CSS import 区块中导入 `widgets.css`、`carousel.css`、`chart.css`。

#### Scenario: 组件样式生效
- **WHEN** dev server 运行
- **THEN** Nothing Widgets 2.0 区域、Carousel、Chart 组件的 BEM 样式正确应用

### Requirement: widgets.css 补充遗漏类
系统 SHALL 在 `widgets.css` 中补充 `widget-card-wrapper`、`widget-pill--light`、`widget-pill--dark` 等遗漏的 CSS 类。

#### Scenario: Pill 组件样式正确
- **WHEN** 渲染 Pill 类型组件（152x68 胶囊形）
- **THEN** 背景色和圆角正确应用（浅色 `#fcfafe` / 深色 `#1a1d1c`）

### Requirement: 清理 NothingWidgets20 残留 Tailwind
系统 SHALL 将 NothingWidgets20.tsx 中所有残留的 Tailwind 任意值类（`bg-[#...]`、`rounded-[20px]` 等）替换为 BEM 类。

#### Scenario: 无 Tailwind 残留
- **WHEN** 对 NothingWidgets20.tsx 执行 `grep bg-\[#|rounded-\[2`
- **THEN** 返回 0 个匹配