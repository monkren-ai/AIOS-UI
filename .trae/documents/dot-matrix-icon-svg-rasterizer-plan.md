# Dot Matrix Icon — SVG → Dot-Grid Rasterizer with Random Pulse

## Summary

Add a new `DotMatrixIcon` component that turns pasted `<svg>...</svg>` markup into a crisp dot-grid render. It rasterizes the SVG to a canvas, samples alpha at each cell of a configurable `rows × cols` grid, and draws a circular dot wherever alpha exceeds a threshold. Supports custom base/active colors, background, radius, and an optional **Random Pulse** animation that periodically highlights a percentage of dots using an active color.

This is a **new component** — the existing `DotMatrix` (manual `activeDots` arrays, used by `Glyph`) is left untouched to avoid breaking changes.

***

## Current State Analysis

### Existing components (do NOT modify)

* **[DotMatrix.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/DotMatrix.tsx)**: renders `rows × cols` grid from `activeDots`/`dimDots` `[r,c][]`. Variants: `dotSize` (sm/md/lg), `theme` (light/dark), `pattern` (grid/glyph/pulse/custom). The `pulse` pattern animates **all** active dots uniformly via CSS keyframes — not a random subset.

* **[Glyph.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/Glyph.tsx)**: \~40 hardcoded 7×7 patterns, wraps DotMatrix.

* **[SvgIcon.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/widgets/SvgIcon.tsx)**: renders SVG inside a circular badge — not dot-based.

### Conventions to follow

* `forwardRef` + `displayName`, `cva` for variants, `cn` from `lib/utils`, `dataAttr` for data-\* attributes.

* CSS in `src/styles/*.css` using design tokens (`--widget-*`); imported at top of `.tsx`.

