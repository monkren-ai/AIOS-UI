# 合并、梳理功能类似的组件 — 续执行计划 v3

> **范围**: 全部 (低+中+高)
> **API 策略**: 直接 breaking, 全部更新调用点
> **状态**: 通过对比代码库与 v2 计划核对 — 已有 8 个 Phase 2 合并完成, 剩 Phase 2.8 (Weather) + Phase 5/6/7/8 + 文档
> **目标**: 完成所有剩余合并 + 文档化

---

## 0. 当前状态核对 (基于实际代码扫描)

| Phase | 内容 | 文件证据 | 状态 |
|-------|------|----------|------|
| 1 | `system/hooks.ts`, `system/time.ts`, `ui/createThemedDiv.ts` | `useNow`, `useTypedText`, `pad2`, `stamp` 已存在 | ✅ 完成 |
| 2.1 | `Card` (Card/Card1/Card2/Card3 → variant + image) | `widgets/sub/Card.tsx` 含 `variant: 'square'\|'pill'`, `IMAGE_PRESETS` | ✅ 完成 |
| 2.2 | `Active` (Active/Active1 → variant) | `widgets/sub/Active.tsx` | ✅ 完成 |
| 2.3 | `OverLimit` (+ `theme: 'accent'\|'dark'\|'light'`, `minutes`) | `widgets/sub/OverLimit.tsx` | ✅ 完成 |
| 2.4 | `LocationAccess` (+ `theme: 'accent'\|'light'`) | `widgets/sub/LocationAccess.tsx` | ✅ 完成 |
| 2.5 | `Watch` (Watch1/WatchAnalog → variant: 'analog'\|'analog-large') | `widgets/sub/Watch.tsx` | ✅ 完成 |
| 2.6 | `Recording` (Recording/Record2 → variant: 'pill'\|'rec') | `widgets/sub/Recording.tsx` | ✅ 完成 |
| 2.7 | `Glyphs` (Glyphs1/Glyphs2 → variant: 'pattern-a'\|'pattern-b') | `widgets/sub/Glyphs.tsx` | ✅ 完成 |
| 3 | `WidgetPill` + `WidgetPillPresets` (17 薄壳) | `WidgetPill.tsx`, `WidgetPillPresets.tsx` 已存 | ✅ 完成 |
| 4 | `NfCard` + `bodies.tsx` | `nullframe/NfCard.tsx`, `bodies.tsx` 已存 | ✅ 完成 |
| 2.8 | `Weather` (Weather1/Weather2 → variant) | **Weather1.tsx + Weather2.tsx 仍存在**, 未合并 | ❌ 待做 |
| 5 | Time 集群 (8 展示层 → 1 `Time`) | Clock/WorldClock/TimeWidget/Analog/Digital/Time/TotalTime/ClockHero 仍分散 | ❌ 待做 |
| 6 | Music/Weather/Battery 集群 | 组件存在但 Music/Weather/Battery 子组件未并入主组件 | ❌ 待做 |
| 7 | DataTable (3 → 1 + thin re-export) | `Table.tsx`/`DataGrid.tsx`/`DataRows.tsx` 仍独立 | ❌ 待做 |
| 8 | OverlayPortal 抽象 | `Modal`/`Sheet`/`HoverCard`/`Popover`/`ContextMenu`/`DropdownMenu` 自管 portal | ❌ 待做 |
| 文档 | MIGRATION.md v5 章节 | — | ❌ 待做 |

**遗留引用点 (破坏性更新目标)**:
- `sections/Figma20Section.tsx:3` 仍 import `Record2, Glyphs1, Glyphs2, Weather1, Weather2, OverLimit1, LocationAccess1, Watch1, WatchAnalog`
- `sections/Figma20Section.tsx:94, 99, 109, 119, 154` 仍使用旧名
- `widgets/sub/index.ts:13, 34` 仍 export `Weather1, Weather2`
- `App.tsx:2, 29, 33, 34` 仍 import `Clock`, `WorldClock`, `AnalogClockWidget`, `DigitalClockLargeWidget`
- `App.tsx:1013, 1152-1161` 仍使用旧名

---

## 1. Phase 2 收尾: Weather 合并 (1 组, 2 文件 → 1)

### 1.1 Weather 合并 (Weather1 + Weather2 → Weather + variant)

