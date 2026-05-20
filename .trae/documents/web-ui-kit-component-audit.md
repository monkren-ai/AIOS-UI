# Web UI Kit 组件梳理与优化计划

## 现状概览

- **82 个组件文件** (80 个 .tsx + 1 个 widgets 子目录 + 1 个 SVG 数据文件)
- **84 个 CSS 文件** (82 个组件 CSS + tokens.css + widgets.css)
- **统一技术栈**: 纯 CSS + BEM + CSS 变量 (tokens.css)，零 Tailwind/Radix/cva 依赖
- **2 个异常**: Chart.tsx / Carousel.tsx 仍残留 shadcn/ui 风格 (`cn()` 工具函数)

---

## 一、组件分类 (6 大类)

### A. 基础交互 (Primitive) — 15 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Button | Buttons.tsx | primary/secondary/ghost/destructive |
| Input | Inputs.tsx | underline/bordered，error/disabled |
| Switch | **Toggles.tsx** → 重命名 | on/off 开关 |
| Toggle | Toggle.tsx | pressed/unpressed 切换按钮 + ToggleGroup |
| Checkbox | Checkbox.tsx | checked/indeterminate |
| RadioGroup | RadioGroup.tsx | horizontal/vertical |
| Slider | Slider.tsx | 可交互滑块 |
| Textarea | Textarea.tsx | autoResize |
| Label | Label.tsx | disabled/required |
| InputOTP | InputOTP.tsx | 逐格 OTP 输入 |
| Form | Form.tsx | 表单容器 |
| SegmentedControl | SegmentedControl.tsx | pill/rounded 分段控制 |
| QuickToggle | QuickToggle.tsx | circle/pill 快速切换 |
| Tags | Tags.tsx | pill/technical，active/removable |
| Badge | Badge.tsx | default/secondary/destructive/outline |

### B. 数据展示 (Display) — 13 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Card | Cards.tsx | default/raised/compact/technical |
| WidgetCard | WidgetCard.tsx | square/wide + light/dark/accent |
| DataRows | DataRows.tsx | label/value/unit/trend |
| DataGrid | DataGrid.tsx | columns/rows + 状态着色 |
| Table | Table.tsx | striped/compact/hoverable |
| ProgressBar | ProgressBar.tsx | hero/standard/compact |
| Avatar | Avatar.tsx | sm/md/lg + fallback |
| Skeleton | Skeleton.tsx | text/circular/rectangular |
| Separator | Separator.tsx | horizontal/vertical |
| Breadcrumb | Breadcrumb.tsx | items + separator |
| Pagination | Pagination.tsx | page/totalPages |
| DotMatrix | DotMatrix.tsx | grid/glyph/custom pattern |
| Spinner | Spinner.tsx | 转盘选择器 (非 loading!) |

### C. 覆盖层 (Overlay) — 12 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Modal | Modal.tsx | 通用居中对话框 |
| AlertDialog | AlertDialog.tsx | 确认对话框 (Modal 特化) |
| Sheet | Sheet.tsx | 侧边/底部滑入面板 |
| BottomSheet | BottomSheet.tsx | 底部弹出面板 (Sheet 特化) |
| Dropdown | Dropdown.tsx | 简单下拉选择 |
| DropdownMenu | DropdownMenu.tsx | 菜单式下拉 |
| Select | Select.tsx | 可搜索下拉选择 |
| Popover | Popover.tsx | 弹出层 |
| HoverCard | HoverCard.tsx | 悬浮卡片 |
| Tooltip | Tooltip.tsx | 工具提示 |
| ContextMenu | ContextMenu.tsx | 右键菜单 |
| Sonner | Sonner.tsx | Toast 通知 |

### D. 导航与布局 (Navigation) — 8 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Navigation | Navigation.tsx | 简单 tab 导航 |
| NavigationMenu | NavigationMenu.tsx | 带子菜单导航 |
| Menubar | Menubar.tsx | 水平菜单栏 |
| Sidebar | Sidebar.tsx | 侧边栏 |
| Tabs | Tabs.tsx | 标签页 |
| Accordion | Accordion.tsx | 手风琴 |
| Collapsible | Collapsible.tsx | 可折叠区域 |
| Resizable | Resizable.tsx | 可调整大小面板 |

