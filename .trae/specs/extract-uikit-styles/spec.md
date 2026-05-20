# 提取 nothing-UI kit 组件到 Web UI Kit 项目 - Product Requirement Document

## Overview
- **Summary**: 将 `nothing-UI kit/` 中 Rainmeter .ini 文件定义的桌面组件提取并转换为 `web-ui-kit/` 中的 Web 组件（CSS + JS + React），补齐 web-ui-kit 中缺失的组件类型，并确保已有组件的视觉风格与原始 Rainmeter 设计一致。
- **Purpose**: 当前 web-ui-kit 已有约 40 个组件，但与 nothing-UI kit 中的 Rainmeter 组件相比，缺少 Weather（天气）、Quotes（名言）、Taskbar（任务栏）等组件，且已有组件（Clock、Battery、Calendar、Music、RAM/Storage、Photos）的视觉变体数量不足。本项目将补齐这些缺失组件和变体。
- **Target Users**: 使用 Nothing 设计系统进行 Web 开发的前端开发者

## Goals
- 提取 nothing-UI kit 中所有 .ini 文件定义的组件，识别 web-ui-kit 中缺失的组件和变体
- 将缺失的组件转换为 Web 组件（Vanilla JS + React 双版本）
- 补齐已有组件的缺失变体（如 Clock 的圆形双圈变体、Battery 的环形进度变体等）
- 确保新组件的视觉风格与原始 Rainmeter 设计一致
- 确保新组件遵循现有的 tokens.css 设计系统

## Non-Goals (Out of Scope)
- 不修改 references/ 中的设计规范
- 不修改现有组件的 JS/TS 逻辑（除非需要新增变体支持）
- 不实现 Rainmeter 特有的系统级功能（如真实的电池读取、Google Calendar 集成等），仅提供 UI 组件和模拟数据接口
- 不处理 Settings 页面组件（这些是 Rainmeter 皮肤配置界面，不适用于 Web）
- 不处理构建工具、打包配置等工程化问题

## Background & Context

### nothing-UI kit 组件清单 vs web-ui-kit 覆盖情况

| # | Rainmeter 组件 | 变体数 | web-ui-kit 覆盖 | 需要操作 |
|---|---------------|--------|-----------------|---------|
| 1 | **Clock** (时钟) | 4 变体 | ✅ 有 Clock 组件，但仅 digital/gauge | 补充圆形双圈+叠加字体变体 |
| 2 | **Date** (日期) | 2 变体 | ⚠️ 无独立 Date 组件 | 新增 Date 组件 |
| 3 | **Weather** (天气) | 2 变体 | ✅ 有 WeatherWidget | 对齐视觉变体 |
| 4 | **Battery** (电池) | 2 变体 | ✅ 有 Battery 组件 | 补充环形进度变体 |
| 5 | **Music** (音乐) | 2 变体 | ✅ 有 MusicPlayer | 对齐视觉变体 |
| 6 | **Photos** (照片) | 4 变体 | ✅ 有 PhotoCarousel | 对齐视觉变体 |
| 7 | **RAM** (内存) | 2 变体 | ✅ 有 SystemMonitor | 对齐视觉变体 |
| 8 | **Storage** (存储) | 2 变体 | ✅ 有 SystemMonitor | 对齐视觉变体 |
| 9 | **Calendar** (日历) | 1 变体 | ✅ 有 Calendar | 对齐视觉 |
| 10 | **Next Event** (日历事件) | 1 变体 | ❌ 无 | 新增 NextEvent 组件 |
| 11 | **Quotes** (名言) | 1 变体 | ❌ 无 | 新增 Quotes 组件 |
| 12 | **Taskbar** (任务栏) | 1 变体 | ❌ 无 | 新增 Taskbar 组件 |

### Rainmeter 设计参数体系

