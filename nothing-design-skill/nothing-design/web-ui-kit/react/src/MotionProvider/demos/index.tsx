import { useState } from 'react'
import { MotionProvider, useMotionComponent } from '@/MotionProvider'

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

function MotionBox({ active }: { active: boolean }) {
  const motion = useMotionComponent()

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.3,
        scale: active ? 1.25 : 1,
        rotate: active ? 45 : 0,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        width: 80,
        height: 80,
        background: 'var(--accent)',
        borderRadius: 'var(--radius-md)',
      }}
    />
  )
}

export default function Demo() {
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <MotionProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <MotionBox active={active} />
        <div style={rowStyle}>
          <span style={labelStyle}>animation count</span>
          <code style={valueStyle}>{count}</code>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>active</span>
          <code style={valueStyle}>{String(active)}</code>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className="nothing-btn nothing-btn--primary nothing-btn--sm"
            onClick={() => {
              setActive(!active)
              setCount(count + 1)
            }}
          >
            Toggle Animation
          </button>
          <button
            className="nothing-btn nothing-btn--secondary nothing-btn--sm"
            onClick={() => {
              setActive(false)
              setCount(0)
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </MotionProvider>
  )
}
