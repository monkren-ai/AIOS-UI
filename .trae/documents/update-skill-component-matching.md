# 更新 Nothing Design Skill：支持项目文件与设计组件比对及样式应用

## 目标

当 `nothing-design` 技能被调用时，增加"项目文件与设计组件比对"能力：
- 扫描用户当前项目中的 UI 组件/文件
- 将项目组件与 Nothing 设计系统中的同类型或相关功能组件进行匹配
- 自动应用匹配到的参考组件样式设计

## 当前问题

当前 SKILL.md 的工作流是"从零构建"导向的：
1. 声明字体 → 2. 选择模式 → 3. 勾勒层级 → 4. 组合 → 5. 查阅 Tokens → 6. 构建组件 → 7. 适配平台

缺少"分析现有项目 → 匹配设计组件 → 应用样式"的流程。当用户已有项目代码时，Skill 无法智能地比对和迁移样式。

## 审查发现

### 现有组件 API 模式（必须遵循的约定）
- **组件定义**：`interface XxxProps {}` + `const Xxx: React.FC<XxxProps>` + 解构默认值
- **变体处理**：`variant` prop + 字面量联合类型，默认值时部分省略修饰类
- **BEM 命名**：Block=`nothing-{组件名}`，Modifier=`nothing-{block}--{modifier}`，Element=`nothing-{block}__{element}`
- **类名拼接**：`[...].filter(Boolean).join(' ')` 数组模式
- **样式导入**：`import '../styles/{组件名kebab-case}.css'`
- **Token 引用**：组件 CSS 中零硬编码，全部 `var(--xxx)` 引用语义化 Token
- **主题切换**：组件层无 `[data-theme]` 选择器，100% 由 tokens.css 驱动
- **状态交互**：`:hover:not(:disabled)` / `:active:not(:disabled)` / `:focus-visible` / `:disabled` 统一模式
- **仅 WidgetCard 暴露 `className` prop**，其余组件均不支持外部 className

### 现有 CSS 架构（迁移时必须遵循）
- 一组件一 CSS 文件，纯原生 CSS，无预处理器
- Token 驱动：颜色/间距/字体/圆角/动画全部通过 CSS 变量引用
- 主题与组件完全解耦：组件文件中无 `[data-theme]` 选择器
- Widget 组件使用组件级主题修饰符（`--light`/`--dark`/`--accent`）而非全局主题

---

## 实施步骤

### 步骤 1：新增参考文件 `references/component-matching.md`

创建组件匹配映射参考文件，包含以下 4 个部分：

#### 1.1 组件分类映射表

将常见 UI 组件类型映射到 Nothing 设计系统组件，包含精确的组件名、变体、对应 CSS 文件和关键 Token：

