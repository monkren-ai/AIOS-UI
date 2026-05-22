# Tasks

- [x] Task 1: 修复 SKILL.md 文档与实现的不一致
  - [x] 1.1: 移除 Vanilla JavaScript 相关的所有描述（框架选择步骤、Quick Start 示例、`new NothingClock` API、`web-ui-kit/css/` 和 `web-ui-kit/js/` 路径引用）
  - [x] 1.2: 更新 React Quick Start 示例，反映实际项目结构（修正导入路径、移除手动 CSS 导入说明因组件已自行导入）
  - [x] 1.3: 统一组件命名：Toggles→Toggle, Cards→Card, Dropdown→DropdownMenu, BottomSheet→Sheet
  - [x] 1.4: 补齐 Available Components 列表中遗漏的 38 个组件（Accordion, Alert, AspectRatio, Avatar, Badge, Breadcrumb, Checkbox, Collapsible, Command, ContextMenu, DotMatrix, ErrorBoundary, Form, HoverCard, InputOTP, Label, NavigationMenu, NextEvent, Pagination, Popover, Quotes, RadioGroup, Resizable, ScrollArea, Select, Separator, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Taskbar, Textarea, Tooltip, Date, WidgetGrid）
  - [x] 1.5: 扩展 Widget Subsystem 组件列表，添加 SvgIcon, Glyph, WidgetPill, WidgetGrid

- [x] Task 2: 修复 reference 文档
  - [x] 2.1: 修复 component-matching.md 中 3 个不存在的 CSS 文件引用（cards.css→card.css, widget-card.css→card.css, widget-icon.css→svg-icon.css）
  - [x] 2.2: 补充 platform-mapping.md 中缺失的 React/Tailwind 输出约定部分
  - [x] 2.3: 在 references/tokens.md 中补充 Widget 子系统 token 的文档说明

- [x] Task 3: 修复 BEM 命名规范
  - [x] 3.1: Spinner.tsx 和 spinner.css：`spinner-*` → `nothing-spinner-*`
  - [x] 3.2: SvgIcon.tsx 和 svg-icon.css：`svg-icon-*` → `nothing-svg-icon-*`
  - [x] 3.3: WidgetPills.tsx 内部 PillIcon：`widget-icon-svg` → `nothing-widget-icon-svg`
  - [x] 3.4: 更新 App.tsx 和所有引用这些类名的地方

- [x] Task 4: 完善 Token 系统
  - [x] 4.1: 在 tokens.css 中补充缺失的 token：`--widget-grey`, `--widget-dot-active`, `--widget-bg-height`, `--space-lg-plus`, `--fill-0`
  - [x] 4.2: 在 tokens.css 的 `[data-theme="light"]` 中添加 Widget token 的亮色覆盖值
  - [x] 4.3: 将 switch.css 中硬编码尺寸（48px, 28px, 22px, 3px, 23px）提取为 token 引用

- [x] Task 5: 修复设计规范违规
  - [x] 5.1: 移除 card.css 中的 box-shadow（第205-206行），改用边框或背景对比实现层次感
  - [x] 5.2: 验证修改后 Card 组件视觉无回归

- [x] Task 6: 清理公共 API
  - [x] 6.1: 从 sub/index.ts 中移除内部子组件的导出（Icons, LoadingBar, Info3, Bullet, Graphic, Info4, StepsCount, Streak, Arrow, Icon32, LimitCount, LoadingBar2, Card1, Dots4-7, Image, Date1, Group1, Icon33, Group30, Device1, Markers, Dates）
  - [x] 6.2: 更新 App.tsx 中对这些内部组件的导入（如仍在使用，改为直接从子文件导入或移除使用）
  - [x] 6.3: WidgetPills.tsx 导出名语义化：Dim→MobileData, Dim1→BatteryShare, Dim2→ExtraDim, DarkMode2→DarkModePill, Share1→Storage, Share2→NearbyShare, Share3→Bluetooth, Remote1→TvRemote
  - [x] 6.4: 更新 App.tsx 中对 WidgetPills 旧导出名的引用

- [x] Task 7: 最终验证
  - [x] 7.1: 运行 `npx tsc --noEmit` 确认编译通过
  - [x] 7.2: 启动开发服务器确认页面正常渲染
  - [x] 7.3: 验证 SKILL.md 中所有路径和代码示例可正常工作

# Task Dependencies
- Task 2 依赖 Task 1（先统一命名再修复文档引用）
- Task 3 独立（BEM 命名修复）
- Task 4 独立（Token 系统完善）
- Task 5 依赖 Task 4（先补充 token 再移除 box-shadow）
- Task 6 独立（API 清理）
- Task 7 依赖 Task 1-6 全部完成
