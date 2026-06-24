import { useState } from 'react'
import { Checkbox } from '@/Checkbox'

export default function Demo() {
  const options = ['Notifications', 'Auto-update', 'Analytics', 'Crash reports']
  const [selected, setSelected] = useState<string[]>(['Notifications'])
  const [agreed, setAgreed] = useState(false)

  const allChecked = selected.length === options.length
  const noneChecked = selected.length === 0
  const headerState: boolean | 'indeterminate' = allChecked
    ? true
    : noneChecked
      ? false
      : 'indeterminate'

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelected(checked ? options : [])
  }

  const toggleOne = (option: string, checked: boolean | 'indeterminate') => {
    setSelected((prev) =>
      checked ? [...prev, option] : prev.filter((o) => o !== option),
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Checkbox label="Select all" checked={headerState} onCheckedChange={toggleAll} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 16 }}>
        {options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => toggleOne(option, checked)}
          />
        ))}
      </div>
      <Checkbox
        label="I agree to the terms"
        checked={agreed}
        onCheckedChange={(c) => setAgreed(c === true)}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Selected: {selected.length}/{options.length} · Agreed: {agreed ? 'yes' : 'no'}
      </div>
    </div>
  )
}
