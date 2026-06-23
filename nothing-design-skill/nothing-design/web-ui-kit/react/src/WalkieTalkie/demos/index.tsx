import { useState } from 'react'
import { WalkieTalkie, type WalkieStatus } from '@/WalkieTalkie'

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

const statuses: WalkieStatus[] = ['ready', 'transmitting', 'sent']

export default function Demo() {
  const [previewStatus, setPreviewStatus] = useState<WalkieStatus>('ready')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={label}>Interactive — hold PTT to transmit</div>
        <div style={{ maxWidth: 280 }}>
          <WalkieTalkie channel={7} volumeLevel={4} />
        </div>
      </div>

      <div>
        <div style={label}>Status preview — controlled via useState</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {statuses.map((s) => (
            <button
              key={s}
              style={{
                ...btn,
                ...(previewStatus === s
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setPreviewStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ maxWidth: 280 }}>
          <WalkieTalkie channel={3} volumeLevel={2} status={previewStatus} />
        </div>
      </div>

      <div>
        <div style={label}>Different channels</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <WalkieTalkie channel={1} volumeLevel={3} />
          <WalkieTalkie channel={14} volumeLevel={5} />
        </div>
      </div>
    </div>
  )
}
