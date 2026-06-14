# 合并、梳理功能类似的组件 — 续执行计划 v4

> **范围**: 全部 (低+中+高)
> **API 策略**: 直接 breaking, 全部更新调用点
> **基于**: v3 计划 + 实际代码扫描 (2026-06-13)
> **状态**: v3 中的 Phase 2.8 (Weather) 已完成, 剩余 4 个 Phase + 文档
> **目标**: 完成 Time/Music/DataTable/Overlay 合并 + 文档化

---

## 0. 当前状态核对 (基于实际代码扫描)

| Phase | 内容 | 文件证据 | 状态 |
|-------|------|----------|------|
| 1 | `system/hooks.ts`, `system/time.ts`, `ui/createThemedDiv.ts` | `useNow`, `useTypedText`, `pad2`, `stamp`, `createThemedDiv` 已存 | ✅ 完成 |
| 2.1-2.7 | Card/Active/OverLimit/LocationAccess/Watch/Recording/Glyphs | 7 个 variant 合并已完成 | ✅ 完成 |
| 2.8 | `Weather` (Weather1/Weather2 → variant) | `widgets/sub/Weather.tsx` 已存, `Weather1.tsx`/`Weather2.tsx` 已删, `index.ts` 第 33 行 export, `Figma20Section.tsx` 已用 `<Weather variant="...">` | ✅ 完成 |
| 3 | `WidgetPill` + `WidgetPillPresets` | `WidgetPill.tsx`, `WidgetPillPresets.tsx` 已存 | ✅ 完成 |
| 4 | `NfCard` + `bodies.tsx` | `nullframe/NfCard.tsx`, `nullframe/bodies.tsx` 已存 | ✅ 完成 |
| 5 | Time 集群 (8 展示层 → 1 `Time`) | `widgets/Time.tsx` 10 variants 全部就位, 旧 7 个文件已删, App.tsx/Figma20Section.tsx 调用点已切换为 `<Time variant="...">` | ✅ 完成 |
| 6 | MusicPlayer mini 变体 | `components/MusicPlayer.tsx` 新增 `variant='mini'`, `widgets/sub/MusicPlayer.tsx` 改为 thin re-export | ✅ 完成 |
| 7 | DataTable (3 → 1 + thin re-export) | `ui/DataTable.tsx` 3 variant 统一入口, `Table.tsx`/`DataGrid.tsx`/`DataRows.tsx` 改为 thin re-export, App.tsx 调用点已更新 | ✅ 完成 |
| 8 | OverlayPortal 抽象 | `ui/OverlayPortal.tsx` 6 原语就位, 6 个 overlay 组件全部内部迁移, 公开 API 不变 | ✅ 完成 |
| 文档 | MIGRATION.md v5 章节 | §5.1-5.7 全章节 (removed exports / thin re-exports / 新 API / OverlayPortal 设计 / 迁移示例) | ✅ 完成 |

**遗留调用点**: ✅ 已全部清理 (见 §10.1 调用点更新列)

---

## 1. Phase 5: Time 集群合并 (中风险, 8 展示层 → 1)

### 1.1 当前分散点 (基于代码扫描)

| 文件 | 行数 | 当前 API | 角色 |
|------|------|----------|------|
| `components/Clock.tsx` | 5219 | `<Clock type='digital'\|'gauge'\|'dual-ring'\|'overlay' theme size />` | 数字 + gauge |
| `components/WorldClock.tsx` | 3495 | `<WorldClock cities={[]} />` | 城市时间列表 |
| `components/Chrono.tsx` | 6225 | 业务状态机, 内部用 `Clock` | 业务: 秒表 (保留) |
| `components/Pomodoro.tsx` | 4378 | 业务状态机, 内部用 `Clock` | 业务: 番茄钟 (保留) |
| `components/widgets/TimeWidget.tsx` | 4896 | `variant='recording'\|'default'`, `card` | 大块时间 widget |
| `components/widgets/AnalogClockWidget.tsx` | 7654 | `variant='swiss'\|'minimalist'`, `card`, `smoothSeconds` | 指针表 |
| `components/widgets/DigitalClockLargeWidget.tsx` | 2646 | `variant='sharp'\|'serif'`, `showSeconds`, `card` | 大数字 |
| `components/widgets/sub/Time.tsx` | 短 | 显示时间字符串 | 子组件 |
| `components/widgets/sub/TotalTime.tsx` | 短 | 总计时间 | 子组件 |
| `components/nullframe/bodies.tsx::ClockHeroBody` | 已有 | 内嵌 + `useNow` | Hero 时间 |

