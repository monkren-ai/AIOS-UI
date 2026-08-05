import { Toggle } from 'nothing-ui/toggle'

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
