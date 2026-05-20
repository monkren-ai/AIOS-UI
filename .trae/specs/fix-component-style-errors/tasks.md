# Tasks

- [x] Task 1: 扩展 tokens.css — 新增 `--body-xs: 13px`、`--radius-2xs: 2px`、`--radius-xs: 6px`、`--shadow-drop: rgba(0,0,0,0.3)` token
  - [x] 在 React 版 `tokens.css` 的 `:root` 中添加新 token
  - [x] 同步到 vanilla 版 `tokens.css`

- [x] Task 2: 修复硬编码颜色值（3 处 rgba + 1 处 #FFFFFF）
  - [x] `chrono.css` L101: `#FFFFFF` → `var(--text-display)`
  - [x] `spinner.css` L30: `rgba(0,0,0,0.3)` → `var(--shadow-drop)`
  - [x] 验证 `modal.css` 和 `bottom-sheet.css` 的 overlay token 已生效

- [x] Task 3: 修复硬编码 font-size（11 处）
  - [x] `buttons.css`: `13px` → `var(--body-xs)`, `11px` → `var(--label)`, `14px` → `var(--body-sm)`
  - [x] `tags.css`: `10px` → `var(--widget-label)`
  - [x] `steps-widget.css`: `30px` → `var(--display-sm)` (32px 近似)
  - [x] `age-motion.css`: `8px` → `var(--widget-micro)`
  - [x] `pomodoro.css`: `72px` → `var(--display-xl)`
  - [x] `chrono.css`: `13px` → `var(--body-xs)`
  - [x] `caffeinate.css`: `48px` → `var(--display-lg)`
  - [x] `spinner.css`: `11px` → `var(--label)`
  - [x] `navigation.css`: `18px` → `var(--subheading)`

- [x] Task 4: 修复硬编码 border-radius（16 处）
  - [x] 10 处 `border-radius: 16px` → `var(--radius-lg)` (age-motion, pomodoro, sun-dial, clipboard, chrono, caffeinate, walkie-talkie, spinner, cards, music-player, calendar)
  - [x] 5 处 `border-radius: 999px` → `var(--radius-pill)` (segmented-control, tags, buttons×2, chrono)
  - [x] `segmented-control.css`: `6px` → `var(--radius-xs)`
  - [x] `chrono.css` L163: `2px` → `var(--radius-2xs)`
  - [x] `progress-bar.css` L20: `2px` → `var(--radius-2xs)`

- [x] Task 5: 修复硬编码 padding/margin（14 处匹配 token 的值）
  - [x] `inputs.css`: `8px 0` → `var(--space-sm) 0` (×2)
  - [x] `cards.css`: `20px 24px` → `20px var(--space-lg)`, `16px` → `var(--space-md)`
  - [x] `tags.css`: `4px 12px` → `var(--space-xs) 12px`
  - [x] `buttons.css`: `12px 24px` → `12px var(--space-lg)`, `8px 16px` → `var(--space-sm) var(--space-md)`, `14px 32px` → `14px var(--space-xl)`
  - [x] `age-motion.css`: `8px 0` → `var(--space-sm) 0`
  - [x] `chrono.css`: `12px 24px` → `12px var(--space-lg)`

- [x] Task 6: 统一 font-family fallback 链（16 处）
  - [x] 5 处 `'Space Mono', monospace` → `'Space Mono', 'JetBrains Mono', monospace` (time-widget×2, calendar×3)
  - [x] 8 处 `'Doto', 'Space Mono', monospace` → `'Doto', 'Space Mono', 'JetBrains Mono', monospace` (system-monitor×2, calendar×2, battery, clock, age-motion, pomodoro, sun-dial)
  - [x] 3 处 `'Space Grotesk', sans-serif` → `'Space Grotesk', 'DM Sans', system-ui, sans-serif` (data-grid, bottom-sheet, modal, states)

- [x] Task 7: 添加 prefers-reduced-motion 支持（3 个文件）
  - [x] `walkie-talkie.css`: 为 `walkie-pulse-anim` 添加 `@media (prefers-reduced-motion: reduce) { animation: none }`
  - [x] `states.css`: 为 `nothing-spinner-pulse` 添加 `@media (prefers-reduced-motion: reduce) { animation: none }`
  - [x] `spinner.css`: 为旋转 transition 添加 `@media (prefers-reduced-motion: reduce) { transition: none }`

- [x] Task 8: 修复残留 !important（2 处）
  - [x] `inputs.css` L55-56: `.nothing-input--error .nothing-input__field` 的 `!important` → 通过提高选择器特异性解决

- [x] Task 9: 修复硬编码 transition duration（2 处）
  - [x] `segmented-control.css`: `200ms ease-out` → `var(--duration-micro) var(--easing)` (×2)

- [x] Task 10: 同步 vanilla CSS 与 React CSS
  - [x] 将 React `src/styles/` 下所有修改过的文件复制到 `web-ui-kit/css/` 对应路径

- [x] Task 11: 验证构建通过
  - [x] 运行 `npm run build` 确认无 TypeScript 和构建错误

# Task Dependencies
- [Task 1] 是 [Task 2-5] 的前置依赖（新增 token 需先定义）
- [Task 2-9] 可并行执行
- [Task 10] 依赖 [Task 2-9] 全部完成
- [Task 11] 依赖 [Task 10] 完成
