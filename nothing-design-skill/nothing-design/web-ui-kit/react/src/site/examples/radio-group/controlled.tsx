import { useState } from 'react'
import { RadioGroup } from 'aios-ui-kit/radio-group'

const OPTIONS = [
  { value: 'ship', label: 'Ship it' },
  { value: 'hold', label: 'Hold for review' },
  { value: 'revert', label: 'Revert' },
]

export default function RadioGroupControlled() {
  const [decision, setDecision] = useState('hold')

  return (
    <div className="flex flex-col items-start gap-3">
      <RadioGroup name="decision" options={OPTIONS} value={decision} onValueChange={setDecision} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Selected: {decision}
      </p>
    </div>
  )
}
