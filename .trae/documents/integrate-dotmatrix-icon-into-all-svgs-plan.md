# 将点阵图标集成到项目内适用的全部 SVG 图标

## 摘要

将已实现的 `DotMatrixIcon` 组件集成到项目内所有适用的 SVG 图标集，采用**非破坏性 opt-in 变体**方式：新增 `variant?: 'solid' | 'dot'` 属性，默认 `'solid'` 保持现有行为不变。涵盖 WidgetIcons（40 个）、QuickToggle 内联 SVG（8 个）、天气 SVG 文件（7 个）、组件内联 SVG（Battery/Taskbar）。

## 当前状态分析

### 已完成的基础组件
- [DotMatrixIcon.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/DotMatrixIcon.tsx) — 完整实现，支持 SVG 光栅化、alpha 阈值、随机脉冲动画
- [dot-matrix-icon.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/dot-matrix-icon.css) — 样式已就绪
- App.tsx 已有 4 个 DotMatrixIcon demo（心形、星形、时钟）

### 待集成的图标集清单
| 图标集 | 数量 | 来源文件 | SVG 形态 |
|--------|------|----------|----------|
| WidgetIcons | 40 个 | [WidgetIcons.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/WidgetIcons.tsx) | path `d` 字符串来自 [widget-svg-paths.ts](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/widget-svg-paths.ts)，viewBox 混合（0-24 / 24-44 / 0-68） |
| QuickToggle | 8 个 | [App.tsx#L1144-L1151](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx#L1144-L1151) | 内联 `<svg viewBox="0 0 24 24">`，stroke 风格 |
| 天气图标 | 7 个 | [assets/weather/*.svg](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/assets/weather) | 独立 SVG 文件，viewBox `0 0 389 389`，fill="white" |
| 组件内联 | ~6 个 | [Battery.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Battery.tsx)、[Taskbar.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Taskbar.tsx) | `<svg viewBox="0 0 24 24">`，stroke="currentColor" |

### 关键约束
- **Glyph.tsx 不动** — 44 个手动 7×7 点阵字形已是点阵风格
- **非破坏性** — 现有调用点零改动，仅新增 `variant="dot"` 时切换渲染
- **坐标系统一** — WidgetIcons 的 path 坐标混合（部分 0-24，部分 24-44），需在 wrapPath 时统一 viewBox

## 设计决策

### 1. 中央 SVG 字符串注册表
新建 `icon-svg-registry.ts` 集中管理所有 SVG 字符串，避免在多个组件中重复内联。WidgetIcons 的 path 通过 `wrapPath(d, viewBox)` 包装成完整 SVG；天气 SVG 用 Vite `?raw` 导入。

### 2. SvgIcon 扩展策略
在 [SvgIcon.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/SvgIcon.tsx) 新增 `variant?: 'solid' | 'dot'`，当 `variant="dot"` 时：
- 不渲染 `<svg><circle/><path/></svg>` 结构
- 改为渲染 `<DotMatrixIcon svg={...} .../>`，外层 div 保留 cva 类名 + data 属性
- 通过 `iconPath` 反查注册表获取完整 SVG 字符串（或新增 `svgMarkup` prop 直接传入）

### 3. 颜色映射（复用 SvgIcon 主题）
| theme | baseColor | backgroundColor | radius |
|-------|-----------|-----------------|--------|
| dark | `var(--widget-white)` | `var(--widget-dark-bg)` | sizeRadius |
| light | `var(--widget-dark-bg)` | `var(--widget-card-bg)` | sizeRadius |
| accent | `var(--widget-white)` | `var(--widget-primary)` | sizeRadius |
| error | `var(--widget-white)` | `var(--widget-error)` | sizeRadius |

### 4. 尺寸映射
| size | dotSize | rows×cols | gap |
|------|---------|-----------|-----|
| sm | 3 | 16×16 | 1 |
| md | 4 | 20×20 | 1 |
| lg | 5 | 28×28 | 2 |

### 5. 组件内联 SVG 取舍
**转换**（状态/指示/导航类图标）：BatteryIcon 充电状态、DeviceTypeIcon 5 种设备、Taskbar 的 StartIcon/SearchIcon/VolumeIcon
**跳过**（纯功能控件）：BatteryRing 进度环、SmallBatteryIcon（16×10 太小）、ChargingIcon（12×12 太小）、TaskbarBatteryIcon（功能性）、DefaultAppIcon（文字）

## 提议的变更

### 变更 1：新建 `icon-svg-registry.ts`
**文件**: `src/components/widgets/icon-svg-registry.ts`（新建）

**内容**:
```ts
import svgPaths from './widget-svg-paths'
import sunnyRaw from '../../assets/weather/sunny.svg?raw'
import cloudyRaw from '../../assets/weather/cloudy.svg?raw'
import partlyCloudyDayRaw from '../../assets/weather/partly-cloudy-day.svg?raw'
import partlyCloudyNightRaw from '../../assets/weather/partly-cloudy-night.svg?raw'
import rainOrMistRaw from '../../assets/weather/rain-or-mist.svg?raw'
import snowFallRaw from '../../assets/weather/snow-fall.svg?raw'
import thunderRaw from '../../assets/weather/thunder.svg?raw'

/** Wrap a path d-string into a full <svg> markup for DotMatrixIcon rasterization. */
function wrapPath(d: string, viewBox = '0 0 68 68', fill = 'black'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path d="${d}" fill="${fill}"/></svg>`
}

/** WidgetIcons — 40 icons mapped from WidgetIcons.tsx (name → path key → wrapped SVG). */
export const widgetIconSvg: Record<string, string> = {
  home: wrapPath(svgPaths.p2f639780),
  location: wrapPath(svgPaths.p3dac5000),
  remote: wrapPath(svgPaths.p20de0900),
  share: wrapPath(svgPaths.p362aab00),
  shield: wrapPath(svgPaths.p325eb300),
  aeroplane: wrapPath(svgPaths.p687b0f0),
  chart: wrapPath(svgPaths.p1832e580),
  micOff: wrapPath(svgPaths.p13550f80),
  // ... 全部 40 个（含 NoSignal/FullNetwork/NoSim 的 clipPath 特殊处理见下）
}

/** QuickToggle — 8 inline SVGs extracted from App.tsx. */
export const quickToggleSvg: Record<string, string> = {
  active: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  torch: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1"/><circle cx="12" cy="12" r="4"/></svg>',
  dnd: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
  rotate: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/></svg>',
  hotspot: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14"/></svg>',
  bluetooth: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"><path d="M6.5 6.5h11v11h-11z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"/></svg>',
  mobileData: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4"/></svg>',
  nfc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18" stroke-linecap="round"/></svg>',
}

/** Weather — 7 SVG files via Vite ?raw imports. */
export const weatherSvg: Record<string, string> = {
  sunny: sunnyRaw,
  cloudy: cloudyRaw,
  partlyCloudyDay: partlyCloudyDayRaw,
  partlyCloudyNight: partlyCloudyNightRaw,
  rainOrMist: rainOrMistRaw,
  snowFall: snowFallRaw,
  thunder: thunderRaw,
}

/** Component inline SVG — key icons from Battery/Taskbar (status/indicator type only). */
export const componentIconSvg: Record<string, string> = {
  batteryCharging: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="..."/></svg>', // 从 Battery.tsx 提取
  batteryLow: '<svg ...>...</svg>',
  batteryNormal: '<svg ...>...</svg>',
  deviceMouse: '<svg ...>...</svg>',
  deviceKeyboard: '<svg ...>...</svg>',
  deviceEarbuds: '<svg ...>...</svg>',
  devicePhone: '<svg ...>...</svg>',
  deviceWatch: '<svg ...>...</svg>',
  startIcon: '<svg ...>...</svg>', // Taskbar
  searchIcon: '<svg ...>...</svg>',
  volumeIcon: '<svg ...>...</svg>',
}
```

**特殊处理**:
- WidgetIcons 中 `NoSignal`/`FullNetwork`/`NoSim` 使用 clipPath，需将完整 `<defs><clipPath>` + `<path>` 包装进 wrapPath 的 SVG 字符串（不能用简单 wrapPath，需手写完整 SVG）
- `Dots`/`Watch`/`Glyphs`/`Scan` 有 2 个 path，wrapPath 需支持多 path 或单独处理
- 组件图标的精确 path 在实现时从源文件逐个提取

### 变更 2：扩展 `SvgIcon.tsx` 支持 `variant="dot"`
**文件**: [src/components/widgets/SvgIcon.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/SvgIcon.tsx)

**改动**:
1. 新增 `variant?: 'solid' | 'dot'` 到 `SvgIconProps`（默认 `'solid'`）
2. 新增 `svgMarkup?: string` prop（当 variant='dot' 时使用，直接传入完整 SVG 字符串）
3. 新增尺寸映射常量：
   ```ts
   const sizeDotMatrix: Record<SvgIconSize, { dotSize: number; rows: number; cols: number; gap: number }> = {
     sm: { dotSize: 3, rows: 16, cols: 16, gap: 1 },
     md: { dotSize: 4, rows: 20, cols: 20, gap: 1 },
     lg: { dotSize: 5, rows: 28, cols: 28, gap: 2 },
   }
   const themeDotMatrix: Record<SvgIconTheme, { baseColor: string; backgroundColor: string }> = {
     dark: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-dark-bg, #1A1D1C)' },
     light: { baseColor: 'var(--widget-dark-bg, #1A1D1C)', backgroundColor: 'var(--widget-card-bg, #FCFAFE)' },
     accent: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-primary, #D71921)' },
     error: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-error, #D71921)' },
   }
   ```
4. 在组件体内：当 `variant === 'dot'` 且 `svgMarkup` 存在时，渲染 `<DotMatrixIcon>` 替代 `<svg>`，外层 div 保留 cva 类名 + data-variant="dot"
5. 圆角使用 `sizeRadius[size]`，alphaThreshold 默认 128

### 变更 3：更新 `WidgetIcons.tsx` 支持 variant 转发
**文件**: [src/components/widgets/WidgetIcons.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/WidgetIcons.tsx)

**改动**:
1. `WidgetIconProps` 接口新增 `variant?: 'solid' | 'dot'`
2. 每个 icon 函数（40 个）新增 `variant` 参数解构，透传给 `<SvgIcon variant={variant} svgMarkup={variant === 'dot' ? widgetIconSvg.home : undefined} ...>`
3. 为减少重复代码，新增辅助函数：
   ```ts
   function getDotMarkup(name: string): string | undefined {
     return widgetIconSvg[name]
   }
   ```
4. 对于使用 `children` 而非 `iconPath` 的图标（CastAlt、Glyphs 等），variant='dot' 时改用注册表中对应的 SVG markup

### 变更 4：新建 `DotMatrixWeatherIcon.tsx`
**文件**: `src/components/widgets/DotMatrixWeatherIcon.tsx`（新建）

**内容**:
```tsx
import * as React from 'react'
import DotMatrixIcon from '../DotMatrixIcon'
import { weatherSvg } from './icon-svg-registry'
import { cn } from '../../lib/utils'

export type WeatherIconName = keyof typeof weatherSvg

export interface DotMatrixWeatherIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  name: WeatherIconName
  size?: number  // 总尺寸 px，默认 120
  rows?: number  // 默认 32
  cols?: number  // 默认 32
  alphaThreshold?: number  // 默认 100（天气 SVG fill=white，需低阈值）
  dotSize?: number
  anim?: 'none' | 'random'
}

export const DotMatrixWeatherIcon = React.forwardRef<HTMLDivElement, DotMatrixWeatherIconProps>(
  ({ name, size = 120, rows = 32, cols = 32, alphaThreshold = 100, dotSize = 3, anim = 'none', className, ...props }, ref) => {
    return (
      <DotMatrixIcon
        ref={ref}
        svg={weatherSvg[name]}
        rows={rows}
        cols={cols}
        alphaThreshold={alphaThreshold}
        dotSize={dotSize}
        gap={1}
        baseColor="var(--widget-white, #FCFAFE)"
        backgroundColor="var(--widget-dark-bg, #1A1D1C)"
        radius={size / 4}
        anim={anim}
        className={cn('nothing-weather-dot-icon', className)}
        style={{ width: size, height: size, ...props.style }}
        {...props}
      />
    )
  }
)
DotMatrixWeatherIcon.displayName = 'DotMatrixWeatherIcon'
export default DotMatrixWeatherIcon
```

### 变更 5：QuickToggle 点阵变体
**文件**: [src/components/QuickToggle.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/QuickToggle.tsx) + [App.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx)

**改动**:
- QuickToggle 本身已支持 `icon?: React.ReactNode`，无需改组件
- 在 App.tsx 的 QuickToggle demo 区域新增一组 "点阵变体" demo，用 `<DotMatrixIcon svg={quickToggleSvg.active} rows={12} cols={12} dotSize={2} .../>` 作为 icon 传入
- 8 个 QuickToggle 图标各展示一个点阵版本

### 变更 6：组件内联 SVG 点阵变体
**文件**: [Battery.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Battery.tsx)、[Taskbar.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Taskbar.tsx)

**改动**:
- BatteryIcon：新增 `variant?: 'solid' | 'dot'` prop，variant='dot' 时用 `<DotMatrixIcon svg={componentIconSvg.batteryCharging} .../>` 替代 `<svg>`
- DeviceTypeIcon：同上，5 种设备各对应注册表 key
- Taskbar 的 StartIcon/SearchIcon/VolumeIcon：新增 variant prop
- **跳过**：BatteryRing（进度环功能性）、SmallBatteryIcon（16×10 太小）、ChargingIcon（12×12 太小）、TaskbarBatteryIcon（功能性）、DefaultAppIcon（文字）

### 变更 7：App.tsx 新增点阵图标集 showcase
**文件**: [src/App.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx)

**改动**:
在现有 "点阵图标 — SVG 转点阵" section 之后，新增 "点阵图标集 — Dot Matrix Icon Set" section：
1. **WidgetIcons 点阵网格** — 遍历 `WidgetIconList`，每个渲染 `<Home variant="dot" size="sm" />` 等，3-4 列网格布局
2. **天气图标点阵** — 7 个 `<DotMatrixWeatherIcon name="sunny" size={96} anim="random" />` 横向排列
3. **QuickToggle 点阵** — 8 个点阵变体按钮
4. **组件图标点阵** — BatteryIcon/DeviceTypeIcon/StartIcon 等的点阵版本

## 假设与决策

1. **非破坏性优先**：所有变体默认 `'solid'`，现有调用点零改动
2. **单一注册表**：`icon-svg-registry.ts` 集中管理，避免散落
3. **天气 SVG 用 ?raw**：Vite 原生支持，零运行时开销
4. **组件内联 SVG 取舍**：只转换状态/指示/导航类，跳过纯功能控件（进度环、过小图标、文字图标）
5. **颜色复用 SvgIcon 主题**：dark→白点深底，light→深点浅底，accent→白点红底
6. **Glyph.tsx 不动**：44 个手动 7×7 点阵字形已是点阵风格，无需转换
7. **NoSignal/FullNetwork/NoSim 的 clipPath**：在注册表中手写完整 SVG 字符串（含 defs）
8. **多 path 图标**（Dots/Watch/Glyphs/Scan）：wrapPath 支持传入多个 path 或单独手写

## 验证步骤

1. **类型检查**：`npx tsc --noEmit` — 确认无新增类型错误（基线 10 个预存错误）
2. **Lint**：`npx eslint src/components/widgets/icon-svg-registry.ts src/components/widgets/SvgIcon.tsx src/components/widgets/WidgetIcons.tsx src/components/widgets/DotMatrixWeatherIcon.tsx src/components/QuickToggle.tsx src/components/Battery.tsx src/components/Taskbar.tsx` — exit code 0
3. **视觉验证**：启动 dev server，检查 App.tsx 中新增的 "点阵图标集" section：
   - 40 个 WidgetIcons 点阵版本正确渲染（无空白、无错误 data 属性）
   - 7 个天气图标点阵版本轮廓清晰
   - 8 个 QuickToggle 点阵按钮可点击
   - 组件图标点阵版本正确显示
4. **非破坏性验证**：现有 solid 图标渲染不变（对比变更前后截图）
5. **随机脉冲**：天气图标和部分 WidgetIcons 的 `anim="random"` 正常脉动，尊重 `prefers-reduced-motion`

## 实施顺序

1. 新建 `icon-svg-registry.ts`（基础注册表）
2. 扩展 `SvgIcon.tsx`（variant 支持）
3. 更新 `WidgetIcons.tsx`（40 个图标转发）
4. 新建 `DotMatrixWeatherIcon.tsx`
5. QuickToggle 点阵 demo
6. 组件内联 SVG 点阵变体
7. App.tsx showcase 整合
8. type-check + lint 验证
