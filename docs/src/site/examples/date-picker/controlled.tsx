import { useState } from 'react'
import { DatePicker } from 'aios-ui-kit/date-picker'

export default function DatePickerControlled() {
  const [value, setValue] = useState('2026-08-06')

  return (
    <div className="flex flex-col items-start gap-2">
      <DatePicker value={value} onValueChange={setValue} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {value || '—'}
      </p>
    </div>
  )
}
