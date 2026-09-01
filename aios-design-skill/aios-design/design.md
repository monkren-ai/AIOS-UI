# DESIGN.md

AIOS Design System

## Overview

The strategic read of the AIOS design system.

A monochrome, typographically driven, industrial design language inspired by Swiss typography, Braun, and Teenage Engineering. Every element earns its pixel — structure is the ornament, type does the heavy lifting, and color is an event (not a default). Dark mode (OLED black) and light mode (warm off-white) are both first-class. Designed for information density without clutter.

- monochrome
- typographic
- industrial
- dot-matrix
- dark-light

### Typography

A composed hierarchy for page storytelling.

Hero Number · Section Title · Label · Body

Aa

#### Doto

400–700, variable dot-size

Display / hero

Hero Number

Aa

#### Space Grotesk

Light 300, Regular 400, Medium 500, Bold 700

Body / UI

Section Title · Body

Aa

#### Space Mono

Regular 400, Bold 700

Data / Labels

Label

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| **Display** | `"Doto"` | `"Space Mono", monospace` | 400–700, variable dot-size |
| **Body / UI** | `"Space Grotesk"` | `"DM Sans", system-ui, sans-serif` | Light 300, Regular 400, Medium 500, Bold 700 |
| **Data / Labels** | `"Space Mono"` | `"JetBrains Mono", "SF Mono", monospace` | Regular 400, Bold 700 |

**Why these fonts:** Doto provides variable dot-matrix display type; Space Grotesk and Space Mono provide readable UI and metadata typography.

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

**Pairing rule:** Always pair `--leading-*` and `--tracking-*` with the corresponding size token. Never use a line-height or letter-spacing token without its size counterpart.

**Typographic rules:**
- **Doto:** 36px+ only, tight tracking, never for body text
- **Labels:** Always Space Mono, ALL CAPS, 0.06–0.1em spacing, 11–12px ("instrument panel" labels)
- **Data/Numbers:** Always Space Mono. Units as `--label` size, slightly raised, adjacent
- **Hierarchy:** display (Doto) > heading (Space Grotesk) > label (Space Mono caps) > body (Space Grotesk). Four levels max.
- **Budget per screen:** max 2 font families, 3 font sizes, 2 font weights

### Colors

01Neutral Dark`#000000` OLED Black

`--black`

`#000000`

`--surface`

`#111111`

`--surface-raised`

`#1A1A1A`

`--border`

`#222222`

`--border-visible`

`#333333`

`--text-disabled`

`#666666`

`--text-secondary`

`#999999`

`--text-primary`

`#E8E8E8`

`--text-display`

`#FFFFFF`

02Neutral Light`#E1E5EA` Warm Off-White

`--black`

`#E1E5EA`

`--surface`

`#FFFFFF`

`--surface-raised`

`#F0F0F0`

`--border`

`#E8E8E8`

`--border-visible`

`#CCCCCC`

`--text-disabled`

`#999999`

`--text-secondary`

`#666666`

`--text-primary`

`#1A1A1A`

`--text-display`

`#000000`

03Accent`#D71921` Signal Red

`--accent`

`#D71921`

`--accent-subtle`

`rgba(215,25,33,0.15)`

`--error`

`#D71921`

04Status

`--success`

`#4A9E5C`

`--warning`

`#D4A843`

`--info`

`#999999`

`--interactive`

`#5B9BF6` / `#007AFF`

**Accent rule:** Red (`#D71921`) is not part of the gray hierarchy. It's an interrupt — "look HERE, NOW." If nothing is urgent, no red on the screen. One accent per screen as a UI element. Never decorative.

**Data status colors** (success green, warning amber, accent red) are exempt from the "one accent" rule when encoding data values. Apply color to the **value itself**, not labels or row backgrounds.

**Identical across modes:** Accent red, status colors, ALL CAPS labels, fonts, type scale, spacing, component shapes.

