# AIOS UI Kit Web

AIOS UI 3.0 is maintained in [`react`](./react). The package keeps light/dark/system as the color-mode API and adds global theme families, built-in themes, and local DTCG 2025.10 import/export.

```bash
npm install aios-ui-kit motion
```

```tsx
import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'
import { Button } from 'aios-ui-kit/button'

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider motion={motion} defaultTheme="system" defaultThemeId="aios-default">
      <Button variant="primary">Continue</Button>
      {children}
    </ConfigProvider>
  )
}
```

The former Widget subsystem was removed in 3.0. See [`react/MIGRATION-v3.md`](./react/MIGRATION-v3.md) for removed exports and replacements, and [`react/README.md`](./react/README.md) for the current API.
