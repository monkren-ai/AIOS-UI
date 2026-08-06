# MIGRATION.md — v3 → v4 Refactor

> **Date**: 2026-06-13
> **Scope**: 113 React components in `web-ui-kit/react`
> **Mode**: Breaking (user-approved)
>
> **v5 addendum**: see [§5 v5 — Component Consolidation](#5-v5--component-consolidation) for the 2026-06-14 consolidation pass.

This document is the per-component migration table for the v3 → v4 refactor. Use it to update call sites in your own project after upgrading.

---

## 1. The new primitives

### 1.1 `cn()` — class string composition

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
```

**Migration:**

```tsx
// ❌ Before
const className = ['aios-btn', `aios-btn--${variant}`, isActive && 'is-active']
  .filter(Boolean).join(' ')

// ✅ After
import { cn } from '@/lib/utils'
const className = cn('aios-btn', `aios-btn--${variant}`, isActive && 'is-active')
```

### 1.2 `dataAttr()` — conditional `data-*` value

```ts
// src/lib/utils.ts
export function dataAttr(
  value: string | number | boolean | undefined | null
): string | number | undefined {
  if (value === undefined || value === null || value === false) return undefined
  if (value === true) return ''
  return value
}
```

**Migration:**

```tsx
// ❌ Before
<button data-state={pressed ? 'pressed' : undefined} />

// ✅ After
import { dataAttr } from '@/lib/utils'
<button data-state={dataAttr(pressed ? 'pressed' : 'idle')} />
```

### 1.3 `mergeRefs()` — ref composition

```ts
// src/lib/utils.ts
export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> { /* … */ }
```

**Usage** (composite components that expose a single DOM ref to consumers):

```tsx
const setRef = mergeRefs(internalRef, forwardedRef)
return <div ref={setRef} />
```

### 1.4 Shared variants (`@/lib/variants.ts`)

```ts
themeVariants    // light | dark | accent | error
sizeVariants     // sm | md | lg
stateVariants    // on | off | disabled | loading | error
stateOnOffVariants // on | off
orientationVariants // horizontal | vertical
emphasisVariants // primary | secondary
statusVariants   // good | warning | overlimit | info
```

**Migration:**

```tsx
// ❌ Before — duplicate the variant object in every file
const cardVariants = cva('', {
  variants: {
    theme: { light: 'card--light', dark: 'card--dark' },
    size: { sm: 'card--sm', md: 'card--md', lg: 'card--lg' },
  },
})

// ✅ After — compose shared factories
import { themeVariants, sizeVariants } from '@/lib/variants'

const cardVariants = cva('', {
  variants: { theme: themeVariants, size: sizeVariants },
})
```

### 1.5 Polymorphic `asChild` via `Slot` primitive

```ts
// src/lib/slot.tsx
import { Slot } from '@/lib/slot'
```

**Migration:**

```tsx
// ❌ Before — wrap in <a> manually
<Button as="a" href="...">Link</Button>  // not supported

// ✅ After
<Button asChild>
  <a href="...">Link</a>
</Button>
```

---

## 2. Per-component breaking changes

The columns: Component · Prop · Old API · New API · Notes

| Component | Prop | Old API | New API | Notes |
|-----------|------|---------|---------|-------|
| `Button` | `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | unchanged | Now also exported as `buttonVariants` factory. |
| `Button` | `asChild` | unsupported | `boolean` | Merges onto child via `Slot`. |
| `Input` | `variant` | `'underline' \| 'bordered'` | unchanged | Adds `data-variant`. |
| `Checkbox` | `checked` | `boolean \| 'indeterminate'` | `'indeterminate'` only as string | For boolean, use `checked={true}`; for indeterminate, use `checked="indeterminate"` or `defaultChecked`. |
| `Switch` | — | — | adds `data-state` | |
| `Slider` | controlled | `value` *or* `defaultValue` | throws if both supplied | |
| `RadioGroup` | `orientation` | `'row' \| 'col'` | `'horizontal' \| 'vertical'` | Renamed. |
| `Toggle` | `pressed` | `boolean` | unchanged | Adds `aria-pressed` via `dataAttr`. |
| `ToggleGroup` | `type` | `'single' \| 'multiple'` | unchanged | Now exported as `toggleGroupVariants`. |
| `Tag` | `color` | `'red' \| 'blue' \| …` | removed | Use `variant="accent" \| "warning" \| "success"`. |
| `Tags` | — | — | unchanged | Container. |
| `SegmentedControl` | — | — | adds `data-active-index` | |
| `Modal` | `variant` | `'default' \| 'alert'` | unchanged | |
| `Sheet` | `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | unchanged | |
| `DropdownMenu` | `variant` | `'default' \| 'menubar'` | unchanged | **Hooks order fixed**: `menubar` branch moved after all hooks to satisfy `react-hooks/rules-of-hooks`. |
| `Popover` / `HoverCard` / `ContextMenu` | — | — | unchanged | `data-state` now reflects open/closed. |
| `Tabs` | — | — | adds `data-orientation` | |
| `Accordion` | `type` | `'single' \| 'multiple'` | unchanged | |
| `Collapsible` | — | — | adds `data-state` | |
| `Tooltip` | — | — | adds `data-state`, `data-side` | |
| `Card` / `WidgetCard` | `variant` | `'default' \| 'raised' \| 'compact' \| 'technical'` | unchanged | `WidgetCard` adds `asChild`. |
| `Badge` | `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | unchanged | |
| `Avatar` | `fallback` | `string` | unchanged | |
| `Separator` | `orientation` | `'horizontal' \| 'vertical'` | unchanged | |
| `ProgressBar` | `variant` | `'default' \| 'slim'` | unchanged | `data-status`, `data-indeterminate` added. |
| `Table` | — | — | unchanged | `striped`, `hoverable` now control `data-*` attrs. |
| `DataGrid` | — | — | unchanged | `data-interactive` per row. |
| `DataRows` | — | — | unchanged | `data-status` per row. |
| `Breadcrumb` | — | — | unchanged | `data-current` on last item. |
| `Pagination` | — | — | unchanged | `data-disabled` on boundary buttons. |
| `Alert` | `variant` | `'default' \| 'destructive'` | unchanged | |
| `ScrollArea` | — | — | unchanged | `data-orientation`. |
| `Resizable` | `direction` | `'horizontal' \| 'vertical'` | unchanged | `data-handle` on splitters. |
| `Form` | — | — | unchanged | Internal `Field` is a `forwardRef` leaf. |
| `InputOTP` | `length` | `number` | unchanged | `data-active` on current slot. |
| `NavigationMenu` | — | — | unchanged | `data-state` on trigger/content. |
| `Sidebar` | — | — | unchanged | `data-active` on items. |
| `AspectRatio` | `ratio` | `number` | unchanged | |
| `Taskbar` | — | — | unchanged | |
| `NextEvent` | — | — | unchanged | `data-countdown`. |
| `Quotes` | — | — | unchanged | |
| `WidgetGrid` | — | — | unchanged | |
| `Command` | — | — | unchanged | |
| `Slider` | `value` / `defaultValue` | exclusive | **throws** if both | |
| `Textarea` | `autoResize` | `boolean` | unchanged | |
| `Date` (widget) | `type` | `'rect' \| 'dual-ring' \| 'serif'` | unchanged | |
| `Battery` | `variant` | `'segmented' \| 'ring' \| 'bar' \| 'compact'` | unchanged | |
| `Clock` | `type` | `'digital' \| 'gauge'` | unchanged | |
| `Calendar` | `type` | `'compact' \| 'full'` | unchanged | |
| `SystemMonitor` | — | — | unchanged | |
| `QuickToggle` | `variant` | `'circle' \| 'pill'` | unchanged | `theme` is `'light' \| 'dark' \| 'accent'`. |
| `WeatherWidget` | `variant` | `'default' \| 'circular' \| 'grid' \| 'wide'` | unchanged | |
| `ActivityWidget` | `variant` | — | unchanged | `card` prop now types `WithCardProps`. |
| `AnalogClockWidget` | `variant` | `'swiss' \| 'minimalist'` | unchanged | |
| `DigitalClockLargeWidget` | `variant` | `'sharp' \| 'serif'` | unchanged | |
| `PhotoFrameWidget` | `variant` | `'square' \| 'pill'` | unchanged | |
| `StepsWidget` / `CompassWidget` / `TimeWidget` | — | — | unchanged | All wrapped via `withWidgetCard`. |
| `SvgIcon` | `theme` | `'light' \| 'dark' \| 'accent' \| 'error'` | unchanged | |
| `Glyph` | `type` | `'check' \| 'heart' \| 'play' \| …` | unchanged | |
| `WidgetPill` | `theme` | `'light' \| 'dark' \| 'accent' \| 'error'` | unchanged | `aria-pressed` derives from `dataAttr(pressed)`. |
| `WidgetIcons` | — | — | unchanged | Re-exports. |
| `WidgetPills` | — | — | unchanged | Re-exports. |
| `WidgetSubComponents` | — | — | unchanged | Re-exports `sub/*`. |
| **43 × `sub/*`** | `theme`, `size` | inline ternaries | `widgetSubVariants` CVA + `data-theme` / `data-size` | Each is a `forwardRef` leaf. Imports use `@/lib/utils` and `class-variance-authority`. |
| **13 × `nullframe/*`** | per-card | inline ternaries | per-card `xxxCardVariants` CVA + `data-*` attrs | `ActivityCard`, `BatteryCard`, `ClockHero`, `CommandPalette`, `ContributionsCard`, `GlyphCard`, `MemoryCard`, `NetworkCard`, `NfCard`, `NullframeDashboard`, `RenderCard`, `Segbar`, `SeismoCard`, `StreakCard`. `CommandPalette` props refactored to a `type` alias to fix the empty-interface lint error. |

---

## 3. HOC tightening — `withWidgetCard`

**Before:**

```ts
export function withWidgetCard<P extends object>(
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<any>>
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<any>>

export function withWidgetCard<P extends object>(
  Component: React.FC<P>
): React.FC<P & WithCardProps>

export function withWidgetCard<P extends object>(
  Component: React.FC<P> | React.ForwardRefExoticComponent<P & React.RefAttributes<any>>
) { /* … */ }
```

**After:**

```ts
type AnyComponent = React.ComponentType<Record<string, unknown>>

export function withWidgetCard<P extends object>(
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<unknown>>
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<unknown>>

export function withWidgetCard<P extends object>(
  Component: React.FC<P>
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<unknown>>

export function withWidgetCard<P extends object>(Component: AnyComponent) { /* … */ }
```

**What changed:**

- All 5 `any` types are now `unknown` (safer at the type level).
- The non-forwardRef overload no longer returns a plain `React.FC`; it now returns a `ForwardRefExoticComponent`. This is intentional: the implementation always wraps in `forwardRef` so the FC signature was lying about ref behavior.
- The implementation no longer needs the hand-written `as React.ComponentType<P>` + `as P & { ref?: any }` cast dance.

**Call-site impact:** None if you used the `forwardRef` overload. If you passed a plain FC and read the ref type back, the inferred type will now be `unknown` instead of the old `any` — tighten it explicitly.

---

## 4. Path alias migration

`tsconfig.json` and `vite.config.ts` already configured `@/* → ./src/*`. The refactor sweeps the React entry to use the alias.

```tsx
// ❌ Before
import Button from './components/Buttons'
import { cn } from '../../../lib/utils'
import '@/styles/buttons.css'

// ✅ After
import Button from '@/components/Buttons'
import { cn } from '@/lib/utils'
import '@/styles/buttons.css'
```

The CSS alias was used in `App.tsx`. Per-file imports inside the components themselves were already using `@/styles/...` in 95% of cases; the small remainder (e.g. `widgets.css`) was converted in this sweep.

---

## 5. Removed / unused exports

The bulk-refactor script removed these from the demo app:

- `WidgetWide` (referenced by `Figma20Section.tsx`, never existed in the codebase) — usage and import deleted from `Figma20Section.tsx`.

The HOC refactor removed:

- The `as React.ForwardRefExoticComponent` casts on the 8 widget wrappers.

---

## 5. v5 — Component Consolidation

> **Date**: 2026-06-14
> **Scope**: 32 component files merged into shared primitives / single-entry components
> **Mode**: Breaking (user-approved — old names removed, all call sites updated)

### 5.1 Shared infrastructure

| Module | Exports | Purpose |
|--------|---------|---------|
| `system/hooks.ts` | `useNow(intervalMs)`, `useTypedText(text, speed)` | Reactive current-time + typing animation. Replaces ad-hoc `useEffect+setInterval` in 8+ components. |
| `system/time.ts` | `pad2(n)`, `stamp(d)`, `formatUptime(s)` | Time formatting primitives shared by Clock / Pomodoro / Chrono / etc. |
| `ui/createThemedDiv.ts` | `createThemedDiv(defaults)` | Theme-aware `forwardRef` factory. Used by widget shell. |
| `ui/OverlayPortal.tsx` | `useOverlayState`, `useEscapeKey`, `useScrollLock`, `useFocusTrap`, `useTabCycle`, `useOverlayClickOutside`, `OverlayPortal` | 7 primitives shared by 6 overlay components (Modal / Sheet / HoverCard / Popover / ContextMenu / DropdownMenu). |
| `ui/DataTable.tsx` | `DataTable` (3 variants) | Single entry replacing Table / DataGrid / DataRows. |
| `widgets/WidgetPillPresets.tsx` | 17 preset configs | Replaces 17 thin wrapper components in `WidgetPills.tsx`. |
| `nullframe/bodies.tsx` | 9 `*Body` components | Replaces 9 `*Card` per-card body components. |

### 5.2 Component merges

| New | Replaces | Notes |
|-----|----------|-------|
| `Card` (with `variant` prop) | `Card1` / `Card2` / `Card3` | Single `variant` discriminated entry. |
| `Active` (with `variant` prop) | `Active1` / `Active2` | |
| `OverLimit` (with `variant` prop) | `OverLimit1` / `OverLimit2` | |
| `LocationAccess` (with `variant` prop) | `LocationAccess1` / `LocationAccess2` | |
| `Watch` (with `variant` prop) | `Watch1` / `Watch2` | |
| `Recording` (with `variant` prop) | `Recording1` / `Recording2` | |
| `Glyphs` (with `variant` prop) | `Glyphs1` / `Glyphs2` | |
| `Weather` (with `variant='icon'\|'forecast'`) | `Weather1` / `Weather2` | |
| `MusicPlayer` (with `variant='mini'`) | `sub/MusicPlayer` (now thin re-export) | Inline SVG assets from `sub/MusicPlayer.tsx` lifted to main file. |
| `Time` (with 10 variants) | `Clock`, `WorldClock`, `TimeWidget`, `AnalogClockWidget`, `DigitalClockLargeWidget`, `sub/Time`, `sub/TotalTime` | See §5.3. |
| `DataTable` (with `variant='table'\|'grid'\|'rows'`) | `Table`, `DataGrid`, `DataRows` (all removed) | |
| `WidgetPill` (with preset registry) | 17 thin wrappers in `WidgetPills.tsx` | |
| `NfCard` (with body slot) | 9 nullframe `*Card` components | Body components moved to `nullframe/bodies.tsx`. |

### 5.3 `Time` variant map

```tsx
// ❌ Before
<Clock type="digital" />
<Clock type="gauge" />
<WorldClock cities={...} />
<AnalogClockWidget variant="swiss" />
<DigitalClockLargeWidget variant="sharp" />
<TimeWidget />
<TimeWidget recording />
<SubTime />
<SubTotalTime />

// ✅ After
<Time variant="digital-compact" />
<Time variant="dial" />
<Time variant="world" cities={...} />
<Time variant="analog" dial="swiss" />
<Time variant="digital-large" font="sharp" />
<Time variant="hero" />
<Time variant="hero" recording />
<Time variant="compact" />
<Time variant="total" />
```

`Chrono` and `Pomodoro` are **kept as-is** (they are business-logic state machines, not pure display). Internally they now use `<Time variant="..." />` instead of the deleted `Clock`.

### 5.4 `OverlayPortal` design

The 6 overlay components now share a single source of primitives. Public API is unchanged — only the internal rendering pipeline differs (content is portaled to `document.body`).

```ts
// Old
<Modal open={isOpen} />
<Popover content={...} />
<DropdownMenu trigger={...} items={...} />

// New (same API)
<Modal open={isOpen} />
<Popover content={...} />
<DropdownMenu trigger={...} items={...} />
```

**Migration impact**: None for consumers. The internal change means:

1. Overlay content is no longer constrained by parent `overflow: hidden` / `transform` stacking contexts.
2. Z-index stacking is consistent (all overlays rendered as siblings of `body`).
3. `useClickOutside` was rewritten inline for Popover / ContextMenu / DropdownMenu to check both the trigger container AND the portaled content (since the content is no longer in the container's subtree).

The `Modal` and `Sheet` keep `useClickOutside`-free: they dismiss via backdrop click + Escape, both unchanged.

### 5.5 Call-site update example

```tsx
// ❌ Before
import Clock from '@/components/Clock'
import WorldClock from '@/components/WorldClock'
import TimeWidget from '@/components/widgets/TimeWidget'
import AnalogClockWidget from '@/components/widgets/AnalogClockWidget'
import DigitalClockLargeWidget from '@/components/widgets/DigitalClockLargeWidget'
import SubTime from '@/components/widgets/sub/Time'
import SubTotalTime from '@/components/widgets/sub/TotalTime'

// ✅ After
import Time from '@/components/widgets/Time'
```

### 5.6 Removed files (call sites must be updated)

- `components/Clock.tsx` → use `<Time variant="digital-compact" \| "dial" />`
- `components/WorldClock.tsx` → use `<Time variant="world" />`
- `components/Table.tsx` → use `<DataTable variant="table" />`
- `components/DataGrid.tsx` → use `<DataTable variant="grid" />`
- `components/DataRows.tsx` → use `<DataTable variant="rows" />`
- `components/widgets/TimeWidget.tsx` → use `<Time variant="hero" />`
- `components/widgets/AnalogClockWidget.tsx` → use `<Time variant="analog" />`
- `components/widgets/DigitalClockLargeWidget.tsx` → use `<Time variant="digital-large" />`
- `components/widgets/sub/Time.tsx` → use `<Time variant="compact" />`
- `components/widgets/sub/TotalTime.tsx` → use `<Time variant="total" />`
- `components/widgets/sub/Weather1.tsx`, `Weather2.tsx` → use `<Weather variant="icon" \| "forecast" />`
- `components/widgets/sub/Card1.tsx`, `Card2.tsx`, `Card3.tsx` → use `<Card variant="..." />`
- `components/widgets/sub/Active1.tsx`, `Active2.tsx` → use `<Active variant="..." />`
- `components/widgets/sub/OverLimit1.tsx`, `OverLimit2.tsx` → use `<OverLimit variant="..." />`
- `components/widgets/sub/LocationAccess1.tsx`, `LocationAccess2.tsx` → use `<LocationAccess variant="..." />`
- `components/widgets/sub/Watch1.tsx`, `Watch2.tsx` → use `<Watch variant="..." />`
- `components/widgets/sub/Recording1.tsx`, `Recording2.tsx` → use `<Recording variant="..." />`
- `components/widgets/sub/Glyphs1.tsx`, `Glyphs2.tsx` → use `<Glyphs variant="..." />`
- `components/widgets/WidgetPills.tsx` (17 thin wrappers) → use `<WidgetPill preset="..." />` with `WidgetPillPresets`

### 5.7 Files kept as thin re-exports (backward-compat until call sites migrated)

- `components/widgets/sub/MusicPlayer.tsx` → re-exports `MusicPlayer` with `variant="mini"`.

---

## 7. Validation commands

```bash
# from web-ui-kit/react/
npm run type-check    # tsc --noEmit
npm run lint          # eslint
npm run build         # tsc --noEmit && vite build
```

All three pass as of v4:

- `tsc`: 0 errors
- `vite build`: built in ~3.4s
- `eslint`: 0 errors, 132 warnings (all `react-refresh/only-export-components` / `react-hooks/exhaustive-deps` — non-blocking)
