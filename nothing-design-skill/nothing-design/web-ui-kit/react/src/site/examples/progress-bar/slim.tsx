import { ProgressBar } from 'nothing-ui/progress-bar'

export default function ProgressBarSlim() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <ProgressBar variant="slim" value={38} aria-label="Track one" />
      <ProgressBar size="sm" value={38} label="sm" unit="%" aria-label="Small" />
      <ProgressBar size="md" value={38} label="md" unit="%" aria-label="Medium" />
      <ProgressBar size="lg" value={38} label="lg" unit="%" aria-label="Large" />
    </div>
  )
}
