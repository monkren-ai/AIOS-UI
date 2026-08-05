import { Button } from 'nothing-ui/button'
import { HoverCard } from 'nothing-ui/hover-card'
import { ArrowUpRightIcon } from '../icons'

export default function HoverCardInteractive() {
  return (
    <HoverCard
      content={
        <div className="w-60 text-sm">
          <p className="font-mono text-label uppercase tracking-wider">Phone (2a)</p>
          <p className="mt-1 text-foreground-muted">
            6.7&quot; flexible AMOLED, 120 Hz, Glyph Interface on the back.
          </p>
          <Button className="mt-3" size="sm" variant="ghost">
            Specs
            <ArrowUpRightIcon className="size-4" data-icon="end" />
          </Button>
        </div>
      }
    >
      <button className="font-mono text-sm underline underline-offset-4">Phone (2a)</button>
    </HoverCard>
  )
}
