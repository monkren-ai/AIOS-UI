---
name: nothing-design
description: This skill should be used when the user explicitly says "Nothing style", "Nothing design", "/nothing-design", or directly asks to use/apply the Nothing design system to new or existing projects. Also triggers when user asks to migrate, convert, restyle, or apply Nothing design to existing project files/components. NEVER trigger automatically for generic UI or design tasks.
version: 4.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep, SearchCodebase]
---

# Nothing-Inspired UI/UX Design System

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

### 2.8 The Nothing Vibe

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

---

## 3. ANTI-PATTERNS — WHAT TO NEVER DO

- No gradients in UI chrome
- No shadows. No blur. Flat surfaces, border separation.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- No toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`
- No sad-face illustrations, cute mascots, or multi-paragraph empty states
- No zebra striping in tables
- No filled icons, multi-color icons, or emoji as UI
- No parallax, scroll-jacking, or gratuitous animation
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).
- Data visualization: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before introducing color.

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

Use when applying Nothing design to an existing project:

1. **Scan project** — use Glob/Grep/SearchCodebase to identify component files and styles (see Section 6.1)
2. **Identify tech stack** — determine framework (React/Vue/Angular/HTML) and styling approach (CSS/Tailwind/CSS-in-JS)
3. **Match components** — map project components to Nothing components using `references/component-matching.md` (see Section 6.2)
4. **Confirm strategy** — ask user to choose application method: Token Injection / Style Migration / Component Replacement (see Section 6.3)
5. **Apply styles** — execute migration per confirmed strategy, following migration conventions (Section 6.3)
6. **Verify consistency** — check migrated components against Nothing design rules (Section 2 CRAFT RULES)

### Workflow Selection Logic

- User says "migrate" / "convert" / "restyle" / "apply to existing" → Project Migration Workflow
- User says "create" / "build" / "design" / "new" → Standard Design Workflow
- User has existing project files open without explicit intent → Ask which workflow to use

### Web UI Kit Workflow

Use the pre-built Web UI Kit for faster implementation when building web applications:

1. **Load fonts** — include required Google Fonts (Doto, Space Grotesk, Space Mono)
2. **Set theme** — initialize with `data-theme="dark"` or `data-theme="light"` on the `<html>` element
3. **Import tokens** — always import `tokens.css` first before any other component styles
4. **Import components** — add React components for the ones you need (each component imports its own CSS internally)
5. **Customize** — modify component properties and styles as needed

#### Quick Start

**React:**
```tsx
import Clock from './components/Clock'
import './styles/tokens.css'

