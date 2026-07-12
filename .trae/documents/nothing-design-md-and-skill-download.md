# Plan: Supplement design.md + Skill File Download

## Summary

Reference the neuform.ai `partner-testimonials-1` template's structured `DESIGN.md` format to produce two deliverables for the Nothing design skill:

1. **`design.md`** — A new structured design spec document (in the neuform DESIGN.md layout: Overview / Typography / Colors / Spacing / Elevation & Depth / Shapes / Do's and Don'ts / Motion / WebGL) that documents the **entire Nothing design system**, AND includes a **partner-testimonials reference example** showing how that neuform form adapts to Nothing's monochrome language.
2. **Skill file download** — A Node.js download script that packages the `nothing-design` skill folder into a distributable archive, PLUS updated README documentation with download instructions and direct file links.

---

## Current State Analysis

### What exists
- `nothing-design-skill/nothing-design/SKILL.md` (v4.0.0) — main skill definition with YAML frontmatter + 7-section philosophy/craft/workflow body.
- `nothing-design-skill/nothing-design/references/tokens.md` — full token system (typography, colors dark+light, spacing, layout, motion, iconography, dot-matrix motif, widget subsystem).
- `nothing-design-skill/nothing-design/references/components.md` — component specs.
- `nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/` — 88 CSS files (kebab-case, component-aligned; e.g. `dot-matrix-icon.css`, `quotes.css`, `card.css`).
- `nothing-design-skill/README.md` — install docs (manual `git clone` + `cp -r` only).

### What does NOT exist (gaps this plan fills)
- **No `design.md`** anywhere in the project (glob `**/design.md` = 0 results).
- **No testimonials/partner files** (grep `testimonial|partner` = 0 matches).
- **No download scripts** (grep `download|下载` = 0 matches); install is manual only.

### The neuform.ai reference form
The `partner-testimonials-1` template exposes a `DESIGN.md` tab with these structured sections:
- **Overview** (tags + summary)
- **Typography** (font roles + composed hierarchy)
- **Colors** (Primary/Secondary/Tertiary/Neutral palettes with 50–900 ramps)
- **Spacing** (base rhythm, section padding, gaps, card padding)
- **Elevation & Depth** (glass/surface/border/shadow recipes)
- **Shapes** (corner radii, icon treatment, icon sets)
- **Do's and Don'ts**
- **Motion** (intensity, easing)
- **WebGL** (scene, effect, primitives, motion)
- **ThreeJS** (empty-state handling)

Content: 4 partner testimonials (quote + avatar + name + title) in a bento/animated layout. Uses orange `#F47C45` — but Nothing uses monochrome + red `#D71921` accent, so we adapt the **form/structure**, not the palette.

---

## Proposed Changes

### Change 1: Create `nothing-design-skill/nothing-design/design.md`

**What:** A new structured design spec document at the skill root (alongside `SKILL.md`), following the neuform.ai DESIGN.md section layout.

**Why:** `SKILL.md` is a craft/philosophy document written for an LLM agent (imperative rules, workflows). `design.md` will be a **human-readable design spec** in the neuform structured format — useful for designers, contributors, and tooling that expects the standard Overview/Typography/Colors/Spacing/Elevation/Shapes/Do's&Don'ts/Motion/WebGL layout. It also serves as a reference for how external templates (like partner-testimonials) map into Nothing's language.

**How:** Reuse ground-truth values from `references/tokens.md` and `SKILL.md` (no invented tokens). Structure:

