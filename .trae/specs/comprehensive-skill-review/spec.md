# Nothing Design Skill 全面审查与修复 Spec

## Why
Nothing Design Skill（SKILL.md v4.0.0）与实际 React 组件实现之间存在严重不一致：Vanilla JS 版本完全不存在但 SKILL.md 声称支持；38 个已实现组件未在文档中列出；component-matching.md 引用了 3 个不存在的 CSS 文件；sub/ 组件完全不符合设计系统规范；多处硬编码值绕过 token 系统。需要系统性修复，使技能文档与实现保持一致。

## What Changes
- 移除 SKILL.md 中虚构的 Vanilla JavaScript 支持（代码示例、路径引用、框架选择说明）
- 补齐 SKILL.md Available Components 列表中遗漏的 38 个组件
- 统一 SKILL.md 与实际组件的命名（Toggles→Toggle, Cards→Card, Dropdown→DropdownMenu, BottomSheet→Sheet）
- 修复 component-matching.md 中 3 个不存在的 CSS 文件引用（cards.css→card.css, widget-card.css→card.css, widget-icon.css→svg-icon.css）
- 补充 platform-mapping.md 中缺失的 React/Tailwind 部分
- 为 Spinner.tsx 和 SvgIcon.tsx 的 CSS 类名添加 `nothing-` BEM 前缀
- 清理 sub/index.ts 中不应作为公共 API 导出的内部子组件
- 修复 WidgetPills.tsx 中的非语义导出名（Dim1, Share1/2/3, Remote1, DarkMode2）
- 在 tokens.css 中补充缺失的 token 定义（`--widget-grey`, `--widget-dot-active`, `--widget-bg-height`, `--space-lg-plus`, `--fill-0`）
- 为 Widget token 添加亮色主题覆盖
- 移除 card.css 中违反 "No shadows" 规则的 box-shadow
- 将 switch.css 中硬编码尺寸提取为 token
- **BREAKING**: sub/index.ts 公共 API 缩减（内部子组件不再导出）
- **BREAKING**: WidgetPills.tsx 部分导出名重命名（Dim1→MobileData 等）

## Impact
- Affected specs: SKILL.md, references/tokens.md, references/components.md, references/platform-mapping.md, references/component-matching.md
- Affected code: tokens.css, card.css, switch.css, spinner.css, svg-icon.css, Spinner.tsx, SvgIcon.tsx, WidgetPills.tsx, sub/index.ts, App.tsx

## ADDED Requirements

### Requirement: SKILL.md 文档与实现一致性
系统 SHALL 确保 SKILL.md 中描述的所有功能、路径和代码示例与实际实现完全一致：
- 移除不存在的 Vanilla JavaScript 版本的所有描述和代码示例
- React Quick Start 示例 SHALL 反映实际项目结构和导入方式
- Available Components 列表 SHALL 包含所有已实现的组件

#### Scenario: 用户按 SKILL.md 指引操作
- **WHEN** 用户按照 SKILL.md 的 Quick Start 示例创建项目
- **THEN** 所有路径、导入语句和 API 调用都能正常工作

#### Scenario: 组件清单完整性
- **WHEN** 用户查看 SKILL.md 的 Available Components 列表
- **THEN** 列表包含所有已实现的 React 组件，命名与实际文件一致

### Requirement: component-matching.md CSS 文件引用准确
系统 SHALL 确保 component-matching.md 中列出的所有 CSS 文件路径与实际文件一一对应：
- `cards.css` → 修正为 `card.css`
- `widget-card.css` → 修正为 `card.css`（WidgetCard 样式包含在 Card 中）
- `widget-icon.css` → 修正为 `svg-icon.css`

#### Scenario: 迁移时查找 CSS 文件
- **WHEN** 用户按 component-matching.md 的映射表查找组件 CSS 文件
- **THEN** 所有列出的 CSS 文件都实际存在

### Requirement: BEM 命名规范一致性
所有组件的 CSS 类名 SHALL 遵循 `nothing-{block}` BEM 命名规范：
- Spinner.tsx: `spinner-*` → `nothing-spinner-*`
- SvgIcon.tsx: `svg-icon-*` → `nothing-svg-icon-*`
- WidgetPills.tsx 内部 PillIcon: `widget-icon-svg` → `nothing-widget-icon-svg`

