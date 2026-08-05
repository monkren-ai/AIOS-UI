import { useState } from 'react'
import { Toggle, ToggleGroup } from 'nothing-ui/toggle'

const LAYERS = ['grid', 'labels', 'traffic']

export default function ToggleControlled() {
  const [visible, setVisible] = useState<string[]>(['grid'])

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup value={visible} onValueChange={setVisible} aria-label="Map layers">
        {LAYERS.map((layer) => (
          <Toggle key={layer} value={layer}>
            {layer}
          </Toggle>
        ))}
      </ToggleGroup>
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {visible.length > 0 ? visible.join(' + ') : 'No layers'}
      </p>
    </div>
  )
}
