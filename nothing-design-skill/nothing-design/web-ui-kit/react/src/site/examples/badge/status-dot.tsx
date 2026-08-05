import { Badge } from 'nothing-ui/badge'

export default function BadgeStatusDot() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge dot variant="soft">
        Idle
      </Badge>
      <Badge dot variant="primary">
        Live
      </Badge>
      <Badge dot variant="destructive">
        Degraded
      </Badge>
    </div>
  )
}
