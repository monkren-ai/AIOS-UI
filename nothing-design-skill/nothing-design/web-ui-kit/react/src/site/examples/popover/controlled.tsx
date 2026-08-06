import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Popover } from 'aios-ui-kit/popover'

export default function PopoverControlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="max-w-56 text-sm">
            <p className="mb-3 text-foreground-muted">
              Closing from inside the panel is just another state update.
            </p>
            <Button size="sm" onClick={() => setOpen(false)}>
              Got it
            </Button>
          </div>
        }
      >
        <Button variant="outline">Tips</Button>
      </Popover>
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        open: {String(open)}
      </p>
    </div>
  )
}
