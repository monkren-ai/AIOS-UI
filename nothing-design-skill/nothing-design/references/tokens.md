# Nothing Design System — Tokens

## 1. TYPOGRAPHY

### Font Stack

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| **Display** | `"Doto"` | `"Space Mono", monospace` | 400–700, variable dot-size |
| **Body / UI** | `"Space Grotesk"` | `"DM Sans", system-ui, sans-serif` | Light 300, Regular 400, Medium 500, Bold 700 |
| **Data / Labels** | `"Space Mono"` | `"JetBrains Mono", "SF Mono", monospace` | Regular 400, Bold 700 |

**Why these fonts:** Doto = variable dot-matrix (closest to NDot 57). Space Grotesk + Space Mono by Colophon Foundry — same foundry as Nothing's actual typefaces. Shared design DNA.

### Type Scale

| Token | Size | Line Height | Letter Spacing | Use |
|-------|------|-------------|----------------|-----|
| `--display-xl` | 72px | 1.0 | -0.03em | Hero numbers, time displays |
| `--display-lg` | 48px | 1.05 | -0.02em | Section heroes, percentages |
| `--display-md` | 36px | 1.1 | -0.02em | Page titles |
| `--heading` | 24px | 1.2 | -0.01em | Section headings |
| `--subheading` | 18px | 1.3 | 0 | Subsections |
| `--body` | 16px | 1.5 | 0 | Body text |
| `--body-sm` | 14px | 1.5 | 0.01em | Secondary body |
| `--caption` | 12px | 1.4 | 0.04em | Timestamps, footnotes |
| `--label` | 11px | 1.2 | 0.08em | ALL CAPS monospace labels |

### Typographic Rules

- **Doto:** 36px+ only, tight tracking, never for body text
- **Labels:** Always Space Mono, ALL CAPS, 0.06–0.1em spacing, 11–12px ("instrument panel" labels)
- **Data/Numbers:** Always Space Mono. Units as `--label` size, slightly raised, adjacent
- **Hierarchy:** display (Doto) > heading (Space Grotesk) > label (Space Mono caps) > body (Space Grotesk). Four levels max.

---

## 2. COLOR SYSTEM

### Primary Palette (Dark Mode)

| Token | Hex | Contrast on #000 | Role |
|-------|-----|-------------------|------|
| `--black` | `#000000` | — | Primary background (OLED) |
| `--surface` | `#111111` | 1.3:1 | Elevated surfaces, cards |
| `--surface-raised` | `#1A1A1A` | 1.5:1 | Secondary elevation |
| `--border` | `#222222` | — | Subtle dividers (decorative only) |
| `--border-visible` | `#333333` | — | Intentional borders, wireframe lines |
| `--text-disabled` | `#666666` | 4.0:1 | Disabled text, decorative elements |
| `--text-secondary` | `#999999` | 6.3:1 | Labels, captions, metadata |
| `--text-primary` | `#E8E8E8` | 16.5:1 | Body text |
| `--text-display` | `#FFFFFF` | 21:1 | Headlines, hero numbers |

### Accent & Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#D71921` | Signal light: active states, destructive, urgent. One per screen as UI element. Never decorative. |
| `--accent-subtle` | `rgba(215,25,33,0.15)` | Accent tint backgrounds |
| `--success` | `#4A9E5C` | Confirmed, completed, connected |
| `--warning` | `#D4A843` | Caution, pending, degraded |
| `--error` | `#D71921` | Shares accent red — errors ARE the accent moment |
| `--info` | `#999999` | Uses secondary text color |
| `--interactive` | `#007AFF` / `#5B9BF6` | Tappable text: links, picker values. Not for buttons. |

**Data status colors:** `--success` = good/in range, `--warning` = moderate/attention, `--accent` = bad/over limit, `--text-primary` = neutral. Apply color to **value**, not label or background. Labels stay `--text-secondary`. Trend arrows inherit value color.

### Dark / Light Mode

