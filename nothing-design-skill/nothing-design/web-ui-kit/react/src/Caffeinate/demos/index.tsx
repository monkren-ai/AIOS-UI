import { useState } from 'react'
import { Caffeinate, type CaffeinateStatus } from '@/Caffeinate'

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

export default function Demo() {
  const [status, setStatus] = useState<CaffeinateStatus>('low')
  const statuses: CaffeinateStatus[] = ['low', 'medium', 'high']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={label}>Status — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {statuses.map((s) => (
            <button
              key={s}
              style={{
                ...btn,
                ...(status === s
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ maxWidth: 340 }}>
          <Caffeinate status={status} maxCaffeine={400} />
        </div>
      </div>

      <div>
        <div style={label}>maxCaffeine — 200 vs 600</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 260 }}>
            <Caffeinate maxCaffeine={200} totalSegments={8} />
          </div>
          <div style={{ maxWidth: 260 }}>
            <Caffeinate maxCaffeine={600} totalSegments={12} />
          </div>
        </div>
      </div>
    </div>
  )
}
