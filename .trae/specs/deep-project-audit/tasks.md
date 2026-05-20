# Tasks

## Phase 1: P0 - 功能性 Bug 与无障碍性关键修复

- [x] Task 1: 修复 Toggle 组件双重触发 Bug
  - [x] 移除 Toggles.tsx 中 `<label>` 上的 `onClick={handleToggle}`
  - [x] 仅保留 `<input onChange={handleToggle}>` 处理状态切换
  - [x] 验证点击 label 区域时 Toggle 正常切换（仅切换一次）

- [x] Task 2: 修复 prefers-reduced-motion 选择器不匹配 Bug
  - [x] 修复 spinner.css：将 `@media (prefers-reduced-motion: reduce)` 中的 `.nothing-spinner__wheel` 改为 `.spinner-svg`
  - [x] 修复 walkie-talkie.css：将 `@media (prefers-reduced-motion: reduce)` 中的 `.nothing-walkie-talkie__btn--recording` 改为 `.walkie-pulse`
  - [x] 同步修复 react/src/styles/ 中的对应文件

- [x] Task 3: 修复 inputs.js 类名 Bug
  - [x] 将 inputs.js 中 `boxed` 类名改为 `bordered`，与 CSS 定义一致

- [x] Task 4: 修复 Spinner 双重结束处理 Bug
  - [x] 移除 Spinner.tsx 中的 `setTimeout` 调用 `handleSpinEnd`，仅保留 `onTransitionEnd` 触发
  - [x] 验证旋转动画结束后 `handleSpinEnd` 仅被调用一次

- [x] Task 5: 添加 ErrorBoundary
  - [x] 创建 ErrorBoundary 组件（class component with componentDidCatch）
  - [x] 在 App.tsx 或 main.tsx 中包裹根组件
  - [x] 提供降级 UI（Nothing 风格的错误提示）

- [x] Task 6: 修复 Modal/BottomSheet 无障碍性
  - [x] Modal.tsx：添加 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`，关闭按钮添加 `aria-label="Close"`，背景遮罩添加 `aria-hidden="true"`
  - [x] BottomSheet.tsx：添加 `role="dialog"`、`aria-modal="true"`，"Done" 按钮添加 `aria-label`，背景遮罩添加 `aria-hidden="true"`，拖拽手柄添加 `aria-hidden="true"`

- [x] Task 7: 修复 Dropdown 无障碍性
  - [x] 触发按钮添加 `aria-haspopup="listbox"` 和 `aria-expanded={isOpen}`
  - [x] 菜单容器添加 `role="listbox"`
  - [x] 选项添加 `role="option"` 和 `aria-selected`

- [x] Task 8: 修复可交互元素键盘可访问性
  - [x] Tags.tsx：span onClick → 添加 `role="button"`、`tabIndex={0}`、`onKeyDown`；移除按钮改用 `<button>`
  - [x] Cards.tsx：可交互卡片 div onClick → 添加 `role="button"`、`tabIndex={0}`、`onKeyDown`
  - [x] DataRows.tsx：可交互行 div onClick → 添加 `role`、`tabIndex`、`onKeyDown`
  - [x] DataGrid.tsx：同上
  - [x] Clipboard.tsx：可点击项 div onClick → 添加键盘支持
  - [x] PhotoCarousel.tsx：指示器 div onClick → 改用 `<button>` 或添加键盘支持

- [x] Task 9: 修复按钮/图标缺少 aria-label
  - [x] Calendar.tsx：导航按钮添加 `aria-label="Previous month"` / `"Next month"`
  - [x] DateNav.tsx：箭头按钮添加 `aria-label`
  - [x] MusicPlayer.tsx：控制按钮添加 `aria-label`
  - [x] Navigation.tsx：返回按钮添加 `aria-label`
  - [x] App.tsx：主题切换按钮添加 `aria-label="Toggle theme"`
  - [x] 所有装饰性 SVG 添加 `aria-hidden="true"`

- [x] Task 10: 修复 Inputs label 关联
  - [x] Inputs.tsx：添加 `id` prop，`<label>` 添加 `htmlFor`，`<input>` 添加 `id`

## Phase 2: P1 - CSS Token 合规与同步

- [x] Task 11: 同步 tokens.css 并补全缺失 token
  - [x] 将 `--body-xs: 13px`、`--radius-xs: 6px`、`--radius-2xs: 2px`、`--shadow-drop` 补充到 css/tokens.css
  - [x] 新增 token：`--font-display`、`--font-body`、`--font-mono`
  - [x] 新增 token：`--weight-light`、`--weight-regular`、`--weight-medium`、`--weight-bold`
  - [x] 新增 token：`--z-base`、`--z-overlay`、`--z-modal`
  - [x] 新增 token：`--space-sm-plus: 12px`
  - [x] 确保 css/tokens.css 和 react/src/styles/tokens.css 完全一致

- [x] Task 12: 修复硬编码颜色值（2 处 hex + 6 处 rgba）
  - [x] chrono.css：`#FFFFFF` → `var(--text-display)`
  - [x] bottom-sheet.css：`rgba(0,0,0,0.5)` → `var(--overlay-light)`
  - [x] modal.css：`rgba(0,0,0,0.8)` → `var(--overlay-heavy)`
  - [x] spinner.css：`rgba(0,0,0,0.3)` → `var(--shadow-drop)`
  - [x] 同步修复 css/ 和 react/src/styles/ 两个目录

