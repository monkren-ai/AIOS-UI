import { useState } from 'react'
import { Sheet } from '../Sheet'

export default function Demo() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button className="nothing-btn nothing-btn--primary" onClick={() => setOpen(true)}>
        Open Sheet
      </button>
      <Sheet open={open} onOpenChange={setOpen} title="Sheet Title" side="right">
        <p>This is the sheet body content.</p>
      </Sheet>
    </div>
  )
}
