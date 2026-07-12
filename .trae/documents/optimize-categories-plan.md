# 优化 Nothing UI 分类结构(全面重构)

## 摘要

对 `App.tsx` 中 19 个侧边栏分类进行重组,合并相似/重复项、统一命名、合并 Widgets 相关分类,并同步更新 `COMPONENTS.md`、`design.md` 等文档,使展示与说明保持一致。

**目标:**
- 分类数:19 → **12**(更聚焦、更易扫读)
- 命名规范:统一使用 `与` 连接(中文)、统一英文翻译
- Widgets 三个独立分类合并为一个,内部用 `h3` 子标题分组
- 同步 `COMPONENTS.md` 目录结构、`design.md` 章节引用

---

## 当前状态分析

### 现有 19 个分类(从 `App.tsx:196-216`)

| # | id | 中文 | 英文 | 组件数 | 主要问题 |
|---|----|------|------|--------|----------|
| 1 | core-interaction | 核心交互 | Core Interaction | 9 | — |
| 2 | data-display | 数据展示 | Data Display | 9 | — |
| 3 | overlays | 弹窗与层 | Overlays | 6 | — |
| 4 | navigation | 导航 | Navigation | 7 | — |
| 5 | menus-selection | 菜单与选择 | Menus & Selection | 6 | — |
| 6 | states | 状态 | States | 4 | — |
| 7 | **utility** | **工具** | **Utility** | 5 | ⚠️ 名称与 #10 冲突 |
| 8 | clock-calendar | 时钟与日历 | Clock & Calendar | 4 | — |
| 9 | system-monitoring | 系统与监控 | System & Monitoring | 3 | — |
| 10 | **utility-tools** | **实用工具** | **Utility Tools** | 7 | ⚠️ 与 #7 重复,实为功能型组件 |
| 11 | time-progress | 时间与进度 | Time & Progress | 5 | ⚠️ 与 #8 大量重叠 |
| 12 | visual-display | 视觉展示 | Visual Display | 3 | ⚠️ "展示" 重复 |
| 13 | feature-widgets | 特色组件 | Feature Widgets | 1 (showcase) | ⚠️ 仅 1 个,实际内容多 |
| 14 | widget-layout | 组件布局 | Widget Layout | 2 | ⚠️ 仅 2 个 |
| 15 | figma-20-library | Figma 2.0 库 | Figma 2.0 Library | 1 (showcase) | ⚠️ 与 Widgets 主题同类 |
| 16 | dotmatrix-loaders | 点阵加载器 | Dotmatrix Loaders | 1 (section) | — |
| 17 | nullframe | Nullframe 仪表盘 | Nullframe Dashboard | 1 (section) | — |
| 18 | design-system | 设计系统文档 | Design System Docs | 1 (section) | — |
| 19 | download | 下载 | Download | 2 (内容) | — |

### 关键问题

1. **命名冲突/相似**
   - `工具` vs `实用工具`(7 号和 10 号)— 用户难以区分
   - `数据展示` vs `视觉展示`— 都含"展示"
   - `时钟与日历` vs `时间与进度`— 大量组件重叠(Pomodoro、SunDial、Chrono 等)

2. **Widgets 拆分过细**
   - `特色组件` + `组件布局` + `Figma 2.0 库` 三者都围绕 Widgets,共 4 个组件(1+2+1),拆为 3 类信息密度过低
   - `WidgetCard` / `WidgetGrid` 应作为 Widgets 的基础布局,与 Widgets 本体同组

3. **空泛类**
   - `组件布局` 仅 2 个组件,作为独立侧边栏项太单薄
   - `视觉展示` 仅 3 个组件,且都偏向"图形/动效",应并入更大类

4. **命名风格不统一**
   - 用 `与` 连接:弹窗与层、菜单与选择、时钟与日历、系统与监控
   - 单一名词:导航、状态、工具、下载
   - 英文翻译:Utility / Utility Tools / Visual Display 含义模糊