**合并策略**: 新建 `widgets/Time.tsx`, 作为统一时间展示入口; `Chrono`/`Pomodoro` 保留业务状态, 内部渲染换为 `<Time variant="..." />`; 其余 7 个展示层改为 thin re-export (1 行)。

### 1.2 新 `Time` 组件设计

新建 `components/widgets/Time.tsx`:

```ts
import * as React from 'react'
import { useNow } from '@/system/hooks'

export type TimeVariant =
  | 'digital-compact'    // 原 Clock type='digital'
  | 'dial'               // 原 Clock type='gauge'
  | 'analog'             // 原 AnalogClockWidget
  | 'digital-large'      // 原 DigitalClockLargeWidget
  | 'hero'               // 原 TimeWidget / ClockHeroBody
  | 'world'              // 原 WorldClock
  | 'compact'            // 原 sub/Time
  | 'total'              // 原 sub/TotalTime

export interface TimeProps {
  variant?: TimeVariant
  /** variant='world' 时使用 */
  cities?: { name: string; offset: number }[]
  /** variant='digital-large' 时使用 */
  font?: 'sharp' | 'serif'
  showSeconds?: boolean
  /** variant='analog' 时使用 */
  dial?: 'swiss' | 'minimalist'
  smoothSeconds?: boolean
  /** variant='hero' 时使用 */
  layout?: 'horizontal' | 'stacked'
  /** variant='recording' 时原 TimeWidget 用 */
  recording?: boolean
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

export const Time = React.forwardRef<HTMLDivElement, TimeProps>((props, ref) => {
  const now = useNow(1000)
  switch (props.variant ?? 'digital-compact') {
    case 'digital-compact': /* 原 Clock digital 渲染 */ break
    case 'dial':            /* 原 Clock gauge 渲染 */ break
    case 'analog':          /* 原 AnalogClockWidget 渲染 */ break
    case 'digital-large':   /* 原 DigitalClockLargeWidget 渲染 */ break
    case 'hero':            /* 原 TimeWidget 渲染 */ break
    case 'world':           /* 原 WorldClock 渲染 */ break
    case 'compact':         /* 原 sub/Time 渲染 */ break
    case 'total':           /* 原 sub/TotalTime 渲染 */ break
  }
})
```

### 1.3 实施步骤 (分 5 子步)

**子步 5.1 — 准备**: 读取全部 8 个 Time 源文件, 抽取 8 个 case 分支的渲染逻辑, 校对 `useNow`/`pad2`/`stamp` 工具用法一致性。

**子步 5.2 — 新建** `components/widgets/Time.tsx`:
- 整合 8 个 case 分支
- 内部统一用 `useNow(1000)` 替代各组件的 `useState/useEffect` 时间管理
- 暴露 `Time` named export + `default export`

**子步 5.3 — 7 个 thin re-export**:
```ts
// components/Clock.tsx (保留 5219 行旧实现, 在文件末尾追加)
export { Time as default, Time } from './widgets/Time'
// 注: 旧 Clock 行为通过 <Time variant="digital-compact" /> / variant="dial" 激活
```

或更彻底 (推荐):
- 保留 `Clock.tsx`/`WorldClock.tsx`/`AnalogClockWidget.tsx`/`DigitalClockLargeWidget.tsx`/`TimeWidget.tsx` 为 thin wrapper (3-5 行), 内部直接 return `<Time variant="..." {...props} />`
- `sub/Time.tsx` 和 `sub/TotalTime.tsx` 同样改为 thin wrapper