1. **Overview** — Nothing design system summary + tags (`monochrome`, `typographic`, `industrial`, `dot-matrix`, `dark-light`). One-paragraph strategic read.
2. **Typography** — Font stack table (Doto / Space Grotesk / Space Mono), type scale (display-xl → label), line-height + letter-spacing pairing rule. Adapted from `tokens.md` Section 1.
3. **Colors** — Primary palette (dark mode: `--black` → `--text-display`), accent & status (`--accent` #D71921, success/warning), dark/light mode mapping table. Adapted from `tokens.md` Section 2. Presented as role-based swatches (Primary/Neutral/Accent/Status) in the neuform style.
4. **Spacing** — 8px base scale (`--space-2xs` → `--space-4xl`), layout tokens (`--page-max-width`, `--section-gap`, `--card-padding`), border widths, opacity scale. Adapted from `tokens.md` Sections 3–3.7.
5. **Elevation & Depth** — Nothing's anti-shadow philosophy: border separation (`--border` vs `--border-visible`), surface elevation via background change (`--black` → `--surface` → `--surface-raised`), no blur/glass. Explicitly contrasted with the neuform "glass" recipe (Nothing rejects glass/blur per anti-patterns).
6. **Shapes** — Radius system: `--radius-card` 16px, `--radius-button` 999px (pill), `--radius-button-technical` 8px, `--radius-tag` 999px, `--radius-card-technical` 4px. Icon treatment: monoline 1.5px stroke, Lucide/Phosphor thin.
7. **Do's and Don'ts** — Distilled from `SKILL.md` Section 2 (craft rules) + Section 3 (anti-patterns). E.g. Do: 4px rhythm, monochrome hierarchy, one accent per screen. Don't: gradients, shadows, skeletons, toasts, zebra striping, border-radius > 16px on cards.
8. **Motion** — Duration 150–250ms micro / 300–400ms transitions, easing `cubic-bezier(0.25,0.1,0.25,1)`, opacity over position, no spring/bounce, no parallax. From `tokens.md` Section 4.
9. **WebGL** — Nothing's dot-matrix motif as a full-bleed background field: dot particles + soft depth fade, slow breathing pulse, pointer parallax as subtle drift, gray monochrome + sparse spacing. Includes the CSS `radial-gradient` dot-grid fallback from `tokens.md` Section 6. (This directly maps to the neuform WebGL section, but in Nothing's monochrome language.)
10. **Partner Testimonials — Reference Example** — A worked example adapting the neuform `partner-testimonials-1` form into Nothing's language:
    - Maps the neuform 4-testimonial bento layout to Nothing's three-layer hierarchy + asymmetric composition.
    - Specifies: hero quote in Doto/Space Grotesk display, attributions in Space Mono ALL CAPS labels, avatars as monochrome circular tokens (no color photos), dot-matrix divider grid between testimonials, red accent reserved for at most one "featured" testimonial marker.
    - Includes a concrete CSS token mapping table (neuform concept → Nothing token) and a short markup sketch.
    - Tags: `testimonial`, `section`, `monochrome`, `dot-matrix`.

**File path:** `c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\design.md`

---

### Change 2: Create download script `nothing-design-skill/scripts/download-skill.mjs`

**What:** A zero-dependency Node.js ES module script that packages the `nothing-design/` skill folder into a distributable archive.

**Why:** Currently install is manual `git clone` + `cp -r`. A download script gives users a single command to fetch a ready-to-install archive, and enables future CI/tooling integration.

**How:**
- Use Node.js built-ins only: `fs`, `path`, `child_process`, `os`.
- Use the `tar` command (built into Windows 10+ as bsdtar, and all Unix systems) via `child_process.execFileSync` to create a `.tar.gz`. This avoids npm dependencies and cross-platform zip issues.
- Walk the `nothing-design/` directory, exclude `node_modules/`, `dist/`, `.DS_Store`.
- Output to `nothing-design-skill/dist/nothing-design-skill.tar.gz`.
- Print the absolute output path + byte size + install hint (`tar -xzf ... -C ~/.claude/skills/`).
- Support an optional `--zip` flag that, when available, uses `tar -a -cf *.zip` (bsdtar supports `-a` auto-format) or falls back to `.tar.gz` with a notice.
- Exit code 0 on success, non-zero on failure (e.g. `tar` missing → print install hint).

**File path:** `c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\scripts\download-skill.mjs`

---