5. **文档不同步**
   - `COMPONENTS.md` 已使用 16 个分类(目录),与 App.tsx 的 19 个不匹配
   - `design.md` 没有显式分类章节,但引用了大量组件

---

## 方案:重构为 12 个分类

### 新分类结构

| # | id | 中文 | 英文 | 来源(旧) | 包含组件(摘要) |
|---|----|------|------|----------|-----------------|
| 1 | core-interaction | 核心交互 | Core Interaction | core-interaction | Button, Input, Switch, Slider, Toggle, Checkbox, RadioGroup, SegmentedControl, Tag, Label, Textarea |
| 2 | data-display | 数据展示 | Data Display | data-display | Card, Badge, Avatar, DataGrid, DataRows, Table, ProgressBar, Separator, Skeleton, Quotes |
| 3 | overlays | 覆盖层 | Overlays | overlays | Modal, Sheet, Popover, HoverCard, Tooltip, AlertDialog |
| 4 | navigation | 导航 | Navigation | navigation | Navigation, NavigationMenu, Tabs, Breadcrumb, Pagination, Sidebar |
| 5 | menus-selection | 菜单与选择 | Menus & Selection | menus-selection | DropdownMenu, Select, ContextMenu, Command, Accordion, Collapsible |
| 6 | states | 状态与反馈 | States & Feedback | states + States 组件 | LoadingState, ErrorState, EmptyState, DisabledState, Alert, ErrorBoundary, Sonner(如有) |
| 7 | time | 时间与日历 | Time & Calendar | clock-calendar + time-progress 合并 | Time, Calendar, WorldClock, Date, DateWidget, SunDial, AgeMotion, Chrono, Spinner, NextEvent, Pomodoro |
| 8 | system | 系统与媒体 | System & Media | utility + utility-tools + system-monitoring 整合 | Battery, SystemMonitor, QuickToggle, Caffeinate, Clipboard, Taskbar, WalkieTalkie, MusicPlayer, PhotoCarousel, ScrollArea, Resizable, AspectRatio, Form, InputOTP |
| 9 | **widgets** | **Widgets** | **Widgets** | feature-widgets + widget-layout + figma-20-library **合并** | `<WidgetShowcase />` (Weather/Steps/Activity/Compass/Time/PhotoFrame) + `<Figma20Showcase />` (WidgetIcons/WidgetPills/WidgetSubComponents) + WidgetCard/WidgetGrid 基础 + WidgetIcon/WidgetPill/Glyph 通用件 — 内部用 h3 子标题分组:`Widgets · 展示 / Widgets · 布局 / Widgets · Figma 2.0 / Widgets · 通用件` |
| 10 | dotmatrix-loaders | 点阵加载器 | Dotmatrix Loaders | 不变 | `<DotMatrixLoadersSection />`(动画系统独立) |
| 11 | nullframe | Nullframe 仪表盘 | Nullframe Dashboard | 不变 | `<NullframeSection />`(独立) |
| 12 | design-system | 设计系统 | Design System | design-system + download 合并 | `<DesignSystemSection />` + 下载文件列表(下载作为设计系统一部分,不再单独占侧边栏项) |

> **取舍说明:** `visual-display` 内容(DotMatrix/DotMatrixIcon/Quotes)并入 `data-display`;`download` 并入 `design-system`(因下载内容就是设计系统文档相关)。

### 命名规范统一

- 中文:**名词 + 与 + 名词** 用于多主题(与现状一致),单主题用单词
- 英文:**Title Case**,统一使用 `&` 替代 `and`
- Widgets 相关 3 类合并为 `Widgets`,**不加中英文标题**(与项目风格一致,Figma/Nullframe 已使用专有名词)

---

## 实施状态

> 以下记录了每个步骤的实际完成状态。