| 项目组件类型 | Nothing 组件 | 变体 | CSS 文件 | 关键 Token |
|---|---|---|---|---|
| 按钮/操作 | Button | primary/secondary/ghost/destructive × sm/default/lg | buttons.css | `--text-display`, `--border-visible`, `--accent`, `--radius-pill` |
| 输入框 | Input | underline/bordered × error/disabled | inputs.css | `--border-visible`, `--text-secondary`, `--accent` |
| 开关/切换 | Switch | on/off × disabled | switch.css | `--text-display`, `--border-visible`, `--text-disabled` |
| 切换按钮 | Toggle/ToggleGroup | — | toggle.css | `--surface`, `--text-secondary` |
| 复选框 | Checkbox | checked/unchecked | checkbox.css | `--accent`, `--border-visible` |
| 单选 | RadioGroup | — | radio-group.css | `--accent`, `--border-visible` |
| 卡片/容器 | Card | default/raised/compact/technical × interactive/disabled | cards.css | `--surface`, `--surface-raised`, `--border` |
| 列表/数据行 | DataRows | status colors | data-rows.css | `--text-secondary`, `--success`, `--warning`, `--accent` |
| 数据网格 | DataGrid | active row indicator | data-grid.css | `--surface-raised`, `--accent` |
| 表格 | Table | striped/hoverable | table.css | `--border`, `--border-visible` |
| 标签/芯片 | Tag | pill/technical × active/removable/disabled | tags.css | `--border-visible`, `--text-display` |
| 分段控制 | SegmentedControl | 2-4 segments | segmented-control.css | `--text-display`, `--border-visible` |
| 标签页 | Tabs | — | tabs.css | `--border-visible`, `--text-secondary` |
| 导航栏 | Navigation | bracket variant | navigation.css | `--text-display`, `--text-disabled` |
| 侧边栏 | Sidebar | icon/badge | sidebar.css | `--surface`, `--border` |
| 弹窗/对话框 | Modal | default/alert × destructive | modal.css | `--surface`, `--border-visible`, `--accent` |
| 侧边抽屉 | Sheet | top/bottom/left/right | sheet.css | `--surface`, `--border-visible` |
| 下拉选择 | Select | searchable | select.css | `--surface-raised`, `--border-visible` |
| 下拉菜单 | DropdownMenu | menubar variant | dropdown-menu.css | `--surface-raised`, `--border-visible` |
| 右键菜单 | ContextMenu | shortcut keys | context-menu.css | `--surface-raised`, `--border-visible` |
| 弹出层 | Popover | — | popover.css | `--surface-raised`, `--border-visible` |
| 悬浮卡片 | HoverCard | — | hover-card.css | `--surface-raised`, `--border-visible` |
| 工具提示 | Tooltip | — | tooltip.css | `--surface`, `--text-primary` |
| 命令面板 | Command | searchable | command.css | `--surface`, `--border-visible` |
| 进度条 | ProgressBar | hero/standard/compact/slim × indeterminate | progress-bar.css | `--text-display`, `--success`, `--warning`, `--accent` |
| 滑块 | Slider | — | slider.css | `--border-visible`, `--text-display` |
| 日期导航 | DateNav | — | date-nav.css | `--text-secondary`, `--border-visible` |
| 面包屑 | Breadcrumb | — | breadcrumb.css | `--text-secondary`, `--text-primary` |
| 分页 | Pagination | — | pagination.css | `--text-secondary`, `--text-display` |
| 手风琴 | Accordion | — | accordion.css | `--border`, `--border-visible` |
| 折叠 | Collapsible | — | collapsible.css | `--border` |
| 通知/提示 | Sonner | — | sonner.css | `--surface`, `--border-visible` |
| 警告 | Alert | — | alert.css | `--accent`, `--surface` |
| 徽章 | Badge | default/secondary/destructive/outline | badge.css | `--accent`, `--border-visible` |
| 头像 | Avatar | sm/md/lg | avatar.css | `--surface-raised`, `--border` |
| 骨架屏 | Skeleton | text/circular/rectangular | skeleton.css | `--surface-raised` |
| 状态展示 | States | Loading/Error/Empty/Disabled | states.css | `--text-secondary`, `--text-disabled`, `--accent` |
| 分隔线 | Separator | horizontal/vertical | separator.css | `--border` |
| 滚动区域 | ScrollArea | — | scroll-area.css | `--border` |
| 表单 | Form | validation | form.css | `--accent`, `--border-visible` |
| 文本域 | Textarea | — | textarea.css | `--border-visible` |
| OTP 输入 | InputOTP | — | input-otp.css | `--border-visible` |
| 宽高比 | AspectRatio | — | aspect-ratio.css | — |
| 可调整 | Resizable | — | resizable.css | `--border` |
| 标签 | Label | — | label.css | `--text-secondary` |
| 时钟 | Clock | digital/gauge | clock.css | `--font-ndot`, `--text-display` |
| 电池 | Battery | — | battery.css | `--text-display`, `--success`, `--accent` |
| 日历 | Calendar | compact/full | calendar.css | `--text-primary`, `--accent` |
| 系统监控 | SystemMonitor | — | system-monitor.css | `--text-display`, `--success`, `--warning` |
| 音乐播放器 | MusicPlayer | — | music-player.css | `--text-display`, `--text-secondary` |
| 照片轮播 | PhotoCarousel | autoplay | photo-carousel.css | `--surface` |
| 咖啡因追踪 | Caffeinate | — | caffeinate.css | `--accent`, `--text-display` |
| 剪贴板 | Clipboard | — | clipboard.css | `--surface`, `--border` |
| 番茄钟 | Pomodoro | — | pomodoro.css | `--accent`, `--text-display` |
| 对讲机 | WalkieTalkie | — | walkie-talkie.css | `--accent` |
| 日晷 | SunDial | — | sun-dial.css | `--text-display`, `--text-secondary` |
| 年龄动画 | AgeMotion | — | age-motion.css | `--text-display`, `--success` |
| 计时器 | Chrono | — | chrono.css | `--font-ndot`, `--text-display` |
| 旋转选择器 | Spinner | — | spinner.css | `--text-display`, `--accent` |
| 世界时钟 | WorldClock | — | world-clock.css | `--text-display`, `--text-secondary` |
| 点阵矩阵 | DotMatrix | — | dot-matrix.css | `--text-display`, `--text-disabled` |
| Widget 卡片 | WidgetCard | square/wide/tall × light/dark/accent | widget-card.css | `--widget-card-bg`, `--widget-dark-bg`, `--widget-primary` |
| Widget 网格 | WidgetGrid | — | widget-grid.css | `--widget-bg`, `--widget-dark-bg` |
| QuickToggle | QuickToggle | circle/pill × light/dark/accent | quick-toggle.css | `--widget-primary`, `--widget-card-bg` |
| Widget 图标 | WidgetIcon | sm/md/lg | widget-icon.css | `--widget-primary` |
| Widget 胶囊 | WidgetPill | — | widget-pill.css | `--widget-card-bg`, `--widget-primary` |
| Glyph 图标 | Glyph | check/heart/play/wifi/sun/moon... | glyph.css | `--text-display` |
| 天气 Widget | WeatherWidget | — | weather-widget.css | `--widget-card-bg`, `--widget-dark-bg` |
| 步数 Widget | StepsWidget | — | steps-widget.css | `--widget-card-bg`, `--widget-primary` |
| 活动 Widget | ActivityWidget | — | activity-widget.css | `--widget-card-bg`, `--widget-primary` |
| 指南针 Widget | CompassWidget | — | compass-widget.css | `--widget-dark-bg`, `--text-display` |
| 时间 Widget | TimeWidget | — | time-widget.css | `--widget-dark-bg`, `--font-ndot` |

