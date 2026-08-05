# 重构剩余组件为 shadcn 风格（阶段 2F → 8）

## 摘要

继续已完成的工作（lib 基础设施 + 阶段 2A、2B、2C、2D、2E，共 **65 个主组件** 已重构），
完成剩余 **76 个文件**的 shadcn 风格重构：

- `cn()` + `cva()` + `forwardRef` + `data-*` 属性 + 导出 `xxxVariants` 工厂 + 复合 `asChild`
- 涵盖 13 个杂项 widgets、14 个 nullframe 组件、43 个 widget sub、2 个 HOC 修复、3 个 App.tsx 别名
- 最终统一验证 (tsc + build + lint) + 文档同步

**目标**：补完所有未重构组件，对齐已确立的 65 个组件的 shadcn 风格。

---

## 当前状态（基于 Phase 1 探索）

### ✅ 已完成（65 文件）

| 阶段 | 数量 | 关键文件 |
|------|------|----------|
| 0. lib 基础设施 | 6 | `lib/utils.ts`、`lib/variants.ts`、`lib/slot.tsx`、`lib/polymorphic.ts`、`lib/component-types.ts`、`lib/index.ts` |
| 2A. 简单组件 | 10 | Avatar, Label, Separator, Breadcrumb, Resizable, ScrollArea, AspectRatio, Collapsible, Pagination, Form |
| 2B. 表单 | 15 | Checkbox, Switch, Slider, RadioGroup, Textarea, Tags, DateNav, Calendar, Inputs, Card, QuickToggle, Alert, Badge, Buttons, InputOTP |
| 2C. 交互 | 15 | Toggle/ToggleGroup, Tabs, Accordion, Navigation, SegmentedControl, Tooltip, Popover, HoverCard, DropdownMenu, ContextMenu, Select, Sheet, Modal, Command, Sidebar |
| 2D. 数据展示 | 15 | ProgressBar, DataGrid, DataRows, Table, States, Spinner, Quotes, DotMatrix, NextEvent, Clock, Battery, SystemMonitor, WorldClock, Date, Taskbar |
| 2E. Widgets 主 | 11 | WeatherWidget, TimeWidget, WidgetPill, WidgetGrid, StepsWidget, CompassWidget, DigitalClockLargeWidget, ActivityWidget, AnalogClockWidget, PhotoFrameWidget, Glyph, SvgIcon |

**验证已完成**：2D/2E 阶段后 `npx tsc --noEmit` 和 `npx vite build` 全部 0 错误。

### ⬜ 待重构（76 文件）

| 阶段 | 数量 | 路径 | 备注 |
|------|------|------|------|
| 2F. 杂项 Widgets | 13 | `src/components/*.tsx` | MusicPlayer, Caffeinate, Clipboard, Pomodoro, WalkieTalkie, SunDial, AgeMotion, Chrono, PhotoCarousel, NavigationMenu, ErrorBoundary, States, Taskbar |
| 3. Nullframe | 14 | `src/components/nullframe/*.tsx` | NfCard, RenderCard, GlyphCard, Segbar, SeismoCard, StreakCard, BatteryCard, NetworkCard, MemoryCard, ActivityCard, ContributionsCard, ClockHero, CommandPalette, NullframeDashboard |
| 4. Widget sub | 43 | `src/components/widgets/sub/*.tsx` | 浅层 refactor：外层 CVA wrapper + 内部保持 Figma 原貌 |
| 5. HOC | 2 | `withWidgetCard.tsx`, `WidgetSubComponents.tsx` | 修 `any` 类型 + 具名 export |
| 6. App.tsx | 3 | `App.tsx` + 2 sections | 改用 `@/*` 路径别名 |
| 7. 验证 | — | — | tsc + build + lint 全量 |
| 8. 文档 | 3 | `SKILL.md`, `tokens.md`, `MIGRATION.md` | 同步 v2 约定 |

**已确认未重构的代表**：
- `MusicPlayer.tsx` 仍使用 `[...].filter(Boolean).join(' ')` 模式
- `NavigationMenu.tsx` 仍使用 `React.FC<...> = (...)` 模式
- `Caffeinate.tsx` / `Pomodoro.tsx` / `WalkieTalkie.tsx` / `SunDial.tsx` / `AgeMotion.tsx` / `Chrono.tsx` / `PhotoCarousel.tsx` / `Clipboard.tsx` 同上

