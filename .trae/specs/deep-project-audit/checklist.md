# 深度全方位审查 - 验证清单

## Phase 1: P0 功能性 Bug 与无障碍性

- [x] Toggle 组件点击 label 区域时状态仅切换一次（非两次抵消）
- [x] spinner.css 的 `@media (prefers-reduced-motion: reduce)` 选择器与 `.spinner-svg` 匹配
- [x] walkie-talkie.css 的 `@media (prefers-reduced-motion: reduce)` 选择器与 `.walkie-pulse` 匹配
- [x] inputs.js 使用 `bordered` 类名（非 `boxed`），bordered 变体输入框边框样式正确显示
- [x] Spinner 旋转动画结束后 `handleSpinEnd` 仅被调用一次
- [x] ErrorBoundary 包裹根组件，组件崩溃时显示降级 UI 而非白屏
- [x] Modal 包含 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`，关闭按钮有 `aria-label`
- [x] BottomSheet 包含 `role="dialog"`、`aria-modal="true"`，遮罩有 `aria-hidden="true"`
- [x] Dropdown 触发按钮有 `aria-haspopup="listbox"` 和 `aria-expanded`，选项有 `role="option"` 和 `aria-selected`
- [x] Tags.tsx 可交互 span 有 `role="button"`、`tabIndex={0}`、`onKeyDown`
- [x] Cards.tsx 可交互 div 有 `role="button"`、`tabIndex={0}`、`onKeyDown`
- [x] DataRows/DataGrid 可交互行有 `role`、`tabIndex`、键盘处理
- [x] Clipboard/PhotoCarousel 可点击项有键盘支持
- [x] Calendar/DateNav/MusicPlayer/Navigation 按钮有 `aria-label`
- [x] App.tsx 主题切换按钮有 `aria-label="Toggle theme"`
- [x] 装饰性 SVG 有 `aria-hidden="true"`
- [x] Inputs 组件 `<label>` 有 `htmlFor`，`<input>` 有 `id`，点击 label 可聚焦 input

## Phase 2: P1 CSS Token 合规与同步

- [x] css/tokens.css 和 react/src/styles/tokens.css 内容完全一致
- [x] tokens.css 包含 `--body-xs: 13px`、`--radius-xs: 6px`、`--radius-2xs: 2px`、`--shadow-drop`
- [x] tokens.css 包含 `--font-display`、`--font-body`、`--font-mono` token
- [x] tokens.css 包含 `--weight-light`、`--weight-regular`、`--weight-medium`、`--weight-bold` token
- [x] tokens.css 包含 `--z-base`、`--z-overlay`、`--z-modal` token
- [x] tokens.css 包含 `--space-sm-plus: 12px` token
- [x] 组件 CSS 中无 `:root`/`[data-theme]` 外的硬编码颜色值（#hex、rgb、rgba）
- [x] 组件 CSS 中所有 font-size 使用 var() token 引用
- [x] 组件 CSS 中所有 border-radius 使用 var() token 引用（1px 装饰性除外）
- [x] 所有 monospace font-family 包含 `'JetBrains Mono'` fallback
- [x] 所有 sans-serif font-family 包含 `'DM Sans', system-ui` fallback
- [x] 所有 Doto font-family 包含 `'JetBrains Mono'` fallback
- [x] 所有 Roboto font-family 包含 `'Helvetica Neue', Arial` fallback
- [x] 所有 CSS animation 组件的 prefers-reduced-motion 选择器正确匹配动画元素
- [x] 硬编码 padding/margin 匹配 token 的值已替换为 var() 引用
- [x] 硬编码 transition/animation duration 已替换为 token 引用
- [x] css/ 和 react/src/styles/ 下所有同名 CSS 文件内容完全一致

## Phase 3: P1 React 组件质量

- [x] Battery.tsx 和 SystemMonitor.tsx 无 @ts-ignore，使用 BatteryManager 类型声明
- [x] WeatherForecast 接口包含 `condition` 字段，无不安全类型断言
- [x] Clock.tsx 的 `getDashArray` 无未使用参数
- [x] Buttons/Cards/QuickToggle 的 onClick 类型包含 MouseEvent 参数
- [x] Battery.tsx 和 SystemMonitor.tsx 不通过 useEffect 同步 props 到 state
- [x] App.tsx 根元素使用 `<main>`，章节标题使用语义化标签
- [x] Caffeinate.tsx 的 `getCurrentCaffeine`/`getTimeToThreshold` 使用 useMemo
- [x] SunDial.tsx 的 `getRemaining`/`getSunPosition` 使用 useMemo

## Phase 4: P2 构建配置与基础设施

- [x] `.gitignore` 文件存在且包含 node_modules、dist 等规则
- [x] ESLint 配置文件存在
- [x] Prettier 配置文件存在
- [x] `.editorconfig` 文件存在
- [x] package.json 包含 `license`、`description` 字段
- [x] package.json 包含 `lint`、`type-check` 脚本
- [x] vite.config.ts 包含路径别名和 sourcemap 配置
- [x] tsconfig.json 包含 `forceConsistentCasingInFileNames`
- [x] favicon 引用指向实际存在的文件（或引用已移除）
- [x] vanilla/index.html 的 script 标签有 `defer` 属性
- [x] tokens.css 仅在 main.tsx 中全局导入一次，组件中无冗余导入
- [x] `npm run build` 构建通过