#### 1.2 样式特征识别规则

定义如何从项目文件中识别组件类型，按三个维度：

**A. 结构识别（HTML/JSX 语义）**
- `<button>` / `role="button"` / `onClick` + 无表单关联 → Button
- `<input type="text/email/password">` / `<textarea>` → Input / Textarea
- `<input type="checkbox">` → Checkbox
- `<input type="radio">` → RadioGroup
- `<select>` / `role="listbox"` / `role="combobox"` → Select / DropdownMenu
- `<dialog>` / `role="dialog"` / `role="alertdialog"` → Modal
- `<nav>` / `role="navigation"` → Navigation / Sidebar
- `<table>` / `role="table"` / `role="grid"` → Table / DataGrid
- `<details>` / `role="treeitem"` → Accordion / Collapsible
- `<progress>` / `role="progressbar"` → ProgressBar
- `<input type="range">` / `role="slider"` → Slider
- `<input type="switch">` / `role="switch"` → Switch
- `<input type="number">` + OTP pattern → InputOTP
- `<img>` + circular → Avatar
- `<form>` → Form

**B. 视觉特征识别（CSS 属性组合）**
- `border-radius: 999px` + `text-transform: uppercase` → Button (pill variant) 或 Tag (pill variant)
- `border-radius: 4px` + `text-transform: uppercase` + `font-family: mono` → Tag (technical variant) 或 Button (technical)
- `border-bottom: 1px solid` + 无其他边框 → Input (underline variant)
- `border: 1px solid` + `border-radius: 8px` → Input (bordered variant) 或 Card (compact)
- `border-radius: 12-16px` + `background: surface` → Card
- `width: 100%` + `height: 4-8px` + `border-radius: 2-4px` → ProgressBar (compact/slim)
- `width: 100%` + `height: 16-20px` + segmented → ProgressBar (hero)
- `position: fixed/absolute` + `backdrop` + `z-index: high` → Modal / Sheet / Popover
- `transform: translateX/Y` + `position: fixed` → Sheet (slide-in)
- `background: rgba(0,0,0,0.8)` + centered → Modal backdrop
- `font-size: 48-96px` + `font-family: mono/display` → Hero metric / Clock
- `font-size: 8-12px` + `text-transform: uppercase` + `letter-spacing: 0.06em` → Label / Caption (Nothing tertiary layer)
- `display: grid` + `gap: 8-16px` + widget-sized cards → WidgetGrid

