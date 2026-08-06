import { Button } from 'aios-ui-kit/button'
import { Popover } from 'aios-ui-kit/popover'

export default function PopoverBasic() {
  return (
    <Popover
      content={
        <div className="max-w-56 text-sm">
          <p className="mb-1 font-mono text-label uppercase tracking-wider">Glyph interface</p>
          <p className="text-foreground-muted">
            The LEDs on the back light up for calls, timers and charging.
          </p>
        </div>
      }
    >
      <Button variant="outline">What is this?</Button>
    </Popover>
  )
}
