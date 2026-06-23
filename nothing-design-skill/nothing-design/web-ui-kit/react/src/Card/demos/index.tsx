import { Card } from '../Card'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Card title="Content Card" action="More">
        <p>Card body content goes here.</p>
      </Card>
      <Card mode="widget" title="Widget" value="42" subtitle="Units" theme="dark" />
    </div>
  )
}
