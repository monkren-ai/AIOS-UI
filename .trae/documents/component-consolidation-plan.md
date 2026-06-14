# 合并、梳理功能类似的组件 — 实施计划

> **范围**: 全部 (低+中+高, ~32 文件)
> **API 策略**: 直接 breaking, 全部更新调用点 (无 deprecation alias)
> **目标**: 138 个 .tsx → 约 100 个, 减少 ~4000 行重复代码
> **参考分析**: `c:\Users\monkr\Documents\github\Nothing UI\.trae\documents\component-consolidation-analysis.md`

---

## 0. 准备

### 0.1 目录创建

```
src/
├── system/                    # 新建：跨组件共享的 hooks & utilities
│   ├── hooks.ts              # useNow, useTypedText, useEnterAnimation
│   ├── time.ts               # pad2, stamp, formatUptime
│   └── icons.ts              # icon registry, theme/size token mapping
├── ui/                        # 新建：通用 UI primitives
│   ├── createThemedDiv.ts    # 工厂函数: CVA + forwardRef + data-* attr 模板
│   ├── DotPattern.tsx        # 升级版 DotMatrix: 接受 pattern 数组
│   └── Slot.tsx              # 已有, 不变
└── ...
```

### 0.2 验证基线 (开始前记录)

```bash
npx tsc --noEmit --incremental false      # 期望: 0 errors
npx vite build                            # 期望: ok
npx eslint src --ext ts,tsx               # 期望: 0 errors, ~132 warnings
```

---

## 1. Phase 1: 抽取共享基础设施 (低风险, 0 文件删除)

> **目标**: 先把可复用的底层打好, 后面的合并直接调用, 不重复造轮子。

### 1.1 新建 `src/system/hooks.ts`

```ts
/** 每 N 毫秒触发更新, 返回 Date 对象。 */
export function useNow(intervalMs = 1000): Date

/** 打字机/擦除循环文本, 用于 ActivityCard commit feed / ClockHero TypedStatus。 */
export function useTypedText(opts: {
  messages: string[]
  typeMs?: number   // 默认 60
  holdMs?: number   // 默认 1400
  eraseMs?: number  // 默认 30
}): { current: string; isErasing: boolean }
```

**涉及替换**:
- `nullframe/ActivityCard.tsx` 的内联 `useTypedText` (commit feed)
- `nullframe/ClockHero.tsx` 的内联 `TypedStatus` (~40 行)
- `Clock.tsx`, `WorldClock.tsx`, `widgets/TimeWidget.tsx`, `widgets/AnalogClockWidget.tsx`, `nullframe/ClockHero.tsx` 的 `useEffect(setInterval)` (~25 行 × 5)

### 1.2 新建 `src/system/time.ts`

```ts
export function pad2(n: number): string                // 0 → "00"
export function stamp(d: Date, sep = ':'): string      // 12:34:56
export function formatUptime(ms: number): string       // 16H 32M
```

**替换**: `nullframe/ActivityCard.tsx` 和 `nullframe/ClockHero.tsx` 内的本地实现。

### 1.3 新建 `src/ui/createThemedDiv.ts`

```ts
type ThemedDivOptions<C extends string> = {
  name: string
  variants: { [K in C]: string }
  defaultVariants: Partial<Record<C, string>>
  baseClass?: string
}

export function createThemedDiv<VP extends Record<string, Record<string, string>>>(
  opts: ThemedDivOptions<string> & { variants: VP }
): React.ForwardRefExoticComponent<...>
```

**作用**: 一行调用替代 13 行的 `cva + forwardRef + cn + data-attr` 样板。**暂不应用** (留待 Phase 2/3 合并时按需使用)。

### 1.4 验证

```bash
npx tsc --noEmit --incremental false
npx eslint src --ext ts,tsx
```
**预期**: 0 errors, warnings 数不变 (因为只新增文件, 不改旧文件)。

---

## 2. Phase 2: 完全重复组件合并 (8 组, 12 文件 → 4 文件)

> **原则**: 合并后的 component 接受 `image` / `icon` / `label` / `theme` / `variant` 等 prop, 旧组件从 export map 中删除。

