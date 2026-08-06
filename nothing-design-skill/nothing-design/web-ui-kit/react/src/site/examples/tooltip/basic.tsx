import { Button } from 'aios-ui-kit/button'
import { Tooltip } from 'aios-ui-kit/tooltip'

export default function TooltipBasic() {
  return (
    <Tooltip content="Syncs every 15 minutes">
      <Button variant="outline">Sync now</Button>
    </Tooltip>
  )
}