**Dark feel:** Instrument panel in a dark room. OLED black, white data glowing.
**Light feel:** Printed technical manual. Off-white paper (#E1E5EA), black ink. Cards = #FFFFFF on off-white page = subtle elevation without shadows.

### Spacing

Base rhythm: 8px (with 4px and 2px for optical adjustments)

Section padding: 24px, 96px

Base

8px

rhythm

Gap

16px

components

Section

80px

page

Step 1

2px

Step 2

4px

Step 3

8px

Step 4

16px

Card padding: 16px, 24px

Gaps: 8px, 16px

### Spacing Scale

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

**Spacing as meaning:**
- Tight (4–8px) = "These belong together" (icon + label, number + unit)
- Medium (16px) = "Same group, different items" (list items, form fields)
- Wide (32–48px) = "New group starts here" (section breaks)
- Vast (64–96px) = "This is a new context" (hero to content, major divisions)

**If a divider line is needed, the spacing is probably wrong.** Dividers are a symptom of insufficient spacing contrast.

### Layout Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--page-max-width` | 1120px | Maximum page content width (centered) |
| `--modal-max-width` | 480px | Standard modal dialog width |
| `--section-gap` | 80px | Standard vertical gap between sections |
| `--section-gap-lg` | 120px | Large vertical gap for major page divisions |
| `--card-padding` | 24px | Standard card internal padding |
| `--card-padding-sm` | 16px | Compact card internal padding |
| `--element-gap` | 8px | Gap between elements within a group |
| `--content-width-narrow` | 640px | Reading text, form fields |
| `--content-width-normal` | 768px | Standard content, articles |
| `--content-width-wide` | 1024px | Data tables, dashboards |
| `--touch-target-min` | 44px | Minimum touch target size (WCAG 2.5.5) |

### Border Width & Opacity

| Token | Value | Use |
|-------|-------|-----|
| `--border-width-sm` | 1px | Standard borders, dividers, card outlines |
| `--border-width-md` | 2px | Emphasized borders, focus indicators |
| `--border-width-lg` | 4px | Strong separation, decorative borders |
| `--border-width-accent` | 2px | Active row indicator (left bar) |

| Token | Value | Use |
|-------|-------|-----|
| `--opacity-10` | 0.1 | Dot-grid backgrounds, subtle textures |
| `--opacity-30` | 0.3 | Tertiary data visualization |
| `--opacity-40` | 0.4 | Disabled state |
| `--opacity-60` | 0.6 | Secondary data visualization |
| `--opacity-80` | 0.8 | Overlay backdrop |

### Elevation & Depth

Depth is communicated through **surface contrast and border separation** — never through shadows or blur. AIOS rejects glass, blur, and drop shadows entirely. Elevation is read as a material system: background tone shifts communicate hierarchy.

Surface

Border

1px `--border-visible`

Shadow

none

No shadows. No blur. Flat surfaces, border separation.

### Elevation Strategy (lightest tool that works)

1. **Spacing alone** (proximity groups items)
2. A single divider line (`--border`)
3. A subtle border outline (`--border-visible`)
4. A surface card with background change (`--surface` / `--surface-raised`)

Each step down adds visual weight. Use the lightest tool that works. **Never box the most important element** — let it float on the background.

### Surface Elevation (Dark Mode)

| Layer | Token | Hex | Contrast on #000 |
|-------|-------|-----|-------------------|
| Page background | `--black` | `#000000` | — |
| Elevated surface | `--surface` | `#111111` | 1.3:1 |
| Secondary elevation | `--surface-raised` | `#1A1A1A` | 1.5:1 |
| Subtle divider | `--border` | `#222222` | — |
| Intentional border | `--border-visible` | `#333333` | — |

**Contrast with neuform "glass" recipe:** Where neuform uses glass + blur + drop shadows for depth, AIOS uses opaque surface tone shifts + 1px borders. This is a deliberate anti-pattern rejection — depth without atmospheric effects.

### Shapes

Shapes rely on a tight radius system anchored by 16px (cards) and 999px (pills), scaled across cards, buttons, and supporting surfaces. Icon geometry stays monoline and technical.

Corner radii

16px, 999px, 8px, 4px

Icon treatment

Monoline

Icon sets

Lucide (thin), Phosphor (thin)

Cards

Panels

### Radius System

| Token | Value | Use |
|-------|-------|-----|
| `--radius-card` | 16px | Standard cards, widgets |
| `--radius-card-compact` | 8px | Compact cards, dropdowns |
| `--radius-card-technical` | 4px | Technical cards, data grids |
| `--radius-button` | 999px | Pill buttons (primary, secondary, destructive) |
| `--radius-button-technical` | 8px | Technical/square buttons |
| `--radius-input` | 8px | Bordered inputs |
| `--radius-input-underline` | 0px | Underline inputs (flush) |
| `--radius-tag` | 999px | Pill tags/chips |
| `--radius-tag-technical` | 4px | Technical tags |
| `--radius-tooltip` | 8px | Tooltips |
| `--radius-segment` | 999px | Segmented control container |

**Hard limit:** No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).

### Iconography

- Monoline, 1.5px stroke, no fill. 24x24 base, 20x20 live area. Round caps/joins.
- Color inherits text color. Max 5–6 strokes.
- Preferred: Lucide (thin), Phosphor (thin). Never filled or multi-color.

### Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

Do

