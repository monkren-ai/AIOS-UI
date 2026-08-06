import * as React from 'react'
import { Autocomplete } from '@/Autocomplete'

const ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
  { value: 'watch', label: 'Watch' },
]

export default function AutocompleteClearable() {
  const [value, setValue] = React.useState('')
  return (
    <div className="w-full max-w-xs space-y-2">
      <Autocomplete
        label="Device"
        placeholder="Search devices..."
        items={ITEMS}
        value={value}
        onValueChange={setValue}
        clearable
      />
      <p className="font-mono text-caption uppercase text-foreground-muted">
        value: {value || '—'}
      </p>
    </div>
  )
}
