import { useState } from 'react'
import { SunDial, type SunDialTheme } from '@/SunDial'

const btn = {
  padding: '6px 14px',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
}

const label = {
  fontSize: 10,
  opacity: 0.4,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: 8,
}

const zones = [
  { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
]

export default function Demo() {
  const [theme, setTheme] = useState<SunDialTheme>('dark')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={label}>Theme:</span>
        {(['dark', 'light'] as const).map((t) => (
          <button
            key={t}
            style={{
              ...btn,
              ...(theme === t
                ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                : { opacity: 0.55 }),
            }}
            onClick={() => setTheme(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {zones.map((z) => (
          <div key={z.name} style={{ maxWidth: 300 }}>
            <div style={label}>{z.name}</div>
            <SunDial latitude={z.lat} longitude={z.lng} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  )
}