- Subtract, don't add. Every element must earn its pixel. Default to removal.
- Keep spacing aligned to the 8px base rhythm (4px / 2px for optical adjustments only).
- Use the gray scale as the hierarchy: `--text-display` → `--text-primary` → `--text-secondary` → `--text-disabled`. Max 4 levels per screen.
- Reuse surface tone shifts (`--black` → `--surface` → `--surface-raised`) + 1px borders for depth. No shadows.
- Keep corner radii within the 16px / 999px / 8px / 4px family.
- Break the pattern in exactly ONE place per screen (oversized number, circular widget, red accent, Doto headline, vast gap).
- Favor asymmetric composition: large left + small right, top-heavy, edge-anchored.
- Use labels as Space Mono ALL CAPS at 11–12px with 0.06–0.1em tracking.
- Differentiate data visualization with opacity (100%/60%/30%) or pattern (solid/striped/dotted) before introducing color.

Don't

- Do not introduce gradients in UI chrome.
- Do not use shadows, blur, or glass effects. Flat surfaces only.
- Do not use skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- Do not use toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`.
- Do not use sad-face illustrations, cute mascots, or multi-paragraph empty states.
- Do not use zebra striping in tables.
- Do not use filled icons, multi-color icons, or emoji as UI.
- Do not use parallax, scroll-jacking, or gratuitous animation.
- Do not use spring/bounce easing. Use subtle ease-out only.
- Do not exceed 16px border-radius on cards.
- Do not make everything "secondary." Evenly-sized elements with even spacing = visual flatness. Be brave — make the primary absurdly large and the tertiary absurdly small.

## AI OS Design Principles

AIOS UI for AI OS is a **semantic extension**, not a visual rebrand. The monochrome canvas, dot-matrix motif, industrial typography, and no-shadow discipline remain intact. What changes is the interaction model: from "user operates UI" to "user authorizes an agent."

### 1. Agent, don't just automate.

> Automation runs in the background. Agent runs in the foreground — seen, understood, and permitted.

- Every agent action must have a corresponding UI state.
- High-risk operations are never silent.
- The default flow is: show the plan, then execute.

### 2. State is structure.

> Agent state, plan, and progress are not loading animations — they are the structure of the interface.

- A `PlanCard` can be the main content of a screen.
- A `ProgressTrace` can live persistently in a sidebar.
- An `AgentOrb` can anchor a corner like a navigation element.

### 3. Transparency without blur.

> AI transparency is not glassmorphism. It is explainability.

- Show the agent's plan, tool calls, sources, and confidence.
- Use border + surface hierarchy to communicate information layers.
- Never use blur or translucency to imply "intelligence."

### 4. Permission is the new click.

> In AI OS, a click is often an authorization, not just a trigger.

- High-risk actions require explicit approval.
- Approval surfaces must show impact scope and reversibility.
- Button copy shifts from "Confirm" to "Allow agent to …"

### 5. Dot-matrix is the native AI skin.

> The dot grid is the visual metaphor for AI thought: discrete, observable, rhythmic.

- Agent thinking uses a dot-matrix breathing animation.
- Loading states use `[THINKING…]` + dot-matrix spinner, not skeletons.
- Notifications can use Glyph-like dot-matrix patterns.

### 6. Trust through visibility.

> User trust in an agent equals visibility into that agent's behavior.

- Every agent session has an audit trail.
- Users can inspect, export, and delete agent memory.
- Error states must explain cause and provide a recovery path.

### Three-Layer Priority for Agent Screens

| Layer | Meaning | Component Examples |
|-------|---------|-------------------|
| **Primary: Intent** | What the user wants | `Sender`, `Prompts`, voice trigger |
| **Secondary: Plan** | What the agent will do | `PlanCard`, `ToolCallRow` |
| **Tertiary: State** | Where the agent is now | `ActivityLabel`, `AgentOrb`, `ProgressTrace`, `ContextBar` |

### Agent Copy & Tone

- Use **Space Mono ALL CAPS** for agent status labels: `[THINKING]`, `[ACTING]`, `[WAITING]`, `[DONE]`, `[ERROR]`.
- Use **Doto** for key numbers: step count, confidence score, elapsed time.
- Avoid anthropomorphism. Say `AGENT PROCESSING 3 STEPS`, not "I'm thinking."
- Approval copy names the actor: `ALLOW AGENT TO SEND EMAIL TO 6 CONTACTS?`

### Motion


Motion stays restrained and interface-led. Easing favors ease-out. Percussive, not fluid — imagine UI sounds: click not swoosh, tick not chime.

Minimal

ease-out

### Motion Tokens

| Property | Value |
|----------|-------|
| **Duration (micro)** | 150–250ms |
| **Duration (transitions)** | 300–400ms |
| **Easing** | `cubic-bezier(0.25, 0.1, 0.25, 1)` — subtle ease-out |
| **Hover** | border/text brightens. No scale, no shadows. |
| **Preference** | opacity over position. Elements fade, don't slide. |

### Named Transitions

| Token | Value | Use |
|-------|-------|-----|
| `--transition-fade` | `var(--duration-micro) var(--easing)` | Opacity fade in/out |
| `--transition-color` | `var(--duration-micro) var(--easing)` | Text/border color change on hover |
| `--transition-border` | `var(--duration-micro) var(--easing)` | Border color/width change |
| `--transition-transform` | `var(--duration-transition) var(--easing)` | Position/scale transform |
| `--transition-opacity` | `var(--duration-micro) var(--easing)` | Opacity-only transition |

**Prohibited:** spring/bounce easing, parallax, scroll-jacking, gratuitous animation.

### WebGL

Reconstruct the graphics as a full-bleed background field using canvas-backed effect. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with gray monochrome and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve DOM fallback.

WebGL

Scene

Full Bleed Background Field

Effect

Dot Matrix Particle Field

Primitives

Dot Particles + Soft Depth Fade

Motion

Slow Breathing Pulse

Interaction

Pointer Parallax (subtle drift)

WebGL · Dot Matrix · Breathing Pulse · Pointer Parallax

### CSS Fallback (DOM)

When WebGL is unavailable, the dot-matrix motif degrades gracefully to a CSS `radial-gradient` dot-grid:

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

**When to use dot-matrix:** Hero typography (Doto), decorative grid backgrounds, dot-grid data viz, loading indicators, empty state illustrations.

### ThreeJS

No ThreeJS scene detected. The AIOS design system does not prescribe a ThreeJS runtime. WebGL effects are implemented via canvas 2D dot-matrix particle fields, not ThreeJS geometry. This is an intentional restraint — the dot-matrix motif is achievable without a 3D engine.

---

## Partner Testimonials — Reference Example

A worked example adapting the neuform `partner-testimonials-1` form into the AIOS monochrome language. The neuform template uses orange `#F47C45` and a glass/bento layout; the adaptation preserves the **form** (4 testimonials, quote + attribution, sectioned layout) while replacing the **palette and material** with monochrome, a red accent, and border separation.