### 2.1 Card 系列

| Before | After |
|--------|-------|
| `widgets/sub/Card.tsx` (Card + Card1) | `widgets/sub/Card.tsx` (单一 Card) |
| `widgets/sub/Card2.tsx` | 删除 |
| `widgets/sub/Card3.tsx` | 删除 |

**新 API**:
```ts
interface CardProps extends WidgetSubProps {
  image?: string | { src: string; rounded?: 'rounded-16' | 'rounded-pill'; className?: string }
  variant?: 'square' | 'pill'
}
```

**实现策略**: `Card.tsx` 保留, 删除 `Card1` 内部 export, 删除 `Card2.tsx` 和 `Card3.tsx`。`Card3` 的 pill 形态通过 `variant="pill"` 区分。

**导出更新**:
- `widgets/WidgetSubComponents.tsx`: 删除 `Card2`, `Card3`, `Card1` 导出; 仅 `Card`。
- `Figma20Section.tsx`: `Card2`, `Card3`, `Card1 as FigmaCard1` 替换为 `Card` + `image`/`variant` props。

### 2.2 Active 系列

| Before | After |
|--------|-------|
| `widgets/sub/Active.tsx` (Active) | `widgets/sub/Active.tsx` (单一 Active) |
| `widgets/sub/Active1.tsx` (Active1) | 删除 |

**新 API**:
```ts
interface ActiveProps extends WidgetSubProps {
  icon?: 'plane' | 'dot'  // 调 svgPaths
  label?: string
}
```
默认 `icon='plane'`, `label='Active'`, 覆盖 `Active1` 的 `'Aeroplane mode'`。

### 2.3 OverLimit 系列

| Before | After |
|--------|-------|
| `widgets/sub/OverLimit.tsx` (OverLimit + Overlimit) | `widgets/sub/OverLimit.tsx` (单一 OverLimit) |
| `widgets/sub/OverLimit1.tsx` (OverLimit1) | 删除 |

**新 API**: `theme?: 'accent' | 'light'` (默认 `accent`)。

### 2.4 LocationAccess 系列

| Before | After |
|--------|-------|
| `widgets/sub/LocationAccess.tsx` (LocationAccess) | `widgets/sub/LocationAccess.tsx` (单一) |
| `widgets/sub/LocationAccess1.tsx` (LocationAccess1) | 删除 |

**新 API**: `icon?: string` (svg path key) + `label?: string`。

### 2.5 Watch 系列

| Before | After |
|--------|-------|
| `widgets/sub/Watch1.tsx` (Watch1) | `widgets/sub/Watch.tsx` (重命名) |
| `widgets/sub/WatchAnalog.tsx` | 删除 |

**新 API**: `variant?: 'digital' | 'analog'` (默认 `digital`)。

### 2.6 Record 系列

| Before | After |
|--------|-------|
| `widgets/sub/Recording.tsx` (Recording) | `widgets/sub/Recording.tsx` (单一) |
| `widgets/sub/Record2.tsx` (Record2) | 删除 |

**新 API**: `variant?: 'mic' | 'red'`。

### 2.7 Glyphs 系列

| Before | After |
|--------|-------|
| `widgets/sub/Glyphs1.tsx` (Glyphs1) | `widgets/sub/Glyphs.tsx` (重命名) |
| `widgets/sub/Glyphs2.tsx` (Glyphs2) | 删除 |

**新 API**: `variant?: 'pattern-a' | 'pattern-b'`。

### 2.8 Weather 系列

| Before | After |
|--------|-------|
| `widgets/sub/Weather1.tsx` (Weather1) | `widgets/sub/Weather.tsx` (重命名) |
| `widgets/sub/Weather2.tsx` (Weather2) | 删除 |

**新 API**: `variant?: 'icon' | 'forecast'`, `width?: 152 | 226`。

### 2.9 验证

```bash
npx tsc --noEmit
npx vite build
npx eslint src --ext ts,tsx
npx vite build   # 关键: 验证 Figma20Section.tsx 等所有调用点已更新
```
**预期**: 0 errors, 113 组件 (减少 8 文件, 9 个内部 export 减少为 1 个)。

