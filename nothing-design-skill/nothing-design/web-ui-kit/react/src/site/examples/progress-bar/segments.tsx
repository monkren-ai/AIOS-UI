import { ProgressBar } from 'nothing-ui/progress-bar'

export default function ProgressBarSegments() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ProgressBar value={7} total={10} segments={10} label="7 of 10" aria-label="Step 7 of 10" />
      <ProgressBar
        value={67}
        segments={20}
        label="Default"
        unit="%"
        aria-label="Default segments"
      />
      <ProgressBar
        value={67}
        segments={60}
        label="Near-solid"
        unit="%"
        aria-label="Sixty segments"
      />
    </div>
  )
}