### E. Widget 组件 (Nothing 2.0) — 16 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Clock | Clock.tsx | digital/gauge/dual-ring/overlay |
| WorldClock | WorldClock.tsx | 多城市 UTC |
| Battery | Battery.tsx | segmented/ring |
| Calendar | Calendar.tsx | compact/full |
| SystemMonitor | SystemMonitor.tsx | CPU/RAM/Storage/Net |
| MusicPlayer | MusicPlayer.tsx | tracks/progress |
| PhotoCarousel | PhotoCarousel.tsx | 照片轮播 |
| Caffeinate | Caffeinate.tsx | 咖啡因追踪 |
| Clipboard | Clipboard.tsx | 剪贴板管理 |
| Pomodoro | Pomodoro.tsx | 番茄钟 |
| WalkieTalkie | WalkieTalkie.tsx | 对讲机 |
| SunDial | SunDial.tsx | 日晷 |
| AgeMotion | AgeMotion.tsx | 年龄动画 |
| Chrono | Chrono.tsx | 秒表 |
| StepsWidget | StepsWidget.tsx | 步数 |
| TimeWidget | TimeWidget.tsx | 限时/日期 |

### F. 特殊/未分类 — 6 个
| 组件 | 文件 | 说明 |
|------|------|------|
| Chart | Chart.tsx | 图表 (shadcn 残留) |
| Carousel | Carousel.tsx | 轮播 (shadcn 残留) |
| Taskbar | Taskbar.tsx | 底部任务栏 |
| Date | Date.tsx | 日期展示 Widget |
| DateNav | DateNav.tsx | 日期导航 |
| States | States.tsx | Loading/Error/Empty/Disabled 四态 |
| ErrorBoundary | ErrorBoundary.tsx | React 错误边界 |
| WidgetGrid | WidgetGrid.tsx | Widget 网格布局 |
| ActivityWidget | ActivityWidget.tsx | 活动 Widget |
| WeatherWidget | WeatherWidget.tsx | 天气 Widget |
| CompassWidget | CompassWidget.tsx | 指南针 Widget |
| Quotes | Quotes.tsx | 名言轮播 |
| NextEvent | NextEvent.tsx | 下一事件 |
| NothingWidgets20 | widgets/NothingWidgets20.tsx | Figma 导出 SVG 图标集 |

---

## 二、重叠问题与优化方案

### 🔴 优先级 1: 必须处理

#### 1.1 Toggles.tsx → Switch.tsx 重命名
- **问题**: `Toggles.tsx` 和 `Toggle.tsx` 命名冲突，App.tsx 被迫使用 `as NewToggle` 别名
- **方案**: 将 `Toggles.tsx` 重命名为 `Switch.tsx`，导出名改为 `Switch`
- **影响**: `Toggles.tsx` → `Switch.tsx`，`toggles.css` → `switch.css`，App.tsx 导入更新

#### 1.2 删除 shadcn 残留组件 (Chart.tsx / Carousel.tsx)
- **问题**: 两个文件是 shadcn/ui 直接移植，残留 `cn()` 工具函数，与 BEM 体系不一致；且 App.tsx 未使用
- **方案**: 删除 `Chart.tsx` + `chart.css`，删除 `Carousel.tsx` + `carousel.css`
- **替代**: 已有 Nothing 风格的 `PhotoCarousel.tsx`；图表需求可后续基于 BEM 重写
- **依赖清理**: 移除 `embla-carousel-react`、`recharts`、`lucide-react` 依赖

### 🟡 优先级 2: 建议合并

#### 2.1 Dropdown.tsx 合并到 Select.tsx
- **问题**: `Dropdown` 和 `Select` 都是值选择器，Select 是 Dropdown 的超集 (增加 searchable)
- **方案**: 在 Select 中增加 `searchable?: boolean` (默认 false)，Dropdown 的 API 作为 Select 的简化模式
- **结果**: 删除 `Dropdown.tsx` + `dropdown.css`

#### 2.2 AlertDialog.tsx 合并到 Modal.tsx
- **问题**: AlertDialog 只是 Modal 的确认对话框特化版本
- **方案**: 在 Modal 中增加 `variant?: 'default' | 'alert'`，alert 模式下增加 `confirmLabel`/`cancelLabel`/`onConfirm`/`onCancel` props
- **结果**: 删除 `AlertDialog.tsx` + `alert-dialog.css`

#### 2.3 BottomSheet.tsx 合并到 Sheet.tsx
- **问题**: Sheet 已支持 `side="bottom"`，BottomSheet 的 sections 功能可作为 Sheet 的子组件
- **方案**: 在 Sheet 中增加 `sections` prop 支持，BottomSheet 的功能作为 `<Sheet side="bottom" sections={...}>`
- **结果**: 删除 `BottomSheet.tsx` + `bottom-sheet.css`