### 2.10 调用点更新清单

需要在 `Figma20Section.tsx` 和 `WidgetSubComponents.tsx` 中:
- 删除 import: `Card1, Card2, Card3, Active1, OverLimit1, LocationAccess1, Watch1, WatchAnalog, Record2, Glyphs1, Glyphs2, Weather1, Weather2` (其中 8 个直接删除文件, 5 个从同文件清理)
- 替换 import: 重命名后的 `Card, Active, OverLimit, LocationAccess, Watch, Recording, Glyphs, Weather`
- 调整 prop 用法 (加 `variant` / `image` / `theme` 等)

---

## 3. Phase 3: WidgetPills 薄壳清理 (1 文件, 17 函数 → 1 工厂)

### 3.1 删除 `widgets/WidgetPills.tsx` 中所有薄壳

**Before** (17 个函数, ~280 行):
```tsx
export function MobileData({ theme='light', ... }) { return <WidgetPill icon={...} label="Mobile Data" /> }
export function BatteryShare({ theme='light', ... }) { return <WidgetPill icon={...} label="Battery Share" /> }
// ... × 15
```

**After** (1 个图标注册表 + 1 个工厂):
```tsx
// widgets/WidgetPillRegistry.ts
import svgPaths from './widget-svg-paths'
import { SvgIcon } from './SvgIcon'

export const WIDGET_PILLS = {
  mobileData:    { icon: <SvgIcon path={svgPaths.p2bea2300} />, label: 'Mobile Data',     theme: 'light' },
  batteryShare:  { icon: <SvgIcon path={svgPaths.p105235f0} />, label: 'Battery Share',   theme: 'light' },
  // ... 15 more
} as const
```

**API**:
```tsx
// consumers 改用:
<WidgetPill icon={WIDGET_PILLS.mobileData.icon} label={WIDGET_PILLS.mobileData.label} />
// 或更简单:
<WidgetPill preset="mobileData" />
```

**第二种方案 (推荐)**: 直接给 `WidgetPill` 加 `preset` prop:
```tsx
// WidgetPill.tsx
type PillPreset = keyof typeof WIDGET_PILL_PRESETS

interface WidgetPillProps extends WidgetSubProps {
  preset?: PillPreset
  icon?: React.ReactNode
  label?: string
}
```

### 3.2 验证

```bash
npx tsc --noEmit
npx vite build
```
**预期**: `WidgetPills.tsx` 完全删除 (或变为纯注册表); 17 函数 → 1 组件; Figma20Section.tsx 更新为 `<WidgetPill preset="..." />`。

### 3.3 调用点更新清单

`Figma20Section.tsx` 第 2 行:
```tsx
// ❌ Before
import { MobileData, BatteryShare, ..., Bluetooth } from '../components/widgets/WidgetPills'

// ✅ After
import WidgetPill from '@/components/widgets/WidgetPill'
import { WIDGET_PILL_PRESETS } from '@/components/widgets/WidgetPillRegistry'

// 替换 <MobileData ... /> 为 <WidgetPill preset="mobileData" ... />
```

---

## 4. Phase 4: Nullframe 9 个 *Card → NfCard + variant (8 文件删除)

> **核心观察**: 所有 `*Card` 都包了同一个 `NfCard` 布局 (label/right/tag/index/motion), 仅 inner body 不同。

### 4.1 抽取 `NfCard` body slot API

**Before**:
```tsx
// nullframe/ActivityCard.tsx
export const ActivityCard = React.forwardRef(...) => (
  <NfCard index={0} label="Activity" tag="LIVE" right={...}>
    <div className="...">...40 行 commit feed...</div>
  </NfCard>
)
```

**After**:
```tsx
// nullframe/NfCard.tsx 新增 body prop
interface NfCardProps extends React.HTMLAttributes<HTMLElement> {
  index?: number
  label?: string
  tag?: 'LIVE' | 'SIM' | string
  right?: React.ReactNode
  body?: React.ReactNode  // 新增: 由 *Card 传入
  variant?: 'activity' | 'battery' | 'streak' | 'memory' | 'network' | 'seismo' | 'contributions' | 'glyph' | 'render'
  // 其余 props
}
```

