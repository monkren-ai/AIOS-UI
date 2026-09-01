# AIOS Design System — Component Matching & Migration

This reference enables the AIOS Design Skill to analyze existing project files, match them to AIOS design components, and apply AIOS styles with precision.

---

## 1. COMPONENT TYPE MAPPING

### 1.1 Core Interaction Components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Button / Action | Button | primary/secondary/ghost/destructive × sm/default/lg | buttons.css | `--text-display`, `--border-visible`, `--accent`, `--radius-pill` |
| Text Input | Input | underline/bordered × error/disabled | inputs.css | `--border-visible`, `--text-secondary`, `--accent` |
| Toggle / Switch | Switch | on/off × disabled | switch.css | `--text-display`, `--border-visible`, `--text-disabled` |
| Toggle Button | Toggle / ToggleGroup | — | toggle.css | `--surface`, `--text-secondary` |
| Checkbox | Checkbox | checked/unchecked | checkbox.css | `--accent`, `--border-visible` |
| Radio | RadioGroup | — | radio-group.css | `--accent`, `--border-visible` |
| Slider | Slider | — | slider.css | `--border-visible`, `--text-display` |
| Segmented Control | SegmentedControl | 2–4 segments | segmented-control.css | `--text-display`, `--border-visible` |
| Tag / Chip | Tag | pill/technical × active/removable/disabled | tags.css | `--border-visible`, `--text-display` |
| Textarea | Textarea | — | textarea.css | `--border-visible` |
| OTP Input | InputOTP | — | input-otp.css | `--border-visible` |
| Form | Form | validation | form.css | `--accent`, `--border-visible` |
| Label | Label | — | label.css | `--text-secondary` |

### 1.2 Data Display Components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Card / Surface | Card | default/raised/compact/technical × interactive/disabled | card.css | `--surface`, `--surface-raised`, `--border` |
| Data Row / List Item | DataRows | status colors | data-rows.css | `--text-secondary`, `--success`, `--warning`, `--accent` |
| Data Grid | DataGrid | active row indicator | data-grid.css | `--surface-raised`, `--accent` |
| Table | Table | striped/hoverable | table.css | `--border`, `--border-visible` |
| Progress Bar | ProgressBar | hero/standard/compact/slim × indeterminate | progress-bar.css | `--text-display`, `--success`, `--warning`, `--accent` |
| Badge | Badge | default/secondary/destructive/outline | badge.css | `--accent`, `--border-visible` |
| Avatar | Avatar | sm/md/lg | avatar.css | `--surface-raised`, `--border` |
| Skeleton | Skeleton | text/circular/rectangular | skeleton.css | `--surface-raised` |
| States | States | Loading/Error/Empty/Disabled | states.css | `--text-secondary`, `--text-disabled`, `--accent` |
| Separator / Divider | Separator | horizontal/vertical | separator.css | `--border` |
| Scroll Area | ScrollArea | — | scroll-area.css | `--border` |

### 1.3 Navigation Components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Navigation Bar | Navigation | bracket variant | navigation.css | `--text-display`, `--text-disabled` |
| Navigation Menu | NavigationMenu | with submenus | navigation-menu.css | `--surface-raised`, `--border-visible` |
| Sidebar | Sidebar | icon/badge | sidebar.css | `--surface`, `--border` |
| Breadcrumb | Breadcrumb | — | breadcrumb.css | `--text-secondary`, `--text-primary` |
| Pagination | Pagination | — | pagination.css | `--text-secondary`, `--text-display` |
| Date Navigation | DateNav | — | date-nav.css | `--text-secondary`, `--border-visible` |
| Tabs | Tabs | — | tabs.css | `--border-visible`, `--text-secondary` |

