import { useState } from 'react'
import { Input } from 'aios-ui-kit/input'

export default function InputControlled() {
  const [value, setValue] = useState('')

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <Input
        label="Nickname"
        value={value}
        onValueChange={setValue}
        clearable
        placeholder="Up to 16 characters"
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {value.length} / 16
      </p>
    </div>
  )
}
