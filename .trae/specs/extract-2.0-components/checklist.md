# 提取 2.0 组件到 Web UI Kit - 验证清单

## 基础设施
- [x] tokens.css 已合并 2.0 theme.css 中的有用变量，无重复定义
- [x] 通用 Hook 工具集（useToggle, useDisclosure, useClickOutside, useKeyboardNavigation, useFloating）已创建并可用

## 组件架构合规性
- [x] 所有新组件使用 BEM 命名规范（`.nothing-{component}__{element}--{modifier}`）
- [x] 所有新组件不依赖 Tailwind CSS
- [x] 所有新组件不依赖 Radix UI 或其他外部 UI 库
- [x] 所有新组件使用纯 CSS + CSS 变量 Token 引用
- [x] 所有新组件支持 `data-theme="light"` / `data-theme="dark"` 主题切换

## 第一优先级组件（核心交互）
- [x] Accordion 组件已实现，支持 single/multiple 展开模式 + 键盘导航
- [x] AlertDialog 组件已实现，支持焦点锁定 + Escape 关闭 + 遮罩关闭
- [x] Checkbox 组件已实现，支持 checked/unchecked/indeterminate 三态
- [x] RadioGroup 组件已实现，支持键盘导航
- [x] Slider 组件已实现，支持单值/范围 + 键盘操作
- [x] Tabs 组件已实现，支持键盘导航
- [x] Tooltip 组件已实现，支持延迟显示/隐藏 + 多方向
- [x] Textarea 组件已实现，支持自动高度
- [x] Label 组件已实现，关联表单控件

## 第二优先级组件（数据展示与导航）
- [x] Table 组件已实现
- [x] Badge 组件已实现，支持多种变体
- [x] Avatar 组件已实现，支持图片/文字/图标回退
- [x] Separator 组件已实现，支持水平/垂直
- [x] Skeleton 组件已实现，支持脉冲动画
- [x] Breadcrumb 组件已实现
- [x] Pagination 组件已实现
- [x] Alert 组件已实现，支持多种变体
- [x] ScrollArea 组件已实现
- [x] ProgressBar 已扩展 slim/indeterminate 变体

## 第三优先级组件（高级交互）
- [x] Popover 组件已实现
- [x] HoverCard 组件已实现
- [x] ContextMenu 组件已实现
- [x] DropdownMenu 组件已实现
- [x] Select 组件已实现
- [x] Sheet 组件已实现，支持多方向
- [x] Toggle/ToggleGroup 组件已实现
- [x] Sonner (Toast) 组件已实现
- [x] Collapsible 组件已实现
- [x] Resizable 组件已实现
- [x] Command 组件已实现
- [x] Form 组件已实现
- [x] InputOTP 组件已实现
- [x] NavigationMenu 组件已实现
- [x] Menubar 组件已实现
- [x] Sidebar 组件已实现
- [x] AspectRatio 组件已实现

## CSS 质量验证
- [x] 所有新组件 CSS 中不存在硬编码颜色值（`:root`/`[data-theme]` 块之外无 `#xxxxxx`、`rgb()`、`rgba()`）
- [x] 所有新组件 CSS 中不存在硬编码字号值
- [x] 所有新组件 CSS 中不存在硬编码圆角值
- [x] 所有新组件 CSS 中不存在 `!important` 声明
- [x] 所有新组件 CSS 支持 `prefers-reduced-motion`

## 双版本同步验证
- [x] 所有新组件的 `css/` 和 `react/src/styles/` 同名 CSS 文件内容完全一致
- [x] 不存在一方有而另一方缺失的 CSS 文件

## 无障碍性验证
- [x] 交互组件提供正确的 ARIA 属性
- [x] 交互组件支持键盘导航
- [x] 交互组件提供可见的焦点指示器

## 展示页面
- [x] App.tsx 已更新，展示所有新增组件
- [x] 每个新组件展示主要变体
