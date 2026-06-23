import { useState } from 'react'
import { Pomodoro } from '@/Pomodoro'

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

type Preset = { name: string; work: number; brk: number }
const presets: Preset[] = [
  { name: 'Focus 25/5', work: 25, brk: 5 },
  { name: 'Deep 50/10', work: 50, brk: 10 },
  { name: 'Sprint 15/3', work: 15, brk: 3 },
]

export default function Demo() {
  const [presetIdx, setPresetIdx] = useState(0)
  const preset = presets[presetIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={label}>Preset — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {presets.map((p, i) => (
            <button
              key={p.name}
              style={{
                ...btn,
                ...(presetIdx === i
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setPresetIdx(i)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={label}>Work phase — start / pause / reset</div>
          <Pomodoro key={`work-${presetIdx}`} workMinutes={preset.work} breakMinutes={preset.brk} phase="work" />
        </div>
        <div>
          <div style={label}>Break phase</div>
          <Pomodoro key={`break-${presetIdx}`} workMinutes={preset.work} breakMinutes={preset.brk} phase="break" />
        </div>
      </div>
    </div>
  )
}