| Before | After |
|--------|-------|
| `widgets/sub/Weather1.tsx` (152 圆 + 太阳点阵) | 删除 |
| `widgets/sub/Weather2.tsx` (226×152 宽列 + 5 日预报) | 重命名为 `widgets/sub/Weather.tsx`, 加 `variant` |
| 无 `Weather.tsx` | 新文件 |

**新 API**:
```ts
export type WeatherVariant = 'icon' | 'forecast'
export type WeatherSize = 152 | 320

export interface WeatherProps extends WidgetSubProps {
  variant?: WeatherVariant
  size?: WeatherSize
}
```

**实施**:
1. 创建 `widgets/sub/Weather.tsx`:
   - 顶部 import Weather1 的 SVG (命名为 `WeatherIconSvg` 子组件)
   - 顶部 import Weather2 的 Frame29-Frame41 群组 (命名为 `WeatherForecast` 子组件)
   - `variant='icon'` (默认) → 渲染 `WeatherIconSvg` (152 圆 + 太阳点阵)
   - `variant='forecast'` → 渲染 `<Frame39><Frame35></Frame39></Frame35>` 结构 (226×152, 5 日预报)
2. 删除 `widgets/sub/Weather1.tsx`
3. 删除 `widgets/sub/Weather2.tsx`
4. 更新 `widgets/sub/index.ts`:
   - 删除 `export { Weather1 } from './Weather1'`
   - 删除 `export { Weather2 } from './Weather2'`
   - 添加 `export { Weather } from './Weather'`
5. 更新 `Figma20Section.tsx`:
   - import 去掉 `Weather1, Weather2`, 加 `Weather`
   - `<Weather1 />` → `<Weather variant="icon" />`
   - `<Weather2 ...>` → `<Weather variant="forecast" ... />`

**风险**: 低 — 与 Phase 2.1-2.7 模式完全一致, 内部 SVG 略大但无业务逻辑差异。

### 1.2 验证 (Phase 2 全部完成后)

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit --incremental false
npx vite build
npx eslint src --ext ts,tsx
```

预期: tsc 0 errors, vite build ok, 旧名 (Weather1/Weather2) 在 Figma20Section 中全部替换。

---

## 2. Phase 5: Time 集群合并 (中风险, 9 → 1 展示层 + 2 业务层保留)

### 2.1 当前分散点

| 文件 | 角色 | 大小 | 备注 |
|------|------|------|------|
| `components/Clock.tsx` | 展示: 数字 + gauge | ~150 行 | 内部用 `useState/useEffect` 跑秒 |
| `components/WorldClock.tsx` | 展示: 城市时间列表 | ~120 行 | props `cities: WorldClockCity[]` |
| `components/Chrono.tsx` | **业务**: 秒表 | ~100 行 | 内部状态机, 不合并 |
| `components/Pomodoro.tsx` | **业务**: 番茄钟 | ~120 行 | 内部状态机, 不合并 |
| `widgets/TimeWidget.tsx` | 展示: 多 variant | ~170 行 | 已有 `variant: 'recording'\|'default'` |
| `widgets/AnalogClockWidget.tsx` | 展示: 指针表 | ~250 行 | `variant: 'swiss'\|'minimalist'`, `card` 选项 |
| `widgets/DigitalClockLargeWidget.tsx` | 展示: 大数字 | ~80 行 | `variant: 'sharp'\|'serif'`, `showSeconds` |
| `widgets/sub/Time.tsx` | 展示: 子组件 | 已有 | 显示时间字符串 |
| `widgets/sub/TotalTime.tsx` | 展示: 子组件 | 已有 | 总计时间 |
| `nullframe/bodies.tsx::ClockHeroBody` | 展示: Hero 时间 | 已有 | 内嵌 + `useNow` |

**合并策略**: 新建 `components/widgets/Time.tsx`, 作为统一时间展示入口; `Chrono`/`Pomodoro` 保留, 但其内部渲染换为 `<Time variant="..." />`。

### 2.2 新 `Time` 组件设计

新建 `widgets/Time.tsx`:
```ts
import { useNow } from '../system/hooks'

export type TimeVariant =
  | 'digital-large'      // 原 DigitalClockLargeWidget (sharp/serif)
  | 'digital-compact'    // 原 Clock (digital)
  | 'dial'               // 原 Clock (gauge)
  | 'analog'             // 原 AnalogClockWidget (swiss/minimalist)
  | 'hero'               // 原 TimeWidget / ClockHero
  | 'compact'            // 原 sub/Time
  | 'total'              // 原 sub/TotalTime
  | 'world'              // 原 WorldClock

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
}

