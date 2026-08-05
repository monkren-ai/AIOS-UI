import { useState } from 'react'
import { Switch } from 'nothing-ui/switch'

export default function SwitchSizes() {
  const [on, setOn] = useState(true)

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Switch size="sm" label="Small" checked={on} onChange={setOn} />
      <Switch size="md" label="Medium" checked={on} onChange={setOn} />
      <Switch size="lg" label="Large" checked={on} onChange={setOn} />
    </div>
  )
}
