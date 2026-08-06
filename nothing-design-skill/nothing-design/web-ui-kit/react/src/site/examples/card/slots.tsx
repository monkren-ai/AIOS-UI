import { Card } from 'aios-ui-kit/card'
import { Badge } from 'aios-ui-kit/badge'
import { Button } from 'aios-ui-kit/button'

export default function CardSlots() {
  return (
    <Card
      className="w-full max-w-sm"
      title="Storage"
      feature="beta"
      action="Manage"
      onAction={() => console.log('manage')}
      footer={
        <div className="flex w-full items-center justify-between">
          <Badge variant="soft">Synced</Badge>
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </div>
      }
    >
      <p className="text-sm text-foreground-muted">128 GB of 256 GB used across three devices.</p>
    </Card>
  )
}