#### 2.4 Menubar.tsx 合并到 DropdownMenu.tsx
- **问题**: Menubar 本质是水平排列的 DropdownMenu 组合
- **方案**: 在 DropdownMenu 中增加 `variant?: 'default' | 'menubar'`，menubar 模式下 items 水平排列
- **结果**: 删除 `Menubar.tsx` + `menubar.css`

### 🟢 优先级 3: 可选清理

#### 3.1 评估未使用组件
- `Taskbar.tsx` — 未在 App.tsx 使用，与 Sidebar 定位不同 (底部任务栏 vs 侧边栏)，可保留
- `Quotes.tsx` — 未使用，早期 Widget，可保留
- `NextEvent.tsx` — 未使用，早期 Widget，可保留
- `Date.tsx` — 未使用，与 Calendar/DateNav 互补，可保留
- `NothingWidgets20.tsx` — Figma 自动导出，不可维护，标记为 deprecated

#### 3.2 统一 Widget 子目录
- 将 `StepsWidget.tsx`、`TimeWidget.tsx`、`CompassWidget.tsx`、`WeatherWidget.tsx`、`ActivityWidget.tsx` 移入 `components/widgets/` 子目录
- 与 `NothingWidgets20.tsx` 同级管理

---

## 三、执行步骤

### Step 1: Toggles.tsx → Switch.tsx 重命名
1. 重命名文件 `Toggles.tsx` → `Switch.tsx`
2. 重命名 CSS `toggles.css` → `switch.css`
3. 更新 Switch.tsx 内部类名 `.nothing-toggle` → `.nothing-switch`
4. 更新 switch.css 内部类名
5. 更新 App.tsx 导入: `import Toggle from './Toggles'` → `import Switch from './Switch'`
6. 更新 App.tsx 渲染: `<Toggle ...>` → `<Switch ...>`
7. 移除 Toggle.tsx 的 `as NewToggle` 别名

### Step 2: 删除 shadcn 残留 (Chart + Carousel)
1. 删除 `Chart.tsx` + `chart.css`
2. 删除 `Carousel.tsx` + `carousel.css`
3. 从 App.tsx 移除 chart.css / carousel.css 导入
4. 从 package.json 移除 `embla-carousel-react`、`recharts`、`lucide-react`
5. 运行 `pnpm install` 更新 lockfile

### Step 3: 合并 Dropdown → Select
1. 在 Select.tsx 中增加 `searchable?: boolean` (默认 false)
2. 将 Dropdown 的 `options/value/onChange` API 迁移到 Select
3. 更新 Select 的 CSS 支持两种模式
4. 删除 `Dropdown.tsx` + `dropdown.css`
5. 更新 App.tsx 导入和渲染

### Step 4: 合并 AlertDialog → Modal
1. 在 Modal.tsx 中增加 `variant?: 'default' | 'alert'`
2. 增加 `confirmLabel`/`cancelLabel`/`onConfirm`/`onCancel` props
3. 迁移 AlertDialog 的 CSS 样式到 modal.css
4. 删除 `AlertDialog.tsx` + `alert-dialog.css`
5. 更新 App.tsx 导入和渲染

### Step 5: 合并 BottomSheet → Sheet
1. 在 Sheet.tsx 中增加 `sections` prop 支持
2. 迁移 BottomSheet 的 sections 渲染逻辑
3. 迁移 BottomSheet 的 CSS 样式到 sheet.css
4. 删除 `BottomSheet.tsx` + `bottom-sheet.css`
5. 更新 App.tsx 导入和渲染

### Step 6: 合并 Menubar → DropdownMenu
1. 在 DropdownMenu.tsx 中增加 `variant?: 'default' | 'menubar'`
2. 增加 menubar 模式的水平排列渲染
3. 迁移 Menubar 的 CSS 样式到 dropdown-menu.css
4. 删除 `Menubar.tsx` + `menubar.css`
5. 更新 App.tsx 导入和渲染

### Step 7: Widget 子目录整理
1. 将 `StepsWidget.tsx` 等移入 `components/widgets/` 目录
2. 对应 CSS 文件保持在 `styles/` 不变
3. 更新 App.tsx 导入路径

### Step 8: 验证
1. `pnpm dev` 无编译错误
2. TypeScript 零诊断错误
3. 所有组件正确渲染

---

## 四、预期结果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 组件文件数 | 82 | 74 (-8) |
| CSS 文件数 | 84 | 76 (-8) |
| 外部依赖 | 5 (clsx, embla, lucide, recharts, react-day-picker) | 2 (clsx, react-day-picker) |
| 命名冲突 | 1 (Toggle/Toggles) | 0 |
| 风格不一致 | 2 (Chart/Carousel) | 0 |
| 重叠组件 | 4 组 | 0 |
