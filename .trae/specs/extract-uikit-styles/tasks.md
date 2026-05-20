# 提取 nothing-UI kit 组件到 Web UI Kit 项目 - The Implementation Plan

## [x] Task 1: 新增 Date 组件（Vanilla JS + React）
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `date.css`、`date.js`、`Date.tsx` 文件
  - 实现 2 种变体：
    - `rect`：矩形卡片（185x95, 圆角50），左侧日进度圆环，右侧日期+月份+星期
    - `dual-ring`：圆形双圈（外圈r=95, 内圈r=85），中央大号日期，底部星期
  - 参考 nothing-UI kit Date 2/Date 3 的视觉设计
  - 支持深色/浅色模式
  - 使用 `--widget-*` token
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-1.1: Date 组件的矩形卡片变体视觉与 nothing-UI kit Date 2 一致
  - `human-judgement` TR-1.2: Date 组件的圆形双圈变体视觉与 nothing-UI kit Date 3 一致
  - `programmatic` TR-1.3: date.css 中不存在硬编码颜色值
  - `programmatic` TR-1.4: vanilla date.css 与 React date.css 内容完全一致
- **Notes**: 日进度圆环需要 SVG 实现，显示当天已过去的时间比例

## [x] Task 2: 新增 NextEvent 组件（Vanilla JS + React）
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 创建 `next-event.css`、`next-event.js`、`NextEvent.tsx` 文件
  - 实现矩形卡片变体（185x95, 圆角50），显示"Next Event:"标签、事件标题、日期和月份
  - 参考 nothing-UI kit Next Event 2 的视觉设计
  - 支持深色/浅色模式
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgement` TR-2.1: NextEvent 组件视觉与 nothing-UI kit Next Event 2 一致
  - `programmatic` TR-2.2: next-event.css 中不存在硬编码颜色值
  - `programmatic` TR-2.3: vanilla next-event.css 与 React next-event.css 内容完全一致
- **Notes**: 事件数据通过 props 传入，不实现 Google Calendar 集成

## [x] Task 3: 新增 Quotes 组件（Vanilla JS + React）
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 创建 `quotes.css`、`quotes.js`、`Quotes.tsx` 文件
  - 实现圆形双圈变体（外圈r=95, 内圈r=85），中央名言文字，底部作者（红色大写）
  - 参考 nothing-UI kit Quotes 的视觉设计
  - 支持深色/浅色模式
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-3.1: Quotes 组件视觉与 nothing-UI kit Quotes 一致
  - `programmatic` TR-3.2: quotes.css 中不存在硬编码颜色值
  - `programmatic` TR-3.3: vanilla quotes.css 与 React quotes.css 内容完全一致
- **Notes**: 名言数据通过 props 传入，支持自动轮播

## [x] Task 4: 新增 Taskbar 组件（Vanilla JS + React）
- **Priority**: P2
- **Depends On**: None
- **Description**:
  - 创建 `taskbar.css`、`taskbar.js`、`Taskbar.tsx` 文件
  - 实现水平任务栏，包含：搜索栏、应用快捷方式图标、时间显示
  - 参考 nothing-UI kit Taskbar 的视觉设计
  - 支持深色/浅色模式
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-4.1: Taskbar 组件视觉与 nothing-UI kit Taskbar 一致
  - `programmatic` TR-4.2: taskbar.css 中不存在硬编码颜色值
  - `programmatic` TR-4.3: vanilla taskbar.css 与 React taskbar.css 内容完全一致
- **Notes**: 仅作为展示组件，应用列表通过 props 传入

## [x] Task 5: Clock 组件新增圆形双圈变体
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 `clock.css`、`clock.js`、`Clock.tsx`
  - 新增 `type="dual-ring"` 变体：圆形双圈布局，外圈+内圈，上方小时、下方分钟（红色）
  - 参考 nothing-UI kit Clock 3 的视觉设计
  - 使用 SVG 实现圆形双圈
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-5.1: Clock dual-ring 变体视觉与 nothing-UI kit Clock 3 一致
  - `programmatic` TR-5.2: clock.css 中新增样式不存在硬编码颜色值
  - `programmatic` TR-5.3: vanilla clock.css 与 React clock.css 内容完全一致
- **Notes**: 外圈使用 `--widget-white`（浅色）/ `--widget-dark-2`（深色），内圈使用 `--widget-card-bg` / `--widget-dark-bg`

## [x] Task 6: Clock 组件新增叠加字体变体
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 修改 `clock.css`、`clock.js`、`Clock.tsx`
  - 新增 `type="overlay"` 变体：双层字体叠加，红色底层+深色/白色顶层
  - 参考 nothing-UI kit Clock 4 的视觉设计
  - 使用 CSS position + opacity 实现叠加效果
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `human-judgement` TR-6.1: Clock overlay 变体视觉与 nothing-UI kit Clock 4 一致
  - `programmatic` TR-6.2: clock.css 中新增样式不存在硬编码颜色值
  - `programmatic` TR-6.3: vanilla clock.css 与 React clock.css 内容完全一致
- **Notes**: 需要使用 `--font-ndot` 字体，底层红色使用 `--widget-primary`，顶层使用 `--widget-dark-2`（浅色）/ `--widget-white`（深色）

## [x] Task 7: Battery 组件新增环形进度变体
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 修改 `battery.css`、`battery.js`、`Battery.tsx`
  - 新增 `variant="ring"` 变体：圆形双圈+外圈环形进度条，中央电池图标，底部百分比
  - 参考 nothing-UI kit Battery 2 的视觉设计
  - 使用 SVG 实现环形进度条
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `human-judgement` TR-7.1: Battery ring 变体视觉与 nothing-UI kit Battery 2 一致
  - `programmatic` TR-7.2: battery.css 中新增样式不存在硬编码颜色值
  - `programmatic` TR-7.3: vanilla battery.css 与 React battery.css 内容完全一致
- **Notes**: 环形进度条使用 `--widget-primary` 颜色，低电量（<=30%）可考虑不同图标

## [ ] Task 8: 深色/浅色模式验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  - 验证所有新组件和变体在深色/浅色模式下的正确显示
  - 确认颜色切换与 nothing-UI kit 的浅色/深色版本一致
  - 修复任何模式切换问题
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `human-judgement` TR-8.1: 所有新组件在深色模式下视觉与 nothing-UI kit 深色版本一致
  - `human-judgement` TR-8.2: 所有新组件在浅色模式下视觉与 nothing-UI kit 浅色版本一致
  - `programmatic` TR-8.3: 所有新组件 CSS 正确使用 `[data-theme="light"]` / `[data-theme="dark"]` 或 widget theme 类
- **Notes**: Widget 组件使用 `--light`/`--dark`/`--accent` 主题类而非 data-theme

## [x] Task 9: Token 使用规范验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  - 扫描所有新组件 CSS 文件，确认无硬编码颜色值
  - 确认所有颜色、字号、间距、圆角都通过 token 引用
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `programmatic` TR-9.1: 新组件 CSS 中不存在 `:root`/`[data-theme]` 块之外的 `#xxxxxx`、`rgb()`、`rgba()` 值
  - `programmatic` TR-9.2: 新组件 CSS 中不存在 `!important` 声明
- **Notes**: Widget 组件的 theme 类（如 `--light`/`--dark`）中允许定义颜色值

## [x] Task 10: Vanilla/React 双版本同步验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  - 对比所有新组件的 vanilla CSS 和 React CSS
  - 确保内容完全一致
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `programmatic` TR-10.1: 所有新组件的同名 CSS 文件 vanilla 版本与 React 版本内容完全一致
  - `programmatic` TR-10.2: 不存在一方有而另一方缺失的 CSS 文件
- **Notes**: 这是最终验证步骤

## [x] Task 11: 更新 README.md 文档
- **Priority**: P1
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  - 在 `web-ui-kit/README.md` 中添加所有新组件的文档
  - 包括：组件描述、Vanilla JS 用法、React 用法、API 表格
  - 更新组件总数和可用组件列表
- **Acceptance Criteria Addressed**: AC-11
- **Test Requirements**:
  - `human-judgement` TR-11.1: README.md 包含所有新组件的完整文档
  - `human-judgement` TR-11.2: API 表格完整且准确
