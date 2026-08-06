import { useState } from 'react'
import { Collapsible } from 'aios-ui-kit/collapsible'

// 两块内容共享一个状态，永远只有一块是展开的
export default function CollapsibleControlled() {
  const [open, setOpen] = useState<'summary' | 'raw'>('summary')

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Collapsible
        trigger="Summary"
        open={open === 'summary'}
        onOpenChange={(next) => setOpen(next ? 'summary' : 'raw')}
      >
        Three failures in the last hour, all on the same endpoint.
      </Collapsible>
      <Collapsible
        trigger="Raw log"
        open={open === 'raw'}
        onOpenChange={(next) => setOpen(next ? 'raw' : 'summary')}
      >
        504 upstream timeout — 12:02, 12:19, 12:41.
      </Collapsible>
    </div>
  )
}
