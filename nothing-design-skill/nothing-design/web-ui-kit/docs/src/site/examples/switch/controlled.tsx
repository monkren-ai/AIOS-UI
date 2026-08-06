import { useState } from 'react'
import { Switch } from 'aios-ui-kit/switch'

export default function SwitchControlled() {
  const [syncing, setSyncing] = useState(true)

  return (
    <div className="flex flex-col items-start gap-2">
      <Switch label="Background sync" checked={syncing} onChange={setSyncing} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {syncing ? 'Syncing every 15 minutes' : 'Manual sync only'}
      </p>
    </div>
  )
}
