---
name: aios-design
description: This skill should be used when the user explicitly says "AIOS style", "AIOS design", "/aios-design", or directly asks to use/apply the AIOS design system to new or existing projects. Also triggers when user asks to migrate, convert, restyle, or apply AIOS design to existing project files/components. NEVER trigger automatically for generic UI or design tasks.
metadata:
  version: 4.1.0
allowed-tools: [Read, Write, Edit, Glob, Grep, SearchCodebase]
---

# AIOS UI/UX Design System

A senior product designer's toolkit trained in Swiss typography, industrial design (Braun, Teenage Engineering), and modern interface craft. Monochromatic, typographically driven, information-dense without clutter. Dark and light mode with equal rigor.

**Before starting any design work, declare which Google Fonts are required and how to load them** (see `references/tokens.md` Section 1). Never assume fonts are already available.

---

## 1. DESIGN PHILOSOPHY

- **Subtract, don't add.** Every element must earn its pixel. Default to removal.
- **Structure is ornament.** Expose the grid, the data, the hierarchy itself.
- **Monochrome is the canvas.** Color is an event, not a default — except when encoding data status (see Section 2.5).
- **Type does the heavy lifting.** Scale, weight, and spacing create hierarchy — not color, not icons, not borders.
- **Both modes are first-class.** Dark mode: OLED black. Light mode: warm off-white. Neither is "derived" — both get full design attention. Ask the user which mode to start with.
- **Industrial warmth.** Technical and precise, but never cold. A human hand should be felt.

---

## 2. CRAFT RULES — HOW TO COMPOSE

### 2.1 Visual Hierarchy: The Three-Layer Rule

Every screen has exactly **three layers of importance.** Not two, not five. Three.

| Layer | What | How |
|-------|------|-----|
| **Primary** | The ONE thing the user sees first. A number, a headline, a state. | Doto or Space Grotesk at display size. `--text-display`. 48–96px breathing room. |
| **Secondary** | Supporting context. Labels, descriptions, related data. | Space Grotesk at body/subheading. `--text-primary`. Grouped tight (8–16px) to the primary. |
| **Tertiary** | Metadata, navigation, system info. Visible but never competing. | Space Mono at caption/label. `--text-secondary` or `--text-disabled`. ALL CAPS. Pushed to edges or bottom. |

**The test:** Squint at the screen. Can you still tell what's most important? If two things compete, one needs to shrink, fade, or move.

**Common mistake:** Making everything "secondary." Evenly-sized elements with even spacing = visual flatness. Be brave — make the primary absurdly large and the tertiary absurdly small. The contrast IS the hierarchy.

### 2.2 Font Discipline

Per screen, use maximum:
- **2 font families** (Space Grotesk + Space Mono. Doto only for hero moments.)
- **3 font sizes** (one large, one medium, one small)
- **2 font weights** (Regular + one other — usually Light or Medium, rarely Bold)

Think of it as a budget. Every additional size/weight costs visual coherence. Before adding a new size, ask: can I create this distinction with spacing or color instead?

| Decision | Size | Weight | Color |
|----------|:---:|:---:|:---:|
| Heading vs. body | Yes | No | No |
| Label vs. value | No | No | Yes |
| Active vs. inactive nav | No | No | Yes |
| Hero number vs. unit | Yes | No | No |
| Section title vs. content | Yes | Optional | No |

**Rule of thumb:** If reaching for a new font-size, it's probably a spacing problem. Add distance instead.

### 2.3 Spacing as Meaning

Spacing is the primary tool for communicating relationships.

```
Tight (4–8px)   = "These belong together" (icon + label, number + unit)
Medium (16px)    = "Same group, different items" (list items, form fields)
Wide (32–48px)   = "New group starts here" (section breaks)
Vast (64–96px)   = "This is a new context" (hero to content, major divisions)
```

**If a divider line is needed, the spacing is probably wrong.** Dividers are a symptom of insufficient spacing contrast. Use them only in data-dense lists where items are structurally identical.

### 2.4 Container Strategy (prefer top)

1. **Spacing alone** (proximity groups items)
2. A single divider line
3. A subtle border outline
4. A surface card with background change

Each step down adds visual weight. Use the lightest tool that works. Never box the most important element — let it float on the background.

### 2.5 Color as Hierarchy

In a monochrome system, the gray scale IS the hierarchy. Max 4 levels per screen:

```
--text-display (100%) → Hero numbers. One per screen.
--text-primary (90%)  → Body text, primary content.
--text-secondary (60%) → Labels, captions, metadata.
--text-disabled (40%) → Disabled, timestamps, hints.
```

