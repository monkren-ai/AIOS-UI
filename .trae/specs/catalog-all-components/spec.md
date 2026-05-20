# Nothing UI 组件全面梳理与分类体系构建 Spec

## Why
项目已积累 82 个 React 组件文件（.tsx）、79 个 CSS 样式文件，但缺乏统一的组件分类体系和文档化梳理。组件之间依赖关系复杂，Widget 子系统与基础 UI 组件边界模糊，部分组件命名不一致（如 Buttons.tsx 导出 Button、Date.tsx 导出 DateWidget），团队协作和组件复用面临困难。需要建立科学的分类体系和完整的组件目录，确保组件分类准确、逻辑清晰。

## What Changes
- 建立组件分类体系：按功能特性将所有组件分为 8 大类别（UI Primitive、Core Interaction、Data Display、Feedback & Overlay、Navigation、Layout & Container、Functional Widget、Nothing Widget 2.0）
- 编写组件目录文档：记录每个组件的名称、功能描述、Props 接口、依赖关系、使用示例、适用场景
- 梳理组件依赖关系图：明确组件间的引用链和层级关系
- 识别命名不一致问题：记录组件文件名与导出名不匹配的情况
- 梳理 CSS 与组件的映射关系：确认 1:1 映射完整性
- 梳理自定义 Hooks 与组件的关联关系
- 建立 Widget 子系统的内部层级结构

## Impact
- Affected specs: deep-project-audit（组件质量修复）、extract-2.0-components（Widget 拆分）
- Affected code: 无代码变更，仅产出文档化梳理结果
- 产出物：组件目录文档（spec.md 内嵌）、组件分类体系、依赖关系图

## ADDED Requirements

### Requirement: 组件分类体系
所有 82 个组件 SHALL 按以下 8 大类别进行分类，每个组件有且仅有一个主要分类归属：

1. **UI Primitive（UI 原语）**：最基础的构建块，无业务语义，仅提供结构性/布局性能力
2. **Core Interaction（核心交互）**：用户输入/操作类组件，承载核心交互行为
3. **Data Display（数据展示）**：以只读方式展示结构化数据的组件
4. **Feedback & Overlay（反馈与浮层）**：临时性 UI 层，用于提示、确认、补充信息
5. **Navigation（导航）**：页面/内容间跳转与定位的组件
6. **Layout & Container（布局与容器）**：组织页面结构和内容排列的组件
7. **Functional Widget（功能小部件）**：具有独立业务逻辑的复合组件，通常包含内部状态和动画
8. **Nothing Widget 2.0（Nothing 风格组件）**：Nothing 品牌特色组件子系统，包含 Widget 基础设施和预设组件

#### Scenario: 组件分类完整且无遗漏
- **WHEN** 检查组件目录文档
- **THEN** 所有 82 个组件文件均有分类归属，无遗漏无重复

### Requirement: 组件信息完整性
每个组件 SHALL 记录以下关键信息：

| 字段 | 说明 |
|------|------|
| 组件名称 | 导出名（export name） |
| 文件路径 | 相对于 src/ 的路径 |
| 分类 | 所属类别 |
| 功能描述 | 1-2 句话描述组件用途 |
| Props 接口 | 接口名及所有字段 |
| 变体/模式 | 支持的 variant/size/theme 等 |
| 依赖组件 | 引用的其他组件 |
| 依赖 Hooks | 使用的自定义 Hooks |
| 依赖 CSS | 对应的样式文件 |
| 适用场景 | 典型使用场景描述 |

#### Scenario: 组件信息字段完整
- **WHEN** 查看任意组件的目录条目
- **THEN** 上述 10 个字段均有值（无依赖时标注"无"）

### Requirement: 命名不一致问题记录
所有文件名与导出名不匹配的情况 SHALL 被记录，包括但不限于：