| 参数 | 浅色值 | 深色值 | 对应 token |
|------|--------|--------|-----------|
| 主背景 | `#F1F0F6` | `#1B1C1D` | `--widget-card-bg` / `--widget-dark-bg` |
| 次背景 | `#D4D3D8` | `#303038` | `--widget-dark-3` / `--widget-dark-2` |
| 强调色 | `#E2201F` | `#E2201F` | `--widget-primary` |
| 主文字 | `#1B1C1D` | `#F1F0F6` | `--widget-dark-2` / `--widget-white` |
| 白色背景 | `#FFFFFF` | `#303038` | `--widget-white` / `--widget-dark-2` |

### 组件形态分类

| 形态 | 尺寸 | 圆角 | 示例组件 |
|------|------|------|---------|
| 小矩形卡片 | 185x95 | 50 | Clock 2, Date 2, Music 3, Weather 1, Next Event 2 |
| 大方形卡片 | 185x185 | 25 | Calendar, Music 1, Photos 1, RAM 4, Weather 2 |
| 圆形双圈 | r=95/85 | 25 | Clock 3, Date 3, Battery 2, Storage 2, Quotes |
| 方形组件 | 175x175 | 25 | Battery 1, Storage 1 |
| 宽幅组件 | 350x175 | 25 | Photos 4, RAM 4 |
| 叠加字体 | 无背景 | - | Clock 4 |

## Functional Requirements

### 新增组件
- **FR-1**: 新增 Date 组件（2 变体：矩形卡片+圆形双圈），显示日期、月份、星期和日进度圆环
- **FR-2**: 新增 NextEvent 组件，显示下一个日历事件的标题、日期和月份
- **FR-3**: 新增 Quotes 组件（圆形双圈），显示随机名言和作者
- **FR-4**: 新增 Taskbar 组件，显示应用快捷方式、搜索、时间等信息

### 补充变体
- **FR-5**: Clock 组件新增圆形双圈变体（Clock 3 风格：外圈+内圈，上方小时/下方分钟，分钟红色）
- **FR-6**: Clock 组件新增叠加字体变体（Clock 4 风格：双层字体叠加，红色底层+深色/白色顶层）
- **FR-7**: Battery 组件新增环形进度变体（Battery 2 风格：圆形双圈+外圈环形进度条）

### 视觉对齐
- **FR-8**: 所有新组件和变体的视觉风格必须与 nothing-UI kit 原始设计一致
- **FR-9**: 所有新组件必须支持深色/浅色模式切换
- **FR-10**: 所有新组件必须使用 tokens.css 中的设计 token

### 通用要求
- **FR-11**: 每个新组件提供 Vanilla JS 和 React 双版本
- **FR-12**: Vanilla CSS 与 React CSS 完全同步
- **FR-13**: 更新 README.md 文档

## Non-Functional Requirements
- **NFR-1**: 新组件 CSS 不使用硬编码值，全部通过 token 引用
- **NFR-2**: 新组件 CSS 不使用 `!important`
- **NFR-3**: 新组件支持 `prefers-reduced-motion`
- **NFR-4**: 新组件遵循现有的 BEM 命名规范（`.nothing-{component}__{element}--{modifier}`）

## Constraints
- **Technical**: 使用 HTML/CSS/JS + React，遵循现有 web-ui-kit 架构
- **Business**: 视觉风格以 nothing-UI kit 原始设计为准，token 映射以 tokens.css 为准
- **Dependencies**: 依赖 tokens.css 中已有的 `--widget-*` 系列 token

## Assumptions
- `--widget-*` 系列 token 已足够覆盖 Rainmeter 组件的视觉需求
- Rainmeter 中的字体（Nothing Font 5x7、Flight、JND_Nothing4 等）在 Web 端映射为 `--font-ndot`、`--font-display`、`--font-mono` 等
- Rainmeter 的系统级功能（电池读取、日历集成等）在 Web 端使用 props 传入模拟数据
- Settings 页面不需要转换为 Web 组件

