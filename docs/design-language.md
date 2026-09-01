# AIOS UI Homepage Design Language

## Direction

- Name: Agent Component Gallery
- Archetype: Technical Product Console × Editorial Brand System
- Site type: Product website and documentation hub
- Audience: Product designers and frontend engineers building AI and agent interfaces
- Five-second impression: Precise, component-led, monochrome, ready to implement
- Primary user task: Inspect components or open the installation guide
- Main risk: Letting visual spectacle delay access to the component library

## Brand / VI Audit

- Wordmark: `AIOS UI`, compact and technical
- Primary palette: Existing black/white neutral system
- Accent: Existing AIOS red, reserved for the second hero line and active states
- Typography: Doto for display accents, Space Grotesk for reading, Space Mono for metadata and code
- Geometry: Crisp dividers, 16px component cards, pill-shaped actions
- Imagery: Live component states and structural dot fields; no decorative stock imagery
- Reference: [Oreo UI](https://www.oreoui.com/) for centered hero rhythm, proof strip, gallery container, and final CTA
- Rejected from reference: Email capture, Oreo brand metrics, canvas artwork, and rounded geometry that conflicts with AIOS tokens

## Page Pattern

1. Centered hero with version, two-line value proposition, two product routes, and install command.
2. Three-column proof strip using registry-derived values only.
3. Six-card gallery rendered with real AIOS components rather than screenshots.
4. Inverted final CTA returning users to components or documentation.

## Component Rules

- Hero CTA: Components is primary; installation is secondary.
- Preview shell: One raised surface containing a responsive 3×2 grid.
- Preview cards: Equal stage height, real component state, label plus category metadata.
- Mobile: One card per row; statistics collapse to horizontal rows; no horizontal scrolling.
- Motion: Component-native motion only; the page background remains structural and static.

## Anti-patterns

- Do not copy reference-site claims, email funnels, artwork, or component names.
- Do not invent usage counts, customer metrics, or performance multipliers.
- Do not add decorative gradients, nested floating cards, or a second visual language.
- Do not hide the component and installation routes below the first viewport.
