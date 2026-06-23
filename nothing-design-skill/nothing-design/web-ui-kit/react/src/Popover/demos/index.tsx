import { Popover } from '../Popover'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Popover content="This is popover content" side="bottom">
        <button className="nothing-btn nothing-btn--primary">Click me</button>
      </Popover>
      <Popover content="Popover on top" side="top">
        <button className="nothing-btn nothing-btn--secondary">Hover target</button>
      </Popover>
    </div>
  )
}