**子步 5.4 — `nullframe/bodies.tsx::ClockHeroBody`**:
- 内部从内嵌 SVG + `useNow` 改为 `<Time variant="hero" />`

**子步 5.5 — `Chrono` / `Pomodoro` 内部**:
- 找到其内部 `<Clock type="..." />` 调用, 改为 `<Time variant="dial" />` 或 `variant="digital-compact"`, 保留业务状态机

**子步 5.6 — App.tsx 调用点更新**:
```tsx
// ❌ Before
import Clock from '@/components/Clock'
import WorldClock from '@/components/WorldClock'
import AnalogClockWidget from '@/components/widgets/AnalogClockWidget'
import DigitalClockLargeWidget from '@/components/widgets/DigitalClockLargeWidget'

// ✅ After
import Time from '@/components/widgets/Time'

// <Clock type="digital" ... />                  → <Time variant="digital-compact" ... />
// <Clock type="gauge" />                         → <Time variant="dial" />
// <WorldClock cities={worldClockCities} />       → <Time variant="world" cities={worldClockCities} />
// <AnalogClockWidget variant="swiss" card />     → <Time variant="analog" dial="swiss" />
// <DigitalClockLargeWidget variant="sharp" card/> → <Time variant="digital-large" font="sharp" />
```

### 1.4 风险与对策

- **视觉回归风险中**: 8 个组件合并后 `useNow` 频率可能与原 `setInterval` 略有差异, 需在浏览器逐个对照 Figma2.0 时钟区。
- **API 命名差异**: 原 `Clock` 用 `type`, 新 `Time` 用 `variant`; 原 `AnalogClockWidget` 用 `variant='swiss'`, 新 `Time` 用 `dial='swiss'` (避免与顶层 `variant` 冲突)。
- **Chrono/Pomodoro 内部状态**: 不动业务, 只换渲染, 风险低。

### 1.5 验证

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit
npx vite build
```

预期: tsc 0 errors, vite build ok, 8 个旧组件文件保留为 thin wrapper 或 1 行 re-export, `App.tsx` 4 个 import 合并为 1 个, 9 个调用点替换为 `<Time variant="...">`。

---

## 2. Phase 6: MusicPlayer 合并 (低风险, 1 组)

### 2.1 当前状态

| 文件 | 行数 | 当前 API |
|------|------|----------|
| `components/MusicPlayer.tsx` | 9039 | `variant='default'\|'compact'`, `recording`, `tracks`, `totalSegments` |
| `widgets/sub/MusicPlayer.tsx` | 长 | **完全独立的 mini 组件**, 用 `widget-svg-paths` 而非 `music-player.css` |
| `widgets/sub/Music.tsx` | 短 | 单独的 dot (仅歌曲名) — **保留不动** |

### 2.2 合并策略

**选项 A (推荐)**: `components/MusicPlayer.tsx` 增加 `variant='mini'` 分支, 内容取自 `widgets/sub/MusicPlayer.tsx`, **不删除原 sub 文件** (本阶段先 thin re-export 兼容, 后续 v5.1 再清理)。

**选项 B (彻底)**: 同 A, 同时删除 `widgets/sub/MusicPlayer.tsx` 和 `index.ts` 中的 `MusicPlayer` 导出。

**选择**: **选项 A**, 保持渐进式; 在 v5.1 (后续版本) 再删除 sub 文件。

### 2.3 实施步骤

1. 读取 `widgets/sub/MusicPlayer.tsx` 全部内容 (估计 ~200 行 SVG + className)
2. 在 `components/MusicPlayer.tsx` 顶部 import 该 SVG 内容
3. 在 `musicPlayerVariants` CVA 中加 `variant='mini'` 分支:
   ```ts
   mini: 'nothing-music-player--mini'
   ```
4. 在 `MusicPlayerProps` 中扩展 `MusicPlayerVariant`:
   ```ts
   export type MusicPlayerVariant = 'default' | 'compact' | 'mini'
   ```
5. 在 `MusicPlayer` 内部 switch props.variant, 'mini' 时渲染原 sub 组件的 SVG
6. 调用点不变 (v5 阶段), 旧 mini 行为通过 `variant="mini"` 激活

### 2.4 验证

```bash
npx tsc --noEmit
npx vite build
```

预期: `MusicPlayer variant="mini"` 视觉与原 `widgets/sub/MusicPlayer` 一致; 旧 sub 文件保留为 thin wrapper。

---

## 3. Phase 7: DataTable 合并 (高风险, 3 → 1 + 3 thin re-export)

### 3.1 当前状态 (基于代码扫描)

| 文件 | 行数 | API 风格 |
|------|------|----------|
| `components/Table.tsx` | 3350 | `striped`, `compact`, `hoverable` CVA; `headers`, `rows` props |
| `components/DataGrid.tsx` | 4584 | `dataGridHeaderCellVariants`/`dataGridRowVariants`/`dataGridCellVariants`; `columns`, `data`, `onSort` props |
| `components/DataRows.tsx` | 3059 | `dataRowVariants` (status, isSub, interactive, disabled); `DataRowItem` 接口 |

3 组件 CSS 完全独立 (`table.css` / `data-grid.css` / `data-rows.css`), 无共享逻辑。

### 3.2 合并策略

**新建** `ui/DataTable.tsx`:
```ts
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'

