import { SegmentedControl } from 'aios-ui-kit/segmented-control'

export default function SegmentedControlStates() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 指针在整条控件上移动时，垫层会滑向最近的分段 */}
      <SegmentedControl segments={['Auto', 'Light', 'Dark']} proximity />
      {/* disabled 是整条控件级别的，没有单段禁用 */}
      <SegmentedControl segments={['Auto', 'Light', 'Dark']} activeIndex={2} disabled />
    </div>
  )
}
