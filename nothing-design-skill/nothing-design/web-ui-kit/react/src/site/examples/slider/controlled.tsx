import { useState } from 'react'
import { Slider } from 'nothing-ui/slider'

export default function SliderControlled() {
  const [volume, setVolume] = useState(30)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <Slider label="Volume" value={volume} onValueChange={setVolume} min={0} max={100} step={10} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {volume === 0 ? 'Muted' : `${volume} %`}
      </p>
    </div>
  )
}