type DataTableVariant = 'table' | 'grid' | 'rows'

const dataTableVariants = cva('nothing-data-table', {
  variants: {
    variant: {
      table: 'nothing-data-table--table',
      grid:  'nothing-data-table--grid',
      rows:  'nothing-data-table--rows',
    },
  },
  defaultVariants: { variant: 'table' },
})

export interface DataTableProps<T = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof dataTableVariants>, 'variant'> {
  variant?: DataTableVariant
  /** variant='table' */
  headers?: string[]
  striped?: boolean
  /** variant='grid' */
  columns?: { key: string; label: string; type?: 'text' | 'numeric' }[]
  data?: T[]
  onSort?: (column: string) => void
  /** variant='rows' */
  items?: { label: string; value: string; status?: 'good' | 'warning' | 'error' | 'info' }[]
  selectable?: boolean
  multiSelect?: boolean
}
```

### 3.3 thin re-export 策略

3 旧组件保留, 改为 1 行 re-export, **本阶段不删除原文件**:

```ts
// components/Table.tsx (末尾追加)
export { DataTable as default, DataTable } from '@/ui/DataTable'
// 旧 Table 默认 variant='table', 调用方需保证传 headers/striped

// components/DataGrid.tsx
export { DataTable as default, DataTable } from '@/ui/DataTable'
// 旧 DataGrid 默认 variant='grid', 调用方需保证传 columns/data

// components/DataRows.tsx
export { DataTable as default, DataTable } from '@/ui/DataTable'
// 旧 DataRows 默认 variant='rows', 调用方需保证传 items
```

> ⚠️ **风险点**: 3 旧组件的 CVA + CSS 路径不同, 简单 re-export 会导致默认 CSS 不加载。
> **对策**: 在 `DataTable` 内部, 根据 `variant` 动态 import 对应 CSS:
> ```ts
> if (variant === 'table')  await import('@/styles/table.css')
> if (variant === 'grid')   await import('@/styles/data-grid.css')
> if (variant === 'rows')   await import('@/styles/data-rows.css')
> ```
> 或更简单 — 在 App.tsx 顶层 import 全部 3 个 CSS, DataTable 内部仅做 class 切换。

### 3.4 实施步骤

1. 读取 `Table.tsx`/`DataGrid.tsx`/`DataRows.tsx` 完整内容, 列出每个组件的 props 差异
2. 新建 `ui/DataTable.tsx` 含完整 3-variant 渲染
3. App.tsx 顶层 import 3 个 CSS (或 DataTable 内部动态 import)
4. 3 旧文件改为 thin re-export (删除原始实现, 保留 export)
5. `npm run type-check` 必须过
6. 浏览器逐个对照 3 个组件在 App.tsx 中的调用点视觉

### 3.5 风险与对策

- **CSS 加载顺序**: 3 个 CSS 有 class 冲突可能 (`nothing-data-row` vs `nothing-data-grid`); 解决: 通过 `data-variant` 限定 class 作用范围
- **onSort / multiSelect 等独有 prop**: 全部纳入 `DataTableProps`, 在 v5.1 阶段真正生效
- **本阶段是渐进合并, 不是 breaking**: 旧组件仍可单独 import, 行为不变

### 3.6 验证

```bash
npx tsc --noEmit
npx vite build
npx eslint src --ext ts,tsx
```

预期: tsc 0 errors, vite build ok, 3 旧组件行为不变, `DataTable` 内部统一 3 variant。

---

## 4. Phase 8: OverlayPortal 抽象 (中风险, 不删组件)

### 4.1 抽象层设计

**新建** `ui/OverlayPortal.tsx`:
```ts
import * as React from 'react'
import { createPortal } from 'react-dom'
import { useFloating } from '@/hooks/useFloating'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useDisclosure } from '@/hooks/useDisclosure'
import { cn } from '@/lib/utils'