### ✅ 步骤 1:重构 `App.tsx` 的 categories 数组和 CategorySection 结构 — **已完成**

**文件:** `nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx`

**变更摘要:**
- 第 196-209 行:categories 数组已从 19 项简化为 12 项
- 第 421-1496 行:CategorySection 重组完毕,新增 `time`、`system`、`widgets`(带 h3 子标题)、扩展的 `design-system`
- 删除了 7 个旧 CategorySection(utility / clock-calendar / system-monitoring / utility-tools / time-progress / visual-display / feature-widgets / widget-layout / figma-20-library / download)
- 所有 import 保持完整,无未使用引用(由 `tsc --noEmit` 校验)

### ✅ 步骤 2:更新 `COMPONENTS.md` — **已完成**

**文件:** `nothing-design-skill/nothing-design/web-ui-kit/react/COMPONENTS.md`

**变更摘要:**
- 第 6-17 行:目录从 10 项扩展为 12 项,与新结构对齐
- 第 304-349 行:合并"时钟与日历"+"时间与进度"为"7. 时间与日历 (Time & Calendar)"
- 第 352-418 行:合并"工具"+"实用工具"+"系统与监控"为"8. 系统与媒体 (System & Media)"
- 第 422-510 行:合并 3 个旧分类为"9. Widgets 组件",含 9.1-9.4 四个子节
- 原"12. 视觉展示组件"(DotMatrix/DotMatrixIcon/Quotes)内容并入"2. 数据展示组件"

### ✅ 步骤 3:更新 `design.md` 引用 — **无需更改**

**文件:** `nothing-design-skill/nothing-design/design.md`

**结论:** 经过 `Grep` 全文搜索 `状态|时钟与日历|工具|实用工具|视觉展示|系统与监控|特色组件|组件布局|Figma 2.0 库`,design.md **未引用任何旧分类名称**。该文件为通用设计规范(Overview、Typography、Colors 等),不依赖分类命名,无需同步。

### ⏳ 步骤 4:验证 — **待执行**

需要在执行阶段运行以下验证:

1. `npm run type-check` — 验证 TypeScript 零类型错误
2. `npm run lint` — 验证 ESLint 零警告
3. `npm run build` — 验证生产构建成功
4. 浏览器检查:
   - 侧边栏显示 12 个分类项
   - 各分类内容正确渲染
   - 锚点跳转正常(滚动到 `#widgets` 等)
   - 中英文切换(`中/EN` 按钮)正确
5. 暗色/亮色主题切换无视觉异常
6. Widgets 大类滚动流畅(子标题样式 `groupTitleStyle` 正常)

---

## 假设与决策

1. **保留所有组件**:只重组分类,不删除/合并组件(若需合并,属于独立任务)
2. **Widgets 合并为单侧边栏项**:内部用 `h3` 子标题分组(已有 `groupTitleStyle` 样式可用),避免侧边栏过长
3. **下载并入设计系统**:因为下载内容即设计系统相关文件,不再单独占侧边栏项;但 UI 上仍是独立 `<h2>` 区块
4. **保留 sections/ 目录拆分**:已经 `lazy()` 加载的 sections 不动,CategorySection 包裹关系不变
5. **英文翻译统一为 `&`**:替代现状的 `and`,符合现有 `Menus & Selection` 风格
6. **不修改 CSS 变量、tokens、组件源码**:本计划只动 App.tsx(展示层)+ 文档
7. **`visual-display` 整段删除**:DotMatrix/DotMatrixIcon/Quotes 并入 data-display;该分类仅 3 个组件,信息密度低

---

## 优先级

- **P0**:步骤 1.1(categories 数组)+ 步骤 1.2(重组 CategorySection) — ✅ 已完成
- **P1**:步骤 2(COMPONENTS.md 同步) — ✅ 已完成
- **P2**:步骤 3(design.md 引用更新) — ✅ 验证无需更新
- **验证**:步骤 4 待执行