**已确认环境就绪**：
- `class-variance-authority@^0.7.1` ✅
- `clsx@^2.1.1` ✅
- `tsconfig.json` paths: `"@/*": ["./src/*"]` ✅
- `vite.config.ts` alias: `'@': path.resolve(__dirname, './src')` ✅
- 验证命令：`npm run build` (= `tsc --noEmit && vite build`)、`npm run lint`、`npm run type-check`

---

## 提议的修改

### 阶段 2F：杂项 Widgets（13 个，预计 45 min）

**统一策略**：每个组件顶层包装 `cva()` + `forwardRef` + `cn()` + `data-*` 属性。

| 组件 | 关键 CVA 变体 | 状态机 |
|------|---------------|--------|
| `MusicPlayer` | `variant` (default/compact) + `recording` | isPlaying state |
| `Caffeinate` | `status` (low/medium/high) + `disabled` | drinks/timer state |
| `Clipboard` | `state` (idle/copied/error) + `size` | copy state |
| `Pomodoro` | `phase` (work/break/long-break) + `running` | timer state |
| `WalkieTalkie` | `state` (idle/transmitting/receiving) | PTT state |
| `SunDial` | `theme` (light/dark) + `time` (day/night) | — |
| `AgeMotion` | `size` + `theme` | — |
| `Chrono` | `state` (idle/running/paused) | stopwatch state |
| `PhotoCarousel` | `orientation` (horizontal/vertical) + `index` state | current photo |
| `NavigationMenu` | `variant` (vertical/horizontal) + `active` | — |
| `ErrorBoundary` | class 组件（保持） | — |
| `States` | 已在 2D 重构 | — |
| `Taskbar` | 已在 2D 重构 | — |

**统一模板**（参照已完成的 `WeatherWidget`）：

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/music-player.css'

const musicPlayerVariants = cva('nothing-music-player', {
  variants: {
    variant: {
      default: '',
      compact: 'nothing-music-player--compact',
    },
    recording: {
      true: 'nothing-music-player--recording',
      false: '',
    },
  },
  defaultVariants: { variant: 'default', recording: false },
})

export interface MusicPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof musicPlayerVariants> {
  // component-specific props
}

export const MusicPlayer = React.forwardRef<HTMLDivElement, MusicPlayerProps>(
  ({ className, variant, recording, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(musicPlayerVariants({ variant, recording }), className)}
        style={style}
        data-variant={dataAttr(variant)}
        data-state={dataAttr(/* isPlaying ? 'playing' : 'paused' */)}
        {...props}
      >
        {/* existing inner content */}
      </div>
    )
  }
)
MusicPlayer.displayName = 'MusicPlayer'

export { musicPlayerVariants }
export default MusicPlayer
```

**特殊处理**：
- `ErrorBoundary.tsx`：保持 class 组件（错误边界无法用 forwardRef），跳过此阶段
- `States.tsx` / `Taskbar.tsx`：在 2D 已重构，跳过

### 阶段 3：Nullframe（14 个，预计 30 min）

**统一策略**：包装 `cva()` + `forwardRef`，保留 `motion.section` / `motion.div` 动画。

```tsx
import * as React from 'react'
import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../../lib/utils'
import { bus } from '../../system/telemetry'
import { useCtl } from '../../system/hooks'

const nfCardVariants = cva('nf-card', {
  variants: {
    essential: { true: '', false: 'dimmable' },
    sweep: { true: 'sweep', false: '' },
    tag: { LIVE: 'tag-live', SIM: 'tag-sim', none: '' },
  },
  defaultVariants: { essential: false, sweep: false, tag: 'none' },
})

export interface NfCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    Omit<VariantProps<typeof nfCardVariants>, 'essential' | 'sweep' | 'tag'> {
  index: number
  label: string
  right?: ReactNode
  tag?: 'LIVE' | 'SIM'
  tagAlways?: boolean
  essential?: boolean
  children: ReactNode
}

