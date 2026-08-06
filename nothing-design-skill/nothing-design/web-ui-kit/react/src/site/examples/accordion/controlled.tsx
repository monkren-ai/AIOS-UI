import { useState } from 'react'
import { Accordion } from 'aios-ui-kit/accordion'
import { Button } from 'aios-ui-kit/button'

const ITEMS = [
  { id: 'a', title: 'Section A', content: 'First body.' },
  { id: 'b', title: 'Section B', content: 'Second body.' },
  { id: 'c', title: 'Section C', content: 'Third body.' },
]

export default function AccordionControlled() {
  const [open, setOpen] = useState<string[]>(['a'])

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(ITEMS.map((item) => item.id))}>
          Expand all
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen([])}>
          Collapse all
        </Button>
      </div>
      <Accordion items={ITEMS} type="multiple" value={open} onValueChange={setOpen} />
    </div>
  )
}
