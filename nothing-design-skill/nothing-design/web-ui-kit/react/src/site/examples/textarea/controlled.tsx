import { useState } from 'react'
import { Textarea } from 'nothing-ui/textarea'

const LIMIT = 140

export default function TextareaControlled() {
  const [value, setValue] = useState('')
  const remaining = LIMIT - value.length

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <Textarea
        autoResize
        minRows={3}
        label="Status"
        value={value}
        onChange={(event) => setValue(event.target.value.slice(0, LIMIT))}
        placeholder="What are you working on?"
      />
      <p className="self-end font-mono text-label uppercase tracking-wider text-foreground-muted">
        {remaining} left
      </p>
    </div>
  )
}
