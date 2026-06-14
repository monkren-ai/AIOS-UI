# Plan: Component Duplication & Consolidation Analysis (Read-Only)

## Summary
The user requested a read-only analysis of all 138 components in
`c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react\src\components`
to find functionally similar / duplicate component groups across four dimensions:
1. **完全重复 (Exact duplicates)** – files that differ only by a numeric suffix
2. **功能重叠 (Functional overlap)** – components whose core responsibility overlaps
3. **可合并 (Mergeable via props)** – sub-components that can be unified under a single `variant` prop
4. **底层可复用 (Shared underlying logic)** – repeated hooks/state/animations/SVG-icon patterns

Output: a single JSON report. **No code changes** – the user explicitly said
"请只读分析，不要写代码".

## Current State Analysis (from Phase 1 exploration)

- **138 .tsx files** total (excluding `index.ts`); 102 in root, 13 in `nullframe/`, 17 in `widgets/` (12 wrappers + 5 infrastructure) + 41 in `widgets/sub/` (auto-generated index re-exports 43)
- 41 sub-components share a near-identical scaffold:
  ```ts
  const widgetSubVariants = cva('', { variants: { theme, size } })
  interface WidgetSubProps { theme?; size?; className?; 'aria-label'?; style? }
  export const X = React.forwardRef<HTMLDivElement, WidgetSubProps>((...) => <div ... />)
  ```
- `nullframe/*Card.tsx` (8 files) all wrap `NfCard` and differ mostly in body content + `cva` variant name.
- `widgets/{Time,Weather,Activity,Steps,AnalogClock,Compass,PhotoFrame,...}Widget.tsx` already use `withWidgetCard` HOC and `cva` variants — good model for the duplicates.
- `withWidgetCard.tsx` already exists as the merging mechanism.
- `SvgIcon.tsx`, `WidgetPill.tsx` are the established "shared building block" pattern (theme/size CVA + icon path).

## Proposed Plan (deliverable: JSON only)

Write a single JSON report to the chat (no file writes beyond this plan file). Structure:

```jsonc
{
  "meta": { "total_files": 138, "root": 102, "nullframe": 13, "widgets_root": 17, "widgets_sub": 41 },
  "exact_duplicates": [ /* 8 groups: Card/Card1/Card2/Card3, Active/Active1, OverLimit/OverLimit1, LocationAccess/LocationAccess1, Watch1/WatchAnalog, Weather1/Weather2, Recording/Record2, Glyphs1/Glyphs2 */ ],
  "functional_overlap": {
    "time_clock": [ "Clock.tsx", "WorldClock.tsx", "TimeWidget.tsx", "widgets/sub/Time.tsx", "widgets/sub/Watch1.tsx", "widgets/sub/WatchAnalog.tsx", "widgets/sub/TotalTime.tsx", "nullframe/ClockHero.tsx", "Chrono.tsx", "Pomodoro.tsx", "widgets/AnalogClockWidget.tsx", "widgets/DigitalClockLargeWidget.tsx" ],
    "weather":     [ "WeatherWidget.tsx", "widgets/sub/Weather1.tsx", "widgets/sub/Weather2.tsx" ],
    "music":       [ "MusicPlayer.tsx (root)", "widgets/sub/MusicPlayer.tsx", "widgets/sub/Music.tsx" ],
    "battery":     [ "Battery.tsx", "nullframe/BatteryCard.tsx" ],
    "card":        [ "Card.tsx (root)", "widgets/sub/Card.tsx", "widgets/sub/Card2.tsx", "widgets/sub/Card3.tsx" ],
    "icon_pill":   [ "WidgetPill.tsx", "WidgetPills.tsx", "Badge.tsx" ],
    "data_list":   [ "DataGrid.tsx", "DataRows.tsx", "Table.tsx" ],
    "nav":         [ "Navigation.tsx", "NavigationMenu.tsx", "Breadcrumb.tsx", "Tabs.tsx" ],
    "modal_layer": [ "Modal.tsx", "Sheet.tsx", "Drawer/HoverCard/Popover/ContextMenu" ],
    "dot_matrix":  [ "DotMatrix.tsx", "widgets/Glyph.tsx" ]
  },
  "mergeable_via_variant": [
    /* per group: { from: ["Active","Active1"], into: "Active", variant: "icon" | "size" | "shape", delta: "low" } */
  ],
  "shared_underlying_logic": [
    { "id": "useNow/tick",     "where": "Clock, WorldClock, TimeWidget, AnalogClockWidget, ClockHero" },
    { "id": "useTypedText",    "where": "ActivityCard (typed feed), ClockHero (TypedStatus)" },
    { "id": "useScramble",     "where": "ClockHero (number scramble on reroll)" },
    { "id": "cva widget-sub",  "where": "all 41 widgets/sub/* — should live in widgets/widget-sub.ts" },
    { "id": "icon-themer",     "where": "WidgetIcons, WidgetPills, widgets/sub/Active*/LocationAccess*/... (svgPath + theme tokens)" },
    { "id": "withWidgetCard",  "where": "every widgets/*Widget.tsx — already extracted" },
    { "id": "dot-matrix glyph mapping", "where": "WeatherWidget, Glyph, widgets/sub/Weather1 (5x5/7x5 dot grids)" },
    { "id": "motion-spring entry", "where": "NfCard + ActivityCard (motion.section, spring 380/26, delay = index*0.07)" },
    { "id": "pad/stamp time helpers", "where": "ActivityCard, ClockHero (duplicate pad(n) + stamp() helpers)" }
  ],
  "merge_priority": [
    /* sorted low→high risk; each item: { group, target, reason, risk, est_files_removed } */
  ]
}
```

