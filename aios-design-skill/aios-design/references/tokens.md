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

### Line Height Tokens

| Token | Value | Paired with |
|-------|-------|-------------|
| `--leading-display-xl` | 1.0 | `--display-xl` |
| `--leading-display-lg` | 1.05 | `--display-lg` |
| `--leading-display-md` | 1.1 | `--display-md` |
| `--leading-heading` | 1.2 | `--heading` |
| `--leading-subheading` | 1.3 | `--subheading` |
| `--leading-body` | 1.5 | `--body` |
| `--leading-body-sm` | 1.5 | `--body-sm` |
| `--leading-caption` | 1.4 | `--caption` |
| `--leading-label` | 1.2 | `--label` |

### Letter Spacing Tokens

| Token | Value | Paired with |
|-------|-------|-------------|
| `--tracking-display-xl` | -0.03em | `--display-xl` |
| `--tracking-display-lg` | -0.02em | `--display-lg` |
| `--tracking-display-md` | -0.02em | `--display-md` |
| `--tracking-heading` | -0.01em | `--heading` |
| `--tracking-subheading` | 0 | `--subheading` |
| `--tracking-body` | 0 | `--body` |
| `--tracking-body-sm` | 0.01em | `--body-sm` |
| `--tracking-caption` | 0.04em | `--caption` |
| `--tracking-label` | 0.08em | `--label` |

**Usage:** Always pair `--leading-*` and `--tracking-*` with the corresponding `--display-*` / `--heading` / `--body-*` / `--caption` / `--label` size token. Never use a line-height or letter-spacing token without its size counterpart.

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

### Named Radius by Element

Element-specific radius tokens map generic radius values to component types, ensuring consistency without looking up the generic scale each time.

| Token | Value | Use |
|-------|-------|-----|
| `--radius-button` | 999px | Pill buttons (primary, secondary, destructive) |
| `--radius-button-technical` | 8px | Technical/square buttons |
| `--radius-card` | 16px | Standard cards, widgets |
| `--radius-card-compact` | 8px | Compact cards, dropdowns |
| `--radius-card-technical` | 4px | Technical cards, data grids |
| `--radius-input` | 8px | Bordered inputs |
| `--radius-input-underline` | 0px | Underline inputs (flush) |
| `--radius-tag` | 999px | Pill tags/chips |
| `--radius-tag-technical` | 4px | Technical tags |
| `--radius-tooltip` | 8px | Tooltips |
| `--radius-segment` | 999px | Segmented control container |

---

## 3.5. LAYOUT

Page-level layout tokens for consistent structure across screens.

| Token | Value | Use |
|-------|-------|-----|
| `--page-max-width` | 1120px | Maximum page content width (centered) |
| `--modal-max-width` | 480px | Standard modal dialog width |
| `--modal-max-width-sm` | 400px | Compact modal / confirm dialog |
| `--section-gap` | 80px | Standard vertical gap between sections |
| `--section-gap-lg` | 120px | Large vertical gap for major page divisions |
| `--card-padding` | 24px | Standard card internal padding |
| `--card-padding-sm` | 16px | Compact card internal padding |
| `--element-gap` | 8px | Gap between elements within a group |

### Content Width Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--content-width-narrow` | 640px | Reading text, form fields |
| `--content-width-normal` | 768px | Standard content, articles |
| `--content-width-wide` | 1024px | Data tables, dashboards |
| `--content-width-full` | 1120px | Full page width (same as `--page-max-width`) |

---

## 3.6. BORDER WIDTH & TOUCH TARGET

| Token | Value | Use |
|-------|-------|-----|
| `--border-width-sm` | 1px | Standard borders, dividers, card outlines |
| `--border-width-md` | 2px | Emphasized borders, focus indicators |
| `--border-width-lg` | 4px | Strong separation, decorative borders |
| `--border-width-accent` | 2px | Active row indicator (left bar) |
| `--touch-target-min` | 44px | Minimum touch target size (WCAG 2.5.5) |

---

## 3.7. OPACITY SCALE

Systematic opacity scale for consistent layering and state expression.