**实施**:
- `NfCard.tsx` 内部根据 `variant` 渲染对应 body (或消费者传 `body` prop, `variant` 仅用于 `data-variant`)。
- 8 个 `*Card` 文件被替换为 `NfCard variant="activity" ...` 调用 + 各 body 子模块 (`ActivityBody.tsx`, `BatteryBody.tsx` 等)。

### 4.2 Body 子模块

新建 `nullframe/bodies/` 目录:
```
bodies/
├── ActivityBody.tsx
├── BatteryBody.tsx
├── StreakBody.tsx
├── MemoryBody.tsx
├── NetworkBody.tsx
├── SeismoBody.tsx
├── ContributionsBody.tsx
├── GlyphBody.tsx
├── RenderBody.tsx
└── index.ts
```

每个 body 接收与原 `*Card` 相同的 props, 仅返回 body 元素本身 (不再包 NfCard)。

### 4.3 验证

```bash
npx tsc --noEmit
npx vite build
```
**预期**: 删除 8 个 `*Card.tsx`, 新增 9 个 `*Body.tsx` + 1 个 NfCard 扩展; 净减少 ~600 行; NullframeSection.tsx 改为 `<NfCard variant="activity" ... />` 或 `<NfCard body={<ActivityBody ... />} ... />`。

---

## 5. Phase 5: Time/Clock 集群合并 (12 → 4 文件)

### 5.1 抽取 `useNow` (Phase 1 已做)

### 5.2 合并根级时间组件

| Before | After |
|--------|-------|
| `Clock.tsx` | `widgets/Time.tsx` (variant='digital-large' \| 'digital-compact' \| 'dial') |
| `WorldClock.tsx` | 同上 variant='world' (接收 `timezones: string[]`) |
| `Chrono.tsx` | 同上 variant='stopwatch' (state='running'\|'paused'\|'idle') |
| `Pomodoro.tsx` | 同上 variant='pomodoro' (state, duration) |
| `widgets/TimeWidget.tsx` | 同上 variant='hero' |
| `widgets/AnalogClockWidget.tsx` | 同上 variant='analog-large' |
| `widgets/DigitalClockLargeWidget.tsx` | 同上 variant='digital-large' |
| `widgets/sub/Time.tsx` | 移入主 Time, variant='compact' |
| `widgets/sub/TotalTime.tsx` | 同上 variant='total' |
| `nullframe/ClockHero.tsx` | 同上 variant='hero' (移动) |

### 5.3 风险缓解

`Chrono` 和 `Pomodoro` 内部有非平凡的状态机 (start/pause/reset/countdown)。**不强行合并实现**, 而是:
- **共享 `Time` 作为"展示层"**: 处理所有 tick 渲染。
- **保留 `Chrono` 和 `Pomodoro` 作为"业务层"**: 调用 `Time` 组件, 不删除。
- 这样**减少 6 个文件 (根级 3 + widget 2 + sub 1), 保留 2 个有状态的文件**。

### 5.4 验证

```bash
npx tsc --noEmit
npx vite build
```

### 5.5 调用点更新清单

`App.tsx`:
```tsx
// Before
import Clock from '@/components/Clock'
import WorldClock from '@/components/WorldClock'
import Chrono from '@/components/Chrono'
import Pomodoro from '@/components/Pomodoro'
// ... AnalogClockWidget, DigitalClockLargeWidget, TimeWidget from widgets/*

// After
import { Time } from '@/components/widgets/Time'
// 替换所有 <Clock ... /> 为 <Time variant="digital-compact" ... />
```

---

## 6. Phase 6: Music 集群 (3 → 1) + Weather 集群 (3 → 1) + Battery (2 → 1)

### 6.1 MusicPlayer 合并