### Change 3: Update `nothing-design-skill/README.md` with Download section

**What:** Add a "Download" section to the existing README, between the current "Install" section and "What's inside".

**Why:** The user requested README docs for download alongside the script. Provides both automated (script) and manual (direct file URL) download paths.

**How:** Insert a new `## Download` section containing:
1. **Script download** — `node scripts/download-skill.mjs` command + output description + install hint for the resulting archive.
2. **Direct file links** — GitHub raw URLs for the key skill files so users can fetch individual files without cloning:
   - `SKILL.md`
   - `design.md` (the new file)
   - `references/tokens.md`
   - `references/components.md`
   - `references/platform-mapping.md`
   - `references/component-matching.md`
   - (Base URL pattern: `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/...` — matches the existing `git clone` URL in README.)
3. Keep the existing "Install" (`git clone` + `cp -r`) section as the primary method; the Download section is supplementary.

Also update the "What's inside" table to add a row for the new `design.md` file.

**File path:** `c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\README.md`

---

## Assumptions & Decisions

1. **`design.md` placement:** At `nothing-design/design.md` (skill root, alongside `SKILL.md`) — not inside `references/` (it's a top-level spec, not a reference detail) and not inside `web-ui-kit/` (it covers the whole system, not just the React kit).
2. **`design.md` is documentation, not an agent instruction:** It does NOT replace `SKILL.md`. `SKILL.md` remains the LLM-facing skill definition; `design.md` is the human/designer-facing structured spec. No changes to `SKILL.md` frontmatter or trigger rules.
3. **No new tokens invented:** Every value in `design.md` is sourced from `tokens.md` or `SKILL.md`. The testimonials example only references existing tokens.
4. **Testimonials = reference example only, not a new component:** Per the user's choice ("system design.md + testimonials example"), the partner-testimonials content lives as a **documented reference example inside `design.md`** — NOT as a new React component or CSS file. This keeps scope proportional (the user asked to "supplement design.md", not "build a testimonials component").
5. **Download script is zero-dependency:** Uses `tar` command via `child_process`, no npm install required. Works on Windows 10+ (bsdtar), macOS, Linux.
6. **GitHub raw URL base:** `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/` — derived from the existing `git clone https://github.com/dominikmartn/nothing-design-skill.git` URL in README. Assumes `main` branch (standard default).
7. **Archive format:** `.tar.gz` primary (universal, preserves permissions). Optional `.zip` via `--zip` flag when bsdtar's `-a` auto-format is available.
8. **No package.json added:** The script runs directly via `node scripts/download-skill.mjs` — no new `package.json` needed at the `nothing-design-skill/` root (keeps the skill folder clean for copying into `~/.claude/skills/`).

---

## Verification Steps

1. **`design.md` structure check:** Open the new file and confirm all 10 neuform-aligned sections are present (Overview, Typography, Colors, Spacing, Elevation & Depth, Shapes, Do's and Don'ts, Motion, WebGL, Partner Testimonials Reference Example).
2. **Token accuracy check:** Cross-reference every hex/px/ms value in `design.md` against `references/tokens.md` — no mismatches.
3. **Download script run:** Execute `node nothing-design-skill/scripts/download-skill.mjs` and verify:
   - It creates `nothing-design-skill/dist/nothing-design-skill.tar.gz`.
   - The archive contains `nothing-design/SKILL.md`, `nothing-design/design.md`, `nothing-design/references/*.md`, `nothing-design/web-ui-kit/` (excluding `node_modules`).
   - Output path + size is printed.
4. **Archive integrity:** Extract the archive to a temp dir and confirm the skill folder structure is intact and `SKILL.md` frontmatter is preserved.
5. **README check:** Confirm the new "Download" section renders correctly, direct file URLs follow the correct raw.githubusercontent pattern, and the "What's inside" table includes `design.md`.
6. **No regressions:** `SKILL.md`, `tokens.md`, and all existing CSS/component files are unchanged.