| Token | Value | Use |
|-------|-------|-----|
| `--opacity-0` | 0 | Fully transparent |
| `--opacity-10` | 0.1 | Dot-grid backgrounds, subtle textures |
| `--opacity-20` | 0.2 | Decorative overlays |
| `--opacity-30` | 0.3 | Tertiary data visualization |
| `--opacity-40` | 0.4 | Disabled state (per SKILL.md anti-patterns) |
| `--opacity-50` | 0.5 | Equal blend |
| `--opacity-60` | 0.6 | Secondary data visualization |
| `--opacity-70` | 0.7 | Widget secondary text (`--widget-white-70`) |
| `--opacity-80` | 0.8 | Overlay backdrop (`--overlay-heavy`) |
| `--opacity-90` | 0.9 | Near-fully visible |
| `--opacity-100` | 1 | Fully visible |

---

## 3.8. NAMED TRANSITIONS

Pre-composed transition shorthand tokens for common interaction patterns.

| Token | Value | Use |
|-------|-------|-----|
| `--transition-fade` | `var(--duration-micro) var(--easing)` | Opacity fade in/out |
| `--transition-color` | `var(--duration-micro) var(--easing)` | Text/border color change on hover |
| `--transition-border` | `var(--duration-micro) var(--easing)` | Border color/width change |
| `--transition-transform` | `var(--duration-transition) var(--easing)` | Position/scale transform |
| `--transition-opacity` | `var(--duration-micro) var(--easing)` | Opacity-only transition |

**Usage:** `transition: var(--transition-fade);` — cleaner than composing `var(--duration-micro) var(--easing)` each time.

---

## 4. MOTION & INTERACTION

- **Duration:** 150–250ms micro, 300–400ms transitions
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` — subtle ease-out. No spring/bounce.
- Prefer opacity over position. Elements fade, don't slide.
- Hover: border/text brightens. No scale, no shadows.
- No parallax, scroll-jacking, gratuitous animation.

### Named Transitions

See [§3.8 Named Transitions](#38-named-transitions) for pre-composed transition tokens (`--transition-fade`, `--transition-color`, etc.) that pair `--duration-*` with `--easing` for common interaction patterns.

---

## 4.5. FOCUS RING

AIOS UI uses a unified `:focus-visible` pattern across all interactive components. No component should define its own focus outline — always use these tokens.

| Token | Value | Use |
|-------|-------|-----|
| `--focus-ring-width` | 2px | Outline width |
| `--focus-ring-color` | `var(--interactive)` | Outline color (blue) |
| `--focus-ring-offset` | 2px | Outline offset (external, for buttons/inputs) |
| `--focus-ring-offset-inset` | -2px | Outline offset (inset, for dropdown items) |

**Standard pattern (external focus):**
```css
.interactive-element:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

**Inset pattern (for dropdown menu items, list items):**
```css
.menu-item:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset-inset);
}
```

**Rules:**
- Use `:focus-visible` only (not `:focus`) — prevents outline on mouse click, shows on keyboard nav
- Never remove focus outline (`outline: none`) without replacing with an equivalent visible indicator
- Focus color is always `--interactive` (blue), never `--accent` (red)

---

## 4.6. Z-INDEX SCALE

Seven-level z-index scale for predictable layering. Never use arbitrary z-index values — always reference these tokens.

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 1 | Base content layer (default stacking) |
| `--z-dropdown` | 50 | Dropdown menus, select popovers |
| `--z-sticky` | 80 | Sticky headers, sticky sidebars |
| `--z-overlay` | 100 | Full-screen overlays, backdrops, taskbars |
| `--z-popover` | 200 | Popovers, hover cards, tooltips triggered from overlay |
| `--z-tooltip` | 300 | Tooltips (always topmost except modal) |
| `--z-modal` | 1000 | Modal dialogs (always highest) |

**Stacking rules:**
- Dropdowns (`--z-dropdown`) sit below overlays (`--z-overlay`) so a backdrop can cover them
- Tooltips (`--z-tooltip`) sit above popovers (`--z-popover`) so tooltips on popover content are visible
- Modal (`--z-modal`) is always topmost — nothing should appear above a modal except its own tooltips
- Within the same z-index level, DOM order determines stacking

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

