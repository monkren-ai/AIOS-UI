# 合并、梳理功能类似的组件 — 续执行计划

> **范围**: 全部 (低+中+高)
> **API 策略**: 直接 breaking, 全部更新调用点
> **基线 (本次会话已确认完成)**: Phase 1, 2.1 (Card), 2.2 (Active), 3 (Pill), 4 (Nullframe Cards)
> **目标**: 完成 Phase 2 剩余 + Phase 5/6/7/8 + 文档

---

## 0. 当前状态 (已确认)

| Phase | 内容 | 状态 |
|-------|------|------|
| 1 | `system/hooks.ts` (useNow, useTypedText), `system/time.ts` (pad2, stamp), `ui/createThemedDiv.ts` | ✅ 完成 |
| 2.1 | `Card` (Card/Card1/Card2/Card3 合并, `variant` + `image` props) | ✅ 完成 |
| 2.2 | `Active` (Active/Active1 合并, `variant='active'\|'aeroplane'`) | ✅ 完成 |
| 3 | `WidgetPill` + `WidgetPillPresets` (17 薄壳 → 1 工厂 + registry) | ✅ 完成 (WidgetPills.tsx 已删除) |
| 4 | `NfCard` body slot + `bodies.tsx` (9 *Card → 1 NfCard + 9 Body) | ✅ 完成 |
| 2.3-2.8 | OverLimit/OverLimit1, LocationAccess/LocationAccess1, Watch/Watch1/WatchAnalog, Recording/Record2, Glyphs/Glyphs1/Glyphs2, Weather/Weather1/Weather2 | ⏳ 待做 |
| 5 | Time 集群 (Clock, WorldClock, Chrono, Pomodoro, TimeWidget, AnalogClockWidget, DigitalClockLargeWidget, sub/Time, sub/TotalTime, nullframe/ClockHero) | ⏳ 待做 |
| 6 | MusicPlayer/Music/Weather/Battery 集群 | ⏳ 待做 |
| 7 | DataTable (Table/DataGrid/DataRows) | ⏳ 待做 (高风险) |
| 8 | OverlayPortal 抽象 (Modal/Sheet/HoverCard/Popover/ContextMenu/DropdownMenu) | ⏳ 仅抽 portal, 不合并 |
| 文档 | `MIGRATION.md` v5 章节 | ⏳ 待做 |

**关键调用点**:
- `sections/Figma20Section.tsx` — 引用了 `Watch1`, `Glyphs1`, `Glyphs2`, `LocationAccess1`, `OverLimit1`, `Weather1`, `Weather2`, `Record2` 等待合并组件
- `App.tsx` — 引用了 `Clock`, `WorldClock`, `Chrono`, `Pomodoro`, `MusicPlayer`, `Battery`, `Calendar`, `WeatherWidget`, `AnalogClockWidget`, `DigitalClockLargeWidget` 等
- `widgets/sub/index.ts` — 旧名导出仍在, 需随合并删除
- `NullframeSection.tsx` — 需检查

---

## 1. Phase 2 收尾: 剩余 6 组完全重复合并 (低风险, 11 文件 → 0 净增)

> **目标**: 8 组 Phase 2 中已做 2 组, 还剩 6 组, 全部按 `variant` / `theme` 收敛。

### 1.1 OverLimit 合并 (OverLimit1 → OverLimit + `theme`)

| Before | After |
|--------|-------|
| `sub/OverLimit.tsx` (OverLimit + Overlimit 子组件) | 保留 OverLimit + Overlimit |
| `sub/OverLimit1.tsx` (OverLimit1, 独立文件) | 删除文件, 合并进 `OverLimit.tsx` |

