import { Popover } from 'aios-ui-kit/popover'
import { Button } from 'aios-ui-kit/button'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-16">
      {SIDES.map((side) => (
        <Popover key={side} side={side} content={<span className="text-sm">side="{side}"</span>}>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Popover>
      ))}
    </div>
  )
}