**Why not `tailwind-merge`?** AIOS UI uses pure CSS files (not Tailwind), so there's no Tailwind class conflict to resolve. Plain `clsx` is enough.

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

---

## 9. SURFACE & ELEVATION

AIOS UI achieves depth through **surface contrast and borders, never shadows or blur.** This is a core philosophy — the system is flat by design.

### Surface Hierarchy (4 Levels)

| Level | Token | Dark Value | Light Value | Purpose |
|-------|-------|------------|-------------|---------|
| 1 | `--black` | `#000000` | `#FFFFFF` | Page canvas — the dominant background |
| 2 | `--surface` | `#111111` | `#FFFFFF` | Cards, panels, elevated content on dark canvas |
| 3 | `--surface-raised` | `#1A1A1A` | `#F0F0F0` | Secondary elevation (dropdowns, popovers, active rows) |
| 4 | `--border-visible` | `#333333` | `#CCCCCC` | Intentional borders, wireframe lines, structural edges |

**Dark mode:** Level 1 (OLED black) → Level 2 (slightly lifted) → Level 3 (more lifted) → Level 4 (border definition). Each step increases brightness by ~10-15%.

**Light mode:** Level 1 (white) → Level 2 (white, same as canvas — elevation via border) → Level 3 (off-white, subtle warmth) → Level 4 (visible border). Light mode relies more on borders than surface contrast.

### Elevation Patterns (No Shadow)

| Pattern | How | Use |
|---------|-----|-----|
| **Border separation** | `1px solid var(--border-visible)` around a `--surface` card on `--black` canvas | Standard card elevation |
| **Surface contrast** | `--surface-raised` element on `--surface` background | Dropdowns, popovers, active rows |
| **Active indicator** | `2px solid var(--accent)` left bar + `--surface-raised` background | Active row in data table/grid |
| **Backdrop dimming** | `rgba(0,0,0,0.8)` overlay (`--overlay-heavy`) behind modal | Modal/dialog elevation |

**Anti-pattern:** Never use `box-shadow` to create elevation. The system has zero shadow tokens by design. If a element needs to feel "lifted," use surface contrast or border.

---

## 10. IMAGERY

### Photography
- **Not used.** AIOS UI is typographically driven — no stock photos, no lifestyle photography, no hero images.
- Product screenshots (if needed) are displayed inside `--surface` cards with `1px solid var(--border-visible)` border, never full-bleed.

### Illustration
- **Dot-matrix only.** The signature visual motif is the 5×5 (or NxN) dot grid — used for hero typography (Doto font), decorative backgrounds (`.dot-grid`), loading indicators, and empty-state illustrations.
- No mascots, no character illustrations, no isometric scenes, no flat-design people.
- Empty states: centered dot-matrix pattern + headline in `--text-secondary` + 1-sentence description in `--text-disabled`.

### Icons
- **Monoline only:** 1.5px stroke, no fill, round caps/joins. 24×24 base, 20×20 live area.
- Color inherits text color (`currentColor`). Never multi-color, never filled.
- Max 5–6 strokes per icon — if more, the icon is too complex.
- Preferred libraries: Lucide (thin), Phosphor (thin). Never Material filled, never Font Awesome solid.

### Data Visualization Imagery
- Charts: line 1.5–2px `--text-display`, average dashed 1px `--text-secondary`. No area fill.
- Differentiate series by **opacity** (100%/60%/30%) → **pattern** (solid/striped/dotted) → **line style** (solid/dashed) → **color** (last resort, only for status encoding).
- Always show numeric value alongside any visual — the visual is supplementary, the number is primary.

---

## 11. LAYOUT GUIDELINES

### Page Structure
- **Max width:** `var(--page-max-width)` (1120px) centered on canvas. Content beyond this width is rare and intentional.
- **Section rhythm:** `var(--section-gap)` (80px) between standard sections, `var(--section-gap-lg)` (120px) between major page divisions.
- **No sidebars by default.** Single-column or 2-column max. Sidebars only in app-shell contexts (dashboard, settings).

