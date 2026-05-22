# 合并重复组件 Spec

## Why
项目中存在功能重叠的组件（`WidgetIcon` vs `SvgIcon`、`Cards` vs `WidgetCard`）以及 deprecated 别名仍在使用，导致维护成本增加和 API 混乱。需要合并真正重复的组件，清理 deprecated 别名。

## What Changes
- 合并 `WidgetIcon.tsx` 到 `SvgIcon.tsx`，统一图标容器组件
- 合并 `Cards.tsx` 和 `WidgetCard.tsx`，统一卡片组件
- 清理 `WidgetIcons.tsx` 中的 8 个 deprecated 别名，App.tsx 改用新名称
- 删除被合并的组件文件及其 CSS
- 更新所有引用

## Impact
- Affected code: `App.tsx`, `WidgetIcons.tsx`, `WidgetPills.tsx`, 所有使用 `WidgetIcon`/`Cards`/`WidgetCard` 的组件
- **BREAKING**: `WidgetIcon` 组件将被移除，改用 `SvgIcon`；`Cards` 和 `WidgetCard` 将合并为统一的 `Card` 组件

## ADDED Requirements

### Requirement: 统一图标容器组件
系统 SHALL 提供唯一的图标容器组件 `SvgIcon`，支持以下功能：
- `theme`: 'light' | 'dark' | 'accent' | 'error'
- `size`: 'sm' | 'md' | 'lg'
- `icon` / `children`: 图标内容
- `label`: 可选的文字标签（原 `WidgetIcon` 的 label 功能）
- `aria-label`: 无障碍标签
- `bgFill` / `iconFill` / `iconPath`: 原有 SvgIcon 的底层 SVG 控制

#### Scenario: WidgetIcon 功能迁移
- **WHEN** 组件需要带标签的图标容器
- **THEN** 使用 `SvgIcon` 的 `label` prop，渲染圆形背景 + 图标 + 标签文字

#### Scenario: 向后兼容
- **WHEN** 原有代码使用 `WidgetIcon` 的 `icon`/`children`/`label` props
- **THEN** `SvgIcon` 支持相同的 props，行为一致

### Requirement: 统一卡片组件
系统 SHALL 提供统一的 `Card` 组件，合并原 `Cards.tsx` 和 `WidgetCard.tsx` 的功能：
- 通用卡片模式（原 `Cards`）：`variant: default|raised|compact|technical`，`interactive`，`disabled`，`title`，`action`，`footer`
- Widget 卡片模式（原 `WidgetCard`）：`size: square|wide|tall|auto`，`shape: rounded|pill|circle`，`theme: light|dark|accent`，`icon`，`iconPosition`，`value`，`subtitle`
- 通过 `mode: 'content' | 'widget'` 区分两种模式，默认 `content`

#### Scenario: 内容卡片
- **WHEN** 使用 `<Card mode="content" variant="raised" title="Title">content</Card>`
- **THEN** 渲染与原 `Cards` raised 变体相同的结果

#### Scenario: Widget 卡片
- **WHEN** 使用 `<Card mode="widget" size="square" theme="dark" value="30°" />`
- **THEN** 渲染与原 `WidgetCard` 相同的结果

### Requirement: 清理 deprecated 别名
系统 SHALL 移除 `WidgetIcons.tsx` 中的 8 个 deprecated 别名导出，App.tsx 改用推荐名称：

| 旧名称 (deprecated) | 新名称 |
|---------------------|--------|
| `Home1` | `HomeLight` |
| `DarkMode1` | `DarkModeLight` |
| `DoNotDisturb1` | `DoNotDisturbLight` |
| `QrCode1` | `QrCodeLight` |
| `Subtitle1` | `SubtitleLight` |
| `Record1` | `RecordAlt` |
| `Cast1` | `CastAlt` |
| `ArrowDown` | `ArrowDownAlt` |

#### Scenario: App.tsx 使用新名称
- **WHEN** App.tsx 导入图标组件
- **THEN** 使用推荐名称而非 deprecated 别名

## MODIFIED Requirements

### Requirement: SvgIcon 组件扩展
原 `SvgIcon` 组件增加 `label` prop 支持，当提供 `label` 时，在图标下方渲染标签文字（复用原 `WidgetIcon` 的 `nothing-widget-icon__label` 样式）。

## REMOVED Requirements

### Requirement: WidgetIcon 独立组件
**Reason**: 功能已合并到 `SvgIcon`
**Migration**: 将 `import WidgetIcon` 改为 `import SvgIcon`，props 映射：`icon`/`children` → `children`，`label` → `label`，其余不变

### Requirement: Cards 和 WidgetCard 独立组件
**Reason**: 功能已合并到统一的 `Card` 组件
**Migration**: `import Card from './Cards'` → `import { Card } from './Card'`，`import WidgetCard` → `import { WidgetCard } from './Card'`（向后兼容导出）
