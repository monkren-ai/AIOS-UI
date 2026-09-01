# AIOS UI 组件目录

> 一个用于构建有节制、精确且具有独特视觉语言界面的设计系统

## 目录
- [1. 核心交互组件](#1-核心交互组件-core-interaction)
- [2. 数据展示组件](#2-数据展示组件-data-display)
- [3. 覆盖层组件](#3-覆盖层组件-overlays)
- [4. 导航组件](#4-导航组件-navigation)
- [5. 菜单与选择组件](#5-菜单与选择组件-menus--selection)
- [6. 状态与反馈组件](#6-状态与反馈组件-states--feedback)
- [7. 时间与日历组件](#7-时间与日历组件-time--calendar)
- [8. 系统与媒体组件](#8-系统与媒体组件-system--media)
- [10. 点阵加载器](#10-点阵加载器-dotmatrix-loaders)
- [11. Nullframe 仪表盘](#11-nullframe-仪表盘-nullframe-dashboard)
- [12. 设计系统](#12-设计系统-design-system)
- [13. AIcss Agent 组件](#13-aicss-agent-组件)

---

## 1. 核心交互组件 (Core Interaction)

### Button
**文件**: [Buttons.tsx](src/components/Buttons.tsx)  
**描述**: 按钮组件，支持多种变体和尺寸  
**变体**: primary, secondary, ghost, destructive  
**尺寸**: sm, lg  
**Props**: variant, size, disabled

### IconButton
**文件**: `src/Button/IconButton.tsx`
**描述**: 纯图标按钮，复用 Button 变体与状态，并强制提供 `aria-label`
**Props**: icon, aria-label, size, shape

### Chip/ChipGroup
**文件**: `src/Chip/Chip.tsx`
**描述**: 用于筛选和快速选择的 pressed-state 标签；组容器支持横向溢出
**Props**: selected, size, icon

### Input
**文件**: [Inputs.tsx](src/components/Inputs.tsx)  
**描述**: 输入框组件，支持下划线和边框样式  
**变体**: underline, bordered  
**Props**: variant, label, placeholder, error, disabled

### Switch
**文件**: [Switch.tsx](src/components/Switch.tsx)  
**描述**: 开关组件  
**Props**: label, on, disabled

### Tag/Tags
**文件**: [Tags.tsx](src/components/Tags.tsx)  
**描述**: 标签组件，支持 pill 和 technical 样式  
**变体**: pill, technical  
**Props**: variant, active, removable, disabled

### SegmentedControl
**文件**: [SegmentedControl.tsx](src/components/SegmentedControl.tsx)  
**描述**: 分段控制组件  
**Props**: segments

### Toggle/ToggleGroup
**文件**: [Toggle.tsx](src/components/Toggle.tsx)  
**描述**: 切换按钮和切换组组件  
**Props**: value, onValueChange, variant

### Checkbox
**文件**: [Checkbox.tsx](src/components/Checkbox.tsx)  
**描述**: 复选框组件  
**Props**: label, defaultChecked, checked (indeterminate)

### RadioGroup
**文件**: [RadioGroup.tsx](src/components/RadioGroup.tsx)  
**描述**: 单选框组组件  
**Props**: value, onValueChange, orientation, options

### Slider
**文件**: [Slider.tsx](src/components/Slider.tsx)  
**描述**: 滑块组件  
**Props**: value, onValueChange, label, showValue

---

## 2. 数据展示组件 (Data Display)

### Card
**文件**: [Cards.tsx](src/components/Cards.tsx)  
**描述**: 卡片组件，支持多种样式  
**变体**: default, raised, compact, technical  
**Props**: variant, title, action

### DataRows
**文件**: [DataRows.tsx](src/components/DataRows.tsx)  
**描述**: 数据行展示组件  
**Props**: rows

### DataGrid
**文件**: [DataGrid.tsx](src/components/DataGrid.tsx)  
**描述**: 数据表格组件  
**Props**: columns, rows

### ProgressBar
**文件**: [ProgressBar.tsx](src/components/ProgressBar.tsx)  
**描述**: 进度条组件  
**变体**: default, slim  
**尺寸**: hero, standard, compact  
**状态**: default, warning, overlimit, good  
**Props**: value, variant, size, status, indeterminate, label, unit

### Table
**文件**: [Table.tsx](src/components/Table.tsx)  
**描述**: 表格组件  
**Props**: columns, rows, striped, hoverable

### Badge
**文件**: [Badge.tsx](src/components/Badge.tsx)  
**描述**: 徽章组件  
**变体**: default, secondary, destructive, outline  
**Props**: variant

### Avatar
**文件**: [Avatar.tsx](src/components/Avatar.tsx)  
**描述**: 头像组件  
**尺寸**: sm, md, lg  
**Props**: size, fallback

### AvatarGroup
**文件**: `src/Avatar/AvatarGroup.tsx`
**描述**: 统一头像尺寸与重叠排列，超出 `max` 时显示 `+N`
**Props**: max, size, children

### Icon
**文件**: `src/Icon/Icon.tsx`
**描述**: 为外部 SVG React 图标统一尺寸、currentColor 与无障碍默认值
**Props**: glyph, size, label

### Label
**文件**: [Label.tsx](src/components/Label.tsx)  
**描述**: 标签组件  
**Props**: required, disabled

### Skeleton
**文件**: [Skeleton.tsx](src/components/Skeleton.tsx)  
**描述**: 骨架屏加载组件  
**变体**: text, circular, rectangular  
**Props**: variant, width, height

### Separator
**文件**: [Separator.tsx](src/components/Separator.tsx)  
**描述**: 分隔线组件  
**方向**: horizontal, vertical  
**Props**: orientation, decorative

### DotMatrix
**文件**: [DotMatrix.tsx](src/components/DotMatrix.tsx)  
**描述**: 点阵显示组件  
**主题**: light, dark, accent  
**Props**: rows, cols, dotSize, pattern, activeDots

### DotMatrixIcon
**文件**: [DotMatrixIcon.tsx](src/components/DotMatrixIcon.tsx)  
**描述**: 将粘贴的 `<svg>...</svg>` 标记栅格化为可配置的 rows × cols 点阵。对 SVG 进行栅格化并按 alpha 阈值绘制圆点，支持自定义点大小、基色/激活色、背景与圆角，以及随机脉冲动画（按百分比周期性高亮部分点）。  
**Props**: svg, rows, cols, alphaThreshold, dotSize, gap, baseColor, activeColor, backgroundColor, radius, anim, activePercent, speedMs

## 3. 覆盖层组件 (Overlays)

### Modal
**文件**: [Modal.tsx](src/components/Modal.tsx)  
**描述**: 模态框组件  
**变体**: default, alert  
**Props**: open, title, onClose, footer, variant, description, confirmLabel, cancelLabel, destructive, onConfirm, onCancel

### Sheet
**文件**: [Sheet.tsx](src/components/Sheet.tsx)  
**描述**: 侧边面板/底部抽屉组件  
**位置**: right, bottom, left, top  
**Props**: open, onOpenChange, side, title, sections

### Popover
**文件**: [Popover.tsx](src/components/Popover.tsx)  
**描述**: 气泡弹出框组件  
**位置**: top, bottom, left, right  
**Props**: side, content

### HoverCard
**文件**: [HoverCard.tsx](src/components/HoverCard.tsx)  
**描述**: 悬停卡片组件  
**位置**: top, bottom, left, right  
**Props**: side, content

### Tooltip
**文件**: [Tooltip.tsx](src/components/Tooltip.tsx)  
**描述**: 工具提示组件  
**位置**: top, bottom, left, right  
**Props**: content, side

### Sonner (Toast)
**文件**: [Sonner.tsx](src/components/Sonner.tsx)  
**描述**: 消息提示组件  
**变体**: default, success, error, warning  
**Props**: toasts, onDismiss, position

### AlertDialog
**描述**: 警告对话框（使用 Modal 的 alert 变体）

---

## 4. 导航组件 (Navigation)

### Navigation
**文件**: [Navigation.tsx](src/components/Navigation.tsx)  
**描述**: 导航组件  
**变体**: bracket  
**Props**: variant, items

### DateNav
**文件**: [DateNav.tsx](src/components/DateNav.tsx)  
**描述**: 日期导航组件  
**Props**: label, onPrev, onNext, grotesk

### Tabs/TabPanel
**文件**: [Tabs.tsx](src/components/Tabs.tsx)  
**描述**: 标签页组件  
**Props**: items, value, onValueChange

### Breadcrumb
**文件**: [Breadcrumb.tsx](src/components/Breadcrumb.tsx)  
**描述**: 面包屑导航组件  
**Props**: items

### Pagination
**文件**: [Pagination.tsx](src/components/Pagination.tsx)  
**描述**: 分页组件  
**Props**: page, totalPages, onPageChange

### NavigationMenu
**文件**: [NavigationMenu.tsx](src/components/NavigationMenu.tsx)  
**描述**: 导航菜单组件，支持嵌套菜单  
**Props**: items

### Sidebar
**文件**: [Sidebar.tsx](src/components/Sidebar.tsx)  
**描述**: 侧边栏组件  
**Props**: items, header

---

## 5. 菜单与选择组件 (Menus & Selection)

### DropdownMenu
**文件**: [DropdownMenu.tsx](src/components/DropdownMenu.tsx)  
**描述**: 下拉菜单组件，支持嵌套菜单和快捷键  
**变体**: default, menubar  
**Props**: trigger, items, variant

### Select
**文件**: [Select.tsx](src/components/Select.tsx)  
**描述**: 选择器组件，支持搜索  
**Props**: options, value, onValueChange, placeholder, label, searchable

### ContextMenu
**文件**: [ContextMenu.tsx](src/components/ContextMenu.tsx)  
**描述**: 右键菜单组件  
**Props**: items

### Command (Palette)
**文件**: [Command.tsx](src/components/Command.tsx)  
**描述**: 命令面板组件  
**Props**: open, onOpenChange, groups

### Accordion
**文件**: [Accordion.tsx](src/components/Accordion.tsx)  
**描述**: 手风琴组件  
**类型**: single, multiple  
**Props**: type, items

### Collapsible
**文件**: [Collapsible.tsx](src/components/Collapsible.tsx)  
**描述**: 可折叠组件  
**Props**: trigger

---

## 6. 状态与反馈组件 (States & Feedback)

### LoadingState
**文件**: [States.tsx](src/components/States.tsx)  
**描述**: 加载状态组件  
**Props**: progress, label

### ErrorState
**文件**: [States.tsx](src/components/States.tsx)  
**描述**: 错误状态组件  
**Props**: headline, message, onRetry

### EmptyState
**文件**: [States.tsx](src/components/States.tsx)  
**描述**: 空状态组件  
**Props**: headline, description

### DisabledState
**文件**: [States.tsx](src/components/States.tsx)  
**描述**: 禁用状态组件  
**Props**: headline, description

### Alert
**文件**: [Alert.tsx](src/components/Alert.tsx)  
**描述**: 警告提示组件  
**变体**: default, destructive  
**Props**: title, variant

### ErrorBoundary
**文件**: [ErrorBoundary.tsx](src/components/ErrorBoundary.tsx)  
**描述**: 错误边界组件，用于捕获组件错误

---

## 7. 时间与日历组件 (Time & Calendar)
**描述**: 与时间、日期、日历相关的组件

### Calendar
**文件**: [Calendar.tsx](src/components/Calendar.tsx)  
**描述**: 日历组件  
**类型**: compact, full  
**Props**: type

### SunDial
**文件**: [SunDial.tsx](src/components/SunDial.tsx)  
**描述**: 日晷组件

### AgeMotion
**文件**: [AgeMotion.tsx](src/components/AgeMotion.tsx)  
**描述**: 年龄动态组件

### Chrono
**文件**: [Chrono.tsx](src/components/Chrono.tsx)  
**描述**: 计时组件

### Spinner
**文件**: [Spinner.tsx](src/components/Spinner.tsx)  
**描述**: 旋转选择器组件  
**Props**: items

### NextEvent
**文件**: [NextEvent.tsx](src/components/NextEvent.tsx)  
**描述**: 下一个事件组件

### Pomodoro
**文件**: [Pomodoro.tsx](src/components/Pomodoro.tsx)  
**描述**: 番茄钟组件

---

## 8. 系统与媒体组件 (System & Media)
**描述**: 系统级、设备状态、媒体播放与表单/布局工具组件

### Battery
**文件**: [Battery.tsx](src/components/Battery.tsx)  
**描述**: 电池状态组件

### SystemMonitor
**文件**: [SystemMonitor.tsx](src/components/SystemMonitor.tsx)  
**描述**: 系统监控组件,显示系统资源使用情况

### QuickToggle
**文件**: [QuickToggle.tsx](src/components/QuickToggle.tsx)  
**描述**: 快速切换组件  
**变体**: circle, pill  
**Props**: variant, label, active, icon

### ScrollArea
**文件**: [ScrollArea.tsx](src/components/ScrollArea.tsx)  
**描述**: 可滚动区域组件  
**Props**: height

### Resizable
**文件**: [Resizable.tsx](src/components/Resizable.tsx)  
**描述**: 可调整大小的面板组件  
**方向**: horizontal, vertical  
**Props**: direction, initialSizes, minSizes

### AspectRatio
**文件**: [AspectRatio.tsx](src/components/AspectRatio.tsx)  
**描述**: 固定宽高比容器组件  
**Props**: ratio

### Form
**文件**: [Form.tsx](src/components/Form.tsx)  
**描述**: 表单组件  
**Props**: onSubmit

### InputOTP
**文件**: [InputOTP.tsx](src/components/InputOTP.tsx)  
**描述**: 一次性密码输入组件  
**Props**: length, value, onValueChange

---

## 10. 点阵加载器 (Dotmatrix Loaders)
**描述**: 独立动画系统组件库,详见 `src/components/dotmatrix-loaders/`

---

## 11. Nullframe 仪表盘 (Nullframe Dashboard)
**描述**: Nullframe 仪表盘演示,详见 `src/components/nullframe/`

---

## 12. 设计系统 (Design System)
**描述**: 设计系统文档、下载文件与 Figma 2.0 引用

- `design.md` — 结构化设计规范
- `SKILL.md` — 设计哲学与工作流
- `tokens.md` — 颜色/字体/间距/动效 token
- `components.md` — 组件类型映射
- `platform-mapping.md` — 平台输出约定
- `component-matching.md` — 组件匹配策略

---

## 13. AIcss Agent 组件

**文件**: `src/agent/AICSS/AICSS.tsx`
**描述**: 对齐 [AIcss](https://www.aicss.dev/) 当前完整 14 组件目录（另保留 Web Search 作为工具态扩展），并适配 AIOS 令牌、主题和中英双语约束。授权组件（File Diff / Image Generation / Inline Citations / Comparison Table）为 AIOS 原创适配，不包含授权源码。

| AIcss 组件 | AIOS 导出 | 状态 |
|---|---|---|
| Thinking State | `AicssThinkingState` | 免费 |
| Thinking + Reasoning | `AicssThinkingReasoning` | 免费 |
| Orbs | `AicssOrbs` | 免费 |
| File Diff | `AicssFileDiff` | 授权 · 适配实现 |
| Image Generation | `AicssImageGeneration` | 授权 · 适配实现 |
| Text Response | `AicssTextResponse` | 免费 |
| Streaming Text | `AicssStreamingText` | 免费 |
| Inline Citations | `AicssInlineCitations` | 授权 · 适配实现 |
| Code Block | `AicssCodeBlock` | 免费 |
| To-do List | `AicssTaskList` | 免费 |
| Data Table | `AicssDataTable` | 免费 |
| Comparison Table | `AicssComparisonTable` | 授权 · 适配实现 |
| AI Agent Input | `AicssAgentInput` | 免费 |
| Approval Card | `AicssApprovalCard` | 免费 |
| Web Search | `AicssWebSearch` | 扩展（目录外） |

所有组件使用 `Aicss*` 前缀，避免与现有的 `ThinkingState` 类型、`DataTable` 等公共导出冲突。

```tsx
import {
  AicssThinkingReasoning,
  AicssApprovalCard,
  AicssAgentInput,
} from 'aios-ui-kit'
```

---

## 使用说明

### 导入组件
```tsx
import Button from './components/Buttons'
import Input from './components/Inputs'
import Card from './components/Cards'
```

### 使用组件
```tsx
<Button variant="primary">点击我</Button>
<Input variant="underline" label="用户名" placeholder="请输入用户名" />
<Card title="标题">内容</Card>
```

### 主题切换
```tsx
// 使用 App 组件中的 toggleTheme 函数
// 或直接设置 data-theme 属性
document.documentElement.setAttribute('data-theme', 'light') // 或 'dark'
```

## 设计原则
- **有节制的设计**: 避免过度装饰，保持简洁
- **技术精确**: 像素级对齐和精确的间距
- **独特视觉**: 采用 AIOS 的标志性设计语言
- **无障碍支持**: 所有组件遵循 WCAG 可访问性标准
