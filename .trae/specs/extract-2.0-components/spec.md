# 提取 2.0 Figma Make 组件到 Web UI Kit 项目 Spec

## Why
`nothing-design/2.0` 目录包含 Figma Make 导出的 ~50 个 shadcn/ui 基础组件（基于 Tailwind CSS + Radix UI）和 Nothing Widgets 2.0 视觉设计，而主项目 `web-ui-kit/react` 目前仅有 Widget 类组件，缺少 Accordion、Tabs、Tooltip、Checkbox、RadioGroup、Table 等通用 UI 基础组件。将这些组件提取并适配到主项目中，可大幅扩展组件库的覆盖范围。

## What Changes
- 将 2.0 中的 shadcn/ui 组件从 Tailwind CSS + Radix UI 架构转换为项目约定的纯 CSS + BEM + Token 架构
- 将 2.0 theme.css 中的设计 token 合并到主项目 tokens.css
- 新增 ~30 个通用 UI 基础组件到 web-ui-kit
- 为每个新组件提供 Vanilla JS + React 双版本
- 更新 App.tsx 展示页面

## Impact
- Affected specs: extract-uikit-styles（已有部分重叠组件如 Modal/Dialog，需协调）
- Affected code:
  - `web-ui-kit/react/src/components/` — 新增组件文件
  - `web-ui-kit/react/src/styles/` — 新增 CSS 文件
  - `web-ui-kit/css/` — 新增 Vanilla CSS 文件
  - `web-ui-kit/js/` — 新增 Vanilla JS 文件
  - `web-ui-kit/react/src/styles/tokens.css` — 合并新 token
  - `web-ui-kit/react/src/App.tsx` — 展示新组件

## 架构决策

### 源（2.0）vs 目标（web-ui-kit）架构对比

| 维度 | 2.0 (源) | web-ui-kit (目标) |
|------|----------|-------------------|
| CSS 方案 | Tailwind CSS v4 工具类 | 纯 CSS + BEM 命名 |
| 设计 Token | CSS 变量 + @theme inline | tokens.css CSS 变量 |
| UI 原语 | Radix UI primitives | 原生 HTML + 自定义逻辑 |
| 组件模式 | shadcn/ui (data-slot + cn()) | 函数组件 + BEM className |
| 主题切换 | `.dark` class | `data-theme` 属性 |
| 依赖 | ~40 个 npm 包 | 仅 react + react-dom |

### 转换策略
采用**纯 CSS + BEM 适配**策略：
1. **移除 Tailwind CSS 依赖**：将所有 Tailwind 工具类转换为 BEM 命名的 CSS 规则
2. **移除 Radix UI 依赖**：使用原生 HTML 元素 + ARIA 属性 + 自定义 Hook 实现交互逻辑
3. **保留组件 API 设计**：参考 shadcn/ui 的组件拆分和 Props 设计，但适配为项目风格
4. **Token 映射**：将 2.0 theme.css 的变量映射到 tokens.css 现有 token

## 组件提取范围

### 第一优先级：核心交互组件（填补设计系统关键空白）

| 组件 | 2.0 文件 | 主项目已有类似 | 说明 |
|------|---------|--------------|------|
| Accordion | accordion.tsx | 无 | 可折叠面板 |
| AlertDialog | alert-dialog.tsx | Modal (部分重叠) | 确认对话框，需区分于 Modal |
| Checkbox | checkbox.tsx | 无 | 复选框 |
| RadioGroup | radio-group.tsx | 无 | 单选按钮组 |
| Slider | slider.tsx | 无 | 滑块 |
| Switch | switch.tsx | Toggles (部分重叠) | 开关，与 Toggles 合并或独立 |
| Tabs | tabs.tsx | SegmentedControl (部分重叠) | 选项卡 |
| Tooltip | tooltip.tsx | 无 | 提示信息 |
| Textarea | textarea.tsx | 无 | 多行文本输入 |
| Label | label.tsx | 无 | 表单标签 |

### 第二优先级：数据展示与导航组件

| 组件 | 2.0 文件 | 主项目已有类似 | 说明 |
|------|---------|--------------|------|
| Table | table.tsx | DataGrid (部分重叠) | 数据表格 |
| Badge | badge.tsx | Tags (部分重叠) | 徽章/标记 |
| Avatar | avatar.tsx | 无 | 头像 |
| Separator | separator.tsx | 无 | 分隔线 |
| Skeleton | skeleton.tsx | 无 | 骨架屏 |
| Breadcrumb | breadcrumb.tsx | 无 | 面包屑导航 |
| Pagination | pagination.tsx | 无 | 分页 |
| Progress | progress.tsx | ProgressBar (部分重叠) | 进度条，与 ProgressBar 合并 |
| ScrollArea | scroll-area.tsx | 无 | 滚动区域 |
| Alert | alert.tsx | 无 | 警告提示 |

### 第三优先级：高级交互组件

