import { SegmentedControl } from 'nothing-ui/segmented-control'

export default function SegmentedControlVariants() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl segments={['Grid', 'List']} variant="pill" />
      <SegmentedControl segments={['Grid', 'List']} variant="rounded" />
    </div>
  )
}