### 1.4 Overlay Components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Modal / Dialog | Modal | default/alert × destructive | modal.css | `--surface`, `--border-visible`, `--accent` |
| Drawer / Side Panel | Sheet | top/bottom/left/right | sheet.css | `--surface`, `--border-visible` |
| Select / Dropdown | Select | searchable | select.css | `--surface-raised`, `--border-visible` |
| Dropdown Menu | DropdownMenu | menubar variant | dropdown-menu.css | `--surface-raised`, `--border-visible` |
| Context Menu | ContextMenu | shortcut keys | context-menu.css | `--surface-raised`, `--border-visible` |
| Popover | Popover | — | popover.css | `--surface-raised`, `--border-visible` |
| Hover Card | HoverCard | — | hover-card.css | `--surface-raised`, `--border-visible` |
| Tooltip | Tooltip | — | tooltip.css | `--surface`, `--text-primary` |
| Command Palette | Command | searchable | command.css | `--surface`, `--border-visible` |
| Notification / Toast | Sonner | — | sonner.css | `--surface`, `--border-visible` |
| Alert | Alert | — | alert.css | `--accent`, `--surface` |

### 1.5 Layout & Structure Components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Accordion | Accordion | — | accordion.css | `--border`, `--border-visible` |
| Collapsible | Collapsible | — | collapsible.css | `--border` |
| Resizable Panel | Resizable | — | resizable.css | `--border` |
| Aspect Ratio | AspectRatio | — | aspect-ratio.css | — |
| Error Boundary | ErrorBoundary | — | — (no CSS file) | `--accent` |

### 1.6 Time, status, and utility components

| Project Component Type | AIOS Component | Variants | CSS File | Key Tokens |
|---|---|---|---|---|
| Clock / Time Display | Clock | digital/gauge | clock.css | `--font-dotmatrix`, `--text-display` |
| Battery Indicator | Battery | — | battery.css | `--text-display`, `--success`, `--accent` |
| Calendar | Calendar | compact/full | calendar.css | `--text-primary`, `--accent` |
| System Monitor / Dashboard | SystemMonitor | — | system-monitor.css | `--text-display`, `--success`, `--warning` |
| Pomodoro Timer | Pomodoro | — | pomodoro.css | `--accent`, `--text-display` |
| Sunrise/Sunset Tracker | SunDial | — | sun-dial.css | `--text-display`, `--text-secondary` |
| Life Progress / Age | AgeMotion | — | age-motion.css | `--text-display`, `--success` |
| Stopwatch / Chrono | Chrono | — | chrono.css | `--font-dotmatrix`, `--text-display` |
| Spinner / Decision Wheel | Spinner | — | spinner.css | `--text-display`, `--accent` |
| World Clock | WorldClock | — | world-clock.css | `--text-display`, `--text-secondary` |
| Dot Matrix Display | DotMatrix | — | dot-matrix.css | `--text-display`, `--text-disabled` |
| Next Event | NextEvent | — | next-event.css | `--text-display`, `--text-secondary` |
| Quick Toggle | QuickToggle | circle/pill | quick-toggle.css | semantic interactive and surface tokens |

### 1.7 Agent & Conversation Components

| Project Pattern | AIOS Component | Selection Signal |
|---|---|---|
| Prompt / message composer | `Sender` | Text intent, attachments and send/stop action |
| Chat transcript | `ConversationViewport` + `Message` + `Response` | Scroll-managed user/assistant messages and Markdown output |
| Suggested prompts / empty chat | `Prompts` + `Welcome` | Real starter actions before a conversation exists |
| Conversation history | `Conversations` | Named sessions with active state and metadata |
| Agent execution plan | `PlanCard` | Ordered steps with observable statuses |
| High-risk confirmation | `ApprovalGate` | Explicit scope, risk, reversibility and approve/reject actions |
| Tool invocation | `ToolCallRow` | Tool name, arguments, status and elapsed time |
| Shell / command output | `Terminal` | Command lines and streamed execution result |
| Delegated workers | `Subagent` / `SubagentList` | Worker ownership and per-worker status |
| Agent activity shell | `AssistantPanel` + `ContextBar` | Persistent context, progress and actions |
| Floating assistant migration | `AssistantModal` | Oreo-compatible name with shared AssistantPanel behavior |
| Icon-only action | `IconButton` | Required accessible name and shared Button states |
| Filter chips | `Chip` + `ChipGroup` | Pressed-state choices with horizontal overflow |
| Overlapping people | `AvatarGroup` | Consistent avatar size and bounded overflow count |
| External SVG library | `Icon` | Normalize size, currentColor and accessible semantics |
| Process / thinking status | `ProgressTrace`, `ThinkingSteps`, `ThinkingIndicator` | Observable progress without fabricated reasoning |
| Sources / citations | `Sources` / `Source` | Real evidence links and metadata |
| Alternate responses | `BranchPicker` | Multiple response branches actually exist |

