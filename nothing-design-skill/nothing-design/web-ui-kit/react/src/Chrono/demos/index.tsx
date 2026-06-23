import { useState } from 'react'
import { Chrono, type ChronoSize, type ChronoState } from '@/Chrono'

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

const sizes: ChronoSize[] = ['sm', 'md', 'lg']
const states: ChronoState[] = ['idle', 'running', 'paused']

export default function Demo() {
  const [focusSize, setFocusSize] = useState<ChronoSize | 'all'>('all')
  const [previewState, setPreviewState] = useState<ChronoState>('idle')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={label}>Size selector — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            style={{
              ...btn,
              ...(focusSize === 'all'
                ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                : { opacity: 0.55 }),
            }}
            onClick={() => setFocusSize('all')}
          >
            all
          </button>
          {sizes.map((s) => (
            <button
              key={s}
              style={{
                ...btn,
                ...(focusSize === s
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setFocusSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {sizes
          .filter((s) => focusSize === 'all' || focusSize === s)
          .map((s) => (
            <div key={s}>
              <div style={label}>{s} — start / lap / reset</div>
              <Chrono size={s} />
            </div>
          ))}
      </div>

      <div>
        <div style={label}>State preview — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {states.map((s) => (
            <button
              key={s}
              style={{
                ...btn,
                ...(previewState === s
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setPreviewState(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ maxWidth: 280 }}>
          <Chrono size="md" state={previewState} />
        </div>
      </div>
    </div>
  )
}