| 文件名 | 导出名 | 问题 |
|--------|--------|------|
| Buttons.tsx | Button | 文件名复数，导出名单数 |
| Date.tsx | DateWidget | 文件名与 JS 内置 Date 冲突，导出名加 Widget 后缀 |
| Inputs.tsx | Input | 文件名复数，导出名单数 |
| States.tsx | LoadingState/ErrorState/EmptyState/DisabledState | 文件名简写，导出多个状态组件 |

#### Scenario: 命名不一致问题可追溯
- **WHEN** 查看命名不一致记录
- **THEN** 所有文件名与导出名不匹配的组件均已列出，并标注问题类型

### Requirement: Widget 子系统层级结构
Nothing Widget 2.0 子系统 SHALL 按以下层级组织：

```
Nothing Widget 2.0
├── 基础设施层 (Infrastructure)
│   ├── WidgetCard     -- 卡片容器
│   ├── WidgetGrid     -- 网格布局
│   ├── WidgetIcon     -- 图标组件（通用）
│   ├── WidgetPill     -- 药丸组件（通用）
│   └── DotMatrix      -- 点阵渲染引擎
├── 预设组件层 (Preset Components)
│   ├── WidgetIcons    -- 40 个预设图标（Home, DarkMode, Remote...）
│   ├── WidgetPills    -- 17 个预设药丸（Dim, Calculator, BatterySaver...）
│   └── WidgetSubComponents -- 137 个预设子组件（Record2, Compass, MusicPlayer...）
├── 功能组件层 (Functional Widgets)
│   ├── ActivityWidget -- 活动追踪
│   ├── CompassWidget  -- 指南针
│   ├── WeatherWidget  -- 天气
│   ├── StepsWidget    -- 步数
│   └── TimeWidget     -- 时间
├── 字形层 (Glyph)
│   └── Glyph          -- 点阵字形图标
└── 组合层 (Composition)
    └── NothingWidgets20 -- 完整 Figma 设计稿组合
```

#### Scenario: Widget 子系统层级清晰
- **WHEN** 查看 Widget 子系统文档
- **THEN** 每个组件的层级归属明确，基础设施层/预设组件层/功能组件层/字形层/组合层边界清晰

### Requirement: 依赖关系图
组件间的依赖关系 SHALL 以结构化方式记录，至少包含：

1. **组件→组件依赖**：仅 3 个组件存在跨组件依赖：
   - Glyph → DotMatrix
   - WeatherWidget → DotMatrix
   - NothingWidgets20 → WidgetIcons / WidgetPills / WidgetSubComponents
   - 其余 79 个组件均为叶子节点，无组件级依赖
2. **组件→Hook 依赖**：如 Command → useClickOutside, DropdownMenu → useDisclosure/useFloating/useClickOutside/useKeyboardNavigation
3. **组件→CSS 依赖**：每个组件对应的样式文件
4. **组件→资源依赖**：如 WidgetSubComponents → 7 个 PNG 图片, WidgetIcons/WidgetPills/WidgetSubComponents → svg-qvv4ctcv53.ts

**依赖关系图（简化）：**
```
App.tsx
 ├── Clock, Battery, Calendar, SystemMonitor, MusicPlayer, ...
 ├── DotMatrix (直接使用)
 ├── WidgetCard, WidgetGrid, QuickToggle
 ├── WeatherWidget ──→ DotMatrix
 ├── Glyph ──→ DotMatrix
 ├── NothingWidgets20 ──→ WidgetIcons
 │                  ──→ WidgetPills
 │                  ──→ WidgetSubComponents
 ├── StepsWidget, ActivityWidget, CompassWidget, TimeWidget (无组件依赖)
 ├── WidgetIcon, WidgetPill (无组件依赖)
 └── ... (其余 UI 组件均无组件依赖)
```

#### Scenario: 依赖关系可追溯
- **WHEN** 需要修改某个组件
- **THEN** 可通过依赖关系图快速定位所有受影响的上下游组件

### Requirement: 自定义 Hooks 清单
项目中的 6 个自定义 Hooks SHALL 记录以下信息：