### 1.8 Code Components

| Project Component Type | AIOS Component | Import |
|---|---|---|
| Syntax-highlighted output | `CodeBlock` | `aios-ui-kit/code-block` |
| Added / removed line review | `CodeDiff` | `aios-ui-kit/code-diff` |

---

## 2. STYLE FEATURE IDENTIFICATION

### 2.1 Structural Identification (HTML/JSX Semantics)

| HTML Element / ARIA Role | AIOS Component |
|---|---|
| `<button>` / `role="button"` / `onClick` (no form) | Button |
| `<input type="text/email/password">` | Input |
| `<textarea>` | Textarea |
| `<input type="checkbox">` | Checkbox |
| `<input type="radio">` | RadioGroup |
| `<select>` / `role="listbox"` / `role="combobox"` | Select / DropdownMenu |
| `<dialog>` / `role="dialog"` / `role="alertdialog"` | Modal |
| `<nav>` / `role="navigation"` | Navigation / Sidebar |
| `<table>` / `role="table"` / `role="grid"` | Table / DataGrid |
| `<details>` / `role="treeitem"` | Accordion / Collapsible |
| `<progress>` / `role="progressbar"` | ProgressBar |
| `<input type="range">` / `role="slider"` | Slider |
| `<input type="switch">` / `role="switch"` | Switch |
| `<input type="number">` + OTP pattern | InputOTP |
| `<img>` + circular crop | Avatar |
| `<form>` | Form |
| Message composer with send/stop action | Sender |
| Conversation transcript / log | ConversationViewport + Message + Response |
| Ordered execution steps | PlanCard / ProgressTrace |
| Explicit risk confirmation | ApprovalGate |
| Tool or command execution row | ToolCallRow / Terminal |
| Added and removed code lines | CodeDiff |

### 2.2 Visual Feature Identification (CSS Property Patterns)

| CSS Pattern | Likely AIOS Component |
|---|---|
| `border-radius: 999px` + `text-transform: uppercase` | Button (pill) or Tag (pill) |
| `border-radius: 4px` + `text-transform: uppercase` + `font-family: mono` | Tag (technical) or Button (technical) |
| `border-bottom: 1px solid` (no other borders) | Input (underline) |
| `border: 1px solid` + `border-radius: 8px` | Input (bordered) or Card (compact) |
| `border-radius: 12–16px` + `background: surface` | Card |
| `width: 100%` + `height: 4–8px` + `border-radius: 2–4px` | ProgressBar (compact/slim) |
| `width: 100%` + `height: 16–20px` + segmented blocks | ProgressBar (hero) |
| `position: fixed/absolute` + `backdrop` + `z-index: high` | Modal / Sheet / Popover |
| `transform: translateX/Y` + `position: fixed` | Sheet (slide-in) |
| `background: rgba(0,0,0,0.8)` + centered content | Modal backdrop |
| `font-size: 48–96px` + `font-family: mono/display` | Hero metric / Clock |
| `font-size: 8–12px` + `text-transform: uppercase` + `letter-spacing: 0.06em` | Label / Caption (tertiary layer) |
| `display: grid` + `gap: 8–16px` + widget-sized cards | WidgetGrid |

### 2.3 Interaction Pattern Identification (JS Behavior)

| Interaction Pattern | AIOS Component |
|---|---|
| `onClick` + overlay + focus trap | Modal |
| `onClick` + side slide-in | Sheet |
| `onClick` + dropdown list | Select / DropdownMenu |
| `onClick` + right-click trigger | ContextMenu |
| `onClick` + hover trigger | HoverCard / Popover |
| `onChange` + segmented switch + sliding indicator | SegmentedControl |
| `onChange` + tab switch | Tabs |
| `onToggle` / `checked` state | Switch / Toggle / Checkbox |
| `onSubmit` + validation | Form |
| `onDrag` + resize | Resizable |
| Submit prompt + attach files + stop generation | Sender |
| Approve/reject after impact disclosure | ApprovalGate |
| Stream tool status and elapsed time | ToolCallRow / ProgressTrace |
| Return to latest message after scroll | ConversationViewport |

