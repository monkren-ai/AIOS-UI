import { SegmentedControl } from '../SegmentedControl'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <SegmentedControl segments={['Day', 'Week', 'Month']} />
      <SegmentedControl variant="rounded" segments={['Light', 'Dark']} />
      <SegmentedControl segments={['A', 'B', 'C']} disabled />
    </div>
  )
}