**新 API**:
```ts
interface OverLimitProps extends WidgetSubProps {
  theme?: 'accent' | 'dark' | 'light'  // 新增: 'dark' 对应 OverLimit1
  minutes?: number                       // 取代硬编码 30m/40 MIN
}
```
**实施**:
- `OverLimit1` 内容 (Arrow + Icon32 + LimitCount) 移入 `OverLimit.tsx`
- `theme='dark'` 渲染 dark BG + LimitCount 模式 (OverLimit1 当前是 `widget-card--dark`)
- `theme='accent'` (默认) 渲染 30m + OverLimit 文本 (原 Overlimit)
- 更新 `widgets/sub/index.ts` 删除 `OverLimit1` 导出
- 更新 `Figma20Section.tsx`: `<OverLimit1 />` → `<OverLimit theme="dark" minutes={40} />`

### 1.2 LocationAccess 合并 (LocationAccess1 → LocationAccess + `theme`)

| Before | After |
|--------|-------|
| `sub/LocationAccess.tsx` (LocationAccess, BG=primary 红) | 保留, 添加 `theme` prop |
| `sub/LocationAccess1.tsx` (LocationAccess1, BG=card-bg 浅) | 删除 |

**新 API**:
```ts
interface LocationAccessProps extends WidgetSubProps {
  theme?: 'accent' | 'light'  // accent=红 BG (原), light=白 BG (原 LocationAccess1)
}
```
- `theme='accent'` (默认) → 红 BG, 白字
- `theme='light'` → 浅 BG, 黑字
- 删除 `LocationAccess1` 文件, 更新 `Figma20Section.tsx` 调用点

### 1.3 Watch 合并 (Watch1 + WatchAnalog → Watch + `variant`)

| Before | After |
|--------|-------|
| `sub/Watch1.tsx` (Watch1, 模拟指针表盘) | 保留为 `Watch` 主体, 加 `variant` |
| `sub/WatchAnalog.tsx` (WatchAnalog, 复杂模拟表盘) | 合并进 `Watch.tsx` |
| `sub/Watch.tsx` (不存在) | 新建/重命名 |

**新 API**:
```ts
type WatchVariant = 'digital' | 'analog' | 'analog-large'  // 新增
```
- 当前 `Watch1` (Circle 152 + 矩形 hands) → `Watch variant="analog"`
- 当前 `WatchAnalog` (大表盘 + 时针分针秒针) → `Watch variant="analog-large"`
- `Figma20Section.tsx`: `<Watch1 />` 和 `<WatchAnalog />` 替换为 `<Watch variant="..." />`

### 1.4 Recording 合并 (Record2 → Recording + `variant`)

| Before | After |
|--------|-------|
| `sub/Recording.tsx` (Recording, 药丸状 152×32 "00:00:05") | 保留, 加 `variant` |
| `sub/Record2.tsx` (Record2, 152 圆形 BG + "REC") | 删除 |

**新 API**:
```ts
type RecordingVariant = 'pill' | 'rec'  // pill=当前, rec=原 Record2
```
- 删除 `Record2.tsx`
- 更新 `Figma20Section.tsx`: `<Record2 />` → `<Recording variant="rec" />`

### 1.5 Glyphs 合并 (Glyphs1 + Glyphs2 → Glyphs + `variant`)

| Before | After |
|--------|-------|
| `sub/Glyphs1.tsx` (Glyphs1, 白色字符图案) | 重命名为 `Glyphs.tsx`, 加 `variant` |
| `sub/Glyphs2.tsx` (Glyphs2, 浅色字符图案) | 删除 |

**新 API**:
```ts
type GlyphsVariant = 'pattern-a' | 'pattern-b'  // a=白字, b=浅色
```
- `Figma20Section.tsx`: 替换调用

### 1.6 Weather 合并 (Weather1 + Weather2 → Weather + `variant`)

| Before | After |
|--------|-------|
| `sub/Weather1.tsx` (Weather1, 152 圆 + 太阳图标) | 重命名为 `Weather.tsx`, 加 `variant` |
| `sub/Weather2.tsx` (Weather2, 宽列 + 圆点阵) | 删除 |

