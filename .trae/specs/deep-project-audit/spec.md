# Nothing UI 项目深度全方位审查 Spec

## Why
项目经过多轮迭代开发，已积累大量技术债务：CSS 设计 token 覆盖不完整（~88 处硬编码值）、React 组件存在严重的无障碍性缺陷（25+ 处 ARIA 缺失）、Vanilla JS 与 React 版本不同步、构建配置缺失关键工具链、以及多个功能性 Bug（Toggle 双重触发、prefers-reduced-motion 选择器不匹配、inputs.js 类名错误等）。需要系统性修复以确保组件库的可用性、可访问性和可维护性。

## What Changes
- 修复所有 CSS 硬编码值 → 替换为设计 token（hex 颜色 2 处、rgba 6 处、font-size 10 处、border-radius 13 处、padding/margin 14 处、duration 10 处）
- 修复 font-family 回退链不一致（~25 处）
- 修复 prefers-reduced-motion 选择器不匹配 Bug（2 处）
- 同步 css/tokens.css 与 react/src/styles/tokens.css（4 个缺失 token）
- 同步 css/ 与 react/src/styles/ 的 CSS 文件差异
- 修复 React 组件无障碍性缺陷（ARIA 属性、语义化 HTML、键盘可访问性）
- 修复 Toggle 组件双重触发 Bug
- 修复 inputs.js 类名 Bug（`boxed` → `bordered`）
- 修复 Spinner 双重结束处理 Bug
- 添加缺失的 ErrorBoundary
- 修复 Props 同步到 State 的反模式
- 补全缺失的设计 token（字体家族、字重、z-index 等）
- 添加 ESLint / Prettier 配置
- 添加 .gitignore
- 修复构建配置问题（favicon 404、缺少路径别名等）

## Impact
- Affected specs: nothing-ui-kit-web 组件库全量、fix-component-style-errors 规范
- Affected code:
  - `web-ui-kit/css/` 全部 40 个 CSS 文件
  - `web-ui-kit/react/src/styles/` 全部 40 个 CSS 文件
  - `web-ui-kit/react/src/components/` 全部 39 个 React 组件
  - `web-ui-kit/react/src/App.tsx`
  - `web-ui-kit/js/` 全部 36 个 Vanilla JS 组件
  - `web-ui-kit/react/package.json`、`vite.config.ts`、`tsconfig.json`
  - `web-ui-kit/vanilla/index.html`

## ADDED Requirements

### Requirement: 零硬编码颜色值
所有组件 CSS 中 SHALL NOT 包含 `:root` / `[data-theme]` 定义之外的硬编码颜色值（#hex、rgb()、rgba()）。

#### Scenario: 颜色值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件（不含 tokens.css）
- **THEN** 不存在 `:root` / `[data-theme]` 块之外的 `#xxxxxx`、`rgb()`、`rgba()` 值

### Requirement: 零硬编码字号值
所有组件 CSS 中的 font-size SHALL 使用 `var(--*)` token 引用。

#### Scenario: 字号值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 所有 `font-size` 属性使用 `var(--*)` 引用，不存在裸 `px` 值

### Requirement: 零硬编码圆角值
所有组件 CSS 中的 border-radius SHALL 使用 `var(--radius-*)` token 引用。

#### Scenario: 圆角值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 所有 `border-radius` 属性使用 `var(--radius-*)` 引用（1px 装饰性 hairline 除外）

### Requirement: 统一 font-family fallback 链
所有 monospace 声明 SHALL 包含 `'JetBrains Mono'` 中间回退；所有 sans-serif 声明 SHALL 包含 `'DM Sans', system-ui` 中间回退；所有 Doto 声明 SHALL 包含 `'JetBrains Mono'` 回退；所有 Roboto 声明 SHALL 包含 `'Helvetica Neue', Arial` 中间回退。

#### Scenario: font-family 一致性
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 不存在缺少规定中间回退字体的 font-family 声明

### Requirement: prefers-reduced-motion 选择器正确匹配
所有 `@media (prefers-reduced-motion: reduce)` 中的选择器 SHALL 与实际动画元素的选择器完全匹配。

#### Scenario: 减少动效功能正常工作
- **WHEN** 用户系统开启减少动效设置
- **THEN** 所有 CSS 动画停止，组件显示静态终态（当前 spinner.css 和 walkie-talkie.css 的选择器不匹配导致此功能失效）

### Requirement: tokens.css 双版本同步
`css/tokens.css` 和 `react/src/styles/tokens.css` SHALL 包含完全相同的 token 定义。

#### Scenario: token 定义一致
- **WHEN** 对比两个 tokens.css 文件
- **THEN** 所有 token 名称和值完全一致

### Requirement: 补全缺失设计 token
tokens.css SHALL 包含以下缺失的 token 类别：字体家族（`--font-display`、`--font-body`、`--font-mono`）、字重（`--weight-light`、`--weight-regular`、`--weight-medium`、`--weight-bold`）、z-index（`--z-base`、`--z-overlay`、`--z-modal`）、间距（`--space-sm-plus: 12px`）。

#### Scenario: token 覆盖完整
- **WHEN** 组件需要引用字体家族、字重、z-index 时
- **THEN** 可以直接使用对应的 token 而非硬编码值

