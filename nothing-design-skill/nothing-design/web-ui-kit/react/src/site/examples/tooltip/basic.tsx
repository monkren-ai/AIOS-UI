import { Button } from 'nothing-ui/button'
import { Tooltip } from 'nothing-ui/tooltip'

export default function TooltipBasic() {
  return (
    <Tooltip content="Syncs every 15 minutes">
      <Button variant="outline">Sync now</Button>
    </Tooltip>
  )
}