**新 API**:
```ts
type WeatherVariant = 'icon' | 'forecast'  // icon=152 圆, forecast=宽列
type WeatherSize = 152 | 320
interface WeatherProps extends WidgetSubProps {
  variant?: WeatherVariant
  size?: WeatherSize
}
```
- `Figma20Section.tsx`: `<Weather1 />` → `<Weather variant="icon" />`, `<Weather2 />` → `<Weather variant="forecast" />`

### 1.7 调用点更新清单 (Phase 2 全量)

`Figma20Section.tsx`:
```tsx
// ❌ Before
import { OverLimit1, LocationAccess1, Watch1, WatchAnalog, Record2, Glyphs1, Glyphs2, Weather1, Weather2 } from '../components/widgets/WidgetSubComponents'

// ✅ After
import { OverLimit, LocationAccess, Watch, Recording, Glyphs, Weather } from '../components/widgets/WidgetSubComponents'

// 替换:
//   <OverLimit1 />        → <OverLimit theme="dark" minutes={40} />
//   <LocationAccess1 />   → <LocationAccess theme="light" />
//   <Watch1 />            → <Watch variant="analog" />
//   <WatchAnalog />       → <Watch variant="analog-large" />
//   <Record2 />           → <Recording variant="rec" />
//   <Glyphs1 />           → <Glyphs variant="pattern-a" />
//   <Glyphs2 />           → <Glyphs variant="pattern-b" />
//   <Weather1 />          → <Weather variant="icon" />
//   <Weather2 />          → <Weather variant="forecast" />
```

`widgets/sub/index.ts`: 删除 `OverLimit1`, `LocationAccess1`, `Watch1`, `WatchAnalog`, `Record2`, `Glyphs1`, `Glyphs2`, `Weather1`, `Weather2` 导出。

### 1.8 验证 (Phase 2 收尾后)

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit --incremental false
npx vite build
npx eslint src --ext ts,tsx
```

---

## 2. Phase 5: Time 集群合并 (中风险, 9 → 1 展示层 + 2 业务层保留)

> **核心观察**: `Clock`, `WorldClock`, `widgets/TimeWidget`, `widgets/AnalogClockWidget`, `widgets/DigitalClockLargeWidget`, `sub/Time`, `sub/TotalTime`, `nullframe/ClockHero` 都是"显示时间"组件。`Chrono` 和 `Pomodoro` 内部有 start/pause/reset 状态机, **不合并**, 改为消费 `Time`。

### 2.1 展示层 `Time`

新建 `widgets/Time.tsx`:
```ts
type TimeVariant =
  | 'digital-large'   // 原 DigitalClockLargeWidget (sharp/serif)
  | 'digital-compact' // 原 Clock (digital)
  | 'dial'            // 原 Clock (gauge)
  | 'analog'          // 原 AnalogClockWidget
  | 'hero'            // 原 TimeWidget / ClockHero
  | 'compact'         // 原 sub/Time
  | 'total'           // 原 sub/TotalTime
  | 'world'           // 原 WorldClock (接收 timezones)
interface TimeProps {
  variant?: TimeVariant
  timezones?: string[]   // variant='world' 用
  serif?: boolean        // variant='digital-large' 用
  // ...
}
```

### 2.2 业务层保留 (不合并)

- `components/Chrono.tsx` — 内部用 `useState/useEffect` 跑秒表, 渲染时调 `<Time variant="dial" />`
- `components/Pomodoro.tsx` — 内部用倒计时状态机, 渲染时调 `<Time variant="dial" />`

### 2.3 实施

1. 新建 `widgets/Time.tsx` 整合 8 个展示类组件
2. `Chrono.tsx` 替换内部渲染为 `<Time variant="dial" />`
3. `Pomodoro.tsx` 同上
4. 删除 8 个旧展示类文件:
   - `components/Clock.tsx`
   - `components/WorldClock.tsx`
   - `widgets/TimeWidget.tsx`
   - `widgets/AnalogClockWidget.tsx`
   - `widgets/DigitalClockLargeWidget.tsx`
   - `widgets/sub/Time.tsx`
   - `widgets/sub/TotalTime.tsx`
   - `nullframe/ClockHero.tsx` (其 body 改成 `<ClockHeroBody>` 直接调 `Time variant="hero"`)
5. **保留** `components/Chrono.tsx` 和 `components/Pomodoro.tsx` (业务层)

### 2.4 调用点更新

`App.tsx`:
```tsx
// ❌ Before
import Clock from '@/components/Clock'
import WorldClock from '@/components/WorldClock'
import Chrono from '@/components/Chrono'
import Pomodoro from '@/components/Pomodoro'
import AnalogClockWidget from '@/components/widgets/AnalogClockWidget'
import DigitalClockLargeWidget from '@/components/widgets/DigitalClockLargeWidget'
// ...

