import { Badge } from 'aios-ui-kit/badge'
import { Collapsible } from 'aios-ui-kit/collapsible'

export default function CollapsibleCustomTrigger() {
  return (
    <Collapsible
      className="w-full max-w-md"
      trigger={
        <>
          <span>Delivery</span>
          <Badge variant="outline">2 items</Badge>
        </>
      }
    >
      Arriving Thursday. Signature required on the door.
    </Collapsible>
  )
}
