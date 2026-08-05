import { Badge } from 'nothing-ui/badge'
import { Collapsible } from 'nothing-ui/collapsible'

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
