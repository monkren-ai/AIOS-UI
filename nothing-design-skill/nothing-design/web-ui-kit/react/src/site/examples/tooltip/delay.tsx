import { Button } from 'nothing-ui/button'
import { Tooltip } from 'nothing-ui/tooltip'

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Tooltip delay={0} content="Appears immediately">
        <Button variant="outline" size="sm">
          0 ms
        </Button>
      </Tooltip>
      <Tooltip content="The 300 ms default">
        <Button variant="outline" size="sm">
          300 ms
        </Button>
      </Tooltip>
      <Tooltip delay={1000} content="Only for the genuinely curious">
        <Button variant="outline" size="sm">
          1000 ms
        </Button>
      </Tooltip>
    </div>
  )
}