### Content Width Selection
| Content Type | Token | Width |
|-------------|-------|-------|
| Reading text, form fields | `--content-width-narrow` | 640px |
| Standard content, articles | `--content-width-normal` | 768px |
| Data tables, dashboards | `--content-width-wide` | 1024px |
| Full page width | `--content-width-full` | 1120px |

### Grid
- **CSS Grid** preferred for multi-column layouts. `grid-template-columns: repeat(auto-fit, minmax(var(--card-min-width), 1fr))` for responsive card grids.
- **Flexbox** for single-row alignment (nav bars, button groups, stat rows).
- No CSS framework grid (no Bootstrap, no Tailwind grid). Pure CSS Grid/Flexbox.

### Card Layout
- Card padding: `var(--card-padding)` (24px) standard, `var(--card-padding-sm)` (16px) compact.
- Card gap within a grid: `var(--space-md)` (16px) standard, `var(--space-lg)` (24px) spacious.
- Card radius: `var(--radius-card)` (16px) standard, `var(--radius-card-compact)` (8px) compact, `var(--radius-card-technical)` (4px) technical.

### Asymmetry
- Favor **asymmetric** layouts over centered ones. Large-left-small-right, top-heavy, or edge-anchored compositions.
- Balance heavy elements with **more empty space**, not with more heavy elements.
- The "Three-Layer Rule" (see SKILL.md §2.1) governs visual hierarchy within any layout.

---

## 12. AI OS / AGENT TOKENS

Tokens for the **AIOS UI for AI OS** semantic extension. These tokens support agent-state visualization, plan transparency, and approval workflows while remaining strictly inside the monochrome + red-event palette.

### Agent State Colors

| Token | Maps To | Use |
|-------|---------|-----|
| `--agent-idle` | `var(--text-secondary)` | Agent待命 / 未激活 |
| `--agent-thinking` | `var(--text-primary)` | Agent思考中（单色呼吸） |
| `--agent-acting` | `var(--text-display)` | Agent执行中（高对比） |
| `--agent-paused` | `var(--accent)` | 等待用户输入 / 审批（red event） |
| `--agent-error` | `var(--accent)` | Agent错误（与 paused 同色，以形态区分） |
| `--agent-trace` | `var(--surface-raised)` | 轨迹日志背景 |
| `--surface-agent` | `var(--surface)` | Agent面板背景 |
| `--border-agent` | `var(--border-visible)` | Agent卡片边框 |

**Discipline:** No new colors are introduced. Agent states are expressed through the existing gray scale plus the existing `--accent` red. Differentiation comes from opacity, animation, and Doto/Space Mono label pairing — not from additional hues.

### Agent Animation Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-agent-breathe` | `2000ms` | Agent thinking 慢速呼吸 |
| `--duration-agent-pulse` | `800ms` | Agent acting 快速脉冲 |
| `--duration-agent-step` | `1200ms` | PlanCard 步骤进场 |
| `--animation-agent-breathe` | `agent-breathe var(--duration-agent-breathe) ease-in-out infinite` | AgentOrb thinking |
| `--animation-agent-pulse` | `agent-pulse var(--duration-agent-pulse) ease-in-out infinite` | AgentOrb acting |
| `--animation-agent-step` | `agent-step var(--duration-agent-step) var(--easing) forwards` | PlanCard / ToolCallRow 步骤出现 |

### Agent Radius Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--radius-agent-orb` | `999px` | AgentOrb 圆形 |
| `--radius-agent-chip` | `999px` | 上下文建议胶囊（ContextChip） |
| `--radius-agent-card` | `var(--radius-card)` | PlanCard / TraceLog 卡片 |
| `--radius-agent-card-compact` | `var(--radius-card-compact)` | 紧凑 agent 卡片 |

### Agent Keyframes

```css
@keyframes agent-breathe {
  0%, 100% { opacity: 0.4; transform: scale(0.96); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes agent-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes agent-step {
  0% { opacity: 0; transform: translateY(2px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

**Rules:**
- Agent animations use only `opacity` and `transform` — no blur, no shadow.
- The breathing animation is slow and meditative (2s), not frantic.
- The pulse is faster (0.8s) but still subtle; it signals "acting," not alarm.
- All agent tokens are theme-agnostic because they reference existing semantic tokens that already respond to `data-theme`.
