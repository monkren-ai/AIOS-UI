import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Sheet } from 'nothing-ui/sheet'

type Side = 'left' | 'right' | 'top' | 'bottom'

const SIDES: Side[] = ['left', 'right', 'top', 'bottom']

export default function SheetSides() {
  const [side, setSide] = useState<Side | null>(null)

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SIDES.map((value) => (
          <Button key={value} variant="outline" size="sm" onClick={() => setSide(value)}>
            {value}
          </Button>
        ))}
      </div>
      <Sheet
        open={side !== null}
        onOpenChange={(next) => !next && setSide(null)}
        side={side ?? 'right'}
        title={`side="${side ?? 'right'}"`}
      >
        <p className="text-sm text-foreground-muted">
          Left and right are inline directions, so an RTL document swaps them automatically.
        </p>
      </Sheet>
    </>
  )
}