Tags: `testimonial`, `section`, `monochrome`, `dot-matrix`

### Form Adaptation

| Neuform concept | AIOS adaptation |
|-----------------|---------------------|
| Orange `#F47C45` accent | Red `--accent` `#D71921` — reserved for at most ONE "featured" testimonial marker per section |
| Glass surface cards | Opaque `--surface` cards with 1px `--border-visible` outline. No blur. |
| Drop shadows | None. Border separation only. |
| Color avatars (photos) | Monochrome circular tokens — grayscale photo or initials in Space Mono |
| System Serif heading accent | Doto display for the section hero ("We've Partnered With") |
| System Font body | Space Grotesk for quotes, Space Mono ALL CAPS for attributions |
| 16px corner radii | `--radius-card` 16px (matches neuform exactly) |
| Bento animated layout | Asymmetric grid: one large featured testimonial + three compact ones. No entrance animation — opacity fade only. |

### Three-Layer Hierarchy Mapping

| Layer | Neuform | AIOS |
|-------|---------|---------|
| **Primary** | "We've Partnered With" (large heading) | "We've Partnered With" in Doto `--display-lg` 48px, `--text-display`. One per section. |
| **Secondary** | Quote text + name | Quote in Space Grotesk `--body` 16px, `--text-primary`. Name in Space Grotesk `--subheading` 18px. |
| **Tertiary** | Title / role ("CPO at Innovate AI") | Title in Space Mono ALL CAPS `--label` 11px, `--text-secondary`, 0.08em tracking. Pushed below name. |

### Composition

Asymmetric, not centered. The featured testimonial occupies the left 60% at larger scale; the three supporting testimonials stack compactly on the right 40%. A dot-matrix divider grid (`opacity: 0.1`) separates the featured testimonial from the supporting ones — structure as ornament.

### Token Mapping Table