| Before | After |
|--------|-------|
| `MusicPlayer.tsx` (root, 大型播放器) | `MusicPlayer.tsx` (variant='full' \| 'mini' \| 'dot') |
| `widgets/sub/MusicPlayer.tsx` | 同上 variant='mini' |
| `widgets/sub/Music.tsx` | 同上 variant='dot' (仅显示 song name + dot 装饰) |

### 6.2 WeatherWidget 合并

| Before | After |
|--------|-------|
| `WeatherWidget.tsx` (root, 多 variant) | 保留, 扩展 variant 加 'icon' \| 'forecast' |
| `widgets/sub/Weather1.tsx` | 删除 (Phase 2 已合并) |
| `widgets/sub/Weather2.tsx` | 删除 (Phase 2 已合并) |

### 6.3 Battery 合并

| Before | After |
|--------|-------|
| `Battery.tsx` (root) | `Battery.tsx` (variant='segmented' \| 'ring' \| 'bar' \| 'compact' \| 'card') |
| `nullframe/BatteryCard.tsx` | 删除, 用 `Battery variant="card"` + NfCard wrap |

### 6.4 验证

每步后:
```bash
npx tsc --noEmit
npx vite build
```

---

## 7. Phase 7: DataGrid/DataRows/Table 合并 (3 → 1) [高风险]

### 7.1 API 收敛

**Before** (3 个不同 prop 集):
```tsx
<DataGrid columns={cols} rows={rows} onRowClick={...} />
<DataRows items={items} onSelect={...} />
<Table headers={h} rows={r} />
```

**After** (1 个统一 prop 集):
```tsx
<Table
  data={items}                              // 统一
  columns={cols}                            // DataGrid 用
  headers={h}                               // Table 用
  variant="grid" | "rows" | "table"         // 形态
  onRowClick={...}                          // DataGrid/DataRows 用
/>
```

### 7.2 公共抽象

新建 `src/ui/DataTable.tsx`:
- 内部统一处理 `data`, `columns` (含 header 提取)
- 内部用 `<DataRow>` 子组件处理 3 种 layout (grid / rows / table)
- `Table.tsx`, `DataGrid.tsx`, `DataRows.tsx` 变为 1-2 行的 re-export + variant default

### 7.3 风险

- `DataGrid` 当前有 `onSort`, `DataRows` 有 `multiSelect` 等独有功能, 合并时需要先冻结这些 feature。
- 失败回滚: `git revert HEAD~1` 即可。

### 7.4 验证

```bash
npx tsc --noEmit
npx vite build
```

---

## 8. Phase 8: Modal/Sheet/HoverCard/Popover/ContextMenu 合并 (6 → 2) [高风险]

### 8.1 抽 `OverlayPortal` primitive

新建 `src/ui/OverlayPortal.tsx`:
- 统一处理: portal target, focus trap, escape, outside-click
- 接收 `position: { side, align, offset }` prop

### 8.2 拆为两层

| 层 | 职责 | 文件 |
|----|------|------|
| 容器 (Portal + 行为) | OverlayPortal | `src/ui/OverlayPortal.tsx` |
| 表面 (CSS + 装饰) | `<DialogSurface>`, `<MenuSurface>` | `src/ui/surfaces/` |

| Before | After |
|--------|-------|
| `Modal.tsx` | `<DialogSurface variant="modal">` + `<OverlayPortal>` |
| `Sheet.tsx` | `<DialogSurface variant="sheet" side="...">` + `<OverlayPortal>` |
| `HoverCard.tsx` | `<DialogSurface variant="hover" delay>` + `<OverlayPortal>` |
| `Popover.tsx` | `<DialogSurface variant="popover">` + `<OverlayPortal>` |
| `ContextMenu.tsx` | `<MenuSurface>` + `<OverlayPortal>` |
| `DropdownMenu.tsx` | `<MenuSurface>` + `<OverlayPortal>` (也作为 `variant="menubar"` 的子分支) |

### 8.3 风险

- 6 个组件的 prop 集差异大 (Modal 有 `onOpenChange`, HoverCard 有 `openDelay`, Popover 有 `modal` flag)。
- **强烈建议**: 这一阶段**先冻结 API**, 实际合并**留作 v5**。本计划仅保留**抽象层** (`OverlayPortal`), 不删除 6 个组件。