// ✅ After
import { Time } from '@/components/widgets/Time'
import Chrono from '@/components/Chrono'      // 保留
import Pomodoro from '@/components/Pomodoro'  // 保留

// 替换:
//   <Clock />               → <Time variant="digital-compact" />
//   <WorldClock tz={[...]} /> → <Time variant="world" timezones={tz} />
//   <AnalogClockWidget />   → <Time variant="analog" />
//   <DigitalClockLargeWidget /> → <Time variant="digital-large" />
```

`bodies.tsx` 中的 `ClockHeroBody`:
```tsx
// ❌ Before
import { ClockHero } from './ClockHero'
return <ClockHero />

// ✅ After
import { Time } from '../widgets/Time'
return <Time variant="hero" />
```

### 2.5 风险

- 8 个组件的视觉/字体细节可能略有差异, 合并后需要 **逐个对照** 还原。
- `WorldClock` 接收 `timezones: string[]`, 旧 API 名称 `tz` 需统一。
- `Chrono` / `Pomodoro` 内部如果有自研的时间格式化逻辑, 移到 `Time` 后需保持视觉一致。

### 2.6 验证

```bash
npx tsc --noEmit && npx vite build
```
预期: 113 → 107 组件, Time 是唯一的时间展示入口。

---

## 3. Phase 6: Music / Weather / Battery 集群 (中风险, 4 → 3)

### 3.1 MusicPlayer 合并

| Before | After |
|--------|-------|
| `components/MusicPlayer.tsx` (full 播放器) | 保留, 加 `variant` |
| `widgets/sub/MusicPlayer.tsx` (mini) | 删除, 改用 variant='mini' |
| `widgets/sub/Music.tsx` (dot, 只显示歌曲名) | 保留为 `Music`, 与 `MusicPlayer` 解耦 |

**新 API**:
```ts
type MusicVariant = 'full' | 'mini'
interface MusicPlayerProps {
  variant?: MusicVariant
  // ... 原有 props
}
```

### 3.2 Weather 合并

| Before | After |
|--------|-------|
| `components/widgets/WeatherWidget.tsx` (含 default/circular/grid/wide 4 个 variant) | 保留, 扩展 |
| `widgets/sub/Weather1.tsx` (Phase 2.6 已合并) | — |
| `widgets/sub/Weather2.tsx` (Phase 2.6 已合并) | — |

**新增 variant**:
- `WeatherWidget` 加 `variant='icon'` 和 `variant='forecast'` 对应 Phase 2.6 的 Weather1/Weather2
- Weather sub 组件 → 全部从 `WeatherWidget` 暴露

### 3.3 Battery 合并

| Before | After |
|--------|-------|
| `components/Battery.tsx` (variant='segmented'\|'ring'\|'bar'\|'compact') | 保留, 加 `variant='card'` |
| `nullframe/BatteryCard.tsx` (NfCard 包 Battery 内容) | 删除, 用 `<NfCard body={<Battery variant="card" />} />` |

**新 API**:
```ts
type BatteryVariant = 'segmented' | 'ring' | 'bar' | 'compact' | 'card'
```

`NullframeDashboard.tsx`:
```tsx
// ❌ Before
<NfCard index={4} label="Battery" tag="LIVE" tagAlways body={<BatteryBody />} />
// (BatteryBody 内部用了 BatteryCard 的逻辑)