export const NfCard = React.forwardRef<HTMLElement, NfCardProps>(
  ({ className, index, label, right, tag, tagAlways = false, essential = false, children, ...props }, ref) => {
    // ... sweep logic ...
    return (
      <motion.section
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(nfCardVariants({ essential, sweep, tag: tag ?? 'none' }), className)}
        data-state={dataAttr(sweep ? 'sweeping' : 'idle')}
        data-tag={dataAttr(tag)}
        data-essential={dataAttr(essential)}
        {...props}
      >
        {/* children */}
      </motion.section>
    )
  }
)
NfCard.displayName = 'NfCard'

export { nfCardVariants }
export default NfCard
```

**14 个组件** 全部用此模式：
NfCard, RenderCard, GlyphCard, Segbar, SeismoCard, StreakCard, BatteryCard,
NetworkCard, MemoryCard, ActivityCard, ContributionsCard, ClockHero,
CommandPalette, NullframeDashboard

**注意**：
- `motion.section` / `motion.div` 继续使用（保留动画）
- `useReducedMotion` + `useCtl` 逻辑保留
- `bus.on('sync')` 事件订阅保留
- `forwardRef` 类型用 `HTMLElement` 或 `HTMLDivElement`（与 motion 兼容）

### 阶段 4：Widget sub（43 个，浅层 refactor，预计 30 min）

**策略（用户决策）**：仅外层 CVA wrapper，内部 Figma 输出原样保留。

**统一模式**：

```tsx
// 改造前（典型 43 文件之一）
export function Card({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Card" aria-label={ariaLabel || "Card"}>
      {/* Figma 输出 */}
    </div>
  );
}

// 改造后
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../../../lib/utils'
import imgImage from '../../../assets/images/069cf4a7d68229b16958df0e634b08f7e38a57a5.png'

const cardVariants = cva('widget-card-wrapper', {
  variants: {
    theme: { light: 'widget-theme--light', dark: 'widget-theme--dark', default: '' },
    size: { small: 'widget-size--sm', medium: 'widget-size--md', large: 'widget-size--lg', default: '' },
  },
  defaultVariants: { theme: 'default', size: 'default' },
})

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'theme' | 'size'>,
    VariantProps<typeof cardVariants> {
  'aria-label'?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme, size, 'aria-label': ariaLabel, style, ...props }, ref) => (
    <div
      ref={ref}
      style={style}
      className={cn(cardVariants({ theme, size }), className)}
      data-name="Card"
      data-theme={dataAttr(theme)}
      data-size={dataAttr(size)}
      aria-label={ariaLabel || "Card"}
      {...props}
    >
      {/* Figma 输出原样保留 */}
    </div>
  )
)
Card.displayName = 'Card'

export { cardVariants }
```

**43 个文件列表**（在 `src/components/widgets/sub/`）：
Active, Active1, ActivityTracker, AutoRotate1, Campus, Card, Card2, Card3,
Compass, Counter, Date, Device, Dots3, DoubleDown, Flash, Glyphs1, Glyphs2,
LoadingBar1, Location1, LocationAccess, LocationAccess1, MicAccess, Mode,
Music, MusicPlayer, NothingEar, OverLimit, OverLimit1, PairNewDevice, Play,
Record2, Recording, SelectDevice, StepsCounter, TempControl, Time, TotalTime,
Watch1, WatchAnalog, Weather1, Weather2, Wedget

注意：
- `sub/MusicPlayer.tsx`（Figma 输出）与 `components/MusicPlayer.tsx`（同名的复杂组件）不同文件，须分别处理
- `OverLimit.tsx` 导出 `Overlimit` 别名（保持兼容）
- `Wedget.tsx` 导出 `WidgetWide` 别名

### 阶段 5：HOC 修复（10 min）

#### 5.1 `withWidgetCard.tsx`

```tsx
// 修 any → 具体类型
import * as React from 'react'
import { WidgetCard, type WidgetCardProps } from '../Card'

export type CardProp = boolean | Omit<WidgetCardProps, 'children'>

export interface WithCardProps {
  card?: CardProp
}

type RefableComponent<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P & React.RefAttributes<HTMLElement>>

