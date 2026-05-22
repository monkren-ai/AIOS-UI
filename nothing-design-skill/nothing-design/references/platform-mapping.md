# Nothing Design System — Platform Mapping

## 1. HTML / CSS / WEB

Load fonts via Google Fonts `<link>` or `@import`. Use CSS custom properties, `rem` for type, `px` for spacing/borders. Dark/light via `prefers-color-scheme` or class toggle.

```css
:root {
  --black: #000000;
  --surface: #111111;
  --surface-raised: #1A1A1A;
  --border: #222222;
  --border-visible: #333333;
  --text-disabled: #666666;
  --text-secondary: #999999;
  --text-primary: #E8E8E8;
  --text-display: #FFFFFF;
  --accent: #D71921;
  --accent-subtle: rgba(215,25,33,0.15);
  --success: #4A9E5C;
  --warning: #D4A843;
  --interactive: #5B9BF6;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}
```

---

## 2. SWIFTUI / iOS

Register fonts in Info.plist, bundle `.ttf` files. Use `@Environment(\.colorScheme)` for mode switching.

```swift
extension Color {
    static let ndBlack = Color(hex: "000000")
    static let ndSurface = Color(hex: "111111")
    static let ndSurfaceRaised = Color(hex: "1A1A1A")
    static let ndBorder = Color(hex: "222222")
    static let ndBorderVisible = Color(hex: "333333")
    static let ndTextDisabled = Color(hex: "666666")
    static let ndTextSecondary = Color(hex: "999999")
    static let ndTextPrimary = Color(hex: "E8E8E8")
    static let ndTextDisplay = Color.white
    static let ndAccent = Color(hex: "D71921")
    static let ndSuccess = Color(hex: "4A9E5C")
    static let ndWarning = Color(hex: "D4A843")
    static let ndInteractive = Color(hex: "5B9BF6")
}
```

Light mode values in tokens.md Dark/Light table. Derive Font extension from font stack table (trivial: `.custom("Doto"/"SpaceGrotesk-Regular"/"SpaceMono-Regular", size:)`).

---

## 3. PAPER (DESIGN TOOL)

Use `get_font_family_info` to verify fonts before writing styles. Direct hex values (no CSS variables). Dark mode as default canvas, light mode as separate artboard.

---

## 4. REACT / TAILWIND

Use the pre-built React components from `web-ui-kit/react/`. Import tokens.css first, then import components individually.

### React Component Import

```tsx
import './styles/tokens.css'  // Always first
import Clock from './components/Clock'
import Button from './components/Buttons'
import Card from './components/Card'
```

### Tailwind CSS Integration

Map Nothing tokens to `tailwind.config.js` theme extensions:

```js
theme: {
  extend: {
    colors: {
      'nothing': {
        display: 'var(--text-display)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        disabled: 'var(--text-disabled)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        border: 'var(--border)',
        'border-visible': 'var(--border-visible)',
      }
    },
    fontFamily: {
      display: ['var(--font-display)'],
      body: ['var(--font-body)'],
      mono: ['var(--font-mono)'],
      ndot: ['var(--font-ndot)'],
    },
    borderRadius: {
      'nothing-pill': 'var(--radius-pill)',
      'nothing-lg': 'var(--radius-lg)',
      'nothing-md': 'var(--radius-md)',
      'nothing-xs': 'var(--radius-xs)',
    }
  }
}
```

### BEM-to-Tailwind Class Mapping

| Nothing BEM Class | Tailwind Equivalent |
|---|---|
| `.nothing-btn--primary` | `bg-nothing-display text-black rounded-nothing-pill px-6 py-3 font-mono text-xs uppercase tracking-wider min-h-[44px]` |
| `.nothing-btn--secondary` | `bg-transparent border border-nothing-border-visible text-nothing-primary rounded-nothing-pill px-6 py-3 font-mono text-xs uppercase tracking-wider` |
| `.nothing-card` | `bg-nothing-surface border border-nothing-border rounded-nothing-lg p-4 md:p-6` |
| `.nothing-input--underline` | `border-b border-nothing-border-visible bg-transparent font-mono` |
| `.nothing-tag--pill` | `border border-nothing-border-visible rounded-nothing-pill px-3 py-1 font-mono text-[11px] uppercase tracking-wider` |

### Theme Switching

Set `data-theme="dark"` or `data-theme="light"` on the `<html>` element. All tokens automatically switch via CSS custom properties.