export const Time = React.forwardRef<HTMLDivElement, TimeProps>((props, ref) => {
  const now = useNow(1000)
  switch (props.variant) { ... }  // 8 case 分支
})
```

**实施细节**:
- 不删除原文件 (本阶段), 而是把它们的内容**搬迁**到 `Time.tsx` 的 8 个内部子函数, 然后:
  - 旧 `Clock.tsx` → 改为 1 行 `export { Time as default }` (不传 props, 默认 `variant='digital-compact'`)
  - 旧 `WorldClock.tsx` → 1 行 `export { Time as default }` (默认 `variant='world'`)
  - 旧 `TimeWidget.tsx` → 1 行 `export { Time as default }` (默认 `variant='hero'`)
  - 旧 `AnalogClockWidget.tsx` → 1 行 `export { Time as default }` (默认 `variant='analog'`)
  - 旧 `DigitalClockLargeWidget.tsx` → 1 行 `export { Time as default }` (默认 `variant='digital-large'`)
  - 旧 `sub/Time.tsx` → 1 行 `export { Time as default }` (默认 `variant='compact'`)
  - 旧 `sub/TotalTime.tsx` → 1 行 `export { Time as default }` (默认 `variant='total'`)
- `bodies.tsx::ClockHeroBody` 改为 `<Time variant="hero" />`
- `Chrono.tsx` 内部渲染改为 `<Time variant="dial" />` (保留业务状态)
- `Pomodoro.tsx` 内部渲染改为 `<Time variant="dial" />` (保留业务状态)

### 2.3 风险

- 8 个组件的视觉/字体细节可能略有差异, 合并后需要**逐个对照**还原。
- `WorldClock` 旧 API 用 `cities`, 新 API 统一用 `cities` (字段名一致, 字段类型需对照)。
- `Chrono`/`Pomodoro` 内部如果有自研的时间格式化逻辑, 移到 `Time` 后需保持视觉一致。

### 2.4 调用点更新 (重点: `App.tsx`)

`App.tsx`:
```tsx
// ❌ Before
import Clock from '@/components/Clock'
import WorldClock from '@/components/WorldClock'
import AnalogClockWidget from '@/components/widgets/AnalogClockWidget'
import DigitalClockLargeWidget from '@/components/widgets/DigitalClockLargeWidget'

// ✅ After
import Time from '@/components/widgets/Time'

