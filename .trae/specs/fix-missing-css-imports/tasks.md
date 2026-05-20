# Tasks

- [x] Task 1: App.tsx 添加缺失的 CSS 导入
  - 在 CSS import 区块末尾添加 `import './styles/widgets.css'`
  - 在 CSS import 区块末尾添加 `import './styles/carousel.css'`
  - 在 CSS import 区块末尾添加 `import './styles/chart.css'`

- [x] Task 2: widgets.css 补充遗漏的 CSS 类
  - 添加 `widget-card-wrapper` 类（justify-self: stretch; position: relative; flex-shrink: 0;）
  - 补充 `widget-rounded-16`（16px 圆角）
  - 补充 `widget-rounded-pill`（250px 胶囊形圆角）

- [x] Task 3: 清理 NothingWidgets20.tsx 残留 Tailwind 类
  - 替换所有 `bg-[#1a1d1c]` → `widget-bg-dark` ✅
  - 替换所有 `bg-[#fcfafe]` → `widget-bg-light` ✅
  - 替换所有 `bg-[#3b393e]` → `widget-bg-grey` ✅
  - 替换所有 `rounded-[20px]` → `widget-card--rounded` ✅
  - 替换所有 `rounded-[16px]` → `widget-rounded-16` ✅
  - 替换所有 `rounded-[250px]` → `widget-rounded-pill` ✅
  - 确认 grep `bg-\[#` 返回 0 个匹配 ✅
  - 确认 grep `rounded-\[2` 返回 0 个匹配 ✅

- [x] Task 4: 验证 dev server 编译无错误
  - 确认 pnpm dev 无编译错误 ✅
  - 确认 TypeScript 无诊断错误 ✅

# Task Dependencies
- Task 2, Task 3 可并行执行
- Task 4 依赖 Task 1, Task 2, Task 3 全部完成