| 组件 | 2.0 文件 | 主项目已有类似 | 说明 |
|------|---------|--------------|------|
| Popover | popover.tsx | 无 | 弹出层 |
| HoverCard | hover-card.tsx | 无 | 悬浮卡片 |
| ContextMenu | context-menu.tsx | 无 | 右键菜单 |
| DropdownMenu | dropdown-menu.tsx | Dropdown (部分重叠) | 下拉菜单 |
| Command | command.tsx | 无 | 命令面板 |
| Select | select.tsx | Dropdown (部分重叠) | 选择器 |
| Sheet | sheet.tsx | BottomSheet (部分重叠) | 侧边抽屉 |
| Resizable | resizable.tsx | 无 | 可调整大小面板 |
| Toggle | toggle.tsx | 无 | 切换按钮 |
| ToggleGroup | toggle-group.tsx | 无 | 切换按钮组 |
| Sonner | sonner.tsx | 无 | Toast 通知 |
| Collapsible | collapsible.tsx | 无 | 可折叠区域 |
| Form | form.tsx | 无 | 表单 |
| InputOTP | input-otp.tsx | 无 | OTP 输入 |
| NavigationMenu | navigation-menu.tsx | Navigation (部分重叠) | 导航菜单 |
| Menubar | menubar.tsx | 无 | 菜单栏 |
| Sidebar | sidebar.tsx | 无 | 侧边栏 |
| AspectRatio | aspect-ratio.tsx | 无 | 宽高比容器 |
| Calendar (shadcn) | calendar.tsx | Calendar (已有) | 日期选择器，与现有 Calendar 合并 |
| Carousel | carousel.tsx | PhotoCarousel (部分重叠) | 轮播 |
| Chart | chart.tsx | 无 | 图表 |
| Drawer | drawer.tsx | BottomSheet (部分重叠) | 抽屉 |

### 与现有组件的合并策略

| 2.0 组件 | 主项目已有 | 策略 |
|---------|-----------|------|
| switch.tsx | Toggles | 将 Switch 作为 Toggles 的新变体 |
| tabs.tsx | SegmentedControl | Tabs 独立新增，SegmentedControl 保留 |
| badge.tsx | Tags | Badge 独立新增（视觉风格不同） |
| progress.tsx | ProgressBar | 将 Progress 样式合并到 ProgressBar |
| table.tsx | DataGrid | Table 独立新增（DataGrid 是高级表格，Table 是基础表格） |
| dialog.tsx | Modal | AlertDialog 独立新增，Modal 保留 |
| dropdown-menu.tsx | Dropdown | DropdownMenu 独立新增（交互模式不同） |
| select.tsx | Dropdown | Select 独立新增（选择器 vs 下拉菜单） |
| sheet.tsx | BottomSheet | Sheet 独立新增（侧边 vs 底部） |
| calendar.tsx | Calendar | 合并日期选择器功能到现有 Calendar |
| carousel.tsx | PhotoCarousel | 合并轮播功能到现有 PhotoCarousel |
| drawer.tsx | BottomSheet | Drawer 与 BottomSheet 合并 |
| navigation-menu.tsx | Navigation | NavigationMenu 独立新增 |

## ADDED Requirements

### Requirement: 新增通用 UI 基础组件
系统 SHALL 提供从 2.0 提取并适配的通用 UI 基础组件，遵循 web-ui-kit 项目的纯 CSS + BEM + Token 架构约定。

#### Scenario: 组件提取与适配
- **WHEN** 开发者从 2.0 提取一个 shadcn/ui 组件到 web-ui-kit
- **THEN** 该组件 SHALL：
  1. 使用 BEM 命名规范（`.nothing-{component}__{element}--{modifier}`）
  2. 所有样式通过 tokens.css 中的 CSS 变量引用，无硬编码值
  3. 支持 `data-theme="light"` / `data-theme="dark"` 主题切换
  4. 不依赖 Tailwind CSS、Radix UI 或其他外部 UI 库
  5. 提供 Vanilla JS + React 双版本
  6. CSS 文件在 `css/` 和 `react/src/styles/` 双目录同步
  7. 支持 `prefers-reduced-motion`
  8. 不使用 `!important`

#### Scenario: 交互组件无障碍性
- **WHEN** 组件具有交互行为（如可折叠、可展开、可聚焦）
- **THEN** 该组件 SHALL：
  1. 提供正确的 ARIA 属性（role, aria-expanded, aria-selected 等）
  2. 支持键盘导航（Tab, Enter, Space, Arrow keys 等）
  3. 提供可见的焦点指示器

### Requirement: Token 合并
系统 SHALL 将 2.0 theme.css 中有价值的 CSS 变量合并到 tokens.css。

#### Scenario: Token 合并
- **WHEN** 2.0 theme.css 中的变量在 tokens.css 中不存在
- **THEN** 该变量 SHALL 被添加到 tokens.css，并遵循现有命名规范
- **WHEN** 2.0 theme.css 中的变量在 tokens.css 中已存在等价变量
- **THEN** 使用 tokens.css 中已有的变量名，不重复定义

### Requirement: 展示页面更新
系统 SHALL 在 App.tsx 中展示所有新增组件。

#### Scenario: 展示新增组件
- **WHEN** 新组件被添加到项目
- **THEN** App.tsx 中 SHALL 有该组件的展示区域，包含主要变体的演示

## MODIFIED Requirements

### Requirement: 现有组件扩展
以下现有组件 SHALL 新增变体或功能以整合 2.0 组件的能力：
- **Toggles**: 新增 switch 变体（圆角开关样式）
- **ProgressBar**: 新增 slim/indeterminate 变体
- **Calendar**: 新增日期选择器交互功能

## REMOVED Requirements
无移除需求。所有现有组件保持不变。