* Tokens available: `--widget-primary` (#D71921), `--widget-dark-bg`, `--widget-white`, `--widget-dark-2`, `--widget-dark-4`, `--widget-dot-sm/md/lg` (3/6/7px), `--duration-transition`, `--easing`.

* Showcase pattern in [App.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx#L1219-L1225): `DotMatrix` is demoed under "视觉展示 / Visual Display" category.

### Gap

No component currently: (a) accepts raw SVG markup, (b) rasterizes to a dot mask via alpha threshold, (c) supports custom base/active/background colors + radius, or (d) runs a random-subset pulse with `Active %` + `Speed ms`.

***

## Proposed Changes

### 1. New component: `src/components/DotMatrixIcon.tsx`

**Responsibility**: SVG string → canvas rasterization → alpha-thresholded dot grid → optional Random Pulse.

**Props** (TypeScript interface):

```ts
export interface DotMatrixIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  // SVG source
  svg: string                              // full <svg>...</svg> markup
  // Grid resolution
  rows: number                             // default 24
  cols: number                             // default 24
  // Alpha threshold
  alphaThreshold?: number                  // 0–255, default 128
  // Style controls
  dotSize?: number                         // px, default 6
  baseColor?: string                       // default 'var(--widget-dark-2)'
  activeColor?: string                     // default 'var(--widget-primary)'
  backgroundColor?: string                 // default 'transparent'
  radius?: number                          // container corner radius px, default 0
  // Random Pulse animation
  anim?: 'none' | 'random'                 // default 'none'
  activePercent?: number                   // 0–100, default 20
  speedMs?: number                         // pulse cycle ms, default 1200
}
```

**Rasterization algorithm** (in a `useMemo` keyed on `svg + rows + cols + alphaThreshold`):

1. Parse `svg` string via `DOMParser` to extract/normalize viewBox; if missing, read `width`/`height`. Fallback to `0 0 100 100`.
2. Serialize to a data URL: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`.
3. Load into an `Image`; on load, draw to an offscreen `<canvas>` sized `cols × rows` (1px per cell — we only need alpha per cell, not full resolution). Use `ctx.drawImage(img, 0, 0, cols, rows)`.
4. `ctx.getImageData(0, 0, cols, rows)` → for each cell `(r, c)`, read pixel alpha at index `(r*cols + c)*4 + 3`. If `alpha >= alphaThreshold`, mark cell as "on".
5. Return `onCells: boolean[][]` (rows×cols).
6. Handle load error → empty grid + `data-error="true"` attribute on root.

**Random Pulse** (only when `anim === 'random'`):

* `useEffect` sets up `setInterval(speedMs)`.

* Each tick: from the set of "on" cells, randomly select `floor(onCount * activePercent / 100)` cells → store as `pulsingCells: Set<string>` in state.

* `prefers-reduced-motion`: skip the interval (render all on-cells with `activeColor` statically, no swapping).

* Cleanup: clear interval on unmount / prop change.

**Render**:

* Root `<div>` with class `nothing-dot-matrix-icon`, inline styles for `backgroundColor`, `borderRadius` (radius), CSS grid `gridTemplateColumns: repeat(cols, ...)`, `gap`.

* Each cell is a `<div>` with class `nothing-dot-matrix-icon__dot`, inline `width/height: dotSize`, `borderRadius: 50%`.

* Cell color logic:

  * If cell is "off" → `baseColor` at low opacity (dimmed base) — actually per spec, off cells draw **no dot**. Re-read spec: "draws circular dots wherever the SVG alpha exceeds your threshold". So off cells = empty/transparent. On cells = `baseColor` normally; `activeColor` when pulsing.

  * Off cell: render empty `<div>` (no background) to preserve grid layout.

  * On cell, not pulsing: `backgroundColor: baseColor`.

  * On cell, pulsing: `backgroundColor: activeColor` + CSS transition.

* `data-anim={dataAttr(anim)}`, `data-rows`, `data-cols` for styling hooks.

**Performance notes** (from spec's "Limitations"):

* Cap `rows*cols` at a sane max (e.g. 96×96 = 9216 cells) with a dev warning; avoid rendering thousands of DOM nodes.

* Canvas rasterization is cheap (1px per cell); the DOM cost is the bottleneck.

### 2. New stylesheet: `src/styles/dot-matrix-icon.css`

Minimal — most styling is inline (custom colors). CSS handles:

* `.nothing-dot-matrix-icon`: `display: inline-grid`.

* `.nothing-dot-matrix-icon__dot`: `border-radius: 50%`, `transition: background-color var(--duration-transition) var(--easing)`.

* `@media (prefers-reduced-motion: reduce)` → disable transitions on dots.

* A subtle `nothing-dot-matrix-icon__dot--pulse` keyframe for a soft fade when a dot becomes active (optional polish).

### 3. Showcase demo: update `src/App.tsx`

In the "视觉展示 / Visual Display" category (around [line 1219](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx#L1219)), add a new section after the existing DotMatrix demos:

* Import `DotMatrixIcon` and the CSS.

* Demo 1: a simple pasted SVG (e.g. a heart or star path) at 24×24, `alphaThreshold` 128.

* Demo 2: same SVG with `anim="random"`, `activePercent={20}`, `speedMs={1000}`, custom `activeColor`.

* Demo 3: a logo-style SVG at higher resolution (e.g. 32×32) with `backgroundColor` and `radius`.

### 4. Documentation: update `COMPONENTS.md`

Add a `DotMatrixIcon` entry under "视觉展示组件 (Visual Display)" section (near the existing `DotMatrix` entry around [line 423](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/COMPONENTS.md#L423)) with file path, description, and props list.

***

## Assumptions & Decisions

1. **New component, not extending DotMatrix.** The existing DotMatrix is consumed by Glyph with a fixed API; adding SVG-rasterization + custom colors + random-pulse would bloat it and risk breaking Glyph. A focused new component is cleaner.
2. **Off cells render as empty divs** (transparent, no dot) per the spec: "draws circular dots wherever the SVG alpha exceeds your threshold". Empty divs keep the CSS grid intact.
3. **Canvas at 1px per cell** — we only need per-cell alpha, so rasterizing at `cols×rows` resolution is both fast and accurate for the threshold decision. No need for full-resolution sampling + downsampling.
4. **Custom colors via inline styles** (not CSS classes) since they're user-provided values; falls back to design tokens when undefined.
5. **Random Pulse picks a fresh random subset each tick** (not a smooth wave) — matches "periodically highlight a percentage of dots". Reduced-motion users see all on-cells in `activeColor` statically.
6. **SVG parsing uses DOMParser** (browser-native, available in Vite dev/build). No external dependency added.
7. **No new npm dependencies.** Reuses existing stack only.
8. **Grid cap** at 96×96 to prevent DOM explosion on low-end devices (spec's "Limitations" note).

***

## Verification Steps

1. `npm run type-check` — ensure `DotMatrixIcon.tsx` has no TS errors.
2. `npm run lint` — ensure ESLint passes.
3. `npm run dev` — open the showcase, navigate to "视觉展示 / Visual Display":

   * Confirm Demo 1 renders the SVG silhouette as dots; adjusting `alphaThreshold` (via a quick dev toggle) adds/removes dots.

   * Confirm Demo 2 shows dots randomly switching to `activeColor` every `speedMs`.

   * Confirm Demo 3 shows the logo with background + rounded corners.
4. Test with a complex SVG (e.g. one with strokes/filters) to confirm graceful degradation (spec notes these may rasterize differently — verify no crash, just different silhouette).
5. Test `prefers-reduced-motion` (DevTools → Rendering → Emulate reduced motion) → confirm Random Pulse stops and all on-cells show `activeColor` statically.
6. Test invalid SVG string → confirm `data-error="true"` set, empty grid rendered, no console crash.
7. Verify existing `DotMatrix` and `Glyph` demos still render unchanged (no regressions).

