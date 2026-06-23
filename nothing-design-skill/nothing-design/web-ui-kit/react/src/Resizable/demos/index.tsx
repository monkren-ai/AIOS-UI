import { useState } from 'react'
import { Resizable } from '@/Resizable'

type Preset = 'even' | 'left' | 'right'

const presets: Record<Preset, number[]> = {
  even: [33.3, 33.3, 33.4],
  left: [60, 25, 15],
  right: [15, 25, 60],
}

export default function Demo() {
  const [preset, setPreset] = useState<Preset>('even')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {(Object.keys(presets) as Preset[]).map((p) => (
          <button
            key={p}
            className={`nothing-btn ${preset === p ? 'nothing-btn--primary' : 'nothing-btn--secondary'}`}
            onClick={() => setPreset(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Horizontal · initialSizes managed by state
        </div>
        <Resizable
          key={`h-${preset}`}
          direction="horizontal"
          initialSizes={presets[preset]}
          minSizes={[15, 15, 15]}
          maxSizes={[70, 70, 70]}
          style={{ width: '100%', height: 160, border: '1px solid var(--border-visible)' }}
        >
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Panel A</div>
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Panel B</div>
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Panel C</div>
        </Resizable>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Vertical
        </div>
        <Resizable
          key={`v-${preset}`}
          direction="vertical"
          initialSizes={presets[preset]}
          minSizes={[15, 15, 15]}
          maxSizes={[70, 70, 70]}
          style={{ width: '100%', height: 320, border: '1px solid var(--border-visible)' }}
        >
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Top</div>
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Middle</div>
          <div style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Bottom</div>
        </Resizable>
      </div>
    </div>
  )
}
