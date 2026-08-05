import { useState } from 'react'
import { ColorPicker } from 'nothing-ui/color-picker'

export default function ColorPickerControlled() {
  const [color, setColor] = useState('#5B9BF6')

  return (
    <div className="flex flex-col items-start gap-3">
      <ColorPicker value={color} onChange={setColor} title="ACCENT" />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Current: {color}
      </p>
    </div>
  )
}