### Requirement: Vanilla CSS 与 React CSS 同步
`web-ui-kit/css/` 目录下的所有 CSS 文件 SHALL 与 `web-ui-kit/react/src/styles/` 下的对应文件内容完全一致。

#### Scenario: 双版本同步
- **WHEN** 对比 vanilla 和 React 版本的同名 CSS 文件
- **THEN** 文件内容完全一致

### Requirement: 对话框组件无障碍性
Modal 和 BottomSheet 组件 SHALL 包含 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`，背景遮罩 SHALL 设置 `aria-hidden="true"`，关闭按钮 SHALL 包含 `aria-label`。

#### Scenario: 屏幕阅读器可识别对话框
- **WHEN** 屏幕阅读器用户打开 Modal 或 BottomSheet
- **THEN** 读屏器正确播报对话框角色和标题

### Requirement: 下拉菜单无障碍性
Dropdown 组件 SHALL 包含 `aria-haspopup="listbox"`、`aria-expanded`、`role="listbox"`、`role="option"`、`aria-selected`。

#### Scenario: 屏幕阅读器可操作下拉菜单
- **WHEN** 屏幕阅读器用户操作 Dropdown
- **THEN** 读屏器正确播报菜单状态和选项

### Requirement: 可交互元素键盘可访问性
所有使用 `onClick` 的非按钮元素（div、span）SHALL 添加 `role="button"`、`tabIndex={0}` 和 `onKeyDown` 处理（Enter/Space 触发点击）。

#### Scenario: 键盘用户可操作所有交互元素
- **WHEN** 键盘用户 Tab 到可交互的 div/span 元素
- **THEN** 可以通过 Enter 或 Space 键触发操作

### Requirement: Toggle 组件单次触发
Toggle 组件 SHALL 仅通过 `<input onChange>` 处理状态切换，移除 `<label onClick>` 以避免双重触发。

#### Scenario: Toggle 切换正常
- **WHEN** 用户点击 Toggle 的 label 区域
- **THEN** 状态仅切换一次（当前会切换两次导致状态不变）

### Requirement: inputs.js 类名正确
Vanilla JS 的 inputs.js SHALL 使用 `bordered` 类名而非 `boxed`，与 CSS 定义一致。

#### Scenario: bordered 变体输入框正常显示
- **WHEN** 使用 bordered 变体创建 Input 组件
- **THEN** 边框样式正确应用

### Requirement: Spinner 单次结束处理
Spinner 组件 SHALL 仅通过一种方式触发 `handleSpinEnd`（移除 `setTimeout` 或 `onTransitionEnd` 中的一个），避免双重调用。

#### Scenario: Spinner 旋转结束处理正确
- **WHEN** Spinner 旋转动画结束
- **THEN** `handleSpinEnd` 仅被调用一次

### Requirement: ErrorBoundary 保护
React 应用 SHALL 在根组件层级包含 ErrorBoundary，防止单个组件崩溃导致整个应用白屏。

#### Scenario: 组件崩溃不导致白屏
- **WHEN** 某个组件渲染期间抛出异常
- **THEN** ErrorBoundary 捕获异常并显示降级 UI，其他组件正常渲染

### Requirement: Props 同步到 State 反模式修复
Battery 和 SystemMonitor 组件 SHALL NOT 通过 useEffect 将 props 同步到内部 state。应使用派生值模式：`const value = propValue ?? internalValue`。

#### Scenario: Props 变化立即反映
- **WHEN** 传入的 prop 值发生变化
- **THEN** 组件立即使用新值，无需等待 useEffect 执行

### Requirement: 构建配置完整性
项目 SHALL 包含 `.gitignore`、ESLint 配置、Prettier 配置；`package.json` SHALL 包含 `license`、`description` 字段和 `lint`、`type-check` 脚本；index.html 的 favicon 引用 SHALL 指向实际存在的文件。

#### Scenario: 开发工具链完整
- **WHEN** 新开发者克隆项目
- **THEN** 可以通过 `npm run lint`、`npm run type-check` 执行代码质量检查

### Requirement: onClick 类型完整
所有接受 `onClick` prop 的组件 SHALL 使用 `(e: React.MouseEvent<HTMLElement>) => void` 类型，允许使用者访问事件对象。

#### Scenario: 事件对象可访问
- **WHEN** 使用者传入 onClick 回调
- **THEN** 回调参数包含完整的 MouseEvent 对象

### Requirement: label 与 input 关联
Inputs 组件 SHALL 通过 `id`/`htmlFor` 属性将 `<label>` 与 `<input>` 关联。

#### Scenario: 点击 label 聚焦 input
- **WHEN** 用户点击 Input 组件的 label 文本
- **THEN** 对应的 input 元素获得焦点

## MODIFIED Requirements

### Requirement: 完整的 prefers-reduced-motion 支持
所有使用 CSS animation 的组件 SHALL 提供 `@media (prefers-reduced-motion: reduce)` 回退，且选择器 SHALL 与实际动画元素完全匹配。修复 spinner.css 和 walkie-talkie.css 中选择器不匹配的 Bug。

## REMOVED Requirements

（无移除的需求）