// ✅ After
import Battery from '@/components/Battery'
<NfCard index={4} label="Battery" tag="LIVE" tagAlways body={<Battery variant="card" />} />
```

### 3.4 验证

```bash
npx tsc --noEmit && npx vite build
```
预期: `widgets/sub/MusicPlayer.tsx` 和 `nullframe/BatteryCard.tsx` 删除, 总文件数 -2。

---

## 4. Phase 7: DataTable 合并 (高风险, 3 → 1 + 3 thin re-exports)

### 4.1 统一 `DataTable` primitive

新建 `ui/DataTable.tsx`:
```ts
type DataTableVariant = 'grid' | 'rows' | 'table'
interface DataTableProps {
  data: unknown[]
  columns?: ColumnDef[]      // variant='grid' 用
  headers?: string[]         // variant='table' 用
  variant?: DataTableVariant
  onRowClick?: (item) => void
  selectable?: boolean       // variant='rows' 用 (原 DataRows)
  sortable?: boolean          // variant='grid' 用 (原 DataGrid)
}
```

### 4.2 旧组件 → thin re-export (本阶段先 deprecation alias)

为保持低风险:
- `Table.tsx`, `DataGrid.tsx`, `DataRows.tsx` 保留文件, 内部改为 1 行 `export { DataTable as default }` (不传 props, 用默认 variant)。
- **v5.1 阶段**再彻底删除旧名。

### 4.3 风险

- `DataGrid` 的 `onSort` / `DataRows` 的 `multiSelect` / `Table` 的 `striped` 等独有 prop 需要在 `DataTable` 内部统一表达。
- 任何与 Figma 视觉有冲突的 prop 优先级需保留。

### 4.4 验证

```bash
npx tsc --noEmit && npx vite build
```

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
  delay?: number   // HoverCard 用
  modal?: boolean  // Popover 用
  trigger: React.ReactNode
  children: React.ReactNode
}
```
- 内部统一处理: portal 挂载点, focus trap, escape, outside click
- 6 个组件 (Modal/Sheet/HoverCard/Popover/ContextMenu/DropdownMenu) **内部迁移**到使用 `OverlayPortal`, **不**改名 / 删文件

### 5.2 不做合并

按 plan 原意, 这一阶段仅做抽象层, 6 个组件 API 保持现状, 避免引入回归。

### 5.3 验证

```bash
npx tsc --noEmit && npx vite build
```

---

## 6. 文档更新 (MIGRATION.md v5)

### 6.1 插入位置

在 [MIGRATION.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/MIGRATION.md) "6. Validation commands" 之前 (line 277 处), 插入 "v5 Component Consolidation" 大节。

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
- WidgetPills.tsx (17 thin wrappers: MobileData, BatteryShare, ..., Bluetooth)
- ActivityCard, BatteryCard, ClockHero, ContributionsCard, GlyphCard, MemoryCard, NetworkCard, RenderCard, StreakCard (8 Nullframe *Card → 1 NfCard + bodies.tsx)

