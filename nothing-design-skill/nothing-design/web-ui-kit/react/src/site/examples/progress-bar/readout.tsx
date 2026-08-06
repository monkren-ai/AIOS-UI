import * as React from 'react'
import { ProgressBar } from 'aios-ui-kit/progress-bar'
import { Button } from 'aios-ui-kit/button'

export default function ProgressBarReadout() {
  const [value, setValue] = React.useState(64)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ProgressBar value={value} label="Storage" unit="%" aria-label="Storage used" />
      <ProgressBar value={value} showReadout={false} aria-label="Storage used, no readout" />
      <div className="flex justify-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.max(0, v - 12))}>
          −12
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.min(100, v + 12))}>
          +12
        </Button>
      </div>
    </div>
  )
}
