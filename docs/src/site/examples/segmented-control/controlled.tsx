import { useState } from 'react'
import { SegmentedControl } from 'aios-ui-kit/segmented-control'

const MODES = ['Eco', 'Balanced', 'Performance']

const BATTERY = ['Two days', 'One day', 'Half a day']

export default function SegmentedControlControlled() {
  const [index, setIndex] = useState(1)

  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl segments={MODES} activeIndex={index} onChange={setIndex} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Battery: {BATTERY[index]}
      </p>
    </div>
  )
}