### 8.4 折中方案 (推荐)

仅抽 `OverlayPortal`, 6 个组件内部迁移到使用 `OverlayPortal`, **不**强制合并, 改为**显式标注为 v5 candidate**。

---

## 9. 总览与文件计数

| 阶段 | 删 | 增 | 净变化 |
|------|----|----|--------|
| 1: 共享基础设施 | 0 | 3 (`system/hooks.ts`, `system/time.ts`, `ui/createThemedDiv.ts`) | +3 |
| 2: 完全重复合并 | 8 | 0 (原文件保留并扩展) | -8 |
| 3: Pill 薄壳 | 1 (`WidgetPills.tsx`) | 1 (Registry) | 0 |
| 4: Nullframe Cards | 8 | 9 (bodies) + 1 (NfCard ext) | +2 |
| 5: Time 集群 | 6 | 0 (复用 Time) | -6 |
| 6: Music/Weather/Battery | 3 | 0 (variant 扩展) | -3 |
| 7: DataTable | 2 | 1 (DataTable) | -1 |
| 8: Overlay 抽象 | 0 | 1 (OverlayPortal) | +1 |
| **合计** | **28** | **15** | **-13** |

**组件数变化**: 138 → ~125 (含新增 9 个 body 和 1 个 DataTable; 净减 ~13)。

**代码量变化**: 估计 -4000 行 (重复模板消失)。

---

## 10. 验证策略

### 10.1 每 Phase 后必跑

```bash
npx tsc --noEmit --incremental false
npx vite build
npx eslint src --ext ts,tsx
```

### 10.2 关键组件 build 验证

`Figma20Section.tsx`, `NullframeSection.tsx`, `App.tsx` 涉及大量组件, 是 118 个文件的事实集成测试。每次合并后**必须保证 build 通过**。

### 10.3 视觉回归

无 (没有 e2e/visual test 基础设施)。Figma20Section 是手动 visual check 起点。

### 10.4 回滚策略

每个 Phase 是独立的 git commit (推荐), 失败时 `git revert HEAD` 即可。

---

## 11. 风险与回滚

| Phase | 风险 | 回滚 |
|-------|------|------|
| 1 (infra) | 极低 | 删除新增 3 文件 |
| 2 (duplicates) | 低 | git revert; 旧名以 1 行 alias 即可恢复 |
| 3 (Pills) | 低 | git revert |
| 4 (Nullframe) | 中 | git revert; NfCard 加回原 props |
| 5 (Time) | 中 | git revert; 不影响业务层 Chrono/Pomodoro |
| 6 (Music/Weather/Battery) | 中 | git revert; 各组件保留 |
| 7 (DataTable) | 高 | git revert; 3 组件原状 |
| 8 (Overlay 抽象) | 中 | git revert; 仅抽 portal 不删 6 组件 |

---

## 12. 文档更新

合并完成后更新:
- `MIGRATION.md`: 增加 v5 章节, 列出每个合并组件的新 API + 删除的旧名。
- `SKILL.md`: 在 §8 加 "v5 Component Consolidation" 表格。
- `COMPONENTS.md`: 重写为 ~125 个组件的目录。

---

## 13. 执行顺序 (推荐)

```
Phase 1 (infra, 30 min)
   ↓
Phase 2 (8 groups, 1.5 h)
   ↓
Phase 3 (Pills, 30 min)
   ↓
Phase 4 (Nullframe, 2 h)  ← 最大块
   ↓
Phase 5 (Time, 1.5 h)
   ↓
Phase 6 (Music/Weather/Battery, 1 h)
   ↓
Phase 7 (DataTable, 1.5 h)
   ↓
Phase 8 (Overlay, 1 h)  ← 仅抽 portal, 不合并 6 组件
   ↓
文档 (30 min)
```

预计总耗时: ~10 小时工作量, **分 3-4 个 PR** (Phase 1-2, 3-4, 5-6, 7-8) 提交便于 review。
