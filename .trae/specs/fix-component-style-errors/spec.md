# 组件样式错误修复 Spec

## Why
上一轮审查修复了 Widget 子系统的主要硬编码问题，但补充组件（Caffeinate、Clipboard、Pomodoro、WalkieTalkie、SunDial、AgeMotion、Chrono、Spinner）和部分核心组件（Buttons、Tags、Cards、Inputs、SegmentedControl、Navigation）仍存在大量硬编码值、不一致的 font-family 声明、缺失的 prefers-reduced-motion 支持等问题，导致设计系统 token 覆盖率不完整。

## What Changes
- 修复所有残留的硬编码颜色值（#FFFFFF、rgba()）→ 替换为设计 token
- 修复所有残留的硬编码 font-size → 替换为设计 token（新增 `--body-xs: 13px`）
- 修复所有残留的硬编码 border-radius → 替换为设计 token（新增 `--radius-2xs: 2px`、`--radius-xs: 6px`）
- 修复所有残留的硬编码 padding/margin（匹配已有 token 的值）→ 替换为设计 token
- 统一 font-family fallback 链：`'Space Mono', 'JetBrains Mono', monospace` 和 `'Space Grotesk', 'DM Sans', system-ui, sans-serif`
- 为所有动画添加 `prefers-reduced-motion` 回退
- 修复残留 `!important` 声明（通过提高选择器特异性替代）
- 修复硬编码 transition duration → 替换为 `var(--duration-micro)` / `var(--easing)`
- 同步 vanilla CSS 与 React CSS

## Impact
- Affected specs: nothing-ui-kit-web 组件库样式系统
- Affected code: `web-ui-kit/react/src/styles/` 全部 CSS 文件、`web-ui-kit/css/` 全部 CSS 文件、`tokens.css`

## ADDED Requirements

### Requirement: 零硬编码颜色值
所有组件 CSS 中 SHALL NOT 包含 `:root` / `[data-theme]` 定义之外的硬编码颜色值（#hex、rgb()、rgba()）。

#### Scenario: 颜色值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件（不含 tokens.css）
- **THEN** 不存在 `:root` / `[data-theme]` 块之外的 `#xxxxxx`、`rgb()`、`rgba()` 值

### Requirement: 零硬编码字号值
所有组件 CSS 中的 font-size SHALL 使用 `var(--*)` token 引用。新增 token `--body-xs: 13px` 填补 11px-14px 之间的空白。

#### Scenario: 字号值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 所有 `font-size` 属性使用 `var(--*)` 引用，不存在裸 `px` 值

### Requirement: 零硬编码圆角值
所有组件 CSS 中的 border-radius SHALL 使用 `var(--radius-*)` token 引用。新增 `--radius-2xs: 2px`、`--radius-xs: 6px`。

#### Scenario: 圆角值全部通过 token 引用
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 所有 `border-radius` 属性使用 `var(--radius-*)` 引用，不存在裸 `px` 值（1px 装饰性 hairline 除外）

### Requirement: 统一 font-family fallback 链
所有 monospace 声明 SHALL 使用 `'Space Mono', 'JetBrains Mono', monospace`；所有 sans-serif 声明 SHALL 使用 `'Space Grotesk', 'DM Sans', system-ui, sans-serif`；所有 Doto 声明 SHALL 使用 `'Doto', 'Space Mono', 'JetBrains Mono', monospace`。

#### Scenario: font-family 一致性
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 不存在缺少 `'JetBrains Mono'` 的 monospace 声明，不存在缺少 `'DM Sans', system-ui` 的 sans-serif 声明

### Requirement: 完整的 prefers-reduced-motion 支持
所有使用 CSS animation 的组件 SHALL 提供 `@media (prefers-reduced-motion: reduce)` 回退，将动画设为 `none` 或静态终态。

#### Scenario: 动画可访问性
- **WHEN** 用户系统开启减少动效设置
- **THEN** 所有 CSS 动画停止，组件显示静态终态

### Requirement: 零 !important 声明
组件 CSS 中 SHALL NOT 使用 `!important`。通过提高选择器特异性解决样式覆盖问题。

#### Scenario: 无 !important
- **WHEN** 扫描所有组件 CSS 文件
- **THEN** 不存在 `!important` 声明

### Requirement: Vanilla CSS 与 React CSS 同步
`web-ui-kit/css/` 目录下的所有 CSS 文件 SHALL 与 `web-ui-kit/react/src/styles/` 下的对应文件内容完全一致。

#### Scenario: 双版本同步
- **WHEN** 对比 vanilla 和 React 版本的同名 CSS 文件
- **THEN** 文件内容完全一致
