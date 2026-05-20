# 提取 2.0 组件到 Web UI Kit - 任务清单

## Phase 1: 基础设施准备

- [x] Task 1: 合并 2.0 theme.css Token 到 tokens.css
  - [x] 分析 2.0 theme.css 中的 CSS 变量，与 tokens.css 现有变量做映射
  - [x] 将 tokens.css 中缺失的变量按现有命名规范添加
  - [x] 确保深色/浅色模式变量完整
  - [x] 验证现有组件不受影响

- [x] Task 2: 创建通用交互 Hook 工具集
  - [x] 创建 `useToggle` Hook（开关状态管理）
  - [x] 创建 `useDisclosure` Hook（展开/折叠状态管理）
  - [x] 创建 `useClickOutside` Hook（点击外部关闭）
  - [x] 创建 `useKeyboardNavigation` Hook（键盘导航）
  - [x] 创建 `useFloating` Hook（浮动定位，用于 Tooltip/Popover）

## Phase 2: 第一优先级组件 - 核心交互

- [x] Task 3: 新增 Accordion 组件
  - [x] 创建 `accordion.css`（BEM 命名 + Token 引用）
  - [x] 创建 `Accordion.tsx`（支持 single/multiple 展开模式）
  - [x] 创建 `accordion.js`（Vanilla JS 版本）
  - [x] 支持 `prefers-reduced-motion`
  - [x] 键盘导航（Arrow Up/Down, Home/End）

- [x] Task 4: 新增 AlertDialog 组件
  - [x] 创建 `alert-dialog.css`
  - [x] 创建 `AlertDialog.tsx`（确认/取消对话框）
  - [x] 创建 `alert-dialog.js`
  - [x] 焦点锁定 + Escape 关闭 + 点击遮罩关闭

- [x] Task 5: 新增 Checkbox 组件
  - [x] 创建 `checkbox.css`
  - [x] 创建 `Checkbox.tsx`（支持 checked/unchecked/indeterminate 状态）
  - [x] 创建 `checkbox.js`

- [x] Task 6: 新增 RadioGroup 组件
  - [x] 创建 `radio-group.css`
  - [x] 创建 `RadioGroup.tsx`（单选按钮组）
  - [x] 创建 `radio-group.js`
  - [x] 键盘导航（Arrow Left/Right/Up/Down）

- [x] Task 7: 新增 Slider 组件
  - [x] 创建 `slider.css`
  - [x] 创建 `Slider.tsx`（支持单值/范围、步长、标记）
  - [x] 创建 `slider.js`
  - [x] 键盘操作（Arrow keys 调整值）

- [x] Task 8: 新增 Tabs 组件
  - [x] 创建 `tabs.css`
  - [x] 创建 `Tabs.tsx`（选项卡 + 面板）
  - [x] 创建 `tabs.js`
  - [x] 键盘导航（Arrow Left/Right, Home/End）

- [x] Task 9: 新增 Tooltip 组件
  - [x] 创建 `tooltip.css`
  - [x] 创建 `Tooltip.tsx`（悬浮提示，支持多方向）
  - [x] 创建 `tooltip.js`
  - [x] 延迟显示/隐藏 + Escape 关闭

- [x] Task 10: 新增 Textarea 组件
  - [x] 创建 `textarea.css`
  - [x] 创建 `Textarea.tsx`（多行文本输入，支持自动高度）
  - [x] 创建 `textarea.js`

- [x] Task 11: 新增 Label 组件
  - [x] 创建 `label.css`
  - [x] 创建 `Label.tsx`（表单标签，关联表单控件）
  - [x] 创建 `label.js`

## Phase 3: 第二优先级组件 - 数据展示与导航

- [x] Task 12: 新增 Table 组件
  - [x] 创建 `table.css`
  - [x] 创建 `Table.tsx`（表头、行、单元格、排序指示）
  - [x] 创建 `table.js`