| Hook | 功能 | 使用组件 |
|------|------|----------|
| useClickOutside | 检测点击外部 | Command, ContextMenu, DropdownMenu, NavigationMenu, Popover, Select |
| useDisclosure | 管理开/关状态 | DropdownMenu, Popover |
| useFloating | 浮层定位计算 | DropdownMenu, HoverCard, Popover, Tooltip |
| useKeyboardNavigation | 键盘导航 | ContextMenu, DropdownMenu |
| useMobile | 移动端检测 | 无（未消费） |
| useToggle | 开关状态管理 | 无（未消费） |

#### Scenario: Hooks 使用范围明确
- **WHEN** 需要修改某个 Hook
- **THEN** 可快速定位所有使用该 Hook 的组件

## MODIFIED Requirements

（无修改的需求）

## REMOVED Requirements

（无移除的需求）

---

## 附录：完整组件分类目录

### 一、UI Primitive（UI 原语）— 7 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Accordion | Accordion.tsx | 手风琴折叠面板 | AccordionProps |
| Collapsible | Collapsible.tsx | 可折叠区域 | CollapsibleProps |
| Resizable | Resizable.tsx | 可调整大小面板 | ResizableProps |
| AspectRatio | AspectRatio.tsx | 宽高比容器 | AspectRatioProps |
| Separator | Separator.tsx | 分隔线 | SeparatorProps |
| ScrollArea | ScrollArea.tsx | 自定义滚动区域 | ScrollAreaProps |
| ErrorBoundary | ErrorBoundary.tsx | 错误边界 | ErrorBoundaryProps |

### 二、Core Interaction（核心交互）— 12 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Button | Buttons.tsx | 按钮 | ButtonProps |
| Input | Inputs.tsx | 输入框 | InputProps |
| Switch | Switch.tsx | 开关 | SwitchProps |
| Checkbox | Checkbox.tsx | 复选框 | CheckboxProps |
| RadioGroup | RadioGroup.tsx | 单选按钮组 | RadioGroupProps |
| Slider | Slider.tsx | 滑块 | SliderProps |
| Toggle | Toggle.tsx | 切换按钮 | ToggleProps |
| ToggleGroup | Toggle.tsx | 切换按钮组 | ToggleGroupProps |
| SegmentedControl | SegmentedControl.tsx | 分段控制器 | SegmentedControlProps |
| Textarea | Textarea.tsx | 多行文本框 | TextareaProps |
| InputOTP | InputOTP.tsx | OTP 验证码输入 | InputOTPProps |
| Form | Form.tsx | 表单容器 | FormProps |

### 三、Data Display（数据展示）— 13 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Card | Cards.tsx | 卡片容器 | CardProps |
| DataRows | DataRows.tsx | 数据行列表 | DataRowsProps |
| DataGrid | DataGrid.tsx | 数据网格 | DataGridProps |
| ProgressBar | ProgressBar.tsx | 进度条 | ProgressBarProps |
| Table | Table.tsx | 表格 | TableProps |
| Badge | Badge.tsx | 徽章 | BadgeProps |
| Avatar | Avatar.tsx | 头像 | AvatarProps |
| Skeleton | Skeleton.tsx | 骨架屏 | SkeletonProps |
| Breadcrumb | Breadcrumb.tsx | 面包屑 | BreadcrumbProps |
| Pagination | Pagination.tsx | 分页 | PaginationProps |
| Label | Label.tsx | 标签 | LabelProps |
| Tag | Tags.tsx | 标签 | TagProps |
| Tags | Tags.tsx | 标签组 | TagsProps |