## Acceptance Criteria

### AC-1: Date 组件实现
- **Given**: Date 组件已创建
- **When**: 用户在页面中使用 Date 组件
- **Then**: 显示日期、月份、星期，支持矩形卡片和圆形双圈两种变体，视觉风格与 nothing-UI kit Date 2/Date 3 一致
- **Verification**: `human-judgment`

### AC-2: NextEvent 组件实现
- **Given**: NextEvent 组件已创建
- **When**: 用户传入事件数据
- **Then**: 显示下一个事件的标题、日期、月份，视觉风格与 nothing-UI kit Next Event 2 一致
- **Verification**: `human-judgment`

### AC-3: Quotes 组件实现
- **Given**: Quotes 组件已创建
- **When**: 用户传入名言数据
- **Then**: 显示名言文字和作者，圆形双圈布局，视觉风格与 nothing-UI kit Quotes 一致
- **Verification**: `human-judgment`

### AC-4: Taskbar 组件实现
- **Given**: Taskbar 组件已创建
- **When**: 用户配置应用列表
- **Then**: 显示应用快捷方式、搜索栏、时间等信息，视觉风格与 nothing-UI kit Taskbar 一致
- **Verification**: `human-judgment`

### AC-5: Clock 圆形双圈变体
- **Given**: Clock 组件已更新
- **When**: 用户使用 `type="dual-ring"` 变体
- **Then**: 显示圆形双圈布局，上方小时、下方分钟（红色），视觉风格与 nothing-UI kit Clock 3 一致
- **Verification**: `human-judgment`

### AC-6: Clock 叠加字体变体
- **Given**: Clock 组件已更新
- **When**: 用户使用 `type="overlay"` 变体
- **Then**: 显示双层字体叠加效果，红色底层+深色/白色顶层，视觉风格与 nothing-UI kit Clock 4 一致
- **Verification**: `human-judgment`

### AC-7: Battery 环形进度变体
- **Given**: Battery 组件已更新
- **When**: 用户使用 `variant="ring"` 变体
- **Then**: 显示圆形双圈+外圈环形进度条，视觉风格与 nothing-UI kit Battery 2 一致
- **Verification**: `human-judgment`

### AC-8: 深色/浅色模式支持
- **Given**: 新组件已创建
- **When**: 切换 `data-theme` 属性
- **Then**: 所有新组件正确切换颜色方案，浅色/深色视觉与 nothing-UI kit 对应版本一致
- **Verification**: `human-judgment`

### AC-9: Token 使用规范
- **Given**: 新组件 CSS 已编写
- **When**: 扫描所有新组件 CSS 文件
- **Then**: 不存在 `:root`/`[data-theme]` 块之外的硬编码颜色值
- **Verification**: `programmatic`

### AC-10: Vanilla/React 双版本同步
- **Given**: 新组件的 Vanilla JS 和 React 版本已创建
- **When**: 对比同名 CSS 文件
- **Then**: 内容完全一致
- **Verification**: `programmatic`

### AC-11: README 文档更新
- **Given**: 新组件已创建
- **When**: 开发者查看 README.md
- **Then**: 可以找到所有新组件的使用说明和 API 文档
- **Verification**: `human-judgment`

## Open Questions
- [ ] nothing-UI kit 中的强调色 `#E2201F` 与 tokens.css 中的 `--widget-primary: #d71921` 存在差异，新组件应使用哪个？（当前假设：使用 `--widget-primary: #d71921`，与现有 token 保持一致）
- [ ] nothing-UI kit 中的背景色 `#F1F0F6` 与 `--widget-card-bg: #fcfafe` 存在差异，是否需要新增 token？（当前假设：不需要，使用现有 `--widget-card-bg`）
- [ ] Taskbar 组件是否需要实现完整功能（搜索、应用启动等）还是仅作为展示组件？（当前假设：仅作为展示组件，应用列表通过 props 传入）
