import { Button } from 'nothing-ui/button'
import { HoverCard } from 'nothing-ui/hover-card'

export default function HoverCardSides() {
  return (
    <div className="flex items-center justify-center gap-3 py-14">
      <HoverCard side="top" content={<p className="w-48 text-sm">Opens above the trigger.</p>}>
        <Button variant="outline" size="sm">
          side=&quot;top&quot;
        </Button>
      </HoverCard>
      <HoverCard content={<p className="w-48 text-sm">Opens below — the default.</p>}>
        <Button variant="outline" size="sm">
          side=&quot;bottom&quot;
        </Button>
      </HoverCard>
    </div>
  )
}
