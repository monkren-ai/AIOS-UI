# AIOS Design System — Platform Mapping

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

  /* Layout */
  --page-max-width: 1120px;
  --modal-max-width: 480px;
  --section-gap: 80px;
  --card-padding: 24px;

  /* Named Radius */
  --radius-button: 999px;
  --radius-card: 16px;
  --radius-input: 8px;

  /* Focus Ring */
  --focus-ring-width: 2px;
  --focus-ring-color: var(--interactive);
  --focus-ring-offset: 2px;

  /* Touch Target */
  --touch-target-min: 44px;

  /* Z-Index (granular) */
  --z-dropdown: 50;
  --z-sticky: 80;
  --z-popover: 200;
  --z-tooltip: 300;
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

extension CGFloat {
    static let ndFocusRingWidth: CGFloat = 2
    static let ndFocusRingOffset: CGFloat = 2
    static let ndTouchTargetMin: CGFloat = 44
    static let ndRadiusCard: CGFloat = 16
    static let ndRadiusInput: CGFloat = 8
    static let ndRadiusButton: CGFloat = 999
    static let ndPageMaxWidth: CGFloat = 1120
    static let ndModalMaxWidth: CGFloat = 480
    static let ndSectionGap: CGFloat = 80
    static let ndCardPadding: CGFloat = 24
    static let ndZDropdown: CGFloat = 50
    static let ndZSticky: CGFloat = 80
    static let ndZPopover: CGFloat = 200
    static let ndZTooltip: CGFloat = 300
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

Map AIOS tokens to `tailwind.config.js` theme extensions:

```js
theme: {
  extend: {
    colors: {
      'aios': {
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
      dotmatrix: ['var(--font-dotmatrix)'],
    },
    borderRadius: {
      'aios-pill': 'var(--radius-pill)',
      'aios-lg': 'var(--radius-lg)',
      'aios-md': 'var(--radius-md)',
      'aios-xs': 'var(--radius-xs)',
      'button': 'var(--radius-button)',
      'card': 'var(--radius-card)',
      'input': 'var(--radius-input)',
      'tag': 'var(--radius-tag)',
    },
    maxWidth: {
      'page': 'var(--page-max-width)',
      'modal': 'var(--modal-max-width)',
      'content-narrow': 'var(--content-width-narrow)',
      'content-wide': 'var(--content-width-wide)',
    },
    zIndex: {
      'dropdown': 'var(--z-dropdown)',
      'sticky': 'var(--z-sticky)',
      'popover': 'var(--z-popover)',
      'tooltip': 'var(--z-tooltip)',
      'modal': 'var(--z-modal)',
    }
  }
}
```

### BEM-to-Tailwind Class Mapping

| AIOS BEM Class | Tailwind Equivalent |
|---|---|
| `.aios-btn--primary` | `bg-aios-display text-black rounded-aios-pill px-6 py-3 font-mono text-xs uppercase tracking-wider min-h-[44px]` |
| `.aios-btn--secondary` | `bg-transparent border border-aios-border-visible text-aios-primary rounded-aios-pill px-6 py-3 font-mono text-xs uppercase tracking-wider` |
| `.aios-card` | `bg-aios-surface border border-aios-border rounded-aios-lg p-4 md:p-6` |
| `.aios-input--underline` | `border-b border-aios-border-visible bg-transparent font-mono` |
| `.aios-tag--pill` | `border border-aios-border-visible rounded-aios-pill px-3 py-1 font-mono text-[11px] uppercase tracking-wider` |

### Theme Switching

Set `data-theme="dark"` or `data-theme="light"` on the `<html>` element. All tokens automatically switch via CSS custom properties.