| Token | Dark | Light |
|-------|------|-------|
| `--black` | `#000000` | `#E1E5EA` |
| `--surface` | `#111111` | `#FFFFFF` |
| `--surface-raised` | `#1A1A1A` | `#F0F0F0` |
| `--border` | `#222222` | `#E8E8E8` |
| `--border-visible` | `#333333` | `#CCCCCC` |
| `--text-disabled` | `#666666` | `#999999` |
| `--text-secondary` | `#999999` | `#666666` |
| `--text-primary` | `#E8E8E8` | `#1A1A1A` |
| `--text-display` | `#FFFFFF` | `#000000` |
| `--interactive` | `#5B9BF6` | `#007AFF` |

**Identical across modes:** Accent red, status colors, ALL CAPS labels, fonts, type scale, spacing, component shapes.

**Dark feel:** Instrument panel in a dark room. OLED black, white data glowing.
**Light feel:** Printed technical manual. Off-white paper (#E1E5EA), black ink. Cards = `#FFFFFF` on off-white page = subtle elevation without shadows.

---

## 3. SPACING

### Spacing Scale (8px base)

| Token | Value | Use |
|-------|-------|-----|
| `--space-2xs` | 2px | Optical adjustments only |
| `--space-xs` | 4px | Icon-to-label gaps, tight padding |
| `--space-sm` | 8px | Component internal spacing |
| `--space-md` | 16px | Standard padding, element gaps |
| `--space-lg` | 24px | Group separation |
| `--space-xl` | 32px | Section margins |
| `--space-2xl` | 48px | Major section breaks |
| `--space-3xl` | 64px | Page-level vertical rhythm |
| `--space-4xl` | 96px | Hero breathing room |

---

## 4. MOTION & INTERACTION

- **Duration:** 150–250ms micro, 300–400ms transitions
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` — subtle ease-out. No spring/bounce.
- Prefer opacity over position. Elements fade, don't slide.
- Hover: border/text brightens. No scale, no shadows.
- No parallax, scroll-jacking, gratuitous animation.

---

## 5. ICONOGRAPHY

- Monoline, 1.5px stroke, no fill. 24x24 base, 20x20 live area. Round caps/joins.
- Color inherits text color. Max 5–6 strokes.
- Preferred: Lucide (thin), Phosphor (thin). Never filled or multi-color.

---

## 6. DOT-MATRIX MOTIF

**When to use:** Hero typography (Doto), decorative grid backgrounds, dot-grid data viz, loading indicators, empty state illustrations.

### CSS Implementation
```css
.dot-grid {
  background-image: radial-gradient(circle, var(--border-visible) 1px, transparent 1px);
  background-size: 16px 16px;
}
.dot-grid-subtle {
  background-image: radial-gradient(circle, var(--border) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
}
```

Dots 1–2px, uniform 12–16px grid. Opacity 0.1–0.2 for backgrounds, full for data. Never as container border or button style.

---

## 7. WIDGET SUBSYSTEM TOKENS

The Widget subsystem uses a separate set of tokens that intentionally differ from the main UI system, mimicking Nothing Phone's home screen widget aesthetic.

### Widget Background Tokens

| Token | Dark | Light | Role |
|-------|------|-------|------|
| `--widget-bg` | `#1a1d1c` | `#E1E5EA` | Widget panel background |
| `--widget-card-bg` | `#e1e5ea` | `#FFFFFF` | Widget card background |
| `--widget-dark-bg` | `#1a1d1c` | `#F0F0F0` | Dark widget background |
| `--widget-dark-2` | `#2a2d2c` | `#D0D0D0` | Secondary dark widget surface |
| `--widget-dark-3` | `#3a3d3c` | `#A0A0A0` | Tertiary dark widget surface |
| `--widget-dark-4` | `#4a4d4c` | `#CCCCCC` | Quaternary dark widget surface |

### Widget Text & Accent Tokens

| Token | Value | Role |
|-------|-------|------|
| `--widget-primary` | `#D71921` | Widget accent (same as `--accent`) |
| `--widget-grey` | `#AEABB1` | Widget secondary text/icon color |
| `--widget-dot-active` | `#D71921` | Active dot indicator |
| `--widget-white` | `#FCFAFE` | Widget primary text |
| `--widget-white-70` | `rgba(252, 250, 254, 0.7)` | Widget secondary text |
| `--widget-text-on-accent` | `rgba(255, 255, 255, 0.7)` | Text on accent backgrounds |
| `--widget-error` | `#D71921` | Widget error state |

### Widget Typography Tokens

| Token | Font | Role |
|-------|------|------|
| `--font-ndot` | `"NDOT 47"` | Large numeric displays in widgets |
| `--font-widget` | `"Space Grotesk"` | Widget body text (same as `--font-body`) |

### Widget Sizing Tokens

| Token | Value | Role |
|-------|-------|------|
| `--widget-size-sm` | `152px` | Small widget size |
| `--widget-size-md` | `324px` | Medium widget size |
| `--widget-size-lg` | `324px` | Large widget size |
| `--widget-bg-height` | `312px` | Widget background height |

**Note:** Widget tokens are intentionally different from main UI tokens. This is a deliberate design choice to match Nothing Phone's widget panel aesthetic, not an inconsistency.

---

## 8. PATH ALIASES & UTILITIES (React UI Kit)

The React UI Kit configures a set of `@/` path aliases (in `tsconfig.json` + `vite.config.ts`) to avoid deep relative imports like `../../../lib/utils`.

### Available Aliases

| Alias | Resolves To | Use |
|-------|-------------|-----|
| `@/components` | `src/components/*` | All component modules |
| `@/lib` | `src/lib/*` | Utility libraries (cn, variants, hooks) |
| `@/lib/utils` | `src/lib/utils.ts` | `cn()`, `mergeRefs()`, `dataAttr()` |
| `@/lib/variants` | `src/lib/variants.ts` | `themeVariants`, `sizeVariants`, `stateVariants` |
| `@/hooks` | `src/hooks/*` | Reusable React hooks |
| `@/styles` | `src/styles/*` | Global CSS files |
| `@/system` | `src/system/*` | Telemetry / boot / fake data |

### `cn()` — Class Name Merger

`cn()` (from `@/lib/utils`) wraps `clsx` to support conditional, object, and array class names. It's the single source of truth for className composition:

```tsx
import { cn, dataAttr } from '@/lib/utils'

// Conditional
cn('base', isActive && 'is-active')

// Object syntax
cn('base', { 'is-active': isActive, 'is-disabled': isDisabled })

// Arrays
cn(['base', isLarge ? 'text-lg' : 'text-sm'])

// Mixed (most common)
cn(buttonVariants({ variant, size }), isActive && 'is-active', className)
```

**Why not `tailwind-merge`?** Nothing UI uses pure CSS files (not Tailwind), so there's no Tailwind class conflict to resolve. Plain `clsx` is enough.

### `dataAttr()` — data-* Attribute Helper

Convert arbitrary prop values to safe HTML data-* values:

```tsx
import { dataAttr } from '@/lib/utils'

<button
  data-variant={dataAttr(variant)}     // → "primary" or undefined (omitted)
  data-size={dataAttr(size)}           // → "lg" or undefined (omitted)
  data-state={active ? 'on' : 'off'}   // → always present
/>
```

`dataAttr` returns:
- `undefined` for `undefined` / `null` / `false` → React omits the attribute
- `''` (empty string) for `true` → attribute present, empty value
- the value itself for strings and numbers

### Shared CVA Variants (`@/lib/variants.ts`)

```tsx
import { themeVariants, sizeVariants, stateVariants } from '@/lib/variants'

// Theme switching
className={cn(themeVariants({ theme: 'dark' }))}

// Size selection
className={cn(sizeVariants({ size: 'md' }))}

// State (on/off/loading/etc)
className={cn(stateVariants({ state: 'on' }))}
```

These exist to prevent every component from redefining the same `light/dark/accent` enum. When building a new variant-aware component, **prefer** using these shared factories.

#### v4 additions (2026-06)

Three more shared factories are now exported alongside the originals:

| Factory | Variants | Use case |
|---------|----------|----------|
| `stateOnOffVariants` | `on`, `off` | Binary on/off surfaces (toggles, switches) |
| `orientationVariants` | `horizontal`, `vertical` | Direction-sensitive layouts (separator, slider) |
| `emphasisVariants` | `primary`, `secondary` | Strength/weight dimension (CTA hierarchy) |
| `statusVariants` | `good`, `warning`, `overlimit`, `info` | Data-value encoding (battery, progress, gauge) |

### Component Metadata (`components.json`)

The `web-ui-kit/react/components.json` file documents the project structure, alias mappings, and engine requirements. It's a shadcn-style metadata file that documents the design system for tooling and future CLI integration.
