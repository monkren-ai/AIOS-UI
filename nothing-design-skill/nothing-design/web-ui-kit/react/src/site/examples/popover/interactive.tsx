import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Popover } from 'nothing-ui/popover'
import { Slider } from 'nothing-ui/slider'

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