### Merge priority order (low → high risk)

1. **Pill icon family** (`WidgetPills.tsx` re-exports ~20 thin wrappers around `WidgetPill` → collapse to one `<WidgetPill icon={<...>} />`).
2. **Card/Card1/Card2/Card3** → `Card variant="a|b|c"` (only the image + size differ).
3. **Active / Active1** → `Active icon={...} label={...}`.
4. **OverLimit / OverLimit1** (same file, lowercase + uppercase exports).
5. **LocationAccess / LocationAccess1** → `variant`.
6. **Watch1 / WatchAnalog** → `Watch variant="digital|analog"`.
7. **Recording / Record2** → `Record variant`.
8. **Glyphs1 / Glyphs2** → `Glyph variant`.
9. **Time cluster** (`Clock` + `WorldClock` + `TimeWidget` + `widgets/sub/Time` + `Watch1/Analog` + `ClockHero` + `Chrono` + `Pomodoro`) — biggest payoff, mid risk (props diverge).
10. **Weather cluster** (`WeatherWidget` + `Weather1` + `Weather2`) — middle.
11. **Music cluster** (`MusicPlayer` root + `sub/MusicPlayer` + `sub/Music`) — middle.
12. **Nullframe cards** (`ActivityCard`, `BatteryCard`, `ContributionsCard`, `MemoryCard`, `NetworkCard`, `StreakCard`, `SeismoCard`, `GlyphCard`) — all wrap `NfCard`; mid risk.
13. **DataGrid/DataRows/Table** — high risk (different APIs).
14. **Modal/Sheet/Popover/HoverCard/ContextMenu** — high risk (radix / portal semantics differ).

### Shared-logic extraction (independent of merge)

- Extract `useNow(interval)` (currently inlined in `Clock`, `WorldClock`, `TimeWidget`, `AnalogClockWidget`, `ClockHero`).
- Extract `useTypedText(messages, { typeMs, holdMs, eraseMs })` (ActivityCard + ClockHero).
- Move `widgetSubVariants` + `WidgetSubProps` from 41 sub-components to a single `widgets/widget-sub.ts`.
- Centralise theme/icon color tokens (currently `themeBgTokens` / `themeIconTokens` exist in `SvgIcon` and are duplicated in every sub-component).
- Add `<DotGlyph pattern="..." />` so WeatherWidget / sub-Weather* / Glyph share one 5×5 grid renderer.
- Add `<MotionCard index={n}>` HOC to factor NfCard's `motion.section` + spring config.
- Add `pad2/stamp` helpers to `lib/time.ts`.

## Assumptions & Decisions
- The user wants only the JSON report — no code modifications, no new files, no plan execution beyond this analysis file.
- File count is 138 (per `Get-ChildItem -Filter '*.tsx'`); the user's 113 likely includes only components that export a `default` or named component, excluding pure utility / type-only files. The JSON reports both numbers.
- "Risk" = how invasive the merge is (API change, public-export churn, test impact, CSS-class dependencies), not correctness.

## Verification
The plan produces no code; "verification" = cross-checking the JSON groups against the actual file names in the directory listing captured in Phase 1. Every group member is referenced by a real file path under
`c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react\src\components`.
