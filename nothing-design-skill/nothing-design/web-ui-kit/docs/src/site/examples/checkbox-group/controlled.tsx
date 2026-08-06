import { useState } from 'react'
import { CheckboxGroup } from 'aios-ui-kit/checkbox-group'

export default function CheckboxGroupControlled() {
  const [value, setValue] = useState<string[]>(['sync'])

  return (
    <div className="flex flex-col items-start gap-2">
      <CheckboxGroup
        options={[
          { value: 'sync', label: 'Auto-sync' },
          { value: 'backup', label: 'Cloud backup' },
          { value: 'analytics', label: 'Usage analytics' },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {value.length > 0 ? value.join(', ') : 'Nothing selected'}
      </p>
    </div>
  )
}