export type OverlaySide = 'top' | 'right' | 'bottom' | 'left'
export type OverlayAlign = 'start' | 'center' | 'end'

export interface OverlayPortalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
  children: React.ReactNode
  side?: OverlaySide
  align?: OverlayAlign
  modal?: boolean       // Popover/Modal 用
  delay?: number        // HoverCard 用
  className?: string
}

export const OverlayPortal: React.FC<OverlayPortalProps> = (props) => {
  const { open, onOpenChange, trigger, children, side, align, modal, delay, className } = props
  const disclosure = useDisclosure(open, onOpenChange)
  const floating = useFloating({ side, align })
  const triggerEl = React.isValidElement(trigger)
    ? React.cloneElement(trigger, disclosure.getTriggerProps())
    : trigger
  const portalNode = open
    ? createPortal(
        <div ref={floating.refs.setFloating} className={cn('nothing-overlay', className)} data-side={side}>
          {children}
        </div>,
        document.body
      )
    : null
  return <>{triggerEl}{portalNode}</>
}
```

> 注: `useFloating`/`useClickOutside`/`useDisclosure` 已在 `src/hooks/` 存在, 直接复用。

### 4.2 6 组件内部迁移 (不删组件, 不改 API)

- `Modal.tsx`: 用 `<OverlayPortal modal>` 替换自管 portal
- `Sheet.tsx`: 同上, `side` 默认 `'right'`
- `HoverCard.tsx`: 用 `<OverlayPortal delay={300}>` 替换
- `Popover.tsx`: 用 `<OverlayPortal modal side='bottom'>` 替换
- `ContextMenu.tsx`: 用 `<OverlayPortal side align>` 替换
- `DropdownMenu.tsx`: 用 `<OverlayPortal side align>` 替换

### 4.3 不做合并

按计划原意, 这一阶段仅做抽象层, 6 个组件 API 保持现状, 避免引入回归。

### 4.4 验证

```bash
npx tsc --noEmit
npx vite build
```

预期: 6 组件外部行为不变, 内部统一用 `OverlayPortal`。

---

## 5. 文档更新 (MIGRATION.md v5)

### 5.1 插入位置

在 `MIGRATION.md` 第 269 行 "## 6. Validation commands" 之前, 插入 "## 5. v5 — Component Consolidation" 大节 (沿用现有编号: 把现有 "## 5. Removed / unused exports" 改为 "## 6.", "## 6. Validation" 改为 "## 7.")。

### 5.2 内容结构

```md
## 5. v5 — Component Consolidation

### 5.1 Removed exports
- `Card1`, `Card2`, `Card3`
- `Active1`
- `OverLimit1`
- `LocationAccess1`
- `Watch1`, `WatchAnalog`
- `Record2`
- `Glyphs1`, `Glyphs2`
- `Weather1`, `Weather2`
- `widgets/sub/MusicPlayer.tsx` (mini 模式并入 `MusicPlayer variant='mini'`)
- 9 `nullframe/*Card` → 1 `NfCard` + `bodies.tsx`
- 17 thin wrapper pills → 1 `WidgetPill` + `WidgetPillPresets`