### 四、Feedback & Overlay（反馈与浮层）— 10 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Modal | Modal.tsx | 模态对话框 | ModalProps |
| Select | Select.tsx | 下拉选择 | SelectProps |
| Sheet | Sheet.tsx | 侧边抽屉 | SheetProps |
| Popover | Popover.tsx | 弹出框 | PopoverProps |
| Tooltip | Tooltip.tsx | 工具提示 | TooltipProps |
| HoverCard | HoverCard.tsx | 悬停卡片 | HoverCardProps |
| ContextMenu | ContextMenu.tsx | 右键菜单 | ContextMenuProps |
| DropdownMenu | DropdownMenu.tsx | 下拉菜单 | DropdownMenuProps |
| Command | Command.tsx | 命令面板 | CommandProps |
| Sonner | Sonner.tsx | Toast 通知 | SonnerProps |

### 五、Navigation（导航）— 5 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Navigation | Navigation.tsx | 导航栏 | NavigationProps |
| NavigationMenu | NavigationMenu.tsx | 多级导航菜单 | NavigationMenuProps |
| Sidebar | Sidebar.tsx | 侧边栏 | SidebarProps |
| DateNav | DateNav.tsx | 日期导航 | DateNavProps |
| Taskbar | Taskbar.tsx | 任务栏 | TaskbarProps |

### 六、Layout & Container（布局与容器）— 3 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Tabs | Tabs.tsx | 标签页 | TabsProps |
| TabPanel | Tabs.tsx | 标签面板 | TabPanelProps |
| WidgetGrid | WidgetGrid.tsx | Widget 网格布局 | WidgetGridProps |

### 七、Functional Widget（功能小部件）— 19 个

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Clock | Clock.tsx | 时钟（数字/仪表/双环/叠加） | ClockProps |
| Battery | Battery.tsx | 电池电量 | BatteryProps |
| Calendar | Calendar.tsx | 日历（compact/full） | CalendarProps |
| SystemMonitor | SystemMonitor.tsx | 系统监控 | SystemMonitorProps |
| MusicPlayer | MusicPlayer.tsx | 音乐播放器 | MusicPlayerProps |
| PhotoCarousel | PhotoCarousel.tsx | 照片轮播 | PhotoCarouselProps |
| Caffeinate | Caffeinate.tsx | 咖啡因追踪 | CaffeinateProps |
| Clipboard | Clipboard.tsx | 剪贴板 | ClipboardProps |
| Pomodoro | Pomodoro.tsx | 番茄钟 | PomodoroProps |
| WalkieTalkie | WalkieTalkie.tsx | 对讲机 | WalkieTalkieProps |
| SunDial | SunDial.tsx | 日晷 | SunDialProps |
| AgeMotion | AgeMotion.tsx | 年龄动画 | AgeMotionProps |
| Chrono | Chrono.tsx | 计时器/秒表 | ChronoProps |
| Spinner | Spinner.tsx | 旋转选择器 | SpinnerProps |
| WorldClock | WorldClock.tsx | 世界时钟 | WorldClockProps |
| DateWidget | Date.tsx | 日期展示 | DateWidgetProps |
| NextEvent | NextEvent.tsx | 下一事件 | NextEventProps |
| Quotes | Quotes.tsx | 引言展示 | QuotesProps |
| QuickToggle | QuickToggle.tsx | 快捷开关 | QuickToggleProps |

### 八、Nothing Widget 2.0（Nothing 风格组件）— 11 个文件

#### 基础设施层

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| WidgetCard | WidgetCard.tsx | Widget 卡片容器 | WidgetCardProps |
| WidgetIcon | widgets/WidgetIcon.tsx | Widget 图标（通用） | WidgetIconProps |
| WidgetPill | widgets/WidgetPill.tsx | Widget 药丸（通用） | WidgetPillProps |
| DotMatrix | DotMatrix.tsx | 点阵渲染引擎 | DotMatrixProps |
| Glyph | widgets/Glyph.tsx | 点阵字形图标 | GlyphProps |

#### 功能组件层

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| ActivityWidget | widgets/ActivityWidget.tsx | 活动追踪 | ActivityWidgetProps |
| CompassWidget | widgets/CompassWidget.tsx | 指南针 | CompassWidgetProps |
| WeatherWidget | widgets/WeatherWidget.tsx | 天气 | WeatherWidgetProps |
| StepsWidget | widgets/StepsWidget.tsx | 步数统计 | StepsWidgetProps |
| TimeWidget | widgets/TimeWidget.tsx | 时间显示 | TimeWidgetProps |

