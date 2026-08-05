import { useState } from 'react'
import { Select } from 'nothing-ui/select'

const SPEEDS = [
  { value: 'eco', label: 'Eco' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'performance', label: 'Performance' },
]

export default function SelectControlled() {
  const [mode, setMode] = useState('balanced')

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-2">
      <Select label="Power mode" options={SPEEDS} value={mode} onValueChange={setMode} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {mode === 'performance' ? 'Battery drains faster' : 'Battery lasts longer'}
      </p>
    </div>
  )
}
