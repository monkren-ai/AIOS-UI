import { Toggle } from 'aios-ui-kit/toggle'

export default function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle size="sm" defaultPressed>
        Small
      </Toggle>
      <Toggle size="md" defaultPressed>
        Medium
      </Toggle>
      <Toggle size="lg" defaultPressed>
        Large
      </Toggle>
    </div>
  )
}