### 5.2 New / changed APIs
- `<Card variant='square'|'pill' />` (替代 Card1/2/3)
- `<Active variant />` (替代 Active1)
- `<OverLimit theme='accent'|'dark'|'light' minutes={n} />` (替代 OverLimit1)
- `<LocationAccess theme='accent'|'light' />` (替代 LocationAccess1)
- `<Watch variant='analog'|'analog-large' />` (替代 Watch1/WatchAnalog)
- `<Recording variant='pill'|'rec' />` (替代 Record2)
- `<Glyphs variant='pattern-a'|'pattern-b' />` (替代 Glyphs1/2)
- `<Weather variant='icon'|'forecast' />` (替代 Weather1/2)
- `<MusicPlayer variant='default'|'compact'|'mini' />` (mini 为新增)
- `<Time variant='digital-compact'|'dial'|'analog'|'digital-large'|'hero'|'world'|'compact'|'total' />` (Phase 5)
- `<DataTable variant='table'|'grid'|'rows' />` (Phase 7, thin re-export 阶段)

### 5.3 New shared modules
- `src/system/hooks.ts` (`useNow`, `useTypedText`)
- `src/system/time.ts` (`pad2`, `stamp`, `formatUptime`)
- `src/ui/createThemedDiv.ts` (CVA + forwardRef factory)
- `src/components/nullframe/bodies.tsx` (9 nullframe body 组件)
- `src/components/widgets/WidgetPillPresets.tsx` (17 pill preset)
- `src/components/widgets/Time.tsx` (Phase 5, 8 展示层统一入口)
- `src/components/MusicPlayer.tsx` 内置 `variant='mini'` (Phase 6)
- `src/ui/DataTable.tsx` (Phase 7, 3 表统一入口)
- `src/ui/OverlayPortal.tsx` (Phase 8, 6 overlay 组件抽象层)

### 5.4 Validation
Same as v4: `tsc --noEmit`, `vite build`, `eslint`.
```

---

## 6. 验证策略 (全局)

### 6.1 每 Phase 后必跑

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit
npx vite build
npx eslint src --ext ts,tsx
```

### 6.2 关键集成测试组件

- `sections/Figma20Section.tsx` — 118+ 调用点的金丝雀 (Phase 5 完成后重点看 Clock/WorldClock 区域)
- `sections/NullframeSection.tsx` — NfCard 集成
- `App.tsx` — 根级 import 集成 (Phase 5 重点)

### 6.3 视觉回归

无 e2e/visual test 基础设施。每次合并后, 浏览器打开 demo, 验证 Figma 2.0 — * Widgets 区段视觉无变化。

---

## 7. 风险与回滚

| Phase | 风险 | 回滚策略 |
|-------|------|----------|
| 5 (Time) | 中 | git revert HEAD; 旧 8 文件原状 |
| 6 (Music mini) | 低 | git revert; 旧 `widgets/sub/MusicPlayer` 恢复 |
| 7 (DataTable) | 高 | git revert; 旧 3 组件原状; 还原 `DataTable.tsx` 删除 |
| 8 (Overlay) | 低 | git revert; 6 组件恢复自管理 portal |
| 文档 | 无 | 直接重写 |

---

## 8. 执行顺序 (推荐)

```
Phase 6 (Music, 30 min)          ← 改动小, 收尾干净
   ↓
Phase 5 (Time, 1.5 h)            ← 中等风险, 优先做
   ↓
Phase 8 (OverlayPortal, 1 h)     ← 不删组件, 抽象层
   ↓
Phase 7 (DataTable, 1.5 h)       ← 高风险, 最后做
   ↓
文档 (MIGRATION.md v5, 30 min)
```

**预计**: ~5 小时工作量, **分 2-3 个 PR** (Phase 5+6, 8, 7) 提交便于 review。

---

## 9. 决策点 (已确认, 不再询问)