- [x] Task 13: 新增 Badge 组件
  - [x] 创建 `badge.css`
  - [x] 创建 `Badge.tsx`（default/secondary/destructive/outline 变体）
  - [x] 创建 `badge.js`

- [x] Task 14: 新增 Avatar 组件
  - [x] 创建 `avatar.css`
  - [x] 创建 `Avatar.tsx`（图片 + 回退文字 + 图标）
  - [x] 创建 `avatar.js`

- [x] Task 15: 新增 Separator 组件
  - [x] 创建 `separator.css`
  - [x] 创建 `Separator.tsx`（水平/垂直分隔线）
  - [x] 创建 `separator.js`

- [x] Task 16: 新增 Skeleton 组件
  - [x] 创建 `skeleton.css`
  - [x] 创建 `Skeleton.tsx`（加载占位，脉冲动画）
  - [x] 创建 `skeleton.js`
  - [x] 支持 `prefers-reduced-motion`

- [x] Task 17: 新增 Breadcrumb 组件
  - [x] 创建 `breadcrumb.css`
  - [x] 创建 `Breadcrumb.tsx`（面包屑导航 + 分隔符）
  - [x] 创建 `breadcrumb.js`

- [x] Task 18: 新增 Pagination 组件
  - [x] 创建 `pagination.css`
  - [x] 创建 `Pagination.tsx`（页码 + 前后翻页）
  - [x] 创建 `pagination.js`

- [x] Task 19: 新增 Alert 组件
  - [x] 创建 `alert.css`
  - [x] 创建 `Alert.tsx`（default/destructive 变体 + 图标）
  - [x] 创建 `alert.js`

- [x] Task 20: 新增 ScrollArea 组件
  - [x] 创建 `scroll-area.css`
  - [x] 创建 `ScrollArea.tsx`（自定义滚动条样式）
  - [x] 创建 `scroll-area.js`

- [x] Task 21: 扩展 ProgressBar 组件
  - [x] 在 `progress-bar.css` 中新增 slim/indeterminate 变体样式
  - [x] 在 `ProgressBar.tsx` 中新增 `variant="slim"` 和 `indeterminate` prop
  - [x] 同步 `progress-bar.js`

## Phase 4: 第三优先级组件 - 高级交互

- [x] Task 22: 新增 Popover 组件
  - [x] 创建 `popover.css`
  - [x] 创建 `Popover.tsx`（弹出层 + 锚点定位）
  - [x] 创建 `popover.js`

- [x] Task 23: 新增 HoverCard 组件
  - [x] 创建 `hover-card.css`
  - [x] 创建 `HoverCard.tsx`（悬浮卡片）
  - [x] 创建 `hover-card.js`

- [x] Task 24: 新增 ContextMenu 组件
  - [x] 创建 `context-menu.css`
  - [x] 创建 `ContextMenu.tsx`（右键菜单）
  - [x] 创建 `context-menu.js`

- [x] Task 25: 新增 DropdownMenu 组件
  - [x] 创建 `dropdown-menu.css`
  - [x] 创建 `DropdownMenu.tsx`（下拉菜单 + 子菜单）
  - [x] 创建 `dropdown-menu.js`

- [x] Task 26: 新增 Select 组件
  - [x] 创建 `select.css`
  - [x] 创建 `Select.tsx`（选择器 + 搜索 + 多选）
  - [x] 创建 `select.js`

- [x] Task 27: 新增 Sheet 组件
  - [x] 创建 `sheet.css`
  - [x] 创建 `Sheet.tsx`（侧边抽屉，支持 left/right/top/bottom 方向）
  - [x] 创建 `sheet.js`

- [x] Task 28: 新增 Toggle / ToggleGroup 组件
  - [x] 创建 `toggle.css`
  - [x] 创建 `Toggle.tsx` + `ToggleGroup.tsx`
  - [x] 创建 `toggle.js`

