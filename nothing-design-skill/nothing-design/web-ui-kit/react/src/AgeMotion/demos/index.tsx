import { useState } from 'react'
import { AgeMotion, type AgeMotionTheme } from '@/AgeMotion'

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

const profiles = [
  { name: '1995', birthDate: '1995-06-15' },
  { name: '2001', birthDate: '2001-01-20' },
  { name: '1988', birthDate: '1988-11-03' },
]

export default function Demo() {
  const [theme, setTheme] = useState<AgeMotionTheme>('dark')

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

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {profiles.map((p) => (
          <div key={p.name} style={{ maxWidth: 300 }}>
            <div style={label}>{p.name} · md</div>
            <AgeMotion birthDate={p.birthDate} size="md" theme={theme} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 260 }}>
          <div style={label}>sm</div>
          <AgeMotion birthDate="1995-06-15" size="sm" theme={theme} />
        </div>
        <div style={{ maxWidth: 340 }}>
          <div style={label}>lg</div>
          <AgeMotion birthDate="1995-06-15" size="lg" theme={theme} />
        </div>
      </div>
    </div>
  )
}