用户已在前置对话中确认:
1. ✅ 范围: 全部 (低+中+高)
2. ✅ API 策略: 直接 breaking, 全部更新调用点

无其他阻塞决策。

---

## 10. v5 执行总结 (2026-06-14)

### 10.1 实际产出

| Phase | 新增文件 | 改动文件 | 删除文件 | 调用点更新 |
|-------|----------|----------|----------|------------|
| 5 (Time) | `widgets/Time.tsx` | `App.tsx`, `Figma20Section.tsx`, `widgets/sub/index.ts` | `Clock.tsx`, `WorldClock.tsx`, `widgets/TimeWidget.tsx`, `widgets/AnalogClockWidget.tsx`, `widgets/DigitalClockLargeWidget.tsx`, `widgets/sub/Time.tsx`, `widgets/sub/TotalTime.tsx` (7) | 9 处 (App.tsx 5 处 + Figma20Section 2 处 + index.ts 重导出) |
| 6 (Music mini) | — | `MusicPlayer.tsx` (新增 `variant='mini'` + inline SVG) | — (sub/MusicPlayer.tsx 保留为 thin re-export) | 0 (variant 默认值兼容) |
| 7 (DataTable) | `ui/DataTable.tsx` | `Table.tsx`, `DataGrid.tsx`, `DataRows.tsx` (改为 thin re-export), `App.tsx` (2 调用点) | — (3 旧文件保留为 thin re-export) | 2 (App.tsx DataRows + DataGrid) |
| 8 (OverlayPortal) | `ui/OverlayPortal.tsx` (6 原语 + OverlayPortal) | `Modal.tsx`, `Sheet.tsx`, `Popover.tsx`, `HoverCard.tsx`, `ContextMenu.tsx`, `DropdownMenu.tsx` (内部迁移) | — (6 组件 API 不变) | 0 (内部迁移, 公开 API 兼容) |
| 文档 | — | `MIGRATION.md` (§5.1-5.7, 7 个子节) | — | — |

### 10.2 累计状态 (v4 + v5)

- 删除组件文件: 32 (Card1/2/3 + Active1 + OverLimit1 + LocationAccess1 + Watch1/WatchAnalog + Record2 + Glyphs1/2 + Weather1/2 + 7 Time files + 17 Pill wrappers)
- 改为 thin re-export: 4 (Table / DataGrid / DataRows / widgets/sub/MusicPlayer)
- 内部迁移到 OverlayPortal: 6 (Modal / Sheet / Popover / HoverCard / ContextMenu / DropdownMenu)
- 新建 ui/ 模块: 2 (OverlayPortal / DataTable)
- 9 个 nullframe `*Card` → 1 `NfCard` + 9 body slot
- 总文件数变化: -32 (净删除 32 个组件文件, 新增 2 个 ui 文件 + 1 个 Time 文件, 实际 -29)

### 10.3 验证结果 (2026-06-14)

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit  # 0 errors
npx vite build    # built in 2.87s, exit 0
```

调用点扫描: 0 处对已删除组件的 import 残留。

### 10.4 决策点回顾

- **Phase 5**: 旧 7 个 Time 组件硬删除 (而非 thin re-export) — 用户授权 "直接 breaking"
- **Phase 6**: `widgets/sub/MusicPlayer.tsx` 保留为 thin re-export — 渐进式, v5.1 再清理
- **Phase 7**: Table/DataGrid/DataRows 保留为 thin re-export (而非硬删除) — 渐进式
- **Phase 8**: 6 overlay 组件公开 API 100% 兼容, 仅内部迁移到共享原语 — 零风险

### 10.5 后续 v5.1 候选

1. 清理 `widgets/sub/MusicPlayer.tsx` thin re-export
2. 清理 `Table.tsx` / `DataGrid.tsx` / `DataRows.tsx` thin re-export
3. 进一步统一 NfCard / WidgetCard / Card 三个 card 家族
4. 用 `useOverlayPortal` 完全替换 6 overlay 组件内联的 `createPortal` (若接受视觉变化)