---

## 3. MIGRATION STRATEGIES

### 3.1 Strategy A: Native CSS / CSS Modules Projects

1. Copy AIOS `tokens.css` CSS variables into project root stylesheet
2. Copy target component CSS files into project styles directory
3. Replace component class names with AIOS BEM class names
4. Replace hardcoded values with `var(--xxx)` token references
5. Ensure `data-theme="dark|light"` is set on `<html>` element

### 3.2 Strategy B: Tailwind CSS Projects

For Tailwind CSS v4, import the package stylesheet and register its compiled source so utility classes are retained:

```css
@import 'tailwindcss';
@import 'aios-ui-kit/styles.css';
@source '../node_modules/aios-ui-kit/es';
```

Use `cn()` for caller overrides and CVA for reusable variants. Prefer package subpath imports (`aios-ui-kit/button`, `aios-ui-kit/agent`, `aios-ui-kit/conversation`) so unrelated components stay out of the bundle.

### 3.3 Strategy C: CSS-in-JS (Styled Components / Emotion) Projects

Extract AIOS tokens as JS constants:

```ts
const aiosTokens = {
  colors: {
    textDisplay: 'var(--text-display)',
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textDisabled: 'var(--text-disabled)',
    accent: 'var(--accent)',
    surface: 'var(--surface)',
    surfaceRaised: 'var(--surface-raised)',
    border: 'var(--border)',
    borderVisible: 'var(--border-visible)',
  },
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
    dotmatrix: 'var(--font-dotmatrix)',
  },
  radius: {
    pill: 'var(--radius-pill)',
    lg: 'var(--radius-lg)',
    md: 'var(--radius-md)',
    xs: 'var(--radius-xs)',
  },
  duration: {
    micro: 'var(--duration-micro)',
    transition: 'var(--duration-transition)',
  },
  easing: 'var(--easing)',
}
```

Convert BEM structures to styled-components templates, wrapping with a ThemeProvider that injects `tokens.css` variables.

### 3.4 Strategy D: Progressive Migration (Universal)

**Phase 1 — Token Injection (lowest disruption):**
- Import `tokens.css` into project root
- Replace hardcoded color values with `var(--xxx)` references
- Replace hardcoded spacing values with `var(--space-xxx)` references
- Replace hardcoded font stacks with `var(--font-xxx)` references
- No structural changes to components

**Phase 2 — Style Migration (moderate disruption):**
- Import component-level CSS files
- Replace project class names with AIOS BEM class names
- Adjust JSX/HTML structure to match BEM Element naming where needed
- Apply variant modifiers via class composition

**Phase 3 — Component Replacement (highest consistency):**
- Import web-ui-kit pre-built React components
- Map project props to AIOS component props
- Replace project component implementations entirely
- Full AIOS design experience

---

## 4. MATCHING OUTPUT FORMAT

Every component matching analysis must produce a standard report:

```markdown
## AIOS Design — Component Match Report

### Project Info
- Stack: [React / Vue / Angular / HTML]
- Styling: [CSS Modules / Tailwind / CSS-in-JS / Native CSS]
- Theme: [dark / light / unset]

### Match Results

| Project Component | File Path | AIOS Component | Match Type | Confidence | Suggested Strategy |
|---|---|---|---|---|---|
| MyButton | src/components/Button.tsx | Button (primary) | Exact | High | Component Replace |
| UserCard | src/components/Card.tsx | Card (default) | Exact | High | Style Migration |
| NavMenu | src/components/Nav.tsx | Navigation (bracket) | Functional | Medium | Style Migration |
| CustomPopup | src/components/Popup.tsx | Modal (default) | Visual | Low | Token Injection |

### Migration Recommendations
1. [Priority-ordered migration steps]
2. [Decision points requiring user confirmation]
3. [Risks and caveats]
```

**Match Type Definitions:**
- **Exact** — Project component name/structure directly corresponds to a AIOS component
- **Functional** — Same purpose, different implementation
- **Visual** — Similar visual style, different function

**Confidence Levels:**
- **High** — Unambiguous match, safe to auto-apply
- **Medium** — Likely match, user confirmation recommended
- **Low** — Uncertain match, user decision required