function App() {
  return <Clock type="digital" />
}
```

> **Note:** Set `data-theme="dark"` or `data-theme="light"` on the `<html>` element to control the theme. Each component imports its own CSS internally, so you only need to manually import `tokens.css`.

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
- **Buttons** — primary, secondary, ghost, destructive variants
- **Inputs** — underline and bordered text inputs with validation
- **Checkbox** — binary selection control
- **Form** — form wrapper with validation and field management
- **InputOTP** — one-time password input with separate character fields
- **Label** — accessible form label component
- **RadioGroup** — single-selection radio button group
- **Slider** — range slider control
- **Switch** — on/off toggle switch
- **Textarea** — multi-line text input
- **Toggle** — on/off switch controls (includes ToggleGroup)

**Data Display**
- **Avatar** — user profile image or initials fallback
- **Badge** — small status indicator or counter
- **Clock** — digital and gauge style time display
- **Battery** — battery level and charging status indicator
- **Calendar** — compact and full calendar views
- **DataGrid** — data tables with active row indicator
- **DataRows** — label-value data rows with status colors
- **DotMatrix** — dot-matrix display for numeric/text data
- **NextEvent** — upcoming event preview widget
- **Pagination** — page navigation for data lists
- **ProgressBar** — segmented progress bars in three sizes
- **Quotes** — inspirational or informational quote display
- **Skeleton** — content placeholder loading state
- **Table** — structured data table with sorting and selection
- **SystemMonitor** — comprehensive system dashboard with CPU, RAM, storage, network speed, and battery level indicators

**Navigation**
- **Breadcrumb** — hierarchical navigation trail
- **DateNav** — date/period navigation with arrows
- **Navigation** — desktop horizontal bar and mobile bottom bar
- **NavigationMenu** — multi-level navigation with dropdown menus
- **SegmentedControl** — multi-option selector with sliding indicator
- **Tabs** — tabbed content switching

**Overlay**
- **Alert** — inline alert message with severity levels
- **Command** — keyboard-accessible command palette
- **ContextMenu** — right-click context menu
- **DropdownMenu** — dropdown menu (for searchable select, use Select)
- **HoverCard** — hover-triggered informational card
- **Modal** — centered dialog overlay
- **Popover** — click/hover-triggered floating panel
- **Select** — searchable dropdown select
- **Sheet** — slide-up panel (supports top/bottom/left/right sides)
- **Sonner** — toast notification system
- **Tooltip** — hover-triggered informational tooltip

**Widgets**
- **MusicPlayer** — music playback widget with progress
- **PhotoCarousel** — image slideshow with autoplay
- **Caffeinate** — caffeine intake tracker with half-life decay visualization
- **Clipboard** — clipboard manager with recent entries and copy support
- **Pomodoro** — pomodoro timer with work/break cycles and segmented progress
- **WalkieTalkie** — push-to-talk widget with pulse animation
- **SunDial** — sunrise/sunset tracker with arc visualization
- **AgeMotion** — life progress visualization with segmented bars
- **Chrono** — stopwatch with lap tracking
- **Spinner** — decision wheel with spin animation
- **WorldClock** — multi-timezone world clock with day/night indicator
- **Date** — date display widget
- **Taskbar** — quick-access task bar widget
- **WidgetGrid** — grid layout for arranging multiple widgets

**Other**
- **Tags** — pill and technical style chips
- **States** — loading, error, empty, disabled state patterns

All components support dark/light theme switching and follow the Nothing design system tokens. See `web-ui-kit/README.md` for complete documentation and API reference.

### Widget Subsystem

The Widget components (QuickToggle, WidgetCard, WidgetPill, WidgetGrid, WeatherWidget, StepsWidget, ActivityWidget, CompassWidget, TimeWidget, SvgIcon, Glyph) follow Nothing Phone's home screen widget aesthetic, which differs intentionally from the main UI system:

- **Background**: Uses `--widget-bg` (#e1e5ea) / `--widget-dark-bg` (#1a1d1c) instead of `--surface` / `--black` — mimicking the phone's widget panel
- **Typography**: Uses `--font-widget` (Space Grotesk, same as `--font-body`) for body text and `--font-ndot` (NDOT 47) for large numeric displays
- **Sizing**: Fixed widget dimensions (`--widget-size-sm/md/lg`) following Nothing Phone's grid system
- **Rounding**: Larger border-radius (`--radius-xl/2xl`) for the softer widget aesthetic

This is a deliberate design choice, not an inconsistency.

---

## 5. REFERENCE FILES

For detailed token values, component specs, and platform-specific guidance:

- **`references/tokens.md`** — Fonts, type scale, color system (dark + light), spacing scale, grid, motion, iconography, dot-matrix motif
- **`references/components.md`** — Cards, buttons, inputs, lists, tables, nav, tags, segmented controls, progress bars, charts, widgets, overlays, state patterns
- **`references/platform-mapping.md`** — HTML/CSS, SwiftUI, React/Tailwind, Paper output conventions
- **`references/component-matching.md`** — Component type mapping tables, style feature identification rules (structural/visual/interaction), migration strategies (native CSS/Tailwind/CSS-in-JS/progressive), match report format

---

## 6. COMPONENT MATCHING & MIGRATION

When the skill is invoked on an existing project, use this workflow to analyze, match, and apply Nothing design to project components. Consult `references/component-matching.md` for the full mapping tables, identification rules, and migration strategies.

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

1. **Exact match** (confidence: high) — Project component name/structure directly corresponds to a Nothing component
   - Example: Project has `<Button>` → Nothing `Button`
2. **Functional match** (confidence: medium) — Same purpose, different implementation
   - Example: Project has custom popup → Nothing `Modal`
3. **Visual match** (confidence: low) — Similar visual style, different function
   - Example: Project has rounded card-style list → Nothing `Card` + `DataRows`

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
- Import `tokens.css` + component-level CSS files
- Replace project class names with Nothing BEM class names
- May require JSX/HTML structure adjustments to match BEM Element naming
- Best for: achieving Nothing visual style while keeping own component logic

**c. Component Replacement (highest consistency)**
- Import web-ui-kit pre-built React components to replace project components
- Map project props to Nothing component props
- Best for: React projects wanting the full Nothing design experience

**Migration conventions (mandatory):**
- Zero hardcoded values in component CSS — all via `var(--xxx)` token references
- BEM naming: `nothing-{block}` / `nothing-{block}--{modifier}` / `nothing-{block}__{element}`
- Class composition: `[...].filter(Boolean).join(' ')` array pattern
- No `[data-theme]` selectors in component CSS — theme switching driven 100% by `tokens.css`
- Unified interaction states: `:hover:not(:disabled)` / `:focus-visible` / `:disabled { opacity: 0.4 }`

**Styling strategy specifics** (see `references/component-matching.md` Section 3):
- Native CSS / CSS Modules → Copy tokens + component CSS, replace class names
- Tailwind CSS → Map tokens to `tailwind.config.js` theme extensions, use `@apply` hybrid
- CSS-in-JS → Extract tokens as JS constants, convert BEM to styled-components templates
- Progressive → Phase 1 (tokens only) → Phase 2 (styles) → Phase 3 (full components)

### 6.4 Match Report

Every matching analysis must produce a standard report (see `references/component-matching.md` Section 4 for template):

```
Project Info: stack, styling approach, theme
Match Results: table of project component → Nothing component with match type, confidence, suggested strategy
Migration Recommendations: priority-ordered steps, decision points, risks
```

**Never auto-apply irreversible changes.** Always present the match report and get user confirmation before proceeding.