- [x] Task 13: 修复硬编码 font-size（css/ 8 处 + react/ 2 处）
  - [x] css/buttons.css：`13px` → `var(--body-xs)`、`11px` → `var(--label)`、`14px` → `var(--body-sm)`
  - [x] css/caffeinate.css：`48px` → `var(--display-lg)`
  - [x] css/chrono.css：`13px` → `var(--body-xs)`
  - [x] css/navigation.css：`18px` → `var(--subheading)`
  - [x] css/steps-widget.css：`30px` → `var(--display-sm)`
  - [x] css/tags.css：`10px` → `var(--widget-label)`
  - [x] react/styles/buttons.css：`11px` → `var(--label)`
  - [x] react/styles/chrono.css：`13px` → `var(--body-xs)`

- [x] Task 14: 修复硬编码 border-radius（css/ 11 处 + react/ 2 处）
  - [x] css/buttons.css：`999px` → `var(--radius-pill)`（2 处）
  - [x] css/caffeinate.css：`16px` → `var(--radius-lg)`
  - [x] css/chrono.css：`16px` → `var(--radius-lg)`、`999px` → `var(--radius-pill)`、`2px` → `var(--radius-2xs)`
  - [x] css/clipboard.css：`16px` → `var(--radius-lg)`
  - [x] css/music-player.css：`16px` → `var(--radius-lg)`
  - [x] css/tags.css：`999px` → `var(--radius-pill)`
  - [x] css/world-clock.css：`8px` → `var(--radius-md)`（两个目录）
  - [x] react/styles/bottom-sheet.css：`1px` 装饰性保留

- [x] Task 15: 修复 font-family 回退链（~25 处）
  - [x] 所有 `'Roboto', sans-serif` → `'Roboto', 'Helvetica Neue', Arial, sans-serif`
  - [x] 所有 `'Space Mono', monospace` → `'Space Mono', 'JetBrains Mono', monospace`
  - [x] 所有 `'Doto', 'Space Mono', monospace` → `'Doto', 'Space Mono', 'JetBrains Mono', monospace`
  - [x] 所有 `'NDOT 47', 'Space Mono', monospace` → `'NDOT 47', 'Space Mono', 'JetBrains Mono', monospace`
  - [x] 所有 `'Space Grotesk', sans-serif` → `'Space Grotesk', 'DM Sans', system-ui, sans-serif`
  - [x] 修复 compass-widget.css 和 activity-widget.css 中缺少引号的 `Roboto`

