import Marquee from '@/components/Marquee'
import '@/styles/marquee.css'

interface Variant {
  id: string
  label: string
  text: string
  duration: number
  cellSize: number
  gapRatio: number
  desc: string
}

const variants: Variant[] = [
  {
    id: 'default',
    label: 'DEFAULT',
    text: 'AIOS UI · DESIGN SYSTEM',
    duration: 14,
    cellSize: 0.3,
    gapRatio: 0.8,
    desc: '14s 周期 · 镂空点阵蒙版 · 悬停暂停',
  },
  {
    id: 'long',
    label: 'LONG',
    text: 'PRECISION · RESTRAINT · TECHNICAL · CHARACTER',
    duration: 18,
    cellSize: 0.4,
    gapRatio: 0.75,
    desc: '18s 周期 · 大尺寸蒙版 · 长文本滚动',
  },
  {
    id: 'fast',
    label: 'FAST',
    text: 'SCROLL · SCROLL · SCROLL',
    duration: 6,
    cellSize: 0.25,
    gapRatio: 0.85,
    desc: '6s 周期 · 紧密蒙版 · 短文本快速循环',
  },
]

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--caption)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-sm)',
}

const cardStyle: React.CSSProperties = {
  padding: 'var(--space-xl)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--surface)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-sm)',
}

const descStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--caption)',
  letterSpacing: '0.04em',
  color: 'var(--text-secondary)',
  marginTop: 'var(--space-xs)',
}

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--space-lg)',
}

function MarqueeSection() {
  return (
    <div style={sectionStyle}>
      {variants.map((v) => (
        <div key={v.id} style={cardStyle}>
          <div style={labelStyle}>{v.label}</div>
          <Marquee
            text={v.text}
            duration={v.duration}
            cellSize={v.cellSize}
            gapRatio={v.gapRatio}
          />
          <div style={descStyle}>{v.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default MarqueeSection
