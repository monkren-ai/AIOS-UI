import { HoverCard } from '../HoverCard'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <HoverCard content="This is hover card content" side="bottom">
        <button className="nothing-btn nothing-btn--primary">Hover me</button>
      </HoverCard>
      <HoverCard content="Hover card on top" side="top">
        <button className="nothing-btn nothing-btn--secondary">Hover target</button>
      </HoverCard>
    </div>
  )
}
