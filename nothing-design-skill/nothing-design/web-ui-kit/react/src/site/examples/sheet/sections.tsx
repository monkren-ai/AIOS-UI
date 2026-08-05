import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Sheet } from 'nothing-ui/sheet'
import { Switch } from 'nothing-ui/switch'

export default function SheetSections() {
  const [open, setOpen] = useState(false)
  const [airplane, setAirplane] = useState(false)
  const [dark, setDark] = useState(true)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        title="Quick settings"
        sections={[
          {
            title: 'Connectivity',
            content: (
              <div className="flex items-center justify-between py-2 text-sm">
                <span>Airplane mode</span>
                <Switch checked={airplane} onChange={setAirplane} />
              </div>
            ),
          },
          {
            title: 'Display',
            content: (
              <div className="flex items-center justify-between py-2 text-sm">
                <span>Dark mode</span>
                <Switch checked={dark} onChange={setDark} />
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