export function withWidgetCard<P extends object>(
  Component: RefableComponent<P>
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<HTMLElement>>
```

**改动**：
- `any` → `HTMLElement` / `unknown` 等具体类型
- 保留函数重载签名
- HOC 内 `createElement` 显式标注 `Component as React.ComponentType<P & { ref?: React.Ref<HTMLElement> }>`

#### 5.2 `WidgetSubComponents.tsx`

```tsx
// export * → 具名 export（解决 export * warning）
export { Record2 } from './sub/Record2'
export { LocationAccess } from './sub/LocationAccess'
// ... 43 个具名 export
```

#### 5.3 `sub/index.ts`

将 `export *` 替换为显式具名 export：

```tsx
export { Record2 } from './Record2'
export { LocationAccess } from './LocationAccess'
// ...
```

### 阶段 6：App.tsx 与 sections 别名（10 min）

**改动原则**：仅替换 import 路径，不改变任何业务逻辑。

```tsx
// 改造前
import Clock from './components/Clock'

// 改造后
import Clock from '@/components/Clock'
```

**3 个文件**：
- `src/App.tsx`（大量组件 import）
- `src/sections/NullframeSection.tsx`
- `src/sections/Figma20Section.tsx`

**验证**：跑 `npx vite build` 确认路径解析无问题。

### 阶段 7：验证（每批后 + 最终）

| 步骤 | 命令 | 期望 | 频率 |
|------|------|------|------|
| 类型检查 | `npx tsc --noEmit` | 0 错误 | 每批后 + 最终 |
| 关键组件 build | `npx vite build` | 0 失败 | 每批后 + 最终 |
| 全量 build | `npm run build` | 0 失败 | 最终 |
| Lint | `npm run lint` | 0 错误 | 最终 |

**每批后强制执行**（共 5 批：2F、3、4、5+6、7）：
1. `cd nothing-design-skill/nothing-design/web-ui-kit/react && npx tsc --noEmit`
2. `npx vite build`

### 阶段 8：文档（15 min）

#### 8.1 `SKILL.md`（在 `nothing-design-skill/nothing-design/SKILL.md`）

- 强化 "Component Architecture Conventions" 章节
- 新增 "Polymorphic asChild" 章节
- 新增 "Breaking Changes v2" 章节
- 共享 variants 索引表（theme/size/state/emphasis/status/orientation）

#### 8.2 `references/tokens.md`（在 `nothing-design-skill/nothing-design/references/tokens.md`）

- 扩展工具章节：cn, cva, dataAttr, Slot
- 共享 variants 应用示例

#### 8.3 `MIGRATION.md`（新建，在 `nothing-design-skill/nothing-design/MIGRATION.md`）

- v1 → v2 迁移指南
- 旧 prop 重命名表（如 `isChecked` 替代 `checked`，避免 prop 冲突）
- 新 `asChild` 用法示例
- 类型导出变更（如 `XVariants` 工厂导出）
- 行为变更（如 `forwardRef` 必填、`displayName` 必填）

---

## 假设与决策

### 假设

1. **breaking change 接受**：调用方按 MIGRATION.md 迁移（用户已确认）
2. **CSS 文件零改动**：纯 TSX 层 refactor
3. **Widget sub 内层保持**：仅外层 CVA 化（用户已确认）
4. **Nullframe 动画保留**：`motion.section` 继续使用
5. **ErrorBoundary 保持 class 组件**：跳过此组件
6. **`@/*` 路径别名已配置**：tsconfig.json 和 vite.config.ts 都已就绪
7. **每批后 tsc + vite build 必须 0 错误**

### 决策

1. **Widget sub 模板固定**：43 个文件用同一模板
2. **`theme` / `size` prop 命名保留**（widget sub 中）：与 Figma 输出兼容
3. **空 theme/size = 'default' variant**：避免空字符串拼接问题
4. **data-name 保留**：Figma 设计系统依赖
5. **`data-theme` / `data-size` 新增**：CSS hook 扩展点
6. **HOC 错误边界用 `HTMLElement`**：与 `forwardRef` 兼容
7. **App.tsx 别名仅替换 import 路径**：不动业务代码

### 风险与缓解

| 风险 | 缓解 |
|------|------|
| 76 文件批量改动易引入 bug | 模板固定 + 每批 tsc + build 验证 |
| Widget sub 内层 Figma 引用断裂 | 仅外层加 CVA，不动内层 className / 资产 import |
| Nullframe 动画失效 | motion.section 保留，仅 wrap 加 className |
| HOC 类型推导复杂 | 用 `RefableComponent<P>` union 类型替代 `any` |
| App.tsx 别名路径错误 | 跑 build 验证 |
| ErrorBoundary 仍用 class | 跳过，文档说明 |
| `useReducedMotion` / `bus` 依赖丢失 | 保持原 import 不动 |

---

## 实施顺序

| 顺序 | 阶段 | 输出 | 预计 | 验证 |
|------|------|------|------|------|
| 1 | 2F | 11 杂项 widgets（去掉 States/Taskbar） | 45 min | tsc + build |
| 2 | 3 | 14 nullframe | 30 min | tsc + build |
| 3 | 4 | 43 widget sub | 30 min | tsc + build |
| 4 | 5+6 | HOC 修复 + App.tsx 别名 | 20 min | tsc + build |
| 5 | 7 | 全量验证 | 10 min | tsc + build + lint |
| 6 | 8 | 文档 | 15 min | manual review |

**总计**：~2.5h 纯 refactor。

---

## 验证步骤

### 每批后（强制）

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit              # 必须 0 错误
npx vite build                # 必须成功
```

### 最终（全量）

```bash
npx tsc --noEmit              # 0 错误
npm run build                 # 0 失败（tsc + vite build）
npm run lint                  # 0 错误
```

---

## 不在本次范围

- ❌ 引入 Tailwind CSS（继续用纯 CSS）
- ❌ 复制 shadcn CLI/Registry
- ❌ Figma SVG 资产优化
- ❌ 拼写错误修复
- ❌ nullframe 亮色主题适配
- ❌ App.tsx 拆 lazy loading
- ❌ ErrorBoundary 转 forwardRef（保持 class）
- ❌ Widget sub 内层 refactor（仅外层 CVA）
- ❌ 已有 refactored 组件的进一步优化

---

## 关键文件清单

### 新建

| 文件 | 用途 |
|------|------|
| `nothing-design-skill/nothing-design/MIGRATION.md` | v1→v2 迁移指南 |

### 修改（76 文件）

| 路径 | 改动 |
|------|------|
| `src/components/MusicPlayer.tsx` 等 11 个 | 阶段 2F |
| `src/components/nullframe/*.tsx` (14) | 阶段 3 |
| `src/components/widgets/sub/*.tsx` (43) | 阶段 4 浅层 |
| `src/components/widgets/withWidgetCard.tsx` | 阶段 5.1 |
| `src/components/widgets/WidgetSubComponents.tsx` | 阶段 5.2 |
| `src/components/widgets/sub/index.ts` | 阶段 5.3 |
| `src/App.tsx` | 阶段 6 |
| `src/sections/NullframeSection.tsx` | 阶段 6 |
| `src/sections/Figma20Section.tsx` | 阶段 6 |
| `SKILL.md` | 阶段 8.1 |
| `references/tokens.md` | 阶段 8.2 |

---

## 进度追踪

> **2026-08-05 更新**：全部阶段已完成。详见 [PROJECT_PROGRESS.md](../../nothing-design-skill/nothing-design/web-ui-kit/react/PROJECT_PROGRESS.md)。

| 阶段 | 状态 | 备注 |
|------|------|------|
| 0. lib 基础设施 | ✅ 完成 | 6 文件 |
| 2A. 简单组件 (10) | ✅ 完成 | — |
| 2B. 表单 (15) | ✅ 完成 | — |
| 2C. 交互 (15) | ✅ 完成 | — |
| 2D. 数据展示 (15) | ✅ 完成 | tsc + vite build 通过 |
| 2E. Widgets 主 (11) | ✅ 完成 | tsc + vite build 通过 |
| 2F. 杂项 Widgets (11) | ✅ 完成 | MusicPlayer/Pomodoro/Chrono 等 |
| 3. Nullframe (14) | ✅ 完成 | NfCard + bodies |
| 4. Widget sub (43) | ✅ 完成 | v5 合并精简至 32 个 |
| 5. HOC (3) | ✅ 完成 | withWidgetCard / WidgetPill |
| 6. App.tsx 别名 (3) | ✅ 完成 | showcase/sections/ 拆分 |
| 7. 验证 | ✅ 完成 | type-check / test / build |
| 8. 文档 (3) | ✅ 完成 | PROJECT_PROGRESS.md 等 |

**重构已全部完成**：72 顶层模块 + 14 widgets + 7 agent + 7 conversation
