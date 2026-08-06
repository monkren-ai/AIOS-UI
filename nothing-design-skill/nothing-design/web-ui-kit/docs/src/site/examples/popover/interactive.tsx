import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Popover } from 'aios-ui-kit/popover'
import { Slider } from 'aios-ui-kit/slider'

export default function PopoverInteractive() {
  const [brightness, setBrightness] = useState(60)

  return (
    <Popover
      content={
        <div className="w-56">
          <Slider showValue label="Brightness" value={brightness} onValueChange={setBrightness} />
        </div>
      }
    >
      <Button variant="outline">Brightness — {brightness}%</Button>
    </Popover>
  )
}
