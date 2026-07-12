# Nothing Design Skill

A design system skill for [Claude Code](https://claude.ai/code) inspired by Nothing's visual language. Monochrome, typographic, industrial.

I kept describing the same design rules to Claude over and over — Swiss typography, OLED blacks, segmented progress bars, dot-matrix motifs. So I packaged it into a reusable skill.

![Preview](preview.gif)

## What you get

Tell Claude `/nothing-design` or say "Nothing style" and it generates UI following these principles:

- Three-layer visual hierarchy (display, body, metadata — that's it)
- Space Grotesk + Space Mono + Doto font stack
- Full dark and light mode token system
- Segmented progress bars, mechanical toggles, instrument-style widgets
- Output as HTML/CSS, SwiftUI, or React/Tailwind

## Install

Copy the `nothing-design` folder into your Claude Code skills directory:

```sh
git clone https://github.com/dominikmartn/nothing-design-skill.git
cp -r nothing-design-skill/nothing-design ~/.claude/skills/
```

That's it. Next time you start Claude Code, the skill is available.

## Download

Prefer a packaged archive or individual files? Two options:

### Script (packaged archive)

Package the entire `nothing-design/` skill folder into a `.tar.gz` (no npm install required — uses the system `tar` command, built into Windows 10+, macOS, and Linux):

```sh
node scripts/download-skill.mjs
# → dist/nothing-design-skill.tar.gz
```

Then install:

```sh
tar -xzf dist/nothing-design-skill.tar.gz -C ~/.claude/skills/
```

Pass `--zip` to request a `.zip` instead (falls back to `.tar.gz` if your `tar` lacks auto-format support):

```sh
node scripts/download-skill.mjs --zip
```

### Direct file links

Fetch individual skill files without cloning (raw from the `main` branch):

| File | URL |
|------|-----|
| [`SKILL.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/SKILL.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/SKILL.md` |
| [`design.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/design.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/design.md` |
| [`references/tokens.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/tokens.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/tokens.md` |
| [`references/components.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/components.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/components.md` |
| [`references/platform-mapping.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/platform-mapping.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/platform-mapping.md` |
| [`references/component-matching.md`](https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/component-matching.md) | `https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/references/component-matching.md` |

Example:

```sh
curl -fsSL https://raw.githubusercontent.com/dominikmartn/nothing-design-skill/main/nothing-design/SKILL.md -o ~/.claude/skills/nothing-design/SKILL.md
```

## What's inside

| File | |
|------|---|
| `SKILL.md` | Design philosophy, craft rules, workflow |
| `design.md` | Structured design spec (Overview, Typography, Colors, Spacing, Elevation, Shapes, Do's & Don'ts, Motion, WebGL) + reference examples |
| `references/tokens.md` | Colors, fonts, spacing, motion tokens |
| `references/components.md` | Buttons, cards, lists, tables, overlays |
| `references/platform-mapping.md` | CSS, SwiftUI, React output mappings |
| `references/component-matching.md` | Component type mapping tables, migration strategies |

## License

MIT