// 替换:
//   <Clock />                                 → <Time variant="digital-compact" />
//   <WorldClock cities={worldClockCities} />  → <Time variant="world" cities={worldClockCities} />
//   <AnalogClockWidget variant="swiss" card /> → <Time variant="analog" dial="swiss" />
//   <DigitalClockLargeWidget variant="sharp" card /> → <Time variant="digital-large" font="sharp" />
```

### 2.5 验证

```bash
npx tsc --noEmit && npx vite build
```

预期: 8 个旧文件缩为 1 行 re-export, 视觉在 demo 中逐个对照 Figma2.0 时钟区无变化。

---

## 3. Phase 6: Music / Weather / Battery 集群 (中风险, 4 → 3)

### 3.1 MusicPlayer 合并

| Before | After |
|--------|-------|
| `components/MusicPlayer.tsx` (full 播放器) | 保留, 加 `variant` |
| `widgets/sub/MusicPlayer.tsx` (mini) | 删除, 改用 variant='mini' |
| `widgets/sub/Music.tsx` (dot, 仅歌曲名) | 保留为 `Music`, 与 `MusicPlayer` 解耦 |

**新 API** (注入 `components/MusicPlayer.tsx`):
```ts
type MusicPlayerVariant = 'default' | 'compact' | 'mini'
// 'mini' = 原 widgets/sub/MusicPlayer
```

**实施**:
- `components/MusicPlayer.tsx` 增加 `variant: 'mini'` 分支, 内容取自 `widgets/sub/MusicPlayer.tsx`
- 删除 `widgets/sub/MusicPlayer.tsx`
- 更新 `widgets/sub/index.ts` 删除 `MusicPlayer` 导出 (保留 `Music` 不动)
- 调用点 `<MusicPlayer ... />` 不变, 旧 mini 行为通过 `variant="mini"` 激活

### 3.2 Weather 合并 (主组件 + sub 集成)

| Before | After |
|--------|-------|
| `components/widgets/WeatherWidget.tsx` (4 variants) | 保留, 扩展 |
| `widgets/sub/Weather1.tsx` | Phase 2.8 已合并为 `Weather variant="icon"` |
| `widgets/sub/Weather2.tsx` | Phase 2.8 已合并为 `Weather variant="forecast"` |

**新增**:
- `WeatherWidget` 加 `variant='icon'` (透传到 `<Weather variant="icon" />`) 和 `variant='forecast'` (透传)
- 或更简单: 文档化 `Weather` sub 组件为 weather 展示的统一入口, `WeatherWidget` 保留为大块 dashboard widget (不变)。

**决策**: 不做跨级整合, 仅文档化 `Weather` sub 组件已统一 weather 视觉。`WeatherWidget` 与 `Weather` 是不同抽象层级 (前者含日历/小时预报/数据, 后者纯视觉)。

### 3.3 Battery 合并

| Before | After |
|--------|-------|
| `components/Battery.tsx` (variant='segmented'\|'ring') | 保留, 加 `variant='bar'\|'compact'\|'card'` |
| 无独立 `nullframe/BatteryCard.tsx` | 无需新建 (Phase 4 已用 `BatteryBody` 接入) |

**实施**:
- 检查 `Battery.tsx` 现有 API, 文档化已支持的 `widgetMode='card'\|'ring'` 即为 nullframe 集成入口
- `NullframeDashboard` 已用 `<BatteryBody />`, 内部确认是否已转用 `<Battery variant="card" />`, 若无, 改造

### 3.4 验证

```bash
npx tsc --noEmit && npx vite build
```

预期: `widgets/sub/MusicPlayer.tsx` 删除, 视觉在 demo 中逐个对照 Figma2.0 music 区无变化。

---

## 4. Phase 7: DataTable 合并 (高风险, 3 → 1 + 3 thin re-export)

### 4.1 统一 `DataTable` primitive

新建 `ui/DataTable.tsx`:
```ts
type DataTableVariant = 'grid' | 'rows' | 'table'
interface DataTableProps<T = unknown> {
  data: T[]
  columns?: ColumnDef<T>[]      // variant='grid' 用
  headers?: string[]              // variant='table' 用
  variant?: DataTableVariant
  onRowClick?: (item: T) => void
  selectable?: boolean            // variant='rows' 用
  multiSelect?: boolean           // variant='rows' 用
  sortable?: boolean              // variant='grid' 用
  onSort?: (column: string) => void
  striped?: boolean               // variant='table' 用
}
```

### 4.2 旧组件 → thin re-export (本阶段先 deprecation alias)

为保持低风险, 3 个旧文件保留为 1 行 re-export:
- `components/Table.tsx`:
  ```ts
  export { DataTable as default } from '../ui/DataTable'
  // 注: 旧 Table 默认 variant='table', 需保留 headers/striped 等语义
  ```
- `components/DataGrid.tsx`:
  ```ts
  export { DataTable as default } from '../ui/DataTable'
  // 旧 DataGrid 默认 variant='grid', 保留 columns/sortable 语义
  ```
- `components/DataRows.tsx`:
  ```ts
  export { DataTable as default } from '../ui/DataTable'
  // 旧 DataRows 默认 variant='rows', 保留 selectable 语义
  ```

**实施**:
- 读取 `Table.tsx`, `DataGrid.tsx`, `DataRows.tsx` 现有 API, 抽出 3 个 variant 的差异点
- 内部用一个 `DataTable` 组件, 通过 `variant` 切换渲染
- 不删除旧文件 (本阶段)
- `v5.1` 阶段再彻底删除旧名

### 4.3 风险

- `DataGrid` 的 `onSort` / `DataRows` 的 `multiSelect` / `Table` 的 `striped` 等独有 prop 需要在 `DataTable` 内部统一表达。
- 任何与 Figma 视觉有冲突的 prop 优先级需保留。
- App.tsx 中 `DataRows`/`DataGrid` 的调用点需对照保留行为。

### 4.4 验证

```bash
npx tsc --noEmit && npx vite build
```

预期: 3 旧组件行为不变, `DataTable` 内部统一 3 variant。

---

## 5. Phase 8: OverlayPortal 抽象 (中风险, 不删组件)

### 5.1 抽 `OverlayPortal`

新建 `ui/OverlayPortal.tsx`:
```ts
interface OverlayPortalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delay?: number    // HoverCard 用
  modal?: boolean   // Popover/Modal 用
  trigger: React.ReactNode
  children: React.ReactNode
}
```
- 内部统一处理: portal 挂载点, focus trap, escape, outside click
- 6 个组件 (Modal/Sheet/HoverCard/Popover/ContextMenu/DropdownMenu) **内部迁移**到使用 `OverlayPortal`, **不**改名 / 删文件

### 5.2 不做合并

按计划原意, 这一阶段仅做抽象层, 6 个组件 API 保持现状, 避免引入回归。

### 5.3 验证

```bash
npx tsc --noEmit && npx vite build
```

预期: 6 组件外部行为不变, 内部 `usePortal` 复用。

---

## 6. 文档更新 (MIGRATION.md v5)

### 6.1 插入位置

在 [MIGRATION.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/MIGRATION.md) "Validation commands" 之前, 插入 "v5 Component Consolidation" 大节。

### 6.2 内容结构

```md
## 5. v5 — Component Consolidation