**C. 交互模式识别（JS 行为）**
- `onClick` + 弹出覆盖层 + 焦点陷阱 → Modal
- `onClick` + 侧边滑入 → Sheet
- `onClick` + 下拉列表 → Select / DropdownMenu
- `onClick` + 右键触发 → ContextMenu
- `onClick` + 悬浮触发 → HoverCard / Popover
- `onChange` + 分段切换 + 滑动指示器 → SegmentedControl
- `onChange` + 标签页切换 → Tabs
- `onToggle` / `checked` state → Switch / Toggle / Checkbox
- `onSubmit` + 验证 → Form
- `onDrag` + 调整大小 → Resizable
- 自动轮播 + 左右箭头 → PhotoCarousel

#### 1.3 样式迁移策略

根据项目现有样式方案，提供不同的迁移路径：

**A. 原生 CSS / CSS Modules 项目**
- 将 Nothing tokens.css 中的 CSS 变量复制到项目根样式文件
- 将对应组件的 CSS 文件复制到项目样式目录
- 在组件中替换类名为 Nothing BEM 类名
- 替换硬编码值为 `var(--xxx)` Token 引用

**B. Tailwind CSS 项目**
- 将 Nothing tokens 映射为 Tailwind 自定义主题值（在 tailwind.config.js 中扩展）
- 将 BEM 类名映射为 Tailwind 工具类组合
- 提供 `@apply` 指令的混合方案
- 关键映射：
  - `nothing-btn--primary` → `bg-[var(--text-display)] text-[var(--black)] rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider`
  - `nothing-card` → `bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 md:p-6`
  - `nothing-input--underline` → `border-b border-[var(--border-visible)] bg-transparent`

**C. CSS-in-JS (Styled Components / Emotion) 项目**
- 将 Nothing Token 值提取为 JS 常量对象
- 将 BEM 结构转换为 styled-components 模板
- 提供主题 Provider 封装

**D. 通用渐进式迁移**
1. 第一步：仅引入 tokens.css，替换硬编码颜色/间距/字体为 CSS 变量
2. 第二步：引入组件级 CSS 文件，替换类名
3. 第三步：引入完整组件，替换 JSX 结构

#### 1.4 匹配输出格式

每次匹配生成标准报告：

