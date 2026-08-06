import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Sheet } from 'aios-ui-kit/sheet'

export default function SheetBasic() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open settings
      </Button>
      <Sheet open={open} onOpenChange={setOpen} title="Settings">
        <p className="text-sm text-foreground-muted">
          The panel scrolls on its own, so a long body never pushes the header off screen.
        </p>
      </Sheet>
    </>
  )
}