- [x] Task 29: 新增 Sonner (Toast) 组件
  - [x] 创建 `sonner.css`
  - [x] 创建 `Sonner.tsx`（Toast 通知，支持 success/error/warning/info）
  - [x] 创建 `sonner.js`

- [x] Task 30: 新增 Collapsible 组件
  - [x] 创建 `collapsible.css`
  - [x] 创建 `Collapsible.tsx`（可折叠区域）
  - [x] 创建 `collapsible.js`

- [x] Task 31: 新增 Resizable 组件
  - [x] 创建 `resizable.css`
  - [x] 创建 `Resizable.tsx`（可调整大小面板）
  - [x] 创建 `resizable.js`

- [x] Task 32: 新增 Command 组件
  - [x] 创建 `command.css`
  - [x] 创建 `Command.tsx`（命令面板 + 搜索过滤）
  - [x] 创建 `command.js`

- [x] Task 33: 新增 Form 组件
  - [x] 创建 `form.css`
  - [x] 创建 `Form.tsx`（表单容器 + 验证状态）
  - [x] 创建 `form.js`

- [x] Task 34: 新增 InputOTP 组件
  - [x] 创建 `input-otp.css`
  - [x] 创建 `InputOTP.tsx`（OTP 验证码输入）
  - [x] 创建 `input-otp.js`

- [x] Task 35: 新增 NavigationMenu 组件
  - [x] 创建 `navigation-menu.css`
  - [x] 创建 `NavigationMenu.tsx`（导航菜单 + 子菜单）
  - [x] 创建 `navigation-menu.js`

- [x] Task 36: 新增 Menubar 组件
  - [x] 创建 `menubar.css`
  - [x] 创建 `Menubar.tsx`（菜单栏）
  - [x] 创建 `menubar.js`

- [x] Task 37: 新增 Sidebar 组件
  - [x] 创建 `sidebar.css`
  - [x] 创建 `Sidebar.tsx`（侧边栏 + 折叠/展开）
  - [x] 创建 `sidebar.js`

- [x] Task 38: 新增 AspectRatio 组件
  - [x] 创建 `aspect-ratio.css`
  - [x] 创建 `AspectRatio.tsx`（宽高比容器）
  - [x] 创建 `aspect-ratio.js`

## Phase 5: 整合与验证

- [x] Task 39: 更新 App.tsx 展示页面
  - [x] 按分组展示所有新增组件
  - [x] 每个组件展示主要变体
  - [x] 保持现有展示结构不变

- [x] Task 40: Token 合规性验证
  - [x] 扫描所有新组件 CSS，确认无硬编码颜色/字号/圆角值
  - [x] 确认无 `!important` 声明
  - [x] 确认所有颜色通过 `var(--xxx)` 引用

- [x] Task 41: 双版本同步验证
  - [x] 对比所有新组件的 `css/` 和 `react/src/styles/` 同名文件
  - [x] 确保内容完全一致

- [x] Task 42: 深色/浅色模式验证
  - [x] 验证所有新组件在 `data-theme="light"` 和 `data-theme="dark"` 下正确显示
  - [x] 修复任何主题切换问题

- [x] Task 43: 无障碍性验证
  - [x] 验证交互组件的 ARIA 属性正确
  - [x] 验证键盘导航可用
  - [x] 验证焦点指示器可见

# Task Dependencies
- [Task 1] 是所有后续任务的前置条件（Token 基础）
- [Task 2] 是 Phase 2/3/4 交互组件的前置条件（Hook 工具集）
- [Task 3-11] 可并行开发（Phase 2 组件之间无依赖）
- [Task 12-21] 可并行开发（Phase 3 组件之间无依赖）
- [Task 22-38] 可并行开发（Phase 4 组件之间无依赖）
- [Task 39] 依赖所有组件任务完成
- [Task 40-43] 依赖所有组件任务完成