```markdown
## Nothing Design 组件匹配报告

### 项目信息
- 技术栈：[React/Vue/Angular/HTML]
- 样式方案：[CSS Modules/Tailwind/CSS-in-JS/原生 CSS]
- 主题模式：[dark/light/未设置]

### 匹配结果

| 项目组件 | 文件路径 | Nothing 组件 | 匹配类型 | 置信度 | 建议方案 |
|---------|---------|------------|---------|--------|---------|
| MyButton | src/components/Button.tsx | Button (primary) | 精确匹配 | 高 | 直接引用 |
| UserCard | src/components/Card.tsx | Card (default) | 精确匹配 | 高 | 样式迁移 |
| NavMenu | src/components/Nav.tsx | Navigation (bracket) | 功能匹配 | 中 | 混合模式 |
| CustomPopup | src/components/Popup.tsx | Modal (default) | 视觉匹配 | 低 | 混合模式 |

### 迁移建议
1. [优先级排序的迁移步骤]
2. [需要用户确认的决策点]
3. [可能的风险和注意事项]
```

### 步骤 2：更新 SKILL.md — 新增 Section 6 "COMPONENT MATCHING & MIGRATION"

在 SKILL.md 中新增第 6 节，定义组件匹配与迁移的工作流程和规则：

#### 6.1 项目扫描

当 Skill 被调用且用户有现有项目时，首先执行项目扫描：

1. **识别技术栈**
   - 使用 Glob 查找 `package.json`、`tsconfig.json`、`vite.config.*`、`next.config.*` 等配置文件
   - 使用 Grep 搜索 `import.*from 'react'`、`import.*from 'vue'`、`import.*from '@angular'` 等模式
   - 使用 Grep 搜索样式方案：`@tailwind`、`styled-components`、`*.module.css`、`*.styled.ts`

2. **提取组件清单**
   - 使用 Glob 查找 `src/components/**/*.{tsx,jsx,vue,svelte}` 等组件文件
   - 使用 Grep 搜索 `export default`、`export function`、`export const` 等导出模式
   - 使用 Read 读取关键组件文件，提取 props 接口和类名

3. **分析样式特征**
   - 使用 Glob 查找 `src/**/*.css`、`src/**/*.scss`、`src/**/*.less` 等样式文件
   - 使用 Grep 搜索 `border-radius`、`text-transform`、`font-family`、`background` 等关键 CSS 属性
   - 识别现有的设计系统或 UI 库（Material UI、Ant Design、Chakra UI 等）

#### 6.2 组件匹配

将扫描结果与 `references/component-matching.md` 中的映射表对照：

**匹配维度与优先级：**
1. **精确匹配**（置信度：高）— 项目组件名/结构与 Nothing 组件直接对应
   - 例：项目有 `<Button>` → Nothing `<Button>`
2. **功能匹配**（置信度：中）— 功能相同但实现方式不同
   - 例：项目有自定义弹窗 → Nothing `<Modal>`
3. **视觉匹配**（置信度：低）— 视觉风格相似但功能不同
   - 例：项目有带圆角的卡片式列表 → Nothing `<Card>` + `<DataRows>`

**匹配决策树：**
```
项目组件 → 有明确语义名？→ 是 → 查映射表 → 精确/功能匹配
                        → 否 → 分析 CSS 属性 → 视觉匹配
                        → 否 → 分析交互行为 → 功能匹配
```

#### 6.3 样式应用

提供三种应用方式，按侵入程度递增：

**a. Token 注入（最低侵入）**
- 仅引入 `tokens.css`，将项目中的硬编码值替换为 CSS 变量
- 不改变组件结构、类名、JS 逻辑
- 适合：只想统一颜色/间距/字体，不想改变组件实现

**b. 样式迁移（中等侵入）**
- 引入 tokens.css + 组件级 CSS 文件
- 将项目类名替换为 Nothing BEM 类名
- 可能需要调整 JSX/HTML 结构以匹配 BEM Element 命名
- 适合：想获得 Nothing 视觉风格，但保留自己的组件逻辑

**c. 组件替换（最高一致性）**
- 直接导入 web-ui-kit 预构建组件替换项目组件
- 需要将项目 props 映射到 Nothing 组件 props
- 适合：React 项目，想获得完整的 Nothing 设计体验

