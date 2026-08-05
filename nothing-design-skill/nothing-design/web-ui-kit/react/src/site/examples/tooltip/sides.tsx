import { Button } from 'nothing-ui/button'
import { Tooltip } from 'nothing-ui/tooltip'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-10">
      {SIDES.map((side) => (
        <Tooltip key={side} side={side} content={`side="${side}"`}>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  )
}
