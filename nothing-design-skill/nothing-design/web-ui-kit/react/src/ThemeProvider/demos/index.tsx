import { useState } from 'react'
import { ThemeProvider, useTheme } from '@/ThemeProvider'
import type { ThemeAppearance } from '@/ThemeProvider'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--caption)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-secondary)',
  minWidth: 128,
}

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--body-xs)',
  color: 'var(--text-display)',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
}

function ThemePanel({ lastChange }: { lastChange: ThemeAppearance }) {
  const { theme, isDarkMode, toggleTheme, setTheme } = useTheme()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={rowStyle}>
        <span style={labelStyle}>theme</span>
        <code style={valueStyle}>{theme}</code>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>isDarkMode</span>
        <code style={valueStyle}>{String(isDarkMode)}</code>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>data-theme</span>
        <code style={valueStyle}>{theme}</code>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>onThemeChange</span>
        <code style={valueStyle}>{lastChange}</code>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          className="nothing-btn nothing-btn--primary nothing-btn--sm"
          onClick={toggleTheme}
        >
          Toggle
        </button>
        <button
          className="nothing-btn nothing-btn--secondary nothing-btn--sm"
          onClick={() => setTheme('light')}
        >
          Light
        </button>
        <button
          className="nothing-btn nothing-btn--secondary nothing-btn--sm"
          onClick={() => setTheme('dark')}
        >
          Dark
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  const [lastChange, setLastChange] = useState<ThemeAppearance>('dark')

  return (
    <ThemeProvider defaultTheme="dark" onThemeChange={setLastChange}>
      <ThemePanel lastChange={lastChange} />
    </ThemeProvider>
  )
}
