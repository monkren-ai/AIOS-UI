import { Calendar } from '../Calendar'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Calendar type="compact" />
      <Calendar type="full" />
    </div>
  )
}