**Red (#D71921) is not part of the hierarchy.** It's an interrupt — "look HERE, NOW." If nothing is urgent, no red on the screen.

**Data status colors** (success green, warning amber, accent red) are exempt from the "one accent" rule when encoding data values. Apply color to the **value itself**, not labels or row backgrounds. See `references/tokens.md` for the full color system.

### 2.6 Consistency vs. Variance

**Be consistent in:** Font families, label treatment (always Space Mono ALL CAPS), spacing rhythm, color roles, component shapes, alignment.

**Break the pattern in exactly ONE place per screen:** An oversized number, a circular widget among rectangles, a red accent among grays, a Doto headline, a vast gap where everything else is tight.

This single break IS the design. Without it: sterile grid. With more than one: visual chaos.

### 2.7 Compositional Balance

**Asymmetry > symmetry.** Centered layouts feel generic. Favor deliberately unbalanced composition:
- **Large left, small right:** Hero metric + metadata stack.
- **Top-heavy:** Big headline near top, sparse content below.
- **Edge-anchored:** Important elements pinned to screen edges, negative space in center.

Balance heavy elements with more empty space, not with more heavy elements.

### 2.8 The AIOS Vibe

1. **Confidence through emptiness.** Large uninterrupted background areas. Resist filling space.
2. **Precision in the small things.** Letter-spacing, exact gray values, 4px gaps. Micro-decisions compound into craft.
3. **Data as beauty.** `36GB/s` in Space Mono at 48px IS the visual. No illustrations needed.
4. **Mechanical honesty.** Controls look like controls. A toggle = physical switch. A gauge = instrument.
5. **One moment of surprise.** A dot-matrix headline. A circular widget. A red dot. Restraint makes the one expressive moment powerful.
6. **Percussive, not fluid.** Imagine UI sounds: click not swoosh, tick not chime. Design transitions that feel mechanical and precise.

### 2.9 Visual Variety in Data-Dense Screens

When 3+ data sections appear on one screen, vary the visual form:

| Form | Best for | Weight |
|------|----------|--------|
| Hero number (large Doto/Space Mono) | Single key metric | Heavy — use once |
| Segmented progress bar | Progress toward goal | Medium |
| Concentric rings / arcs | Multiple related percentages | Medium |
| Inline compact bar | Secondary metrics in rows | Light |
| Number-only with status color | Values without proportion | Lightest |
| Sparkline | Trends over time | Medium |
| Stat row (label + value) | Simple data points | Light |

Lead section → heaviest treatment. Secondary → different form. Tertiary → lightest. The FORM varies, the VOICE stays the same.

### 2.10 Layout & Page Structure

- **Max width:** `var(--page-max-width)` (1120px) centered. Content beyond this is rare and intentional.
- **Section rhythm:** `var(--section-gap)` (80px) between sections; `var(--section-gap-lg)` (120px) between major page divisions. Generous vertical breathing room is a signature.
- **Columns:** Single-column or 2-column max. No 3-column layouts unless it's a card grid (which is a different pattern — uniform tiles, not asymmetric content).
- **Content width:** Match width to content type — `--content-width-narrow` (640px) for reading, `--content-width-normal` (768px) for articles, `--content-width-wide` (1024px) for data tables.
- **Grid:** CSS Grid for multi-column, Flexbox for single-row. No framework grids.
- **Card spacing:** `var(--space-md)` (16px) gap in dense grids, `var(--space-lg)` (24px) in spacious layouts.

### 2.11 Surface & Elevation (No-Shadow)

AIOS UI is **flat by design.** Depth is communicated through surface contrast and borders — never shadows or blur.

**4-Level Surface Hierarchy:**

| Level | Token | Role |
|-------|-------|------|
| Canvas | `--black` | Page background (OLED black / white) |
| Surface | `--surface` | Cards, panels — one step above canvas |
| Raised | `--surface-raised` | Dropdowns, popovers, active rows — two steps above |
| Border | `--border-visible` | Structural edges, wireframe lines |

**Elevation methods (in order of preference):**
1. **Surface contrast** — `--surface-raised` on `--surface` background (dropdowns, active rows)
2. **Border separation** — `1px solid var(--border-visible)` around a card (standard cards)
3. **Active indicator** — `var(--border-width-accent) solid var(--accent)` left bar (data table active row)
4. **Backdrop dimming** — `var(--overlay-heavy)` behind modal (dialogs)

**Never:** `box-shadow`, `filter: blur()`, `drop-shadow()`. The system has zero shadow tokens. If something needs to feel "lifted," use a lighter surface or a border.

### 2.12 Focus & Accessibility

- **Focus indicator:** Always `:focus-visible` (not `:focus`) — shows outline on keyboard nav, hides on mouse click.
- **Unified pattern:** `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);` — never define custom focus outlines per component.
- **Focus color:** Always `--interactive` (blue). Never `--accent` (red) — red is for errors/urgent states only.
- **Inset focus:** For dropdown items and list items, use `outline-offset: var(--focus-ring-offset-inset)` (-2px) so the outline stays within the item bounds.
- **Never remove focus:** `outline: none` without a replacement is an accessibility violation. If you must remove the default outline, replace with the token-based pattern above.
- **Touch targets:** Minimum `var(--touch-target-min)` (44px) for all interactive elements (WCAG 2.5.5).
- **Disabled state:** `opacity: var(--opacity-40)` (0.4) or `--text-disabled` color. Borders fade to `--border`.

### 2.13 Imagery

- **No photography.** AIOS UI is typographically driven. No stock photos, no lifestyle imagery, no hero images.
- **Dot-matrix is the illustration system.** Hero typography (Doto font), `.dot-grid` backgrounds, loading indicators, empty-state patterns — all dot-matrix. No mascots, no character illustrations, no isometric scenes.
- **Icons:** Monoline, 1.5px stroke, no fill, `currentColor`. 24×24 base. Max 5–6 strokes. Preferred: Lucide thin, Phosphor thin.
- **Product screenshots** (if absolutely needed): Inside `--surface` cards with `1px solid var(--border-visible)` border, contained (not full-bleed).
- **Data visualization:** Line 1.5–2px, no area fill. Differentiate by opacity → pattern → line style → color (last resort). Always pair visual with numeric readout.

---

## 3. ANTI-PATTERNS — WHAT TO NEVER DO

- No gradients in UI chrome. If an ambient background layer is needed, use `GradientGlow` with `data-variant="dotmatrix"` (dot opacity falloff), never a CSS gradient or blur glow.
- No shadows. No blur. Flat surfaces, border separation.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner. For structural placeholders, use `Skeleton` with `data-variant="dotmatrix"` (dot-matrix breathing), not grey blocks.
- No toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`. For transient status feedback, use `Toast` with `data-placement="inline"` (document-flow status bar), not a floating portal popup.
- No sad-face illustrations, cute mascots, or multi-paragraph empty states
- No zebra striping in tables
- No filled icons, multi-color icons, or emoji as UI
- No parallax, scroll-jacking, or gratuitous animation
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).
- Data visualization: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before introducing color.
- No hardcoded `max-width` / `outline` / `z-index` / `border-width` — must reference tokens (`var(--page-max-width)`, `var(--focus-ring-*)`, `var(--z-dropdown)`, `var(--border-width-*)`). Hardcoded values break theme consistency and block future token updates.
- No shadow-based elevation — AIOS UI is flat. Create hierarchy with **surface contrast** (`--canvas` → `--surface` → `--surface-raised`) + **border separation** (`1px solid var(--border-subtle)`). Never use `box-shadow` or `filter: blur()` to simulate depth.

---

## 4. WORKFLOW

### Standard Design Workflow

Use when building from scratch or creating new components:

1. **Declare fonts** — tell the user which Google Fonts to load (see `references/tokens.md`)
2. **Ask mode** — dark or light? Neither is default.
3. **Sketch hierarchy** — identify the 3 layers before writing any code
4. **Compose** — apply craft rules (Sections 2.1–2.9)
5. **Check tokens** — consult `references/tokens.md` for exact values
6. **Build components** — consult `references/components.md` for patterns
7. **Adapt to platform** — consult `references/platform-mapping.md` for output conventions

### Project Migration Workflow

Use when applying AIOS design to an existing project:

1. **Scan project** — use Glob/Grep/SearchCodebase to identify component files and styles (see Section 6.1)
2. **Identify tech stack** — determine framework (React/Vue/Angular/HTML) and styling approach (CSS/Tailwind/CSS-in-JS)
3. **Match components** — map project components to AIOS component using `references/component-matching.md` (see Section 6.2)
4. **Confirm strategy** — ask user to choose application method: Token Injection / Style Migration / Component Replacement (see Section 6.3)
5. **Apply styles** — execute migration per confirmed strategy, following migration conventions (Section 6.3)
6. **Verify consistency** — check migrated components against AIOS design rules (Section 2 CRAFT RULES)

### Workflow Selection Logic

- User says "migrate" / "convert" / "restyle" / "apply to existing" → Project Migration Workflow
- User says "create" / "build" / "design" / "new" → Standard Design Workflow
- User has existing project files open without explicit intent → Ask which workflow to use

### Web UI Kit Workflow

Use the pre-built Web UI Kit for faster implementation when building web applications:

1. **Load fonts** — include required Google Fonts (Doto, Space Grotesk, Space Mono)
2. **Set theme** — initialize with `data-theme="dark"` or `data-theme="light"` on the `<html>` element
3. **Import tokens** — always import `tokens.css` first before any other component styles
4. **Import components** — import the shared stylesheet once, then import only the component subpaths you use
5. **Customize** — modify component properties and styles as needed

#### Quick Start

**React:**
```tsx
import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'
import { Button } from 'aios-ui-kit/button'
import 'aios-ui-kit/styles.css'

function App() {
  return (
    <ConfigProvider motion={motion} defaultTheme="dark" enableSystem>
      <Button variant="primary">Continue</Button>
    </ConfigProvider>
  )
}
```

> **Note:** In Tailwind CSS v4 projects, also add `@import 'tailwindcss';` and `@source '../node_modules/aios-ui-kit/es';` before importing `aios-ui-kit/styles.css`. Use `ConfigProvider` / `ThemeProvider` for theme state instead of writing theme attributes ad hoc.

#### Available Components

**Layout & Structure**
- **Accordion** — collapsible content sections with expand/collapse
- **AspectRatio** — maintain consistent width-to-height ratios
- **Collapsible** — simple show/hide content wrapper
- **ErrorBoundary** — React error boundary with fallback UI
- **Resizable** — user-resizable panels and layouts
- **ScrollArea** — custom-styled scrollable container
- **Separator** — horizontal/vertical divider line
- **Sidebar** — side navigation panel

**Form Controls**
- **Autocomplete** — text input with filtering popup that narrows options by label
- **ButtonGroup** — grouped buttons sharing borders, horizontal or vertical
- **Buttons** — primary, secondary, ghost, destructive variants
- **Combobox** — searchable selector with optional free input mode
- **CopyButton** — standalone copy button that flashes [COPIED] instead of a toast
- **DateField** — date input split into year/month/day segments that auto-advance
- **Field** — form field shell for labels, hints, and error text
- **Fieldset** — field group with a legend and 1px border
- **Form** — form wrapper with validation and field management
- **InputOTP** — one-time password input with separate character fields
- **Inputs** — underline and bordered text inputs with validation
- **Label** — accessible form label component
- **NumberField** — numeric input with +/− steppers and optional bounds
- **RadioGroup** — single-selection radio button group
- **Slider** — range slider control
- **Switch** — on/off toggle switch
- **Textarea** — multi-line text input
- **TimeField** — time input split into hour/minute/second segments
- **Toggle** — on/off switch controls (includes ToggleGroup)
- **Toolbar** — toolbar of buttons, separators, and toggles with arrow-key navigation

**Data Display**
- **Avatar** — user profile image or initials fallback
- **AvatarGroup** — overlapping avatar collection with a bounded `+N` overflow count
- **Badge** — small status indicator or counter
- **Battery** — battery level and charging status indicator
- **Calendar** — compact and full calendar views
- **DataTable** — data tables, sortable grids, and label/value rows
- **DotMatrix** — dot-matrix display for numeric/text data
- **NextEvent** — upcoming event preview widget
- **Pagination** — page navigation for data lists
- **PreviewCard** — media preview card with thumbnail, title, and metadata
- **ProgressBar** — segmented progress bars in three sizes
- **Quotes** — inspirational or informational quote display
- **Skeleton** — dot-matrix breathing placeholder (AIOS adaptation, not grey blocks)
- **Sparkline** — mini trend line, 1.5px stroke, no fill, extremes by opacity
- **SystemMonitor** — comprehensive system dashboard with CPU, RAM, storage, network speed, and battery level indicators
- **Thumbnail** — image thumbnail with dot-matrix fallback instead of grey block
- **CodeBlock** — syntax-highlighted code with language metadata, line numbers and copy-ready output
- **CodeDiff** — accessible added/removed/context line presentation for reviews and Agent change previews
- **Icon** — dependency-light SVG adapter for consistent size and accessible semantics

**Compact Actions**
- **IconButton** — icon-only Button entry that requires an accessible name
- **Chip / ChipGroup** — pressed-state filters and horizontally scrollable quick choices

**Agent Workflow**
- **AgentOrb** — compact Agent state signal for idle, thinking, acting, paused and error states
- **ActivityLabel** — terse status label for current Agent activity
- **AssistantPanel** — bounded assistant workspace that groups intent, progress and actions
- **AssistantModal** — Oreo-compatible semantic entry backed by AssistantPanel behavior; do not build a second assistant overlay
- **ContextBar** — session context and task status summary
- **Subagent / SubagentList** — delegated worker status and ownership
- **Terminal / TerminalLine** — command execution output with explicit state
- **PlanCard** — inspectable execution plan and step status
- **ApprovalGate** — risk, scope and reversibility checkpoint before execution
- **ProgressTrace / ThinkingSteps / ThinkingIndicator** — visible execution and reasoning progress
- **ToolCallRow** — tool name, arguments, status and timing

**Conversation**
- **Sender** — composer for user intent and attachments
- **Message / Response** — semantic message shell and Markdown response renderer
- **ConversationViewport** — scroll-managed conversation content and return-to-latest control
- **Attachment / AttachmentList** — file context with status and removal actions
- **BranchPicker** — alternate-response branch navigation
- **Sources / Source** — expandable source disclosure
- **KeywordTag** — compact prompt or response metadata
- **Bubble / ThoughtChain / Prompts / Welcome / Conversations** — higher-level conversation patterns

**Navigation**
- **Breadcrumb** — hierarchical navigation trail
- **DateNav** — date/period navigation with arrows
- **Navigation** — desktop horizontal bar and mobile bottom bar
- **NavigationMenu** — multi-level navigation with dropdown menus
- **SegmentedControl** — multi-option selector with sliding indicator
- **Tabs** — tabbed content switching
- **TOC** — table of contents that tracks the active section with a 2px left bar

**Overlay**
- **Alert** — inline alert message with severity levels
- **Command** — keyboard-accessible command palette
- **ContextMenu** — right-click context menu
- **DatePicker** — date picker that pops a calendar when the field is clicked
- **DropdownMenu** — dropdown menu (for searchable select, use Select)
- **HoverCard** — hover-triggered informational card
- **Modal** — centered dialog overlay
- **Popover** — click/hover-triggered floating panel
- **Select** — searchable dropdown select
- **Sheet** — slide-up panel (supports top/bottom/left/right sides)
- **Tooltip** — hover-triggered informational tooltip

**Widgets**
- **MusicPlayer** — music playback widget with progress
- **PhotoCarousel** — image slideshow with autoplay
- **Caffeinate** — caffeine intake tracker with half-life decay visualization
- **Clipboard** — clipboard manager with recent entries and copy support
- **Countdown** — countdown in Doto display type that turns red as it nears zero
- **Pomodoro** — pomodoro timer with work/break cycles and segmented progress
- **WalkieTalkie** — push-to-talk widget with pulse animation
- **SunDial** — sunrise/sunset tracker with arc visualization
- **AgeMotion** — life progress visualization with segmented bars
- **Chrono** — stopwatch with lap tracking
- **Spinner** — decision wheel with spin animation
- **Date** — date display widget
- **Taskbar** — quick-access task bar widget

**Feedback & Decoration**
- **GradientGlow** — dot-matrix ambient background (AIOS adaptation, not a gradient glow)
- **Meter** — meter for bounded values with threshold regions colored on the value
- **States** — loading, error, empty, disabled state patterns
- **TextAnimate** — text revealed by char, word, or line with ease-out and no bounce
- **Toast** — inline status bar (AIOS adaptation, not a floating popup)
- **Tags** — pill and technical style chips

All components support dark/light theme switching and follow the AIOS design system tokens. See `web-ui-kit/README.md` for complete documentation and API reference.

### Component Architecture Conventions (since 2026)

The React UI Kit follows a **shadcn-inspired** architecture for type safety and maintainability. All new components MUST follow these patterns:

#### 1. Path Aliases (`@/*`)

Use the `@/` alias (configured in `tsconfig.json` + `vite.config.ts`) instead of deep relative imports:

```tsx
// ✅ Preferred
import { cn, dataAttr } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonProps } from '@/components/Buttons'

// ❌ Avoid
import { cn } from '../../../lib/utils'
```

Aliases: `@/components`, `@/lib`, `@/lib/utils`, `@/hooks`, `@/styles`.

#### 2. The `cn()` Utility — Single Source of Truth

`cn()` (from `@/lib/utils`) replaces the legacy `[...].filter(Boolean).join(' ')` pattern. It wraps `clsx` to support conditional classes, objects, and arrays:

```tsx
import { cn, dataAttr } from '@/lib/utils'

// ✅ Preferred
<button className={cn(buttonVariants({ variant, size }), isActive && 'is-active', className)} />

// ❌ Avoid
const classNames = ['aios-btn', `aios-btn--${variant}`, isActive ? 'is-active' : '']
  .filter(Boolean).join(' ')
```

#### 3. CVA (class-variance-authority) for Type-Safe Variants

Every component with more than 2 enum-valued props (e.g. `variant`, `size`, `theme`) MUST define its variants via `cva()`:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('aios-btn', {
  variants: {
    variant: {
      primary: 'aios-btn--primary',
      secondary: 'aios-btn--secondary',
      ghost: 'aios-btn--ghost',
      destructive: 'aios-btn--destructive',
    },
    size: {
      default: '',
      sm: 'aios-btn--sm',
      lg: 'aios-btn--lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'default' },
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>
```

Export both the component and the `xxxVariants` factory (so consumers can compose variants in their own components).

#### 4. `data-*` Attributes for CSS Hooks

In addition to BEM classes, every variant component SHOULD render `data-variant`, `data-size`, `data-theme`, `data-state` attributes. Use the `dataAttr()` helper from `@/lib/utils` to filter out `undefined`/`false`:

```tsx
import { dataAttr } from '@/lib/utils'

<button
  data-variant={dataAttr(variant)}    // → "primary" or undefined
  data-size={dataAttr(size)}          // → "lg" or undefined
  data-state={active ? 'on' : 'off'}  // → always present
/>
```

This enables DevTools inspection, end-to-end testing, and future CSS attribute selectors (`[data-variant="primary"]`).

#### 5. `forwardRef` + Named Display

All leaf components (Button, Badge, Alert, Input, QuickToggle) MUST use `React.forwardRef` and set a `displayName` for React DevTools:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
)
Button.displayName = 'Button'
```

#### 6. Shared Variants (`@/lib/variants.ts`)

Cross-component variant dimensions are centralized to avoid duplication:

| Factory | Use case | Variants |
|---------|----------|----------|
| `themeVariants` | light/dark/accent theme switching | `light`, `dark`, `accent`, `error` |
| `sizeVariants` | sm/md/lg sizing | `sm`, `md`, `lg` |
| `stateVariants` | interactive state (on/off/disabled/etc) | `on`, `off`, `disabled`, `loading`, `error` |

```tsx
import { themeVariants, sizeVariants } from '@/lib/variants'
```

#### 7. Tailwind Utilities + Semantic `data-*`

Current components compose token-backed Tailwind utilities through CVA and expose stable semantic hooks:
- **CVA utilities** = visual styling and variants
- **`data-slot`** = component anatomy
- **`data-variant` / `data-size` / `data-state`** = inspectable state and test hooks

Legacy BEM classes may remain in older components, but do not introduce BEM solely for new code.

#### 8. v4 Refactor Summary (2026-06)

All 113 React components were refactored in a single sweep to fully conform to the rules above. Quick reference for what changed in the React UI Kit:

| Area | Before | After |
|------|--------|-------|
| Class string composition | `[...].filter(Boolean).join(' ')` | `cn(...)` from `@/lib/utils` |
| Variant enum mapping | Inline ternaries / `if/else` | `cva(...)` factory with `xxxVariants` export |
| Ref forwarding | `useImperativeHandle` or none | `React.forwardRef` + `displayName` on every leaf component |
| Semantic hooks | BEM classes only | `data-slot` plus `data-variant` / `data-size` / `data-theme` / `data-state` |
| Polymorphic `asChild` | Not supported | Components opt-in via a `Slot` primitive (no `@radix-ui/react-slot` dep) |
| Internal imports | Long relative paths (`../../../lib/...`) | `@/*` path alias |
| `withWidgetCard` HOC | 5 `any` types, hand-rolled ref cast | Clean overloads, `unknown` instead of `any` |
| App entry | Relative imports | `@/*` path alias throughout |

**Breaking changes** (intentional, approved by the user for this refactor):

- `Caffeinate` prop `status` enum values renamed for consistency — see `MIGRATION.md` for the full table.
- `Checkbox` prop `checked` no longer accepts a raw boolean for indeterminate state; pass the string `"indeterminate"` (or use `defaultChecked`).
- `Slider` controlled/uncontrolled detection now reads `value` vs `defaultValue` — supplying both throws at runtime (was previously silently uncontrolled).
- `RadioGroup` `orientation` is now required to be one of `'horizontal' | 'vertical'`; legacy `'row'` / `'col'` no longer accepted.
- `Tag` removed deprecated `color` prop; use `variant="accent" | "warning" | "success"`.
- `withWidgetCard` overload signature tightened; calling with a non-forwardRef FC no longer infers `unknown` — explicit ref type required at call site.

See `MIGRATION.md` for a per-component migration table and the exact diff of the `cn()` signature.

### Widget Subsystem

The Widget components (QuickToggle, WidgetCard, WidgetPill, WidgetGrid, WeatherWidget, StepsWidget, ActivityWidget, CompassWidget, TimeWidget, SvgIcon, Glyph) follow AIOS Phone's home screen widget aesthetic, which differs intentionally from the main UI system:

- **Background**: Uses `--widget-bg` (#e1e5ea) / `--widget-dark-bg` (#1a1d1c) instead of `--surface` / `--black` — mimicking the phone's widget panel
- **Typography**: Uses `--font-widget` (Space Grotesk, same as `--font-body`) for body text and `--font-dotmatrix` (Doto) for large numeric displays
- **Sizing**: Fixed widget dimensions (`--widget-size-sm/md/lg`) following AIOS Phone's grid system
- **Rounding**: Larger border-radius (`--radius-xl/2xl`) for the softer widget aesthetic

This is a deliberate design choice, not an inconsistency.

---

## 5. REFERENCE FILES

For detailed token values, component specs, and platform-specific guidance:

- **`references/tokens.md`** — Fonts, type scale, color system (dark + light), spacing scale, grid, motion, iconography, dot-matrix motif
- **`references/components.md`** — Cards, inputs, data, code, Agent workflows, conversations, navigation, overlays and state patterns
- **`references/platform-mapping.md`** — HTML/CSS, SwiftUI, React/Tailwind, Paper output conventions
- **`references/component-matching.md`** — Component type mapping tables, style feature identification rules (structural/visual/interaction), migration strategies (native CSS/Tailwind/CSS-in-JS/progressive), match report format

---

## 6. COMPONENT MATCHING & MIGRATION

When the skill is invoked on an existing project, use this workflow to analyze, match, and apply AIOS design to project components. Consult `references/component-matching.md` for the full mapping tables, identification rules, and migration strategies.

### 6.1 Project Scan

Before matching, scan the project to understand its structure:

1. **Identify tech stack**
   - Use Glob to find `package.json`, `tsconfig.json`, `vite.config.*`, `next.config.*`
   - Use Grep to search `import.*from 'react'`, `import.*from 'vue'`, `import.*from '@angular'`
   - Use Grep to detect styling: `@tailwind`, `styled-components`, `*.module.css`

2. **Extract component inventory**
   - Use Glob to find `src/components/**/*.{tsx,jsx,vue,svelte}`
   - Use Grep to search `export default`, `export function`, `export const`
   - Use Read to inspect key component files, extract props interfaces and class names

3. **Analyze style characteristics**
   - Use Glob to find `src/**/*.css`, `src/**/*.scss`, `src/**/*.less`
   - Use Grep to search `border-radius`, `text-transform`, `font-family`, `background`
   - Identify existing design systems or UI libraries (Material UI, Ant Design, Chakra UI, etc.)

### 6.2 Component Matching

Match scanned project components against `references/component-matching.md` Section 1 mapping tables.

**Match dimensions and priority:**

1. **Exact match** (confidence: high) — Project component name/structure directly corresponds to a AIOS component
   - Example: Project has `<Button>` → AIOS `Button`
2. **Functional match** (confidence: medium) — Same purpose, different implementation
   - Example: Project has custom popup → AIOS `Modal`
3. **Visual match** (confidence: low) — Similar visual style, different function
   - Example: Project has rounded card-style list → AIOS `Card` + `DataRows`

**Match decision tree:**
```
Project component → Has clear semantic name? → Yes → Check mapping table → Exact/Functional match
                                          → No  → Analyze CSS properties → Visual match
                                          → No  → Analyze interaction behavior → Functional match
```

**Identification methods** (see `references/component-matching.md` Section 2):
- Structural: HTML elements, ARIA roles, JSX tag names
- Visual: CSS property patterns (border-radius, text-transform, font-family combinations)
- Interaction: JS behavior patterns (onClick + overlay, onChange + segmented switch, etc.)

### 6.3 Style Application

Three application strategies, ordered by increasing invasiveness:

**a. Token Injection (lowest disruption)**
- Import `tokens.css` into project root
- Replace hardcoded color/spacing/font values with `var(--xxx)` references
- No changes to component structure, class names, or JS logic
- Best for: unifying colors/spacing/typography without changing component implementation

**b. Style Migration (moderate disruption)**
- Import the AIOS stylesheet and map existing classes to token-backed Tailwind/CSS rules
- Add stable `data-slot` anatomy and `data-state` hooks where behavior needs them
- May require JSX/HTML structure adjustments for accessibility and state semantics
- Best for: achieving AIOS visual style while keeping own component logic

**c. Component Replacement (highest consistency)**
- Import web-ui-kit pre-built React components to replace project components
- Map project props to AIOS component props
- Best for: React projects wanting the full AIOS design experience

**Migration conventions (mandatory):**
- Zero hardcoded values in component CSS — all via `var(--xxx)` token references
- Class composition through `cn()`; enum variants through CVA
- Every reusable component root exposes `data-slot`; interactive states expose semantic `data-*`
- Theme values come from shared tokens; do not duplicate global light/dark values inside components
- Unified interaction states: `:hover:not(:disabled)` / `:focus-visible` / `:disabled { opacity: 0.4 }`

**Styling strategy specifics** (see `references/component-matching.md` Section 3):
- Native CSS / CSS Modules → Import tokens, then map existing classes without changing business logic
- Tailwind CSS v4 → `@import 'tailwindcss'`, import `aios-ui-kit/styles.css`, and add `@source` for the package `es` directory
- CSS-in-JS → Extract tokens as JS constants, convert BEM to styled-components templates
- Progressive → Phase 1 (tokens only) → Phase 2 (styles) → Phase 3 (full components)

### 6.4 Match Report

Every matching analysis must produce a standard report (see `references/component-matching.md` Section 4 for template):

```
Project Info: stack, styling approach, theme
Match Results: table of project component → AIOS component with match type, confidence, suggested strategy
Migration Recommendations: priority-ordered steps, decision points, risks
```

**Never auto-apply irreversible changes.** Always present the match report and get user confirmation before proceeding.

---

## 7. DO'S & DON'TS

### Color
**Do**
- Use `--canvas` / `--surface` / `--surface-raised` for surface hierarchy
- Use `--accent` (red) sparingly for destructive actions or active indicators only
- Differentiate data series with opacity (100%/60%/30%) before introducing hue

**Don't**
- Don't introduce new accent colors — monochrome + single red accent is the system
- Don't use `--text` color for borders; use `--border-subtle` / `--border-strong`

### Typography
**Do**
- Pair line-height + letter-spacing tokens (`--leading-*` + `--tracking-*`) with type scale
- Use uppercase + `--tracking-label` for labels/eyebrows
- Set display sizes with negative tracking (`--tracking-display-*`)

**Don't**
- Don't hardcode `line-height` or `letter-spacing` — use tokens
- Don't use serif fonts — AIOS UI is Space Grotesk (UI) + Space Mono (data), with Doto reserved for display moments

### Layout
**Do**
- Constrain pages with `var(--page-max-width)` (1120px)
- Use `var(--section-gap)` (80px) between major sections
- Select content width by purpose: narrow (640) for prose, wide (1024) for dashboards

**Don't**
- Don't hardcode `max-width` pixel values
- Don't exceed `--page-max-width` without explicit full-bleed intent

### Component
**Do**
- Apply `var(--focus-ring-width) solid var(--focus-ring-color)` with `outline-offset: var(--focus-ring-offset)` on `:focus-visible`
- Ensure interactive elements meet `var(--touch-target-min)` (44px)
- Use named radius by element: `--radius-button`, `--radius-card`, `--radius-input`, `--radius-tag`

**Don't**
- Don't remove focus outlines — accessibility is non-negotiable
- Don't mix radius scales within a component group (all cards use `--radius-card`)

### Motion
**Do**
- Use named transitions: `var(--transition-fade)`, `var(--transition-color)`, `var(--transition-transform)`
- Keep durations in `--duration-micro` (100ms) to `--duration-transition` (200ms) range

**Don't**
- Don't use `box-shadow` animations or `filter: blur()` transitions
- Don't exceed 200ms for UI feedback transitions

---

## 8. AGENT PROMPT GUIDE

When prompting an agent to build AIOS UI components, include token references and constraints explicitly.

### Hero Section
> Build a hero section for a product page. Container: `max-width: var(--page-max-width)`, `padding: 0 var(--space-lg)`, vertically centered with `var(--section-gap)` margin below. Headline: `--font-size-display-lg` (64px), `font-weight: 700`, `line-height: var(--leading-display-lg)`, `letter-spacing: var(--tracking-display-lg)`, color `--text`. Subhead: `--font-size-body-lg`, `--leading-body`, `--text-muted`. No imagery — use a dot-matrix illustration in an elevated card (`--surface-raised`, `--radius-card`, `1px solid var(--border-subtle)`). CTA: pill button (`--radius-button`), `--accent` background only if primary action.

### Card
> Build a content card. Surface: `var(--surface)`, border: `1px solid var(--border-subtle)`, radius: `var(--radius-card)` (16px). Padding: `var(--card-padding)` (24px). Title: `--font-size-heading-sm`, `--tracking-heading`. Body: `--font-size-body`, `--leading-body`, `--text-muted`. No shadow. If nested cards, outer uses `--surface-raised` + inner uses `--surface` to create hierarchy via contrast.

### Navigation
> Build a top navigation bar. Height: `56px`, sticky (`position: sticky; top: 0; z-index: var(--z-sticky)`). Background: `var(--surface)` with `border-bottom: 1px solid var(--border-subtle)`. Logo: monoline, 24px, `--text`. Nav items: `--font-size-label`, uppercase, `--tracking-label`, `--text-muted` default → `--text` on hover/active. Active item: `2px solid var(--accent)` bottom border (`--border-width-accent`). Each item meets `var(--touch-target-min)` (44px) hit area.

### Data Row
> Build a list row for a data table. Layout: grid with label column (narrow) + value column (wide). Row height: `48px`, `padding: 0 var(--space-md)`. Border-bottom: `1px solid var(--border-subtle)`. Label: `--font-size-label`, uppercase, `--tracking-label`, `--text-muted`. Value: `--font-size-body`, `--text`. Hover: background `var(--surface-raised)`. Active: `2px solid var(--accent)` left border (`--border-width-accent`). Focus: `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)`.

### Modal
> Build a modal dialog. Overlay: `background: var(--overlay-heavy)`, `z-index: var(--z-modal)`. Dialog: `max-width: var(--modal-max-width)` (480px), `var(--surface-raised)`, `border: 1px solid var(--border-strong)`, `border-radius: var(--radius-card)`. Padding: `var(--space-lg)`. Title: `--font-size-heading-sm`, `--tracking-heading`. Close button: top-right, `--radius-button`, `--text-muted` → `--text` on hover. Focus trap inside modal. Escape key closes. Animate with `var(--transition-fade)`.

---

## 9. SIMILAR BRANDS

Design context references — brands sharing AIOS UI's monochrome, reduction-first philosophy:

| Brand | Shared Principle | Reference Value |
|-------|------------------|-----------------|
| **Linear** | Monochrome UI, keyboard-first, dense data, subtle motion | App UI patterns, issue tracking layout |
| **Vercel** | Black/white/geist aesthetic, minimal chrome, mono typography | Marketing page structure, deployment dashboards |
| **Teenage Engineering** | "Less, but better" hardware, dot-matrix displays, monochrome product | Dot-matrix aesthetic, hardware-software parity |
| **Braun (Dieter Rams)** | "Less but better", functional clarity, no decoration | Ten principles for good design — philosophical anchor |
| **AIOS (Phone)** | Dot-matrix UI, transparent materials, monochrome OS | Direct namesake — dot-matrix widget patterns, glyph font |

Use these as mood-board references when extending the system. Do NOT copy component patterns directly — extract the underlying discipline (restraint, hierarchy via contrast, typographic precision).

---

## 10. AI OS / AGENT EXTENSION

When designing **AI OS interfaces** with AIOS UI, the visual language does not change — the interaction model does. The system extends from "user operates UI" to "user authorizes an agent."

### Core Principles

1. **Agent, don't just automate.** Every agent action has a UI state. No silent high-risk execution.
2. **State is structure.** `PlanCard`, `ProgressTrace`, and `AgentOrb` are layout-bearing elements, not decorations.
3. **Transparency without blur.** Explainability through plan + tool disclosure + trace log — never through glassmorphism.
4. **Permission is the new click.** High-risk actions require explicit approval with impact scope.
5. **Dot-matrix is the native AI skin.** Agent thinking uses dot-matrix breathing animation; loading uses `[THINKING…]` text.
6. **Trust through visibility.** Every session has an audit trail; errors explain cause and recovery.

### Agent State Tokens

| Token | Maps To | State |
|-------|---------|-------|
| `--agent-idle` | `var(--text-secondary)` | Standby |
| `--agent-thinking` | `var(--text-primary)` | Thinking (breathe) |
| `--agent-acting` | `var(--text-display)` | Acting (pulse) |
| `--agent-paused` / `--agent-error` | `var(--accent)` | Waiting / Error (red event) |

See `references/tokens.md` §12 for full agent token specification and keyframes.

### Core Agent Components

Use these components when building agentic flows:

- `AgentOrb` — monochrome status orb. `state: idle | thinking | acting | paused | error`.
- `ActivityLabel` — concise, non-anthropomorphic activity label.
- `AssistantPanel` — groups Agent context, progress and available actions without turning the workflow into chat chrome.
- `AssistantModal` — use when migrating an Oreo-style floating assistant API; it deliberately shares `AssistantPanel` state, focus and Escape behavior.
- `ContextBar` — persistent session/task context; use `ContextBarTasks` for compact task state.
- `Subagent` / `SubagentList` — delegated worker ownership and execution state.
- `Terminal` / `TerminalLine` — command output with explicit running, success and error states.
- `PlanCard` — shows the agent's planned steps before execution. Editable, approvable.
- `ToolCallRow` — single tool invocation with status, args, elapsed time.
- `ProgressTrace` — multi-step execution timeline, collapsible.
- `ThinkingIndicator` / `ThinkingSteps` — visible progress when useful status is available; never fabricate chain-of-thought.
- `ApprovalGate` — high-risk confirmation with impact and reversibility.
- `AicssApprovalCard` — AIcss-aligned pause for clarifying questions, a shell command, or a short plan. Never auto-approves.
- `AicssThinkingState` / `AicssThinkingReasoning` / `AicssOrbs` — conversation-thread thinking states (see `COMPONENTS.md` §13 for the full 14-piece AIcss catalog).

### Conversation Components

- `Sender` captures user intent; attach files with `Attachment` / `AttachmentList`.
- Compose a transcript with `ConversationViewport`, `Message` and `Response`. Use `MessageActions` for explicit actions rather than floating controls.
- Use `Sources` only when real source metadata exists, and `BranchPicker` only when alternate responses actually exist.
- Use `ThoughtChain` for disclosed process steps or tool progress, not hidden chain-of-thought.
- Use `Prompts`, `Welcome` and `Conversations` for prompt suggestions, empty entry states and conversation navigation.

Prefer on-demand imports so Agent and conversation code does not enter unrelated screens:

```tsx
import { ApprovalGate, PlanCard, ToolCallRow } from 'aios-ui-kit/agent'
import { Message, Response, Sender, Sources } from 'aios-ui-kit/conversation'
import { CodeBlock } from 'aios-ui-kit/code-block'
import { CodeDiff } from 'aios-ui-kit/code-diff'
```

### Three-Layer Screen Priority

| Layer | Meaning | Examples |
|-------|---------|----------|
| Primary | User intent | `Sender`, `Prompts`, voice trigger |
| Secondary | Agent plan | `PlanCard`, `ToolCallRow` |
| Tertiary | Agent state | `ActivityLabel`, `AgentOrb`, `ProgressTrace`, `ContextBar` |

### Agent Copy Rules

- Status labels: Space Mono ALL CAPS — `[THINKING]`, `[ACTING]`, `[WAITING]`, `[DONE]`, `[ERROR]`.
- Key numbers: Doto — step count, confidence, elapsed ms.
- No anthropomorphism. Use `AGENT PROCESSING 3 STEPS`, not "I'm thinking."
- Approval copy names the actor: `ALLOW AGENT TO SEND EMAIL TO 6 CONTACTS?`

### Anti-Patterns

- Don't build a plain chat UI for complex agent workflows.
- Don't hide reasoning in a black box.
- Don't add mascots, avatars, or emotional personas.
- Don't introduce new colors for agent states — use the existing monochrome + red palette.
- Don't use `box-shadow`, `blur`, or gradients to indicate "AI-ness."
