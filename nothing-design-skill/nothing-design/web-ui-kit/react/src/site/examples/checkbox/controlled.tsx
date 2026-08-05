import { useState } from 'react'
import { Checkbox } from 'nothing-ui/checkbox'

export default function CheckboxControlled() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="flex flex-col items-start gap-2">
      <Checkbox
        label="I have read the terms"
        checked={accepted}
        onCheckedChange={(checked) => setAccepted(checked === true)}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {accepted ? 'Ready to continue' : 'Blocked until accepted'}
      </p>
    </div>
  )
}