**迁移时必须遵循的约定：**
- 组件 CSS 中零硬编码，全部使用 `var(--xxx)` 引用 Token
- BEM 命名：`nothing-{block}` / `nothing-{block}--{modifier}` / `nothing-{block}__{element}`
- 类名拼接：`[...].filter(Boolean).join(' ')` 数组模式
- 主题切换不在组件层写 `[data-theme]` 选择器，100% 由 tokens.css 驱动
- 状态交互统一模式：`:hover:not(:disabled)` / `:focus-visible` / `:disabled { opacity: 0.4 }`

### 步骤 3：更新 SKILL.md — 修改 Section 4 WORKFLOW

在现有工作流中增加"项目迁移"分支：

**现有工作流保持不变**（适用于从零构建场景）

**新增"项目迁移工作流"**（适用于已有项目场景）：

1. **扫描项目** — 使用 Glob/Grep/SearchCodebase 识别组件文件和样式
2. **识别技术栈** — 确定框架（React/Vue/Angular/HTML）和样式方案（CSS/Tailwind/CSS-in-JS）
3. **匹配组件** — 对照 `references/component-matching.md` 进行映射，生成匹配报告
4. **确认方案** — 与用户确认应用方式（Token 注入/样式迁移/组件替换）
5. **应用样式** — 按确认方案执行迁移，遵循 Section 6.3 中的约定
6. **验证一致性** — 检查迁移后的组件是否符合 Nothing 设计规范（Section 2 CRAFT RULES）

**工作流选择逻辑：**
- 用户明确说"迁移"/"转换"/"应用样式到现有项目" → 项目迁移工作流
- 用户明确说"创建"/"新建"/"设计" → 标准设计工作流
- 用户已有项目文件打开且未明确指定 → 询问用户选择哪种工作流

### 步骤 4：更新 SKILL.md — 修改 description 触发条件

扩展 description 以覆盖迁移场景：

```
description: This skill should be used when the user explicitly says "Nothing style", "Nothing design", "/nothing-design", or directly asks to use/apply the Nothing design system to new or existing projects. Also triggers when user asks to migrate, convert, restyle, or apply Nothing design to existing project files/components. NEVER trigger automatically for generic UI or design tasks.
```

### 步骤 5：更新 SKILL.md — 版本号升级

将 version 从 `3.0.0` 升级到 `4.0.0`（新增核心功能，属于 major 版本变更）

### 步骤 6：更新 SKILL.md — allowed-tools 扩展

当前：`[Read, Write, Edit, Glob, Grep]`

新增 `SearchCodebase` 以支持更智能的项目文件搜索和组件识别：

```
allowed-tools: [Read, Write, Edit, Glob, Grep, SearchCodebase]
```

### 步骤 7：更新 SKILL.md — Section 5 REFERENCE FILES

在参考文件索引中新增 `component-matching.md`：

```
- **`references/component-matching.md`** — Component type mapping, style feature identification rules, migration strategies for applying Nothing design to existing projects
```

---

## 修改文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `nothing-design-skill/nothing-design/SKILL.md` | 编辑 | 更新 description、version、allowed-tools、WORKFLOW、新增 Section 6、更新 Section 5 |
| `nothing-design-skill/nothing-design/references/component-matching.md` | 新建 | 组件匹配映射参考文件 |

## 设计原则

1. **向后兼容**：现有工作流不受影响，新增功能为可选分支
2. **渐进式迁移**：支持三种粒度的样式应用（Token 注入 → 样式迁移 → 组件替换），用户可选择最低侵入方式
3. **智能匹配**：通过三维匹配（结构+视觉+交互）提高匹配准确度，输出置信度评级
4. **可验证**：匹配结果生成报告供用户确认，不自动执行不可逆操作
5. **约定一致**：迁移时严格遵循现有组件 API 和 CSS 架构约定，确保风格一致性
