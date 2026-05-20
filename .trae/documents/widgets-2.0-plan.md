
# Convert Nothing Widgets 2.0 to Real UI Kit Components

## Objective
Transform Figma-exported components into real, reusable, parameterized UI Kit components following the existing project conventions (pure CSS + BEM + CSS variables).

## Steps

### 1. Enhance WidgetCard to support WidgetSquare
- Update WidgetCard component and widget-card.css to handle both square and wide sizes
- Support light/dark/accent themes
- Support content, icon, title, etc.

### 2. Create WidgetPill component (already created)
- Component file: src/components/widgets/WidgetPill.tsx
- CSS file: src/styles/widget-pill.css

### 3. Create WidgetIcon component (already created)
- Component file: src/components/widgets/WidgetIcon.tsx
- CSS file: src/styles/widget-icon.css

### 4. Create Glyphs component
- Create DotMatrix/Glyph component that can render different glyph patterns
- Support light/dark themes, different sizes

### 5. Update App.tsx
- Replace the Figma-exported NothingWidgets component with the new real components
- Show all the widget types with examples

## Files to Create/Update
- Create: src/components/widgets/Glyph.tsx
- Create: src/styles/glyph.css
- Update: src/components/WidgetCard.tsx
- Update: src/styles/widget-card.css
- Update: src/App.tsx
- Optional: Cleanup/remove src/components/widgets/NothingWidgets20.tsx and svg-qvv4ctcv53.ts
