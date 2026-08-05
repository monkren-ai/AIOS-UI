import { ProgressBar } from 'nothing-ui/progress-bar'

export default function ProgressBarStatus() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ProgressBar value={32} status="good" label="Healthy" unit="%" aria-label="Healthy" />
      <ProgressBar value={71} status="warning" label="Warm" unit="%" aria-label="Warm" />
      <ProgressBar
        value={94}
        status="overlimit"
        label="Over limit"
        unit="%"
        aria-label="Over limit"
      />
      <ProgressBar value={100} status="error" label="Failed" unit="%" aria-label="Failed" />
      <ProgressBar value={48} disabled label="Paused" unit="%" aria-label="Paused" />
    </div>
  )
}