#### 预设组件层 + 组合层

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| WidgetIcons | widgets/WidgetIcons.tsx | 40 个预设图标 | 无 |
| WidgetPills | widgets/WidgetPills.tsx | 17 个预设药丸 | 无 |
| WidgetSubComponents | widgets/WidgetSubComponents.tsx | 137 个预设子组件 | 无 |
| NothingWidgets20 | widgets/NothingWidgets20.tsx | 完整设计稿组合 | 无 |

### 状态组件（附属于 Feedback 类别）

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| LoadingState | States.tsx | 加载状态 | LoadingStateProps |
| ErrorState | States.tsx | 错误状态 | ErrorStateProps |
| EmptyState | States.tsx | 空状态 | EmptyStateProps |
| DisabledState | States.tsx | 禁用状态 | DisabledStateProps |

### Alert（附属于 Feedback 类别）

| 组件 | 文件 | 功能 | Props 接口 |
|------|------|------|-----------|
| Alert | Alert.tsx | 警告/提示框 | AlertProps |

---

## 命名不一致问题清单

| 文件名 | 导出名 | 问题类型 | 建议 |
|--------|--------|----------|------|
| Buttons.tsx | Button | 文件名复数 vs 导出名单数 | 重命名为 Button.tsx |
| Inputs.tsx | Input | 文件名复数 vs 导出名单数 | 重命名为 Input.tsx |
| Date.tsx | DateWidget | 与 JS 内置 Date 冲突 | 保持 DateWidget 或重命名为 DateWidget.tsx |
| States.tsx | LoadingState 等 4 个 | 文件名简写，多导出 | 可接受，或重命名为 StateWidgets.tsx |
| Cards.tsx | Card | 文件名复数 vs 导出名单数 | 重命名为 Card.tsx |
| Tags.tsx | Tag + Tags | 双导出 | 可接受 |
| NothingWidgets20.tsx | NothingWidgets | 文件名含版本号20，导出名无版本号 | 统一为 NothingWidgets20 或去掉文件名版本号 |

## 自定义 Hooks 清单

| Hook | 文件 | 功能 | 使用组件 |
|------|------|------|----------|
| useClickOutside | hooks/useClickOutside.ts | 检测点击元素外部 | Command, ContextMenu, DropdownMenu, NavigationMenu, Popover, Select |
| useDisclosure | hooks/useDisclosure.ts | 管理开/关状态 | DropdownMenu, Popover |
| useFloating | hooks/useFloating.ts | 浮层定位计算 | DropdownMenu, HoverCard, Popover, Tooltip |
| useKeyboardNavigation | hooks/useKeyboardNavigation.ts | 键盘上下导航 | ContextMenu, DropdownMenu |
| useMobile | hooks/useMobile.ts | 移动端检测 | 无（未消费） |
| useToggle | hooks/useToggle.ts | 开关状态管理 | 无（未消费） |

## CSS 与组件映射关系

- 78 个 CSS 样式文件（不含 tokens.css）与 82 个组件文件基本 1:1 映射
- widgets.css 无对应组件文件，仅通过 App.tsx 全局引入（作为 Widget 综合布局工具类）
- WeatherWidget.tsx 额外 import dot-matrix.css（因内部使用 DotMatrix 组件）
- 10 个 CSS 文件仅被组件自身 import，未被 App.tsx 全局引入：battery.css, calendar.css, clock.css, music-player.css, next-event.css, photo-carousel.css, quotes.css, system-monitor.css, taskbar.css, date.css
- tokens.css 为全局设计 Token，不对应特定组件
- widgets.css 为 Widget 综合布局工具类，对应 NothingWidgets20.tsx
- 命名规范：组件级 `nothing-` 前缀 + BEM，Widget 内部 `widget-` 前缀工具类