| Element | Token | Value |
|---------|-------|-------|
| Section hero | `--display-lg` + Doto | 48px / 1.05 / -0.02em |
| Featured quote | `--body` + Space Grotesk | 16px / 1.5 / 0 |
| Supporting quote | `--body-sm` + Space Grotesk | 14px / 1.5 / 0.01em |
| Name | `--subheading` + Space Grotesk | 18px / 1.3 / 0 |
| Title / role | `--label` + Space Mono ALL CAPS | 11px / 1.2 / 0.08em |
| Card background | `--surface` | `#111111` (dark) / `#FFFFFF` (light) |
| Card border | `--border-visible` | `#333333` (dark) / `#CCCCCC` (light) |
| Card radius | `--radius-card` | 16px |
| Card padding | `--card-padding` | 24px |
| Featured marker | `--accent` | `#D71921` (one only) |
| Divider grid | `--border` @ `--opacity-10` | dot-grid-subtle |

### Markup Sketch

```html
<section class="aios-testimonials">
  <div class="aios-testimonials__hero">
    <span class="aios-testimonials__eyebrow">HEAR FROM THE TEAMS</span>
    <h2 class="aios-testimonials__title">We've Partnered With</h2>
  </div>

  <div class="aios-testimonials__grid">
    <!-- Featured (left, 60%) -->
    <article class="aios-testimonial aios-testimonial--featured">
      <span class="aios-testimonial__marker" aria-hidden="true"></span>
      <blockquote class="aios-testimonial__quote">
        The strategic vision they brought transformed our fragmented concepts
        into a seamless ecosystem. Their execution was flawless from start to finish.
      </blockquote>
      <footer class="aios-testimonial__attribution">
        <span class="aios-testimonial__avatar" data-initials="MV"></span>
        <div class="aios-testimonial__meta">
          <span class="aios-testimonial__name">Marcus Vance</span>
          <span class="aios-testimonial__role">CPO AT INNOVATE AI</span>
        </div>
      </footer>
    </article>

    <!-- Supporting (right, 40%, stacked) -->
    <div class="aios-testimonials__supporting">
      <article class="aios-testimonial">
        <blockquote class="aios-testimonial__quote">Their agility without sacrificing quality helped us launch our MVP months ahead of schedule.</blockquote>
        <footer class="aios-testimonial__attribution">
          <span class="aios-testimonial__avatar" data-initials="CL"></span>
          <div class="aios-testimonial__meta">
            <span class="aios-testimonial__name">Clara Lin</span>
            <span class="aios-testimonial__role">CTO AT NEXTGEN</span>
          </div>
        </footer>
      </article>
      <!-- two more supporting testimonials follow the same pattern -->
    </div>
  </div>
</section>
```

### CSS Sketch (token-driven)

```css
.aios-testimonials__title {
  font-family: "Doto", "Space Mono", monospace;
  font-size: var(--display-lg);
  line-height: var(--leading-display-lg);
  letter-spacing: var(--tracking-display-lg);
  color: var(--text-display);
}

.aios-testimonials__eyebrow {
  font-family: "Space Mono", monospace;
  font-size: var(--label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.aios-testimonial {
  background: var(--surface);
  border: var(--border-width-sm) solid var(--border-visible);
  border-radius: var(--radius-card);
  padding: var(--card-padding);
}

.aios-testimonial--featured {
  /* asymmetric: larger, left-anchored */
  grid-column: 1 / 2;
}

.aios-testimonial__quote {
  font-family: "Space Grotesk", sans-serif;
  font-size: var(--body);
  line-height: var(--leading-body);
  color: var(--text-primary);
}

.aios-testimonial__role {
  font-family: "Space Mono", monospace;
  font-size: var(--label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.aios-testimonial__avatar {
  /* monochrome circular token — no color photo */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-raised);
  border: var(--border-width-sm) solid var(--border-visible);
  color: var(--text-secondary);
  font-family: "Space Mono", monospace;
  font-size: var(--label);
}

.aios-testimonial--featured .aios-testimonial__marker {
  /* the ONE red accent on the screen */
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

/* dot-matrix divider between featured and supporting */
.aios-testimonials__grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-lg);
  background-image: radial-gradient(circle, var(--border) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
}
```

### Design Notes

- **One accent:** Only the featured testimonial carries the red `--accent` marker. The three supporting testimonials are pure monochrome. This is the "one break per screen" rule in action.
- **No avatars in color:** Photos are grayscale or replaced with Space Mono initials. Color photos would introduce uncontrolled palette drift.
- **No entrance animation:** Short editorial text appears via opacity fade only (`--transition-fade`). No slide, no scale, no stagger choreography.
- **Structure is ornament:** The dot-matrix grid background and the asymmetric 3fr/2fr split ARE the visual interest — no decorative illustrations needed.
- **Labels do the work:** "HEAR FROM THE TEAMS" and "CPO AT INNOVATE AI" in Space Mono ALL CAPS provide the instrument-panel feel without adding visual weight.
