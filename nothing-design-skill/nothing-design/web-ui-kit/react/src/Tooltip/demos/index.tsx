import { Tooltip } from '../Tooltip'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Tooltip content="Tooltip on top" side="top">
        <button className="nothing-btn nothing-btn--primary">Top</button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <button className="nothing-btn nothing-btn--secondary">Bottom</button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <button className="nothing-btn nothing-btn--ghost">Left</button>
      </Tooltip>
    </div>
  )
}
