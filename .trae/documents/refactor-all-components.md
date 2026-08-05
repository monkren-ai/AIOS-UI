# 重构全部 138 个组件为 shadcn 风格（续）

## 摘要

继续上轮已完成的 **24 主组件**（阶段 2A、2B）与 **15 交互组件**（阶段 2C），
完成剩余 **113 个组件**的 shadcn 风格重构：
`cn()` + `cva()` + `forwardRef` + `data-*` 属性 + 导出 `xxxVariants` 工厂 + 复合 `asChild`。

**本轮决策（来自 AskUserQuestion）**：
- 范围：**全部 113 个一次性完成**（不含已完成的 39 个）
- Widget sub 策略：**外层 CVA + 内层保持**
- 验证：**每批后 tsc --noEmit + 关键组件 build**

---

## 当前状态（基于 Phase 1 探索）

### ✅ 已完成

| 阶段 | 数量 | 组件 |
|------|------|------|
| 0. lib 基础设施 | 4 文件 | `utils.ts`、`variants.ts` (8 variants)、`slot.tsx`、`polymorphic.ts`、`component-types.ts`、`index.ts` |
| 1. Avatar 模板 | 1 | 验证模式 |
| 2A. 简单组件 | 10 | Avatar, Label, Separator, Breadcrumb, Resizable, ScrollArea, AspectRatio, Collapsible, Pagination, Form |
| 2B. 表单 | 14 | Checkbox, Switch, Slider, RadioGroup, Textarea, Tags, DateNav, Calendar, Inputs, Card, QuickToggle, Alert, Badge, Buttons, InputOTP |
| 2C. 交互 | 15 | Toggle (+ToggleGroup), Tabs, Accordion, Navigation, SegmentedControl, Tooltip, Popover, HoverCard, DropdownMenu, ContextMenu, Select, Sheet, Modal, Command, Sidebar |

**共 39 个主组件 + 4 个 lib 文件已重构完成**。

### ⬜ 待重构（113 个）

| 阶段 | 数量 | 路径 | 备注 |
|------|------|------|------|
| 2D. 数据展示 | 15 | `src/components/*.tsx` | ProgressBar, DataGrid, DataRows, Table, States, Spinner, Quotes, DotMatrix, NextEvent, Clock, Battery, SystemMonitor, WorldClock, Date, Taskbar |
| 2E. Widgets 主 | 11 | `src/components/widgets/*.tsx` | WidgetPill, WeatherWidget, TimeWidget, StepsWidget, PhotoFrameWidget, CompassWidget, DigitalClockLargeWidget, ActivityWidget, AnalogClockWidget, WidgetGrid, Glyph, SvgIcon |
| 2F. 杂项 Widgets | 13 | `src/components/*.tsx` | MusicPlayer, Caffeinate, Clipboard, Pomodoro, WalkieTalkie, SunDial, AgeMotion, Chrono, PhotoCarousel, NavigationMenu, ErrorBoundary, States, Taskbar |
| 3. Nullframe | 14 | `src/components/nullframe/*.tsx` | NfCard, RenderCard, GlyphCard, Segbar, SeismoCard, StreakCard, BatteryCard, NetworkCard, MemoryCard, ActivityCard, ContributionsCard, ClockHero, CommandPalette, NullframeDashboard |
| 4. Widget sub | 43 | `src/components/widgets/sub/*.tsx` | 浅层 refactor：外层 CVA wrapper + 内部保持 Figma 原貌 |
| 5. HOC | 2 | `widgets/withWidgetCard.tsx`, `widgets/WidgetSubComponents.tsx` | 修 `any` 类型 + 具名 export |
| 6. App.tsx | 3 | `App.tsx` + 2 sections | 改用 `@/*` 路径别名 |
| 7. 验证 | — | — | tsc + build + lint |
| 8. 文档 | 3 | `SKILL.md`, `tokens.md`, `MIGRATION.md` | 同步 v2 约定 |

**总 113 文件改动 + 4 新增/修改文档**。

---

## 提议的修改

### 阶段 2D：数据展示（15 个，预计 45 min）

