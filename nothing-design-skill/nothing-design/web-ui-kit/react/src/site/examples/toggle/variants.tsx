import { Toggle } from 'nothing-ui/toggle'

export default function ToggleVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle variant="soft" defaultPressed>
        Soft
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        Outline
      </Toggle>
      <Toggle variant="ghost" defaultPressed>
        Ghost
      </Toggle>
    </div>
  )
}