### 5.1 Removed exports
- Card1, Card2, Card3
- Active1
- OverLimit1
- LocationAccess1
- Watch1, WatchAnalog
- Record2
- Glyphs1, Glyphs2
- Weather1, Weather2
- widgets/sub/MusicPlayer.tsx (mini 模式并入 MusicPlayer variant)
- 9 nullframe/*Card → 1 NfCard + bodies.tsx
- (Phase 3) 17 thin wrapper pills → 1 WidgetPill + WidgetPillPresets

### 5.2 New / changed APIs
[详见计划文档, 与 v2 同结构]

### 5.3 New shared modules
- src/system/hooks.ts
- src/system/time.ts
- src/ui/createThemedDiv.ts
- src/components/nullframe/bodies.tsx
- src/components/widgets/WidgetPillPresets.tsx
- (Phase 5) src/components/widgets/Time.tsx
- (Phase 7) src/ui/DataTable.tsx
- (Phase 8) src/ui/OverlayPortal.tsx

### 5.4 Validation
Same as v4: tsc, vite build, eslint.
```

---

## 7. 验证策略 (全局)

### 7.1 每 Phase 后必跑

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit --incremental false
npx vite build
npx eslint src --ext ts,tsx
```

### 7.2 关键集成测试组件

- `sections/Figma20Section.tsx` — 118+ 调用点的金丝雀
- `sections/NullframeSection.tsx` — NfCard 集成
- `App.tsx` — 根级 import 集成

### 7.3 视觉回归

无 e2e/visual test 基础设施。Figma20Section 是手动 visual check 起点。每次合并后, 浏览器打开 demo, 验证 Figma 2.0 — * Widgets 区段视觉无变化。

---

## 8. 风险与回滚

| Phase | 风险 | 回滚策略 |
|-------|------|----------|
| 2.8 (Weather) | 低 | git revert HEAD |
| 5 (Time) | 中 | git revert; 旧 8 文件原状 |
| 6 (Music/Weather/Battery) | 低 | git revert; 各自保留原 variant |
| 7 (DataTable) | 高 | git revert; 旧 3 组件原状; 还原 `DataTable.tsx` 删除 |
| 8 (Overlay) | 低 | git revert; 6 组件恢复自管理 portal |
| 文档 | 无 | 直接重写 |

---

## 9. 执行顺序 (推荐)

```
Phase 2.8 (Weather, 30 min)      ← 收尾 Phase 2
   ↓
Phase 6 (Music, 30 min)          ← 改动小, 收尾干净
   ↓
Phase 5 (Time, 1.5 h)            ← 中等风险
   ↓
Phase 8 (OverlayPortal, 1 h)     ← 不删组件, 抽象层
   ↓
Phase 7 (DataTable, 1.5 h)       ← 高风险, 最后做
   ↓
文档 (MIGRATION.md v5, 30 min)
```

**预计**: ~5.5 小时工作量, **分 2-3 个 PR** (Phase 2.8+6, 5+8, 7) 提交便于 review。

---

## 10. 决策点 (已确认, 不再询问)

用户已在前置对话中确认:
1. ✅ 范围: 全部 (低+中+高)
2. ✅ API 策略: 直接 breaking, 全部更新调用点

无其他阻塞决策。