- [x] Task 16: 修复硬编码 padding/margin 和 duration
  - [x] 替换匹配 token 的 padding/margin 值（buttons、chrono、data-grid、tags 等 ~14 处）
  - [x] 替换硬编码 transition/animation duration
  - [x] 替换硬编码 gap 值（states.css、navigation.css）

- [x] Task 17: 同步 css/ 与 react/src/styles/ 所有 CSS 文件
  - [x] 逐文件对比 css/ 和 react/src/styles/ 下的同名 CSS 文件
  - [x] 将 react 版本已修复但 css 版本未修复的差异同步到 css 版本
  - [x] 确保所有文件内容完全一致

## Phase 3: P1 - React 组件质量修复

- [x] Task 18: 修复 TypeScript 类型问题
  - [x] 创建 BatteryManager 类型声明（替代 @ts-ignore）
  - [x] 修复 WeatherWidget.tsx 的不安全类型断言（补全 WeatherForecast 接口的 condition 字段）
  - [x] 移除 Clock.tsx 中未使用的 `_angle` 参数
  - [x] 修复 onClick 类型：Buttons.tsx、Cards.tsx、QuickToggle.tsx → `(e: React.MouseEvent<HTMLElement>) => void`

- [x] Task 19: 修复 Props 同步到 State 反模式
  - [x] Battery.tsx：移除 useEffect 同步，改用 `const percent = initialPercent ?? internalPercent` 模式
  - [x] SystemMonitor.tsx：移除 7 个 useEffect 同步，改用派生值模式

- [x] Task 20: 修复语义化 HTML
  - [x] App.tsx：根元素 `<div>` → `<main>`，章节标题 `<div>` → `<h2>`/`<h3>`
  - [x] Calendar.tsx：日历网格添加 `role="grid"` 语义
  - [x] States.tsx：`<div className="nothing-state__headline">` → `<h3>`

- [x] Task 21: 修复 useCallback/useMemo 使用不当
  - [x] Caffeinate.tsx：`getCurrentCaffeine` 和 `getTimeToThreshold` 从 useCallback 改为 useMemo
  - [x] SunDial.tsx：`getRemaining` 和 `getSunPosition` 从 useCallback 改为 useMemo

## Phase 4: P2 - 构建配置与项目基础设施

- [x] Task 22: 添加项目配置文件
  - [x] 创建 `.gitignore`（node_modules、dist、.DS_Store 等）
  - [x] 创建 ESLint 配置（eslint.config.js）
  - [x] 创建 Prettier 配置（.prettierrc）
  - [x] 创建 `.editorconfig`

- [x] Task 23: 完善 package.json
  - [x] 添加 `license: "MIT"`、`description`、`author` 字段
  - [x] 添加 `lint`、`type-check`、`format`、`format:check` 脚本
  - [x] 添加 eslint 和 prettier devDependencies

- [x] Task 24: 修复构建配置
  - [x] vite.config.ts：添加路径别名 `@`、sourcemap 配置
  - [x] tsconfig.json：添加 `forceConsistentCasingInFileNames`、路径别名映射
  - [x] 修复 favicon：移除 index.html 中不存在的 vite.svg 引用
  - [x] vanilla/index.html：为 38 个 script 标签添加 `defer` 属性

- [x] Task 25: 优化 CSS 导入策略
  - [x] tokens.css 仅在 main.tsx 中全局导入一次
  - [x] 移除 34 个组件/App 文件中冗余的 tokens.css 导入

- [x] Task 26: 验证构建通过
  - [x] 运行 `npm run build` 确保构建成功 ✅
  - [x] 修复 App.tsx 中截断的字符串字面量（2 处）
  - [x] 修复 SunDial.tsx 中 useMemo 重命名后的引用错误

# Task Dependencies
- [Task 11] 必须在 [Task 12-16] 之前完成（token 补全后才能替换硬编码值）
- [Task 17] 依赖 [Task 12-16]（先修复所有 CSS 问题，再统一同步）
- [Task 22-23] 可并行执行
- [Task 26] 依赖所有其他 Task 完成
- [Task 1-10] 之间无依赖，可并行执行
- [Task 18-21] 之间无依赖，可并行执行