### 5.2 New / changed APIs
| Component | Prop | Old API | New API |
|-----------|------|---------|---------|
| Card | `variant` | (none) | `'square' \| 'pill'` |
| Card | `image` | (none) | `'a' \| 'b' \| 'c' \| 'd' \| string` |
| Active | `variant` | (none) | `'active' \| 'aeroplane'` |
| OverLimit | `theme` | (none) | `'accent' \| 'dark' \| 'light'` |
| OverLimit | `minutes` | (hardcoded 30/40) | `number` |
| LocationAccess | `theme` | (none) | `'accent' \| 'light'` |
| Watch | `variant` | (none) | `'digital' \| 'analog' \| 'analog-large'` |
| Recording | `variant` | (none) | `'pill' \| 'rec'` |
| Glyphs | `variant` | (none) | `'pattern-a' \| 'pattern-b'` |
| Weather | `variant` | (none) | `'icon' \| 'forecast'` |
| Weather | `size` | (none) | `152 \| 320` |
| WidgetPill | `preset` | (none) | `'mobileData' \| 'batteryShare' \| ...` |
| NfCard | `body` | (none) | `ReactNode` (slot for body) |
| MusicPlayer | `variant` | (none) | `'full' \| 'mini'` |
| Battery | `variant` | (none) | `'segmented' \| 'ring' \| 'bar' \| 'compact' \| 'card'` |

### 5.3 New shared modules
- `src/system/hooks.ts` — `useNow(intervalMs)`, `useTypedText({ messages, typeMs, holdMs, eraseMs })`
- `src/system/time.ts` — `pad2(n)`, `stamp(d, sep)`, `formatUptime(ms)`
- `src/ui/createThemedDiv.ts` — CVA + forwardRef factory
- `src/components/nullframe/bodies.tsx` — 10 presentational body components
- `src/components/widgets/WidgetPillPresets.tsx` — 17 pill preset definitions

### 5.4 Moved to / from
- `WidgetPills.tsx` → deleted
- 9 `nullframe/*Card.tsx` → deleted (logic moved to `bodies.tsx` + `NfCard`)

### 5.5 Validation
Same commands as v4 — tsc, vite build, eslint.
```

---

## 7. 验证策略 (全局)

### 7.1 每 Phase 后必跑

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npx tsc --noEmit --incremental false    # 0 errors
npx vite build                          # ok
npx eslint src --ext ts,tsx             # 0 errors
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
| 2.3-2.8 (剩余重复) | 低 | git revert HEAD, 旧文件 1 行 re-export 即可恢复 |
| 5 (Time) | 中 | git revert; 旧 8 文件原状; Chrono/Pomodoro 不动 |
| 6 (Music/Weather/Battery) | 低 | git revert; 各自保留原 variant |
| 7 (DataTable) | 高 | git revert; 旧 3 组件原状; 还原 `DataTable.tsx` 删除 |
| 8 (Overlay) | 低 | git revert; 6 组件恢复自管理 portal |
| 文档 | 无 | 直接重写 |

---

## 9. 执行顺序 (推荐)

```
Phase 2 收尾 (6 组, 1 h)          ← 先把容易的全清
   ↓
Phase 6 (Music/Weather/Battery, 30 min)  ← 改动小, 收尾干净
   ↓
Phase 5 (Time 集群, 1.5 h)        ← 中等风险
   ↓
Phase 8 (OverlayPortal, 1 h)      ← 不删组件, 抽象层
   ↓
Phase 7 (DataTable, 1.5 h)        ← 高风险, 最后做
   ↓
文档 (MIGRATION.md v5, 30 min)
```

**预计**: ~6 小时工作量, **分 2-3 个 PR** (Phase 2+6, 5+8, 7) 提交便于 review。

---

## 10. 决策点 (待用户在执行前确认)

执行开始前需确认 (一次性):
1. **Phase 5 是否完全合并 8 个展示层组件**? (推荐: 是, 一次到位)
2. **Phase 6 Music 合并时**, `widgets/sub/Music.tsx` (仅显示歌曲名+圆点装饰) 与 `MusicPlayer` 是否合并? (推荐: 否, 保留为 `Music`, 不强求合并)
3. **Phase 7 DataTable 风险等级**: 接受 thin re-export 过渡, 还是直接 breaking? (推荐: thin re-export, 后续 v5.1 再删除)
4. **Phase 2 中 `Watch` 重命名**: 原 `Watch1` → `Watch.tsx`, 旧 `Watch.tsx` 不存在, 无重名冲突。

无其他阻塞决策。开始执行前无需进一步澄清。