#### Scenario: 新组件遵循命名规范
- **WHEN** 开发者查看任意组件的 CSS 类名
- **THEN** 所有类名都以 `nothing-` 前缀开头，遵循 BEM 规范

### Requirement: Token 系统完整性
tokens.css SHALL 定义所有被组件使用的 token，不允许使用未定义的 token：
- 补充 `--widget-grey`
- 补充 `--widget-dot-active`
- 补充 `--widget-bg-height`
- 补充 `--space-lg-plus`
- 补充 `--fill-0`
- Widget token（`--widget-bg`, `--widget-dark-bg` 等） SHALL 在 `[data-theme="light"]` 中有对应的覆盖值

#### Scenario: 亮色模式下 Widget 自动适配
- **WHEN** 页面切换到 `data-theme="light"`
- **THEN** Widget 组件的背景、文字颜色自动适配亮色主题

### Requirement: 公共 API 整洁性
sub/index.ts SHALL 仅导出语义化的公共组件，不导出内部实现细节：
- 移除 `Icons`, `LoadingBar`, `Info3`, `Bullet`, `Graphic`, `Info4`, `StepsCount`, `Streak`, `Arrow`, `Icon32`, `LimitCount`, `LoadingBar2`, `Card1`, `Dots4-7`, `Image`, `Date1`, `Group1`, `Icon33`, `Group30`, `Device1`, `Markers`, `Dates` 等内部子组件的导出
- 保留语义化的公共组件导出（Active, Campus, Compass, Weather1/2, MusicPlayer 等）

#### Scenario: 用户导入 Widget 子组件
- **WHEN** 用户从 `widgets/sub` 导入组件
- **THEN** 只能看到语义化的公共组件，不会看到内部实现细节

### Requirement: WidgetPills 语义化导出名
WidgetPills.tsx 的导出名 SHALL 使用语义化名称而非数字后缀：
- `Dim` → `MobileData`
- `Dim1` → `BatteryShare`
- `Dim2` → `ExtraDim`
- `DarkMode2` → `DarkModePill`
- `Share1` → `Storage`
- `Share2` → `NearbyShare`
- `Share3` → `Bluetooth`
- `Remote1` → `TvRemote`

#### Scenario: 开发者使用 WidgetPills 导出
- **WHEN** 开发者导入 WidgetPills 组件
- **THEN** 导入名称清晰表达组件功能，无需查看源码

### Requirement: 设计规范合规性
组件实现 SHALL 遵守 SKILL.md 中定义的设计规范：
- card.css 中移除 `box-shadow`（违反 "No shadows" 规则）
- switch.css 中硬编码尺寸提取为 token 引用

#### Scenario: 卡片组件无阴影
- **WHEN** 渲染 Card 组件的任何变体
- **THEN** 不使用 box-shadow，通过背景对比和边框实现层次感

### Requirement: platform-mapping.md 补充 React/Tailwind 部分
platform-mapping.md SHALL 包含 SKILL.md Section 5 中引用的 React/Tailwind 输出约定。

#### Scenario: 用户查找 React/Tailwind 映射
- **WHEN** 用户在 platform-mapping.md 中查找 React/Tailwind 的输出约定
- **THEN** 能找到完整的映射指南

## MODIFIED Requirements

### Requirement: SKILL.md Web UI Kit Workflow
Web UI Kit Workflow 仅描述 React 版本，移除 Vanilla JavaScript 选项：
- 框架选择步骤简化为直接使用 React
- Quick Start 示例仅包含 React 代码
- 组件列表更新为包含所有已实现组件，命名与实际文件一致

### Requirement: SKILL.md Widget Subsystem 组件列表
Widget Subsystem 组件列表扩展为包含：QuickToggle, WidgetCard, WeatherWidget, StepsWidget, ActivityWidget, CompassWidget, TimeWidget, SvgIcon, Glyph, WidgetPill, WidgetGrid

## REMOVED Requirements

### Requirement: Vanilla JavaScript Web UI Kit 支持
**Reason**: Vanilla JavaScript 版本的 Web UI Kit 完全不存在，SKILL.md 中的描述和代码示例是虚构的
**Migration**: 用户应使用 React 版本的 Web UI Kit；如需 Vanilla JS 支持，需另行实现
