import { ProgressBar } from 'aios-ui-kit/progress-bar'

export default function ProgressBarIndeterminate() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <ProgressBar indeterminate value={0} aria-label="Contacting the device" />
      <ProgressBar indeterminate value={0} variant="slim" aria-label="Contacting the device" />
    </div>
  )
}
