import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Input } from 'aios-ui-kit/input'
import { Sheet } from 'aios-ui-kit/sheet'

export default function SheetFooter() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add a device
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="Add a device"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Pair</Button>
          </>
        }
      >
        <Input label="Device name" placeholder="Ear (2)" />
      </Sheet>
    </>
  )
}
