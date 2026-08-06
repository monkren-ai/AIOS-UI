import { Avatar } from 'aios-ui-kit/avatar'
import { HoverCard } from 'aios-ui-kit/hover-card'

export default function HoverCardBasic() {
  return (
    <HoverCard
      content={
        <div className="flex w-64 gap-3">
          <Avatar alt="Teenage Engineering" fallback="TE" />
          <div className="text-sm">
            <p className="font-mono text-label uppercase tracking-wider">Teenage Engineering</p>
            <p className="mt-1 text-foreground-muted">
              Designed the OP-1 and, with Nothing, the Ear (stick) case.
            </p>
          </div>
        </div>
      }
    >
      <button className="border-b border-dashed border-border-visible font-mono text-sm">
        @teenage.engineering
      </button>
    </HoverCard>
  )
}