| 组件 | 变体设计 |
|------|----------|
| `ProgressBar` | `sizeLayoutVariants` + `statusVariants` + `indeterminate` + `disabled` |
| `DataGrid` | `variant` (compact/comfortable) + `selected` + `sortable` |
| `DataRows` | `variant` + `status` |
| `Table` | `variant` + `selected` + `sortable` |
| `States` | 4 个变体（loading/error/empty/disabled）+ `size` |
| `Spinner` | `size` + `variant` |
| `Quotes` | `variant` + `size` |
| `DotMatrix` | `size` + `variant` |
| `NextEvent` | `variant` + `priority` |
| `Clock` | `type` (digital/gauge) + `size` |
| `Battery` | `level` + `charging` + `variant` |
| `SystemMonitor` | `variant` (cpu/mem/net) |
| `WorldClock` | `variant` + `size` |
| `Date` | `variant` + `format` |
| `Taskbar` | `variant` + `active` |

**统一模板**（参照已完成的 `Checkbox`）：

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/X.css'

const xVariants = cva('nothing-x', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
})

export interface XProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, '...'>,
    VariantProps<typeof xVariants> {
  /* ... */
}

export const X = React.forwardRef<HTMLDivElement, XProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(xVariants({ ... }), className)}
        data-state={dataAttr(/* state */)}
        {...props}
      />
    )
  }
)
X.displayName = 'X'

export { xVariants }
export default X
```

### 阶段 2E：Widgets 主（11 个，预计 45 min）

**策略**：
- **外层 CVA wrapper**：每个 widget 顶层 `<div>` 改为 `widgetVariants` + `forwardRef`
- **共享 variants**：复用 `themeVariants`（light/dark/accent/error）
- **内部 SVG / 子结构不变**：保留 Figma 输出
- **data-name 保留**：调试和测试需要
- **`withWidgetCard` HOC 兼容**：被 HOC 包裹的组件先做内层 `forwardRef` + CVA，HOC 暂时原样保留；HOC 类型修复留到阶段 5

| 组件 | 关键 CVA |
|------|----------|
| `WidgetPill` | `themeVariants` + `pressed` + `size` |
| `WidgetGrid` | `variant` (2-col/3-col/4-col) + `gap` |
| `WeatherWidget` | `variant` (square/wide/circular/grid) + `unit` |
| `TimeWidget` | `variant` (over-limit/recording/total-time/date) + `format` |
| `StepsWidget` | `variant` (compact/full) |
| `PhotoFrameWidget` | `aspectRatio` (1:1/4:5/16:9) |
| `CompassWidget` | `size` |
| `DigitalClockLargeWidget` | `format` (12h/24h) |
| `ActivityWidget` | `variant` |
| `AnalogClockWidget` | `size` |
| `Glyph` / `SvgIcon` | `size` + `variant` |

### 阶段 2F：杂项 Widgets（13 个，预计 45 min）

| 组件 | 备注 |
|------|------|
| `MusicPlayer` | 复杂结构：top-level CVA，内部保留 |
| `Caffeinate` | timer state，forwardRef |
| `Clipboard` | copy state，forwardRef |
| `Pomodoro` | timer state，forwardRef |
| `WalkieTalkie` | recording state，forwardRef |
| `SunDial` | theme + time，CVA |
| `AgeMotion` | 纯展示，浅层 CVA |
| `Chrono` | stopwatch state，forwardRef |
| `PhotoCarousel` | index state，forwardRef |
| `NavigationMenu` | variant + active，CVA |
| `ErrorBoundary` | class 组件，转 forwardRef 包装？保持 class |
| `States` | 已在 2D 列表中 |
| `Taskbar` | 已在 2D 列表中 |

### 阶段 3：Nullframe（14 个，预计 30 min）

**统一策略**：
- 全部 14 个组件用 CVA 包装 + forwardRef
- 复用 `themeVariants` + `emphasisVariants`
- 内部子结构（shine/sweep 等）保持
- `motion.section` / `motion.div` 继续使用（保留动画）

```tsx
const nfCardVariants = cva('nf-card', {
  variants: {
    essential: { true: '', false: 'dimmable' },
    sweep: { true: 'sweep', false: '' },
    tag: { LIVE: 'tag-live', SIM: 'tag-sim', none: '' },
  },
  defaultVariants: { essential: false, sweep: false, tag: 'none' },
})

export const NfCard = React.forwardRef<HTMLElement, NfCardProps>(
  ({ className, index, label, right, tag, tagAlways, essential, children, ...props }, ref) => {
    // ... 保持 sweep logic ...
    return (
      <motion.section
        ref={ref}
        className={cn(nfCardVariants({ essential, sweep, tag: tag ?? 'none' }), className)}
        data-state={dataAttr(sweep ? 'sweeping' : 'idle')}
        {...props}
      >
        {/* children */}
      </motion.section>
    )
  }
)
```

### 阶段 4：Widget sub（43 个，浅层 refactor，预计 30 min）

**策略（用户决策）**：
- **外层 CVA + 内层保持**：每个 widget sub 的最外层 `<div>` 用 CVA 包装
- **不**强制 refactor 内部嵌套结构
- **保留 Figma 输出**原貌

**统一模式**：

```tsx
// 改造前
export function Card({ theme, size, className, ... }) {
  return (
    <div className={`widget-card-wrapper ${className || ''}`.trim()}>
      {/* Figma 输出 */}
    </div>
  )
}

