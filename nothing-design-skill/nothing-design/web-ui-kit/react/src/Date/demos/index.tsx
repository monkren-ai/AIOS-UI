import { DateWidget } from '../Date'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <DateWidget type="rect" theme="dark" />
      <DateWidget type="dual-ring" theme="dark" />
      <DateWidget type="serif" theme="dark" showPeel />
    </div>
  )
}
