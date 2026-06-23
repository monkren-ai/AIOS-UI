import { useState } from 'react'
import { Spinner } from '@/Spinner'

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

const itemSets: { name: string; items: string[] }[] = [
  { name: 'Decision', items: ['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY'] },
  { name: 'Tasks', items: ['CODE', 'TEST', 'REVIEW', 'DEPLOY', 'REST'] },
  { name: 'Food', items: ['RAMEN', 'PIZZA', 'SUSHI', 'TACOS', 'CURRY'] },
]

export default function Demo() {
  const [setIdx, setSetIdx] = useState(0)
  const current = itemSets[setIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={label}>Items — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {itemSets.map((s, i) => (
            <button
              key={s.name}
              style={{
                ...btn,
                ...(setIdx === i
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setSetIdx(i)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <div style={label}>default · md</div>
          <Spinner key={`d-${setIdx}`} items={current.items} size="md" variant="default" />
        </div>
        <div>
          <div style={label}>accent · md</div>
          <Spinner key={`a-${setIdx}`} items={current.items} size="md" variant="accent" />
        </div>
        <div>
          <div style={label}>default · sm</div>
          <Spinner key={`s-${setIdx}`} items={current.items} size="sm" variant="default" />
        </div>
      </div>
    </div>
  )
}