// 改造后
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn, dataAttr } from '../../../lib/utils'

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
  ({ className, theme, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ theme, size }), className)}
      data-name="Card"
      data-theme={dataAttr(theme)}
      data-size={dataAttr(size)}
      {...props}
    >
      {/* Figma 输出原样保留 */}
    </div>
  )
)
Card.displayName = 'Card'

export { cardVariants }
```

**43 个文件** 全部用此模式批量处理。

### 阶段 5：HOC 修复（10 min）

#### 5.1 `withWidgetCard.tsx`

```tsx
// 修 any → 具体类型
export function withWidgetCard<P extends object>(
  Component: React.ComponentType<P & { ref?: React.Ref<HTMLElement> }>
) {
  // ...
}
```

#### 5.2 `WidgetSubComponents.tsx`

```tsx
// export * → 具名 export
export { Card, Card1, /* ... */ } from './sub/index'
```

### 阶段 6：App.tsx 与 sections 别名（10 min）

- `src/App.tsx`: `from './components/...'` → `from '@/components/...'`
- `src/sections/NullframeSection.tsx`: 同上
- `src/sections/Figma20Section.tsx`: 同上
- 检查 `vite.config.ts` 和 `tsconfig.json` 已有 `@` 别名

### 阶段 7：验证（每批后 + 最终，10 min × 6 批 = 60 min）

| 步骤 | 命令 | 期望 |
|------|------|------|
| 类型检查 | `npx tsc --noEmit` | 0 错误（每批后） |
| 关键组件 build | `npx vite build` | 0 失败（每批后） |
| 全量 build | `npm run build` | 0 失败（最终） |
| Lint | `npx eslint src/components src/lib` | 0 错误（最终） |

**每批后必须执行**：tsc + vite build。

### 阶段 8：文档（15 min）

#### 8.1 `SKILL.md`
- 强化 "Component Architecture Conventions"
- 新增 "Polymorphic asChild" 章节
- 新增 "Breaking Changes v2"
- 共享 variants 索引表

#### 8.2 `references/tokens.md`
- 扩展工具章节（cn, cva, dataAttr, Slot）

#### 8.3 `nothing-design/MIGRATION.md`（新建）
- v1→v2 迁移指南
- 旧 prop 重命名表
- 新 `asChild` 用法
- 类型导出变更

---

## 假设与决策

### 假设

1. **breaking change 接受**：调用方按 MIGRATION.md 迁移
2. **CSS 文件零改动**：纯 TSX 层 refactor
3. **Widget sub 内层保持**：仅外层 CVA 化
4. **Nullframe 动画保留**：`motion.section` 继续使用
5. **ErrorBoundary 保持 class 组件**：forwardRef 不强制
6. **每批后 tsc 必须 0 错误**

### 决策

1. **Widget sub 模板固定**：43 个文件用同一模板
2. **`theme` prop 命名保留**（widget sub 中）：与 Figma 输出兼容
3. **`size` prop 命名保留**（widget sub 中）：同上
4. **空 theme/size = 'default' variant**：避免空字符串拼接问题
5. **data-name 保留**：Figma 设计系统依赖
6. **`data-theme` / `data-size` 新增**：CSS hook 扩展点

### 风险与缓解

| 风险 | 缓解 |
|------|------|
| 113 文件批量改动易引入 bug | 模板固定 + 每批 tsc 验证 |
| Widget sub 内层 Figma 引用断裂 | 仅外层加 CVA，不动内层 className |
| Nullframe 动画失效 | motion.section 保留，仅 wrap 加 className |
| HOC 类型推导复杂 | 用 `React.ComponentType<P>` 替代 `any` |
| App.tsx 别名路径错误 | 跑 build 验证 |
| 文档与代码不同步 | 最后统一写 |

---

## 实施顺序

| 顺序 | 阶段 | 输出 | 预计 | 验证 |
|------|------|------|------|------|
| 1 | 2D | 15 数据展示 | 45 min | tsc + build |
| 2 | 2E | 11 widgets 主 | 45 min | tsc + build |
| 3 | 2F | 13 杂项 widgets | 45 min | tsc + build |
| 4 | 3 | 14 nullframe | 30 min | tsc + build |
| 5 | 4 | 43 widget sub | 30 min | tsc + build |
| 6 | 5+6 | HOC + App.tsx | 20 min | tsc + build |
| 7 | 7 | 全量验证 | 10 min | tsc + build + lint |
| 8 | 8 | 文档 | 15 min | manual review |

**总计**：~4h 纯 refactor。

---

## 验证步骤

### 每批后（强制）
1. `npx tsc --noEmit` — 必须 0 错误
2. `npx vite build` — 必须成功（关键组件能打包）

### 最终（全量）
1. `npx tsc --noEmit` — 0 错误
2. `npm run build` — 0 失败
3. `npx eslint src/components src/lib` — 0 错误
4. `npm run dev` — 138 组件演示对照（可选）

---

## 不在本次范围

- ❌ 引入 Tailwind CSS
- ❌ 复制 shadcn CLI/Registry
- ❌ Figma SVG 资产优化
- ❌ 拼写错误修复
- ❌ nullframe 亮色主题适配
- ❌ App.tsx 拆 lazy loading
- ❌ ErrorBoundary 转 forwardRef（保持 class）

---

## 关键文件清单

### 新建
| 文件 | 用途 |
|------|------|
| `nothing-design/MIGRATION.md` | v1→v2 迁移指南 |

### 修改
| 路径 | 改动 |
|------|------|
| `src/components/*.tsx` (15+13) | 阶段 2D、2F |
| `src/components/widgets/*.tsx` (11) | 阶段 2E |
| `src/components/nullframe/*.tsx` (14) | 阶段 3 |
| `src/components/widgets/sub/*.tsx` (43) | 阶段 4 浅层 |
| `src/components/widgets/withWidgetCard.tsx` | 阶段 5.1 |
| `src/components/widgets/WidgetSubComponents.tsx` | 阶段 5.2 |
| `src/App.tsx` + 2 sections | 阶段 6 |
| `SKILL.md` | 阶段 8.1 |
| `references/tokens.md` | 阶段 8.2 |

---

## 进度追踪

> **2026-08-05 更新**：全部阶段已完成。详见 [PROJECT_PROGRESS.md](../../nothing-design-skill/nothing-design/web-ui-kit/react/PROJECT_PROGRESS.md)。

| 阶段 | 状态 | 备注 |
|------|------|------|
| 0. lib 基础设施 | ✅ 完成 | slot, polymorphic, component-types, variants (8 shared) |
| 1. Avatar 模板 | ✅ 完成 | 39 个先驱 |
| 2A. 简单组件 (10) | ✅ 完成 | Avatar/Label/Separator/Breadcrumb/Resizable/ScrollArea/AspectRatio/Collapsible/Pagination/Form |
| 2B. 表单 (15) | ✅ 完成 | Checkbox/Switch/Slider/RadioGroup/Textarea/Tags/DateNav/Calendar/Inputs/Card/QuickToggle/Alert/Badge/Buttons/InputOTP |
| 2C. 交互 (15) | ✅ 完成 | Toggle/Tabs/Accordion/Navigation/SegmentedControl/Tooltip/Popover/HoverCard/DropdownMenu/ContextMenu/Select/Sheet/Modal/Command/Sidebar |
| 2D. 数据展示 (15) | ✅ 完成 | ProgressBar/DataTable/States/Spinner/Quotes/DotMatrix/NextEvent/Battery/SystemMonitor/Date/Taskbar 等 |
| 2E. Widgets 主 (11) | ✅ 完成 | WeatherWidget/StepsWidget/ActivityWidget 等 |
| 2F. 杂项 widgets (13) | ✅ 完成 | MusicPlayer/Pomodoro/Chrono 等 |
| 3. Nullframe (14) | ✅ 完成 | NfCard + bodies 模式 |
| 4. Widget sub (43) | ✅ 完成 | v5 合并精简至 32 个 |
| 5. HOC | ✅ 完成 | withWidgetCard / WidgetPill 工厂 |
| 6. App.tsx 别名 | ✅ 完成 | Showcase 拆分至 showcase/sections/ |
| 7. 验证 | ✅ 完成 | type-check / test / build 通过 |
| 8. 文档 | ✅ 完成 | AGENTS.md / COMPONENTS.md / PROJECT_PROGRESS.md |
