import { Battery } from '../Battery'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Battery variant="segmented" theme="dark" percent={75} />
      <Battery variant="ring" theme="dark" percent={60} />
      <Battery variant="segmented" theme="dark" percent={15} isCharging />
    </div>
  )
}
